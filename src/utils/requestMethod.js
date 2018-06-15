// 参考来源： https://blog.csdn.net/linminghe/article/details/79847954
const serverPath = 'http://student.qiuxue001.com/api/'; // 路径
export function post(url, body) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: serverPath + url, // 拼接API url
      data: body, // 请求参数
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        resolve(res.data); // 返回的数据传出
      },
      fail(ret) {
        reject(ret); // 错误信息传出去
      },
    });
  });
}

export default {
  post,
};
