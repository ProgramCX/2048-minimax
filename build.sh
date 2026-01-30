#!/bin/bash

echo "🚀 正在构建 2048 Vue 游戏..."

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js，请先安装 Node.js"
    exit 1
fi

# 检查 pnpm
if ! command -v pnpm &> /dev/null; then
    echo "📦 正在安装 pnpm..."
    npm install -g pnpm
fi

# 安装依赖
echo "📦 安装依赖..."
pnpm install

# 类型检查
echo "🔍 执行类型检查..."
pnpm run type-check

# 构建项目
echo "🔨 构建项目..."
pnpm run build

# 检查构建结果
if [ -d "dist" ]; then
    echo "✅ 构建成功！"
    echo "📁 构建文件位于: dist/"
    echo "🌐 运行 'pnpm preview' 预览构建结果"
else
    echo "❌ 构建失败！"
    exit 1
fi