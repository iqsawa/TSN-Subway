# 🚇 地铁路线规划器

一个功能完整的地铁路线查询和规划应用，基于React和Styled Components构建。

## ✨ 功能特性

- **路线规划**: 智能路径规划算法，支持起点终点选择
- **可视化地图**: 交互式地铁线路图，支持路线高亮显示
- **线路信息**: 详细的线路和站点信息展示
- **响应式设计**: 支持桌面和移动设备
- **现代化UI**: 美观的用户界面和流畅的交互体验

## 🏗️ 项目结构

```
metro-route-planner/
├── public/
│   └── index.html          # HTML模板文件
├── src/
│   ├── components/         # React组件
│   │   ├── Header.js      # 应用头部
│   │   ├── RoutePlanner.js # 路线规划组件
│   │   ├── MetroMap.js    # 地铁线路图
│   │   └── LineInfo.js    # 线路信息组件
│   ├── data/
│   │   └── metroData.js   # 地铁数据
│   ├── App.js             # 主应用组件
│   └── index.js           # 应用入口
├── package.json            # 项目配置
└── README.md              # 项目说明
```

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm start
```

应用将在 http://localhost:3000 启动

### 构建生产版本
```bash
npm run build
```

## 🗺️ 地铁线路数据

应用包含以下地铁线路：

- **1号线** (红色): 主要南北干线
- **2号线** (绿色): 东西向线路
- **5号线** (紫色): 北部连接线
- **7号线** (橙色): 东部环线
- **8号线** (蓝色): 西部连接线
- **9号线** (青色): 东部干线
- **10号线** (粉色): 中部连接线

## 🛠️ 技术栈

- **React 18** - 用户界面框架
- **Styled Components** - CSS-in-JS样式解决方案
- **SVG** - 矢量图形绘制
- **Dijkstra算法** - 最短路径规划

## 📱 主要组件

### RoutePlanner
- 起点终点选择
- 路线规划结果展示
- 实时路线计算

### MetroMap
- 交互式地铁线路图
- 路线高亮显示
- 站点点击交互

### LineInfo
- 线路详细信息
- 站点列表展示
- 可展开/收起功能

## 🎨 设计特色

- 现代化Material Design风格
- 响应式布局设计
- 流畅的动画效果
- 直观的颜色编码系统
- 清晰的视觉层次

## 🔧 自定义配置

可以在 `src/data/metroData.js` 中修改：
- 线路颜色
- 站点位置
- 连接关系
- 站点名称

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！
