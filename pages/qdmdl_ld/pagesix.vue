<template>
  <div class="card5_1">

    <h2 class="title-before" style="margin-top: 21px; padding-top: 21px; font-size: 20px !important; color: white; margin-left: 40px; margin-bottom: 40px;">6 岩体可爆性</h2>
    <div style="margin-top: -30px;padding-bottom: 20px">

      <h3 class="font-type7" style="color: white"><strong>根据参数判识的岩体可爆性等级：</strong>
        <el-input class="el-input" style="margin-top:10px;width:1168px"  v-model="rockLevel"><template slot="suffix"></template></el-input>
      </h3>
      <!--      <el-input style="width:875px" v-model="indexNum" :disabled="true"></el-input>-->
    </div>
    <!--    <div>-->
    <!--      <h3 class="font-type7" style="color: white"><strong>根据随钻参数判识的岩体可爆性指数：</strong>-->
    <!--        <el-input style="margin-top:10px;width:1168px"  v-model="indexNum1"><template slot="suffix"></template></el-input>-->
    <!--      </h3>-->
    <!--    </div>-->
    <!--    <br/>-->

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
      rockLevel:'',
      diameter: 50,
      advance: '',
      density: '',
      burstSpeed: '',
      explosivityIndexObj:{}, //计算岩石普氏可爆性指数
      saveProjectMessage:{},
    }
  },
  created(){
    eventBus.$on('cloudFiles',(data)=>{
      // console.log("ucs"+data.ucs);
      this.getExplosiveClass(data.rockLevel || data.rockLEvel || data.classify);
      this.indexNum = data.explosivityIndex || this.indexNum;
      const datas = {
          "rockId": data.rockId,
          "ucs": data.ucs * 1000000,
          "structureScore": data.structureScore,
          "structuralPlaneScore": data.structuralPlaneScore,
          "rockLEvel": ""
      }

        calculateApi.get_exp_class(datas).then(response => {
        this.rockLevel = response.data.data;
        console.log("岩石等级为3"+JSON.stringify(this.rockLevel))
      })
    });
    eventBus.$on('dataToSendEvent',(data)=>{
      console.log("data.indexNum"+data);
      this.indexNum = data.dataToSend.indexNum;
    })

    const dataToSend = this.getRouteDataToSend();
    let str = dataToSend.rockLevel || dataToSend.rockLEvel || this.$route.query.rockLevel || this.$route.query.rockLEvel;
    if (!str) {
      console.warn("未从 route 参数中读取到 rockLevel");
      return;
    }
    this.getExplosiveClass(str);

    this.indexNum = dataToSend.indexNum || this.$route.query.indexNum || this.indexNum;
  },
  destroyed() {
    eventBus.$off('dataToSendEvent');
    eventBus.$off('cloudFiles');
  },
  mounted() {

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
      },
      immediate: true
    }
  },
  methods: {
    getExplosiveClass(rockLevel) {
      if (!rockLevel) {
        console.warn("未读取到用于计算可爆性等级的岩石等级");
        return;
      }
      let obj = {rockLEvel: rockLevel}
      console.log("岩石等级为"+JSON.stringify(rockLevel))
      calculateApi.get_exp_class(obj).then(response => {
        this.rockLevel = response.data.data;
        console.log("岩石等级为2"+JSON.stringify(response.data))
      })
    },
    getRouteDataToSend() {
      const routeData = this.$route.query.dataToSend;
      if (!routeData) {
        return {};
      }
      if (typeof routeData === 'string') {
        try {
          return JSON.parse(routeData);
        } catch (error) {
          console.warn("dataToSend 不是有效 JSON", routeData);
          return {};
        }
      }
      return routeData;
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
.el-input {

  height: 52px;

  border-radius: 8px;
}
.el-input__inner {
  height: 52px;
  background: #1e3658;
  font-size: 14 px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: white;
}
</style>
