<template>
  <div>
    <div class="card5_1">
      <h2 class=title-before
          style="margin-top: 21px;padding-top:21px;font-size: 20px;!important
          ;color: white;margin-left: 40px;">1
        岩石种类</h2><br><br>
      <h3 class="font-type7" style=" margin-top: -30px;color: white">
        <strong>岩石种类：</strong>
        <el-input style="width:1167px;margin-top: 10px;margin-bottom: 35px" v-model="rockspecies"></el-input>
      </h3>
    </div>
  </div>

</template>

<script>
import rockTypeApi from '@/api/getspecies.js'
import calculateApi from '@/api/calculate.js'
import cookie from 'js-cookie'
import axios from 'axios'; // 引入 axios 库
import connAnoSerApi from "@/api/connAnoSer";
import {eventBus} from "../../plugins/nuxt-elementui";
import teamApi from "@/api/team";
export default {
  data(){
    return{
      uploadedFilePath: '',
      uploadSuccess: false,
      ucs:'',
      // rockspecies:'花岗岩',
      rockspecies:null,
      rockId:'18',
      getData:[],         //辅助数组
      lithology:null,
      multipleSelection: []
    }
  },
  // created(){
  //   rockTypeApi.getRockType().then(response => {
  //     this.getData = response.data.data
  //
  //     this.getData.map((item) => {
  //       if(item.type_code == '002001'){
  //         this.Sedimentary.push({id:item.id,name:item.name,})
  //       }else if(item.type_code == '002002'){
  //         this.Igneous.push({id:item.id,name:item.name,})
  //       }else if(item.type_code == '002003'){
  //         this.Metamorphic.push({id:item.id,name:item.name,})
  //       }
  //     });
  //   })
  // },
  created(){
    eventBus.$on('cloudFiles',(data)=>{
      this.rockspecies = data.lithology || this.rockspecies;
      this.rockId = data.rockId || this.rockId;
    });
    teamApi.getNewProject1Info().then(response => {
      console.log("classifyInfo", JSON.stringify(response.data.data));
      this.project1Info = response.data.data;
      this.rockspecies = this.project1Info.lithology
    });
    // rockTypeApi.getRockType().then(response => {
    //   this.getData = response.data.data

    //   this.getData.map((item) => {
    //     if(item.type_code == '002001'){
    //       this.Sedimentary.push({id:item.id,name:item.name})
    //     }else if(item.type_code == '002002'){
    //       this.Igneous.push({id:item.id,name:item.name})
    //     }else if(item.type_code == '002003'){
    //       this.Metamorphic.push({id:item.id,name:item.name})
    //     }
    //   });
    // })
  },
  destroyed() {
    eventBus.$off('cloudFiles');
  },
}
</script>

<style>
/*.title-front{*/
/*    margin-top: 21px;*/
/*    !*与左边时间线显示一致*!*/
/*    font-size: 20px !important;*/
/*  color: black;*/
/*}*/
.card1{
  height: auto;
  width: 1280px;
  color: black;
  border-radius: 20px; /* 设置圆角为10像素 */
  background-color: white;
}
.card1:hover{
//box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  box-shadow: rgba(0, 0, 0, 0.65) 0px 8px 20px;
}
.title-front2{
  font-size: 15px !important;
  margin: 10px 170px;
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
  width: 990px;
  height: 40px;
  margin-left: 17px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
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
</style>
