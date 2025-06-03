# 商城分类接口测试运行指南

## 测试文件说明

本目录包含了商城分类控制器的完整测试套件：

1. **`category.test.ts`** - Jest单元测试文件
2. **`category-api-test.md`** - 详细的API测试文档
3. **`category-postman-collection.json`** - Postman测试集合
4. **`run-tests.md`** - 本运行指南

## 运行方式

### 1. Jest单元测试

虽然项目推荐使用API测试工具，但我们也提供了Jest测试文件供参考。

```bash
# 运行单个测试文件
npm test test/shop/category.test.ts

# 运行所有测试
npm test

# 运行测试并生成覆盖率报告
npm run cov
```

**注意**: 由于cool-admin使用自动化路由技术，Jest测试可能与实际环境不完全兼容。

### 2. Postman测试（推荐）

#### 导入测试集合
1. 打开Postman
2. 点击"Import"按钮
3. 选择`category-postman-collection.json`文件
4. 导入成功后会看到"商城分类接口测试"集合

#### 配置环境变量
在运行测试前，需要设置以下变量：

```json
{
  "baseUrl": "http://localhost:7001",
  "adminToken": "你的管理员token"
}
```

#### 获取管理员Token
首先需要登录获取管理员token：

```http
POST {{baseUrl}}/admin/base/open/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123456",
  "captchaId": "xxx",
  "verifyCode": "xxxx"
}
```

将返回的token设置到环境变量`adminToken`中。

#### 运行测试
1. 选择"商城分类接口测试"集合
2. 点击"Run"按钮
3. 选择要运行的测试用例
4. 点击"Run 商城分类接口测试"

### 3. Apifox测试（推荐）

#### 导入测试
1. 打开Apifox
2. 创建新项目或选择现有项目
3. 导入Postman集合文件`category-postman-collection.json`
4. 或者根据`category-api-test.md`文档手动创建测试用例

#### 配置环境
设置环境变量：
- `baseUrl`: http://localhost:7001
- `adminToken`: 管理员登录后获取的token

#### 运行自动化测试
1. 在Apifox中选择"自动化测试"
2. 创建测试场景
3. 添加测试用例
4. 运行测试并查看结果

### 4. 手动测试

参考`category-api-test.md`文档，使用任何HTTP客户端工具进行手动测试：

- curl
- HTTPie
- Insomnia
- VS Code REST Client插件

## 测试前准备

### 1. 启动项目
```bash
# 开发环境
npm run dev

# 生产环境
npm run start
```

### 2. 确保数据库连接正常
检查数据库配置文件：
- `src/config/config.local.ts` (开发环境)
- `src/config/config.prod.ts` (生产环境)

### 3. 初始化测试数据（可选）
如果需要，可以先创建一些基础的分类和商品数据。

## 测试用例覆盖

### 功能测试
- ✅ 获取分类列表
- ✅ 获取分类详情
- ✅ 根据分类ID获取商品列表
- ✅ 参数验证
- ✅ 错误处理

### 边界测试
- ✅ 不存在的分类ID
- ✅ 无效的参数类型
- ✅ 缺少必要参数
- ✅ 只返回上架商品

### 数据验证
- ✅ 响应格式验证
- ✅ 字段类型验证
- ✅ 业务逻辑验证

## 测试结果分析

### 成功标准
- 所有接口响应状态码为200
- 返回的code为1000表示成功
- 数据格式符合预期
- 业务逻辑正确

### 常见问题排查

#### 1. 连接失败
- 检查项目是否正常启动
- 确认端口号是否正确（默认7001）
- 检查防火墙设置

#### 2. 认证失败
- 确认管理员token是否正确
- 检查token是否过期
- 验证请求头格式

#### 3. 数据库错误
- 检查数据库连接配置
- 确认相关表是否存在
- 验证数据库权限

#### 4. 参数错误
- 检查请求参数格式
- 确认必要参数是否提供
- 验证参数类型

## 持续集成

### GitHub Actions示例
```yaml
name: API Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Start application
        run: npm run dev &
      - name: Wait for app
        run: sleep 30
      - name: Run Newman tests
        run: npx newman run test/shop/category-postman-collection.json
```

## 性能测试

### 使用Artillery进行压力测试
```yaml
# artillery-config.yml
config:
  target: 'http://localhost:7001'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "分类列表接口压测"
    requests:
      - get:
          url: "/app/shop/category/list"
```

运行命令：
```bash
npx artillery run artillery-config.yml
```

## 测试报告

测试完成后，建议生成测试报告：

1. **Postman**: 导出测试结果为HTML报告
2. **Apifox**: 查看测试报告页面
3. **Newman**: 使用htmlextra报告器
4. **Jest**: 查看覆盖率报告

## 最佳实践

1. **测试隔离**: 每个测试用例应该独立，不依赖其他测试的结果
2. **数据清理**: 测试完成后清理测试数据
3. **环境分离**: 使用专门的测试环境，避免影响开发和生产环境
4. **定期运行**: 建立定期运行测试的机制
5. **结果监控**: 监控测试结果，及时发现问题

## 联系支持

如果在测试过程中遇到问题，可以：

1. 查看项目README文档
2. 检查相关日志文件
3. 参考cool-admin官方文档
4. 在项目issue中提问 