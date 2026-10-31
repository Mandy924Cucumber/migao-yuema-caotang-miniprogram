# 阅马草堂微信小程序

包含课程、发现、文旅、个人中心等页面。使用微信开发者工具打开项目。

## 本地配置

真实 AppID 和开发者私人配置只保留在本机，未提交到仓库。新电脑首次使用时：

1. 将 `project.config.example.json` 复制为 `project.config.json`。
2. 使用工具支持的测试身份，或在本地配置中填写自己的 AppID。
3. 在微信开发者工具中导入项目目录。

`project.config.json` 和 `project.private.config.json` 已加入忽略规则。AppSecret、访问令牌等服务端凭据不能写入小程序前端代码。当前项目不需要提交这些凭据。

提交代码前请阅读 [安全说明](SECURITY.md)。
