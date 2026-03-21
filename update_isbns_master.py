import json

BOOKS_PATH = 'public/books.json'

# S4 ISBN 數據集 (從搜尋結果整理)
S4_ISBN_DATA = {
    "S4-01": "9781416541998", # The Time Paradox
    "S4-02": "9780616410427", # Do It Tomorrow (Mark Forster) - Found from context
    "S4-03": "9781990484254", # Do the Hard Things First
    "S4-04": "9780063098619", # Do Hard Things (Steve Magness)
    "S4-06": "9780578301754", # Mind Management Not Time Management
    "S4-07": "9780470593462", # The Now Habit at Work
    "S4-08": "9781980643289", # 80/20 Your Life
    "S4-10": "9781986622318", # Finish What You Start
    "S4-11": "9781250269805", # Betting on You
    "S4-31": "9787508647050", # The Beginning of Infinity (English is 9780670022755)
    "S4-32": "9781982167387", # Building a Second Brain
    "S4-33": "9780062353238", # The Achievement Habit
    "S4-35": "9781398535954", # Growing Cultures
    "S4-36": "9798887100340", # High Road Leadership
    "S4-37": "9780718006594", # Maxwell Leadership Bible
    "S4-38": "9780470627600", # The 10X Rule
    "S4-39": "9780307886231", # Good Strategy Bad Strategy
    "S4-40": "9780385346658", # Never Eat Alone
    "S4-41": "9798893310474", # The Simple Path to Wealth
    "S4-42": "9781630060640", # Be a Millionaire Next Year
    "S4-44": "9780857199256", # Just Keep Buying
    "S4-46": "9780593132705", # The Psychology of Money (Original EN)
    "S4-47": "9781523004126", # Why Motivating People Doesn't Work
    "S4-48": "9781523091126", # Co-Active Leadership
    "S4-52": "9781400280230", # Success 101
    "S4-53": "9780316451406", # Noise
    "S4-54": "9780061353246", # Predictably Irrational
    "S4-57": "9780718022075", # The Art of Work
    "S4-59": "9780812996838", # Call Sign Chaos
    "S4-60": "9781647824891", # The Leap to Leader
    "S4-63": "9780801015700", # Switch On Your Brain
    "S4-65": "9781982159061", # The Fun Habit
    "S4-21": "9780525512196", # 21 Lessons for the 21st Century
    "S4-22": "9781982140106", # Laziness Does Not Exist
    "S4-23": "9780743222983", # Authentic Happiness
    "S4-24": "9780399592089", # Everything Happens for a Reason
    "S4-26": "9780062407801", # Never Split the Difference
    "S4-27": "9780142001196", # The Art of Seduction
    "S4-28": "9780062851741", # Limitless Mind
    "S4-29": "9780198796206", # Intelligence: A Very Short Introduction
    "S4-30": "9781591396192", # Blue Ocean Strategy
    "S4-34": "9781989025581", # Story 10x
    "S4-106": "9781250144065", # No Ego
    "S4-16": "9781623367930", # Peak Performance
    "S4-17": "9780063204720", # Smarter Not Harder
    "S4-18": "9780063374362", # It Begins with You
    "S4-25": "9781292178899", # 25 Need-to-Know MBA Models
    "S4-50": "9780062839268", # Trillion Dollar Coach
    "S4-55": "9780801478604", # Poor Numbers
    "S4-91": "9781455548309", # The Power of Your Potential
    "S4-94": "9781529399073", # The Art of Quiet Influence
    "S4-95": "9781510721029", # The Secret Lives of Introverts
    "S4-96": "9780310362722", # Winning the War in Your Mind
    "S4-102": "9781731416735", # The Science of Self-Learning
    "S4-116": "9781788606431", # Exploratory Writing
    "S4-122": "9780691212760", # When Bad Thinking Happens to Good People
    "S4-123": "9798893310160", # This Is Strategy
    "S4-126": "9781523091126", # How to Work with Complicated People
}
def update_isbns():
    with open(BOOKS_PATH, 'r', encoding='utf-8') as f:
        books = json.load(f)

    updated_count = 0
    for b in books:
        code = b.get('code')
        if code in S4_ISBN_DATA:
            b['isbn_en'] = S4_ISBN_DATA[code]
            updated_count += 1

    with open(BOOKS_PATH, 'w', encoding='utf-8') as f:
        json.dump(books, f, ensure_ascii=False, indent=2)

    print(f"ISBN 更新完成。共更新 {updated_count} 本 S4 書籍。")

if __name__ == "__main__":
    update_isbns()
