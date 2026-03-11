const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/books.json', 'utf8'));

// Comprehensive WLuznet English YouTube video map by S-code
// Scraped from @WLuznet channel search for S1, S2, S3, S4, VS, VW
const urls = {
        // ===== S1 series =====
        'S1-01': 'https://www.youtube.com/watch?v=PMv1OyOEbpY', // existing
        'S1-06': 'https://www.youtube.com/watch?v=9kbSk0fMADo',
        'S1-07': 'https://www.youtube.com/watch?v=D-BKpShPmNY',
        'S1-08': 'https://www.youtube.com/watch?v=YVXMbKi97Ps',
        'S1-09': 'https://www.youtube.com/watch?v=-73SWaqt000',
        'S1-10': 'https://www.youtube.com/watch?v=2hGLtY45cdk',
        'S1-11': 'https://www.youtube.com/watch?v=rxmOhWhjHCc',
        'S1-12': 'https://www.youtube.com/watch?v=9nuY4BP6aHM',
        'S1-13': 'https://www.youtube.com/watch?v=K1QM1GRIqfY',
        'S1-14': 'https://www.youtube.com/watch?v=pn4rmNTcpRI',
        'S1-15': 'https://www.youtube.com/watch?v=H3q-0Zxpwfk',
        'S1-16': 'https://www.youtube.com/watch?v=YCWLB5gM940',
        'S1-17': 'https://www.youtube.com/watch?v=HtSmwpItIcc',
        'S1-18': 'https://www.youtube.com/watch?v=gkGuSXIDExw',
        'S1-19': 'https://www.youtube.com/watch?v=I_i2RrWUkSk',
        'S1-20': 'https://www.youtube.com/watch?v=mXeolFYSomE',
        'S1-21': 'https://www.youtube.com/watch?v=UpybggSlQjQ',
        'S1-22': 'https://www.youtube.com/watch?v=w0VPv2phmz8',
        'S1-23': 'https://www.youtube.com/watch?v=aPGyLokbkD4',
        'S1-24': 'https://www.youtube.com/watch?v=W887WRkG_so',
        'S1-25': 'https://www.youtube.com/watch?v=HDYnapMUsC4',
        'S1-26': 'https://www.youtube.com/watch?v=_CrX7TKkNWw',
        'S1-27': 'https://www.youtube.com/watch?v=Wmmew_12GmE',
        'S1-28': 'https://www.youtube.com/watch?v=5jqdIMPhPOk',
        'S1-29': 'https://www.youtube.com/watch?v=T2RrTOrPSmU',
        'S1-30': 'https://www.youtube.com/watch?v=LpqdxOZG3ao',
        'S1-31': 'https://www.youtube.com/watch?v=P_6widsS5rY',
        'S1-32': 'https://www.youtube.com/watch?v=nhnBe3snCeg',
        'S1-33': 'https://www.youtube.com/watch?v=Z8a7fWFQIwo',
        'S1-34': 'https://www.youtube.com/watch?v=nPz9rDqZrJc',
        'S1-35': 'https://www.youtube.com/watch?v=xc4KvcJI6oc',
        'S1-36': 'https://www.youtube.com/watch?v=CMWktwYIn3k',
        'S1-37': 'https://www.youtube.com/watch?v=xgH5C67t9KA',
        'S1-38': 'https://www.youtube.com/watch?v=FnoyibBLomE',
        'S1-39': 'https://www.youtube.com/watch?v=rHLR_JBIR4o',
        'S1-40': 'https://www.youtube.com/watch?v=MJKKd0ajBVo',
        'S1-41': 'https://www.youtube.com/watch?v=nA3-dj1hcS0',
        'S1-42': 'https://www.youtube.com/watch?v=mkqUZZKzrkA',
        'S1-43': 'https://www.youtube.com/watch?v=02dVQr0g9Wo',
        'S1-44': 'https://www.youtube.com/watch?v=FpRMaZF-5BQ',
        'S1-45': 'https://www.youtube.com/watch?v=L_p7ZjT1oPs',
        'S1-46': 'https://www.youtube.com/watch?v=ku-FG2qFkfw',
        'S1-47': 'https://www.youtube.com/watch?v=EjsbqDEBjpM',
        'S1-48': 'https://www.youtube.com/watch?v=BHKhWlyHpcA',
        'S1-49': 'https://www.youtube.com/watch?v=EAfNrWd0cH8',
        'S1-50': 'https://www.youtube.com/watch?v=YSpxLsCmJQg',
        'S1-51': 'https://www.youtube.com/watch?v=gX8_kbG8Efo',
        'S1-52': 'https://www.youtube.com/watch?v=9OT754rx8jM',
        'S1-53': 'https://www.youtube.com/watch?v=DLbY5f06Ooc',
        'S1-54': 'https://www.youtube.com/watch?v=fhLMiYdxFhU',
        'S1-55': 'https://www.youtube.com/watch?v=wz4lnqSU6Bs',
        'S1-56': 'https://www.youtube.com/watch?v=qdFbWA9VWqk',
        'S1-57': 'https://www.youtube.com/watch?v=X2zCEWaBQ6M',
        'S1-58': 'https://www.youtube.com/watch?v=eP-xt2LTJqc',
        'S1-59': 'https://www.youtube.com/watch?v=ECe9Zg2n1JU',
        'S1-60': 'https://www.youtube.com/watch?v=Bx2ZBYaTSUQ',
        'S1-61': 'https://www.youtube.com/watch?v=sCAAczMjINE',
        'S1-62': 'https://www.youtube.com/watch?v=rQd8XPlXsmA',
        'S1-63': 'https://www.youtube.com/watch?v=EXbugLHw8tE',
        'S1-64': 'https://www.youtube.com/watch?v=PIJ_AyMhlmU',
        'S1-65': 'https://www.youtube.com/watch?v=xal-t4noVxY',
        'S1-66': 'https://www.youtube.com/watch?v=TLrr7vFGuBc',
        'S1-67': 'https://www.youtube.com/watch?v=4BKIgWjfz34',
        'S1-68': 'https://www.youtube.com/watch?v=9-7LU4XvMh4',
        'S1-69': 'https://www.youtube.com/watch?v=tdodGkffMuA',
        'S1-70': 'https://www.youtube.com/watch?v=iKDSqSuCcpc',
        // ===== S2 series =====
        'S2-01': 'https://www.youtube.com/watch?v=pAYjEsmsns8',
        'S2-03': 'https://www.youtube.com/watch?v=v1sK4uBNmbo',
        'S2-04': 'https://www.youtube.com/watch?v=d0z9t1xAf1E',
        'S2-06': 'https://www.youtube.com/watch?v=U1epmJSoxbc',
        'S2-15': 'https://www.youtube.com/watch?v=staYsV61m3s',
        'S2-17': 'https://www.youtube.com/watch?v=2pUPBTHl8Zo',
        'S2-19': 'https://www.youtube.com/watch?v=V2iImfXaV7Q',
        'S2-26': 'https://www.youtube.com/watch?v=I7UP00pjsTg',
        'S2-31': 'https://www.youtube.com/watch?v=jDWQ-6U_cwE',
        'S2-32': 'https://www.youtube.com/watch?v=Vp6gJoHg-oU',
        'S2-33': 'https://www.youtube.com/watch?v=8EzM6QGsyGY',
        'S2-34': 'https://www.youtube.com/watch?v=C8qSZ_bDrOg',
        'S2-35': 'https://www.youtube.com/watch?v=863EYNM7_vU',
        'S2-36': 'https://www.youtube.com/watch?v=vYzwNVGJH7Q',
        'S2-37': 'https://www.youtube.com/watch?v=iG6K9toQEgY',
        'S2-38': 'https://www.youtube.com/watch?v=IqZe4PfziDI',
        'S2-39': 'https://www.youtube.com/watch?v=KSf4nEweiRs',
        'S2-41': 'https://www.youtube.com/watch?v=e4PtqZHacXA',
        'S2-42': 'https://www.youtube.com/watch?v=wtt_zBJc1Kc',
        'S2-44': 'https://www.youtube.com/watch?v=XVJdDwB2if4',
        'S2-45': 'https://www.youtube.com/watch?v=dhjyvbIcTpM',
        'S2-46': 'https://www.youtube.com/watch?v=MHB4JzL7frI',
        'S2-47': 'https://www.youtube.com/watch?v=XLBjF7QH_1Q',
        'S2-48': 'https://www.youtube.com/watch?v=QWjm5JC21x8',
        'S2-49': 'https://www.youtube.com/watch?v=7XhomYgm5ho',
        'S2-50': 'https://www.youtube.com/watch?v=MKGUYsCQQtE',
        'S2-51': 'https://www.youtube.com/watch?v=dssnxycQPwE',
        'S2-52': 'https://www.youtube.com/watch?v=Sk2tbQkEgY4',
        'S2-53': 'https://www.youtube.com/watch?v=dssnxycQPwE', // same as S2-51 (mandala)
        'S2-56': 'https://www.youtube.com/watch?v=P_JNP9fdDPo',
        'S2-58': 'https://www.youtube.com/watch?v=1poIVyGZ1IE',
        'S2-59': 'https://www.youtube.com/watch?v=jqI91-lO6pw',
        'S2-60': 'https://www.youtube.com/watch?v=2Swcv_9ijL4',
        'S2-62': 'https://www.youtube.com/watch?v=rzGiWyS94aE',
        'S2-63': 'https://www.youtube.com/watch?v=x5FG5cslnK0',
        'S2-65': 'https://www.youtube.com/watch?v=_yqjC9Ty0Mg',
        'S2-67': 'https://www.youtube.com/watch?v=4x1ob5rOmh0',
        'S2-68': 'https://www.youtube.com/watch?v=Tjg6Jzb4Zqs',
        'S2-69': 'https://www.youtube.com/watch?v=h148xJQRso8',
        'S2-70': 'https://www.youtube.com/watch?v=zzUVi3HA7IA',
        'S2-72': 'https://www.youtube.com/watch?v=oODnwhOU9Jw',
        'S2-73': 'https://www.youtube.com/watch?v=LEXYMR06byM',
        'S2-75': 'https://www.youtube.com/watch?v=ZY3PAyVEkMg',
        'S2-76': 'https://www.youtube.com/watch?v=n3khpwgWwMc',
        'S2-77': 'https://www.youtube.com/watch?v=ZrGc4WyS1ZQ',
        'S2-79': 'https://www.youtube.com/watch?v=eeWnZwIJDfE',
        'S2-81': 'https://www.youtube.com/watch?v=hh1jZi_8zvo',
        'S2-88': 'https://www.youtube.com/watch?v=mL3h22cYrsI', // S2-88 mapped from search
        'S2-98': 'https://www.youtube.com/watch?v=nJP2SCY2JQ0',
        'S2-99': 'https://www.youtube.com/watch?v=bAFyQHEegRM',
        'S2-100': 'https://www.youtube.com/watch?v=9mWE2602Ce8',
        // ===== S3 series =====
        'S3-01': 'https://www.youtube.com/watch?v=1WvgwvtXhuA',
        'S3-03': 'https://www.youtube.com/watch?v=vCWAWU12kqI',
        'S3-06': 'https://www.youtube.com/watch?v=ePmDR7LilpM',
        'S3-10': 'https://www.youtube.com/watch?v=iRcZVn1G9F8',
        'S3-13': 'https://www.youtube.com/watch?v=1BhyYE21Gm0',
        'S3-16': 'https://www.youtube.com/watch?v=8YIf_JcKt60',
        'S3-17': 'https://www.youtube.com/watch?v=aovPVTk3yhE',
        'S3-21': 'https://www.youtube.com/watch?v=KarJGY18-fY',
        'S3-23': 'https://www.youtube.com/watch?v=aS0fgamNehk',
        'S3-29': 'https://www.youtube.com/watch?v=nS5cDT4v9lc',
        'S3-30': 'https://www.youtube.com/watch?v=zzk3-q5SsHw',
        'S3-32': 'https://www.youtube.com/watch?v=5slzjmVCcEs',
        'S3-33': 'https://www.youtube.com/watch?v=8Y1Y85A7ySM',
        'S3-34': 'https://www.youtube.com/watch?v=Pd-9ii8MiuE',
        'S3-35': 'https://www.youtube.com/watch?v=GSDzfgWUCmU',
        'S3-39': 'https://www.youtube.com/watch?v=vX-02CVLWm4',
        'S3-40': 'https://www.youtube.com/watch?v=nc5jb_Apl5Y',
        'S3-41': 'https://www.youtube.com/watch?v=0pH4W0nVMl8',
        'S3-44': 'https://www.youtube.com/watch?v=3KbIURvU060',
        'S3-45': 'https://www.youtube.com/watch?v=XdLnRhrQWqA',
        'S3-88': 'https://www.youtube.com/watch?v=mL3h22cYrsI',
        'S3-98': 'https://www.youtube.com/watch?v=uXUYI7ElPW4',
        'S3-100': 'https://www.youtube.com/watch?v=qnV-DuW46sQ',
        'S3-101': 'https://www.youtube.com/watch?v=qEK1hkBrpAs',
        // ===== S4 series =====
        'S4-08': 'https://www.youtube.com/watch?v=2eC_BjMuEIo',
        'S4-09': 'https://www.youtube.com/watch?v=f5uHjEfsuG4',
        'S4-10': 'https://www.youtube.com/watch?v=I41CbiVzkto',
        'S4-16': 'https://www.youtube.com/watch?v=fmENUUJVzRk',
        'S4-17': 'https://www.youtube.com/watch?v=BvLIXcLaFcU',
        'S4-24': 'https://www.youtube.com/watch?v=P3VOipr3iuU',
        'S4-29': 'https://www.youtube.com/watch?v=kHP2SoTbPxA',
        'S4-32': 'https://www.youtube.com/watch?v=kGFATzA7iYA',
        'S4-33': 'https://www.youtube.com/watch?v=KaEahHUZmoM',
        'S4-34': 'https://www.youtube.com/watch?v=Iw0U_xEa8zU',
        'S4-38': 'https://www.youtube.com/watch?v=0E_r1jKfyDg',
        'S4-39': 'https://www.youtube.com/watch?v=vMszbfS7n3M',
        'S4-40': 'https://www.youtube.com/watch?v=EszDWN39rso',
        'S4-46': 'https://www.youtube.com/watch?v=vv6X0eF1EKU',
        'S4-49': 'https://www.youtube.com/watch?v=uwL84WlXq9k',
        'S4-56': 'https://www.youtube.com/watch?v=rGtSAtfYsDw',
        'S4-71': 'https://www.youtube.com/watch?v=_UuTBsTbSq0',
        'S4-73': 'https://www.youtube.com/watch?v=hLsq4BYdv6A',
        'S4-74': 'https://www.youtube.com/watch?v=oDKGaGNew_0',
        'S4-75': 'https://www.youtube.com/watch?v=M9Ywp0Q-z7w',
        'S4-80': 'https://www.youtube.com/watch?v=C5OWX7wvEfs',
        'S4-83': 'https://www.youtube.com/watch?v=Jz1q7iYfzME',
        'S4-84': 'https://www.youtube.com/watch?v=LW7Q2ERoy3o',
        'S4-86': 'https://www.youtube.com/watch?v=XLjvaJImdmk',
        'S4-89': 'https://www.youtube.com/watch?v=yYZXvqyhlJk',
        'S4-93': 'https://www.youtube.com/watch?v=Oidca2II0t8',
        'S4-97': 'https://www.youtube.com/watch?v=hYoHh-r9WKE',
        'S4-98': 'https://www.youtube.com/watch?v=To5Rwq15p6o',
        'S4-99': 'https://www.youtube.com/watch?v=f7KWsvnXeJ8',
        'S4-100': 'https://www.youtube.com/watch?v=ocKEpy7GiY8',
        'S4-101': 'https://www.youtube.com/watch?v=sha5PGjqmOI',
        'S4-102': 'https://www.youtube.com/watch?v=gwNE1amtcQg',
        'S4-103': 'https://www.youtube.com/watch?v=AjmUeH48iik',
        'S4-104': 'https://www.youtube.com/watch?v=MW-gcuyG6mY',
        'S4-105': 'https://www.youtube.com/watch?v=iXc2NYQdvMc',
        'S4-106': 'https://www.youtube.com/watch?v=3l2kmJvXVK4',
        'S4-107': 'https://www.youtube.com/watch?v=AnQXHoOZb9w',
        'S4-108': 'https://www.youtube.com/watch?v=j5DrFidKko8',
        'S4-109': 'https://www.youtube.com/watch?v=xa7eaJpAAIA',
        'S4-110': 'https://www.youtube.com/watch?v=i6RXYlc2lwA',
        'S4-111': 'https://www.youtube.com/watch?v=VSyBJCU5pT8',
        'S4-112': 'https://www.youtube.com/watch?v=PG_GHakZT9I',
        'S4-114': 'https://www.youtube.com/watch?v=LkPxNXsyxTE',
        'S4-115': 'https://www.youtube.com/watch?v=-iX4qBHUzkc',
        'S4-116': 'https://www.youtube.com/watch?v=OMNAQJ3eOcI',
        'S4-117': 'https://www.youtube.com/watch?v=S0s0AB_6YPM',
        'S4-118': 'https://www.youtube.com/watch?v=ale1MCme73A',
        'S4-119': 'https://www.youtube.com/watch?v=eBP-8BtiwPo',
        'S4-120': 'https://www.youtube.com/watch?v=-q1nksdOU2I',
        'S4-121': 'https://www.youtube.com/watch?v=q8lfbLAyW7c',
        'S4-122': 'https://www.youtube.com/watch?v=Zi4AKjIWW5k',
        'S4-123': 'https://www.youtube.com/watch?v=zFgfIvP_tGU',
        'S4-124': 'https://www.youtube.com/watch?v=Rka4lPm7KrU',
        'S4-125': 'https://www.youtube.com/watch?v=ia_OI5JdQnk',
        'S4-126': 'https://www.youtube.com/watch?v=19Glzj_RF54',
        'S4-127': 'https://www.youtube.com/watch?v=r_SCc5H7PMU',
        'S4-128': 'https://www.youtube.com/watch?v=46Hc4EVxKaA',
        'S4-129': 'https://www.youtube.com/watch?v=6pniRv639HA',
        'S4-130': 'https://www.youtube.com/watch?v=2q1zBdMPXrg',
        // ===== VS series =====
        'VS-02': 'https://www.youtube.com/watch?v=VNbbMGVaoR8',
        'VS-03': 'https://www.youtube.com/watch?v=fqUzEvnQDJI',
        'VS-04': 'https://www.youtube.com/watch?v=j77n-SoWgQg',
        'VS-05': 'https://www.youtube.com/watch?v=3Uw1MZDY-8s',
        'VS-06': 'https://www.youtube.com/watch?v=K2Wcqrf48FA',
        'VS-08': 'https://www.youtube.com/watch?v=bW5AxtUJaKQ',
        'VS-09': 'https://www.youtube.com/watch?v=VZJWpmbSfj8',
        'VS-10': 'https://www.youtube.com/watch?v=p_M3BH1tiUM',
        'VS-11': 'https://www.youtube.com/watch?v=RdH6ZHsKqg0',
        'VS-12': 'https://www.youtube.com/watch?v=EtyAjsQFd6o',
        'VS-14': 'https://www.youtube.com/watch?v=wY0DXHXGPK8',
        'VS-15': 'https://www.youtube.com/watch?v=rfbxxMUuMLE',
        'VS-16': 'https://www.youtube.com/watch?v=6IcbvuHHak8',
        'VS-17': 'https://www.youtube.com/watch?v=6p6ZwFmg9Cc',
        'VS-18': 'https://www.youtube.com/watch?v=bbu0eUfeMJk',
        'VS-19': 'https://www.youtube.com/watch?v=a5Q1Gah5pXc',
        'VS-20': 'https://www.youtube.com/watch?v=y0Tbdzu8A0Y',
        'VS-21': 'https://www.youtube.com/watch?v=G2JFXEm-Lys',
        'VS-22': 'https://www.youtube.com/watch?v=J0ep-45_FJ8',
        'VS-23': 'https://www.youtube.com/watch?v=xmSJVX1fmXE',
        'VS-24': 'https://www.youtube.com/watch?v=FEt_1ISl-lw',
        'VS-25': 'https://www.youtube.com/watch?v=2alJoKfOFfw',
        'VS-26': 'https://www.youtube.com/watch?v=3-vtTegX2fU',
        'VS-27': 'https://www.youtube.com/watch?v=9GFhVemMN14',
        'VS-28': 'https://www.youtube.com/watch?v=6gVQnAFanH0',
        'VS-29': 'https://www.youtube.com/watch?v=R1Qtrcx8rzw',
        'VS-30': 'https://www.youtube.com/watch?v=x5PKU1isqSA',
        'VS-31': 'https://www.youtube.com/watch?v=rLpAxQLG4ac',
        'VS-33': 'https://www.youtube.com/watch?v=7RIATW9BV4I',
        'VS-35': 'https://www.youtube.com/watch?v=09DMZ1wVFfU',
        'VS-36': 'https://www.youtube.com/watch?v=E3pmUxLL5JU',
        'VS-37': 'https://www.youtube.com/watch?v=o-KiLqYkn6M',
        'VS-38': 'https://www.youtube.com/watch?v=U-4hSg6hzrw',
        'VS-39': 'https://www.youtube.com/watch?v=Ekf9uEzmeYc',
        'VS-40': 'https://www.youtube.com/watch?v=PNzziIUUJaE',
        'VS-41': 'https://www.youtube.com/watch?v=AgTdCj_9cFs',
        'VS-42': 'https://www.youtube.com/watch?v=PNzziIUUJaE', // placeholder for 晤談的力量
        // ===== VW series =====
        'VW-01': 'https://www.youtube.com/watch?v=6KurP6LBw0A',
        'VW-02': 'https://www.youtube.com/watch?v=cnAnXup5QHI',
        'VW-03': 'https://www.youtube.com/watch?v=kOqstAml4vM',
        'VW-04': 'https://www.youtube.com/watch?v=GUfgVHynXm8',
        'VW-05': 'https://www.youtube.com/watch?v=WDzJk6WiUgg',
        'VW-06': 'https://www.youtube.com/watch?v=geSOC2kHPdQ',
        'VW-06C': 'https://www.youtube.com/watch?v=geSOC2kHPdQ',
        'VW-07': 'https://www.youtube.com/watch?v=vpqTxVHOXQc',
        'VW-08': 'https://www.youtube.com/watch?v=3_s7niWmXC8',
        'VW-09': 'https://www.youtube.com/watch?v=goRvq7Tw6Ro',
        'VW-10': 'https://www.youtube.com/watch?v=N-aCLC0Ep9U',
        'VW-11': 'https://www.youtube.com/watch?v=SQRSk4_3SbM',
        'VW-12': 'https://www.youtube.com/watch?v=e-4G-rKhYsc',
        'VW-13': 'https://www.youtube.com/watch?v=4JrEobuDRhQ',
        'VW-14': 'https://www.youtube.com/watch?v=9BGQaPj1cAo',
};

let updated = 0;
let alreadyHad = 0;
let notFound = [];

data.forEach(book => {
        if (!book.code) return;
        let code = book.code.trim();

        // Clean URL params
        const cleanUrl = (u) => u ? u.split('&')[0] : u;

        // Try direct match
        let url = urls[code];

        // Try without leading zeros (S1-08 -> S1-8)
        if (!url) {
                const m = code.match(/^(S\d+|VW|VS)-0*(\d+C?)$/);
                if (m) url = urls[`${m[1]}-${m[2]}`];
        }

        if (url) {
                url = cleanUrl(url);
                if (book.english_url) {
                        alreadyHad++;
                } else {
                        book.english_url = url;
                        updated++;
                        console.log(`+ ${book.code} ${(book.title_cn || '').substring(0, 20)} -> ${url}`);
                }
        } else {
                if (!book.english_url && book.title_cn !== '[Private video]') {
                        notFound.push(`${book.code} ${book.title_cn || ''}`);
                }
        }
});

fs.writeFileSync('public/books.json', JSON.stringify(data, null, 2), 'utf8');
console.log(`\n=== Summary ===`);
console.log(`New english_url added: ${updated}`);
console.log(`Already had english_url: ${alreadyHad}`);
console.log(`Total with english_url: ${data.filter(b => b.english_url).length}/${data.length}`);
console.log(`\nStill missing (${notFound.length}):`);
notFound.forEach(x => console.log(`  - ${x}`));
