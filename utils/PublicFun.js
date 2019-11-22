function _showToast(title) {
  wx.showToast({
    icon: "none",
    title: title
  })
}

function _showLoading(title) {
  wx.showLoading({
    title: title,
  })
}

function _hideLoading() {
  wx.hideLoading()
}

function _showToastSuccess() {
  wx.showToast({
    title: '成功',
    icon: 'success',
    duration: 100000
  })
}

function role(id) {
  switch (id) {
    case 1:
      return "爸爸"
      break;
    case 2:
      return "妈妈"
      break;
    case 3:
      return "爷爷"
      break;
    case 4:
      return "奶奶"
      break;
    case 5:
      return "姥爷"
      break;
    case 6:
      return "姥姥"
      break;
    case 7:
      return '叔叔/大爷'
      break;
    case 8:
      return '婶婶/姨'
      break;
    case 9:
      return '舅舅/舅妈'
      break;
  }

}

function getUrlParam(name, url) {
  // 正则筛选地址栏
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  // 匹配目标参数
  var result = url.substr(1).match(reg);
  //返回参数值
  return result ? decodeURIComponent(result[2]) : null;
}
function uniq(array) {
  var temp = []
  let obj = array.reduce((prev, curr) => {
    if (prev[curr]) {
      prev[curr] = prev[curr] + 1;
    } else {
      prev[curr] = 1;
    }
    return prev;
  }, {});
  console.log(obj)
  for(let i in obj){
    var arr = []
    if(obj[i]%2==0){
       arr.push(i)
      for ( let j = 0; j < obj[i]-1;j++){
        arr.push('')
      }
    }else{
      arr.push(i)
      for (let j = 0; j < obj[i]; j++) {
        arr.push('')
      }
    }
    temp.push(...arr)
  }
  for (let i = 0; i < 3; i ++){
    temp.push('')
  }
 console.log(temp)
  
  return temp;
}

module.exports = {
  _showToast,
  _hideLoading,
  _showLoading,
  _showToastSuccess,
  role,
  getUrlParam,
  uniq
}