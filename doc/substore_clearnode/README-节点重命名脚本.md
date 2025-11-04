# 节点重命名脚本 - 文件说明

## 📦 文件列表

### 1. `rename-by-country.js` ⭐
**主脚本文件 - 用于 Sub-Store**

这是你需要在 Sub-Store 中使用的主要脚本文件。将此文件的内容复制到 Sub-Store 的"脚本操作"中即可使用。

**功能：**
- 识别节点名称中的国家信息
- 只保留国家名，去掉其他内容
- 对重复国家添加递增序号

**使用方法：**
1. 复制整个文件内容
2. 在 Sub-Store 前端界面 → 订阅 → 添加操作 → 脚本操作
3. 粘贴代码并保存

---

### 2. `USAGE-GUIDE.md` 📖
**快速使用指南**

快速上手指南，包含：
- 如何在 Sub-Store 中使用脚本
- 使用示例和效果演示
- 支持的国家列表
- 自定义修改方法
- 常见问题解答

**推荐先阅读此文件！**

---

### 3. `rename-by-country-README.md` 📚
**详细文档**

完整的技术文档，包含：
- 详细的功能说明
- 支持的所有国家/地区（40+）
- 高级自定义选项
- 故障排除指南
- 版本要求

---

### 4. `rename-by-country-test.js` 🧪
**测试脚本**

用于本地测试脚本功能，无需 Sub-Store 环境。

**运行方法：**
```bash
cd /root/data/test/Sub-Store/scripts
node rename-by-country-test.js
```

**测试内容：**
- 各种格式的节点名称识别
- 序号递增功能
- 边界情况处理

---

## 🚀 快速开始

### 最简单的使用方式：

1. **复制脚本**
   ```bash
   cat rename-by-country.js
   ```
   复制输出的所有内容

2. **打开 Sub-Store**
   - 访问你的 Sub-Store 管理页面
   - 选择要处理的订阅
   - 点击"添加操作" → "脚本操作"

3. **粘贴并保存**
   - 粘贴刚才复制的脚本代码
   - 保存设置

4. **查看效果**
   - 点击预览查看重命名效果
   - 确认无误后即可使用

---

## 💡 使用效果示例

### 原始节点名称：
```
香港🇭🇰-BG-HY | 中南部移动专线
香港🇭🇰-BG-HY
新加坡 Premium Node | IEPL专线
日本 Tokyo-01 | NTT
美国 US-West | 洛杉矶
香港 CN2 GIA
台湾🇹🇼 Hinet
SG-Premium-01
JP Tokyo 002
UK London Premium
🇰🇷 Seoul Fast
HK-IPLC-Premium
```

### 重命名后：
```
香港
香港02
新加坡
日本
美国
香港03
台湾
新加坡02
日本02
英国
韩国
香港04
```

---

## 🎯 支持的识别方式

### ✅ 支持：
- 🏳️ Emoji 旗帜（🇭🇰 🇸🇬 🇯🇵 等）
- 🈳 中文国家名（香港、台湾、新加坡等）
- 🔤 英文缩写（HK、SG、JP 等）
- 🔡 英文全称（Hong Kong、Singapore 等）

### ⚡ 特性：
- 大小写不敏感
- 支持 40+ 常见国家/地区
- 自动序号递增
- 避免误识别（使用单词边界）

---

## 🔧 自定义选项

### 添加新国家

编辑 `rename-by-country.js`，找到 `countryMap` 和 `emojiMap`：

```javascript
// 添加澳门
const countryMap = {
    // ... 现有代码 ...
    '澳门': '澳门',
    'MO': '澳门',
    'Macau': '澳门',
};

const emojiMap = {
    // ... 现有代码 ...
    '🇲🇴': '澳门',
};
```

### 修改显示名称

```javascript
// 将 "香港" 显示为 "HK"
'香港': 'HK',
'HK': 'HK',
'Hong Kong': 'HK',
```

### 修改序号格式

```javascript
// 当前格式：香港、香港02、香港03
const suffix = String(countryCounter[country]).padStart(2, '0');

// 改为：香港01、香港02、香港03
// 修改逻辑让第一个也加序号

// 改为：香港-2、香港-3
const suffix = '-' + String(countryCounter[country]);

// 改为：香港002、香港003（三位数）
const suffix = String(countryCounter[country]).padStart(3, '0');
```

---

## 📊 支持的国家/地区

**亚太地区：** 香港、台湾、新加坡、日本、韩国、泰国、马来西亚、越南、菲律宾、印度尼西亚、印度、澳大利亚

**北美地区：** 美国、加拿大

**欧洲地区：** 英国、德国、法国、荷兰、意大利、西班牙、瑞士、波兰、瑞典、挪威、芬兰、丹麦、爱尔兰

**其他地区：** 俄罗斯、土耳其、以色列、阿联酋、南非、阿根廷、巴西

*完整列表请查看 `rename-by-country-README.md`*

---

## ❓ 常见问题

### Q: 脚本在哪里使用？
**A:** 在 Sub-Store 前端界面 → 订阅 → 添加操作 → 脚本操作

### Q: 需要什么版本的 Sub-Store？
**A:** 后端版本 >= 2.14.88（支持脚本操作功能）

### Q: 如何测试脚本效果？
**A:** 
1. 方法一：在 Sub-Store 中添加脚本后，点击预览查看
2. 方法二：运行 `node rename-by-country-test.js` 进行本地测试

### Q: 某些节点没有被识别？
**A:** 可能该国家不在支持列表中，按照上面的说明添加即可

### Q: 可以只重命名部分节点吗？
**A:** 可以配合"正则过滤"等其他操作使用：
1. 先用正则过滤选出特定节点
2. 再应用脚本操作

---

## 🧪 本地测试

```bash
# 进入脚本目录
cd /root/data/test/Sub-Store/scripts

# 运行测试
node rename-by-country-test.js

# 查看输出
# 会显示每个测试节点的重命名效果
```

---

## 📖 相关文档

| 文件 | 说明 |
|------|------|
| `rename-by-country.js` | ⭐ 主脚本（复制到 Sub-Store 使用） |
| `USAGE-GUIDE.md` | 📖 快速使用指南 |
| `rename-by-country-README.md` | 📚 详细技术文档 |
| `rename-by-country-test.js` | 🧪 本地测试脚本 |
| `README-节点重命名脚本.md` | 📋 本文件（索引） |

---

## 🎓 学习资源

- **Sub-Store 官方文档：** https://www.notion.so/Sub-Store-6259586994d34c11a4ced5c406264b46
- **脚本操作说明：** https://t.me/zhetengsha/970
- **脚本筛选说明：** https://t.me/zhetengsha/1009
- **Sub-Store GitHub：** https://github.com/sub-store-org/Sub-Store

---

## 📝 许可证

本脚本遵循 Sub-Store 项目的 GPL V3 许可证。

---

## 💬 反馈与建议

如有问题或建议，欢迎在 GitHub 上提交 Issue 或 Pull Request。

---

**开始使用吧！** 🚀

只需三步：
1. 复制 `rename-by-country.js` 的内容
2. 在 Sub-Store 中添加脚本操作
3. 保存并预览效果

**祝使用愉快！** ✨

