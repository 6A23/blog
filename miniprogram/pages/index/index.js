const app = getApp();

Page({
  data: {
    // 本地资源（保留原功能）
    resources: { concrete: 0, metal: 0, electronics: 0 },
    resourcesList: [],
    // 月球基地（API 数据）
    moonBase: null,
    inventoryList: [],
    loading: false
  },

  onShow() {
    this.fetchMoonData();
  },

  fetchMoonData() {
    const BASE = app.globalData.apiBase;
    this.setData({ loading: true });

    // 并发请求月球总览 + 材料库存
    wx.request({
      url: `${BASE}?query=moon`,
      success: (res) => {
        this.setData({ moonBase: res.data });
      }
    });

    wx.request({
      url: `${BASE}?query=moon_materials`,
      success: (res) => {
        const inv = res.data && res.data.inventory ? res.data.inventory : {};
        const inventoryList = Object.values(inv);
        // 同步更新顶部概览（取前3种）
        const top3 = inventoryList.slice(0, 3);
        this.setData({
          inventoryList,
          loading: false,
          resources: {
            concrete: top3[0] ? top3[0].current : 0,
            metal:    top3[1] ? top3[1].current : 0,
            electronics: top3[2] ? top3[2].current : 0
          },
          resourcesList: top3.map(i => ({ type: i.name, amount: i.current }))
        });
      },
      fail: () => {
        this.setData({ loading: false });
        wx.showToast({ title: '加载失败', icon: 'error' });
      }
    });
  },

  // 模拟接收资源（触发 moon_supply 补给）
  receiveResources() {
    const BASE = app.globalData.apiBase;
    // 默认申请钛合金 10 单位作为演示
    wx.request({
      url: `${BASE}?action=moon_supply&material=钛合金&amount=10`,
      success: (res) => {
        wx.showToast({ title: res.data.message || '资源已接收', icon: 'success' });
        setTimeout(() => this.fetchMoonData(), 800);
      },
      fail: () => {
        wx.showToast({ title: '接收失败', icon: 'error' });
      }
    });
  },

  goToRoom() {
    wx.navigateTo({ url: '/pages/room/room' });
  },

  goToEarth() {
    wx.navigateTo({ url: '/pages/earth/earth' });
  }
});
