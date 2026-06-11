# LDAP 登录入口打包配置

DeepChat 的 LDAP 登录入口是**打包期配置**：构建 renderer 时如果存在有效的
`VITE_LDAP_LOGIN_URL`，打出的安装包会在正常欢迎页/聊天页之前显示统一 LDAP 登录入口；
如果该值为空或不是 `http://` / `https://` URL，则不会显示 LDAP 登录入口。

## 本地打包

```bash
VITE_LDAP_LOGIN_URL="https://login.example.com/ldap" pnpm run build:linux
```

也可以把变量写入本地 `.env`（不要提交真实内部地址或敏感配置）：

```env
VITE_LDAP_LOGIN_URL=https://login.example.com/ldap
```

## GitHub Actions 自动打包

仓库内的 `Build Application` 和 `Release` workflow 已经把 Actions 配置映射到
`VITE_LDAP_LOGIN_URL`。优先级如下：

1. 手动触发 workflow 时填写的 `ldap_login_url` input。
2. 仓库或组织 Variables 里的 `DEEPCHAT_LDAP_LOGIN_URL`。
3. 仓库或组织 Secrets 里的 `DEEPCHAT_LDAP_LOGIN_URL`。
4. 全部为空时关闭 LDAP 登录入口。

推荐把登录地址配置为 GitHub Actions repository variable：

1. 打开 GitHub 仓库的 **Settings → Secrets and variables → Actions → Variables**。
2. 点击 **New repository variable**。
3. Name 填写 `DEEPCHAT_LDAP_LOGIN_URL`。
4. Value 填写 LDAP 登录地址，例如 `https://login.example.com/ldap`。
5. 运行 `.github/workflows/build.yml` 或发布 `.github/workflows/release.yml` 时会自动注入。

如果只想某一次手动构建使用不同地址，可以在手动运行 workflow 时填写
`ldap_login_url` input；它会覆盖仓库 variable/secret。

## macOS fork 构建注意

`Build Application` workflow 的 macOS job 支持无 Developer ID 证书的 fork/普通构建：
未配置 `DEEPCHAT_CSC_LINK` 时不会把 `CSC_LINK` 传给 electron-builder，CUA helper 会走 ad-hoc 签名，app 打包也会禁用签名自动发现。
真正发布用的 `Release` workflow 仍然需要配置 macOS 签名/公证 secrets。

## Release workflow 行为

- `workflow_dispatch` 发布：可以直接填写 `ldap_login_url`，也可以留空读取
  `DEEPCHAT_LDAP_LOGIN_URL` variable/secret。
- tag push 发布：没有手动 input，只会读取 `DEEPCHAT_LDAP_LOGIN_URL` variable/secret。

## 注意事项

- 这是打包期变量；安装包生成后，修改 GitHub Actions variable 不会改变已经打出的包。
- URL 必须是 `http://` 或 `https://`。`ldap://`、`file://` 或非法 URL 会被视为未配置。
- 登录页会通过系统浏览器打开配置的地址，不会在 DeepChat 内部收集 LDAP 用户名或密码。
