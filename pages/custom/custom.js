Page({
  data: {
    typeOptions: ['课程包场', '文旅定制', '礼品定制', '私人雅集', '其它'],
    budgetOptions: ['<2000', '2k-5k', '5k-1w', '1w+'],
    typeIndex: -1,
    budgetIndex: -1,
    minDate: '',
    form: {
      type: '',
      date: '',
      people: '',
      budget: '',
      contactName: '',
      phone: '',
      desc: ''
    },
    submitting: false
  },

  onLoad(options) {
    // 设置最小日期为今天
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    this.setData({ minDate: `${year}-${month}-${day}` })

    // 读取参数，预选类型
    if (options.type === 'travel') {
      const typeIndex = this.data.typeOptions.findIndex(t => t === '文旅定制')
      if (typeIndex !== -1) {
        this.setData({
          typeIndex,
          'form.type': '文旅定制'
        })
      }
    }
  },

  onTypeChange(e) {
    const index = parseInt(e.detail.value)
    this.setData({
      typeIndex: index,
      'form.type': this.data.typeOptions[index]
    })
  },

  onDateChange(e) {
    this.setData({
      'form.date': e.detail.value
    })
  },

  onPeopleInput(e) {
    this.setData({
      'form.people': e.detail.value
    })
  },

  onBudgetChange(e) {
    const index = parseInt(e.detail.value)
    this.setData({
      budgetIndex: index,
      'form.budget': this.data.budgetOptions[index]
    })
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

  onDescInput(e) {
    this.setData({
      'form.desc': e.detail.value
    })
  },

  validateForm() {
    const { type, contactName, phone, desc } = this.data.form
    if (!type || type.trim() === '') {
      wx.showToast({
        title: '请选择类型',
        icon: 'none'
      })
      return false
    }
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
    if (!desc || desc.trim() === '') {
      wx.showToast({
        title: '请输入需求描述',
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

    // 保存请求记录
    const request = {
      id: 'c_' + Date.now(),
      ...this.data.form,
      createdAt: new Date().toLocaleString('zh-CN')
    }

    let requests = wx.getStorageSync('customRequests') || []
    requests.unshift(request)
    wx.setStorageSync('customRequests', requests)

    wx.showToast({
      title: '提交成功',
      icon: 'success'
    })

    setTimeout(() => {
      // 清空表单
      this.setData({
        typeIndex: -1,
        budgetIndex: -1,
        form: {
          type: '',
          date: '',
          people: '',
          budget: '',
          contactName: '',
          phone: '',
          desc: ''
        },
        submitting: false
      })
    }, 1500)
  }
})
