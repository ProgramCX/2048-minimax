# 2048 Vue 游戏

一个使用 Vue 3 + TypeScript + Vite 构建的现代化 2048 游戏实现。

## 🎮 游戏特色

- **现代化技术栈**: Vue 3 + Composition API + TypeScript + Vite
- **状态管理**: Pinia 状态管理
- **路由**: Vue Router 4
- **响应式设计**: 完美适配桌面和移动设备
- **动画效果**: 流畅的方块合并和移动动画
- **触摸支持**: 移动设备手势控制
- **键盘控制**: 方向键和 WASD 键支持
- **游戏状态**: 暂停、继续、重新开始功能
- **分数记录**: 本地存储最佳分数
- **视觉主题**: 现代化橙红色主题

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 类型检查

```bash
pnpm type-check
```

### 代码检查

```bash
pnpm lint
```

### 构建项目

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 🛠️ 使用脚本

项目包含了便捷的构建脚本：

```bash
chmod +x build.sh
./build.sh
```

## 🎯 游戏规则

- 使用方向键或 WASD 键移动方块
- 相同数字的方块会合并成更大的数字
- 目标是创造出 2048 方块
- 当无法移动时游戏结束
- 达到 2048 后可以选择继续游戏

## 🏗️ 项目结构

```
├── src/
│   ├── components/          # Vue 组件
│   │   ├── GameControls.vue
│   │   ├── MobileControls.vue
│   │   └── ScoreBoard.vue
│   ├── stores/             # Pinia 状态管理
│   │   └── gameStore.ts
│   ├── types/              # TypeScript 类型定义
│   │   └── game.ts
│   ├── utils/              # 工具函数
│   │   └── gameLogic.ts
│   ├── views/              # Vue 视图组件
│   │   ├── App.vue
│   │   ├── GameBoard.vue
│   │   ├── GameView.vue
│   │   ├── HomeView.vue
│   │   └── NotFound.vue
│   ├── router/             # Vue Router 配置
│   │   └── index.ts
│   ├── main.ts             # 应用入口
│   └── vite-env.d.ts       # Vite 类型定义
├── public/                 # 静态资源
├── index.html              # HTML 模板
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
├── eslint.config.js        # ESLint 配置
└── package.json            # 项目依赖
```

## 🎨 技术亮点

### Vue 3 Composition API
- 逻辑复用
- 更好的 TypeScript 支持
- 响应式系统

### Pinia 状态管理
- 轻量级状态管理
- TypeScript 友好
- DevTools 支持

### 动画系统
- CSS 动画
- 过渡效果
- 状态变化动画

### 响应式设计
- 移动优先
- 弹性布局
- 触摸优化

## 📱 移动端支持

- 触摸滑动控制
- 移动端优化的 UI
- 手势识别
- 适配各种屏幕尺寸

## 🔧 开发工具

- **Vite**: 快速的构建工具
- **TypeScript**: 类型安全
- **ESLint**: 代码质量检查
- **Vue DevTools**: Vue 专用开发工具

## 📋 贡献指南

1. Fork 这个仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

这个项目在 MIT 许可证下开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 感谢原版 2048 游戏的创造者 Gabriele Cirulli
- Vue.js 团队提供的优秀框架
- 所有贡献者的支持

---

**享受游戏吧！** 🎉