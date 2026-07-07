<template>
  <div class="card5_1">
    <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: black;margin-left: 40px;">6 岩体可爆性</h2><br><br>
    <div style="margin-top: -30px;padding-bottom: 12px">

      <h3 class="font-type7"><strong>根据上述输入参数计算岩体可爆性指数:</strong>
        <el-input style="margin-top:10px;width:1168px" :disabled="true" v-model="indexNum"><template slot="suffix"></template></el-input>
      </h3>
      <!--      <el-input style="width:875px" v-model="indexNum" :disabled="true"></el-input>-->
    </div>
    <div>
      <h3 class="font-type7"><strong>输入随钻参数智能识别岩体可爆性指数:</strong>
        <el-input style="margin-top:10px;width:1168px" :disabled="true" v-model="indexNum1"><template slot="suffix"></template></el-input>
      </h3>
    </div>
    <br/>

  </div>
</template>

<script>
import calculateApi from '@/api/calculate.js'
import cookie from 'js-cookie'
import {eventBus} from "../../plugins/nuxt-elementui";
export default {
  name:"pagesix",
  data () {
    return {
      strength1:'',
      strength2:3,
      indexNum: '',
      indexNum1:'',
      diameter: 50,
      advance: '',
      density: '',
      burstSpeed: '',
      explosivityIndexObj:{}, //计算岩石普氏可爆性指数
      saveProjectMessage:{},
    }
  },
  created(){
    eventBus.$on('ucs_updated',(data)=>{
      this.indexNum = data.ucs/10000000;
    })
    // this.indexNum = this.$route.query.ucs/10;

    //云端文件导入回显
      eventBus.$on('cloudFiles',(data)=>{
        if(data!=null){
          this.indexNum = data.explosivityIndex;
          eventBus.$emit('index_updated',{indexNum :this.indexNum});
        }
      });
   },
   destroyed() {
    eventBus.$off('ucs_updated');
    eventBus.$off('cloudFiles');
   },
   mounted() {
    //  eventBus.$on('dataToSendEvent',(data)=>{
    //    this.indexNum = data.indexNum;
    //  })
    //回显上台阶数据
      if(cookie.get('upData')){
        let upData = JSON.parse(cookie.get('upData'));
        this.indexNum =upData.explosivityIndex;
      }
   },
    watch:{
         indexNum:{
         handler(newVal,oldVal){
         eventBus.$emit('index_updated',{indexNum :this.indexNum});
            // this.indexNum = this.$route.params.indexNum;
      },
      immediate: true
     }
   },

}
</script>

<style>
.title-front{
  margin-top: 50px;
  font-size: 40px !important;
}

.card5{
  height: auto;
  width: 100%;
}
.strength-div{
  display:inline-block;
  width: 600px;
  height: auto;
}

.font-type2{
  margin-left: 30%;
  font-size: 30px !important;
  width: 400px;
}
</style>
