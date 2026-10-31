Page({
  data: {
    userInfo: {},
    levels: [
      { key: 'bronze', name: '青铜会员', icon: '🥉', points: 0, benefits: ['课程报名优先', '生日祝福'] },
      { key: 'silver', name: '白银会员', icon: '🥈', points: 500, benefits: ['课程9折', '每月1次体验课', '生日礼物'] },
      { key: 'gold', name: '黄金会员', icon: '🥇', points: 2000, benefits: ['课程8折', '专属文旅路线', '每月2次体验课', '限定文创'] },
      { key: 'diamond', name: '钻石会员', icon: '💎', points: 5000, benefits: ['课程7折', '私人定制优先', '拍卖保证金减免', '年度雅集邀请'] }
    ],
    currentLevelIndex: 0,
    pointsHistory: []
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const userInfo = wx.getStorageSync('userInfo') || {
      nickName: '访客',
      memberLevel: '青铜会员',
      points: 120,
      memberExpireAt: '2026-12-31'
    }
    const currentLevelIndex = this.data.levels.findIndex(l => l.name === userInfo.memberLevel)
    const pointsHistory = wx.getStorageSync('pointsHistory') || [
      { id: 'ph_1', desc: '注册赠送', points: 50, time: '2026-01-01', type: 'earn' },
      { id: 'ph_2', desc: '课程报名', points: 30, time: '2026-01-15', type: 'earn' },
      { id: 'ph_3', desc: '作品投稿', points: 20, time: '2026-02-01', type: 'earn' },
      { id: 'ph_4', desc: '投票参与', points: 20, time: '2026-03-10', type: 'earn' }
    ]
    this.setData({
      userInfo,
      currentLevelIndex: currentLevelIndex >= 0 ? currentLevelIndex : 0,
      pointsHistory
    })
  },

  openMember() {
    const userInfo = this.data.userInfo
    if (userInfo.memberLevel === '青铜会员') {
      wx.showModal({
        title: '升级白银会员',
        content: '年费 ¥299，享受课程9折等专属权益',
        confirmText: '立即开通',
        success: (res) => {
          if (res.confirm) {
            userInfo.memberLevel = '白银会员'
            userInfo.points += 200
            wx.setStorageSync('userInfo', userInfo)
            let history = wx.getStorageSync('pointsHistory') || this.data.pointsHistory
            history.unshift({
              id: 'ph_' + Date.now(),
              desc: '开通白银会员赠送',
              points: 200,
              time: new Date().toLocaleDateString('zh-CN'),
              type: 'earn'
            })
            wx.setStorageSync('pointsHistory', history)
            this.loadData()
            wx.showToast({ title: '开通成功', icon: 'success' })
          }
        }
      })
    } else {
      wx.showModal({
        title: '续费会员',
        content: `续费一年 ¥299，当前到期：${userInfo.memberExpireAt}`,
        confirmText: '立即续费',
        success: (res) => {
          if (res.confirm) {
            userInfo.memberExpireAt = '2027-12-31'
            wx.setStorageSync('userInfo', userInfo)
            this.loadData()
            wx.showToast({ title: '续费成功', icon: 'success' })
          }
        }
      })
    }
  },

  goBack() {
    wx.navigateBack()
  }
})
