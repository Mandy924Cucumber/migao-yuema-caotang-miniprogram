Page({
  data: {
    userInfo: {},
    isLoggedIn: false,
    enrollList: [],
    cartCount: 0,
    orderCount: 0
  },

  onLoad() {
    this.loadUserInfo()
  },

  onShow() {
    this.loadUserInfo()
    this.loadEnrolls()
    this.loadCounts()
  },

  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo && userInfo.nickName && userInfo.nickName !== '访客') {
      this.setData({ userInfo, isLoggedIn: true })
    } else {
      this.setData({
        userInfo: {
          nickName: '访客',
          avatarUrl: '',
          memberLevel: '青铜会员',
          memberExpireAt: '2026-12-31',
          points: 120
        },
        isLoggedIn: false
      })
    }
  },

  loadEnrolls() {
    let enrolls = wx.getStorageSync('enrolls') || []
    enrolls = enrolls.map(e => ({
      ...e,
      title: e.title || '课程名称',
      timeText: e.timeText || e.paidAt
    }))
    this.setData({ enrollList: enrolls })
  },

  loadCounts() {
    const cart = wx.getStorageSync('cart') || []
    const orders = wx.getStorageSync('orders') || []
    this.setData({
      cartCount: cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
      orderCount: orders.length
    })
  },

  handleLogin() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        const userInfo = {
          ...res.userInfo,
          memberLevel: '青铜会员',
          memberExpireAt: '2026-12-31',
          points: 120,
          inviteCode: ''
        }
        wx.setStorageSync('userInfo', userInfo)
        this.setData({ userInfo, isLoggedIn: true })
        wx.showToast({ title: '登录成功', icon: 'success' })
      },
      fail: () => {
        wx.showModal({
          title: '提示',
          content: '需要授权微信信息才能登录。如无法弹出授权，将使用默认昵称。',
          confirmText: '使用默认',
          success: (res) => {
            if (res.confirm) {
              const userInfo = {
                nickName: '草堂用户',
                avatarUrl: '',
                memberLevel: '青铜会员',
                memberExpireAt: '2026-12-31',
                points: 120,
                inviteCode: ''
              }
              wx.setStorageSync('userInfo', userInfo)
              this.setData({ userInfo, isLoggedIn: true })
              wx.showToast({ title: '登录成功', icon: 'success' })
            }
          }
        })
      }
    })
  },

  handleLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('userInfo')
          this.setData({
            isLoggedIn: false,
            userInfo: {
              nickName: '访客',
              avatarUrl: '',
              memberLevel: '青铜会员',
              memberExpireAt: '2026-12-31',
              points: 120
            }
          })
          wx.showToast({ title: '已退出', icon: 'success' })
        }
      }
    })
  },

  goToCourseDetail(e) {
    const enroll = e.currentTarget.dataset.enroll
    wx.navigateTo({
      url: `/pages/course-detail/course-detail?courseId=${enroll.courseId}&type=${enroll.type || 'regular'}`
    })
  },

  goToCourses() {
    wx.switchTab({ url: '/pages/courses/courses' })
  },

  goToCart() {
    wx.navigateTo({ url: '/pages/cart/cart' })
  },

  goToOrders() {
    wx.navigateTo({ url: '/pages/orders/orders' })
  },

  goToMemberCenter() {
    wx.navigateTo({ url: '/pages/member-center/member-center' })
  },

  goToInvite() {
    wx.navigateTo({ url: '/pages/invite/invite' })
  },

  contactService() {
    wx.showActionSheet({
      itemList: ['拨打电话咨询', '复制客服微信号'],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.makePhoneCall({
            phoneNumber: '400-000-0000',
            fail: () => {
              wx.showToast({ title: '拨打失败', icon: 'none' })
            }
          })
        } else if (res.tapIndex === 1) {
          wx.setClipboardData({
            data: 'yuemacaotang',
            success: () => {
              wx.showToast({ title: '已复制客服微信号', icon: 'success' })
            }
          })
        }
      }
    })
  }
})
