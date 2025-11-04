/**
 * 测试脚本 - 节点重命名功能测试
 * 可以在本地运行此脚本来测试重命名效果
 */

// 模拟测试数据
const testProxies = [
    { name: '或请浏览器输入下方地址 666.niubi:1235', type: 'ss' },
    { name: '1yo.cc', type: 'ss' },
    { name: '6686.niubi:1236', type: 'vmess' },
    { name: '香港🇭🇰-BG-HY | 中南部移动专线', type: 'ss' },
    { name: '香港🇭🇰-BG-HY', type: 'ss' },
    { name: '新加坡 Premium Node | IEPL专线', type: 'vmess' },
    { name: '日本 Tokyo-01 | NTT', type: 'trojan' },
    { name: '美国 US-West | 洛杉矶', type: 'ss' },
    { name: '香港 CN2 GIA', type: 'ss' },
    { name: '台湾🇹🇼 Hinet', type: 'vmess' },
    { name: 'SG-Premium-01', type: 'ss' },
    { name: 'JP Tokyo 002', type: 'ss' },
    { name: 'UK London Premium', type: 'trojan' },
    { name: '🇰🇷 Seoul Fast', type: 'ss' },
    { name: 'Some Unknown Node', type: 'ss' },
    { name: 'HK-IPLC-Premium', type: 'ss' },
];

// 引入主脚本的逻辑（复制自 rename-by-country.js）
function operator(proxies = [], targetPlatform, context) {
    const countryMap = {
        '香港': '香港', 'HK': '香港', 'Hong Kong': '香港', 'HongKong': '香港',
        '台湾': '台湾', 'TW': '台湾', 'Taiwan': '台湾',
        '新加坡': '新加坡', 'SG': '新加坡', 'Singapore': '新加坡',
        '日本': '日本', 'JP': '日本', 'Japan': '日本',
        '韩国': '韩国', '南韩': '韩国', 'KR': '韩国', 'Korea': '韩国',
        '美国': '美国', 'US': '美国', 'USA': '美国', 'United States': '美国',
        '英国': '英国', 'UK': '英国', 'United Kingdom': '英国',
        '德国': '德国', 'DE': '德国', 'Germany': '德国',
        '法国': '法国', 'FR': '法国', 'France': '法国',
        '加拿大': '加拿大', 'CA': '加拿大', 'Canada': '加拿大',
        '澳大利亚': '澳大利亚', '澳洲': '澳大利亚', 'AU': '澳大利亚', 'Australia': '澳大利亚',
        '俄罗斯': '俄罗斯', 'RU': '俄罗斯', 'Russia': '俄罗斯',
        '印度': '印度', 'IN': '印度', 'India': '印度',
        '土耳其': '土耳其', 'TR': '土耳其', 'Turkey': '土耳其',
        '菲律宾': '菲律宾', 'PH': '菲律宾', 'Philippines': '菲律宾',
        '泰国': '泰国', 'TH': '泰国', 'Thailand': '泰国',
        '马来西亚': '马来西亚', 'MY': '马来西亚', 'Malaysia': '马来西亚',
        '越南': '越南', 'VN': '越南', 'Vietnam': '越南',
        '印度尼西亚': '印度尼西亚', 'ID': '印度尼西亚', 'Indonesia': '印度尼西亚',
        '阿根廷': '阿根廷', 'AR': '阿根廷', 'Argentina': '阿根廷',
        '巴西': '巴西', 'BR': '巴西', 'Brazil': '巴西',
        '荷兰': '荷兰', 'NL': '荷兰', 'Netherlands': '荷兰',
        '意大利': '意大利', 'IT': '意大利', 'Italy': '意大利',
        '西班牙': '西班牙', 'ES': '西班牙', 'Spain': '西班牙',
        '瑞士': '瑞士', 'CH': '瑞士', 'Switzerland': '瑞士',
        '波兰': '波兰', 'PL': '波兰', 'Poland': '波兰',
        '瑞典': '瑞典', 'SE': '瑞典', 'Sweden': '瑞典',
        '挪威': '挪威', 'NO': '挪威', 'Norway': '挪威',
        '芬兰': '芬兰', 'FI': '芬兰', 'Finland': '芬兰',
        '丹麦': '丹麦', 'DK': '丹麦', 'Denmark': '丹麦',
        '爱尔兰': '爱尔兰', 'IE': '爱尔兰', 'Ireland': '爱尔兰',
        '以色列': '以色列', 'IL': '以色列', 'Israel': '以色列',
        '阿联酋': '阿联酋', 'AE': '阿联酋', 'UAE': '阿联酋',
        '南非': '南非', 'ZA': '南非', 'South Africa': '南非',
    };

    const emojiMap = {
        '🇭🇰': '香港', '🇹🇼': '台湾', '🇸🇬': '新加坡', '🇯🇵': '日本',
        '🇰🇷': '韩国', '🇺🇸': '美国', '🇬🇧': '英国', '🇩🇪': '德国',
        '🇫🇷': '法国', '🇨🇦': '加拿大', '🇦🇺': '澳大利亚', '🇷🇺': '俄罗斯',
        '🇮🇳': '印度', '🇹🇷': '土耳其', '🇵🇭': '菲律宾', '🇹🇭': '泰国',
        '🇲🇾': '马来西亚', '🇻🇳': '越南', '🇮🇩': '印度尼西亚', '🇦🇷': '阿根廷',
        '🇧🇷': '巴西', '🇳🇱': '荷兰', '🇮🇹': '意大利', '🇪🇸': '西班牙',
        '🇨🇭': '瑞士', '🇵🇱': '波兰', '🇸🇪': '瑞典', '🇳🇴': '挪威',
        '🇫🇮': '芬兰', '🇩🇰': '丹麦', '🇮🇪': '爱尔兰', '🇮🇱': '以色列',
        '🇦🇪': '阿联酋', '🇿🇦': '南非',
    };

    function detectCountry(name) {
        for (const [emoji, country] of Object.entries(emojiMap)) {
            if (name.includes(emoji)) {
                return country;
            }
        }
        const sortedKeys = Object.keys(countryMap).sort((a, b) => b.length - a.length);
        for (const key of sortedKeys) {
            let regex;
            if (/^[A-Z]{2,3}$/i.test(key)) {
                regex = new RegExp(`\\b${key}\\b`, 'i');
            } else if (/^[a-z\s]+$/i.test(key)) {
                regex = new RegExp(`\\b${key}\\b`, 'i');
            } else {
                regex = new RegExp(key, 'i');
            }
            if (regex.test(name)) {
                return countryMap[key];
            }
        }
        return null;
    }

    // 自定义正则替换规则
    const customReplacements = [
        {
            pattern: /\d+\.niubi[:\d]*/i,
            replacement: '关注Tg频道@nebuluxe'
        },
        {
            pattern: /\d*yo\.cc/i,
            replacement: '及时获取最新节点'
        },
    ];

    function applyCustomReplacements(name) {
        for (const rule of customReplacements) {
            if (rule.pattern.test(name)) {
                return rule.replacement;
            }
        }
        return null;
    }

    const countryCounter = {};
    const customCounter = {};

    return proxies.map(proxy => {
        const originalName = proxy.name;
        
        // 1. 首先检查自定义替换规则
        const customName = applyCustomReplacements(originalName);
        if (customName) {
            if (!customCounter[customName]) {
                customCounter[customName] = 1;
                proxy.name = customName;
            } else {
                customCounter[customName]++;
                const suffix = String(customCounter[customName]).padStart(2, '0');
                proxy.name = `${customName}${suffix}`;
            }
            console.log(`✓ [自定义] ${originalName} -> ${proxy.name}`);
            return proxy;
        }

        // 2. 识别国家
        const country = detectCountry(originalName);

        if (country) {
            if (!countryCounter[country]) {
                countryCounter[country] = 1;
                proxy.name = country;
            } else {
                countryCounter[country]++;
                const suffix = String(countryCounter[country]).padStart(2, '0');
                proxy.name = `${country}${suffix}`;
            }
            console.log(`✓ ${originalName} -> ${proxy.name}`);
        } else {
            console.log(`✗ 未识别: ${originalName}`);
        }

        return proxy;
    });
}

// 运行测试
console.log('='.repeat(60));
console.log('开始测试节点重命名功能');
console.log('='.repeat(60));
console.log('');

const result = operator(testProxies);

console.log('');
console.log('='.repeat(60));
console.log('测试结果汇总');
console.log('='.repeat(60));
console.log('');

result.forEach((proxy, index) => {
    console.log(`${index + 1}. ${testProxies[index].name}`);
    console.log(`   -> ${proxy.name}`);
    console.log('');
});

// 如果在 Node.js 环境运行
if (typeof module !== 'undefined' && module.exports) {
    module.exports = operator;
}

