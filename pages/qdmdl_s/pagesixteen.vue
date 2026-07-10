<template>
  <div class="card_sixteen">
    <div>
      <div style="padding-right: 20px" class="icon_title11">
        <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;">16-爆破方案导出</h2>
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
          if(cookie.get("projectId")){
            this.projectId=cookie.get("projectId")
            window.open("http://111.229.115.234:8090/excel/down/"+this.projectId, "_blank");
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
.card_sixteen{
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
  width: 1280px;
  border-radius: 20px;
  background-color: white;
  background-image: url('@/assets/img/ui/Rectangle 2@2x(3).png');
  background-size: 100% 100%; /* 使背景图像宽度和高度都为容器的100% */
  background-position: top center; /* 确保背景图像从顶部开始 */
  background-attachment: local; /* 背景图像与元素的滚动一致 */
  padding-top: 0px;
}
</style>
