import sha256 from 'crypto-js/sha256';
import JavaScriptObfuscator from 'javascript-obfuscator';

import moment from 'moment';

let MakeJSObfuscate = (js, seed = 1) => {
    var obfuscationResult = JavaScriptObfuscator.obfuscate(
        js,
        {
            compact: true,
            controlFlowFlattening: false,
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: false,
            deadCodeInjectionThreshold: 0.4,
            debugProtection: false,
            debugProtectionInterval: false,
            disableConsoleOutput: false,
            domainLock: [],
            forceTransformStrings: [],
            identifierNamesGenerator: 'hexadecimal',
            identifiersDictionary: [],
            identifiersPrefix: '',
            inputFileName: '',
            log: false,
            numbersToExpressions: false,
            optionsPreset: 'default',
            renameGlobals: false,
            renameProperties: false,
            reservedNames: [],
            reservedStrings: [],
            rotateStringArray: true,
            seed: seed,
            selfDefending: false,
            shuffleStringArray: true,
            simplify: true,
            sourceMapMode: 'separate',
            splitStrings: false,
            splitStringsChunkLength: 10,
            stringArray: true,
            stringArrayEncoding: ['base64'],
            stringArrayWrappersCount: 1,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersType: 'function',
            stringArrayThreshold: 0.75,
            target: 'browser',
            transformObjectKeys: false,
            unicodeEscapeSequence: false
        }
    );
    return obfuscationResult.getObfuscatedCode();
}

export const code = {
    getProblems_js: () => {
        return MakeJSObfuscate(`window.frames['shock'].contentWindow.frames['exam'].document.querySelector('form#Carryout input#testidseq').value`);
    },
    setTime_js: (second) => {

        // PastTime (real time)
        // T_time (display time)
        // stime (start time)

        second = parseInt(second) || 2000;
        let result = `
window.frames['shock'].contentWindow.frames['exam'].PastTime=${second};
window.frames['shock'].contentWindow.frames['exam'].T_time=${second};
window.frames['shock'].contentWindow.frames['exam'].document.getElementById('stime').value = '${moment().add(-(second), 'seconds').format('YYYY-MM-DD H:mm:ss')}';
`;
        return MakeJSObfuscate(result);
    },
    sample_problem: `1606,1605,1604,1602,1603,1601,1625,1622,1613,1612,1624,1609,1626,1615,1629,1618,1614,1623,1620,1608,1631,1617,1610,1611,1627,1607,1616,1630,1628,1619,1621,1632,1633,1634,1635,1636,1637,1638,1639,1640,1641,1642,1643,1644,1645,1646,1647,1648,1649,1650,1651,1652,1653,1654,1655,1656,1657,1658,1659,1660,1661,1662,1663,1664,1665,1666,1667,1668,1669,1670,1671,1672,1673,1674,1675,1676,1677,1678,1679,1680,1681,1682,1683,1684,1685,1686,1687,1688,1689,1690,1691,1692,1693,1694,1695,1696,1697,1698,1699,1700`,
    autoAnswer_js: (answer) => {
        let seed = sha256(answer);
        let result = '';
        answer.forEach(function (obj, index) {
            result += `window.frames['shock'].contentWindow.frames['exam'].i11(${index + 1},\u0027${obj}\u0027);\n`;
        });
        return MakeJSObfuscate(result, seed);
    }
};

export let problem = {}

initDB();
function initDB() {
    var problemMap = {};
    function addToMap(dataQ, dataA) {
        for (let i = 0; i < dataQ.length; i++) {
            var question_id = dataQ[i];
            var question_answer = dataA[i];
            if (typeof problemMap[question_id] !== 'undefined' && problemMap[question_id] !== question_answer) {
                console.warn("Question ID %s answer conflict, (%s->%s)", question_id, problemMap[question_id], question_answer);
            }
            problemMap[question_id] = question_answer;
        }
    }

    var data_Q = [], data_A = [];

    // DATA
    // L
    data_Q = [3, 5, 1, 6, 2, 4, 16, 17, 31, 15, 12, 29, 22, 7, 24, 14, 10, 18, 21, 19, 11, 27, 25, 8, 26, 20, 13, 9, 30, 28, 23, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
    data_A = ["A", "C", "A", "B", "C", "D", "C", "C", "B", "A", "A", "A", "B", "B", "A", "B", "C", "B", "C", "C", "C", "B", "B", "C", "B", "C", "C", "A", "B", "C", "A", "A", "A", "B", "D", "D", "A", "B", "C", "A", "D", "C", "C", "A", "A", "C", "D", "A", "B", "B", "D", "D", "C", "B", "C", "C", "C", "D", "C", "B", "B", "A", "A", "B", "B", "A", "B", "D", "B", "A", "D", "D", "A", "A", "B", "C", "A", "D", "B", "B", "C", "D", "B", "C", "C", "A", "C", "C", "A", "C", "B", "A", "B", "C", "C", "C", "B", "D", "C", "B"];
    addToMap(data_Q, data_A);

    // R
    data_Q = [124, 113, 103, 121, 101, 111, 122, 117, 129, 115, 116, 106, 104, 112, 109, 130, 119, 125, 102, 126, 120, 123, 108, 118, 105, 110, 127, 114, 128, 107, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200];
    data_A = ["B", "A", "B", "A", "A", "A", "B", "A", "A", "D", "B", "D", "D", "D", "A", "B", "A", "C", "B", "A", "D", "C", "C", "D", "D", "C", "B", "C", "D", "C", "C", "A", "D", "A", "C", "C", "A", "D", "A", "D", "C", "D", "D", "D", "A", "B", "C", "B", "D", "D", "B", "D", "D", "A", "C", "A", "C", "B", "A", "A", "C", "B", "A", "B", "A", "D", "A", "C", "A", "D", "C", "B", "C", "D", "A", "D", "A", "A", "C", "B", "D", "D", "D", "C", "D", "A", "B", "A", "D", "D", "B", "C", "A", "C", "C", "D", "B", "A", "C", "A"];
    addToMap(data_Q, data_A);

    // DATA
    // L
    data_Q = [1606, 1605, 1604, 1602, 1603, 1601, 1625, 1622, 1613, 1612, 1624, 1609, 1626, 1615, 1629, 1618, 1614, 1623, 1620, 1608, 1631, 1617, 1610, 1611, 1627, 1607, 1616, 1630, 1628, 1619, 1621, 1632, 1633, 1634, 1635, 1636, 1637, 1638, 1639, 1640, 1641, 1642, 1643, 1644, 1645, 1646, 1647, 1648, 1649, 1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677, 1678, 1679, 1680, 1681, 1682, 1683, 1684, 1685, 1686, 1687, 1688, 1689, 1690, 1691, 1692, 1693, 1694, 1695, 1696, 1697, 1698, 1699, 1700];
    data_A = ["B", "D", "B", "A", "D", "A", "A", "C", "C", "C", "C", "B", "C", "B", "A", "B", "C", "B", "A", "B", "B", "B", "A", "B", "B", "A", "A", "A", "A", "C", "C", "C", "D", "B", "B", "C", "C", "A", "D", "C", "A", "C", "A", "D", "B", "B", "B", "B", "C", "D", "D", "B", "B", "B", "C", "C", "D", "C", "B", "C", "C", "A", "B", "A", "C", "B", "C", "B", "A", "C", "D", "B", "C", "A", "C", "D", "A", "C", "B", "A", "A", "A", "B", "B", "D", "B", "C", "B", "D", "B", "A", "B", "C", "A", "B", "B", "D", "A", "B", "B"];
    addToMap(data_Q, data_A);
    // R
    data_Q = [1703, 1711, 1721, 1717, 1713, 1716, 1712, 1719, 1708, 1728, 1710, 1720, 1729, 1704, 1714, 1707, 1715, 1725, 1706, 1701, 1709, 1726, 1724, 1723, 1722, 1727, 1730, 1702, 1718, 1705, 1731, 1732, 1733, 1734, 1735, 1736, 1737, 1738, 1739, 1740, 1741, 1742, 1743, 1744, 1745, 1746, 1747, 1748, 1749, 1750, 1751, 1752, 1753, 1754, 1755, 1756, 1757, 1758, 1759, 1760, 1761, 1762, 1763, 1764, 1765, 1766, 1767, 1768, 1769, 1770, 1771, 1772, 1773, 1774, 1775, 1776, 1777, 1778, 1779, 1780, 1781, 1782, 1783, 1784, 1785, 1786, 1787, 1788, 1789, 1790, 1791, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1799, 1800];
    data_A = ["C", "C", "B", "B", "A", "C", "A", "B", "D", "C", "C", "C", "B", "A", "C", "B", "B", "C", "A", "B", "B", "D", "C", "A", "C", "A", "A", "D", "A", "B", "D", "D", "A", "A", "D", "A", "C", "C", "B", "A", "C", "D", "D", "A", "B", "A", "A", "B", "A", "D", "C", "B", "D", "A", "C", "C", "D", "B", "C", "C", "C", "A", "C", "B", "C", "B", "C", "C", "B", "C", "D", "A", "A", "D", "C", "D", "C", "A", "A", "B", "B", "A", "A", "B", "A", "D", "A", "D", "D", "B", "B", "D", "D", "A", "A", "A", "B", "D", "C", "D"];
    addToMap(data_Q, data_A);

    // 2020.3.30
    // L
    data_Q = [517, 516, 717, 702, 505, 526, 512, 509, 721, 504, 521, 730, 525, 514, 527, 503, 510, 724, 729, 719, 722, 519, 703, 507, 701, 528, 501, 518, 715, 728, 531, 532, 533, 534, 539, 540, 541, 542, 735, 736, 737, 738, 743, 744, 745, 746, 547, 548, 549, 550, 747, 748, 753, 754, 555, 556, 557, 558, 559, 560, 565, 566, 567, 561, 562, 563, 564, 572, 573, 574, 575, 772, 773, 774, 775, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600, 796, 797, 798, 799, 800];
    data_A = ["D", "A", "A", "A", "D", "A", "D", "C", "D", "B", "B", "B", "A", "A", "B", "D", "A", "A", "B", "B", "B", "B", "D", "A", "A", "C", "A", "A", "C", "C", "C", "B", "B", "A", "D", "A", "A", "D", "D", "B", "A", "D", "C", "C", "D", "C", "B", "B", "C", "D", "B", "B", "D", "D", "D", "B", "B", "D", "B", "D", "D", "C", "A", "B", "A", "C", "A", "D", "C", "C", "B", "B", "C", "B", "B", "D", "C", "C", "C", "D", "D", "C", "B", "A", "A", "B", "D", "D", "D", "C", "D", "A", "D", "C", "B", "D", "B", "B", "C", "D"];
    addToMap(data_Q, data_A);
    // R
    data_Q = [602, 601, 403, 603, 404, 405, 424, 627, 421, 423, 625, 626, 428, 425, 609, 620, 628, 617, 610, 414, 431, 413, 611, 417, 420, 412, 410, 631, 618, 613, 430, 432, 433, 434, 435, 436, 437, 438, 439, 440, 453, 454, 455, 459, 460, 461, 462, 463, 464, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 650, 651, 652, 653, 654, 655, 656, 657, 658, 477, 478, 479, 480, 481, 482, 483, 484, 485, 489, 490, 491, 498, 499, 500, 680, 681, 682, 683, 684, 685, 692, 693, 694, 695, 696, 697, 698, 699, 700];
    data_A = ["D", "B", "A", "D", "C", "B", "A", "C", "A", "B", "C", "B", "B", "B", "C", "B", "C", "A", "B", "B", "B", "C", "B", "C", "B", "B", "A", "B", "B", "C", "A", "C", "A", "C", "D", "B", "C", "C", "C", "D", "B", "D", "D", "D", "C", "C", "D", "A", "A", "D", "C", "D", "A", "C", "D", "A", "D", "B", "C", "B", "C", "A", "D", "B", "C", "D", "A", "B", "A", "B", "A", "D", "B", "D", "C", "B", "A", "D", "B", "A", "A", "B", "B", "A", "B", "B", "B", "D", "B", "C", "B", "C", "C", "B", "B", "C", "A", "A", "B", "B"];
    addToMap(data_Q, data_A);

    // 2020.4.26
    // L
    data_Q = [803, 1203, 1204, 1201, 802, 805, 1226, 817, 1213, 1227, 1208, 1210, 1217, 810, 819, 1211, 827, 812, 1216, 1228, 1219, 1221, 1215, 1224, 822, 807, 829, 1230, 1209, 828, 818, 838, 839, 840, 844, 845, 846, 850, 851, 852, 853, 854, 855, 856, 857, 858, 865, 866, 867, 1235, 1236, 1237, 1244, 1245, 1246, 1247, 1248, 1249, 1253, 1254, 1255, 1262, 1263, 1264, 1265, 1266, 1267, 1268, 1269, 1270, 877, 878, 879, 883, 884, 885, 886, 887, 888, 889, 890, 891, 895, 896, 897, 898, 899, 900, 1271, 1272, 1273, 1274, 1275, 1276, 1289, 1290, 1291, 1298, 1299, 1300];
    data_A = ["B", "B", "C", "B", "B", "D", "C", "B", "A", "A", "A", "B", "A", "C", "C", "C", "B", "B", "C", "B", "A", "B", "B", "A", "A", "A", "C", "A", "B", "A", "C", "A", "D", "A", "C", "B", "B", "A", "D", "C", "A", "D", "B", "B", "D", "B", "A", "C", "A", "C", "D", "B", "A", "C", "D", "B", "D", "D", "B", "B", "B", "A", "A", "C", "A", "B", "C", "C", "A", "D", "D", "B", "A", "A", "C", "C", "C", "B", "D", "B", "C", "B", "B", "D", "C", "B", "A", "D", "A", "B", "C", "A", "D", "C", "C", "B", "B", "A", "B", "A"];
    addToMap(data_Q, data_A);
    // R
    data_Q = [901, 930, 1306, 1316, 923, 1313, 911, 925, 912, 1302, 909, 1327, 908, 927, 919, 1330, 1311, 1328, 1326, 1314, 918, 1301, 905, 922, 902, 1303, 906, 1305, 1318, 903, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 1339, 1340, 1341, 1342, 947, 948, 951, 952, 1347, 1348, 1353, 1354, 958, 959, 960, 1358, 1359, 1360, 1365, 1366, 1367, 968, 969, 970, 971, 972, 973, 974, 975, 1361, 1362, 1363, 1364, 976, 977, 978, 979, 980, 991, 992, 993, 994, 995, 1381, 1382, 1383, 1384, 1385, 1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398, 1399, 1400];
    data_A = ["D", "A", "A", "C", "A", "D", "D", "C", "B", "A", "B", "C", "A", "A", "B", "D", "C", "A", "C", "B", "B", "C", "D", "C", "A", "D", "C", "B", "A", "C", "C", "D", "A", "C", "D", "B", "A", "C", "B", "A", "D", "C", "C", "C", "D", "A", "D", "B", "D", "C", "B", "D", "A", "B", "A", "D", "D", "C", "A", "D", "B", "D", "D", "B", "C", "A", "C", "A", "A", "B", "C", "C", "D", "C", "C", "A", "D", "D", "A", "D", "C", "D", "C", "D", "B", "C", "A", "D", "B", "C", "B", "C", "B", "C", "D", "A", "D", "B", "C", "B"];
    addToMap(data_Q, data_A);

    // 2020.5.23
    // L
    data_Q = [1601, 1402, 1403, 1405, 1605, 1406, 1431, 1617, 1615, 1621, 1425, 1409, 1613, 1612, 1411, 1426, 1608, 1408, 1421, 1422, 1623, 1631, 1407, 1430, 1607, 1410, 1420, 1429, 1428, 1622, 1614, 1438, 1439, 1440, 1444, 1445, 1446, 1447, 1448, 1449, 1456, 1457, 1458, 1468, 1469, 1470, 1635, 1636, 1637, 1638, 1639, 1640, 1641, 1642, 1643, 1647, 1648, 1649, 1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1665, 1666, 1667, 1474, 1475, 1476, 1480, 1481, 1482, 1489, 1490, 1491, 1495, 1496, 1497, 1671, 1672, 1673, 1683, 1684, 1685, 1689, 1690, 1691, 1692, 1693, 1694, 1695, 1696, 1697, 1698, 1699, 1700];
    data_A = ["A", "D", "C", "A", "D", "B", "B", "B", "B", "C", "C", "A", "C", "C", "B", "A", "B", "C", "C", "A", "B", "B", "A", "B", "A", "A", "B", "C", "A", "C", "C", "A", "A", "C", "A", "D", "D", "C", "D", "A", "C", "A", "D", "A", "D", "C", "B", "C", "C", "A", "D", "C", "A", "C", "A", "B", "B", "C", "D", "D", "B", "B", "B", "C", "C", "D", "C", "C", "B", "C", "A", "A", "B", "A", "B", "A", "A", "D", "B", "A", "B", "A", "D", "B", "C", "B", "B", "D", "D", "B", "A", "B", "C", "A", "B", "B", "D", "A", "B", "B"];
    addToMap(data_Q, data_A);
    // R
    data_Q = [1701, 1719, 1510, 1710, 1503, 1522, 1512, 1528, 1526, 1504, 1716, 1516, 1524, 1720, 1713, 1523, 1730, 1725, 1711, 1530, 1714, 1515, 1505, 1723, 1508, 1702, 1506, 1722, 1729, 1707, 1531, 1532, 1533, 1534, 1535, 1536, 1537, 1538, 1539, 1540, 1541, 1542, 1543, 1544, 1545, 1546, 1549, 1550, 1551, 1552, 1749, 1750, 1753, 1754, 1558, 1559, 1560, 1758, 1759, 1760, 1761, 1762, 1763, 1568, 1569, 1570, 1571, 1764, 1765, 1766, 1767, 1772, 1773, 1774, 1775, 1576, 1577, 1578, 1579, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1781, 1782, 1783, 1784, 1785, 1796, 1797, 1798, 1799, 1800];
    data_A = ["B", "B", "C", "C", "B", "C", "D", "C", "B", "C", "C", "B", "B", "C", "A", "B", "A", "C", "C", "A", "C", "C", "D", "A", "C", "D", "A", "C", "B", "B", "B", "C", "D", "A", "D", "C", "C", "D", "A", "A", "C", "A", "C", "C", "B", "A", "A", "D", "A", "B", "A", "D", "D", "A", "B", "C", "D", "B", "C", "C", "C", "A", "C", "B", "D", "A", "A", "B", "C", "B", "C", "A", "A", "D", "C", "B", "C", "A", "B", "C", "B", "C", "C", "A", "C", "B", "A", "B", "A", "C", "B", "A", "A", "B", "A", "A", "B", "D", "C", "D"];
    addToMap(data_Q, data_A);

    // 2020.10.21  109_1_進階英文 	109_1_Test1    Toeic2018
    data_Q = [202, 204, 205, 201, 206, 203, 219, 231, 223, 210, 213, 224, 220, 216, 217, 207, 225, 215, 211, 230, 218, 229, 208, 228, 212, 209, 214, 222, 227, 226, 221, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300];
    data_A = ["A", "C", "D", "C", "D", "D", "A", "A", "C", "B", "B", "C", "B", "B", "B", "C", "A", "A", "C", "A", "C", "C", "A", "B", "B", "B", "A", "A", "B", "A", "C", "B", "C", "A", "C", "C", "B", "A", "B", "C", "B", "B", "A", "D", "B", "C", "A", "B", "C", "A", "D", "D", "C", "D", "A", "D", "D", "A", "C", "C", "B", "B", "A", "B", "B", "A", "B", "B", "B", "D", "C", "B", "D", "B", "A", "A", "B", "C", "C", "A", "D", "B", "D", "C", "C", "D", "D", "C", "D", "B", "A", "C", "A", "C", "B", "D", "C", "B", "D", "D"];
    addToMap(data_Q, data_A);
    data_Q = [328, 322, 311, 303, 330, 307, 324, 315, 317, 319, 325, 310, 304, 312, 302, 316, 314, 323, 326, 305, 318, 306, 308, 327, 321, 301, 329, 320, 309, 313, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400];
    data_A = ["A", "D", "B", "D", "D", "B", "D", "D", "C", "B", "A", "C", "A", "C", "B", "D", "D", "B", "A", "C", "B", "C", "A", "A", "B", "B", "C", "C", "D", "A", "D", "B", "C", "A", "C", "D", "B", "A", "A", "C", "A", "C", "D", "D", "C", "A", "A", "A", "D", "B", "C", "C", "C", "B", "A", "B", "A", "D", "B", "D", "D", "B", "C", "B", "D", "C", "D", "D", "A", "A", "D", "A", "D", "C", "D", "D", "D", "B", "D", "D", "B", "B", "C", "A", "D", "A", "B", "D", "D", "D", "B", "D", "C", "A", "D", "C", "D", "C", "B", "D"];
    addToMap(data_Q, data_A);

    // 2020.11.28  109_1_進階英文	109_1_Test2	   Toeic2018
    data_Q = [404, 405, 402, 406, 401, 403, 431, 422, 430, 424, 409, 414, 420, 421, 412, 427, 410, 419, 426, 416, 413, 418, 423, 407, 415, 425, 428, 417, 408, 429, 411, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500];
    data_A = ["C", "B", "B", "C", "D", "A", "B", "A", "A", "A", "B", "B", "B", "A", "B", "B", "A", "C", "C", "B", "C", "B", "B", "A", "C", "B", "B", "C", "A", "B", "C", "C", "A", "C", "D", "B", "C", "C", "C", "D", "D", "C", "B", "D", "C", "B", "A", "D", "D", "D", "C", "A", "B", "D", "D", "C", "B", "A", "D", "C", "C", "D", "A", "A", "B", "D", "D", "B", "B", "B", "C", "C", "A", "A", "D", "D", "A", "D", "B", "D", "C", "B", "A", "D", "B", "B", "D", "C", "A", "A", "B", "D", "C", "B", "C", "A", "A", "B", "A", "B"];
    addToMap(data_Q, data_A);
    data_Q = [527, 528, 509, 503, 518, 519, 514, 502, 511, 516, 505, 517, 510, 504, 526, 525, 506, 523, 512, 521, 515, 508, 530, 501, 524, 513, 529, 507, 522, 520, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600];
    data_A = ["B", "C", "C", "D", "A", "B", "A", "A", "B", "A", "D", "D", "A", "B", "A", "A", "A", "D", "D", "B", "C", "C", "C", "A", "C", "A", "C", "A", "A", "B", "C", "B", "B", "A", "B", "D", "A", "A", "D", "A", "A", "D", "A", "C", "D", "B", "B", "B", "C", "D", "B", "C", "C", "D", "D", "B", "B", "D", "B", "D", "B", "A", "C", "A", "D", "C", "A", "C", "C", "B", "A", "D", "C", "C", "B", "D", "C", "C", "C", "D", "D", "C", "B", "A", "A", "A", "C", "D", "A", "B", "B", "D", "D", "D", "C", "D", "A", "D", "C", "B"];
    addToMap(data_Q, data_A);

    // 2020.12.24  109_1_進階英文	109_1_Test3    Toeic2018
    data_Q = [606, 603, 602, 601, 604, 605, 609, 622, 614, 625, 612, 620, 631, 610, 624, 626, 629, 623, 613, 621, 616, 611, 619, 627, 608, 628, 617, 630, 607, 615, 618, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700];
    data_A = ["D", "D", "D", "B", "C", "C", "C", "B", "B", "C", "B", "B", "B", "B", "C", "B", "C", "B", "C", "A", "A", "B", "C", "C", "C", "C", "A", "C", "A", "B", "B", "D", "C", "D", "A", "C", "D", "A", "D", "B", "C", "B", "C", "C", "A", "B", "B", "C", "A", "A", "D", "B", "C", "D", "A", "B", "A", "B", "B", "A", "A", "B", "D", "B", "D", "A", "B", "B", "A", "D", "B", "D", "B", "A", "C", "D", "D", "A", "A", "B", "B", "D", "B", "C", "B", "A", "B", "D", "D", "D", "A", "C", "C", "B", "B", "C", "A", "A", "B", "B"];
    addToMap(data_Q, data_A);
    data_Q = [706, 703, 707, 710, 719, 717, 705, 729, 701, 728, 723, 709, 704, 720, 725, 702, 724, 716, 721, 715, 714, 708, 722, 711, 726, 712, 727, 730, 718, 713, 731, 732, 733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800];
    data_A = ["B", "D", "A", "B", "B", "A", "B", "B", "A", "C", "A", "A", "B", "C", "A", "A", "A", "C", "D", "C", "D", "B", "B", "A", "D", "A", "A", "B", "C", "C", "B", "D", "B", "A", "D", "B", "A", "D", "C", "C", "D", "D", "C", "C", "D", "C", "B", "B", "D", "A", "A", "A", "D", "D", "D", "B", "D", "D", "D", "C", "C", "A", "D", "B", "A", "B", "D", "D", "A", "C", "B", "B", "C", "B", "B", "D", "C", "D", "D", "C", "C", "D", "B", "A", "D", "C", "D", "D", "C", "D", "C", "D", "B", "C", "C", "D", "B", "B", "C", "D"];
    addToMap(data_Q, data_A);

    problem = problemMap;
}


