Page({
  data: {
    imagePath: '',
    form: {
      title: '',
      author: '',
      desc: ''
    },
    submitting: false
  },

  onLoad(options) {
    // 可以读取from参数
  },

  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        this.setData({ imagePath: tempFilePath })
      }
    })
  },

  onTitleInput(e) {
    this.setData({
      'form.title': e.detail.value
    })
  },

  onAuthorInput(e) {
    this.setData({
      'form.author': e.detail.value
    })
  },

  onDescInput(e) {
    this.setData({
      'form.desc': e.detail.value
    })
  },

  validateForm() {
    const { title, author } = this.data.form
    if (!title || title.trim() === '') {
      wx.showToast({
        title: '请输入作品标题',
        icon: 'none'
      })
      return false
    }
    if (!author || author.trim() === '') {
      wx.showToast({
        title: '请输入作者名',
        icon: 'none'
      })
      return false
    }
    if (!this.data.imagePath) {
      wx.showToast({
        title: '请上传作品图片',
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

    // 保存作品
    const workRecord = {
      id: 'w_' + Date.now(),
      title: this.data.form.title,
      author: this.data.form.author,
      votes: 0,
      cover: this.data.imagePath,
      desc: this.data.form.desc,
      createdAt: new Date().toLocaleString('zh-CN')
    }

    // 读取现有作品
    let works = wx.getStorageSync('works') || []
    works.unshift(workRecord)
    wx.setStorageSync('works', works)

    wx.showToast({
      title: '提交成功',
      icon: 'success'
    })

    const app = getApp()
    app.globalData.defaultDiscoverTab = 'works'
    setTimeout(() => {
      this.setData({ submitting: false })
      wx.switchTab({
        url: '/pages/discover/discover'
      })
    }, 1500)
  }
})
