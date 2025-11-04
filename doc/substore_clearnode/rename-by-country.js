/**
 * 节点重命名：只保留国家名
 * 自动识别节点名称中的国家信息，提取国家名并去掉其他内容
 * 对重复的国家添加递增序号（如：香港、香港02、香港03）
 * 
 * 支持：
 * - 中文国家/地区名识别
 * - Emoji 旗帜识别
 * - 英文国家名识别（可选）
 */

function operator(proxies = [], targetPlatform, context) {
    // 国家/地区映射表 - 将各种可能的标识映射到标准国家名
    const countryMap = {
        // 中文名称
        '香港': '香港',
        'HK': '香港',
        'Hong Kong': '香港',
        'HongKong': '香港',
        
        '台湾': '台湾',
        'TW': '台湾',
        'Taiwan': '台湾',
        
        '新加坡': '新加坡',
        'SG': '新加坡',
        'Singapore': '新加坡',
        
        '日本': '日本',
        'JP': '日本',
        'Japan': '日本',
        
        '韩国': '韩国',
        '南韩': '韩国',
        'KR': '韩国',
        'Korea': '韩国',
        
        '美国': '美国',
        'US': '美国',
        'USA': '美国',
        'United States': '美国',
        
        '英国': '英国',
        'UK': '英国',
        'United Kingdom': '英国',
        
        '德国': '德国',
        'DE': '德国',
        'Germany': '德国',
        
        '法国': '法国',
        'FR': '法国',
        'France': '法国',
        
        '加拿大': '加拿大',
        'CA': '加拿大',
        'Canada': '加拿大',
        
        '澳大利亚': '澳大利亚',
        '澳洲': '澳大利亚',
        'AU': '澳大利亚',
        'Australia': '澳大利亚',
        
        '俄罗斯': '俄罗斯',
        'RU': '俄罗斯',
        'Russia': '俄罗斯',
        
        '印度': '印度',
        'IN': '印度',
        'India': '印度',
        
        '土耳其': '土耳其',
        'TR': '土耳其',
        'Turkey': '土耳其',
        
        '菲律宾': '菲律宾',
        'PH': '菲律宾',
        'Philippines': '菲律宾',
        
        '泰国': '泰国',
        'TH': '泰国',
        'Thailand': '泰国',
        
        '马来西亚': '马来西亚',
        'MY': '马来西亚',
        'Malaysia': '马来西亚',
        
        '越南': '越南',
        'VN': '越南',
        'Vietnam': '越南',
        
        '印度尼西亚': '印度尼西亚',
        'ID': '印度尼西亚',
        'Indonesia': '印度尼西亚',
        
        '阿根廷': '阿根廷',
        'AR': '阿根廷',
        'Argentina': '阿根廷',
        
        '巴西': '巴西',
        'BR': '巴西',
        'Brazil': '巴西',
        
        '荷兰': '荷兰',
        'NL': '荷兰',
        'Netherlands': '荷兰',
        
        '意大利': '意大利',
        'IT': '意大利',
        'Italy': '意大利',
        
        '西班牙': '西班牙',
        'ES': '西班牙',
        'Spain': '西班牙',
        
        '瑞士': '瑞士',
        'CH': '瑞士',
        'Switzerland': '瑞士',
        
        '波兰': '波兰',
        'PL': '波兰',
        'Poland': '波兰',
        
        '瑞典': '瑞典',
        'SE': '瑞典',
        'Sweden': '瑞典',
        
        '挪威': '挪威',
        'NO': '挪威',
        'Norway': '挪威',
        
        '芬兰': '芬兰',
        'FI': '芬兰',
        'Finland': '芬兰',
        
        '丹麦': '丹麦',
        'DK': '丹麦',
        'Denmark': '丹麦',
        
        '爱尔兰': '爱尔兰',
        'IE': '爱尔兰',
        'Ireland': '爱尔兰',
        
        '以色列': '以色列',
        'IL': '以色列',
        'Israel': '以色列',
        
        '阿联酋': '阿联酋',
        'AE': '阿联酋',
        'UAE': '阿联酋',
        
        '南非': '南非',
        'ZA': '南非',
        'South Africa': '南非',
    };

    // Emoji 旗帜到国家名的映射
    const emojiMap = {
        '🇭🇰': '香港',
        '🇹🇼': '台湾',
        '🇸🇬': '新加坡',
        '🇯🇵': '日本',
        '🇰🇷': '韩国',
        '🇺🇸': '美国',
        '🇬🇧': '英国',
        '🇩🇪': '德国',
        '🇫🇷': '法国',
        '🇨🇦': '加拿大',
        '🇦🇺': '澳大利亚',
        '🇷🇺': '俄罗斯',
        '🇮🇳': '印度',
        '🇹🇷': '土耳其',
        '🇵🇭': '菲律宾',
        '🇹🇭': '泰国',
        '🇲🇾': '马来西亚',
        '🇻🇳': '越南',
        '🇮🇩': '印度尼西亚',
        '🇦🇷': '阿根廷',
        '🇧🇷': '巴西',
        '🇳🇱': '荷兰',
        '🇮🇹': '意大利',
        '🇪🇸': '西班牙',
        '🇨🇭': '瑞士',
        '🇵🇱': '波兰',
        '🇸🇪': '瑞典',
        '🇳🇴': '挪威',
        '🇫🇮': '芬兰',
        '🇩🇰': '丹麦',
        '🇮🇪': '爱尔兰',
        '🇮🇱': '以色列',
        '🇦🇪': '阿联酋',
        '🇿🇦': '南非',
    };

    // 识别节点名称中的国家
    function detectCountry(name) {
        // 1. 先检查 emoji 旗帜
        for (const [emoji, country] of Object.entries(emojiMap)) {
            if (name.includes(emoji)) {
                return country;
            }
        }

        // 2. 检查中文国家名和英文缩写（按长度降序排列，避免误匹配）
        const sortedKeys = Object.keys(countryMap).sort((a, b) => b.length - a.length);
        for (const key of sortedKeys) {
            // 对于2-3个字符的缩写，使用单词边界避免误匹配
            // 对于中文和长英文名，直接匹配
            let regex;
            if (/^[A-Z]{2,3}$/i.test(key)) {
                // 英文缩写：使用单词边界
                regex = new RegExp(`\\b${key}\\b`, 'i');
            } else if (/^[a-z\s]+$/i.test(key)) {
                // 纯英文单词：使用单词边界
                regex = new RegExp(`\\b${key}\\b`, 'i');
            } else {
                // 中文或混合：直接匹配
                regex = new RegExp(key, 'i');
            }
            
            if (regex.test(name)) {
                return countryMap[key];
            }
        }

        return null;
    }

    // 自定义正则替换规则
    // 可以在这里添加你想要的替换规则
    const customReplacements = [
        // {
        //     // 匹配包含 niubi 域名和端口的节点（如：666.niubi:1235）
        //     pattern: /\d+\.niubi[:\d]*/i,
        //     replacement: '关注Tg频道@nebuluxe'
        // },
        // {
        //     // 匹配包含 yo.cc 的节点（如：1yo.cc）
        //     pattern: /\d*yo\.cc/i,
        //     replacement: '及时获取最新节点'
        // },
        // {
        //     pattern: /广告|订阅|续费/i,
        //     replacement: '广告节点'
        // },
        // {
        //     pattern: /https?:\/\/[^\s]+/i,
        //     replacement: '访问链接'
        // },
        // {
        //     pattern: /(t\.me|telegram)\/\w+/i,
        //     replacement: 'TG频道'
        // }
        {
            pattern: /浏览器/i,
            replacement: '关注Tg频道@nebuluxe'
        },
        {
            pattern: /\d*yo\.cc/i,
            replacement: '及时获取最新节点'
        }
        // 你可以继续添加更多规则
        // {
        //     pattern: /你的正则表达式/i,
        //     replacement: '替换文本'
        // }
    ];

    // 检查节点名是否匹配自定义替换规则
    function applyCustomReplacements(name) {
        for (const rule of customReplacements) {
            if (rule.pattern.test(name)) {
                return rule.replacement;
            }
        }
        return null; // 没有匹配到自定义规则
    }

    // 记录每个国家出现的次数
    const countryCounter = {};
    
    // 记录自定义替换名称的出现次数
    const customCounter = {};

    // 处理每个节点
    return proxies.map(proxy => {
        const originalName = proxy.name;
        
        // 1. 首先检查是否匹配自定义替换规则
        const customName = applyCustomReplacements(originalName);
        if (customName) {
            // 匹配到自定义规则，应用替换并添加序号
            if (!customCounter[customName]) {
                customCounter[customName] = 1;
                proxy.name = customName;
            } else {
                customCounter[customName]++;
                const suffix = String(customCounter[customName]).padStart(2, '0');
                proxy.name = `${customName}${suffix}`;
            }
            // console.log(`自定义替换: ${originalName} -> ${proxy.name}`);
            return proxy;
        }

        // 2. 如果没有匹配自定义规则，尝试识别国家
        const country = detectCountry(originalName);

        if (country) {
            // 记录该国家的出现次数
            if (!countryCounter[country]) {
                countryCounter[country] = 1;
                // 第一个节点，直接使用国家名
                proxy.name = country;
            } else {
                // 不是第一个，添加序号
                countryCounter[country]++;
                const suffix = String(countryCounter[country]).padStart(2, '0');
                proxy.name = `${country}${suffix}`;
            }

            // 可选：在控制台输出重命名信息
            // console.log(`重命名: ${originalName} -> ${proxy.name}`);
        } else {
            // 如果没有识别到国家，保持原名
            // 或者你可以选择给它一个默认名称
            console.log(`未识别到国家: ${originalName}`);
        }

        return proxy;
    });
}

