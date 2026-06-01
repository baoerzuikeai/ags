### 目录规划
```text
ags/
├── assets/                 # 📁 静态资源 (你的强迫症会喜欢把它们都关在这里)
│   ├── icons/              # 自定义 SVG 图标
│   ├── fonts/              # 自定义字体文件
│   └── wallpapers/         # 默认壁纸等
│
├── scss/                   # 📁 样式总管 (取代单文件 style.scss)
│   ├── main.scss           # 唯一的样式入口，只负责 @import 其他文件
│   ├── _matugen_colors.scss    # 🤖 机器生成：Matugen 注入的变量表 (不要手动修改)
│   ├── _globals.scss       # 全局基础样式 (字体、复位、通用动画)
│   └── widgets/            # 按组件拆分的具体样式
│       ├── _bar.scss       # 状态栏专属样式
│       └── _launcher.scss  # (未来) 应用启动器样式
│
├── lib/                    # 📁 核心逻辑与工具箱 (也可以叫 utils/)
│   ├── variables.ts        # 全局响应式变量 (如系统音量、网络状态的自定义轮询)
│   ├── helpers.ts          # 纯工具函数 (如时间格式化、数学计算)
│   └── system.ts           # (未来) 封装关机、重启、休眠的脚本调用
│
├── widget/                 # 📁 UI 组件核心区 (按功能模块严格划分)
│   ├── common/             # 🧩 通用基础组件 (复用率极高)
│   │   ├── IconButton.tsx  # 你可以封装一个统一风格的带图标按钮
│   │   └── GlassBox.tsx    # 封装一个自带毛玻璃属性的 Box
│   │
│   ├── bar/                # 🚀 顶栏模块 (把你现在的 Bar.tsx 拆散)
│   │   ├── index.tsx       # 组装整个 Bar 的入口
│   │   ├── Workspaces.tsx  # 独立的工作区组件
│   │   ├── Clock.tsx       # 独立的时钟组件
│   │   └── Logout.tsx      # 独立的电源按钮组件
│   │
│   └── launcher/           # 🚀 (未来) 应用启动器模块
│       └── index.tsx
│
├── app.ts                  # ⚙️ 程序主入口
├── env.d.ts                # ⚙️ TS 类型声明
├── package.json            # ⚙️ 依赖配置
└── tsconfig.json           # ⚙️ TS 编译配置
```


### 下载依赖

```bash
yay -S matugen-bin   #色彩引擎
```
