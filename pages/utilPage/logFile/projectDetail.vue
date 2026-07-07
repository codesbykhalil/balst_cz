<template>
  <client-only>
    <div style="overflow-y: hidden;overflow-x: hidden">
      <el-container class="operation-wrapper" >

        <!-- 公共头引入 -->
        <el-header>
          <div class="top-box">
            <div class="icon_jhun">
              <img :src="require('assets/img/ui/picture_01.png')" style="width: 40px">
              <img :src="require('assets/img/ui/picture_02.png')" style="width: 40px;margin-left: 10px">
            </div>
            <div class="header_title"><span style="color: #FFFFFF;font-size: 35px">全断面+楔形掏槽</span></div>
            <div style="margin-right: 20px;flex: 1;padding-right: 30px">
              <div style="display: flex;float: right;">
                <img src="~/assets/img/avatar-boy.gif" style="margin-top: 15px;width: 32px;height: 32px;">
                <span style="max-width: 100px;overflow: hidden;text-overflow: ellipsis;line-height: 60px;color: #FFFFFF;margin: 0 20px 0 5px;">{{loginInfo.username}}</span>
                <div class="icon-container" @mouseover="showText = true" @mouseout="showText = false">
                  <img
                    class="icon"
                    src="~/assets/img/index.png"
                    alt="图标"
                    @click="back"
                    style="color: #000000;margin-top: 15px;width: 32px;height: 32px"/>
                  <div v-if="showText" class="text">返回首页</div>
                </div>
                <div class="icon-container" @mouseover="showText = true" @mouseout="showText = false">
                  <img
                    class="icon"
                    src="~/assets/img/logout.png"
                    alt="图标"
                    @click="logout"
                    style="color: #000000;padding-left:20px;margin-top: 15px;width: 32px;height: 32px"/>
                  <div v-if="showText" class="text">退出系统</div>
                </div>
              </div>
            </div>
          </div>
        </el-header>
        <!-- /公共头引入 -->

        <el-container class="container_layout">
          <el-main class="el-main-demo" style="height:100%;overflow-y: hidden">
            <div  ref="box" @scroll="handleScroll($event)" class="scroll-container"
                  style="height: calc(100vh - 94px);margin-left: 2px;
             overflow-y: scroll;overflow-x: hidden;padding-right: 25px;">

              <div class="card1">
                <div style="padding-right: 20px" class="icon_title">
                  <h2 class= title1-before style="margin-top: 25px;font-size: 20px;!important;color: white;margin-left: 40px;padding-top: 21px;">软件服务日志</h2>
                </div>
                <div style="float:left;margin-top: -50px;margin-left: 0px">
                  <el-table
                  :data="tableData"
                  size="medium"
                  style="width: 1340px;margin-top:150px;margin-left:150px;border: 1px solid #5B9BD5"
                  :row-class-name="tableRowClassName"
                  :cell-style="cellStyle"
                  :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a'  }"
                >

                  <!-- 序号 -->
                  <el-table-column
                    prop="projectId"
                    label="项目ID"
                    width="200"
                    align="center"
                    style=" width:100px;" >
                  </el-table-column>

                  <el-table-column
                    prop="holeNum"
                    label="孔数量"
                    width="189"
                    align="center">
                    <div class="item" slot-scope="scope">
                      <div class="item__txt">{{scope.row.holeNum}}</div>
                    </div>
                  </el-table-column>

                  <el-table-column
                    prop="explosiveAmount"
                    label="装药量"
                    width="190" align="center">
                    <div class="item" slot-scope="scope">
                      <div class="item__txt">{{scope.row.explosiveAmount}}</div>
                    </div>
                  </el-table-column>

                  <el-table-column
                    prop="explosivesUnitNum"
                    label="雷管数量"
                    width="190"
                    align="center">
                    <div class="item" slot-scope="scope">
                      <div class="item__txt">{{scope.row.explosivesUnitNum}}</div>
                    </div>
                  </el-table-column>

                  <el-table-column
                    prop="holeLength"
                    label="开挖进尺"
                    width="190"
                    align="center">
                    <div class="item" slot-scope="scope">
                      <div class="item__txt">{{scope.row.holeLength}}</div>
                    </div>
                  </el-table-column>

                  <el-table-column
                      prop="unitConsumption"
                      label="平均单耗"
                      width="190"
                      align="center">
                      <div class="item" slot-scope="scope">
                        <div class="item__txt">{{scope.row.unitConsumption}}</div>
                      </div>
                  </el-table-column>

                  <el-table-column
                    prop="burstingEffect"
                    label="爆破效果"
                    width="190"
                    align="center">
                    <div class="item" slot-scope="scope">
                      <div class="item__txt">{{scope.row.burstingEffect}}</div>
                    </div>
                  </el-table-column>

                </el-table>
                </div>
                <br>
<!--                折线图开始-->
                <div id="echarts">
                  <div id="myChart" style="padding: 150px 0 0 150px"></div>
                  <div id="myChart2" style="padding: 150px 0 0 0"></div>
                </div>
<!--                折线图结束-->
              </div>

            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </client-only>
</template>
<script>
import 'assets/css/reset.css'
import 'assets/css/theme.css'
import 'assets/css/global.css'
import 'assets/css/web.css'
import 'assets/css/base.css'
import 'assets/css/activity_tab.css'
import 'assets/css/bottom_rec.css'
import 'assets/css/nice_select.css'
import 'assets/css/order.css'
import "assets/css/pages-weixinpay.css"
import loginApi from '@/api/login.js'
import cookie from 'js-cookie'
import * as echarts from 'echarts';
export default {
  layout: 'default',
  data(){
    return{
      timer: '',
      userInfo: {userId:''},
      counts:[],
      dates:[],
      effectMap:{},
      servingNumber:0,        //计算服务次数
      showText:false,
      tableData:[],
      scrollHeight: [],
      loginInfo: {
        id: '',
        // avatar: '',
        phone: '',
        username: '',
      },
      fakeData:{
        servingNumber: 10,
        logsList: null
      }
    }
  },
  created(){
    console.log(this.$route.query.userId)

    // this.tableData = this.fakeData.logsList
    this.userInfo.userId = this.$route.query.userId
    loginApi.queryLogs(this.userInfo).then(response => {
      console.log(response.data.data)
      this.tableData = response.data.data.logsList;
      this.fakeData.logsList = response.data.data.logsList;
      this.servingNumber = response.data.data.servingNumber;
      this.initCharts();
    })
  },
  mounted() {
    setTimeout(() => {
      this.echartsInit();
      this.echartsInit2();
    }, 1000);

  },
  methods: {
    initCharts(){
          var dateList = []
          var effectList = []
          this.fakeData.logsList.forEach((item)=> {
            dateList.push(item.createTime)
            effectList.push(item.burstingEffect)
          })
          var dateCountMap = {};
          dateList.forEach(function(date) {
            if (dateCountMap[date]) {
              dateCountMap[date]++;
            } else {
              dateCountMap[date] = 1;
            }
          });
          this.effectMap = [];
          var effects = [];
          effectList.forEach(function(effect) {
            if (effects[effect]) {
              effects[effect]++;
            } else {
              effects[effect] = 1;
            }
          });
          for (let effect in effects) {
            this.effectMap.push({ value: effects[effect], name: effect });
          }

          // 将统计结果转为数组形式
          this.dates = Object.keys(dateCountMap);
          this.counts = this.dates.map(function(date) {
            return dateCountMap[date];
          });
    },
    cellStyle({row, column, rowIndex, columnIndex}) {
      return "height:35px!important; border-color:#5B9BD5!important; color:#FFFFFF!important; padding:0px!important; height:40px!important";
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 1) {
        return 'warning-row';
      } else if (rowIndex % 2 === 0) {
        return 'success-row';
      }
      return '';
    },
    echartsInit() {
      // 找到容器
      let myChart = echarts.init(document.getElementById('myChart'))
      // 开始渲染
      myChart.setOption({
        // title: {text: '服务次数'},
        grid: {top: 50, x: 40},
        xAxis: {
          name: "时间",
          boundaryGap: false,
          type: 'category',
          nameLocation: 'middle', // x轴说明文字位置
          nameGap: 40, // x轴说明文字与轴线之间的距离
          data: this.dates,
          nameTextStyle: {
            fontSize: 17, // 修改为需要的字体大小
            color: "rgba(248, 247, 247, 1)"
          },
          axisLabel: {
            color: "rgba(248, 247, 247, 1)",
            fontWeight: "bold",
            fontSize: 14
          },
        },
        yAxis: {
          name: "服务次数",
          nameTextStyle: {
            fontSize: 17, // 修改为需要的字体大小
            color: "rgba(248, 247, 247, 1)"
          },
          axisLabel: {
            color: "rgba(248, 247, 247, 1)",
            fontWeight: "bold",
            fontSize: 14
          },
        },
        series: [{
          name: '日服务次数',
          type: 'line',
          data: this.counts
        }]
      })
    },
    echartsInit2() {
      let myChart = echarts.init(document.getElementById('myChart2'))
      myChart.setOption({
        title: {
          text: '爆破效果评价',
          textStyle: {
            color: '#faf7f7',
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '70%',
            data: this.effectMap
          }
        ]
      })
    },

    timeLineClick(index) {
      this.activeIndex = index   //全局变量activeIndex，设置高亮效果，字体颜色等
      let jump = document.querySelectorAll('.screen');   //右侧每一模块的类名
      let offsetTop = jump[index].offsetTop;
      this.$refs.box.scrollTop = offsetTop;  //跳到对应位置
    },
    handleScroll(e) {
      if (e.target.scrollTop > this.scrollHeight[this.scrollHeight.length - 1] - 90) {
        this.activeIndex = this.scrollHeight.length - 1
      } else {
        this.scrollHeight.map((item, index) => {
          if (e.target.scrollTop >= item) {
            this.activeIndex = index;
          }
        })
      }
    },
    back() {
      var cookies = document.cookie.split(";");
      // 遍历所有 cookie
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim(); // 去除前后空格
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

        // 如果 cookie 名称不是 'user_token'，则删除该 cookie
        if (name !== 'user_token') {
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
      }
      window.location.href = "/"
    },

    logout() {
      var cookies = document.cookie.split(";");
      console.log("cookie所有名字：" + cookies)
      // 遍历所有cookie，将它们都删除
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }
      // window.location.href =  'http://jhdxyhl.com.cn'
      loginApi.logOutSystem().then(response => {
        alert("退出系统成功!")
        window.location.href = "/login"
      })
    },


  }
};
</script>

<style scoped>
>>>.el-table .warning-row{
  background: #01366a;
}
>>>.el-table .success-row{
  background: #00122c;
}
#myChart{
  width: 600px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
  float: left;
}
#myChart2{
  width: 600px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
  float: right;
}

#lumpiness{
  height:520px;
  width:700px;
}
.title-front2{
  font-size: 15px !important;
  margin: 10px 145px;
  display: inline-block;
}
.table-style{
  margin-left:60px;
  width:300px;
  height:400px;
  display:inline-block;
  margin-top: 10px;
}
.upload_area{
  display: flex;
  align-items: center;
  margin-left: 58px;
  margin-top: 20px;
}

.upload-button {
  width: 160px;
  height: 40px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
}

.upload-button input[type="file"] {
  display: none;
}

.text-box {
  width: 900px;
  height: 40px;
  margin-left: 15px;
  border: none;
  box-sizing: border-box;
}
.title1-before{
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #000;
  position: relative;
  padding-left: 12px;
  margin-right: 16px;
}
.title1-before:before {
  position: absolute;
  width: 4px;
  height: 16px;
  background: #0052d9;
  left: 0;
  top: 26px;
  content: "";
}
.el-input__inner{
  padding:0 10px;
}
.rockspecies-thumbnail{
  display: inline-block;
  margin-left: 40px;
}
.title1-before{
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #000;
  position: relative;
  padding-left: 12px;
  margin-right: 16px;
}
.title-front2{
  font-size: 15px !important;
  margin: 10px 150px;
  display: inline-block;
}
>>>.el-timeline-item__wrapper{
  padding-left: 0px;
}
.timeline-background {
  background-image: url('assets/img/ui/Rectangle 2@2x.png');
  background-size: calc(100% ); /* 将背景图缩小到原始尺寸的 50% */
  background-position: top;
  background-repeat: no-repeat;
}

>>>.el-timeline-item {
  padding: 0px;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: space-between; /* 左右对齐 */
  text-align: justify; /* 文字左右对齐 */
  height: 45px;
  overflow-y: hidden;
  border-radius: 5px 0 0 5px;
  width: 100%;
}
.activity-content {
  text-align-last:justify;
  text-align:justify;
  width: 120px;
  align-items: center;
  height: 40px; /* 设置高度，以便垂直居中生效 */

  display: inline-block;
  vertical-align: middle;
  line-height: 1.5;
}



.timeline-text {
  color: #FFFFFF;
  font-size: 18px;
  flex: 1;
}

.active_color {
  color: #FFD700; /* 活动项的颜色，可以根据需要调整 */
}

.check_color {
  background-image: url('assets/img/ui/click.png');
  background-size: calc(100%*0.8 ); /* 将背景图缩小到原始尺寸的 50% */
  background-position: left;
  background-repeat: no-repeat;
  z-index: 1;
}

.container_layout{
  display: flex;
  height: 100vh;
  margin-top: 40px;
}
.sidebar-right {
  width: 192px; /* 右侧边栏宽度 */
  background-color:#111537;;
  padding-left: 20px;
  color: #FFFFFF;
  box-sizing: border-box;
}
.operation-wrapper {
  display: flex;
  flex-direction: column; /* 列布局 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  height: 100vh; /* 占满整个视口高度 */
  background:   #263F69;
  background-blend-mode: screen;
}

.el-main-demo {
  padding: 0px 0px !important;
//width: 100%;
  flex: 1;
  overflow-y: auto; /* 允许内容溢出时滚动 */

}


>>>.el-header {
  height: 94px;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 1700px;
  padding: 0;
  z-index: 2;
}

.top-box {
  width: 100%; /* 使用100%宽度 */
  height: 94px;
  display: flex;
  position:relative;
  background-color: #111537;
  padding-bottom: 5px;
  border-bottom: 1px solid #8caddb;
  justify-content: flex-start !important;
  z-index: 1;
  background-image: url('assets/img/ui/group_15.png');
  background-size: calc(100% ); /* 将背景图缩小到原始尺寸的 50% */
  background-position: top;
  background-repeat: no-repeat;
}

.el-menu--horizontal .el-menu--popup .el-submenu__title {
  color: #1A1D2CFF!important;

}

.active_color{
  color: #007aff !important;
}


.text {
  width: 50px;
  height: 20px;
  position: absolute;
  top: 70px;
  right: -45px;
  transform: translateX(-50%);
  background-color: white;
  color: black;
  padding: 5px 5px;
  font-weight: 600;
  border-radius: 5px;
  display: none;
  font-size: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 999;
  transition: all 0.3s;
}

.icon-container {
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  text-align: center;
  align-items: center;
}

.icon-container img {
  width: 50px;
  display: block;
  margin: 0 auto;
}

.icon-container:hover .text {
  display: block;
}

@media (max-width: 1630px) {
  .operation-wrapper {
    width: 100%; /* 当窗口宽度小于1630px时，容器宽度变为100% */
  }
}

.scroll-container{
  background-color:transparent;
  overflow: hidden;
}

.scroll-container:hover{
  overflow-y: auto;
}



/* 滚动条整体 */
.scroll-container::-webkit-scrollbar {
  height: 10px;
  width:0px;
}
/* 两个滚动条交接处 -- x轴和y轴 */
.scroll-container::-webkit-scrollbar-corner {
  background-color: transparent;
}

/* 滚动条滑块 */
.scroll-container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  background: rgba(83, 83, 83, 0.5); /* 更明显的半透明颜色 */
  height: 200px;
}
/* 滚动条滑块悬停状态 */
.scroll-container::-webkit-scrollbar-thumb:hover {
  background: rgb(99,99,99); /* 鼠标悬停时的背景颜色 */
}
/* 滚动条轨道 */
.scroll-container::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

/* 滚动条两端按钮 */
.scroll-container::-webkit-scrollbar-button {
}

/*左侧滚动条颜色样式设计*/
>>>.el-timeline-item__node{
  width: 0px;
}

>>>.el-timeline-item__tail {
  border-left: 0px solid #8caddb;
}
.icon_jhun {
  display: flex;
  position: absolute;
  top:20px;
  left: 20px;
  align-items: center;
  justify-content: center;
}
.header_title{
  display: flex;
  position: absolute;
  left: 720px;
  top: 10px;
}
.icon_title{
  width: 230px;
  background-image: url('assets/img/ui/rectangle.png');
  background-size: calc(100% ); /* 将背景图缩小到原始尺寸的 50% */
  background-position: 10px 18px;
  background-repeat: no-repeat;
}
>>>.el-scrollbar__bar.is-vertical {
  width: 7px;
}
>>>.el-scrollbar__thumb{
  background-color: rgb(24 124 183 / 70%);
}

.card8{
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
  width: 1280px;
  border-radius: 20px;
  background-color: white;
}
.font-type9{
  width: 1160px;
  font-size: 18px;
  margin-left:65px;
  padding-top: 20px;
}
.card8:hover{
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.card1{
  height: 1500px;
  width: 1600px;
  color: white;
  border-radius: 20px; /* 设置圆角为10像素 */
//background-color:  #111537;
  background-image: url('@/assets/img/ui/Rectangle 2(1).png');
  background-size: calc(100%); /* 将背景图缩小到原始尺寸的 50% */
  background-position: top;
  background-repeat: no-repeat;
  padding-top: 0px;

}

.title-front2{
  font-size: 15px !important;
  margin: 10px 145px;
  display: inline-block;
}
.table-style{
  margin-left:60px;
  width:300px;
  height:400px;
  display:inline-block;
  margin-top: 10px;
  background-color: #1F265A;
}

.upload_area{
  display: flex;
  position: relative; /* 相对定位，为子元素的绝对定位提供参考 */
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  margin-top: 10px;
}

.icon_file_upload{
  height: 40px;
  width: 160px;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 10px;
  margin-right: 10px;
  background-image: url('@/assets/img/ui/Group 359@2x.png');
  background-size: calc(100%); /* 将背景图缩小到原始尺寸的 50% */
  background-position: left;
  background-repeat: no-repeat;
}


.upload_area img {
  width: 40px;
  height: 40px;
  object-fit: scale-down;
}

.upload-button {
  font-size: 16px;
  width: 160px;
}
.upload-button input[type="file"] {
  display: none;
}

.text-box {
  width: 969px;
  height: 40px;
  margin-bottom: 7px;
  padding: 10px; /* 内边距设为10像素，确保文本不贴边 */
  border-radius: 5px; /* 添加圆角边框以使外观更加平滑 */
  box-sizing: border-box;
  background-color:#080F19;
  color: #9e9d9d;
}
.title1-before{
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: white;
  position: relative;
  padding-left: 12px;
  padding-right: 16px;
}
.title1-before:before {
  position: absolute;
  width: 4px;
  height: 16px;
  background: white;
  left: 0;
  top: 26px;
  content: "";
}
>>>.el-input__inner {
  padding:0 10px;
  background-color:#1A2332;
  border:1px solid rgba(248,248,255,0.5)

}
.rockspecies-thumbnail{
  display: inline-block;
  position: absolute;
  margin-right: 15px; /* 调整预览图片和输入框之间的间距 */
}
.rockspecies-thumbnail-image
{
  height: 40px;
  width: 40px;
  border: none;
  background-color: red;
}
.file_area{
  margin-top:8px ;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

>>>.el-table tr{
  background-color: #051534;
}
/*更改当前选中行颜色*/
>>>.el-table__body tr.current-row>td.el-table__cell {
  background-color: #0e519b;
}
/*更改鼠标悬浮时颜色*/
>>>.el-table--enable-row-hover .el-table__body tr:hover > td{
  background-color: #0e519b;
}
/*更改表格底部颜色*/
>>>.el-table--border::after, .el-table--group::after, .el-table::before {
  content: '';
  position: absolute;
  background-color:  transparent;
  z-index: 1;
}
.custom-scrollbar .el-scrollbar__wrap {
  padding: 0;
}

.input_visual{
  display: flex;
  position: relative; /* 使内部元素可以使用绝对定位 */
  margin-left: 10px;
}
.el-table--border::after, .el-table--group::after, .el-table::before{
  background-color: rgba(35,73,109,1);
}
</style>
