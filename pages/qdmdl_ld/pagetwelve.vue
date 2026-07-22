<template>
  <div class="card5_1">
    <div>
      <h2 class="title-before" style="margin-top: 21px;padding-top:21px;
      font-size: 20px !important;color: white;margin-left: 40px;">12 装药量计算</h2>
<!--      <div class="proovr1-collect__tags" style="display: flex; align-items: center;">-->
<!--        <span class="proovr1-collect__tag" style="margin:30px 0 0 585px;width:90px" @click="calculate()">炮孔统计制表</span>-->
<!--      </div>-->
      <div style="height:auto; margin: 30px 0 0 63px">
        <!-- 表格2开始 -->
        <tables :holeData="holeData" :key="timer"/>
        <!-- 表格2结束 -->
      </div>
      <div>
        <h3   style=" margin-left: 63px;
                font-size: 18px !important;
                width: 400px;margin-top: 15px;color: white"><strong>设计总药量为:</strong><br/>
          <el-input style="width:1160px;margin-top: 10px" v-model="AllExplosiveAmount" readonly></el-input>
        </h3>
        <h3   style=" margin-left: 52px;margin-top: 10px;
                font-size: 18px !important;
                width: 400px;color: white;margin-bottom: 15px">&ensp;<strong>设计单耗值为:</strong><br/>
          <el-input style="width:1160px;margin-left: 10px;margin-top: 10px" v-model="unitCon" readonly></el-input>
        </h3>
        <div  style="display: flex; align-items: center;">
        <span @click="calculate" class="draw_button" style="margin:30px 0 20px 595px">计算</span>
        </div>
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
import calculateApi from '@/api/calculate.js'
import {eventBus} from "../../plugins/nuxt-elementui";
export default {
  components:{tables},
  data(){
    return{
      drugWeight:'',
      drugWidth:'',
      unitCon:0,
      projectId:'',
      holeData:[],
      holeDataMir:[],
      AllExplosiveAmount:0,
      i:0,
      timer: '',

      cuttingHoles:[],
      surroundingHoles:[],
      auxHoles:[],
    }
  },
  created(){
    //云端文件导入回显
    eventBus.$on('cloudFileHoles',(data)=>{
      this.AllExplosiveAmount=0;
      this.unitCon=0;
      this.calculate();
    });
  },

  methods:{
    calculate(){
      // this.projectId = '1695249792384970753'
      this.projectId = cookie.get("projectId");
      this.i = 0;
      this.timer = new Date().getTime()
      //清空数组
      this.holeData = [];
      this.holeDataMir = [];
      this.cal1()
      calculateApi.getUnitCon(this.projectId).then(response => {
        console.log(response.data.data);
        this.AllExplosiveAmount = response.data.data.totalExplosiveAmount;
        this.unitCon = response.data.data.unitCon;
      })

    },

    //查询掏槽孔
    cal1(){
      cuttingApi.getCuttingHoles(this.projectId).then(response => {
        this.cuttingHoles = response.data.data;
        console.log(this.cuttingHoles);
        this.cuttingHoles.map((item) => {
          this.i=this.i+1;
          if(item.cuttingNum==0){
            this.holeDataMir.push({holeNum:this.i,holeStyle:'一级掏槽孔', x1:item.x1, y1:item.y1,
              z1:item.z1,x2:item.x2, y2:item.y2, z2:item.z2, explosiveAmount:item.explosiveAmount,rolling_count:item.rollingCount})
            // this.AllExplosiveAmount+=item.explosiveAmount;
          }else if(item.cuttingNum==1){
            this.holeDataMir.push({holeNum:this.i,holeStyle:'二级掏槽孔', x1:item.x1, y1:item.y1,
              z1:item.z1,x2:item.x2, y2:item.y2, z2:item.z2, explosiveAmount:item.explosiveAmount,rolling_count:item.rollingCount})
            // this.AllExplosiveAmount+=item.explosiveAmount;
          }else if(item.cuttingNum==2){
            this.holeDataMir.push({holeNum:this.i,holeStyle:'三级掏槽孔', x1:item.x1, y1:item.y1,
              z1:item.z1,x2:item.x2, y2:item.y2, z2:item.z2, explosiveAmount:item.explosiveAmount,rolling_count:item.rollingCount})
            // this.AllExplosiveAmount+=item.explosiveAmount;
          }else if(item.cuttingNum==3){
            this.holeDataMir.push({holeNum:this.i,holeStyle:'四级掏槽孔', x1:item.x1, y1:item.y1,
              z1:item.z1,x2:item.x2, y2:item.y2, z2:item.z2, explosiveAmount:item.explosiveAmount,rolling_count:item.rollingCount})
            // this.AllExplosiveAmount+=item.explosiveAmount;
          }else if(item.cuttingNum==4){
            this.holeDataMir.push({holeNum:this.i,holeStyle:'五级掏槽孔', x1:item.x1, y1:item.y1,
              z1:item.z1,x2:item.x2, y2:item.y2, z2:item.z2, explosiveAmount:item.explosiveAmount,rolling_count:item.rollingCount})
            // this.AllExplosiveAmount+=item.explosiveAmount;
          }else if(item.cuttingNum==-1){
            this.holeDataMir.push({holeNum:this.i,holeStyle:'掏槽孔(解炮孔)', x1:item.x1, y1:item.y1,
              z1:item.z1,x2:item.x2, y2:item.y2, z2:item.z2, explosiveAmount:item.explosiveAmount,rolling_count:item.rollingCount})
            // this.AllExplosiveAmount+=item.explosiveAmount;
          }else if(item.cuttingNum==-2){
            this.holeDataMir.push({holeNum:this.i,holeStyle:'掏槽孔(小掏槽)', x1:item.x1, y1:item.y1,
              z1:item.z1,x2:item.x2, y2:item.y2, z2:item.z2, explosiveAmount:item.explosiveAmount,rolling_count:item.rollingCount})
            // this.AllExplosiveAmount+=item.explosiveAmount;
          }
        })
        this.cal2()
      })
    },
    //查询周边孔
    cal2(){
      surroundingHolesApi.readSurrounding(this.projectId).then(response => {
        this.surroundingHoles = response.data.data;
        this.surroundingHoles.map((item) => {
          this.i=this.i+1;
          // this.AllExplosiveAmount+=item.explosiveAmount;
          this.holeDataMir.push({holeNum:this.i,holeStyle:'周边孔', x1:item.x1, y1:item.y1,
            z1:item.z1,x2:item.x2, y2:item.y2, z2:item.z2, explosiveAmount:item.explosiveAmount,rolling_count:0})
        })
        this.cal3()
      })
    },
    //查询辅助孔
    cal3(){
      auxiliaryHolesApi.readAuxHoles(this.projectId).then(response => {
        this.auxHoles = response.data.data;
        // console.log(JSON.stringify(this.auxHoles))
        this.auxHoles.map((item) => {
          this.i=this.i+1;

          this.holeDataMir.push({holeNum:this.i,holeStyle:'辅助孔', x1:item.x1, y1:item.y1,
            z1:item.z1,x2:item.x2, y2:item.y2, z2:item.z2, explosiveAmount:item.explosiveAmount,rolling_count:item.rollingCount})
        })
        // 将总药量限制为小数点后两位
        this.AllExplosiveAmount = parseFloat(this.AllExplosiveAmount).toFixed(2);
        this.holeData = this.holeDataMir;
      })
    },
  },
  mounted() {
    this.calculate();
    eventBus.$on('autoMode', (data)=>{
      if(data.autoStep == 5){
        setTimeout(() => {
          this.calculate();
          setTimeout(() => {
            eventBus.$emit('autoMode',{autoStep:6})
          },1000);
        },1000);
      }
    })
  },
  beforeDestroy() {
    eventBus.$off('cloudFileHoles');
    eventBus.$off('autoMode');
  },
}
</script>

<style>
.is-Active{
  color: #409EFF;
}
.el-table__body-wrapper {
  border-collapse: separate;
  border-spacing: 0;
}

.el-table__body-wrapper tr {
  border-bottom: 1px solid #8caddb; /* 添加水平分隔线 */
}

.el-table__body-wrapper td {
  border-right: 1px solid #8caddb; /* 添加垂直分隔线 */
}

.el-table--border::after, .el-table--group::after, .el-table::before{
  background-color: rgba(35,73,109,1);
}
</style>
