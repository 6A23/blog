Page({
  data: {
    roomTypes: [
      { type: '卧室',    icon: '🛏️', stage: '居住舱' },
      { type: '厨房',    icon: '🍳', stage: '居住舱' },
      { type: '太阳能板', icon: '☀️', stage: '能源系统' },
      { type: '仓库',    icon: '📦', stage: '地基' },
      { type: '实验室',  icon: '🔬', stage: '骨架' },
      { type: '通讯中心', icon: '📡', stage: '通信塔' }
    ],
    selectedRoom: '',
    selectedStage: '',
    customRoom: ''
  },

  selectRoom(e) {
    const idx = e.currentTarget.dataset.idx;
    const item = this.data.roomTypes[idx];
    this.setData({ selectedRoom: item.type, selectedStage: item.stage, customRoom: '' });
  },

  onInputCustom(e) {
    this.setData({ customRoom: e.detail.value });
  },

  selectCustomRoom() {
    if (this.data.customRoom.trim()) {
      this.setData({ selectedRoom: this.data.customRoom, selectedStage: '居住舱' });
    }
  },

  startConstruction() {
    if (!this.data.selectedRoom) return;
    wx.navigateTo({
      url: `/pages/progress/progress?room=${encodeURIComponent(this.data.selectedRoom)}&stage=${encodeURIComponent(this.data.selectedStage)}`
    });
  }
});
