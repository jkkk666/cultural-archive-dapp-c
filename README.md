# 文化数字档案 DApp

基于区块链技术的文化数字档案管理系统，使用以太坊智能合约和IPFS去中心化存储来保护珍贵的文化遗产。

## 功能特性

- 🔐 **去中心化存储**: 使用IPFS存储档案文件，确保数据永久性和不可篡改性
- 📜 **智能合约管理**: 基于以太坊智能合约管理档案元数据和访问权限
- 🎨 **现代化UI**: 使用React + Tailwind CSS构建美观的用户界面
- 🔗 **Web3集成**: 支持MetaMask等主流钱包连接
- 🏷️ **分类标签**: 支持档案分类和标签管理
- 👥 **权限控制**: 灵活的访问权限管理系统
- 📱 **响应式设计**: 支持桌面和移动设备

## 技术栈

### 前端
- **Next.js 14** - React框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Ethers.js** - 以太坊交互
- **IPFS HTTP Client** - IPFS文件上传

### 智能合约
- **Solidity 0.8.19** - 智能合约语言
- **OpenZeppelin** - 安全合约库
- **Hardhat** - 开发环境

### 存储
- **IPFS** - 去中心化文件存储
- **以太坊** - 元数据和权限存储

## 快速开始

### 环境要求
- Node.js 18+
- MetaMask钱包
- 以太坊测试网络（如Sepolia）

### 安装依赖
```bash
npm install
```

### 配置环境变量
创建 `.env.local` 文件：
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=你的智能合约地址
NEXT_PUBLIC_INFURA_PROJECT_ID=你的Infura项目ID
```

### 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 智能合约部署

### 编译合约
```bash
npx hardhat compile
```

### 部署到测试网络
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 验证合约
```bash
npx hardhat verify --network sepolia 合约地址
```

## 使用指南

### 1. 连接钱包
- 确保已安装MetaMask钱包
- 点击"连接钱包"按钮
- 授权应用访问你的钱包

### 2. 创建档案
- 点击"创建档案"按钮
- 填写档案信息（标题、描述、分类等）
- 上传文件到IPFS
- 设置访问权限（公开/私有）
- 添加标签
- 提交创建

### 3. 管理档案
- 查看档案列表
- 按分类筛选
- 搜索特定档案
- 管理访问权限

### 4. 权限管理
- 为其他用户授予查看/编辑/删除权限
- 撤销用户权限
- 设置档案为公开或私有

## 项目结构

```
cultural-archive-dapp/
├── app/                    # Next.js应用目录
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/            # React组件
│   ├── Header.tsx         # 页面头部
│   ├── ArchiveList.tsx    # 档案列表
│   └── CreateArchiveModal.tsx # 创建档案模态框
├── contracts/             # 智能合约
│   └── CulturalArchive.sol # 主合约
├── hooks/                 # 自定义钩子
│   └── useWeb3.ts         # Web3连接钩子
├── types/                 # TypeScript类型定义
│   └── archive.ts         # 档案相关类型
├── utils/                 # 工具函数
│   ├── contract.ts        # 合约交互
│   └── ipfs.ts           # IPFS工具
└── README.md             # 项目说明
```

## 安全考虑

- 智能合约已通过OpenZeppelin安全库加固
- 实现了访问控制和权限管理
- 支持合约暂停功能
- 文件存储在去中心化的IPFS网络中

## 贡献指南

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 项目Issues: [GitHub Issues](https://github.com/your-username/cultural-archive-dapp/issues)
- 邮箱: your-email@example.com

## 致谢

- [OpenZeppelin](https://openzeppelin.com/) - 智能合约安全库
- [IPFS](https://ipfs.io/) - 去中心化文件存储
- [Ethers.js](https://docs.ethers.io/) - 以太坊交互库
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架 