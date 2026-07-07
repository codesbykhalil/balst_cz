<template>
  <client-only>
    <div>
      <div class="default-page">
        <div style="background-color: white;height: 8%">
          <!--          <img src="@/assets/img/JHUNLogo.png" style="width:4%;height:100%;positioin:relative;margin: 0% 0% 3% 1%;cursor: pointer;">-->
          <!--          <img src="@/assets/img/aiblastLogo.png" style="width:4%;height:100%;positioin:relative;margin: 0% 0% 3% 1%;cursor: pointer;">-->
          <img src="@/assets/img/indexPic/图片16.png" style="width:35%;height:100%;positioin:relative;margin: 0% 0% 3% 0.5%;cursor: pointer;">
          <img src="@/assets/img/indexPic/图片20.png" style="width:3%;height:78%;positioin:relative;margin: 0% 0% 3.5% 48.5%;cursor: pointer;">
          <img src="@/assets/img/indexPic/图片19.png" style="width:3%;height:80%;positioin:relative;margin:0% 0% 3.4% 3%;cursor: pointer;">
          <img src="@/assets/img/indexPic/图片18.png" style="width:3%;height:78%;positioin:relative;margin:0% 0% 3.5% 3%;cursor: pointer;">
        </div>

        <div style="display: flex;margin-top: 3%; ">
          <div style=" width: 25%; transform: translate(22%, 0);">
            <div>
              <!--              <button class="button" @click="handleButtonClick"><p style="font-size: 30px">爆破方案一键生成</p></button>-->
              <p style="color: white;font-size: 26px;transition: transform .2s;">爆破方案一键生成模块，
                可以通过网络自动接收围岩的地质信息、爆破开挖模式和进尺等信息，自动化智能生成隧道断面上的炮孔坐标、装药结构、炸药用量和起爆顺序等，并进行爆破效果的预测。</p>
              <button class="button" @click="handleButtonClick2" style="margin-top: 5%">
                <p style="font-size: 22px">导入断面设计信息 爆破方案一键生成</p></button>

              <div style="position: absolute" class="tree_container">
                <el-tree
                  :data="data"
                  ref="menuTree"
                  node-key="label"
                  :props="defaultProps"
                  @node-click="handleNodeClick"
                  accordion
                  :highlight-current="true"
                  :style="{ maxHeight: '300px', overflowY: 'auto',}"

                >
                </el-tree>

              </div>
            </div>
          </div>
          <div style="width: 55%; height: 65%;transform: translate(65%, 0);position: absolute;margin-top: 1.2%;">
            <video
              src="@/assets/video/demo3.mp4"
              controls
              width="100%"
              height="100%"
            ></video>
          </div>
        </div>




        <div style="margin-top:20%;">
          <font color="#48c9c7" style="margin:10% 0 0 23%;font-size:1.1vw;">
            技术支持：江汉大学精细爆破国家重点实验室</font>
          <font face="Arial" color="#48c9c7" style="margin:30% 0 0 5%;font-size:1.1vw;">
            Tel：13283834260</font>
          <font face="Arial" color="#48c9c7" style="margin:30% 0 0 5%;font-size:1.1vw;">
            Email：52472106@qq.com</font>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>

import connAnoSerApi from "@/api/connAnoSer";
import pageseven from "./stjdl_ld/pageseven.vue"
import {eventBus} from "../plugins/nuxt-elementui";
import cookie from "js-cookie";
import rockTypeApi from "@/api/getspecies"
import teamApi from "@/api/team"
import pagesix from "@/pages/stjdl_ld/pagesix.vue";
import loginApi from '@/api/login.js'
import * as url from "url";
export default {
  components:{
    pageseven,
  },
  data (){
    return{
      videoVisible: false,
      urls:[
        {url:require('../assets/video/1.png')},
        {url:require('../assets/video/2.png')},
        {url:require('../assets/video/3.png')},
        {url:require('../assets/video/4.png')},
        {url:require('../assets/video/5.png')},
        {url:require('../assets/video/6.png')},
      ],
      webSocket: null,
      mileageId:'',
      p1top4:{},
      dataToSend : {
        rockId: '',
        ucs: '',
        structureScore: '',
        structuralPlaneScore: '',
        indexNum:'',
        advance:'',
        testData2:{},
      },
      project1Info:{},
      user:{phone:"12345678",password:"12345678"},
      workFaceList:[],
      isButtonDisabled: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },

  created() {
    let user={
      phone:'12345678',
      password:'12345678'
    }

    if(!cookie.get('user_token'))
      loginApi.doLogin(user).then(response => {
        cookie.set('user_token',response.data.map.user_token)
      })

    if (process.browser) {
      if ('WebSocket' in window) {
        var cid = Math.floor(Math.random() * 100); // 随机生成客户端id
        this.webSocket = new WebSocket("ws://111.229.115.234:8089/api/websocket/" + cid);
        this.initWebSocket();
        console.log('Support webSocket')
      }
      else {
        console.log('Not support webSocket')
      }
    }
  },
  beforeDestroy(){
    clearInterval(this.timer);
    this.timer = null;
  },
  mounted() {
    //自动登录
    cookie.remove("user_token")
    loginApi.doLogin({phone:"12345678",password:"12345678"}).then(response => {
      console.log('user_token',response.data.map.user_token)
      cookie.set('user_token',response.data.map.user_token)
    })
    //深圳大学接口，待定
    // let str = "康定2号隧1道"
    // teamApi.listOverbreakData(str).then(response=>{
    //   console.log(response.data.data)
    // })
    //轮询查接口方式
    // this.timer = setInterval(() => {
    //     setTimeout(() => {
    //       teamApi.getNewProject1Info().then(response => {
    //         console.log("clas sifyInfo",JSON.stringify(response.data.data))
    //         this.project1Info = response.data.data;
    //         // this.handleButtonClick();
    //       })
    //     }, 0)
    //   }, 60000)
  },

  methods: {
    //点击按钮时,触发弹出效果
    playVideo() {
      //触发点击时,让其显示
      this.videoVisible = true
    },
    //事件操作 (表格、表单 同理 需要执行的事件 在此处)
    closeDialog() {
      //点击播放视频
      this.$refs.video.pause()
    },
    handleNodeClick(data) {
      if (data.children == null){
        this.mileageId = String(data.id);
        console.log(this.mileageId)
        this.handleMode();
      }
    },
    handleButtonClick() {
// 调用接口获取开挖方法信息

      teamApi.getDataFromP1(this.mileageId).then(response => {
        console.log("project1Info",JSON.stringify(response.data.data))
        this.project1Info = response.data.data;

        // cookie.set("classifyInfo", this.project1Info);
        cookie.set("mileageId", this.mileageId);
        const classifyInfo = this.project1Info;
        this.testData2 = this.project1Info;

        let str2= classifyInfo.Rc.match(/\d+(\.\d+)?/g);
        this.dataToSend.ucs = (Number(str2[0])+Number(str2[1]))/2

        this.dataToSend.indexNum = parseFloat((this.dataToSend.ucs / 10).toFixed(2));
        if (classifyInfo.integrity=="完整") {
          this.dataToSend.structureScore = 16
        } if (classifyInfo.integrity=="较完整"){
          this.dataToSend.structureScore = 14
        } if (classifyInfo.integrity=="较破碎"){
          this.dataToSend.structureScore = 11
        } if(classifyInfo.integrity == "破碎"){
          this.dataToSend.structureScore = 8
        }if(classifyInfo.integrity == "极破碎") {
          this.dataToSend.structureScore = 5
        }

        if (classifyInfo.rockWeather == "未风化"){
          this.dataToSend.structuralPlaneScore = 15
        } if (classifyInfo.rockWeather == "微风化"){
          this.dataToSend.structuralPlaneScore = 12
        } if (classifyInfo.rockWeather == "弱风化"){
          this.dataToSend.structuralPlaneScore = 9
        } if (classifyInfo.rockWeather == "强风化"){
          this.dataToSend.structuralPlaneScore = 6
        } if (classifyInfo.rockWeather == "全风化"){
          this.dataToSend.structuralPlaneScore = 3
        }
        //新增
        this.dataToSend.rockLEvel = classifyInfo.classify;

        this.p1top4.lithology = classifyInfo.lithology;
        console.log(this.p1top4.lithology);
        rockTypeApi.getRockId(this.p1top4).then(response=>{
          console.log("岩石ID  "+response.data.data.rockId);
          this.dataToSend.rockId = response.data.data.rockId;
          console.log(this.dataToSend);
          console.log("dataToSendEvent"+JSON.stringify(this.dataToSend))
          eventBus.$emit('dataToSendEvent', {dataToSend :this.dataToSend});
          this.autoMode();
        })

      })
      cookie.set('isAutoMode', 1);
      console.log("Updated dataToSend:", this.dataToSend);
    },
    handleButtonClick2() {
        // cookie.set('isAutoMode', 0);
        //  cookie.set('rockLEvel', 0);
        this.$router.push({ name: 'qdmdl_ld' });
      // if (this.isButtonDisabled) {
      //   return; // 如果是，则直接返回，什么都不做
      // }
      // this.isButtonDisabled = true;
      // //终止轮询
      // clearInterval(this.timer);
      // cookie.set('isAutoMode', 0);
      // // 调用接口获取开挖方法信息
      // let userData = new FormData();
      // userData.append("username","czjhun")
      // userData.append("password","czjhun.123")
      // connAnoSerApi.info_Verify(userData).then(response => {
      //   console.log("testData" + JSON.stringify(response.data.token))
      //   cookie.set("testToken", response.data.token);

      //   let userData2 = new FormData();
      //   userData2.append("dataType", "getWorkFaceName")
      //   connAnoSerApi.get_Info(userData2, cookie.get("testToken")).then(response => {
      //     let list = response.data.work_face_list;
      //     list.map((item) => {
      //       this.workFaceList.push({
      //         tunnelFullName:`${item.tunnelName}${item.workAreaName}${item.workFaceName}`,
      //         mileageList:item.mileageList})
      //     })
      //     console.log("project1DataList====="+JSON.stringify(this.workFaceList))

      //     this.data = this.workFaceList.map(item => ({
      //       label : item.tunnelFullName,
      //       children: item.mileageList.map(mileage => ({
      //         id : mileage.mileage_id,
      //         label : `${mileage.standardMileage}    ${mileage.mileage}`,
      //       }))
      //     }))
      //   });
      //   this.handleMode();
      // });

    },
    handleButtonClick2Old() {
      //终止轮询
      clearInterval(this.timer);
      cookie.set('isAutoMode', 0);
      // 调用接口获取开挖方法信息
      let userData = new FormData();
      userData.append("username","czjhun")
      userData.append("password","czjhun.123")
      connAnoSerApi.info_Verify(userData).then(response => {
        console.log("testData" + JSON.stringify(response.data.token))
        cookie.set("testToken", response.data.token);


        let userData2 = new FormData();
        userData2.append("dataType", "getClassifyInfo")
        // userData2.append("dataType","getWorkFaceName")
        userData2.append("workFaceName", "康定2号隧道1号横洞工区平导大里程")
        connAnoSerApi.get_Info(userData2, cookie.get("testToken")).then(response => {
          console.log("testData2" + JSON.stringify(response.data));
          cookie.set("classifyInfo", response.data.classifyInfo);
          const classifyInfo = response.data.classifyInfo;
          this.testData2 = {...response.data.classifyInfo}
          //新增
          let str2= classifyInfo.Rc.match(/\d+(\.\d+)?/g);
          this.dataToSend.ucs = (Number(str2[0])+Number(str2[1]))/2;

          this.dataToSend.indexNum = parseFloat((this.dataToSend.ucs / 10).toFixed(2));
          if (classifyInfo.integrity=="完整") {
            this.dataToSend.structureScore = 16
          } if (classifyInfo.integrity=="较完整"){
            this.dataToSend.structureScore = 14
          } if (classifyInfo.integrity=="较破碎"){
            this.dataToSend.structureScore = 11
          } if(classifyInfo.integrity == "破碎"){
            this.dataToSend.structureScore = 8
          }if(classifyInfo.integrity == "极破碎") {
            this.dataToSend.structureScore = 5
          }

          if (classifyInfo.rockWeather == "未风化"){
            this.dataToSend.structuralPlaneScore = 15
          } if (classifyInfo.rockWeather == "微风化"){
            this.dataToSend.structuralPlaneScore = 12
          } if (classifyInfo.rockWeather == "弱风化"){
            this.dataToSend.structuralPlaneScore = 9
          } if (classifyInfo.rockWeather == "强风化"){
            this.dataToSend.structuralPlaneScore = 6
          } if (classifyInfo.rockWeather == "全风化"){
            this.dataToSend.structuralPlaneScore = 3
          }
          //新增
          this.dataToSend.rockLEvel = classifyInfo.classify;

          this.p1top4.lithology = classifyInfo.lithology;
          console.log(this.p1top4.lithology);
          rockTypeApi.getRockId(this.p1top4).then(response=>{
            console.log("花岗岩ID  "+response.data.data.rockId);
            this.dataToSend.rockId = response.data.data.rockId;
            console.log(this.dataToSend);
          })
          console.log("dataToSendEvent"+JSON.stringify(this.dataToSend))
          eventBus.$emit('dataToSendEvent', {dataToSend :this.dataToSend});
        });
        this.handleMode();
      });

    },
    autoMode(){
      // 8728
      teamApi.getDataFromP2(this.project1Info.mileageID).then(response => {
        console.log("excavation_data" + JSON.stringify(response.data.data));
        const excavationModel = response.data.data.excavation_model;//获取开挖方法
        console.log(response.data,"---")
        // 使用正则表达式提取数字部分
        if (response.data.data.excavation_footage !== undefined) {
          // const footageString = response.data.data.excavation_footage;
          // const match = footageString.match(/\d+(\.\d+)?/);
          this.dataToSend.advance = response.data.data.excavation_footage;

          // if (match) {
          //   // 如果匹配到数字部分，将其转换为数字并赋值给 this.dataToSend.advance
          //   this.dataToSend.advance = parseFloat(match[0]);
          // } else {
          //   // 如果没有匹配到数字，可以根据需要进行处理，例如给一个默认值
          //   this.dataToSend.advance = 0;
          // }
        }else {
          // 处理 excavation_footage 未定义的情况
          this.dataToSend.advance = 0;
        }
        if (excavationModel === '全断面开挖') {
          // alert(this.dataToSend.advance)
          // 跳转到 "/method1" 页面
          this.$router.push({name: 'qdmdl_ld', query: {dataToSend: this.dataToSend}});

        } else if (excavationModel === '二台阶法开挖') {
          // 跳转到 "/method2" 页面
          // alert(this.dataToSend.advance)
          this.$router.push({name: 'qdmdl_ld', query: {dataToSend: this.dataToSend}});
          console.log(this.dataToSend);

        } else {
          // alert(this.dataToSend.advance)
          this.$router.push({name: 'qdmdl_ld', query: {dataToSend: this.dataToSend}});
          console.log(this.dataToSend);
        }

        // this.$confirm(`
        //     <div>
        //           <span><strong>项目名称:</strong></span >
        //           <span style='font-weight:bold;color:#000'>${this.project1Info.tunnelFullName}</span>
        //     </div><br/>
        //     <div style='display: flex;justify-content: space-between;align-items: center;'>

        //       <div>
        //         <div> <span>开挖进尺:</span >
        //           <span style='font-weight:bold;color:#000'>${response.data.data.excavation_footage}</span>
        //           </div>
        //         <div> <span>开挖模式:</span >
        //           <span style='font-weight:bold;color:#000'>${response.data.data.excavation_model} </span>
        //           </div>
        //         <div> <span>开挖高度:</span >
        //           <span style='font-weight:bold;color:#000'>${response.data.data.steps_height}</span>
        //           </div>
        //         <div> <span>开挖长度:</span>
        //           <span  style='font-weight:bold;color:#000'>${response.data.data.steps_length} </span>
        //           </div>
        //       </div>
        //       <div>
        //         <div> <span>抗压强度:</span> <span style='font-weight:bold;color:#000'>${this.project1Info.Rc}</span></div>
        //         <div> <span>岩石完整程度:</span> <span style='font-weight:bold;color:#000'>${this.project1Info.integrity}</span>
        //         </div>
        //         <div> <span>岩石风化程度:</span> <span style='font-weight:bold;color:#000'>${this.project1Info.rockWeather}</span>
        //         </div>
        //         <div> <span>岩石种类:</span> <span style='font-weight:bold;color:#000'>${this.project1Info.lithology}</span>
        //         </div>
        //         <div> <span>围岩等级:</span> <span style='font-weight:bold;color:#000'>${this.project1Info.classify}</span>
        //         </div>
        //       </div>
        //     </div>
        //     <div style='font-size:16px;font-weight:bold;margin-top:2px'>点击确定进入，点击取消转至独立设计版本</div>
        //     `,
        //   '提示', {
        //     dangerouslyUseHTMLString: true,
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'info'
        //   }).then(() => {
        //   if (excavationModel === '全断面开挖') {
        //     // alert(this.dataToSend.advance)
        //     // 跳转到 "/method1" 页面
        //     this.$router.push({name: 'qdmdl_ld', query: {dataToSend: this.dataToSend}});

        //   } else if (excavationModel === '二台阶法开挖') {
        //     // 跳转到 "/method2" 页面
        //     // alert(this.dataToSend.advance)
        //     this.$router.push({name: 'qdmdl_ld', query: {dataToSend: this.dataToSend}});
        //     console.log(this.dataToSend);

        //   } else {
        //     // alert(this.dataToSend.advance)
        //     this.$router.push({name: 'qdmdl_ld', query: {dataToSend: this.dataToSend}});
        //     console.log(this.dataToSend);
        //   }
        // }).catch(() => {
        //   // 用户取消了跳转，跳转到指定页面
        //   window.location.href = 'http://124.220.35.175:1234/qdmdl_x';
        //   // 处理取消按钮点击事件
        //   console.log('取消按钮被点击');
        // }
        // );
      }).catch(error =>{
        this.$message({
          message: error.data.msg,
          type: 'warning'
        })
      })

    },
    handleMode(){
      teamApi.getDataFromP1(this.mileageId).then(response => {
        this.project1Info = response.data.data;
        console.log("project1Info"+JSON.stringify(this.project1Info))
        if (this.project1Info === null || this.project1Info === undefined || this.project1Info === '') {
          alert('未接收到数据');
          return;
        }
        // cookie.set("classifyInfo", this.project1Info);
        cookie.set("mileageId", this.mileageId);
        const classifyInfo = this.project1Info;
        this.testData2 = this.project1Info;

        let str2= classifyInfo.Rc.match(/\d+(\.\d+)?/g);
        this.dataToSend.ucs = (Number(str2[0])+Number(str2[1]))/2

        this.dataToSend.indexNum = parseFloat((this.dataToSend.ucs / 10).toFixed(2));
        if (classifyInfo.integrity=="完整") {
          this.dataToSend.structureScore = 16
        } if (classifyInfo.integrity=="较完整"){
          this.dataToSend.structureScore = 14
        } if (classifyInfo.integrity=="较破碎"){
          this.dataToSend.structureScore = 11
        } if(classifyInfo.integrity == "破碎"){
          this.dataToSend.structureScore = 8
        }if(classifyInfo.integrity == "极破碎") {
          this.dataToSend.structureScore = 5
        }

        if (classifyInfo.rockWeather == "未风化"){
          this.dataToSend.structuralPlaneScore = 15
        } if (classifyInfo.rockWeather == "微风化"){
          this.dataToSend.structuralPlaneScore = 12
        } if (classifyInfo.rockWeather == "弱风化"){
          this.dataToSend.structuralPlaneScore = 9
        } if (classifyInfo.rockWeather == "强风化"){
          this.dataToSend.structuralPlaneScore = 6
        } if (classifyInfo.rockWeather == "全风化"){
          this.dataToSend.structuralPlaneScore = 3
        }
        //新增
        this.dataToSend.rockLEvel = classifyInfo.classify;

        this.p1top4.lithology = classifyInfo.lithology;
        console.log(this.p1top4.lithology);
        rockTypeApi.getRockId(this.p1top4).then(response=>{
          console.log("岩石ID  "+response.data.data.rockId);
          this.dataToSend.rockId = response.data.data.rockId;
          console.log(this.dataToSend);
        })
        console.log("dataToSendEvent"+JSON.stringify(this.dataToSend))
        eventBus.$emit('dataToSendEvent', {dataToSend :this.dataToSend});

        teamApi.getDataFromP2(this.mileageId).then(response => {
          // console.log("excavation_data" + JSON.stringify(response.data.result));
          const excavationModel = response.data.data.excavation_model;//获取开挖方法
          console.log(response.data,"---")
          // 使用正则表达式提取数字部分
          if (response.data.data.excavation_footage !== undefined) {
//临时接口无中文
            this.dataToSend.advance = response.data.data.excavation_footage;
          }else {
            // 处理 excavation_footage 未定义的情况
            this.dataToSend.advance = 0;
          }

          this.$confirm(`
            <div>
                  <span><strong>项目名称:</strong></span >
                  <span style='font-weight:bold;color:#000'>${this.project1Info.tunnelFullName}</span>
            </div><br/>
            <div style='display: flex;justify-content: space-between;align-items: center;'>

              <div>
                <div> <span>开挖进尺:</span >
                  <span style='font-weight:bold;color:#000'>${response.data.data.excavation_footage}</span>
                  </div>
                <div> <span>开挖模式:</span >
                  <span style='font-weight:bold;color:#000'>${response.data.data.excavation_model} </span>
                  </div>
                <div> <span>开挖高度:</span >
                  <span style='font-weight:bold;color:#000'>${response.data.data.steps_height}</span>
                  </div>
                <div> <span>开挖长度:</span>
                  <span  style='font-weight:bold;color:#000'>${response.data.data.steps_length} </span>
                  </div>
              </div>
              <div>
                <div> <span>抗压强度:</span> <span style='font-weight:bold;color:#000'>${this.testData2.Rc}</span></div>
                <div> <span>岩石完整程度:</span> <span style='font-weight:bold;color:#000'>${this.testData2.integrity}</span>
                </div>
                <div> <span>岩石风化程度:</span> <span style='font-weight:bold;color:#000'>${this.testData2.rockWeather}</span>
                </div>
                <div> <span>岩石种类:</span> <span style='font-weight:bold;color:#000'>${this.testData2.lithology}</span>
                </div>
                <div> <span>围岩等级:</span> <span style='font-weight:bold;color:#000'>${this.testData2.classify}</span>
                </div>
              </div>
            </div>
            <div style='font-size:16px;font-weight:bold;margin-top:2px'>点击确定进入，点击取消转至独立设计版本</div>
            `,
            '提示', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {

            if (excavationModel === '全断面') {
              // alert(this.dataToSend.advance)
              // 跳转到 "/method1" 页面
              this.$router.push({name: 'qdmdl_ld', query: {dataToSend: this.dataToSend}});

            } else if (excavationModel === ('二台阶'||'台阶法')) {
              // 跳转到 "/method2" 页面
              // alert(this.dataToSend.advance)
              this.$router.push({name: 'stjdl_ld', query: {dataToSend: this.dataToSend}});
              console.log(this.dataToSend);

            } else {
              // alert(this.dataToSend.advance)
              this.$router.push({name: 'qdmdl_ld', query: {dataToSend: this.dataToSend}});
              // this.$router.push({name: 'qdmdl_ld', query: {dataToSend: this.dataToSend}});
              console.log(this.dataToSend);
            }
          }).catch(() => {
              // 用户取消了跳转，跳转到指定页面
              window.location.href = 'http://124.220.35.175:1234/qdmdl_x';
              // 处理取消按钮点击事件
              console.log('取消按钮被点击');
            }
          );
        })

      })
    },

    //webSocket接收消息
    initWebSocket() {
      this.webSocket.onopen = this.webSocketOpen;
      this.webSocket.onmessage = this.webSocketMessage;
      this.webSocket.onclose = this.webSocketClose;
      this.webSocket.onerror = this.webSocketError;
    },
    webSocketOpen() {//打开
      console.log("WebSocket连接成功")
    },
    webSocketMessage(e) { //数据接收
      console.log(e.data);
      //webSocket实现轮询查询接口
      this.mileageId = e.data
      this.handleButtonClick()
    },
    webSocketClose() {  //关闭
      console.log("WebSocket关闭");
    },
    webSocketError() {  //失败
      console.log("WebSocket连接失败");
    },
  }
};
</script>

<style scoped>
::v-deep .el-tree-node__content:hover{
  background-image: linear-gradient(to right, #4879cb, #48c9c7);
}
::v-deep .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
  background-image: linear-gradient(to right, #4879cb, #48c9c7);
}
.tree_container{
  /*height: 100px;*/
  width: 100%;
  border-radius: 10px;
  background-image: linear-gradient(to right, #48c9c7, #4879cb);
  margin: 3% 0 3% 0%;
  position: absolute;
}
.el-tree{
  background: transparent;
  color: #fff;
}
/*改变高度*/
.el-tree-node__content{
  height: 50px;
  font-size: 30px !important;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 30px;
  padding-right: 20px;
}


body{
  margin: 0;
}

.default-page {
  /* 设置背景图片的路径 */
  background-image: url('@/assets/img/indexPic/background.png');

  /* 设置背景图片铺满整个页面，不显示留白 */
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh; /* 设置高度为视窗的100% */
  position: fixed;
  top: 0; /* 距离窗口顶部的距离为0 */
  right: 0; /* 距离窗口右侧的距离为0 */
  left: 0;
  /* 调整背景图片的位置以减少或消除留白 */
  background-position: center center; /* 使背景图居中显示 */

}
.button {
  height: 1.2rem;
  width: 100%;
  border-radius: 10px;
  text-align: center;
  background-color: #48c9c7;
  background-image: linear-gradient(to right, #48c9c7, #4879cb);
  font-weight: bold;
  position: relative;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s ease-in-out, transform 0.2s ease-in-out, background-image 0.3s ease-in-out;
  border: none;
  margin: 3% 0 3% 0%;
}

/* 可选的悬停样式 */
.button:hover {
  background-color: #005FCC; /* 悬停时背景颜色变化 */
  transform: scale(1.05); /* 悬停时放大效果 */
}


.button p{
  color: white;
  font-size: 0.65rem;
  margin:0 0 1% 0;
}
.button:hover {
  color: rgb(8, 12, 241);
  background-color: rgba(0, 0, 0, 0.05);
  transform: scale(1.1)
}
.dir-img{
  width:18%;
  height:85%;
  margin:2% 0 2% 5%;
  cursor: pointer;
  transition: transform .2s;
}
.dir-img:hover{
  transform: scale(1.1)
}
.dir-img2{
  width:12%;
  height:12%;
  margin:2% 0 1% 3.8%;
  cursor: pointer;
  transition: transform .2s;
}
.dir-img2:hover{
  transform: scale(1.1)
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
