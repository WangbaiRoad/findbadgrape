Page({
  data:{
    //保存已选择的图片
    chooseFiles:[]
  },
  chooseImage:function(event){
    //已选择图片数组
    var imgArr=this.data.chooseFiles;
    //只能上传一张图片
    var leftCount = 1 - imgArr.length;
    if(leftCount<=0){
      return;
    }
    var sourceType = [event.currentTarget.dataset.category];
    var that = this;
    wx.chooseImage({
      count: leftCount,
      sourceType:sourceType,
      success:function(res){
        that.setData({
          chooseFiles:imgArr.concat(res.tempFilePaths)
        })
        that.gotoNextPage(); 
      },
    })
  },
  gotoNextPage:function(){
     //跳转页面
     wx.navigateTo({
      url: "../post/post",
      success:function(){
        console.log("成功");
      },
      fail:function(){
        console.log("失败");
      },
      complete:function(){
        console.log("完成");
      }
    })
  },
  sendImage:function(e){
    var that =this;
    app.globalData.chooseFiles = that.data.chooseFiles;
  }
})