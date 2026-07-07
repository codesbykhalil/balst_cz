<template>
  <div>
    <div  style="width: 1450px;height: 600px">
      <h2 class= title-before style="margin-top: 21px;font-size: 20px;!important;color: black;margin-left: 40px;">15 爆破成本计算</h2>

      <el-button style="margin-top:20px;width:200px" @click="calculate()" type="primary">计算成本</el-button>

      <div style="height:auto;">
        <!-- 表格2开始 -->
        <tables :holeData="holeData" :key="timer"/>
        <!-- 表格2结束 -->
      </div>
      <div>
        <h3   style=" margin-left: 40px;
                font-size: 18px !important;
                width: 400px;margin-top: 12px">合计:
          <el-input style="width:150px" v-model="AllCost" :readonly="true"></el-input>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css2/pages.css'
import cookie from 'js-cookie'
import tables from '../utilPage/pageTwelve/table.vue'
import surroundingHolesApi from '@/api/surroundingHoles.js'
import cuttingApi from '@/api/cutting.js'
import auxiliaryHolesApi from '@/api/auxiliaryHoles.js'
export default {
    components:{tables},
    data(){
        return{
            projectId:'',
            holeData:[],
            holeDataMir:[],
            AllCost:0,
            i:0,
            timer: '',

            cuttingHoles:[],
            surroundingHoles:[],
            auxHoles:[],
        }
    },
    methods:{
        calculate(){
            // this.projectId = '1695249792384970753'
            this.projectId = cookie.get("projectId");
            this.i = 0;
            this.timer = new Date().getTime()
            this.holeData =this.holeData.slice(0,0);
            this.holeDataMir =this.holeDataMir.slice(0,0);
        },
    }
}
</script>

<style>
</style>
