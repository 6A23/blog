// app.js
App({
  globalData: {
    apiBase: 'https://blog-6a23.vercel.app/api/earth'
  },

  onShareAppMessage() {
    return {
      title: '月球基地建设',
      path: '/pages/index/index'
    };
  }
});
