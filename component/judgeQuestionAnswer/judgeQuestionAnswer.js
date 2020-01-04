// component/JudgeQuestionAnswer/judgeQuestionAnswer.js
Component({
  properties: {
    infos: Object
  },
  /**
   * 组件的初始数据
   */
  data: {
    infos: {},
    stemObj: {},
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    ready() {
      // 在组件在视图层布局完成后执行
      // 父组件传过来的data,用this.data.res接收
      let answerContent = "infos.revisionStudentAnswer.answerContent"
      this.setData({
        infos: this.data.infos,
      })
      if (this.data.infos && this.data.infos.revisionStudentAnswer && this.data.infos.revisionStudentAnswer.answerContent) {
        let upAnswerContent = (this.data.infos.revisionStudentAnswer.answerContent).toUpperCase()
        this.setData({
          [answerContent]: upAnswerContent
        })
      }
    }
  }
})