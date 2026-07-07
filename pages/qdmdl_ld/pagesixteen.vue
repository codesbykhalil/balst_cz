<template>
  <div class="card5_1">
    <div>
      <div style="padding-right: 20px" class="icon_title11">
        <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;">16  爆破方案导出</h2>
      </div>
      <!--      <div style="display: flex; align-items: center;">-->
      <!--        <div class="proovr1-collect__tags" style="padding-bottom: 12px;margin-left: 300px;margin-top: 15px">-->
      <!--          <span @click="outPutXY" class="proovr1-collect__tag" style="margin-left: 20px;margin-top: 15px">导出坐标偏移量</span>-->
      <!--        </div>-->
      <!--        <el-input style="width: 210px; margin-top: 10px; margin-bottom: -20px;" v-model="offsetX"><template slot="suffix">x轴</template></el-input>-->
      <!--        <el-input style="width: 210px; margin-top: 10px; margin-bottom: -20px; margin-left: 107px;" v-model="offsetY"><template slot="suffix">y轴</template></el-input>-->
      <!--      </div>-->

      <div style="display: flex; align-items: center;justify-content: center;margin-left: 0;">
        <div class="proovr1-collect__tags" style="padding-bottom: 12px">
          <span @click="outPut" class="proovr1-collect__tag" style="margin-left: 10px;margin-top: 15px">导出炮孔信息表格(xlsx文件)</span>
          <!-- <span @click="autoCal" class="proovr1-collect__tag" style="margin-left: 10px;margin-top: 15px">导出炮孔信息表格(xlsx文件)</span> -->

          <span @click="outPut1" class="proovr1-collect__tag" style="margin-left: 100px;margin-top: 15px">导出炮孔布置图（dxf文件）</span>

          <span @click="autoCal" class="proovr1-collect__tag" style="margin-left: 100px;margin-top: 15px">手动推送数据至课题一、三</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css2/pages.css'
import cookie from 'js-cookie'
import outPutApi from '@/api/outPut.js'
import {Input} from "element-ui";
import teamApi from "@/api/team"
import {eventBus} from "@/plugins/nuxt-elementui";
export default {
  computed: {
    Input() {
      return Input
    }
  },
  data(){
    return{
      // offsetX:2.18,
      // offsetY:0,
      projectId:'',
      project1Info:{},
      timer:'',
      timer2:'',
    }
  },
  created(){
    eventBus.$on('autoMode', (data)=>{
      if(data.autoStep == 9){
        setTimeout(() => {
          if(cookie.get('isAutoMode') == 1)
          this.autoCal();
          setTimeout(() => {
            eventBus.$emit('autoMode',{autoStep:10})
          },500);
        },1000);
      }
    })
  },
  beforeDestroy() {
    eventBus.$off('autoMode');
  },
  methods:{
    autoCal(){
      this.projectId = cookie.get("projectId")
      teamApi.getLoginData().then(response => {
        let P1Data = {projectId: this.projectId,authorization: String(response.data.data.data)}
        teamApi.submitDataToP3(P1Data).then(response => {
          console.log("发送结果到课题三状态："+response.data.data.msg)
        })
      })
      teamApi.submitDataToP1(this.projectId).then(response => {
        console.log("发送结果到课题一状态："+response.data.data.message)
        let jsonData = {projectId:this.projectId,statusCode:113}
        teamApi.pushLogData(jsonData).then(response => {
          console.log(response.data.data.data)
          jsonData.statusCode = 114
          teamApi.pushLogData(jsonData).then(response => {
            console.log(response.data.data.data)
          })
        })
      })

      this.timer2 = setTimeout(() => {
        let jsonData2 = {projectId:this.projectId,statusCode:115}
        teamApi.pushLogData(jsonData2).then(response => {
          console.log(response.data.data.data)
        })
      }, 3000)

      this.timer = setTimeout(() => {
        teamApi.submitDataToP6(this.projectId).then(response => {
          console.log("发送结果到课题六状态："+response.data.data.data)
          if(response.data.data.code == 200){
            this.clearCookie();
            window.location.href = "/"
          }
        })
      }, 10000)
    },
    outPut(){
      if(cookie.get("projectId")){
        //this.autoCal();
        this.projectId=cookie.get("projectId")
        window.open("http://111.229.115.234:8089/excel/down/"+this.projectId, "_blank");
      }
    },
    outPut1(){
      outPutApi.downloadGeneratedFile().then(response => {
        var nowTime = new Date().getTime()
        const link=document.createElement("a");
        let blob=new Blob([response.data], { type: "application/octet-stream" }); //类型excel
        link.style.display="none";
        link.href=URL.createObjectURL(blob);
        link.setAttribute("download", '炮孔布置图'+nowTime+'.dxf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })

    },
    clearCookie(){
      var cookies = document.cookie.split(";")
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim(); // 去除前后空格
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }
    }
  },
  mounted(){

  },
}
</script>

<style>

</style>
