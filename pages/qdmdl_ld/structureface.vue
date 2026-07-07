<template>
  <div class="card5_1">
    <h2 class=title-before
        style="margin-top: 21px;padding-top:21px;font-size: 20px;!important
          ;color: white;margin-left: 40px;">4
      岩体结构面</h2><br><br>
    <h3 class="font-type7" style=" margin-top: -30px;color: white">
      <strong>岩体结构面分值：</strong>
      <el-input style="width:1167px;margin-top: 10px;margin-bottom: 35px" v-model="structuralPlaneScore14"></el-input>
    </h3>
  </div>
</template>

<script>
import {eventBus} from "../../plugins/nuxt-elementui";
import teamApi from "@/api/team";
import cookie from "js-cookie";

export default {
  data(){
    return{
      structuralPlaneScore14:14,
      structuralPlaneScore:null,
      disable1: false,
      disable2: false,
      disable3: false,
      rockId:'',
      ucs:'',
      // structureScore:'',
    }
  },
  created() {
    eventBus.$on('cloudFiles',(data)=>{
      if (data.structuralPlaneScore !== undefined && data.structuralPlaneScore !== null) {
        this.structuralPlaneScore = data.structuralPlaneScore;
        this.structuralPlaneScore14 = data.structuralPlaneScore;
      }
      this.rockId = data.rockId || this.rockId;
      this.ucs = data.ucs || this.ucs;
    });
    teamApi.getNewProject1Info().then(response => {
      this.project1Info = response.data.data;

      cookie.set("classifyInfo", this.project1Info);
      const classifyInfo = this.project1Info;
      this.testData2 = this.project1Info;

      let str = classifyInfo.Rc.match(/\b\d+\.(\d)\b/g);
      str = (Number(str[0])+Number(str[1]))/2;
      this.rockstrength = str;
      this.indexNum = parseFloat((this.ucs / 10).toFixed(2));
      if (classifyInfo.integrity=="完整") {
        this.structureScore = 16
      } if (classifyInfo.integrity=="较完整"){
        this.structureScore = 14
      } if (classifyInfo.integrity=="较破碎"){
        this.structureScore = 11
      } if(classifyInfo.integrity == "破碎"){
        this.structureScore = 8
      }if(classifyInfo.integrity == "极破碎") {
        this.structureScore = 5
      }

      if (classifyInfo.rockWeather == "未风化"){
        this.structuralPlaneScore = 15
      } if (classifyInfo.rockWeather == "微风化"){
        this.structuralPlaneScore = 12
      } if (classifyInfo.rockWeather == "弱风化"){
        this.structuralPlaneScore = 9
      } if (classifyInfo.rockWeather == "强风化"){
        this.structuralPlaneScore = 6
      } if (classifyInfo.rockWeather == "全风化"){
        this.structuralPlaneScore = 3
      }
      //新增
      this.rockLEvel = classifyInfo.classify;
    });
  },
  destroyed() {
    eventBus.$off('cloudFiles');
  },
//   mounted(){
//     this.rockId= this.$route.query.rockId;
//     this.ucs= this.$route.query.ucs;
//     this.structureScore= this.$route.query.structureScore;
//   },
//   methods:{
//     addSum(scor,dis){
//       this.structuralPlaneScore=this.structuralPlaneScore+scor;
//       if(dis==1)
//         this.disable1=true;
//       else if(dis==2)
//         this.disable2=true;
//       else if(dis==3)
//         this.disable3=true;
//     },
//     reset(){
//       this.structuralPlaneScore=0;
//       this.disable1=false;
//       this.disable2=false;
//       this.disable3=false;
//     },
//     check(){
//       if(this.structuralPlaneScore){
//         // this.$router.push ({ path:'/method1/pagefivesixseven',
//         // query: { rockId:this.rockId,ucs:this.ucs,
//         // structureScore:this.structureScore,structuralPlaneScore:this.structuralPlaneScore } })
//         eventBus.$emit('structuralPlaneScore_updated',{structuralPlaneScore:this.structuralPlaneScore});
//         console.log(this.structuralPlaneScore);
//       }
//     }
//   }
}
</script>

<style >
.card2{
  height: auto;
  width: 1280px;
  border-radius: 20px; /* 设置圆角为10像素 */
  background-color: white;
}
.card2:hover{
  box-shadow: rgba(0, 0, 0, 0.65) 0px 8px 20px;
}
.font-size{
  font-size: 18px !important;
}
.wrapper{
  width: 1170px;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 21px;
}
.face-info{
  width: 20%;

}
.button-style{
  margin-left: 80px;
}
.title-before{
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #000;
  position: relative;
  padding-left: 12px;
  margin-right: 16px;
}
.title-before:before {
  position: absolute;
  width: 4px;
  height: 16px;
  background: #0052d9;
  left: 0;
  top: 26px;
  content: "";
}
.divider-line {
  position: center;
  text-align: center;
  margin: 20px 600px;
  border: 1px solid black;
  width:80px ;
  border-left: none;
  border-right: none;
  padding-top: 2px;
  padding-bottom: 2px;
}
.center_1{
  margin-top: 10px;
  width: 210px;
  display: flex;

}
.multi-line-text {
  width: 150px;
  padding-left: 35px;
  font-size: 15px;
  white-space: normal; /* 允许文本自动换行 */
}
</style>
