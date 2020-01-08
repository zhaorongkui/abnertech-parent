// component/checkboxQuestionAnswer/checkboxQuestionAnswer.js
Component({
  properties: {
    infos: Object
  },
  /**
   * 组件的初始数据
   */
  data: {
    infos: null,
    currentIndexArr: [],
    selectItemArr: [],
    questionAnswer: [],
    answerContent: [],
    mergeArr: [],
    colorArr: []
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    ready() {
      this.setData({
        infos: this.data.infos
      })

      var arr = []
      var optionsList = [] //获取选项的abcd
      var colorArr = []
      var colorArrs = []
      var sortArr = []
      var mergeArr = []

      this.data.infos.questionOptionsList.forEach(item => {
        optionsList.push(item.questionOption)
      })


      this.setData({
        questionAnswer: this.data.infos.questionAnswer.split('')
      })

      //this.data.questionAnswer = this.data.infos.questionAnswer.split('')
      this.setData({
        answerContent: this.data.infos.revisionStudentAnswer.answerContent.split('')
      })
      // this.data.answerContent = this.data.infos.revisionStudentAnswer.answerContent.split('')
      this.data.answerContent.forEach(item => {
        this.data.questionAnswer.forEach(items => {
          if (item == items) {
            arr.push(item)
            let obj = {
              tem: item,
              bgflag: true
            }
            mergeArr.push(obj)
          }
        })
      })
      this.setData({
        mergeArr: mergeArr
      })

      this.data.answerContent.forEach(item => {
        if (arr.indexOf(item) == -1) {
          let obj = {
            tem: item,
            bgflag: false
          }
          mergeArr.push(obj)
        }
      })

      this.setData({
        mergeArr: mergeArr
      })
      
      this.setData({
        colorArr: this.data.mergeArr.slice()
      })
     // this.data.colorArr = this.data.mergeArr.slice()

      this.data.colorArr.forEach(item => {
        colorArr.push(item.tem)
      })

      optionsList.forEach(item => {
        if (colorArr.indexOf(item) == -1) {
          let obj = {
            tem: item,
            bgflag: false
          }
          colorArrs.push(obj)
        }
      })

      this.setData({
        colorArr: colorArrs
      })

      optionsList.forEach(item => {
        this.data.colorArr.forEach(items => {
          if (items.tem == item) {
            sortArr.push(items)
          }
        })
      })

      thiis.setData({
        colorArr: sortArr.slice()
      })
      //this.data.colorArr = sortArr.slice()

    }
  }
})