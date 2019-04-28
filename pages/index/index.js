const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  //set data
  data: {
    nowTemp :' ',
    nowWeather: ' ',
    nowWeatherBackground:" ",
    hourlyWeather:[ ]
  },

  //set on load interactions
  onLoad() {
    this.getNow()
  },

  //set Pulldown refresh
  onPullDownRefresh() {
    this.getNow(()=> {
      wx.stopPullDownRefresh()
    })
  },

  //getNow
  getNow(callback) { 
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '广州市'
      },
      success: res => {
        //grab NOW data
          let temp = res.data.result.now.temp 
          let weather = res.data.result.now.weather
          this.setData({
            nowTemp: temp + '°',
            nowWeather: weather,
            nowWeatherBackground: '/images/' + weather + '-bg.png'
          })

        //set forecast
        let forecast = res.data.result.forecast
        let hourlyWeather = []
        let nowHour = new Date().getHours()
        for (let i = 0; i < 8; i += 1) {
          hourlyWeather.push({
            time: (i*3 + nowHour) % 24 + "时",
            iconPath: '/images/' + forecast[i].weather + '-icon.png',
            temp: forecast[i].temp + '°'
          })
        }

        hourlyWeather[0].time = '现在'
        this.setData({
          hourlyWeather: hourlyWeather
        })  
      },//end of success:res
        complete:() => {
          callback && callback ()
        }
      
    })//end of wx.request
  }//end of getNow
})//end of Page