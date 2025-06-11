<p align="center">
  <a href="https://midwayjs.org/" target="blank"><img src="https://cool-show.oss-cn-shanghai.aliyuncs.com/admin/logo.png" width="200" alt="Midway Logo" /></a>
</p>

<p align="center">cool-admin(nodejs版)一个很酷的后台权限管理系统，开源免费，Ai编码、流程编排、模块化、插件化、极速开发CRUD，方便快速构建迭代后台管理系统，支持原生、docker、普通服务器等多种方式部署
到 <a href="https://cool-js.com" target="_blank">官网</a> 进一步了解。
<p align="center">
    <a href="https://github.com/cool-team-official/cool-admin-midway/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="GitHub license" />
    <a href=""><img src="https://img.shields.io/github/package-json/v/cool-team-official/cool-admin-midway?style=flat-square" alt="GitHub tag"></a>
    <img src="https://img.shields.io/github/last-commit/cool-team-official/cool-admin-midway?style=flat-square" alt="GitHub tag"></a>
</p>

## 特性

Ai 时代，很多老旧的框架已经无法满足现代化的开发需求，Cool-Admin 开发了一系列的功能，让开发变得更简单、更快速、更高效。

- **Ai 编码**：通过微调大模型学习框架特有写法，实现简单功能从 Api 接口到前端页面的一键生成[详情](https://node.cool-admin.com/src/guide/ai.html)
- **流程编排**：通过拖拽编排方式，即可实现类似像智能客服这样的功能[详情](https://node.cool-admin.com/src/guide/flow.html)
- **多租户**：支持多租户，采用全局动态注入查询条件[详情](https://node.cool-admin.com/src/guide/core/tenant.html)
- **多语言**：基于大模型自动翻译，无需更改原有代码[详情](https://node.cool-admin.com/src/guide/core/i18n.html)
- **原生打包**：打包成 exe 等安装包，打包完可以直接运行在 windows、mac、linux 等操作系统上[详情](https://node.cool-admin.com/src/guide/core/pkg.html)
- **模块化**：代码是模块化的，清晰明了，方便维护
- **插件化**：插件化的设计，可以通过安装插件的方式扩展如：支付、短信、邮件等功能
- ......

![](https://cool-show.oss-cn-shanghai.aliyuncs.com/admin/flow.png)

## 技术栈

- 后端：**`node.js` `typescript`**
- 前端：**`vue.js` `element-plus` `jsx` `pinia` `vue-router`**
- 数据库：**`mysql` `postgresql` `sqlite`**

如果你是前端，后端的这些技术选型对你是特别友好的，前端开发者可以较快速地上手。
如果你是后端，Typescript 的语法又跟 java、php 等特别类似，一切看起来也是那么得熟悉。

如果你想使用 java 版本后端，请移步[cool-admin-java](https://cool-js.com/admin/java/introduce.html)

#### 官网

[https://cool-js.com](https://cool-js.com)

## 视频教程

[官方 B 站视频教程](https://www.bilibili.com/video/BV1j1421R7aB)

<!-- 在此次添加使用文档 -->

## 演示

[AI 极速编码](https://node.cool-admin.com/src/guide/ai.html)

[https://show.cool-admin.com](https://show.cool-admin.com)

- 账户：admin
- 密码：123456

<img src="https://cool-show.oss-cn-shanghai.aliyuncs.com/admin/home-mini.png" alt="Admin Home"></a>

#### 项目前端

[https://github.com/cool-team-official/cool-admin-vue](https://github.com/cool-team-official/cool-admin-vue)

或

[https://gitee.com/cool-team-official/cool-admin-vue](https://gitee.com/cool-team-official/cool-admin-vue)

或

[https://gitcode.com/cool_team/cool-admin-vue](https://gitcode.com/cool_team/cool-admin-vue)

## 微信群

<img width="260" src="https://cool-show.oss-cn-shanghai.aliyuncs.com/admin/wechat.jpeg?v=1" alt="Admin Wechat"></a>

## 运行

#### 修改数据库配置，配置文件位于`src/config/config.local.ts`

以 Mysql 为例，其他数据库请参考[数据库配置文档](https://cool-js.com/admin/node/quick.html#%E6%95%B0%E6%8D%AE%E5%BA%93%E9%85%8D%E7%BD%AE)

Mysql(`>=5.7版本`)，建议 8.0，node 版本(`>=18.x`)，首次启动会自动初始化并导入数据

```ts
// mysql，驱动已经内置，无需安装
typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'cool',
        // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
        synchronize: true,
        // 打印日志
        logging: false,
        // 字符集
        charset: 'utf8mb4',
        // 是否开启缓存
        cache: true,
        // 实体路径
        entities: ['**/modules/*/entity'],
      },
    },
  },
```

#### 安装依赖并运行

```bash
$ npm i
$ npm run dev
```

启动完成访问：[http://localhost:8001/](http://localhost:8001)

注： `npm i`如果安装失败可以尝试使用切换您的镜像源，推荐使用[pnpm](https://pnpm.io/)安装

## CURD(快速增删改查)

大部分的后台管理系统，或者 API 服务都是对数据进行管理，所以可以看到大量的 CRUD 场景(增删改查)，cool-admin 对此进行了大量地封装，让这块的编码量变得极其地少。

#### 新建一个数据表

`src/modules/demo/entity/goods.ts`，项目启动数据库会自动创建该表，无需手动创建

```ts
import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 商品
 */
@Entity('demo_app_goods')
export class DemoAppGoodsEntity extends BaseEntity {
  @Column({ comment: '标题' })
  title: string;

  @Column({ comment: '图片' })
  pic: string;

  @Column({ comment: '价格', type: 'decimal', precision: 5, scale: 2 })
  price: number;
}
```

#### 编写 api 接口

`src/modules/demo/controller/app/goods.ts`，快速编写 6 个 api 接口

```ts
import { CoolController, BaseController } from '@cool-midway/core';
import { DemoAppGoodsEntity } from '../../entity/goods';

/**
 * 商品
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: DemoAppGoodsEntity,
})
export class DemoAppGoodsController extends BaseController {
  /**
   * 其他接口
   */
  @Get('/other')
  async other() {
    return this.ok('hello, cool-admin!!!');
  }
}
```

这样我们就完成了 6 个接口的编写，对应的接口如下：

- `POST /app/demo/goods/add` 新增
- `POST /app/demo/goods/delete` 删除
- `POST /app/demo/goods/update` 更新
- `GET /app/demo/goods/info` 单个信息
- `POST /app/demo/goods/list` 列表信息
- `POST /app/demo/goods/page` 分页查询(包含模糊查询、字段全匹配等)

## Page接口搜索功能配置

为了让page接口支持数据搜索，需要在Controller中配置`pageQueryOp`参数。以下是配置说明：

### 基本配置

```ts
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: YourEntity,
  service: YourService,
  pageQueryOp: {
    // 支持模糊搜索的字段（用于keyWord参数）
    keyWordLikeFields: ['a.name', 'a.title'],
    // 支持精确匹配的字段
    fieldEq: ['a.id', 'a.status', 'a.type'],
    // 支持模糊搜索的字段（单独字段模糊搜索）
    fieldLike: ['a.name', 'a.description'],
  },
})
```

### 配置参数说明

- **keyWordLikeFields**: 支持模糊查询的字段，对应前端传入的`keyWord`参数
- **fieldEq**: 支持精确匹配的字段，如状态、类型等枚举值
- **fieldLike**: 支持模糊搜索的字段，可以单独对某个字段进行模糊搜索

### 前端调用示例

```javascript
// POST请求到 /admin/your-module/page
{
  "page": 1,           // 页码
  "size": 20,          // 每页数量
  "keyWord": "搜索关键词", // 模糊搜索（对应keyWordLikeFields）
  "id": "16",          // 精确匹配（对应fieldEq中的id）
  "name": "teste",     // 模糊搜索（对应fieldLike中的name）
  "status": 0,         // 精确匹配（对应fieldEq中的status）
  "type": 0,           // 精确匹配（对应fieldEq中的type）
  "sort": "desc",      // 排序方向
  "order": "createTime" // 排序字段
}
```

### 注意事项

1. 字段名需要加表别名前缀`a.`，如`a.name`、`a.status`
2. 确保配置的字段在实体类中存在
3. 精确匹配用于状态、类型等固定值字段
4. 模糊搜索用于名称、描述等文本字段

## 图片日期模块

项目中包含了一个图片日期管理模块，用于管理按日期组织的图片信息。

### 功能特性

- **日期管理**：支持按日期组织图片信息
- **状态控制**：支持启用/禁用状态管理
- **图片存储**：支持图片文件的存储和管理
- **备注信息**：支持为每个日期添加备注说明
- **APP端接口**：提供无需登录的公开接口，方便移动端获取图片数据

### 模块结构

```
src/modules/picture/
├── controller/
│   ├── admin/date.ts           # 管理端控制器
│   └── app/date.ts             # APP端控制器
├── entity/date.ts              # 图片日期实体
├── service/date.ts             # 图片日期服务
└── config.ts                   # 模块配置
```

### API 接口

#### 管理端接口（需要管理员权限）

- `POST /admin/picture/date/add` - 新增图片日期
- `POST /admin/picture/date/delete` - 删除图片日期
- `POST /admin/picture/date/update` - 更新图片日期
- `GET /admin/picture/date/info` - 获取单个图片日期信息
- `POST /admin/picture/date/list` - 获取图片日期列表
- `POST /admin/picture/date/page` - 分页查询图片日期

#### APP端接口（公开访问，无需登录）

- `GET /app/picture/date/picturesByDateRange?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` - 根据起止时间获取图片列表

### 数据结构

```typescript
{
  id: number;           // 主键ID
  date: Date;          // 日期
  picture: string;     // 图片路径
  status: number;      // 状态 (0:禁用, 1:启用)
  remark: string;      // 备注
  createTime: Date;    // 创建时间
  updateTime: Date;    // 更新时间
}
```

### 服务方法

`PictureDateService` 提供了以下扩展方法：

- `findByDate(date)` - 根据日期查询图片信息
- `findByStatus(status)` - 获取指定状态的图片日期列表
- `findByDateRange(startDate, endDate)` - 获取日期范围内的图片信息

### 使用示例

#### 服务层调用
```typescript
// 注入服务
@Inject()
pictureDateService: PictureDateService;

// 根据日期查询
const pictureInfo = await this.pictureDateService.findByDate('2024-01-01');

// 获取启用状态的图片列表
const enabledPictures = await this.pictureDateService.findByStatus(1);

// 查询日期范围内的图片
const pictures = await this.pictureDateService.findByDateRange(
  new Date('2024-01-01'),
  new Date('2024-01-31')
);
```

#### APP端接口调用
```bash
# 获取指定日期范围内的图片列表（无需登录）
curl -X GET "http://localhost:8001/app/picture/date/picturesByDateRange?startDate=2024-01-01&endDate=2024-01-31"
```

**返回数据格式：**
```json
{
  "code": 1000,
  "message": "success",
  "data": [
    {
      "id": 1,
      "date": "2024-01-15",
      "picture": "/uploads/2024/01/15/image.jpg",
      "remark": "示例图片",
      "createTime": "2024-01-15T10:00:00.000Z",
      "updateTime": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

**参数说明：**
- `startDate`: 开始日期，格式：YYYY-MM-DD
- `endDate`: 结束日期，格式：YYYY-MM-DD
- 接口会自动过滤掉状态为禁用的图片
- 支持日期格式验证和范围验证

## Banner模块

项目中包含了一个Banner管理模块，用于管理应用中的轮播图和广告横幅。

### 功能特性

- **Banner管理**：支持Banner的增删改查操作
- **类型分类**：支持首页Banner、分类Banner、活动Banner等多种类型
- **状态控制**：支持启用/禁用状态管理
- **排序功能**：支持自定义排序，控制Banner显示顺序
- **图片链接**：支持设置Banner图片和跳转链接
- **APP端接口**：提供无需登录的公开接口，方便移动端获取Banner数据
- **日期关联**：支持传入日期参数，同时获取对应日期的图片信息

### 模块结构

```
src/modules/banner/
├── controller/
│   ├── admin/info.ts           # 管理端控制器
│   └── app/info.ts             # APP端控制器
├── entity/info.ts              # Banner实体
├── service/info.ts             # Banner服务
└── config.ts                   # 模块配置
```

### API 接口

#### APP端接口（公开访问，无需登录）

- `POST /app/banner/info/list` - 获取Banner列表（支持日期参数）
- `POST /app/banner/info/page` - 分页查询Banner
- `GET /app/banner/info/info` - 获取单个Banner信息

#### 管理端接口（需要管理员权限）

- `POST /admin/banner/info/add` - 新增Banner
- `POST /admin/banner/info/delete` - 删除Banner
- `POST /admin/banner/info/update` - 更新Banner
- `GET /admin/banner/info/info` - 获取单个Banner信息
- `POST /admin/banner/info/list` - 获取Banner列表
- `POST /admin/banner/info/page` - 分页查询Banner

### 数据结构

```typescript
{
  id: number;           // 主键ID
  name: string;         // Banner名称
  pic: string;          // Banner图片
  link: string;         // 跳转链接
  sort: number;         // 排序号
  type: number;         // 类型 (0:首页Banner, 1:分类Banner, 2:活动Banner, 3:未知)
  status: number;       // 状态 (0:禁用, 1:启用)
  summary: string;      // 简介
  remark: string;       // 备注
  createTime: Date;     // 创建时间
  updateTime: Date;     // 更新时间
}
```

### 特殊功能：日期关联查询

Banner列表接口支持传入`date`参数，会同时返回对应日期的图片信息，实现Banner与日期图片的关联展示。

#### 使用示例

**获取Banner列表（不带日期）：**
```bash
curl -X POST "http://localhost:8001/app/banner/info/list" \
  -H "Content-Type: application/json" \
  -d '{}'
```

**获取Banner列表（带日期参数）：**
```bash
curl -X POST "http://localhost:8001/app/banner/info/list" \
  -H "Content-Type: application/json" \
  -d '{"date": "2024-01-15"}'
```

**返回数据格式（带日期参数）：**
```json
{
  "code": 1000,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "首页轮播图1",
      "pic": "/uploads/banner/banner1.jpg",
      "link": "https://example.com",
      "sort": 1,
      "type": 0,
      "status": 1,
      "summary": "首页主要轮播图",
      "remark": "重要Banner",
      "createTime": "2024-01-01T00:00:00.000Z",
      "updateTime": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pictureInfo": {
    "id": 5,
    "date": "2024-01-15",
    "picture": "/uploads/2024/01/15/daily-pic.jpg",
    "remark": "每日精选图片",
    "createTime": "2024-01-15T10:00:00.000Z",
    "updateTime": "2024-01-15T10:00:00.000Z"
  }
}
```

### 接口特性

1. **自动过滤**：APP端接口自动过滤禁用状态的Banner，只返回启用的Banner
2. **自动排序**：按sort字段升序排序，确保Banner按指定顺序显示
3. **容错处理**：日期图片查询失败不会影响Banner列表的正常返回
4. **状态验证**：只返回启用状态的日期图片信息
5. **无需登录**：APP端接口使用`@CoolTag(TagTypes.IGNORE_TOKEN)`标签，无需用户登录

### 业务场景

- **移动端首页**：获取首页轮播图Banner
- **分类页面**：获取分类相关的Banner广告
- **活动推广**：展示活动Banner和相关图片
- **日期关联**：在特定日期展示对应的每日图片和Banner组合

### 部署

[部署教程](https://node.cool-admin.com/src/guide/deploy.html)

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。

[midway]: https://midwayjs.org

### 低价服务器

[阿里云、腾讯云、华为云低价云服务器，不限新老](https://cool-js.com/service/cloud)

## 商城模块

项目中包含了一个完整的商城管理模块，提供商品分类和商品管理功能。

### 功能特性

- **商品分类管理**：支持分类的增删改查，状态控制，排序管理
- **公开API接口**：分类列表和详情接口无需登录即可访问
- **权限控制**：管理端接口需要管理员权限，APP端部分接口公开访问
- **状态管理**：支持分类的上架/下架状态控制
- **图片支持**：支持分类图片的存储和展示

### 模块结构

```
src/modules/shop/
├── controller/
│   ├── admin/
│   │   ├── category.ts         # 管理端分类控制器
│   │   └── goods.ts           # 管理端商品控制器
│   └── app/
│       └── category.ts        # APP端分类控制器
├── entity/
│   ├── category.ts            # 分类实体
│   └── goods.ts              # 商品实体
├── service/
│   └── category.ts           # 分类服务
└── config.ts                 # 模块配置
```

### API接口

#### APP端接口（公开访问）

- `GET /app/shop/category/list` - 获取分类列表（无需登录）
- `GET /app/shop/category/categoryInfo?id={id}` - 获取分类详情（无需登录）
- `GET /app/shop/category/goodsList?categoryId={id}` - 根据分类获取商品列表（无需登录）

#### 管理端接口（需要管理员权限）

- `POST /admin/shop/category/add` - 新增分类
- `POST /admin/shop/category/delete` - 删除分类
- `POST /admin/shop/category/update` - 更新分类
- `GET /admin/shop/category/info` - 获取分类详情
- `POST /admin/shop/category/list` - 获取分类列表
- `POST /admin/shop/category/page` - 分页查询分类

### 使用示例

#### 获取分类列表
```bash
curl -X GET "http://localhost:9000/dev/app/shop/category/list"
```

#### 获取指定类型的分类列表
```bash
# 获取分类类型的列表（type=0）
curl -X GET "http://localhost:9000/dev/app/shop/category/list?type=0"

# 获取合集类型的列表（type=1）
curl -X GET "http://localhost:9000/dev/app/shop/category/list?type=1"
```

#### 获取分类详情
```bash
curl -X GET "http://localhost:9000/dev/app/shop/category/categoryInfo?id=1"
```

#### 根据分类获取商品列表
```bash
curl -X GET "http://localhost:9000/dev/app/shop/category/goodsList?categoryId=1"
```

### 数据结构

#### 分类实体字段

- `id`: 主键ID
- `pic`: 分类图片
- `name`: 分类名称（唯一）
- `description`: 分类描述
- `status`: 状态（0-下架，1-上架）
- `orderNum`: 排序号
- `type`: 类型（0-category分类，1-collection合集）
- `createTime`: 创建时间
- `updateTime`: 更新时间

### API接口详细说明

#### 分类列表接口

**接口地址**: `GET /app/shop/category/list`

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | number | 否 | 分类类型：0-category(分类)，1-collection(合集)，不传则查询所有 |

**响应示例**:
```json
{
  "code": 1000,
  "message": "success",
  "data": [
    {
      "id": 1,
      "pic": "https://example.com/pic.jpg",
      "name": "电子产品",
      "description": "各类电子产品分类",
      "status": 1,
      "orderNum": 1,
      "type": 0,
      "createTime": "2024-01-01T00:00:00.000Z",
      "updateTime": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 权限说明

根据cool-admin的权限管理机制：

- **APP端接口**：`/app/**` 路径的接口默认需要用户登录验证
- **公开接口**：使用 `@CoolTag(TagTypes.IGNORE_TOKEN)` 标签的接口无需登录
- **管理端接口**：`/admin/**` 路径的接口需要管理员权限验证

本次修改将所有商城分类相关的APP端接口（分类列表、分类详情、商品列表）都设置为公开访问，方便前端应用获取商城数据。

## 接口测试

项目提供了完整的接口测试方案，支持多种测试方式。

### 测试工具推荐

根据cool-admin的特性，推荐使用以下API测试工具：

- **[Apifox](https://apifox.com/)** - 集成接口设计、测试、文档、Mock于一体
- **[ApiPost](https://www.apipost.cn/)** - 专业的API测试工具
- **[Postman](https://www.postman.com/)** - 经典的API测试工具

### 测试文件

项目在`test/`目录下提供了完整的测试套件：

```
test/
├── shop/                           # 商城模块测试
│   ├── category.test.ts           # Jest单元测试
│   ├── category-api-test.md       # API测试文档
│   ├── category-postman-collection.json  # Postman测试集合
│   └── run-tests.md               # 测试运行指南
└── README.md                      # 测试说明
```

### 快速开始测试

1. **导入Postman集合**
   ```bash
   # 导入测试集合到Postman
   test/shop/category-postman-collection.json
   ```

2. **配置环境变量**
   ```json
   {
     "baseUrl": "http://localhost:7001",
     "adminToken": "你的管理员token"
   }
   ```

3. **运行Jest测试**
   ```bash
   # 运行单个测试文件
   npm test test/shop/category.test.ts
   
   # 运行所有测试
   npm test
   ```

### 测试覆盖范围

- ✅ 功能测试：接口基本功能验证
- ✅ 参数验证：必要参数和参数类型验证
- ✅ 错误处理：异常情况处理验证
- ✅ 业务逻辑：业务规则正确性验证
- ✅ 边界测试：边界条件和极值测试

### 测试最佳实践

1. **环境隔离**：使用独立的测试环境
2. **数据清理**：测试后及时清理测试数据
3. **自动化运行**：集成到CI/CD流程中
4. **结果监控**：定期检查测试结果

详细的测试说明请参考：[测试运行指南](test/shop/run-tests.md)

## 商品分类数量自动更新功能

### 功能说明

系统已实现商品分类数量的自动更新功能，当进行以下操作时，系统会自动更新相关分类的商品数量：

1. **新增商品**：添加商品后，自动增加对应分类的商品数量
2. **删除商品**：删除商品后，自动减少对应分类的商品数量
3. **更新商品分类**：修改商品分类时，自动更新新旧分类的商品数量

### 实现原理

通过重写`ShopGoodsService`的`add`、`delete`、`update`方法，在执行相应操作后自动调用`updateCategoryCount`方法来统计并更新分类的商品数量。

### 相关文件

- `src/modules/shop/service/goods.ts` - 商品服务，包含分类数量更新逻辑
- `src/modules/shop/entity/category.ts` - 分类实体，包含count字段
- `src/modules/shop/entity/goods.ts` - 商品实体，包含categoryId字段

### 使用方法

无需额外配置，系统会在商品增删改操作时自动更新分类数量。分类的`count`字段会实时反映该分类下的商品数量。
