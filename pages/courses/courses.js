const app = getApp()

Page({
  data: {
    loading: false,
    refreshing: false,
    searchKeyword: '',
    selectedType: 'all',
    courseList: [],
    page: 1,
    pageSize: 10,
    hasMore: true
  },

  onLoad() {
    // 读取全局默认类型
    if (app.globalData.defaultCourseType) {
      this.setData({
        selectedType: app.globalData.defaultCourseType
      })
      app.globalData.defaultCourseType = null // 清除
    }
    this.loadCourses()
  },

  onShow() {
    // 每次显示时刷新（可能从详情页返回）
    this.refreshList()
  },

  loadCourses(reset = false) {
    if (reset) {
      this.setData({ page: 1, courseList: [], hasMore: true })
    }

    // Mock数据
    const mockCourses = this.getMockCourses()
    let filtered = mockCourses

    // 筛选类型
    if (this.data.selectedType !== 'all') {
      filtered = filtered.filter(c => c.type === this.data.selectedType)
    }

    // 搜索
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase()
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(keyword) ||
        c.teacher.toLowerCase().includes(keyword) ||
        c.date.includes(keyword)
      )
    }

    // 模拟分页
    const start = (this.data.page - 1) * this.data.pageSize
    const end = start + this.data.pageSize
    const pageData = filtered.slice(start, end)

    this.setData({
      courseList: reset ? pageData : [...this.data.courseList, ...pageData],
      hasMore: end < filtered.length,
      loading: false,
      refreshing: false
    })
  },

  getMockCourses() {
    return [
      {
        id: 'c_1001',
        type: 'public',
        title: '大咖公益课：茶与修心',
        teacher: '特邀讲师',
        date: '2026-02-08',
        time: '14:00-16:00',
        location: '阅马草堂·主厅',
        capacity: 60,
        remaining: 12,
        price: 0,
        deposit: 99
      },
      {
        id: 'c_1002',
        type: 'regular',
        title: '书法入门：楷书基础',
        teacher: '张老师',
        date: '2026-02-10',
        time: '10:00-12:00',
        location: '阅马草堂·书法室',
        capacity: 20,
        remaining: 5,
        price: 299
      },
      {
        id: 'c_1003',
        type: 'trial',
        title: '体验课：花艺入门',
        teacher: '李老师',
        date: '2026-02-12',
        time: '15:00-17:00',
        location: '阅马草堂·花艺室',
        capacity: 15,
        remaining: 8,
        price: 99
      },
      {
        id: 'c_1004',
        type: 'regular',
        title: '茶会：品茗论道',
        teacher: '王老师',
        date: '2026-02-15',
        time: '19:00-21:00',
        location: '阅马草堂·茶室',
        capacity: 12,
        remaining: 3,
        price: 199
      },
      {
        id: 'c_1005',
        type: 'public',
        title: '大咖公益课：国画赏析',
        teacher: '特邀讲师',
        date: '2026-02-18',
        time: '14:00-16:00',
        location: '阅马草堂·主厅',
        capacity: 50,
        remaining: 20,
        price: 0,
        deposit: 99
      }
    ]
  },

  selectType(e) {
    const type = e.currentTarget.dataset.type
    this.setData({ selectedType: type })
    this.loadCourses(true)
  },

  onSearchInput(e) {
    const keyword = e.detail.value
    this.setData({ searchKeyword: keyword })
    // Debounce
    clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(() => {
      this.loadCourses(true)
    }, 300)
  },

  onRefresh() {
    this.setData({ refreshing: true })
    this.loadCourses(true)
  },

  onLoadMore() {
    if (!this.data.hasMore || this.data.loading) return
    this.setData({ 
      page: this.data.page + 1,
      loading: true
    })
    this.loadCourses()
  },

  refreshList() {
    this.loadCourses(true)
  },

  goToDetail(e) {
    const course = e.currentTarget.dataset.course
    wx.navigateTo({
      url: `/pages/course-detail/course-detail?courseId=${course.id}&type=${course.type}`
    })
  },

  goToHome() {
    wx.switchTab({
      url: '/pages/home/home'
    })
  }
})
