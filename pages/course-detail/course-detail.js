Page({
  data: {
    loading: true,
    courseId: '',
    courseType: '',
    courseDetail: {}
  },

  onLoad(options) {
    const { courseId, type } = options
    if (!courseId) {
      this.setData({ loading: false })
      return
    }
    this.setData({ courseId, courseType: type })
    this.loadDetail()
  },

  loadDetail() {
    // Mock数据
    const mockDetail = {
      id: this.data.courseId,
      type: this.data.courseType || 'regular',
      title: '大咖公益课：茶与修心',
      teacher: '特邀讲师',
      date: '2026-02-08',
      time: '14:00-16:00',
      location: '阅马草堂·主厅',
      capacity: 60,
      remaining: 12,
      price: 0,
      deposit: 99,
      intro: '以茶入道，观心见性。',
      rules: [
        '报名预收押金，到场核销后原路退还',
        '名额有限，逾期视为未到场（规则二期配置）'
      ]
    }

    // 根据courseId调整数据
    if (this.data.courseType === 'regular') {
      mockDetail.title = '书法入门：楷书基础'
      mockDetail.price = 299
      mockDetail.deposit = undefined
      mockDetail.rules = ['报名后不可退款', '请准时参加']
    } else if (this.data.courseType === 'trial') {
      mockDetail.title = '体验课：花艺入门'
      mockDetail.price = 99
      mockDetail.deposit = undefined
      mockDetail.rules = ['体验课仅限首次报名']
    }

    setTimeout(() => {
      this.setData({
        loading: false,
        courseDetail: mockDetail
      })
    }, 300)
  },

  goToEnroll() {
    if (!this.data.courseDetail.id) return
    wx.navigateTo({
      url: `/pages/enroll/enroll?courseId=${this.data.courseDetail.id}&type=${this.data.courseDetail.type}`
    })
  },

  goBack() {
    wx.navigateBack()
  }
})
