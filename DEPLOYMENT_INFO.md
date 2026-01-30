# 2048 Vue 游戏部署信息

## 项目概述

本项目是一个使用 Vue 3 + TypeScript + Vite 构建的现代化 2048 游戏。

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **类型系统**: TypeScript
- **构建工具**: Vite
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **代码质量**: ESLint
- **包管理器**: pnpm

## 开发环境要求

- Node.js >= 18
- pnpm >= 8

## 安装和运行

### 1. 克隆项目

```bash
git clone <repository-url>
cd 2048-minimax
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 开发模式

```bash
pnpm dev
```

访问 `http://localhost:5173`

### 4. 类型检查

```bash
pnpm type-check
```

### 5. 代码检查

```bash
pnpm lint
```

### 6. 构建项目

```bash
pnpm build
```

### 7. 预览构建结果

```bash
pnpm preview
```

## 项目结构

```
2048-minimax/
├── src/
│   ├── components/     # Vue 组件
│   ├── stores/         # Pinia 状态管理
│   ├── types/          # TypeScript 类型
│   ├── utils/          # 工具函数
│   ├── views/          # Vue 视图
│   ├── router/         # 路由配置
│   ├── main.ts         # 应用入口
│   └── vite-env.d.ts  # Vite 类型
├── public/             # 静态资源
├── index.html          # HTML 模板
├── vite.config.ts      # Vite 配置
├── tsconfig.json        # TypeScript 配置
├── eslint.config.js     # ESLint 配置
└── package.json         # 项目配置
```

## 构建脚本

使用便捷的构建脚本：

```bash
chmod +x build.sh
./build.sh
```

该脚本将自动：
1. 检查 Node.js 环境
2. 安装 pnpm（如果未安装）
3. 安装项目依赖
4. 执行类型检查
5. 构建项目
6. 验证构建结果

## 部署选项

### 1. 静态部署

构建后的 `dist/` 目录可以部署到任何静态文件服务器：

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- 阿里云 OSS
- 腾讯云 COS

### 2. 传统服务器

将构建后的文件上传到 Web 服务器：

```bash
# 构建项目
pnpm build

# 部署 dist/ 目录到服务器
# 使用 scp, rsync 等工具上传
```

### 3. Docker 部署

创建 Dockerfile：

```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

构建和运行：

```bash
docker build -t 2048-vue-game .
docker run -p 80:80 2048-vue-game
```

## 环境变量

可以在项目根目录创建 `.env` 文件：

```env
VITE_APP_TITLE=2048 Vue Game
VITE_APP_VERSION=1.0.0
```

## 性能优化

### 构建优化
- Vite 自动代码分割
- 资源压缩
- Tree shaking
- 动态导入

### 运行优化
- 响应式设计
- 组件懒加载
- 缓存策略
- 动画优化

## 浏览器支持

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 故障排除

### 常见问题

1. **Node.js 版本过低**
   ```bash
   nvm install 18
   nvm use 18
   ```

2. **依赖安装失败**
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

3. **构建失败**
   ```bash
   pnpm type-check
   pnpm lint
   ```

4. **端口冲突**
   ```bash
   pnpm dev --port 3000
   ```

### 日志和调试

- Vue DevTools 浏览器扩展
- Vite 开发服务器日志
- 浏览器开发者工具
- ESLint 错误提示

## 更新日志

### v1.0.0
- 初始版本发布
- 完整的 2048 游戏功能
- 响应式设计
- 移动端支持
- TypeScript 支持

## 许可证

MIT License

## 联系方式

如有问题或建议，请创建 Issue 或 Pull Request。