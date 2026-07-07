<template>
  <div>
    <div class="card5_1">
      <h2  class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;
      color: white;margin-left: 40px;">5 隧道地应力(隧道埋深或地应力2选1填写)</h2><br><br>
      <!--        <div class="strength-div">-->
      <h3 style="
              font-size: 18px !important;
              width: 400px;margin-left: 45px;margin-top: -30px;padding-bottom: 20px;color: white"><strong>隧道中心到地表距离：</strong>
        <el-input style="width:1167px;margin-top: 10px;" v-model="strength1" ><template slot="suffix">M</template></el-input>
      </h3>
      <!--        </div>-->
      <h3   style=" margin-left: 45px;
                font-size: 18px !important;
                width: 400px;padding-bottom: 20px;color: white"><strong>该处最大地应力值：</strong>
        <el-input style="width:1167px;margin-top: 10px" v-model="strength2"><template slot="suffix">MPa</template></el-input>
      </h3>
    </div>
  </div>
</template>

<script>
import calculateApi from '@/api/calculate.js'
import cookie from 'js-cookie'
import {eventBus} from "../../plugins/nuxt-elementui";

export default {
  name: "pagefive",
  data() {
    return {
      strength1: '200',
      strength2: 5.1,
    }
  },
  mounted() {
    //回显上台阶数据
    if(cookie.get('upData')){
      let upData = JSON.parse(cookie.get('upData'));
      // console.log("upData"+JSON.stringify(upData.buriedDeep))
      if(upData.buriedDeep!='')
        this.strength1=upData.buriedDeep
      else if(upData.initialGroundStress!='')
        this.strength2=upData.initialGroundStress*0.000001
    }else{
      // 异步加载数据
      this.loadData()
        .then(() => {
          // 数据加载完成后，调用 sendDataToB 方法，将默认值传递给 pageseven 组件
          this.sendDataToB();
        })
        .catch(error => {
          console.error('Error loading data:', error);
        });
    }
  },
  created() {
    //云端文件导入回显
    eventBus.$on('cloudFiles',(data)=>{
      if(data!=null){
        this.strength1 = data.buriedDeep;
        this.strength2 = data.initialGroundStress/1000000;
        eventBus.$emit('s12_updated',{strength1: this.strength1,strength2: this.strength2});
      }
    });
  },
  beforeDestroy() {
    eventBus.$off('cloudFiles');
  },
  methods: {
    loadData() {
      // 模拟异步数据加载，可以替换成实际的数据加载逻辑
      return new Promise((resolve, reject) => {
        // 假设在这里进行异步数据加载
        setTimeout(() => {
          // 模拟加载成功
          this.strength1 = '200';
          this.strength2 = 5.1;
          resolve(); // 数据加载成功时调用 resolve
        }, 2000); // 模拟2秒的加载时间
      })},
    sendDataToB() {
      eventBus.$emit('s12_updated', {
        strength1: this.strength1,
        strength2: this.strength2
      });
    }
  },
  watch: {
    strength1(newVal) {
      this.strength2 = newVal !== '' ? newVal * 2550 * 10 * 0.000001 : 1085.25;
      this.sendDataToB();
    },
    strength2(newVal) {
      this.sendDataToB();
    }
  },
}
</script>

<style>
.title-front{
  margin-top: 50px;
  font-size: 40px !important;
}
.card1{
  height: 600px;
  width: 100%;
}
.card5{
  height: auto;
  width: 100%;
}
.strength-div{
  display:inline-block;
  width: 500px;
  height: auto;
}

.font-type3{
  margin-left: 50px;
  font-size: 30px !important;
  width: 1200px;
}
.index_title{
  margin-top: 21px;
  color: #FFFFFF;
  line-height: 34px;
  letter-spacing: 1px;
  text-shadow: 0px 0px 12px #54ADFF;
  padding-top:21px;
  margin-left: 40px;
  width: 400px;
  height: 30px;
  font-weight: 400;
  font-size: 18px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient( 97deg, #008DFF 0%, rgba(0,68,122,0) 100%);

}

</style>

