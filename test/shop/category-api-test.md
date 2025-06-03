# 商城分类接口测试文档

## 接口概述
本文档包含商城分类控制器的所有接口测试用例，包括分类列表、分类详情和根据分类获取商品列表等功能。

## 测试环境配置
- 基础URL: `http://localhost:7001`
- 测试数据库: 使用测试环境数据库
- 认证方式: 根据接口类型使用相应的token

## 接口测试用例

### 1. 获取分类列表接口

**接口信息:**
- 方法: GET
- 路径: `/app/shop/category/list`
- 描述: 获取所有商品分类列表

**测试用例 1.1: 正常获取分类列表**
```http
GET /app/shop/category/list
```

**预期响应:**
```json
{
  "code": 1000,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "电子产品",
      "pic": "https://example.com/electronics.jpg",
      "description": "各类电子产品",
      "status": 1,
      "orderNum": 1,
      "createTime": "2024-01-01T00:00:00.000Z",
      "updateTime": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**验证点:**
- 响应状态码为 200
- 返回的 code 为 1000
- data 字段为数组类型
- 数组中的对象包含必要字段：id, name, pic, status 等

### 2. 获取分类详情接口

**接口信息:**
- 方法: GET
- 路径: `/app/shop/category/info`
- 描述: 根据ID获取分类详细信息

**测试用例 2.1: 正常获取分类详情**
```http
GET /app/shop/category/info?id=1
```

**预期响应:**
```json
{
  "code": 1000,
  "message": "success",
  "data": {
    "id": 1,
    "name": "电子产品",
    "pic": "https://example.com/electronics.jpg",
    "description": "各类电子产品",
    "status": 1,
    "orderNum": 1,
    "createTime": "2024-01-01T00:00:00.000Z",
    "updateTime": "2024-01-01T00:00:00.000Z"
  }
}
```

**验证点:**
- 响应状态码为 200
- 返回的 code 为 1000
- data 字段包含完整的分类信息

**测试用例 2.2: 查询不存在的分类ID**
```http
GET /app/shop/category/info?id=99999
```

**预期响应:**
```json
{
  "code": 1001,
  "message": "数据不存在"
}
```

**验证点:**
- 响应状态码为 200
- 返回的 code 不为 1000
- 包含相应的错误信息

**测试用例 2.3: 缺少必要参数**
```http
GET /app/shop/category/info
```

**预期响应:**
```json
{
  "code": 1002,
  "message": "参数错误"
}
```

### 3. 根据分类获取商品列表接口

**接口信息:**
- 方法: GET
- 路径: `/app/shop/category/goodsList`
- 描述: 根据分类ID获取该分类下的所有上架商品

**测试用例 3.1: 正常获取分类商品列表**

**前置条件:**
1. 创建测试分类
```http
POST /admin/shop/category/add
Content-Type: application/json

{
  "name": "测试分类",
  "pic": "https://example.com/test-category.jpg",
  "description": "用于测试的分类",
  "status": 1,
  "orderNum": 1
}
```

2. 在该分类下创建测试商品
```http
POST /admin/shop/goods/add
Content-Type: application/json

{
  "name": "测试商品1",
  "pic": ["https://example.com/goods1.jpg"],
  "categoryId": 1,
  "status": 1,
  "description": "测试商品描述",
  "orderNum": 1
}
```

**测试请求:**
```http
GET /app/shop/category/goodsList?categoryId=1
```

**预期响应:**
```json
{
  "code": 1000,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "测试商品1",
      "pic": ["https://example.com/goods1.jpg"],
      "categoryId": 1,
      "status": 1,
      "description": "测试商品描述",
      "orderNum": 1,
      "createTime": "2024-01-01T00:00:00.000Z",
      "updateTime": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**验证点:**
- 响应状态码为 200
- 返回的 code 为 1000
- data 字段为数组类型
- 返回的商品都属于指定分类 (categoryId 匹配)
- 返回的商品状态都为 1 (上架状态)

**测试用例 3.2: 查询不存在的分类ID**
```http
GET /app/shop/category/goodsList?categoryId=99999
```

**预期响应:**
```json
{
  "code": 1000,
  "message": "success",
  "data": []
}
```

**验证点:**
- 响应状态码为 200
- 返回的 code 为 1000
- data 字段为空数组

**测试用例 3.3: 验证只返回上架商品**

**前置条件:**
1. 在同一分类下创建上架和下架商品
```http
POST /admin/shop/goods/add
Content-Type: application/json

{
  "name": "上架商品",
  "pic": ["https://example.com/online-goods.jpg"],
  "categoryId": 1,
  "status": 1,
  "description": "上架的商品",
  "orderNum": 1
}
```

```http
POST /admin/shop/goods/add
Content-Type: application/json

{
  "name": "下架商品",
  "pic": ["https://example.com/offline-goods.jpg"],
  "categoryId": 1,
  "status": 0,
  "description": "下架的商品",
  "orderNum": 2
}
```

**测试请求:**
```http
GET /app/shop/category/goodsList?categoryId=1
```

**验证点:**
- 只返回 status 为 1 的商品
- 不包含 status 为 0 的商品

**测试用例 3.4: 缺少必要参数**
```http
GET /app/shop/category/goodsList
```

**预期响应:**
```json
{
  "code": 1002,
  "message": "参数错误"
}
```

**测试用例 3.5: 参数类型错误**
```http
GET /app/shop/category/goodsList?categoryId=abc
```

**预期响应:**
```json
{
  "code": 1002,
  "message": "参数类型错误"
}
```

## 性能测试

### 并发测试
- 测试目标: 验证接口在高并发情况下的稳定性
- 并发用户数: 100
- 测试时长: 60秒
- 预期响应时间: < 500ms

### 压力测试
- 测试目标: 验证接口的最大承载能力
- 逐步增加并发数: 50, 100, 200, 500
- 监控指标: 响应时间、错误率、系统资源使用率

## 数据清理

测试完成后需要清理测试数据:

1. 删除测试商品
```http
DELETE /admin/shop/goods/delete
Content-Type: application/json

{
  "ids": [1, 2, 3]
}
```

2. 删除测试分类
```http
DELETE /admin/shop/category/delete
Content-Type: application/json

{
  "ids": [1]
}
```

## 注意事项

1. **测试环境隔离**: 确保测试在独立的测试环境中进行，避免影响生产数据
2. **数据依赖**: 某些测试用例需要先创建测试数据，注意测试顺序
3. **权限验证**: 管理员接口需要相应的管理员token
4. **数据清理**: 测试完成后及时清理测试数据
5. **错误处理**: 验证各种异常情况的错误处理是否正确

## 自动化测试建议

推荐使用以下工具进行自动化测试:
- **Apifox**: 支持接口测试、文档生成、Mock数据
- **ApiPost**: 提供完整的API测试解决方案
- **Postman**: 经典的API测试工具
- **Newman**: Postman的命令行工具，支持CI/CD集成 