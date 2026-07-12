<template>
  <client-only>
    <div>
      <el-container class="operation-wrapper" >
        <!--  width:1707px-->

        <!-- 公共头引入 -->
        <el-header>
          <div class="top-box">
            <div class="icon_jhun">
              <img :src="require('assets/img/ui/picture_01.png')" style="width: 40px">
              <img :src="require('assets/img/ui/picture_02.png')" style="width: 40px;margin-left: 10px">
            </div>
            <button class="nav-home-button" type="button" @click="back" title="返回首页">
              <img :src="require('assets/img/ui/Group 206.png')" alt="返回首页">
              <span>返回首页</span>
            </button>
            <div class="header_title">
              <span style="color: #FFFFFF;font-size: 35px;font-weight: 700">全断面+楔形掏槽</span>
              <div class="header_sub_info">
                <span v-if="project1Info.tunnelFullName" class="header_time">隧道工作面：{{project1Info.tunnelFullName}}</span>
              </div>
              <div class="header_sub_info">
                <span v-if="project1Info.standardMileage" class="header_time">里程号：{{project1Info.standardMileage}}</span>
                <span v-if="project1Info.time" class="header_time">智能方案设计时间：{{project1Info.time}}</span>
              </div>
            </div>
            <div class="left_project">
              <div class="bg_project">
                <span class="bg_text" @click="openData">打开云端文件</span>
              </div>
              <div class="bg_project" style="margin-left: 20px">
                <span class="bg_text" @click="openLog">打开服务日志</span>
              </div>
            </div>
            <div class="right_project">
              <div class="bgr_project">
                <span class="bg_text">保存为云端文件</span>
              </div>
              <div class="bgr_project" style="margin-left: 20px">
                <span class="bg_text">保存为本地文件</span>
              </div>
              <div class="bgr_project" style="margin-left: 20px">
                <span class="bg_text">创建新项目</span>
              </div>
            </div>
            <div style="margin-right: 20px;flex: 1;padding-right: 30px">
              <div style="display: flex;float: right;">
                <img :src="require('assets/img/ui/Group 192.png')"   style="margin-top: 15px;width: 32px;">
                <span style="max-width: 100px;overflow: hidden;text-overflow: ellipsis;line-height: 60px;color: #FFFFFF;margin: 0 20px 0 0;">{{loginInfo.username}}</span>
                <div class="icon-container" @mouseover="showText = true" @mouseout="showText = false">
                  <img
                    class="icon"
                    :src="require('assets/img/ui/Group 207.png')"
                    alt="图标"
                    @click="logout"
                    style="color: #000000;padding-left:20px;margin-top: 15px;width: 32px;"/>
                  <div v-if="showText" class="text">退出系统</div>
                </div>
              </div>
            </div>
          </div>
        </el-header>
        <!-- /公共头引入 -->
        <!-- 打开云端文件 -->
        <cloudFile :dialogVisible="dialogVisible" :userId="this.loginInfo.id" @dialogVisibles="getDialogVisible" :key="timer"></cloudFile>
        <logFile :dialogVisible="dialogVisible2" :userId="this.loginInfo.id" @dialogVisibles="getDialogVisible2" :key="timer"></logFile>

        <el-container class="container_layout">
          <el-main class="el-main-demo" style="height:100%;overflow-y: hidden">
            <el-row :gutter="10" class="umar-t10">
              <el-col :span="3" style="padding-left: 0px;padding-right: 0px">
                <div class="uinn-a30 bg-white" style="height: calc(100vh - 94px);">
                  <div style="height:100%;margin-top: -10px;background-color: #011635" >
                    <el-timeline class="timeline-background" style="margin-top: 10px;padding-top:30px;overflow-x: hidden;padding-bottom: 30px">
                      <el-timeline-item style="font-size: 20px;padding-left: -30px"
                                        v-for="(activity, index) in activities"
                                        :key="index"
                                        :color="activity.color"
                                        :type="activity.type"
                                        size="large"
                                        :class="index == activeIndex ? 'check_color' : ''"
                                        class="c-p"
                                        @click.native="timeLineClick(index)"
                      >
                        <div style="display: flex; align-items: center;object-fit: scale-down;">
                          <img :src="require('@/assets/img/icon/'+activity.icon)" alt="icon" style="width: 20px; height: 20px;margin-top:10px;padding-left: 12px; padding-right: 19px;" />
                          <span :class="index == activeIndex ? 'active_color' : ''" class="activity-content" style="color: #FFFFFF;margin-top: 20px;margin-left: -7px">{{activity.content}}</span>
                        </div>
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                </div>
              </el-col>
              <el-col :span="21" style="padding-left: 4px;">
                <div  ref="box"
                      @scroll="handleScroll($event)"
                      class="scroll-container"
                      style="height: calc(100vh - 94px);
             overflow-y: scroll;overflow-x: hidden;padding-right: 20px;padding-left: 20px">

                  <div class="screen" id="rock_species" style="border-top:0;margin-top: 10.5px" >
                    <rockspecies></rockspecies>
                  </div>
                  <div class="screen" id="rock_strength" style="margin-top: 30px;">
                    <rockstrength></rockstrength>
                  </div>
                  <div class="screen" id="rock_structure" style="margin-top: 30px">
                    <rockstructure></rockstructure>
                  </div>
                  <div class="screen" id="structure_face" style="margin-top: 30px">
                    <structureface></structureface>
                  </div>
                  <div class="screen" id="page_five" style="margin-top: 30px" >
                    <pagefive ></pagefive>
                  </div>
                  <div class="screen" id="page_six" style="margin-top: 30px">
                    <pagesix></pagesix>
                  </div>
                  <div class="screen" id="page_seven" style="margin-top: 30px">
                    <pageseven></pageseven>
                  </div>
                  <div class="screen" id="page_eight" style="margin-top: 30px">
                    <pageeight></pageeight>
                  </div>
                  <div class="screen" id="page_nine" style="margin-top: 30px">
                    <pagenine></pagenine>
                  </div>
                  <div class="screen" id="page_ten" style="height:auto;margin-top: 30px">
                    <pageten></pageten>
                  </div>
                  <div class="screen" id="page_eleven" style="margin-top: 30px">
                    <pageeleven></pageeleven>
                  </div>
                  <div class="screen" id="page_twelve" style="margin-top: 30px;">
                    <pagetwelve></pagetwelve>
                  </div>
                  <div class="screen" id="page_thirteen" style="margin-top: 30px;">
                    <pagethirteen></pagethirteen>
                  </div>
                  <div class="screen" id="page_fourteen" style="margin-top: 30px;">
                    <pagefourteen></pagefourteen>
                  </div>
                  <div class="screen" id="page_fifteen" style="margin-top: 30px;">
                    <pagefifteen></pagefifteen>
                  </div>
                  <div class="screen" id="page_sixteen" style="margin-top: 30px;">
                    <pagesixteen></pagesixteen>
                  </div>
                  <div class="screen" id="page_seventeen" style="margin-top: 30px;">
                    <pageseventeen></pageseventeen>
                  </div>
                </div>
              </el-col>
              <!-- <nuxt/> -->
            </el-row>
          </el-main>
          <div class="sidebar-right">
            <div  class="uinn-a30 bg-white"  style="height: calc(100vh - 94px);">
              <div class="timeline-background" style="height: 765px;padding-top: 30px;padding-bottom: 30px;">
                <!-- <span style="font-size: 18px;margin-left: 20px">设计历史记录</span> -->
                <br>
                <template>
                  <div class="project-history">

                   <!-- <ul>
                      <li v-for="(project, index) in projects" :key="project.id" class="project-item" style="margin-top: 10px">
                        <span style="color: #187cb7;margin-right: 20px">{{ project.id }}</span>
                        <button @click="importProject(project.id)" style="margin-right: 20px">导入</button>
                        <button @click="deleteProject(index)" style="margin-right: 20px">X</button>
                      </li>
                    </ul>  -->
                  </div>
                </template>
              </div>
            </div>
          </div>

        </el-container>

      </el-container>
    </div>
  </client-only>
</template>
<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import "~/assets/css/pages-weixinpay.css"
import cookie from 'js-cookie'
import loginApi from '@/api/login.js'
import rockspecies from ".//rockspecies.vue";
import rockstructure from ".//rockstructure.vue";
import structureface from ".//structureface.vue";
import pagefivesixseven from ".//pageseven.vue";
import Rockstrength from ".//rockstrength.vue";
import Pagenine from ".//pagenine.vue";
import PageEight from ".//pageeight.vue";
import pageeleven from ".//pageeleven.vue";
import pageeight from ".//pageeight.vue";
import pageten from ".//pageten.vue";
import pagenine from ".//pagenine.vue";
import pagefive from ".//pagefive.vue";
import pagesix from ".//pagesix.vue";
import pageseven from ".//pageseven.vue";
import pagetwelve from ".//pagetwelve.vue";
import pagethirteen from './/pagethirteen.vue'
import pagefourteen from './/pagefourteen.vue'
import pagefifteen from './/pagefifteen.vue'
import pagesixteen from './/pagesixteen.vue'
import pageseventeen from './/pageseventeen.vue'
import cloudFile from '../utilPage/cloudFile.vue'
import connAnoSerApi from "@/api/connAnoSer";
import logFile from "@/pages/utilPage/logFile/logFile.vue";
import teamApi from "@/api/team";
import {eventBus} from "../../plugins/nuxt-elementui";
export default {
  layout:'default',
  components:{
    PageEight,
    Pagenine,
    Rockstrength,
    rockspecies,
    rockstructure,
    structureface,
    pagefivesixseven,
    pagenine,
    pageeight,
    pageten,
    pageeleven,
    pagefive,
    pagesix,
    pageseven,
    pagetwelve,
    pagethirteen,
    pagefourteen,
    pagefifteen,
    pagesixteen,
    pageseventeen,
    cloudFile,
    logFile,
  },
  data(){
    return{
      timer: '',
      showText:false,
      activeIndex: 0,
      activities: [
        {content: '岩石种类',id: 'rock_species',icon:'rockspecies.png'},
        {content: '岩石强度',id: 'rock_strength',icon: 'rockstrength.png'},
        {content: '岩体结构',id: 'rock_structure',icon: 'rockstructure.png'},
        {content: '岩体结构面',id: 'structure_face',icon: 'four.png'},
        {content: '隧道地应力',id: 'page_five',icon: 'five.png'},
        {content: '岩体可爆性',id: 'page_six',icon: 'six.png'},
        {content: '钻孔与炸药',id: 'page_seven',icon: 'seven.png'},
        {content: '开挖轮廓线',id: 'page_eight',icon: 'eight.png'},
        {content: '掏槽孔设置',id: 'page_nine',icon: 'nine.png'},
        {content: '周边孔设置',id: 'page_ten',icon: 'ten.png'},
        {content: '炮孔布置',id: 'page_eleven',icon: 'eleven.png'},
        {content: '装药量计算',id: 'page_twelve',icon: 'twelve.png'},
        {content: '起爆网络设计',id: 'page_thirteen',icon: 'thirteen.png'},
        {content: '爆破效果预测',id: 'page_fourteen',icon: 'fourteen.png'},
        {content: '爆破成本计算',id: 'page_fifteen',icon: 'fiveteen.png'},
        {content: '爆破方案导出',id: 'page_sixteen',icon: 'sixteen.png'},
        {content: '爆破方案优化',id: 'page_seventeen',icon: 'seventeen.png'},
      ],
      scrollHeight: [],
      token: '',
      active:'',
      loginInfo: {
        id: '',
        // avatar: '',
        phone: '',
        username: '',
      },
      project1Info:{},
      dialogVisible: false,
      dialogVisible2: false,
      projects: [],
    }
  },
  // created(){
  //   this.showInfo();
  //   if (cookie.get('user_token')) {
  //     loginApi.getUserInfo().then(response => {
  //       this.loginInfo = response.data.data
  //       console.log("loginInfo"+JSON.stringify(this.loginInfo))
  //     })
  //   }
  // },
  methods: {
    importProject(id) {
      // 在这里添加导入项目的逻辑
      console.log(`导入项目 ${id}`);
    },
    deleteProject(index) {
      this.projects.splice(index, 1);
    },
    fetchProjects() {
      // 在这里添加获取项目列表的逻辑
      this.projects = [
        { id: '001' },
        { id: '002' },
        { id: '003' }
      ];
    },
    // resetSize() {
    //   const xScale = window.screen.width / 1707;
    //   const yScale = window.screen.height / 1067;
    //   document.body.style.transformOrigin = 'left top';
    //   document.body.style.transform = `scaleX(${xScale}) scaleY(${yScale})`;
    //   document.body.style.webkitTransform = `scaleX(${xScale}) scaleY(${yScale})`;
    //   document.body.style.msTransform = `scaleX(${xScale}) scaleY(${yScale})`;
    //   document.body.style.oTransform = `scaleX(${xScale}) scaleY(${yScale})`;
    //   document.body.style.mozTransform = `scaleX(${xScale}) scaleY(${yScale})`;
    // },

    createNew(){
      if(cookie.get("projectId")){
        cookie.remove("projectId")
        this.$router.replace({ path:'/method1' })
      }
    },
    timeLineClick(index) {
      this.activeIndex = index   //全局变量activeIndex，设置高亮效果，字体颜色等
      let jump = document.querySelectorAll('.screen');   //右侧每一模块的类名
      let offsetTop = jump[index].offsetTop;
      this.$refs.box.scrollTop = offsetTop;  //跳到对应位置
    },
    scrollToBlastLayoutCanvas() {
      this.timeLineClick(10);
      this.$nextTick(() => {
        setTimeout(() => {
          const box = this.$refs.box;
          const target = document.getElementById('page_eleven_draw_area');
          if(!box || !target) return;
          const boxTop = box.getBoundingClientRect().top;
          const targetTop = target.getBoundingClientRect().top;
          box.scrollTop += targetTop - boxTop - 20;
        },300);
      });
    },
    handleAutoMode(data) {
      if(data.autoStep == 10){
        this.scrollToBlastLayoutCanvas();
      }
    },
    handleCloudFileHolesRendered() {
      if(sessionStorage.getItem('pendingCloudScrollToCanvas') == '1'){
        sessionStorage.removeItem('pendingCloudScrollToCanvas');
        this.scrollToBlastLayoutCanvas();
      }
    },
    getScrollHeight() {
      this.scrollHeight = []
      this.activities.map(item => {
        const element = document.getElementById(item.id);
        if (element) {
          this.scrollHeight.push(element.offsetTop - 10);
        }
      })
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
    showInfo() {
      var jsonStr = cookie.get("user_info");
      if (jsonStr) {
        this.loginInfo = JSON.parse(jsonStr)
        console.log(this.loginInfo)
      }
    },
    fetchProject1Info() {
      const mileageId = cookie.get("mileageId");
      if (mileageId) {
        teamApi.getDataFromP1(mileageId).then(response => {
          if (response.data.code == 1) {
            this.project1Info = response.data.data;
          }
        });
      }
    },
    back(){
      this.$router.push({ path: '/' })
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
        window.location.href =  "/login"
      })
    },
    //打开“打开云端文件”弹出框
    openData(){
      this.dialogVisible = true;
    },
    openLog(){
      this.dialogVisible2 = true;
    },
    //监听关闭“打开云端文件”弹出框
    getDialogVisible(val){
      this.dialogVisible = val;
    },
    getDialogVisible2(val){
      this.dialogVisible2 = val;
    },
  },
  mounted(){
    eventBus.$on('autoMode', this.handleAutoMode);
    eventBus.$on('cloudFileHolesRendered', this.handleCloudFileHolesRendered);
    this.showInfo();
    this.fetchProjects();
    this.fetchProject1Info();
    this.$nextTick(() => {
      this.getScrollHeight();
    })
    // this.resetSize();
    // window.addEventListener('resize', this.resetSize);
  },
  beforeDestroy() {
    eventBus.$off('autoMode', this.handleAutoMode);
    eventBus.$off('cloudFileHolesRendered', this.handleCloudFileHolesRendered);
  },
};
</script>

<style scoped>
.project-history {
  padding: 10px;
  background-color: #111537;
}
::v-deep .el-timeline-item__wrapper{
  padding-left: 0px;
}
.timeline-background {
  background-image: url('@/assets/img/ui/Rectangle 2@2x.png');
  background-size: 100% 100%; /* 使背景图像宽度和高度都为容器的100% */
  background-position: top center; /* 确保背景图像从顶部开始 */
  background-attachment: local; /* 背景图像与元素的滚动一致 */
  padding-top: 0px;
}

::v-deep .el-timeline-item {
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
html,
body {
  margin: 0;
  padding: 0;
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
  width: 1710px;

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
  background:#263F69;
  background-blend-mode: screen;
}

.el-main-demo {
  padding: 0px 5px !important;
  flex: 1;
  overflow-y: auto; /* 允许内容溢出时滚动 */

}


::v-deep .el-header {
  height: 94px;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 1710px;
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

@media (max-width: 1707px) {
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

/*左侧滚动条颜色样式设计*/
::v-deep .el-timeline-item__node{
  width: 0px;
}

::v-deep .el-timeline-item__tail {
  border-left: 0px solid #8caddb;
}
.icon_jhun {
  display: flex;
  position: absolute;
  top:15px;
  left: 40px;
  align-items: center;
  justify-content: center;
}
.nav-home-button {
  position: absolute;
  top: 14px;
  left: 155px;
  height: 44px;
  min-width: 118px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid rgba(67, 198, 255, 0.8);
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(25, 114, 182, 0.92), rgba(5, 44, 93, 0.95));
  box-shadow: 0 0 12px rgba(30, 174, 255, 0.55), inset 0 0 8px rgba(125, 220, 255, 0.32);
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  z-index: 3;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}
.nav-home-button img {
  width: 26px;
  height: 26px;
  display: block;
}
.nav-home-button:hover {
  transform: translateY(-1px);
  border-color: #78dcff;
  box-shadow: 0 0 18px rgba(54, 195, 255, 0.75), inset 0 0 10px rgba(125, 220, 255, 0.42);
}
.nav-home-button:active {
  transform: translateY(0);
}
.header_title{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 12px;
  white-space: nowrap;
}
.header_sub_info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 5px;
}
.header_time {
  color: #b8d4f0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: rgba(255,255,255,0.06);
  padding: 2px 12px;
  border-radius: 10px;
  backdrop-filter: blur(2px);
}
.left_project {
  display: flex;
  position: absolute;
  top:55%;
  left: 290px;

}
.right_project {
  display: flex;
  position: absolute;
  top:55%;
  right: 119px;

}
.bg_project{
  background-image: url('@/assets/img/ui/Group 348.png');
  background-size: 100% 100%; /* 使背景图像宽度和高度都为容器的100% */
  background-position: center; /* 确保背景图像从顶部开始 */
  padding-top: 10px;
  padding-left: 29px;
  padding-right: 20px;
}
.bgr_project{
  background-image: url('@/assets/img/ui/Group 350.png');
  background-size: 100% 100%; /* 使背景图像宽度和高度都为容器的100% */
  background-position: center; /* 确保背景图像从顶部开始 */
  padding-top: 10px;
  padding-left: 29px;
  padding-right: 20px;
}
.bg_text{
  font-size: 15px;
  color: #FFFFFF;
  height:27px;
  line-height: 14px;
}
</style>
