
/**
 *
 * @param {Array<Object>} list
 * @return {number}
 */
const valids = (list) => {
    let res = 0;
    list.forEach(obj => {
        const keys = Object.keys(obj)
        if (keys.length === 8) res+= isValid(obj) ? 1:0;
        else if (keys.length === 7 && !keys.includes('cid')) res+= isValid(obj) ? 1:0
    })
    return res;
}

/**
 *
 * @param {Object} obj
 * @return {boolean}
 */
const isValid = (obj) => {
    const byr = (RegExp(/\d{4}/).test(obj['byr']) && parseInt(obj['byr']) >= 1920 && parseInt(obj['byr']) <= 2002);
    const iyr = (RegExp(/\d{4}/).test(obj['iyr']) && parseInt(obj['iyr']) >= 2010 && parseInt(obj['iyr']) <= 2020);
    const eyr =(RegExp(/\d{4}/).test(obj['eyr']) && parseInt(obj['eyr']) >= 2020 && parseInt(obj['eyr']) <= 2030);
    const hgt = (RegExp(/\d+cm$/).test(obj['hgt']) && parseInt(obj['hgt'].substring(0, obj['hgt'].length - 2)) >= 150 && parseInt(obj['hgt'].substring(0, obj['hgt'].length - 2)) <= 194)
        || (RegExp(/\d+in$/).test(obj['hgt']) && parseInt(obj['hgt'].substring(0, obj['hgt'].length - 2)) >= 59 && parseInt(obj['hgt'].substring(0, obj['hgt'].length - 2)) <= 76);
    const hcl = (RegExp(/#[0-9a-z]{6}/).test(obj['hcl'])  && obj['hcl'].length === 7);
    const ecl = (RegExp(/amb|blu|brn|gry|grn|hzl|oth/).test(obj['ecl'])  && obj['ecl'].length === 3);
    const pid = (RegExp(/\d{9}/).test(obj['pid']) && obj['pid'].length === 9);
    return byr && iyr && ecl && eyr && hcl && hgt && pid;
}

/**
 * @param {string} input
 * @return {Array<Object>}
 */
const convert = (input) => {
    const list =  input.split('\n\n');
    return list.map(e => {
        let obj = {};
        let l = e.split(RegExp(/\s/));
        l.forEach(el => {
            const [key, value] = el.split(':');
            obj[key] = value;
        })
        return obj;
    });

}



const main = () => {
    const input =   "pid:827837505 byr:1976\n" +
        "hgt:187cm\n" +
        "iyr:2016\n" +
        "hcl:#fffffd\n" +
        "eyr:2024\n" +
        "\n" +
        "hgt:189cm byr:1987 pid:572028668 iyr:2014 hcl:#623a2f\n" +
        "eyr:2028 ecl:amb\n" +
        "\n" +
        "pid:#e9bf38 hcl:z iyr:2029 byr:2028 ecl:#18f71a hgt:174in eyr:2036\n" +
        "\n" +
        "hcl:#cfa07d byr:1982 pid:573165334 ecl:gry eyr:2022 iyr:2012 hgt:180cm\n" +
        "\n" +
        "cid:151 hcl:#c0946f\n" +
        "ecl:brn hgt:66cm iyr:2013 pid:694421369\n" +
        "byr:1980 eyr:2029\n" +
        "\n" +
        "ecl:brn\n" +
        "pid:9337568136 eyr:2026\n" +
        "hcl:#6b5442\n" +
        "hgt:69cm iyr:2019 byr:2025\n" +
        "\n" +
        "cid:66 hcl:#efcc98 pid:791118269 iyr:2013\n" +
        "eyr:2020 ecl:grn hgt:183cm byr:1993\n" +
        "\n" +
        "eyr:2022\n" +
        "hgt:160cm iyr:2016 byr:1969 pid:767606888 ecl:gry hcl:#6b5442\n" +
        "\n" +
        "hgt:157cm eyr:2026 ecl:oth hcl:#efcc98 byr:1938 iyr:2014\n" +
        "\n" +
        "byr:1931 iyr:2015\n" +
        "ecl:gry\n" +
        "hgt:76in\n" +
        "cid:227 hcl:#09592c eyr:2024 pid:276365391\n" +
        "\n" +
        "ecl:gry hgt:170cm iyr:2014 cid:285 pid:870052514\n" +
        "hcl:#866857 byr:1925 eyr:2025\n" +
        "\n" +
        "eyr:2021\n" +
        "byr:1960 pid:569950896\n" +
        "iyr:2010 hgt:179cm hcl:#888785 cid:167\n" +
        "\n" +
        "hgt:154in cid:194\n" +
        "pid:8142023665 byr:2010 hcl:7d22ff ecl:utc iyr:2026 eyr:1976\n" +
        "\n" +
        "ecl:blu eyr:2030 hgt:192cm\n" +
        "pid:363860866 iyr:2019 hcl:#ceb3a1 byr:1963\n" +
        "\n" +
        "byr:1947 hgt:167cm hcl:#7d3b0c ecl:amb\n" +
        "cid:70 eyr:2022 iyr:2019 pid:756932371\n" +
        "\n" +
        "hgt:185cm pid:871945454\n" +
        "iyr:2020\n" +
        "hcl:#866857 ecl:amb\n" +
        "byr:1989 cid:184 eyr:2030\n" +
        "\n" +
        "byr:1935 pid:322117407\n" +
        "hgt:153cm iyr:2011\n" +
        "cid:244 eyr:2022 hcl:#efcc98 ecl:hzl\n" +
        "\n" +
        "ecl:blu hcl:#5e6c12\n" +
        "eyr:2029 iyr:2011 hgt:191cm byr:1992\n" +
        "\n" +
        "hcl:#7d3b0c eyr:2029\n" +
        "hgt:163cm\n" +
        "pid:625292172 byr:1932 ecl:brn\n" +
        "iyr:2020\n" +
        "\n" +
        "hgt:158cm\n" +
        "eyr:2030 iyr:2016 byr:1969\n" +
        "cid:173 pid:092921211 hcl:#602927 ecl:grn\n" +
        "\n" +
        "hcl:#733820\n" +
        "iyr:2016 eyr:2029\n" +
        "ecl:hzl hgt:180cm pid:292904469 byr:1984\n" +
        "\n" +
        "ecl:amb pid:901224456 hgt:190cm\n" +
        "iyr:2013\n" +
        "hcl:#733820\n" +
        "byr:1922\n" +
        "\n" +
        "pid:262285164 iyr:2010\n" +
        "byr:2018 eyr:2026 hcl:#602927 hgt:179cm ecl:gmt cid:349\n" +
        "\n" +
        "byr:1956 eyr:2027 pid:351551997 hgt:71in cid:277 hcl:#cfa07d iyr:2010 ecl:grn\n" +
        "\n" +
        "eyr:2027 hcl:#602927 hgt:157cm ecl:gry\n" +
        "cid:128 byr:1953\n" +
        "pid:231551549 iyr:2012\n" +
        "\n" +
        "iyr:2011 pid:771266976\n" +
        "cid:264 byr:1955 hcl:#b6652a\n" +
        "hgt:189cm ecl:blu\n" +
        "eyr:2030\n" +
        "\n" +
        "eyr:2026 pid:698455242\n" +
        "byr:1949 ecl:gry hgt:190cm\n" +
        "iyr:2013 hcl:#efcc98 cid:139\n" +
        "\n" +
        "ecl:blu hgt:181cm byr:1977 iyr:2011 eyr:2022\n" +
        "pid:454163967 hcl:#b6652a\n" +
        "\n" +
        "pid:534506872 hgt:155cm iyr:2012\n" +
        "byr:1968\n" +
        "cid:333 eyr:2024 hcl:#623a2f\n" +
        "ecl:amb\n" +
        "\n" +
        "hgt:162cm\n" +
        "iyr:2020\n" +
        "hcl:#733820 eyr:2027 byr:1995 ecl:gry pid:084994685\n" +
        "\n" +
        "iyr:2016 byr:1990\n" +
        "ecl:amb pid:185689022 eyr:2025\n" +
        "hgt:184cm hcl:#866857\n" +
        "\n" +
        "byr:2016 hcl:z iyr:2022 hgt:166in\n" +
        "eyr:2040\n" +
        "\n" +
        "byr:1943 hgt:152cm hcl:#cfa07d ecl:hzl iyr:2016 cid:300 pid:376088014\n" +
        "\n" +
        "iyr:2020 eyr:2026 hcl:#602927 ecl:gry byr:1962 pid:453907789 hgt:172cm\n" +
        "\n" +
        "eyr:2023 hgt:185cm\n" +
        "hcl:#623a2f pid:963767258 byr:1977\n" +
        "iyr:2019 ecl:oth\n" +
        "\n" +
        "hgt:159cm byr:1965 cid:349 ecl:blu pid:962908167\n" +
        "iyr:2013 eyr:2024\n" +
        "hcl:#fffffd\n" +
        "\n" +
        "eyr:2026\n" +
        "pid:912822238 hgt:66in byr:1985 iyr:2018 hcl:#c0946f ecl:hzl\n" +
        "\n" +
        "hgt:167cm hcl:#ceb3a1\n" +
        "byr:1990 eyr:2027 ecl:grn\n" +
        "iyr:2011 pid:642877667\n" +
        "\n" +
        "hcl:#7d3b0c byr:1921 pid:976412756 hgt:192cm\n" +
        "iyr:2013 ecl:gry\n" +
        "\n" +
        "iyr:2030 pid:283599139\n" +
        "eyr:2039 cid:203\n" +
        "hcl:f943cb\n" +
        "hgt:111\n" +
        "\n" +
        "hgt:190cm\n" +
        "iyr:2027 ecl:blu hcl:z\n" +
        "byr:2004 eyr:2039\n" +
        "pid:734570034\n" +
        "\n" +
        "hcl:#6b5442 hgt:191cm\n" +
        "ecl:oth byr:1989 pid:669414669 cid:196 iyr:2016 eyr:2023\n" +
        "\n" +
        "ecl:brn eyr:2028 byr:1965 pid:630674502 hcl:#602927 iyr:2020 hgt:61in\n" +
        "\n" +
        "iyr:2016 eyr:2022 cid:225\n" +
        "hcl:#733820 ecl:hzl hgt:166cm\n" +
        "byr:1934\n" +
        "pid:232742206\n" +
        "\n" +
        "ecl:amb hcl:#602927 eyr:2029\n" +
        "pid:897535300\n" +
        "hgt:189cm byr:1952\n" +
        "iyr:2017\n" +
        "\n" +
        "pid:853604345\n" +
        "hgt:161cm cid:269\n" +
        "hcl:#fffffd eyr:2030 iyr:2011 ecl:grn byr:1966\n" +
        "\n" +
        "hgt:151cm hcl:#18171d eyr:2026 ecl:grn iyr:2016 pid:176cm\n" +
        "byr:2000\n" +
        "\n" +
        "hcl:#341e13\n" +
        "eyr:2022\n" +
        "pid:536989527 cid:73 byr:1971\n" +
        "ecl:hzl\n" +
        "\n" +
        "pid:739005658 hcl:#b6652a\n" +
        "eyr:2026 hgt:154cm ecl:hzl\n" +
        "iyr:2019 byr:1935\n" +
        "\n" +
        "pid:373465835 ecl:oth byr:1932 cid:333 hgt:165cm\n" +
        "hcl:#b6652a eyr:2021 iyr:2014\n" +
        "\n" +
        "byr:1967 pid:486658617 hcl:#18171d hgt:174cm\n" +
        "eyr:2021 iyr:2015 ecl:gry cid:53\n" +
        "\n" +
        "eyr:2024\n" +
        "cid:124 iyr:2017 hgt:152cm pid:095649305 hcl:#341e13\n" +
        "byr:1920 ecl:oth\n" +
        "\n" +
        "hcl:#623a2f\n" +
        "byr:1951 pid:993284548\n" +
        "cid:106\n" +
        "hgt:186cm\n" +
        "ecl:amb iyr:2017 eyr:2029\n" +
        "\n" +
        "cid:308 pid:080673934\n" +
        "hgt:193cm\n" +
        "byr:1967 hcl:#623a2f iyr:2016 ecl:hzl\n" +
        "eyr:2021\n" +
        "\n" +
        "iyr:2010 eyr:2024 byr:1946 hgt:156cm\n" +
        "cid:199\n" +
        "ecl:blu hcl:#866857\n" +
        "\n" +
        "ecl:blu byr:1955 eyr:2022 cid:95 pid:139391569\n" +
        "iyr:2019 hgt:180cm\n" +
        "hcl:#efcc98\n" +
        "\n" +
        "ecl:brn pid:579889368\n" +
        "eyr:2023 hgt:158cm byr:1935\n" +
        "iyr:2018 hcl:#cfa07d\n" +
        "\n" +
        "byr:1920 pid:90919899 hcl:#18171d\n" +
        "hgt:152cm\n" +
        "eyr:2029 ecl:oth iyr:2014\n" +
        "\n" +
        "byr:1961 eyr:2024\n" +
        "ecl:#d401e3 iyr:2011 hgt:172cm pid:919145070\n" +
        "cid:100\n" +
        "hcl:#efcc98\n" +
        "\n" +
        "ecl:gry\n" +
        "hgt:168cm\n" +
        "hcl:#888785 byr:1942 pid:731032830 iyr:2014\n" +
        "eyr:2028\n" +
        "\n" +
        "hcl:#6b5442 pid:265747619 hgt:191cm\n" +
        "cid:217\n" +
        "eyr:2028\n" +
        "iyr:2019 ecl:amb\n" +
        "byr:1948\n" +
        "\n" +
        "iyr:2011 ecl:brn\n" +
        "hgt:183cm hcl:#fffffd cid:258 byr:1983\n" +
        "pid:835909246\n" +
        "\n" +
        "byr:2030\n" +
        "iyr:2024 ecl:#f66808\n" +
        "hcl:fd548d cid:183\n" +
        "pid:#fced33\n" +
        "hgt:160in\n" +
        "\n" +
        "ecl:utc hgt:183in hcl:a92c31 pid:0394222041\n" +
        "iyr:2008\n" +
        "eyr:1976 byr:2020\n" +
        "\n" +
        "pid:126195650 iyr:2019 hcl:#341e13\n" +
        "ecl:blu\n" +
        "hgt:150cm\n" +
        "eyr:2025\n" +
        "byr:1964\n" +
        "\n" +
        "cid:71 iyr:2016 hgt:157 ecl:grt\n" +
        "hcl:#18171d pid:#1ab5ea eyr:2027\n" +
        "\n" +
        "eyr:2026 hcl:#b5266f\n" +
        "byr:1971\n" +
        "cid:269 hgt:192cm iyr:2012\n" +
        "pid:736578840 ecl:amb\n" +
        "\n" +
        "pid:152109472 hcl:#ceb3a1 ecl:grn hgt:188cm eyr:2027\n" +
        "byr:1923\n" +
        "\n" +
        "hcl:#341e13 pid:535175953 hgt:63in eyr:2028 iyr:2015 byr:1999 ecl:gry\n" +
        "\n" +
        "hgt:183cm pid:611738968 byr:2001\n" +
        "eyr:2020 hcl:#a97842 iyr:2014\n" +
        "ecl:gry\n" +
        "\n" +
        "eyr:2038 ecl:gmt pid:113210210 iyr:2012 byr:2011\n" +
        "hcl:z\n" +
        "hgt:157cm\n" +
        "\n" +
        "hgt:157cm\n" +
        "pid:699449127\n" +
        "iyr:2014 ecl:gry byr:1980 hcl:#fffffd eyr:2029\n" +
        "\n" +
        "iyr:2028 hcl:z pid:152cm\n" +
        "eyr:2039\n" +
        "ecl:#4760fb hgt:177in\n" +
        "byr:2017\n" +
        "\n" +
        "eyr:2026 hcl:#efcc98\n" +
        "iyr:2020 hgt:180cm ecl:hzl pid:747449965 byr:2016\n" +
        "\n" +
        "byr:1974 iyr:2019\n" +
        "cid:89 eyr:2023 pid:421418405\n" +
        "hcl:#fffffd hgt:192cm\n" +
        "ecl:gry\n" +
        "\n" +
        "hcl:26c2ef eyr:2029 cid:309 byr:1931 ecl:grn pid:#4eb099 iyr:2024\n" +
        "hgt:174cm\n" +
        "\n" +
        "ecl:gry\n" +
        "hgt:183cm\n" +
        "cid:281\n" +
        "eyr:2022 pid:050492569\n" +
        "byr:1968 hcl:c88145\n" +
        "iyr:2015\n" +
        "\n" +
        "eyr:2028\n" +
        "iyr:2014 pid:712984515 hgt:187cm cid:206 hcl:#866857 byr:1927\n" +
        "ecl:brn\n" +
        "\n" +
        "byr:1936 hgt:61in ecl:oth iyr:2012 pid:447813841\n" +
        "hcl:#c0946f\n" +
        "cid:126 eyr:2021\n" +
        "\n" +
        "ecl:gry pid:791970272\n" +
        "eyr:2020\n" +
        "byr:1932 hcl:#623a2f hgt:161cm\n" +
        "iyr:2015\n" +
        "\n" +
        "hcl:#c0946f\n" +
        "byr:1935 pid:721144576 eyr:2025 hgt:162cm\n" +
        "iyr:2017 ecl:oth\n" +
        "\n" +
        "byr:1959\n" +
        "pid:551109135\n" +
        "ecl:hzl hgt:68in\n" +
        "eyr:1977 hcl:#888785\n" +
        "iyr:1955 cid:100\n" +
        "\n" +
        "hgt:190in eyr:1993 pid:8358180772 iyr:1975\n" +
        "ecl:oth\n" +
        "byr:2024\n" +
        "hcl:3de172\n" +
        "\n" +
        "eyr:2030 hgt:190cm hcl:#a40ef3 byr:1935 pid:484932501\n" +
        "ecl:amb iyr:2016\n" +
        "\n" +
        "iyr:2015\n" +
        "byr:1964\n" +
        "hgt:176cm\n" +
        "pid:819552732 hcl:#c0946f ecl:amb cid:263\n" +
        "eyr:2024\n" +
        "\n" +
        "hgt:65cm cid:59 eyr:2027 pid:074880819 ecl:utc iyr:2023\n" +
        "byr:1954 hcl:#623a2f\n" +
        "\n" +
        "byr:1954 hgt:167cm iyr:2020\n" +
        "eyr:2023 hcl:#602927\n" +
        "pid:280295309\n" +
        "ecl:hzl cid:168\n" +
        "\n" +
        "hgt:168cm pid:311043701 iyr:2017 byr:1965\n" +
        "ecl:hzl\n" +
        "eyr:2026 hcl:#fffffd\n" +
        "\n" +
        "hcl:#fffffd ecl:grn pid:672987232 iyr:2012 eyr:2022 hgt:66in\n" +
        "\n" +
        "iyr:2012 ecl:#6f4f9f\n" +
        "hgt:133 byr:1937\n" +
        "eyr:1953 pid:7177768428 hcl:#602927\n" +
        "\n" +
        "iyr:2010\n" +
        "byr:1922 hcl:#c0946f\n" +
        "eyr:2029 ecl:gry\n" +
        "hgt:165cm\n" +
        "pid:893045052\n" +
        "\n" +
        "iyr:2013 eyr:2028 hcl:#866857 pid:137143403\n" +
        "ecl:brn hgt:170cm byr:1940 cid:194\n" +
        "\n" +
        "hgt:161cm\n" +
        "eyr:2027 pid:3966920279 ecl:gry iyr:2015 byr:1997 hcl:#cfa07d\n" +
        "\n" +
        "ecl:amb\n" +
        "hgt:157cm byr:1971\n" +
        "pid:562746894 cid:305 hcl:#0b0e1a eyr:2021 iyr:2016\n" +
        "\n" +
        "hcl:8b821d hgt:157cm pid:187cm cid:298 eyr:1926 iyr:2019\n" +
        "ecl:amb\n" +
        "byr:2030\n" +
        "\n" +
        "hgt:155cm hcl:#341e13 byr:1924 pid:779847670\n" +
        "ecl:hzl iyr:2015\n" +
        "eyr:2024\n" +
        "\n" +
        "pid:768590475 hcl:#a97842 iyr:2014 cid:128 eyr:2029\n" +
        "ecl:oth hgt:164cm byr:1990\n" +
        "\n" +
        "iyr:2019 hgt:181cm cid:342\n" +
        "eyr:2020 ecl:gry byr:2001\n" +
        "hcl:#623a2f\n" +
        "pid:473165431\n" +
        "\n" +
        "byr:1928 eyr:2026 hcl:#42a9cb iyr:2010\n" +
        "ecl:grn hgt:157cm pid:638074984\n" +
        "\n" +
        "eyr:2028\n" +
        "byr:1951\n" +
        "pid:239781647 iyr:2020 hgt:156cm\n" +
        "ecl:hzl cid:215 hcl:#efcc98\n" +
        "\n" +
        "pid:636605355 ecl:hzl\n" +
        "iyr:2017 cid:323 eyr:2025\n" +
        "byr:1995\n" +
        "hcl:#18171d hgt:187cm\n" +
        "\n" +
        "byr:1933 hcl:#866857 hgt:152cm ecl:oth iyr:2014 pid:900790914 eyr:2030 cid:267\n" +
        "\n" +
        "ecl:brn byr:1999 eyr:2027 hcl:#623a2f iyr:2017\n" +
        "pid:853165955\n" +
        "hgt:152cm\n" +
        "\n" +
        "eyr:2030 pid:316704688 hcl:#c0946f ecl:brn iyr:2014 hgt:193cm\n" +
        "\n" +
        "iyr:2012 byr:1928\n" +
        "hgt:154cm pid:570535769 hcl:#623a2f eyr:2026 ecl:hzl\n" +
        "\n" +
        "iyr:2016 cid:252 eyr:2030 hcl:#888785\n" +
        "hgt:177cm ecl:grn byr:2002 pid:568715162\n" +
        "\n" +
        "pid:570999226 iyr:2012 hgt:150cm\n" +
        "byr:2024\n" +
        "ecl:brn hcl:z eyr:2029\n" +
        "\n" +
        "pid:174002299 iyr:2019 hcl:#cfa07d ecl:brn byr:1927\n" +
        "cid:77 hgt:159cm eyr:2027\n" +
        "\n" +
        "ecl:#d16191 eyr:2022 pid:166cm hgt:165cm hcl:#18171d iyr:2015\n" +
        "\n" +
        "pid:112585759\n" +
        "hcl:#341e13 eyr:2025 byr:1962 hgt:164cm ecl:hzl iyr:2018\n" +
        "\n" +
        "pid:478415905 eyr:2025 cid:315\n" +
        "ecl:amb hgt:91\n" +
        "iyr:2014 hcl:#cc9d80\n" +
        "byr:1985\n" +
        "\n" +
        "pid:561885837 hcl:#7d3b0c\n" +
        "hgt:169cm\n" +
        "byr:1921 iyr:2014 cid:178\n" +
        "eyr:2022 ecl:gry\n" +
        "\n" +
        "ecl:#c87497 hcl:5321a2 eyr:2020 hgt:74in\n" +
        "pid:#7a62c6 iyr:1976\n" +
        "\n" +
        "eyr:2037\n" +
        "pid:858202391 hgt:162cm\n" +
        "ecl:grn byr:2003\n" +
        "cid:278\n" +
        "iyr:2010 hcl:cbf662\n" +
        "\n" +
        "ecl:blu iyr:2012 hgt:183cm hcl:#623a2f pid:848200472 byr:1997 eyr:2027\n" +
        "\n" +
        "byr:1942\n" +
        "hgt:164cm\n" +
        "pid:464257339\n" +
        "iyr:2016\n" +
        "hcl:#7d3b0c ecl:gry\n" +
        "\n" +
        "iyr:2012 hcl:#ceb3a1\n" +
        "hgt:193cm ecl:amb\n" +
        "pid:667987561 eyr:2024 byr:1960\n" +
        "\n" +
        "hgt:187cm\n" +
        "pid:222340640\n" +
        "iyr:2018 eyr:2022\n" +
        "ecl:oth\n" +
        "byr:1957\n" +
        "hcl:#336667 cid:83\n" +
        "\n" +
        "eyr:2025 iyr:2015 hcl:#733820\n" +
        "ecl:brn\n" +
        "pid:131195653\n" +
        "\n" +
        "hgt:185cm eyr:2026\n" +
        "ecl:amb byr:1998 pid:938587659 hcl:#733820\n" +
        "iyr:2016\n" +
        "\n" +
        "ecl:oth pid:300949722\n" +
        "eyr:2028 iyr:2016\n" +
        "byr:1933\n" +
        "hgt:179cm\n" +
        "hcl:#cfa07d\n" +
        "\n" +
        "byr:1974 iyr:2019\n" +
        "ecl:hzl hcl:#c0946f eyr:2024 pid:484547079\n" +
        "cid:112\n" +
        "hgt:185cm\n" +
        "\n" +
        "eyr:2022 iyr:2018 hcl:#fffffd pid:118568279\n" +
        "hgt:153cm ecl:gry byr:1941 cid:341\n" +
        "\n" +
        "iyr:2018\n" +
        "eyr:2027 hcl:#888785\n" +
        "byr:1970 hgt:165cm pid:773715893\n" +
        "ecl:amb\n" +
        "\n" +
        "hcl:#623a2f hgt:156cm byr:1938 iyr:2012 pid:745046822\n" +
        "ecl:amb\n" +
        "eyr:2030\n" +
        "\n" +
        "iyr:2012\n" +
        "pid:097961857\n" +
        "eyr:2023 hgt:66in hcl:#fffffd byr:1962 ecl:utc\n" +
        "\n" +
        "byr:1943 hgt:150cm\n" +
        "iyr:2012\n" +
        "pid:740693353 eyr:2023\n" +
        "hcl:#18171d cid:101 ecl:blu\n" +
        "\n" +
        "iyr:2018 pid:183728523 byr:1924 hgt:154cm eyr:2030\n" +
        "cid:167 ecl:blu hcl:#ceb3a1\n" +
        "\n" +
        "hgt:69cm\n" +
        "eyr:2025 hcl:z ecl:brn byr:1982 pid:250782159\n" +
        "iyr:2011\n" +
        "\n" +
        "byr:1998 iyr:2018 hcl:#341e13 eyr:2022 hgt:157cm pid:497100444 cid:266 ecl:gry\n" +
        "\n" +
        "eyr:2027 iyr:2011 hcl:#6b5442 hgt:156cm pid:494073085\n" +
        "byr:1998\n" +
        "ecl:hzl\n" +
        "\n" +
        "byr:1947 hcl:#b6652a\n" +
        "iyr:2011 pid:228986686 eyr:2030 hgt:175cm cid:70 ecl:brn\n" +
        "\n" +
        "eyr:2026 hgt:159cm\n" +
        "byr:1946 pid:534291476\n" +
        "iyr:2018 ecl:gry cid:225\n" +
        "hcl:#18171d\n" +
        "\n" +
        "pid:439665905\n" +
        "cid:311 ecl:amb iyr:2018\n" +
        "eyr:2030\n" +
        "hgt:186cm byr:1950\n" +
        "hcl:#cfa07d\n" +
        "\n" +
        "pid:250175056 hcl:#efcc98\n" +
        "byr:1981 cid:262 hgt:154cm ecl:gry iyr:2020 eyr:2027\n" +
        "\n" +
        "pid:461335515 iyr:2014 hcl:#f1cf00 hgt:180cm ecl:amb eyr:2027\n" +
        "byr:1956\n" +
        "\n" +
        "iyr:2014 eyr:2030 cid:194\n" +
        "pid:234623720 hcl:#733820\n" +
        "hgt:164cm byr:1929\n" +
        "ecl:blu\n" +
        "\n" +
        "byr:1992\n" +
        "eyr:2024 hcl:#ef8161 cid:216\n" +
        "ecl:brn hgt:177cm iyr:2018\n" +
        "pid:101726770\n" +
        "\n" +
        "hcl:#341e13 hgt:178cm iyr:2016 eyr:2029 byr:1945 pid:045325957 ecl:grn cid:99\n" +
        "\n" +
        "ecl:gry\n" +
        "iyr:2012\n" +
        "cid:52 hgt:168cm byr:1943\n" +
        "hcl:#cfa07d\n" +
        "pid:899608935 eyr:2030\n" +
        "\n" +
        "cid:241\n" +
        "byr:1934 hgt:161cm eyr:2027 iyr:2011 hcl:#c0946f ecl:amb pid:346857644\n" +
        "\n" +
        "iyr:2019 hgt:178cm\n" +
        "hcl:#c0946f byr:1957\n" +
        "eyr:2026\n" +
        "ecl:brn pid:222885240\n" +
        "\n" +
        "ecl:blu\n" +
        "eyr:2021 cid:312 hcl:#733820 hgt:186cm iyr:2012 byr:1969\n" +
        "pid:821704316\n" +
        "\n" +
        "hcl:#6b5442 cid:159\n" +
        "hgt:180cm\n" +
        "iyr:2018\n" +
        "eyr:2028\n" +
        "ecl:hzl byr:1966\n" +
        "pid:#e0238e\n" +
        "\n" +
        "pid:622400994 eyr:2022 hcl:#5b6635 iyr:2012 byr:1980\n" +
        "hgt:190cm ecl:oth\n" +
        "\n" +
        "byr:1976 ecl:gry eyr:2020 iyr:2020 hgt:171cm pid:219878671 hcl:#6b5442\n" +
        "\n" +
        "hgt:163cm byr:1968\n" +
        "pid:003521394 ecl:oth\n" +
        "iyr:2010\n" +
        "cid:61 hcl:#888785\n" +
        "\n" +
        "cid:115 pid:810722029 hgt:166cm byr:1955\n" +
        "ecl:blu eyr:2030 iyr:2018\n" +
        "\n" +
        "hgt:176cm\n" +
        "eyr:2025\n" +
        "pid:617393532 hcl:#733820 byr:1975 iyr:2018 ecl:grn\n" +
        "\n" +
        "hcl:#733820 byr:1979 pid:838168666\n" +
        "hgt:190cm ecl:oth cid:330\n" +
        "eyr:2029 iyr:2018\n" +
        "\n" +
        "eyr:1940 hgt:67cm iyr:2009 ecl:gry pid:#e76a62 byr:2020 hcl:z\n" +
        "\n" +
        "hgt:190cm ecl:brn pid:396113351\n" +
        "byr:1956 iyr:2010\n" +
        "hcl:#6b5442 eyr:2024\n" +
        "cid:256\n" +
        "\n" +
        "hcl:#efcc98\n" +
        "hgt:178cm byr:1984 iyr:2013 pid:752620212 eyr:2021 ecl:gry\n" +
        "\n" +
        "iyr:2014 hcl:#a97842\n" +
        "hgt:166cm ecl:blu eyr:2024\n" +
        "byr:1935\n" +
        "pid:836748873\n" +
        "\n" +
        "cid:236 ecl:amb hgt:168cm iyr:2010 hcl:#602927 byr:1950 eyr:2026 pid:404810674\n" +
        "\n" +
        "eyr:2030 ecl:grn\n" +
        "byr:1975 pid:064596263 hgt:193cm\n" +
        "iyr:2019 cid:71 hcl:#a97842\n" +
        "\n" +
        "iyr:2014\n" +
        "pid:298386733 hcl:#c0946f\n" +
        "hgt:180cm ecl:hzl cid:115 byr:1940 eyr:2023\n" +
        "\n" +
        "iyr:1960 hgt:139 ecl:#9db7b8 byr:1980 pid:#ef597b cid:54 eyr:2028 hcl:fdcda3\n" +
        "\n" +
        "iyr:2015 byr:1954 ecl:blu hgt:62in hcl:#ceb3a1 pid:253593755 eyr:2028\n" +
        "\n" +
        "eyr:2025 ecl:blu pid:216388098 iyr:2017 byr:1968 hgt:151cm hcl:#602927\n" +
        "\n" +
        "eyr:2022 hcl:#a97842\n" +
        "pid:606979543 iyr:2013 ecl:grn cid:63\n" +
        "hgt:186cm byr:1992\n" +
        "\n" +
        "ecl:gry\n" +
        "hgt:168cm hcl:#18171d iyr:2017 pid:670898814 byr:1983\n" +
        "eyr:2022\n" +
        "\n" +
        "hgt:155cm ecl:grn iyr:2012 pid:837979074 eyr:2024 hcl:#888785 byr:1972\n" +
        "\n" +
        "iyr:2015 pid:970743533 hcl:#866857 eyr:2027\n" +
        "byr:1921 ecl:brn\n" +
        "\n" +
        "eyr:2022\n" +
        "hgt:160cm\n" +
        "byr:1964 hcl:#efcc98 iyr:2019 ecl:oth pid:141923637\n" +
        "\n" +
        "byr:2029 pid:3313111652 ecl:brn eyr:2034\n" +
        "iyr:2013 hgt:193cm hcl:z\n" +
        "\n" +
        "pid:853890227 eyr:2029\n" +
        "hcl:#efcc98 iyr:2021 byr:2003 ecl:#037c39 hgt:160cm\n" +
        "\n" +
        "iyr:1927\n" +
        "byr:1992\n" +
        "eyr:2030\n" +
        "hcl:#efcc98\n" +
        "ecl:amb hgt:152cm pid:436765906\n" +
        "\n" +
        "iyr:2014\n" +
        "hcl:#c0946f pid:207052381\n" +
        "eyr:2024 ecl:hzl\n" +
        "hgt:177cm\n" +
        "byr:1923\n" +
        "\n" +
        "ecl:blu\n" +
        "iyr:2014\n" +
        "eyr:2025 hgt:165cm\n" +
        "hcl:#733820 pid:343011857 byr:1967\n" +
        "\n" +
        "ecl:xry\n" +
        "eyr:2028\n" +
        "iyr:2011 hgt:166in hcl:#c0946f\n" +
        "pid:805297331\n" +
        "cid:167 byr:1926\n" +
        "\n" +
        "byr:1947\n" +
        "pid:468012954 eyr:2026 ecl:oth iyr:2018 hgt:170cm hcl:#b6652a\n" +
        "\n" +
        "hcl:#6b5442 ecl:brn\n" +
        "hgt:180cm cid:233\n" +
        "pid:029789713\n" +
        "byr:1920 iyr:2010 eyr:2024\n" +
        "\n" +
        "iyr:2010 eyr:2027\n" +
        "hgt:156cm\n" +
        "hcl:#c0946f\n" +
        "byr:1960 pid:312723130 ecl:hzl\n" +
        "\n" +
        "eyr:2023 byr:1959 iyr:2010 hgt:186cm pid:066768932 ecl:grn hcl:#602927 cid:310\n" +
        "\n" +
        "eyr:2030 pid:460535178 hgt:171cm ecl:gry iyr:2020 byr:1934 hcl:#888785\n" +
        "\n" +
        "hgt:64cm eyr:2021 byr:1995 cid:336\n" +
        "ecl:gmt pid:926714223 iyr:2017 hcl:#18171d\n" +
        "\n" +
        "eyr:2022 iyr:2010\n" +
        "ecl:grn pid:285994301 cid:215\n" +
        "hgt:186cm byr:1978\n" +
        "\n" +
        "hgt:63in hcl:#866857\n" +
        "pid:386128445 iyr:2020 byr:1971 eyr:2021 ecl:gry\n" +
        "\n" +
        "hgt:183cm hcl:#733820 iyr:2015\n" +
        "ecl:blu pid:216205626 eyr:2022 byr:1941\n" +
        "\n" +
        "cid:150 ecl:amb pid:872515243 byr:1926\n" +
        "eyr:1996\n" +
        "hcl:#dedc39 hgt:67in iyr:2020\n" +
        "\n" +
        "byr:1927 ecl:brn cid:153 iyr:2011\n" +
        "pid:165190810 hcl:#fffffd\n" +
        "eyr:2028 hgt:64in\n" +
        "\n" +
        "pid:502603734\n" +
        "byr:1966 iyr:2015 hgt:176cm cid:205 ecl:brn hcl:#fffffd eyr:2021\n" +
        "\n" +
        "hcl:#18171d hgt:158cm byr:1943 iyr:2019\n" +
        "pid:058840094\n" +
        "eyr:2023\n" +
        "\n" +
        "byr:1962 hcl:#b6652a ecl:grn\n" +
        "cid:297\n" +
        "iyr:2010 pid:990422650\n" +
        "hgt:154cm eyr:2020\n" +
        "\n" +
        "eyr:1934 iyr:2011\n" +
        "ecl:gry\n" +
        "hcl:z byr:2004 hgt:63cm pid:6173356201\n" +
        "\n" +
        "pid:329432364 eyr:2029\n" +
        "ecl:grn hcl:#18171d iyr:2013\n" +
        "hgt:158cm byr:1960\n" +
        "\n" +
        "hcl:#efcc98 iyr:2016 hgt:186cm cid:215\n" +
        "pid:852781253 eyr:2027 ecl:blu byr:1937\n" +
        "\n" +
        "hcl:#623a2f ecl:gry iyr:2020 byr:1972 hgt:182cm pid:073426952 eyr:2027\n" +
        "\n" +
        "hcl:#3317b9 byr:1950 pid:304511418 hgt:177cm cid:124 eyr:2020 ecl:hzl iyr:2014\n" +
        "\n" +
        "eyr:2029\n" +
        "pid:034754507 byr:1936\n" +
        "cid:265 ecl:#b50997 hgt:183cm\n" +
        "hcl:#623a2f iyr:1924\n" +
        "\n" +
        "eyr:2024 byr:1927 cid:243 ecl:gry hcl:#6b5442 pid:714355627 hgt:160cm\n" +
        "iyr:2016\n" +
        "\n" +
        "hgt:152cm\n" +
        "ecl:gry hcl:#a97842\n" +
        "eyr:2029 byr:1952\n" +
        "pid:555308923 iyr:2010\n" +
        "\n" +
        "byr:2008\n" +
        "pid:19681314 hgt:180in iyr:2030 ecl:gry cid:272\n" +
        "eyr:2023\n" +
        "hcl:#b6652a\n" +
        "\n" +
        "cid:234\n" +
        "iyr:2014 byr:1940 ecl:hzl pid:042231105 hcl:#3bf69c hgt:172cm eyr:2029\n" +
        "\n" +
        "hcl:#efcc98 pid:831567586 hgt:190cm iyr:2017\n" +
        "byr:1966 eyr:2024 ecl:blu\n" +
        "\n" +
        "hcl:#341e13 ecl:blu\n" +
        "eyr:2022 cid:161 pid:197839646 iyr:2014\n" +
        "\n" +
        "hcl:#cfa07d\n" +
        "byr:1957\n" +
        "iyr:2019 hgt:181cm\n" +
        "pid:543775141 ecl:oth eyr:2021\n" +
        "\n" +
        "hcl:z\n" +
        "pid:#596c41 eyr:2035\n" +
        "byr:2008 iyr:1975\n" +
        "ecl:#c66ee6\n" +
        "hgt:150in\n" +
        "\n" +
        "ecl:grn\n" +
        "hcl:#7d3b0c iyr:2016\n" +
        "pid:804255369 eyr:2028 byr:1983 hgt:69in cid:82\n" +
        "\n" +
        "eyr:2022\n" +
        "iyr:2013 hgt:191cm ecl:gry\n" +
        "hcl:#a97842 pid:186827268 byr:1969\n" +
        "\n" +
        "pid:871672398 eyr:2026 byr:1946 ecl:oth\n" +
        "iyr:2015\n" +
        "hcl:#866857 hgt:185cm\n" +
        "\n" +
        "byr:1973\n" +
        "hgt:150cm\n" +
        "pid:905076707\n" +
        "iyr:2017\n" +
        "hcl:#2edf01 ecl:oth cid:221 eyr:2026\n" +
        "\n" +
        "eyr:2024 ecl:grn pid:955444191 hcl:z iyr:2015 byr:2008 hgt:151cm\n" +
        "\n" +
        "byr:1958 hcl:#fffffd pid:218986541 cid:203 ecl:brn hgt:154cm\n" +
        "iyr:2014\n" +
        "eyr:2026\n" +
        "\n" +
        "hcl:#623a2f byr:1964 ecl:oth iyr:2010 pid:525843363 hgt:164cm eyr:2025\n" +
        "\n" +
        "ecl:blu iyr:2013 hgt:193cm byr:1990 pid:612387132 hcl:#18171d cid:280 eyr:2028\n" +
        "\n" +
        "ecl:oth eyr:2022\n" +
        "pid:110447037 hgt:187cm byr:1967 hcl:#efcc98\n" +
        "\n" +
        "byr:1930\n" +
        "eyr:2026 hgt:159cm\n" +
        "iyr:2011\n" +
        "ecl:hzl hcl:#6b5442 pid:923471212\n" +
        "\n" +
        "cid:350\n" +
        "eyr:2029 pid:823592758 iyr:2018\n" +
        "ecl:grn byr:1972 hgt:167cm hcl:#18171d\n" +
        "\n" +
        "cid:76 eyr:2027 hcl:#6b5442 pid:099579798 byr:1930\n" +
        "iyr:2020\n" +
        "ecl:gry hgt:153cm\n" +
        "\n" +
        "byr:1957 ecl:brn\n" +
        "hcl:z iyr:2016 pid:352677969 hgt:189cm\n" +
        "eyr:2029\n" +
        "\n" +
        "cid:143 eyr:2035 pid:602952079\n" +
        "ecl:#9b73f0 hcl:#602927\n" +
        "iyr:2022 byr:1975\n" +
        "hgt:174cm\n" +
        "\n" +
        "byr:1971 pid:741305897 hgt:192cm\n" +
        "ecl:amb hcl:#888785 eyr:2028 iyr:2011\n" +
        "\n" +
        "ecl:oth iyr:2016\n" +
        "byr:1942 hgt:189cm hcl:#888785 eyr:2024 pid:054290182\n" +
        "\n" +
        "hcl:#a97842\n" +
        "byr:1945\n" +
        "ecl:amb pid:370849304\n" +
        "eyr:2028\n" +
        "iyr:2016 hgt:168cm\n" +
        "\n" +
        "hgt:154cm iyr:2015 eyr:2030 byr:1952 ecl:hzl hcl:#341e13 pid:996518075\n" +
        "\n" +
        "byr:1941 ecl:amb iyr:2014\n" +
        "hcl:#fffffd pid:560990286 eyr:2022 hgt:173cm\n" +
        "\n" +
        "ecl:blu byr:1974\n" +
        "hgt:150cm hcl:#ceb3a1 eyr:2020 iyr:2013\n" +
        "pid:827415351\n" +
        "\n" +
        "hcl:#623a2f eyr:2027 iyr:2011 pid:913199234 ecl:oth\n" +
        "byr:1990 hgt:178cm\n" +
        "\n" +
        "ecl:blu byr:1989 hcl:#b6652a\n" +
        "eyr:2026 pid:724881482 hgt:185cm iyr:2014\n" +
        "\n" +
        "cid:115 pid:255002731 eyr:2025 ecl:amb\n" +
        "byr:1934 iyr:2020 hcl:#7d3b0c\n" +
        "\n" +
        "hgt:150cm byr:1969 ecl:blu iyr:2023\n" +
        "hcl:#866857 pid:754288625 eyr:2029\n" +
        "\n" +
        "iyr:2011 hcl:#7d3b0c ecl:hzl\n" +
        "byr:1930\n" +
        "hgt:188cm\n" +
        "eyr:2023\n" +
        "pid:256556076 cid:136\n" +
        "\n" +
        "iyr:2025 byr:1978\n" +
        "ecl:#fe30a9 hcl:#efcc98 eyr:2029\n" +
        "pid:392032459 hgt:178cm\n" +
        "\n" +
        "eyr:2027 iyr:2017 hgt:160in\n" +
        "byr:1990 pid:131099122 hcl:#623a2f ecl:amb\n" +
        "\n" +
        "ecl:grn\n" +
        "byr:1978\n" +
        "eyr:2029 hcl:#18171d\n" +
        "hgt:165cm pid:172369888\n" +
        "cid:93\n" +
        "iyr:2011\n" +
        "\n" +
        "ecl:hzl\n" +
        "hcl:#733820 iyr:2010 eyr:2029 pid:127253449\n" +
        "hgt:156cm\n" +
        "byr:1963\n" +
        "\n" +
        "hcl:#6c8530\n" +
        "iyr:2020\n" +
        "byr:1929 eyr:2021 hgt:177cm ecl:oth pid:347925482\n" +
        "\n" +
        "eyr:2037 iyr:2026\n" +
        "pid:163cm\n" +
        "hgt:174in byr:2007 hcl:c1305f cid:134\n" +
        "ecl:#0cf85c\n" +
        "\n" +
        "iyr:2011 pid:033811215\n" +
        "hcl:#a97842 byr:2002 eyr:2021 hgt:186cm\n" +
        "ecl:brn\n" +
        "\n" +
        "hcl:#a97842\n" +
        "iyr:2020 eyr:2029 byr:1972 pid:535511110 hgt:160cm ecl:oth\n" +
        "\n" +
        "ecl:grn cid:89 hgt:193cm pid:73793987 iyr:2021 eyr:2027 byr:1939 hcl:z\n" +
        "\n" +
        "hcl:#623a2f\n" +
        "hgt:182cm cid:154\n" +
        "pid:873863966 iyr:2018 byr:1999 ecl:brn eyr:2031\n" +
        "\n" +
        "iyr:2014 eyr:2029\n" +
        "cid:71 hcl:#fffffd byr:1924 hgt:63in\n" +
        "ecl:gry pid:897972798\n" +
        "\n" +
        "hgt:76cm\n" +
        "hcl:z eyr:1955\n" +
        "iyr:2012 byr:2001 pid:9425090 ecl:hzl\n" +
        "\n" +
        "eyr:2021\n" +
        "pid:501861442\n" +
        "ecl:grn hcl:#d71ae9\n" +
        "byr:1977\n" +
        "hgt:167cm iyr:2015\n" +
        "\n" +
        "iyr:2014\n" +
        "hgt:170cm ecl:gry byr:1928 cid:314 hcl:#602927 eyr:2029\n" +
        "pid:836710987\n" +
        "\n" +
        "eyr:2027 hcl:#efcc98 ecl:amb iyr:2016 byr:1995 pid:603705616 hgt:179cm\n" +
        "\n" +
        "eyr:2030 hcl:#602927 cid:105 byr:1943 ecl:hzl\n" +
        "pid:381601507\n" +
        "hgt:188cm iyr:2020\n" +
        "\n" +
        "iyr:2011\n" +
        "byr:1993 hcl:#c0946f pid:292649640 hgt:139 ecl:hzl cid:268\n" +
        "eyr:1999\n" +
        "\n" +
        "cid:339 byr:1928\n" +
        "ecl:brn eyr:2022 hcl:#733820 hgt:191cm pid:282733347 iyr:2019\n" +
        "\n" +
        "hgt:176cm\n" +
        "byr:1935 ecl:brn cid:252 eyr:2023 pid:105060622 iyr:2020 hcl:#18171d\n" +
        "\n" +
        "ecl:hzl eyr:2029\n" +
        "hgt:193cm pid:770254253\n" +
        "hcl:#efcc98 iyr:2020 byr:1926\n" +
        "\n" +
        "pid:977785261 eyr:2022 iyr:2015 byr:1978\n" +
        "hcl:#733820 hgt:172cm\n" +
        "ecl:brn\n" +
        "\n" +
        "byr:2021\n" +
        "hgt:160in\n" +
        "ecl:gmt\n" +
        "eyr:2032 cid:345 pid:179cm\n" +
        "hcl:8f5c13 iyr:2029\n" +
        "\n" +
        "iyr:2018 hgt:182cm ecl:gry\n" +
        "pid:897076789 eyr:2023 hcl:#866857\n" +
        "byr:1980\n" +
        "\n" +
        "hgt:88 eyr:2039 cid:99 byr:2007 hcl:a1bb42 ecl:#a2f6bb\n" +
        "pid:2264966188\n" +
        "iyr:2022\n" +
        "\n" +
        "iyr:2012 cid:59 ecl:gry eyr:2021\n" +
        "byr:1931\n" +
        "hgt:172cm hcl:#7d3b0c pid:862416147\n" +
        "\n" +
        "byr:1962 eyr:2025\n" +
        "ecl:grn\n" +
        "hcl:#866857 hgt:180cm iyr:2014 pid:313647071\n" +
        "\n" +
        "eyr:2030 hgt:157cm byr:1985\n" +
        "iyr:2020\n" +
        "hcl:#7d3b0c pid:911544768\n" +
        "ecl:grn\n" +
        "\n" +
        "hgt:175cm\n" +
        "byr:1938\n" +
        "iyr:2020 ecl:amb hcl:#602927 eyr:2026 pid:144411560\n" +
        "\n" +
        "iyr:2019 ecl:amb hcl:#888785 eyr:2025 hgt:187cm\n" +
        "pid:942054361 byr:1939\n" +
        "\n" +
        "cid:168 pid:722146139 byr:1952 ecl:grn\n" +
        "iyr:2014 hgt:97\n" +
        "hcl:z\n" +
        "eyr:2023\n" +
        "\n" +
        "eyr:2024 pid:567528498 ecl:gry iyr:2012 byr:1990\n" +
        "hcl:#733820 hgt:193cm\n" +
        "cid:293\n" +
        "\n" +
        "hcl:#bc352c pid:321838059 byr:1930 hgt:178cm cid:213 eyr:2023 ecl:amb\n" +
        "iyr:2017\n" +
        "\n" +
        "hgt:173cm byr:1925 pid:070222017 iyr:2013 hcl:#ceb3a1 ecl:gry eyr:2024";

    const test = "eyr:1972 cid:100\n" +
        "hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926\n" +
        "\n" +
        "iyr:2019\n" +
        "hcl:#602927 eyr:1967 hgt:170cm\n" +
        "ecl:grn pid:012533040 byr:1946\n" +
        "\n" +
        "hcl:dab227 iyr:2012\n" +
        "ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277\n" +
        "\n" +
        "hgt:59cm ecl:zzz\n" +
        "eyr:2038 hcl:74454a iyr:2023\n" +
        "pid:3556412378 byr:2007";
    console.log(valids(convert(input)));
}
main();