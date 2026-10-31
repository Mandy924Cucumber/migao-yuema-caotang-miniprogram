Page({
  data: {
    inviteCode: '',
    inviteCount: 0,
    rewardPoints: 0,
    inviteList: [],
    rules: [
      '每成功邀请1位好友注册，双方各得50积分',
      '被邀请人需完成首次课程报名方算有效',
      '积分可在会员中心查看及使用',
      '每人最多邀请50位好友',
      '活动解释权归阅马草堂所有'
    ]
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const userInfo = wx.getStorageSync('userInfo') || {}
    const inviteCode = userInfo.inviteCode || this.generateCode()
    const inviteList = wx.getStorageSync('inviteList') || []
    const inviteCount = inviteList.length
    const rewardPoints = inviteCount * 50

    if (!userInfo.inviteCode) {
      userInfo.inviteCode = inviteCode
      wx.setStorageSync('userInfo', userInfo)
    }

    this.setData({ inviteCode, inviteCount, rewardPoints, inviteList })
  },

  generateCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let code = 'YM'
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
  },

  copyCode() {
    wx.setClipboardData({
      data: this.data.inviteCode,
      success: () => {
        wx.showToast({ title: '邀请码已复制', icon: 'success' })
      }
    })
  },

  shareToFriend() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  onShareAppMessage() {
    return {
      title: '阅马草堂 · 文化生活空间',
      desc: `使用邀请码 ${this.data.inviteCode} 注册，双方各得50积分`,
      path: `/pages/home/home?inviteCode=${this.data.inviteCode}`
    }
  },

  onShareTimeline() {
    return {
      title: `阅马草堂 · 邀请码：${this.data.inviteCode}`,
      query: `inviteCode=${this.data.inviteCode}`
    }
  },

  generatePoster() {
    wx.showToast({
      title: '海报已生成',
      icon: 'success'
    })
    wx.showModal({
      title: '分享海报',
      content: `您的邀请码：${this.data.inviteCode}\n\n长按复制邀请码，发送给好友即可。阅马草堂 · 文化生活空间，期待您的加入！`,
      confirmText: '复制邀请码',
      success: (res) => {
        if (res.confirm) {
          this.copyCode()
        }
      }
    })
  }
})
