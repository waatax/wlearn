import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
    getLevelInfo,
    BADGES_CATALOG,
    COSMIC_REALMS,
    generateDailyQuests,
    WISDOM_CAPSULES
} from '../lib/gamification';

const GamificationContext = createContext(null);

const STORAGE_KEY = 'wlearn_gamification_v2';

const getInitialState = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to load gamification state from localStorage', e);
    }

    return {
        exp: 0,
        sparks: 50, // 新手初始贈送 50 Sparks (Beginner's Luck - CD1)
        streak: 0,
        lastActiveDate: null,
        streakFreezes: 1, // 新手贈送 1 個連勝護盾 (CD8)
        readBooks: [], // array of book ids
        bookmarkedBooks: [],
        notes: {}, // { bookId: string }
        unlockedBadges: [], // array of badge ids
        externalVisits: {}, // { realmId: count }
        rouletteSpins: 0,
        capsulesOpened: 0,
        lastCapsuleDate: null,
        todayCapsule: null,
        completedQuests: {}, // { dateKey_questId: true }
        createdAt: new Date().toISOString()
    };
};

export function GamificationProvider({ children }) {
    const [state, setState] = useState(getInitialState);
    const [activeModal, setActiveModal] = useState(null); // 'levelup', 'badge', 'capsule', 'roulette', 'custom'
    const [modalData, setModalData] = useState(null);
    const [expNotification, setExpNotification] = useState(null);

    // Save to localStorage whenever state changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.error('Failed to save gamification state', e);
        }
    }, [state]);

    const todayStr = new Date().toDateString();
    const isCheckedInToday = state.lastActiveDate === todayStr;

    // Check badges engine
    const evaluateBadges = useCallback((currentState) => {
        const newlyUnlocked = [];
        const currentBadges = new Set(currentState.unlockedBadges || []);

        BADGES_CATALOG.forEach(badge => {
            if (!currentBadges.has(badge.id)) {
                if (badge.check(currentState)) {
                    newlyUnlocked.push(badge);
                    currentBadges.add(badge.id);
                }
            }
        });

        if (newlyUnlocked.length > 0) {
            setState(prev => ({
                ...prev,
                unlockedBadges: Array.from(currentBadges),
                exp: prev.exp + newlyUnlocked.length * 50,
                sparks: prev.sparks + newlyUnlocked.length * 20
            }));

            // Trigger Modal for the first newly unlocked badge
            setActiveModal('badge');
            setModalData({ badge: newlyUnlocked[0], count: newlyUnlocked.length });
        }
    }, []);

    // Add EXP & Handle Level Up
    const addExp = useCallback((amount, reason = '') => {
        if (amount <= 0) return;

        setState(prev => {
            const oldLevel = getLevelInfo(prev.exp).level;
            const newExp = prev.exp + amount;
            const newLevelInfo = getLevelInfo(newExp);

            if (newLevelInfo.level > oldLevel) {
                // Level Up Trigger!
                setTimeout(() => {
                    setActiveModal('levelup');
                    setModalData({ oldLevel, newLevel: newLevelInfo.level, levelInfo: newLevelInfo });
                }, 300);
            }

            // Trigger EXP notification banner/toast
            setExpNotification({ amount, reason, timestamp: Date.now() });
            setTimeout(() => setExpNotification(null), 3000);

            const updatedState = {
                ...prev,
                exp: newExp,
                sparks: prev.sparks + Math.floor(amount / 5)
            };

            setTimeout(() => evaluateBadges(updatedState), 50);
            return updatedState;
        });
    }, [evaluateBadges]);

    // Complete a daily quest
    const completeQuest = useCallback((questType, bonusExp = 0) => {
        const questKey = `${todayStr}_${questType}`;
        if (state.completedQuests?.[questKey]) return; // already completed

        setState(prev => {
            const updated = {
                ...prev,
                completedQuests: {
                    ...(prev.completedQuests || {}),
                    [questKey]: true
                }
            };
            return updated;
        });

        if (bonusExp > 0) {
            addExp(bonusExp, '完成每日修行任務');
        }
    }, [todayStr, state.completedQuests, addExp]);

    // 1. Daily Check-in (CD8 Streak & CD2 Accomplishment)
    const checkIn = useCallback(() => {
        if (isCheckedInToday) return;

        setState(prev => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const isConsecutive = prev.lastActiveDate === yesterday.toDateString();

            let newStreak = isConsecutive ? (prev.streak || 0) + 1 : 1;

            // Streak Bonus calculation
            const streakBonusExp = Math.min(50, 25 + newStreak * 5);
            const updated = {
                ...prev,
                streak: newStreak,
                lastActiveDate: todayStr,
                exp: prev.exp + streakBonusExp,
                sparks: prev.sparks + 15
            };

            setTimeout(() => {
                completeQuest('checkin', 0);
                evaluateBadges(updated);
            }, 50);

            setExpNotification({ amount: streakBonusExp, reason: `每日打卡！連勝第 ${newStreak} 天`, timestamp: Date.now() });
            setTimeout(() => setExpNotification(null), 3500);

            return updated;
        });
    }, [isCheckedInToday, todayStr, completeQuest, evaluateBadges]);

    // 2. Toggle Read Book
    const toggleReadBook = useCallback((bookId) => {
        setState(prev => {
            const isAlreadyRead = (prev.readBooks || []).includes(bookId);
            const newReadBooks = isAlreadyRead
                ? prev.readBooks.filter(id => id !== bookId)
                : [...(prev.readBooks || []), bookId];

            const updated = {
                ...prev,
                readBooks: newReadBooks
            };

            if (!isAlreadyRead) {
                // First time reading
                updated.exp = prev.exp + 50;
                updated.sparks = prev.sparks + 20;
                setExpNotification({ amount: 50, reason: '完成書籍研讀！', timestamp: Date.now() });
                setTimeout(() => setExpNotification(null), 3000);
                setTimeout(() => {
                    completeQuest('read_book', 0);
                    evaluateBadges(updated);
                }, 50);
            }

            return updated;
        });
    }, [completeQuest, evaluateBadges]);

    // 3. Toggle Bookmark
    const toggleBookmark = useCallback((bookId) => {
        setState(prev => {
            const isBookmarked = (prev.bookmarkedBooks || []).includes(bookId);
            const newBookmarks = isBookmarked
                ? prev.bookmarkedBooks.filter(id => id !== bookId)
                : [...(prev.bookmarkedBooks || []), bookId];

            const updated = {
                ...prev,
                bookmarkedBooks: newBookmarks
            };

            if (!isBookmarked) {
                updated.exp = prev.exp + 10;
                updated.sparks = prev.sparks + 5;
                setExpNotification({ amount: 10, reason: '加入書籤藏書庫', timestamp: Date.now() });
                setTimeout(() => setExpNotification(null), 2500);
                setTimeout(() => evaluateBadges(updated), 50);
            }

            return updated;
        });
    }, [evaluateBadges]);

    // 4. Save Personal Note
    const saveBookNote = useCallback((bookId, noteText) => {
        setState(prev => {
            const isFirstNoteForThisBook = !prev.notes?.[bookId] && noteText.trim().length > 0;
            const updated = {
                ...prev,
                notes: {
                    ...(prev.notes || {}),
                    [bookId]: noteText
                }
            };

            if (isFirstNoteForThisBook) {
                updated.exp = prev.exp + 20;
                updated.sparks = prev.sparks + 10;
                setExpNotification({ amount: 20, reason: '紀錄研讀筆記與書摘', timestamp: Date.now() });
                setTimeout(() => setExpNotification(null), 2500);
                setTimeout(() => evaluateBadges(updated), 50);
            }

            return updated;
        });
    }, [evaluateBadges]);

    // 5. Track External Realm Visit (Bible, Arch, LitC, Viet, Indonesia)
    const trackExternalVisit = useCallback((realmId) => {
        const realm = COSMIC_REALMS.find(r => r.id === realmId);
        const rewardExp = realm ? realm.expReward : 35;

        setState(prev => {
            const currentVisits = prev.externalVisits?.[realmId] || 0;
            const updated = {
                ...prev,
                externalVisits: {
                    ...(prev.externalVisits || {}),
                    [realmId]: currentVisits + 1
                },
                exp: prev.exp + rewardExp,
                sparks: prev.sparks + 15
            };

            setExpNotification({ amount: rewardExp, reason: `跨界探索：${realm ? realm.name.zh : realmId}`, timestamp: Date.now() });
            setTimeout(() => setExpNotification(null), 3000);

            setTimeout(() => {
                completeQuest('realm_explore', 0);
                evaluateBadges(updated);
            }, 50);

            return updated;
        });
    }, [completeQuest, evaluateBadges]);

    // 6. Claim Daily Wisdom Capsule
    const claimDailyCapsule = useCallback(() => {
        if (state.lastCapsuleDate === todayStr && state.todayCapsule) {
            setActiveModal('capsule');
            setModalData({ capsule: state.todayCapsule, alreadyClaimed: true });
            return;
        }

        // Random pick a capsule
        const randomIndex = Math.floor(Math.random() * WISDOM_CAPSULES.length);
        const capsule = WISDOM_CAPSULES[randomIndex];

        setState(prev => {
            const updated = {
                ...prev,
                lastCapsuleDate: todayStr,
                todayCapsule: capsule,
                capsulesOpened: (prev.capsulesOpened || 0) + 1,
                exp: prev.exp + (capsule.spark || 20),
                sparks: prev.sparks + 15
            };

            setExpNotification({ amount: capsule.spark || 20, reason: '獲得今日智慧靈感盲盒！', timestamp: Date.now() });
            setTimeout(() => setExpNotification(null), 3000);

            setTimeout(() => {
                completeQuest('wisdom_capsule', 0);
                evaluateBadges(updated);
            }, 50);

            return updated;
        });

        setActiveModal('capsule');
        setModalData({ capsule, alreadyClaimed: false });
    }, [state.lastCapsuleDate, state.todayCapsule, todayStr, completeQuest, evaluateBadges]);

    // 7. Serendipity Pick / Random Book Discovery
    const recordSerendipityPick = useCallback((selectedBook) => {
        setState(prev => {
            const updated = {
                ...prev,
                serendipityPicks: (prev.serendipityPicks || prev.rouletteSpins || 0) + 1,
                exp: prev.exp + 15,
                sparks: prev.sparks + 10
            };

            setExpNotification({ amount: 15, reason: '滄海一粟：在浩瀚書海中拾得一本好書！', timestamp: Date.now() });
            setTimeout(() => setExpNotification(null), 2500);

            setTimeout(() => evaluateBadges(updated), 50);
            return updated;
        });
    }, [evaluateBadges]);

    // 8. Buy Streak Freeze
    const buyStreakFreeze = useCallback(() => {
        const cost = 100;
        if (state.sparks < cost) return false;

        setState(prev => ({
            ...prev,
            sparks: prev.sparks - cost,
            streakFreezes: (prev.streakFreezes || 0) + 1
        }));
        return true;
    }, [state.sparks]);

    // Modal controls
    const closeModal = () => {
        setActiveModal(null);
        setModalData(null);
    };

    const openModal = (name, data = null) => {
        setActiveModal(name);
        setModalData(data);
    };

    // Data Export / Import
    const exportData = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `wlearn_scholar_backup_${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    };

    const importData = (jsonObj) => {
        if (jsonObj && typeof jsonObj.exp === 'number') {
            setState(jsonObj);
            return true;
        }
        return false;
    };

    const resetProgress = () => {
        const initial = {
            exp: 0,
            sparks: 50,
            streak: 0,
            lastActiveDate: null,
            streakFreezes: 1,
            readBooks: [],
            bookmarkedBooks: [],
            notes: {},
            unlockedBadges: [],
            externalVisits: {},
            rouletteSpins: 0,
            capsulesOpened: 0,
            lastCapsuleDate: null,
            todayCapsule: null,
            completedQuests: {},
            createdAt: new Date().toISOString()
        };
        setState(initial);
    };

    const levelInfo = getLevelInfo(state.exp);
    const dailyQuests = generateDailyQuests(todayStr).map(q => ({
        ...q,
        isCompleted: !!state.completedQuests?.[`${todayStr}_${q.type}`]
    }));

    return (
        <GamificationContext.Provider value={{
            state,
            levelInfo,
            isCheckedInToday,
            dailyQuests,
            activeModal,
            modalData,
            expNotification,
            addExp,
            checkIn,
            toggleReadBook,
            toggleBookmark,
            saveBookNote,
            trackExternalVisit,
            claimDailyCapsule,
            recordSerendipityPick,
            recordSpin: recordSerendipityPick,
            buyStreakFreeze,
            openModal,
            closeModal,
            exportData,
            importData,
            resetProgress
        }}>
            {children}
        </GamificationContext.Provider>
    );
}

export function useGamification() {
    const context = useContext(GamificationContext);
    if (!context) {
        throw new Error('useGamification must be used within a GamificationProvider');
    }
    return context;
}
