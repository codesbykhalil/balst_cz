<template>
    <div class="card2_1">
      <div>
      <h2 class= title-before  style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: black;margin-left: 40px;">4 岩石结构面</h2><br>
        <h3 class="font-size" style="text-align:center;margin-bottom: 15px;">粗糙程度</h3>
      <section class="wrapper">
        <div style="margin-left: 25px;display: flex">
        <div class="face-info" v-for="(item,index) in dataset1" :key="index">
          <img :src="require('@/assets/img/unshaped/'+item.desc1)" style="object-fit: scale-down" height="100" width="200" alt="描述图片">
        </div>
        </div>

        <br>
        <div class="center_1"  v-for="(item,index) in dataset1" :key="index+'1'">
        <el-button style="margin-left: 80px;" type="primary"
                   @click="addSum(item.sc1,1)" :disabled="disable1" round>{{item.sc1}}</el-button>
        </div>
      </section>
      <br>
      <hr style="width: 1180px;margin-left: 45px; border: 1px solid #000000 ">
      <br>

      <h3 class="font-size" style="text-align:center">风化程度</h3><br>
      <section class="wrapper">
        <div style="margin-left: 10px;display: flex">
        <div class="face-info2" v-for="(item,index) in dataset2" :key="index">
          <img :src="require('@/assets/img/efflorescent/'+item.desc2)" style="object-fit:scale-down" height="130" width="220" alt="描述图片">
        </div>
        </div>
        <div class="center_1" v-for="(item,index) in dataset2" :key="index+'1'">
        <el-button style="margin-left: 80px;" type="primary"
                   @click="addSum(item.sc2,2)" :disabled="disable2" round>{{item.sc2}}</el-button>
        </div>
      </section>
      <br>
      <hr style="width: 1180px;margin-left: 45px; border: 1px solid #000000 ">
      <br>

      <h3 class="font-size" style="text-align:center">胶结程度</h3><br>
      <section class="wrapper">
        <div style="margin-left: 25px;display: flex">
        <div class="face-info" v-for="(item,index) in dataset3" :key="index">
          <img :src="require('@/assets/img/glue/'+item.desc3)" style="object-fit: scale-down" height="100" width="200" alt="描述图片">
        </div>
        </div>
        <div class="center_1" v-for="(item,index) in dataset3" :key="index+'1'">
        <el-button style="margin-left: 80px" type="primary"
          @click="addSum(item.sc3,3)" :disabled="disable3" round>{{item.sc3}}</el-button>
        </div>
      </section>
      <br>
    </div>

      <div style="width: auto;margin-top: 10px">
         <span slot="label" style="font-size: 18px;width: 400px;margin-left:58px ">
           <strong>您判定的岩体结构面分值：</strong>
         </span>
        <br>
        <div class="proovr-collect__tags" style="display: flex;width: 1200px; align-items: center;margin-left: 58px">
          <el-input v-model="structuralPlaneScore" style="width:1100px;margin-right: 10px;"></el-input>
          <span @click="check" class="proovr-collect__tag" style="margin-right: 10px;">确认</span>
          <!--                <span @click="reset" class="proovr-collect__tag" >重置</span>-->
        </div>
      </div>
    </div>
</template>

<script>
import {eventBus} from "../../plugins/nuxt-elementui";
import cookie from 'js-cookie'

export default {
  data(){
    return{
     dataset1:[{desc1:'5.png',sc1:"崎岖：5"},
       {desc1:'4.png',sc1:"波状：4"},
       {desc1:'3.png',sc1:"粗糙：3"},
       {desc1:'2.png',sc1:"稍凹凸：2"},
       {desc1:'1.png',sc1:"平直：1"}],

     dataset2:[{desc2:'5.png',sc2:"未风化：5"},
       {desc2:'4.png',sc2:"微风化：4"},
       {desc2:'3.png',sc2:"中风化：3"},
       {desc2:'2.png',sc2:"强风化：2"},
       {desc2:'1.png',sc2:"全风化：1"}],

     dataset3:[{desc3:'5.png',sc3:"极强胶结:5"},
       {desc3:'4.png',sc3:"强胶结:4"},
       {desc3:'3.png',sc3:"中胶结:3"},
       {desc3:'2.png',sc3:"弱胶结:2"},
       {desc3:'1.png',sc3:"无胶结:1"}],

      structuralPlaneScore: 9,
      disable1: false,
      disable2: false,
      disable3: false,
      rockId:'',
      ucs:'',
      structureScore:'',
    }
  },
  mounted(){
    //回显上台阶数据
    if(cookie.get('upData')){
      let upData = JSON.parse(cookie.get('upData'));
      this.structuralPlaneScore=upData.structuralPlaneScore;
      this.check()
    }
  },
  created() {
      //云端文件导入回显
      eventBus.$on('cloudFiles',(data)=>{
        if(data!=null){
          this.structuralPlaneScore = data.structuralPlaneScore;
          eventBus.$emit('structuralPlaneScore_updated',{structuralPlaneScore:this.structuralPlaneScore});
        }
      });
    },
  beforeDestroy() {
    eventBus.$off('cloudFiles');
  },
  methods:{
    addSum(scor,dis){
      this.structuralPlaneScore=this.structuralPlaneScore+scor;
      if(dis==1)
      this.disable1=true;
      else if(dis==2)
      this.disable2=true;
      else if(dis==3)
      this.disable3=true;
    },
    reset(){
      this.structuralPlaneScore=0;
      this.disable1=false;
      this.disable2=false;
      this.disable3=false;
    },
    check(){
      if(this.structuralPlaneScore){
        // this.$router.push ({ path:'/method1/pagefivesixseven',
        // query: { rockId:this.rockId,ucs:this.ucs,
        // structureScore:this.structureScore,structuralPlaneScore:this.structuralPlaneScore } })
        eventBus.$emit('structuralPlaneScore_updated',{structuralPlaneScore:this.structuralPlaneScore});
        console.log(this.structuralPlaneScore);
      }
    }
  }
}
</script>

<style >
.card2_1{
  height: auto;
  width: 1280px;
  border-radius: 20px; /* 设置圆角为10像素 */
  background-color: white;
}
.card2_1:hover{
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
}
.face-info{
  margin-right:45px;
//border: 1px solid black;
  width: 200px;
  height: 130px;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  margin-bottom: 5px; /* 调整描述信息和按钮之间的间距 */
}

.face-info2{
  margin-right:25px;
//border: 1px solid black;
  width: 220px;
  height: 130px;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  margin-bottom: 5px; /* 调整描述信息和按钮之间的间距 */
}

.button-style{
  margin-left: 80px;
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
  flex-direction: column; /* 设置为纵向排列 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  text-align: center; /* 文字水平居中 */
}

</style>
