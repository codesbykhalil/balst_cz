<template>
  <div class="card8_1">
    <div>
      <div style="padding-right: 20px" class="icon_title_1">
        <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;">5-爆破方案导出</h2>
      </div>
      <div style="display: flex; align-items: center;justify-content: center;margin-left: 130px;">
        <span @click="outPut" class="draw_button" style="margin-top: 20px;margin-left: 63px;">导出炮孔信息表格(xlsx文件)</span>
        <span @click="outPut1" class="draw_button" style="margin-top: 20px;margin-left: 450px;">导出炮孔布置图（dxf文件）</span>
      </div>
  </div>
  </div>
</template>

<script>
import '~/assets/css2/pages.css'
import cookie from 'js-cookie'
import outPutApi from '@/api/outPut.js'
import {Input} from "element-ui";
export default {
  computed: {
    Input() {
      return Input
    }
  },
    data(){
        return{
            projectId:'',
        }
    },
    methods:{
        outPut(){
          if(cookie.get("mdProjectId")){
            this.projectId=cookie.get("mdProjectId")
            window.open("http://111.229.115.234:8099/excel/down/"+this.projectId, "_blank");
            // outPutApi.down(this.projectId).then(response =>{
            // //   console.log("导出成功")
            // })
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

      }
    }
}
</script>

<style>
</style>
