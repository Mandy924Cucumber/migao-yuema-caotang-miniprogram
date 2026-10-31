Page({
  data: {
    courseId: '',
    courseType: '',
    courseInfo: {},
    form: {
      contactName: '',
      phone: '',
      remark: ''
    },
    submitting: false
  },

  onLoad(options) {
    const { courseId, type } = options
    if (!courseId) {
      wx.showToast({
        title: '参数错误',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
      return
    }
    this.setData({ courseId, courseType: type })
    this.loadCourseInfo()
  },

  loadCourseInfo() {
    // Mock课程信息
    const courseInfo = {
      id: this.data.courseId,
      type: this.data.courseType,
      title: '大咖公益课：茶与修心',
      date: '2026-02-08',
      time: '14:00-16:00',
      location: '阅马草堂·主厅',
      price: 0,
      deposit: 99
    }
    this.setData({ courseInfo })
  },

  onContactNameInput(e) {
    this.setData({
      'form.contactName': e.detail.value
    })
  },

  onPhoneInput(e) {
    this.setData({
      'form.phone': e.detail.value
    })
  },

  onRemarkInput(e) {
    this.setData({
      'form.remark': e.detail.value
    })
  },

  validateForm() {
    const { contactName, phone } = this.data.form
    if (!contactName || contactName.trim() === '') {
      wx.showToast({
        title: '请输入联系人',
        icon: 'none'
      })
      return false
    }
    if (!phone || phone.length !== 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return false
    }
    const phoneReg = /^1[3-9]\d{9}$/
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return false
    }
    return true
  },

  handleSubmit() {
    if (!this.validateForm()) return
    if (this.data.submitting) return

    this.setData({ submitting: true })

    // 模拟支付
    setTimeout(() => {
      // 保存报名记录
      const enrollRecord = {
        id: 'e_' + Date.now(),
        courseId: this.data.courseId,
        type: this.data.courseType,
        title: this.data.courseInfo.title,
        timeText: `${this.data.courseInfo.date} ${this.data.courseInfo.time}`,
        status: 'paid',
        paidAt: new Date().toLocaleString('zh-CN'),
        deposit: this.data.courseInfo.deposit || 0,
        contactName: this.data.form.contactName,
        phone: this.data.form.phone,
        remark: this.data.form.remark
      }

      // 读取现有记录
      let enrolls = wx.getStorageSync('enrolls') || []
      enrolls.unshift(enrollRecord)
      wx.setStorageSync('enrolls', enrolls)

      wx.showToast({
        title: '报名成功',
        icon: 'success'
      })

      setTimeout(() => {
        wx.redirectTo({
          url: `/pages/course-detail/course-detail?courseId=${this.data.courseId}&type=${this.data.courseType}`
        })
      }, 1500)
    }, 1000)
  }
})
