var app = getApp(); 
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgurl:"",
    result:"",
    tip:""
  },
  onShow: function(options) {
    if(app.globalData.G_nameArr==""){
      this.setData({
        imgurl:app.globalData.bgPic,
        result:"无法识别",
         tip:"无法识别哦，所以没有任何信息"
      })
     
    }else{
      this.setData({
      imgurl:app.globalData.resultPic,
      result:app.globalData.G_nameArr,
      tip:"点击查看"+app.globalData.G_nameArr+"的详细信息"
    })
  }
    
   
},
  introduce:function(event){
    var db = wx.cloud.database();
    
    db.collection('G_disease').where({
      G_name :app.globalData.G_nameArr[0]
    })
    .get({
      success: res =>{
        app.globalData.G.G_picture=res.data[0].G_picture
        app.globalData.G.G_control=res.data[0].G_control
        app.globalData.G.G_name=res.data[0].G_name
        app.globalData.G.G_rule=res.data[0].G_rule
        app.globalData.G.G_symptom=res.data[0].G_symptom
        app.globalData.G.G_area=res.data[0].G_area
        
        wx.navigateTo({
          url: '../G_info/G_info',
        })
      }
    })  
},
//点击保存图片
save:function(event){
  let url = event.currentTarget.dataset.url;
  wx.getSetting({
    success: (res) => {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success:()=> {
            // 同意授权
            this.saveImg1(url);
          },
          fail: (res) =>{
            console.log(res);
          }
        })
      }else{
        // 已经授权了
        this.saveImg1(url);//用户授权后，调用saveImg()方法，进行图片的保存
      }
    },
    fail: (res) =>{
      console.log(res);
    }
  })   
},
  saveImg1:function(url){
    var that = this;
    wx.getImageInfo({
      src:that.data.imgurl,
      success: function (ret) {
        var path = ret.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(result) {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
          },
        })
      }
    })
  },
   advise:function(){
    wx.navigateTo({
      url: '../opinion/opinion',
    })
  }
})
 