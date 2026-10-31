const app = getApp()

Page({
  data: {
    loading: true,
    homeCards: []
  },

  onLoad() {
    this.loadData()
  },

  loadData() {
    // 模拟加载
    setTimeout(() => {
      this.setData({
        loading: false,
        homeCards: [
          {
            key: 'public',
            title: '大咖公益课',
            desc: '报名预收，到场核销退还',
            badge: '公益',
            action: { type: 'switchTab', target: 'courses', payload: { courseType: 'public' } }
          },
          {
            key: 'regular',
            title: '常规课程',
            desc: '文化课/茶会/花艺/书法/读书会/国画/厨艺',
            emphasize: true,
            action: { type: 'switchTab', target: 'courses', payload: { courseType: 'regular' } }
          },
          {
            key: 'trial',
            title: '体验课',
            desc: '体验课程内容',
            emphasize: true,
            action: { type: 'switchTab', target: 'courses', payload: { courseType: 'trial' } }
          },
          {
            key: 'travel',
            title: '文旅：放马天涯',
            desc: '深度文化旅行',
            action: { type: 'navigateTo', target: 'travel', payload: { from: 'home' } }
          },
          {
            key: 'custom',
            title: '私人定制',
            desc: '专属定制服务',
            action: { type: 'navigateTo', target: 'custom', payload: { from: 'home' } }
          },
          {
            key: 'auction',
            title: '公益拍卖',
            desc: '线上公益拍卖',
            action: { type: 'switchTab', target: 'discover', payload: { tab: 'auction' } }
          },
          {
            key: 'works',
            title: '作品征集/投票',
            desc: '投稿作品参与投票',
            action: { type: 'switchTab', target: 'discover', payload: { tab: 'works' } }
          }
        ]
      })
    }, 300)
  },

  handleCardTap(e) {
    const card = e.currentTarget.dataset.card
    const action = card.action

    if (action.type === 'switchTab') {
      if (action.target === 'courses') {
        app.globalData.defaultCourseType = action.payload.courseType
        wx.switchTab({
          url: '/pages/courses/courses'
        })
      } else if (action.target === 'discover') {
        app.globalData.defaultDiscoverTab = action.payload.tab
        wx.switchTab({
          url: '/pages/discover/discover'
        })
      }
    } else if (action.type === 'navigateTo') {
      let url = `/pages/${action.target}/${action.target}`
      if (action.payload) {
        const params = Object.keys(action.payload).map(k => `${k}=${action.payload[k]}`).join('&')
        url += `?${params}`
      }
      wx.navigateTo({ url })
    }
  },

  goToMember() {
    wx.switchTab({
      url: '/pages/my/my'
    })
  }
})
