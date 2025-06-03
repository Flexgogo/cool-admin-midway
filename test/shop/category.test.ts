import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { Application } from '@midwayjs/koa';

describe('商城分类控制器测试', () => {
  let app: Application;

  beforeAll(async () => {
    // 创建应用实例
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    // 关闭应用
    await close(app);
  });

  describe('分类列表接口测试', () => {
    it('应该成功获取分类列表', async () => {
      const result = await createHttpRequest(app)
        .get('/app/shop/category/list')
        .expect(200);

      expect(result.body.code).toBe(1000);
      expect(result.body.message).toBe('success');
      expect(Array.isArray(result.body.data)).toBe(true);
    });
  });

  describe('分类详情接口测试', () => {
    it('应该成功获取分类详情', async () => {
      // 先创建一个测试分类
      const createResult = await createHttpRequest(app)
        .post('/admin/shop/category/add')
        .send({
          name: '测试分类',
          pic: 'https://example.com/test.jpg',
          description: '这是一个测试分类',
          status: 1,
          orderNum: 1
        });

      const categoryId = createResult.body.data;

      // 获取分类详情
      const result = await createHttpRequest(app)
        .get(`/app/shop/category/info?id=${categoryId}`)
        .expect(200);

      expect(result.body.code).toBe(1000);
      expect(result.body.message).toBe('success');
      expect(result.body.data).toBeDefined();
      expect(result.body.data.name).toBe('测试分类');
    });

    it('获取不存在的分类应该返回错误', async () => {
      const result = await createHttpRequest(app)
        .get('/app/shop/category/info?id=99999')
        .expect(200);

      expect(result.body.code).not.toBe(1000);
    });
  });

  describe('根据分类获取商品列表接口测试', () => {
    it('应该成功根据分类ID获取商品列表', async () => {
      // 先创建一个测试分类
      const categoryResult = await createHttpRequest(app)
        .post('/admin/shop/category/add')
        .send({
          name: '测试商品分类',
          pic: 'https://example.com/category.jpg',
          description: '商品分类描述',
          status: 1,
          orderNum: 1
        });

      const categoryId = categoryResult.body.data;

      // 创建测试商品
      await createHttpRequest(app)
        .post('/admin/shop/goods/add')
        .send({
          name: '测试商品1',
          pic: ['https://example.com/goods1.jpg'],
          categoryId: categoryId,
          status: 1,
          description: '测试商品描述1',
          orderNum: 1
        });

      await createHttpRequest(app)
        .post('/admin/shop/goods/add')
        .send({
          name: '测试商品2',
          pic: ['https://example.com/goods2.jpg'],
          categoryId: categoryId,
          status: 1,
          description: '测试商品描述2',
          orderNum: 2
        });

      // 获取该分类下的商品列表
      const result = await createHttpRequest(app)
        .get(`/app/shop/category/goodsList?categoryId=${categoryId}`)
        .expect(200);

      expect(result.body.code).toBe(1000);
      expect(result.body.message).toBe('success');
      expect(Array.isArray(result.body.data)).toBe(true);
      expect(result.body.data.length).toBe(2);
      
      // 验证返回的商品都属于指定分类且状态为上架
      result.body.data.forEach(goods => {
        expect(goods.categoryId).toBe(categoryId);
        expect(goods.status).toBe(1);
      });
    });

    it('查询不存在的分类ID应该返回空数组', async () => {
      const result = await createHttpRequest(app)
        .get('/app/shop/category/goodsList?categoryId=99999')
        .expect(200);

      expect(result.body.code).toBe(1000);
      expect(result.body.message).toBe('success');
      expect(Array.isArray(result.body.data)).toBe(true);
      expect(result.body.data.length).toBe(0);
    });

    it('缺少categoryId参数应该返回错误', async () => {
      const result = await createHttpRequest(app)
        .get('/app/shop/category/goodsList')
        .expect(200);

      // 根据实际的错误处理逻辑调整期望值
      expect(result.body.code).not.toBe(1000);
    });

    it('应该只返回上架状态的商品', async () => {
      // 创建测试分类
      const categoryResult = await createHttpRequest(app)
        .post('/admin/shop/category/add')
        .send({
          name: '状态测试分类',
          pic: 'https://example.com/status-category.jpg',
          description: '用于测试商品状态的分类',
          status: 1,
          orderNum: 1
        });

      const categoryId = categoryResult.body.data;

      // 创建上架商品
      await createHttpRequest(app)
        .post('/admin/shop/goods/add')
        .send({
          name: '上架商品',
          pic: ['https://example.com/online-goods.jpg'],
          categoryId: categoryId,
          status: 1, // 上架
          description: '这是上架的商品',
          orderNum: 1
        });

      // 创建下架商品
      await createHttpRequest(app)
        .post('/admin/shop/goods/add')
        .send({
          name: '下架商品',
          pic: ['https://example.com/offline-goods.jpg'],
          categoryId: categoryId,
          status: 0, // 下架
          description: '这是下架的商品',
          orderNum: 2
        });

      // 获取该分类下的商品列表
      const result = await createHttpRequest(app)
        .get(`/app/shop/category/goodsList?categoryId=${categoryId}`)
        .expect(200);

      expect(result.body.code).toBe(1000);
      expect(result.body.data.length).toBe(1);
      expect(result.body.data[0].name).toBe('上架商品');
      expect(result.body.data[0].status).toBe(1);
    });
  });

  describe('参数验证测试', () => {
    it('categoryId应该是数字类型', async () => {
      const result = await createHttpRequest(app)
        .get('/app/shop/category/goodsList?categoryId=abc')
        .expect(200);

      // 根据实际的参数验证逻辑调整期望值
      expect(result.body.code).not.toBe(1000);
    });
  });
}); 