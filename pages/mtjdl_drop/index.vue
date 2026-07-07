<template>
<client-only>
  <div style="overflow-y: hidden;overflow-x: hidden">
<el-container class="operation-wrapper_1" >
    <!-- 公共头引入 -->
    <el-header>
  <div class="top-box">
    <div class="icon_jhun">
      <img :src="require('assets/img/ui/picture_01.png')" style="width: 40px">
      <img :src="require('assets/img/ui/picture_02.png')" style="width: 40px;margin-left: 10px">
    </div>
    <div class="header_title"><span style="color: #FFFFFF;font-size: 35px">中台阶+楔形掏槽</span></div>
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
        <span class="bg_text" @click="createNew">创建新项目</span>
      </div>
    </div>
    <div style="margin-right: 20px;flex: 1;padding-right: 30px">
      <div style="display: flex;float: right;">
        <img :src="require('assets/img/ui/Group 192.png')"   style="margin-top: 15px;width: 32px;">
<!--        <span style="max-width: 100px;overflow: hidden;text-overflow: ellipsis;line-height: 60px;color: #FFFFFF;margin: 0 20px 0 0;">{{loginInfo.username}}</span>-->
        <div class="icon-container" @mouseover="showText = true" @mouseout="showText = false">
          <img
            class="icon"
            :src="require('assets/img/ui/Group 206.png')"
            alt="图标"
            @click="back"
            style="color: #000000;margin-top: 15px;width: 32px;"/>
          <div v-if="showText" class="text">返回首页</div>
        </div>
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
<!--    <cloudFile :dialogVisible="dialogVisible" :userId="this.loginInfo.id" @dialogVisibles="getDialogVisible" :key="timer"></cloudFile>-->

<el-container class="container_layout">
    <el-main class="el-main-demo" style="height:100%;overflow-y: hidden;">
      <el-row :gutter="10" class="umar-t10">
        <el-col :span="3" style="padding-left: 0px;padding-right: 0px">
          <div class="uinn-a30 bg-white" style="height: calc(100vh - 94px)">
            <div style="height:100%;margin-top: -10px;background-color: #011635" >
              <el-timeline class="timeline-background" style="margin-top: 10px;padding-top:30px;overflow-x: hidden;padding-bottom: 30px;padding-left: 13px;">
                <el-timeline-item style="font-size: 20px;padding-left: -30px"
                                  v-for="(activity, index) in activities"
                                  :key="index"
                                  :color="activity.color"
                                  size="large"
                                  :class="index == activeIndex ? 'check_color' : ''"
                                  class="c-p"
                                  @click.native="timeLineClick(index)"
                >
                  <div style="display: flex; align-items: center;object-fit: scale-down;">
                    <img :src="require('@/assets/img/icon/'+activity.icon)" alt="icon" style="width: 20px; height: 20px;margin-top:30px;padding-left: 11px; padding-right: 13px;" />
                    <span :class="index == activeIndex ? 'active_color' : ''" class="activity-content" style="color: #FFFFFF;margin-top: 40px;margin-left: -7px">{{activity.content}}</span>
                  </div>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </el-col>
        <el-col :span="21">
        <div ref="box" @scroll="handleScroll($event)" class="scroll-container" style="height: calc(100vh - 94px);
             overflow-y: scroll;overflow-x: hidden;padding-right: 20px;padding-left: 20px">
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
            <div class="screen_1" id="page_thirteen" style="margin-top: 30px;">
              <pagesixteen></pagesixteen>
            </div>
            <div class="screen_1" id="page_seventeen" style="margin-top: 30px;">
              <pageseventeen></pageseventeen>
            </div>
            <div class="screen_1" id="page_eighteen" style="margin-top: 30px;">
              <mode></mode>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
   <div class="sidebar-right">
    <div  class="uinn-a30 bg-white"  style="height: calc(100vh - 94px);">
      <div class="timeline-background" style="height: 765px;padding-top: 30px;padding-bottom: 30px;">
        <span style="font-size: 18px;margin-left: 11%;">设计历史记录</span>
        <br>
        <template>
          <div class="project-history"  @scroll="onScroll" ref="projectHistory">
            <ul>
              <li v-for="(project, index) in projects" :key="project.id" class="project-item" style="margin-top: 10px">
                <span style="color: #187cb7;margin-right: 15px">{{ project.id }}</span>
                <button @click="importProject(project.id)"  class="text-button"   style="background: none; border: none; color: white; cursor: pointer; margin-right: 15px;" >导入</button>
                <button @click="deleteProject(index,project.id)" class="text-button"  style="background: none; border: none; color: white; cursor: pointer;">X</button>
              </li>
            </ul>
            <div v-if="loading" class="loading">加载中...</div>
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
import {eventBus} from "../../plugins/nuxt-elementui";
import calculateApi from '@/api/calculate.js'
import loginApi from '@/api/login.js'

import rockspecies from ".//rockspecies.vue";
import rockstructure from ".//rockstructure.vue";
import structureface from ".//structureface.vue";
import Rockstrength from ".//rockstrength.vue";
import pageeleven from ".//pageeleven.vue";
import pageeight from ".//pageeight.vue";
import pageten from "@/pages/mtjdl_drop/pageten.vue";
import pagenine from "@/pages/mtjdl_drop/pagenine.vue";
import pagefive from ".//pagefive.vue";
import pagesix from ".//pagesix.vue";
import pageseven from ".//pageseven.vue";
import pagetwelve from ".//pagetwelve.vue";
import pagethirteen from './/pagethirteen.vue'
import pagefourteen from './/pagefourteen.vue'
import pagefifteen from './/pagefifteen.vue'
import pageseventeen from "@/pages/mtjdl_drop/pageseventeen.vue";
import cloudFile from '../utilPage/cloudFile.vue'
import getProject from "@/api/getProject";
import outline from "@/api/outline";
import mode from "@/pages/mtjdl_drop/pageEighteen.vue"
import pagesixteen from "@/pages/mtjdl_drop/pagesixteen.vue";
export default {
    name:'mtjdl_drop',
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
    mode,
    pagesixteen,
  },
  data(){
    return{
      mdProjectId:'',
      proDatas:{},
      outlineData:[],
      modifiedOutlineData:[],
      saveProjectMessage:{},
      stepLine1:'',
      stepLine2:'',
      newProjects:[],
      userId:'',
      projects: [],
      response2:[],
      page: 1,
      perPage: 30,
      loading:false,
      timer: '',
      showText: false,
      activeIndex: 0,
      save_relate_project:{},
      activities: [
        // {content: '岩石种类',id: 'rock_species'},
        // {content: '岩石强度',id: 'rock_strength'},
        // {content: '岩体结构',id: 'rock_structure'},
        // {content: '岩体结构面',id: 'structure_face'},
        // {content: '隧道地应力',id: 'page_five'},
        // {content: '岩体可爆性',id: 'page_six'},
        // {content: '钻孔与炸药',id: 'page_seven'},
        // {content: '开挖轮廓线',id: 'page_eight'},
        // {content: '掏槽孔布置',id: 'page_nine'},
        {content: '周边孔布置',id: 'page_ten',icon: 'ten.png'},
        {content: '辅助孔布置',id: 'page_eleven',icon: 'eleven.png'},
        {content: '装药量计算',id: 'page_twelve',icon: 'twelve.png'},
        {content: '起爆网络设计',id: 'page_thirteen',icon: 'thirteen.png'},
        {content: '爆破方案导出',id: 'page_sixteen',icon: 'sixteen.png'},
        {content: '评价与优化',id: 'page_seventeen',icon: 'seventeen.png'},
        {content: '设计模块切换',id: 'page_eighteen',icon: 'toggle.png'},
      ],
      scrollHeight: [],
        token: '',
        active:'',
        loginInfo: {
          id: '',
          // avatar: '',
          phone: '',
          // username: '',
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
    onScroll() {
      const container = this.$refs.projectHistory;
      if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        this.fetchProjects();
      }
    },
    importProject(id) {
      // 在这里添加导入项目的逻辑
      getProject.getProject(id).then(response=>{
        this.proDatas = response.data.data;
        console.log(this.proDatas);
        eventBus.$emit('data_Import',{proDatas:this.proDatas});
      })
      console.log(`导入项目 ${id}`);

    },
    deleteProject(index,id) {
      //取出id
      getProject.delProject(id).then(response=>{
        alert(response.data.data);
        this.projects.splice(index, 1);
      })

    },
    //加载用户云端记录
    fetchProjects() {
      if (this.loading) return;
      this.loading = true;
      getProject.get_relate_project(this.save_relate_project).then(res=>{
        console.log(res.data.data.stepMidIdList);
        this.projects=[];
        this.newProjects=[];
        console.log('API Response:', res);
        res = res.data.data.stepMidIdList;
        this.newProjects = res;
        console.log(this.newProjects);
        // 逆序输出
        this.newProjects.reverse();

        // 为每个项目添加唯一的 id 属性
        this.newProjects = this.newProjects.map((project, index) => {
          return {
            ...project,
            id:this.newProjects[index]
          };
        });
        // 将项目列表对象添加到数组中
        this.projects.push(...this.newProjects);
        console.log(this.projects);
        this.loading = false; // 加载完成，设置 loading 为 false
      }).catch(error => {
        console.error(error);
        this.loading = false; // 出现错误时，也要设置 loading 为 false
      });
    },
    refresh() {
      location.reload();
    },
    createNew(){
      if(cookie.get("mdProjectId")){
        cookie.remove("mdProjectId");
        cookie.remove('upData');
        cookie.remove('upData2')
        // this.$router.replace({ path:'/stjdl' })
        this.refresh();
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
        console.log("loginInfo"+JSON.stringify(this.loginInfo));
        this.userId = this.loginInfo.id;
      })
    }

    // let projectId =cookie.get("upProjectId")
    // if(!cookie.get("upProjectId")){
    //   if(projectId!=null || projectId!='' || typeof(projectId)!='undefined'){
    //   this.isDown=true;this.isUp=false;
    //   }
    //   this.haveNine=true;
    // }else{
    //   this.isDown=false;this.isUp=true;
    //   this.haveNine=false;
    // }
  },
  mounted(){
    let projectId;
    cookie.get("upProjectId") ? projectId = cookie.get("upProjectId") : projectId = cookie.get("dwProjectId");//检测从哪里跳转的，优先考虑上台阶
    console.log(projectId);

    //跳转到下台阶 一定有 是会存一个projectId的 重新保存下台阶信息就行
    if (!cookie.get('mdProjectId'))//判断是否是第一次加载下台阶页面
    {
      //id也清空，生成一个dwProjectId
      getProject.getProject(projectId).then(response => {
        this.saveProjectMessage = response.data.data;
        // let step1 = this.saveProjectMessage.stepLine1;
        // let step2 = this.saveProjectMessage.stepLine2;
        this.saveProjectMessage.excavationCode = "001006"
        this.saveProjectMessage.id = '';
        // this.saveProjectMessage.stepLine2 =step2;
        // this.saveProjectMessage.stepLine1 =step1+step2;

        calculateApi.saveProject(this.saveProjectMessage).then(response => {
          if (response.data.code == 1) {
            console.log(response.data.data);
            cookie.set("mdProjectId", response.data.data.id);
            this.projectId = cookie.get("mdProjectId");
            this.save_relate_project.stepMidId = this.projectId;
            getProject.save_relate_project(this.save_relate_project).then(res=>{
              console.log(res.data.data);
            })
            this.mdProjectId = this.projectId;
            this.fetchProjects();
            // 调用后端 API 获取轮廓线信息
            outline.getOutlines(projectId).then(response => {
              // 获取后端返回的轮廓线信息
              this.outlineData = response.data.data;
              console.log(this.outlineData);

              // 替换轮廓线信息中的项目ID
              this.modifiedOutlineData = this.outlineData.map(item => {
                // 假设轮廓线信息中有一个名为 projectId 的属性，将其替换为新的项目ID
                // 通过解构赋值排除id字段，然后添加新的projectId字段
                const {id, ...rest} = item;
                return {...rest, projectId: this.projectId};
              });

              console.log(this.modifiedOutlineData);

              // 调用后端 API 保存替换后的轮廓线信息
              outline.saveOutline(this.modifiedOutlineData).then(response => {
                this.itemData = response.data;
                console.log("responseData:" + JSON.stringify(response.data.data))
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
            console.log("mdProjectId: " + this.projectId);

          }
        })

      })
    } else {
      getProject.getProject(projectId).then(response=>{
        if (response.data.code == 1){
          //查询所跳转过来的projectI工程信息
          this.saveProjectMessage = response.data.data;
          /*修改这两个属性 为更新dwProjectId的工程信息做准备*/
          this.saveProjectMessage.id = cookie.get('mdProjectId');
          this.saveProjectMessage.excavationCode = "001006";
          calculateApi.saveProject(this.saveProjectMessage).then(response=>{
            if (response.data.code == 1){
              console.log(response.data.data);
              // cookie.get("dwProjectId", response.data.data.id);
              this.projectId = cookie.get("mdProjectId");
              // 调用后端 API 获取轮廓线信息
              outline.getOutlines(projectId).then(response => {
                // 获取后端返回的轮廓线信息
                this.outlineData = response.data.data;
                console.log(this.outlineData);

                // 替换轮廓线信息中的项目ID
                this.modifiedOutlineData = this.outlineData.map(item => {
                  // 假设轮廓线信息中有一个名为 projectId 的属性，将其替换为新的项目ID
                  // 通过解构赋值排除id字段，然后添加新的projectId字段
                  const {id, ...rest} = item;
                  return {...rest, projectId: this.projectId};
                });

                console.log(this.modifiedOutlineData);

                // 调用后端 API 保存替换后的轮廓线信息
                outline.saveOutline(this.modifiedOutlineData).then(response => {
                  this.itemData = response.data;
                  console.log("responseData:" + JSON.stringify(response.data.data))
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
              console.log("mdProjectId: " + this.projectId);
            }
          })
          alert("中台阶信息同步更新成功!");
        }
      })
    }


    this.$nextTick(() => {
      this.getScrollHeight();
    })
  },
};
</script>

<style scoped>
>>>.el-timeline-item__wrapper{
  padding-left: 0px;
}
.loading {
  text-align: center;
  padding: 10px;
}
.operation-wrapper_1 {
  display: flex;
  flex-direction: column; /* 列布局 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  height: 100vh; /* 占满整个视口高度 */
  background:#263F69;
  background-blend-mode: screen;
}
.container_layout{
  display: flex;
  height: 100vh;
  margin-top: 40px;
  width: 1710px;
}
.header_title{
  display: flex;
  position: absolute;
  left: 720px;
  top: 10px;
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
.sidebar-right {
  width: 192px; /* 右侧边栏宽度 */
  background-color:#111537;;
  padding-left: 20px;
  color: #FFFFFF;
  box-sizing: border-box;
}
.el-main-demo{
  padding: 0px 5px !important;
  flex: 1;
  overflow-y: auto; /* 允许内容溢出时滚动 */
}
>>>.el-header {
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
    color: #3fa3ff !important;
}

.check_color {
  background-image: url('assets/img/ui/click.png');
  background-size: calc(100%*0.8 ); /* 将背景图缩小到原始尺寸的 50% */
  background-position: left;
  background-repeat: no-repeat;
  z-index: 1;
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
.timeline-background {
  background-image: url('@/assets/img/ui/Rectangle 2@2x.png');
  background-size: 100% 100%; /* 使背景图像宽度和高度都为容器的100% */
  background-position: top center; /* 确保背景图像从顶部开始 */
  background-attachment: local; /* 背景图像与元素的滚动一致 */
  padding-top: 0px;
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
  .operation-wrapper1 {
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
  height: 6px;
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

>>>.el-timeline-item__node{
  width: 0px;
}

>>>.el-timeline-item__tail {
  border-left: 0px solid #8caddb;
}
</style>
