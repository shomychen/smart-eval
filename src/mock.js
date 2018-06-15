// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
// mock一组数据
const produceData = (opt) => {
  console.log('opt', opt);
  const articles = [];
  for (let i = 0; i < 10; i += 1) {
    const newArticleObject = {
      title: Mock.Random.csentence(5, 30), // Random.csentence( min, max )
      thumbnail_pic_s: Mock.Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Mock.Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Mock.Random.date() + ' ' + Mock.Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    articles.push(newArticleObject);
  }
  return {
    data: articles,
  };
};
Mock.mock('/news', /post|get/i, produceData);// 当post或get请求到/news路由时Mock会拦截请求并返回上面的数据
// 使用mockjs模拟数据
Mock.mock('/api/data', (req, res) => {
  console.log(res);
  console.log(req);
  return {
    data: ['a', 'b'],
  };
});
