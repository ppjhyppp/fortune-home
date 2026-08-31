# 方寸间 FORTUNE HOME 官网

## 文件结构

```
fortune-home-deploy/
├── index.html          # 首页（原 fortune-home.html）
├── app.html            # APP展示页（原 app-showcase.html）
├── main.js             # 首页脚本
├── app-showcase.js     # APP展示页脚本
├── assets/             # 图片、视频资源
└── README.md           # 部署说明
```

## 部署方式

### 方式一：GitHub Pages（免费）

1. 在 GitHub 创建新仓库（如 `fortune-home`）
2. 将本文件夹所有文件上传到仓库根目录
3. 仓库 → Settings → Pages
4. Source 选择 `Deploy from a branch`，Branch 选 `main` / `/ (root)`
5. 等待几分钟，访问 `https://用户名.github.io/fortune-home/`

### 方式二：Vercel（免费，国内访问快）

1. 访问 [vercel.com](https://vercel.com) 注册账号
2. 点击 "Add New" → "Project" → "Import" 关联 GitHub 仓库
3. Framework Preset 选 `Other`
4. 点击 "Deploy"，几秒后获得 `xxx.vercel.app` 链接

### 方式三：Netlify（免费，拖拽上传）

1. 访问 [netlify.com](https://www.netlify.com) 注册账号
2. 直接把本文件夹拖到 "Drag & drop your site folder" 区域
3. 自动获得 `xxx.netlify.app` 链接

### 方式四：阿里云/腾讯云 OSS

1. 开通对象存储服务，创建 Bucket
2. 上传所有文件（保持目录结构）
3. 开启"静态网站托管"功能
4. 设置默认首页为 `index.html`
5. 绑定自己的域名（需备案）

## 注意事项

- 首页文件名已改为 `index.html`，这是所有托管服务的默认入口
- APP展示页访问路径：`/app.html`
- 所有内部链接已同步更新
- 视频文件较大（5个mp4），如果加载慢可考虑放到单独的 CDN 上
