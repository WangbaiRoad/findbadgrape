var app = getApp(); 
Page({
  data:{
    //保存已选择的图片
    chooseFiles:[],
    imgURL:"",
    lab1:"http://m.qpic.cn/psc?/V51Ov66m1dpq990lDW832XLGhC2bXirK/bqQfVz5yrrGYSXMvKr.cqXLAUszfOZ7EYQZa4cBVPB3xbqg9TsTyUay1SA78SOJN6UHW*GxfqTxSSWFKbUvR0USpZYDhLTYSeqVHCbrePcQ!/m&bo=VQhABsAP0AsBCSE!&rf=photolist",
    lab2:"http://m.qpic.cn/psc?/V51Ov66m1dpq990lDW832XLGhC2bXirK/bqQfVz5yrrGYSXMvKr.cqYPznUk*R8jz6WeTeCS2C4eYJSVvnj2ufCx.1uTq7q2Y3e11abD1nBtqM9Tt2jdQjf1dYN86WhHI.QM06UWG*QI!/m&bo=VQhABsAP0AsBCSE!&rf=photolist",
    school:"http://m.qpic.cn/psc?/V51Ov66m1dpq990lDW832XLGhC2bXirK/bqQfVz5yrrGYSXMvKr.cqXVFGhwTopBRUeWBULHUjmpy4sXJgyMWGzgRWx3RFoYRmPHNmk6F2ES1FLzE7DMI67iZVU8ihqSuQUhhuzxz6Ns!/mnull&bo=IAM0AgAAAAABBzU!&rf=photolist&t=5"
  },
  showinfo:function(event){
    wx.navigateTo({
      url: '../info/info',
    })
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
        //跳转页面
        that.uploadImg();

      },
    })
  },
  gotoNextPage:function(){
     //跳转页面
     wx.redirectTo({
      url: "../result/result",
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

 /**
   * 上传照片
   */
  uploadImg: function() {
    var that = this
    //将选择的图片作为全局数据
   
    app.globalData.bgPic=  that.data.chooseFiles[0];;
    wx.showToast({
      title: '正在处理', icon: 'loading', duration: 100000
    });
    wx.uploadFile({
      url: 'https://www.findbadgrape.top/upload', //服务器域名
      filePath: that.data.chooseFiles[0],
      name: 'file',
    
      success: function (res) {
        var data = res.data
        var jsondata= JSON.parse(res.data);
        var URL = jsondata["url"];//返回结果图片的url
        var word = jsondata["sickname"];
        app.globalData.resultPic = URL;    
        app.globalData.resultWord =  word; 
        var G_nameArr = word.toString().split(",");
        app.globalData.G_nameArr=G_nameArr;
        wx.hideToast();

        if (res.statusCode == 200) {//如果连接成功
        
          console.log(app.globalData.resultPic); 
          console.log(app.globalData.G_nameArr); 
         
          that.gotoNextPage();
        }

      }
    })
   }

  // uploadImg() {
  //   var that = this
  //   wx.cloud.uploadFile({
  //     cloudPath:new Date().getTime()+'.png', // 上传至云端的路径
  //     filePath: that.data.chooseFiles[0],// 小程序临时文件路径
  //     success: res => {
  //       // 返回文件 ID
  //       console.log("上传成功",res)
  //       console.log(cloudPath);
  //       //获取文件路径
  //       this.setData({
  //         imgURL:res.fileID
  //       })
  //     },
  //     fail: console.error
  //   })
  // }
})
 