<template>
<client-only>
  <div style="overflow-y: hidden;overflow-x: hidden">
<el-container class="operation-wrapper_1" >
    <!-- 公共头引入 -->
    <el-header>
  <div class="top-box">
  	<el-menu
      :default-active="active"
  	  class="el-menu-demo"
  	  mode="horizontal"
  	  background-color="#1A1D2CFF"
  	  text-color="#FFFFFF"
  	  active-text-color="#00BFFF">
      <el-menu-item index="1" style="font-size: 30px;color: #FFFFFF;">上台阶楔形掏槽爆破方案设计</el-menu-item>
<!--  	  <el-menu-item index="2" v-if="isDown" @click="doDownStap()">构建下台阶楔形掏槽爆破方案</el-menu-item>-->
<!--      <el-menu-item index="2" v-if="isUp" @click="doUpStap()">构建上台阶楔形掏槽爆破方案</el-menu-item>-->
      <el-menu-item index="3" @click="openData">打开云端文件</el-menu-item>
      <el-menu-item index="4">打开本地文件</el-menu-item>
      <el-menu-item index="5">保存为云端文件</el-menu-item>
      <el-menu-item index="6">保存为本地文件</el-menu-item>
      <el-menu-item index="6" @click="createNew">创建新项目</el-menu-item>
  	</el-menu>
  	<div style="flex: 1;margin-right: 20px;">
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
    <!-- 打开云端文件 -->
    <cloudFile :dialogVisible="dialogVisible" :userId="this.loginInfo.id" @dialogVisibles="getDialogVisible" :key="timer"></cloudFile>

<el-container>

    <el-main class="el-main-demo" style="height:100%;overflow-y: hidden;overflow-x: hidden">
        <el-row :gutter="10" class="umar-t10">
          <el-col :span="3">
            <div class="uinn-a30 bg-white" style="height: calc(100vh - 94px)">
              <div class="scroll-container" style="height:100%;margin-top: 10px;">
              <el-timeline style="margin-left: 22px;margin-top: 10px;overflow-x: hidden;  background:
    linear-gradient(to bottom left, #E2E8E6 0%, #CDD3CD 100%),
    linear-gradient(to left, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.12) 100%);">
                <el-timeline-item style="font-size: 20px;padding-bottom: 14px;padding-left: -30px"
                  v-for="(activity, index) in activities"
                  :key="index"
                  :color="activity.color"
                  size="large"
                  :class="index == activeIndex ? 'check_color' : ''"
                  class="c-p"
                  @click.native="timeLineClick(index)">
                  <span :class="index == activeIndex ? 'active_color' : ''" style="color: #FFFFFF;">{{activity.content}}</span>
                </el-timeline-item>
              </el-timeline>
              </div>
            </div>
          </el-col>
        <el-col :span="21">
        <div ref="box" @scroll="handleScroll($event)" class="scroll-container" style="height: calc(100vh - 94px);overflow-x: hidden;overflow-y:scroll;padding-right: 85px;">
<!--          border: 1px solid #e4e7ed;-->
<!--         <div class="screen_1" id="rock_species" style="margin-top:21px;" >-->
<!--           <rockspecies></rockspecies>-->
<!--         </div>-->
<!--         <div class="screen_1" id="rock_strength" style="margin-top: 30px;">-->
<!--           <rockstrength></rockstrength>-->
<!--         </div>-->
<!--         <div class="screen_1" id="rock_structure" style="margin-top: 30px">-->
<!--           <rockstructure></rockstructure>-->
<!--         </div>-->
<!--          <div class="screen_1" id="structure_face" style="margin-top: 30px">-->
<!--           <structureface></structureface>-->
<!--         </div>-->
<!--          <div class="screen_1" id="page_five" style="margin-top: 30px" >-->
<!--            <pagefive ></pagefive>-->
<!--          </div>-->
<!--          <div class="screen_1" id="page_six" style="margin-top: 30px">-->
<!--            <pagesix></pagesix>-->
<!--          </div>-->
<!--          <div class="screen_1" id="page_seven" style="margin-top: 30px">-->
<!--            <pageseven></pageseven>-->
<!--          </div>-->
<!--          <div class="screen_1" id="page_eight" style="margin-top: 30px">-->
<!--            <pageeight></pageeight>-->
<!--          </div>-->
          <div class="screen_1" v-if="this.haveNine" v-show="this.haveNineShow" id="page_nine" style="margin-top: 30px">
            <pagenine></pagenine>
          </div>
          <div class="screen_1" id="page_ten" style="margin-top: 30px">
            <pageten></pageten>
          </div>
          <div class="screen_1" id="page_eleven" style="margin-top: 30px">
            <pageeleven></pageeleven>
          </div>
          <div class="screen_1" id="page_twelve" style="margin-top: 30px;">
            <pagetwelve></pagetwelve>
          </div>
          <div class="screen_1" id="page_thirteen" style="margin-top: 30px;">
            <pagethirteen></pagethirteen>
          </div>
          <div class="screen_1" id="page_seventeen" style="margin-top: 30px;">
            <pageseventeen></pageseventeen>
          </div>
        </div>
      </el-col>
        </el-row>
    </el-main>
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
import {eventBus} from "../../plugins/nuxt-elementui";
import calculateApi from '@/api/calculate.js'
import loginApi from '@/api/login.js'

import rockspecies from ".//rockspecies.vue";
import rockstructure from ".//rockstructure.vue";
import structureface from ".//structureface.vue";
import Rockstrength from ".//rockstrength.vue";
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
import pageseventeen from "@/pages/stjdl/pageseventeen.vue";
import cloudFile from '../utilPage/cloudFile.vue'
import getProject from "@/api/getProject";
import outline from "@/api/outline";
export default {
    name:'stjdl_drop',
    layout:'default2',
    components:{
    itemData:null,
    pageseventeen,
    Rockstrength,
    rockspecies,
    rockstructure,
    structureface,
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
    cloudFile,
  },
  data(){
    return{
      outlineData:[],
      modifiedOutlineData:[],
      saveProjectMessage:{},
      stepLine1:'',
      stepLine2:'',
      timer: '',
      showText: false,
      activeIndex: 0,
      activities: [
        // {content: '岩石种类',id: 'rock_species'},
        // {content: '岩石强度',id: 'rock_strength'},
        // {content: '岩体结构',id: 'rock_structure'},
        // {content: '岩体结构面',id: 'structure_face'},
        // {content: '隧道地应力',id: 'page_five'},
        // {content: '岩体可爆性',id: 'page_six'},
        // {content: '钻孔与炸药',id: 'page_seven'},
        // {content: '开挖轮廓线',id: 'page_eight'},
        {content: '掏槽孔布置',id: 'page_nine'},
        {content: '周边孔布置',id: 'page_ten'},
        {content: '辅助孔布置',id: 'page_eleven'},
        {content: '装药量计算',id: 'page_twelve'},
        {content: '起爆网络设计',id: 'page_thirteen'},
        {content: '评价与优化',id: 'page_seventeen'},
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
      haveNine:true,
      haveNineShow:true,

      //上台阶内容
      upDatas:{},
      isDown:true,
      isUp:false,
      dialogVisible: false,
    }
  },
  methods:{
    createNew(){
      if(cookie.get("projectId")){
        cookie.remove("projectId");
        cookie.remove("downProjectId")
        cookie.remove("upProjectId")
        cookie.remove('upData');
        cookie.remove('upData2')
        this.$router.replace({ path:'/method2' })
      }
    },
    timeLineClick(index){
      this.activeIndex = index   //全局变量activeIndex，设置高亮效果，字体颜色等
      let jump = document.querySelectorAll('.screen_1');   //右侧每一模块的类名
      let offsetTop = jump[index].offsetTop;
      this.$refs.box.scrollTop = offsetTop;  //跳到对应位置
    },
    getScrollHeight() {
      this.scrollHeight = []
      this.activities.map(item => {
        const element = document.getElementById(item.id);
        if (element) {
          this.scrollHeight.push(element.offsetTop-10);
        }
      })
    },
    handleScroll(e){
      if(e.target.scrollTop > this.scrollHeight[this.scrollHeight.length-1]-90){
        this.activeIndex = this.scrollHeight.length -1
      }else{
        this.scrollHeight.map((item,index)=>{
          if(e.target.scrollTop >= item){
            this.activeIndex = index;
          }
        })
      }
    },
    showInfo(){
      var jsonStr = cookie.get("user_info");
      if(jsonStr){
        this.loginInfo = JSON.parse(jsonStr)
        console.log(this.loginInfo)
      }
    },
    back(){
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
    logout(){
      var cookies = document.cookie.split(";");
      console.log("cookie所有名字："+cookies)
      // 遍历所有cookie，将它们都删除
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }
      window.location.href = 'http://www.aiblast.cn'
    },

    //打开“打开云端文件”弹出框
    openData(){
      this.dialogVisible = true;
    },
    //监听关闭“打开云端文件”弹出框
    getDialogVisible(val){
      this.dialogVisible = val;
    },

    isUpInfo(){
      this.dialogFormVisible=false;
    },
    //切换下台阶数据
    doDownStap(){
      let upProjectId = cookie.get("projectId")
      // let upProjectId = ""
      // cookie.set("downProjectId","1707958623216939010")
      if(upProjectId==null || upProjectId==''){
        alert("请先保存上台阶方案数据！")
      }else if(!cookie.get("downProjectId")){
        calculateApi.upDownProject(upProjectId).then(response => {
          this.upDatas=response.data.data
          console.log(JSON.stringify(this.upDatas))
          cookie.set("upProjectId",upProjectId)
          cookie.set("projectId",response.data.data.id)
          cookie.set('upData', JSON.stringify(this.upDatas));
          this.$router.go(0);
        })
      }else if(cookie.get("downProjectId")){

        cookie.set('upData',cookie.get('upData2'))

        cookie.set("upProjectId",upProjectId)
        cookie.set("projectId",cookie.get("downProjectId"))
        this.$router.go(0)
      }
    },
    //切换上台阶模式
    doUpStap(){
      cookie.set("downProjectId",cookie.get("projectId"))
      cookie.set("projectId",cookie.get("upProjectId"))
      cookie.remove("upProjectId")

      if(!cookie.get('upData2'))
      cookie.set('upData2',cookie.get('upData'))
      cookie.remove('upData')

      this.$router.go(0)
    }
  },
  created() {
    // cookie.set("projectId","1707570845434064898")
    //云端文件导入回显
    eventBus.$on('cloudFiles',(data)=>{
      this.upDatas=data;
      if(this.upDatas.upProjectId!=null){
        cookie.set("upProjectId",data.upProjectId)
        // cookie.set("projectId",data.projectId)
        this.isDown=false;this.isUp=true;
        this.haveNineShow=false;
      }
      else{
        cookie.remove("upProjectId")
        this.isDown=true;this.isUp=false;
        this.haveNineShow=true;
      }
      cookie.set('upData', JSON.stringify(this.upDatas));
    });

    if (cookie.get('user_token')) {
      loginApi.getUserInfo().then(response => {
        this.loginInfo = response.data.data
        console.log("loginInfo"+JSON.stringify(this.loginInfo))
      })
    }

    let projectId =cookie.get("upProjectId")
    if(!cookie.get("upProjectId")){
      if(projectId!=null || projectId!='' || typeof(projectId)!='undefined'){
      this.isDown=true;this.isUp=false;
      }
      this.haveNine=true;
    }else{
      this.isDown=false;this.isUp=true;
      this.haveNine=false;
    }
  },
  mounted(){
    let projectId;
    cookie.get("mdProjectId") ? projectId = cookie.get("mdProjectId") : projectId = cookie.get("dwProjectId");//检测从哪里跳转的，优先考虑上台阶
    console.log(projectId);

    if (cookie.get("upProjectId"))
    {

      console.log("upProjectId: " + cookie.get("upProjectId"));
    }
    else{
      getProject.getProject(projectId).then(response=>{
        this.saveProjectMessage = response.data.data;
        this.saveProjectMessage.excavationCode = "001003"
        this.saveProjectMessage.id = '';

        calculateApi.saveProject(this.saveProjectMessage).then(response => {
          if (response.data.code == 1) {
            console.log(response.data.data);

            cookie.set("upProjectId", response.data.data.id);
            this.projectId = cookie.get("upProjectId");
            // 调用后端 API 获取轮廓线信息
            outline.getOutlines(projectId).then(response => {
              // 获取后端返回的轮廓线信息
              this.outlineData = response.data.data;
              console.log(this.outlineData);

              // 替换轮廓线信息中的项目ID
              this.modifiedOutlineData = this.outlineData.map(item => {
                // 假设轮廓线信息中有一个名为 projectId 的属性，将其替换为新的项目ID
                // 通过解构赋值排除id字段，然后添加新的projectId字段
                const { id, ...rest } = item;
                return { ...rest, projectId: this.projectId };
              });

              console.log(this.modifiedOutlineData);

              // 调用后端 API 保存替换后的轮廓线信息
              outline.saveOutline(this.modifiedOutlineData).then(response => {
                this.itemData = response.data;
                console.log("responseData:"+JSON.stringify(response.data.data))
                // 处理保存结果，例如更新前端界面或显示消息
                console.log("Outline data saved successfully!");
              }).catch(error => {
                // 处理保存失败的情况
                console.error("Failed to save outline data:", error);
              });
            }).catch(error => {
              // 处理获取轮廓线信息失败的情况
              console.error("Failed to fetch outline data:", error);
            });
            console.log("upProjectId: " + this.projectId);

          }
        })
      })
    }

    this.$nextTick(() => {
      this.getScrollHeight();
    })
  },
};
</script>

<style scoped>
.operation-wrapper {
  width: 100% !important;
/*  设置最高优先级*/
}
.operation-wrapper_1 {
  display: flex;
  flex-direction: column; /* 列布局 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  height: 100vh; /* 占满整个视口高度 */
  background: #1A1D2CFF;
  background-blend-mode: screen;
}

.el-main-demo{
  padding: 0px 16px !important;
  width: 100%;
  overflow-y: auto; /* 允许内容溢出时滚动 */
}

.el-header {
  height: 61px;
  margin-left: 28px;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 1680px;
}

 .top-box{
   width: 100%; /* 使用100%宽度 */
   height: 60px;
   display: flex;
   background-color: #1A1D2CFF;
   border-bottom: 1px solid #eeeeee;
   justify-content: flex-start !important;
  }
  .top-box-i{
  	width: 32px;
    height: 32px;
    font-size: 10px;
    margin: 16px 10px 0 15px;
    color: #000000;
  }
  .el-menu--horizontal .el-menu--popup .el-submenu__title{
    color: #FFFFFF!important;
  }
.active_color{
  background-image: url('@/assets/img/menuBc.png');
  background-size: auto;
  height: 45px!important;
  line-height: 40px;
  background-repeat: no-repeat;
  color:#79FDFF!important;
}

.check_color{
  color: #3fa3ff;
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
  display: inline-block;
  cursor: pointer;
  text-align: center; /* 居中对齐图标和文本 */
}

.icon-container img {
  width: 50px; /* 根据你的图标尺寸调整 */
  display: block;
  margin: 0 auto; /* 图标水平居中 */
}
.icon-container:hover .text {
  display: block;
}
.screen_1 {
  width: 1330px;
}
.screen_1:hover {
  /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;*/
}

@media (max-width: 1630px) {
  .operation-wrapper {
    width: 100%; /* 当窗口宽度小于1630px时，容器宽度变为100% */
  }
}


.scroll-container{
  background-color:#1A1D2CFF;
  overflow: hidden;
}

.scroll-container:hover{
  overflow-y: auto;
}



/* 滚动条整体 */
.scroll-container::-webkit-scrollbar {
  height: 6px;
  width:6px;
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

>>>.el-timeline-item__node{
  width: 0px;
}

</style>
