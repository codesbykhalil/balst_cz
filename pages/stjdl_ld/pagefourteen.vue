<template>
  <div class="card5_1">
    <div>
      <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;">14 爆破效果预测</h2>

      <!-- 第一部分开始 -->
      <div>
        <!--         表格填入开始 -->
        <div style="margin-left:66px">
          <!--          <tables/>-->
          <div>
            <!--            <div class="proovr1-collect__tags" style="display: flex; align-items: center;">-->
            <!--              <span @click="predict2()" class="proovr1-collect__tag" style="margin:20px 0 0px 470px">周边孔超挖量和爆破块度预测</span>-->
            <!--            </div>-->
            <h3 class="font-type8" style="color: white"><strong>线性超挖预测值为：</strong>
              <br>
              <el-input style="width:1167px;margin-top: 10px;" v-model="I"><template slot="suffix">cm</template></el-input>
            </h3>
          </div>
        </div>
        <!--         表格填入结束 -->

      </div>


      <!-- 第三部分开始 -->
      <div style="margin: 20px 0 0 60px;width:100%;height:auto;">
        <div>
          <h3 class="font-type8" style="margin-left: 7px;color:white;"><strong>平均块度预测值为：</strong>
            <br>
            <el-input style="width:1167px;margin-top: 10px" v-model="avgFragment"><template slot="suffix">m</template></el-input>
          </h3>
          <h3 class="font-type8" style="margin-left: 7px;color: white"><strong>最大块度预测值为：</strong>
            <br>
            <el-input style="width:1167px;margin-top: 10px;margin-bottom: 15px" v-model="maxFragment"><template slot="suffix">m</template></el-input>
          </h3>
        </div>

      </div>
      <!-- 第三部分结束 -->
      <!--        表格开始-->
      <div style="width:100%;margin-left: 67px;margin-top: 20px">
        <el-table :data="tableData"
                  style="width: 1165px;border:1px solid #5B9BD5"
                  :cell-style="cellStyle"
                  :header-cell-style="{  color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }"
        >
          <el-table-column prop="size" label="粒径" width="100"  align="center" />
          <el-table-column prop="size1" label="<10cm" width="110" align="center"/>
          <el-table-column prop="size2" label="<20cm" width="110" align="center"/>
          <el-table-column prop="size3" label="<30cm" width="110" align="center"/>
          <el-table-column prop="size4" label="<40cm" width="110"  align="center"/>
          <el-table-column prop="size5" label="<50cm" width="100" align="center"/>
          <el-table-column prop="size6" label="<60cm" width="100" align="center"/>
          <el-table-column prop="size7" label="<70cm" width="100"  align="center"/>
          <el-table-column prop="size8" label="<80cm" width="100" align="center"/>
          <el-table-column prop="size9" label="<90cm" width="100"  align="center"/>
          <el-table-column prop="size10" label="<100cm" align="center"/>
        </el-table>

      </div>
      <div style="margin-left: 70px;margin-top: -400px;margin-bottom: 20px">
        <el-table
          :data="tablesData1"
          size="large"
          style="width: 1160px;border: 1px solid #d4e3fc;margin-top: 440px;font-size: 20px"
          :cell-style="cellStyle1"
          :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }">

          <el-table-column prop="ThreeD" label="掏槽爆破槽腔范围预测" align="center" width="1159px">
            <template slot-scope="scope" >
              <!-- 导入 lumpinessview 组件 -->
              <lumpinessview :percent="percent"></lumpinessview>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css2/pages.css'
import cookie from 'js-cookie'
import tables from '../utilPage/pageFourteen/table.vue'
import show from "@/pages/utilPage/pageEleven/show.vue";
import predictApi from '@/api/predict.js'
import {eventBus} from "../../plugins/nuxt-elementui";
import lumpinessview from "@/pages/utilPage/LumpinessView/LumpinessView.vue";
export default {
  components:{lumpinessview, show, tables},
  data(){
    return{
      tablesData1:[
        {
          TwoD:'待显示',ThreeD:"3D显示区域"
        }
      ] ,
      I:'',
      avgFragment:'',
      maxFragment:'',
      percent:[],
      projectId:'',
      tableData: [
        {
          size:'质量百分比',
          size1:'',
          size2:'',
          size3:'',
          size4:'',
          size5:'',
          size6:'',
          size7:'',
          size8:'',
          size9:'',
          size10:'',

        }
      ]
    }
  },
  created() {
    eventBus.$on('cloudFileHoles',(data)=>{
      this.predict2();
    })
  },
  mounted(){
    eventBus.$on('autoMode', (data)=>{
      if(data.autoStep == 7){
        setTimeout(() => {
          this.predict2();
          setTimeout(() => {
            eventBus.$emit('autoMode',{autoStep:8})
          },500);
        },1000);
      }
    })
  },
  beforeDestroy() {
    eventBus.$off('autoMode');
  },
  methods:{
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "height:35px!important; border-color:black!important; color:#000000!important; padding:0px!important; height:40px!important";
    },
    cellStyle1({ row, column, rowIndex, columnIndex }) {
      return "height:520px!important; border-color:#8caddb!important; color:#000000!important; padding:0px!important;background-color: #FFFFFF;";
    },
    predict2(){
      this.projectId = cookie.get("projectId")
      predictApi.calOverExcavation(this.projectId).then(response => {
        this.I = response.data.data;
        console.log(this.projectId);
      })
      predictApi.fragmentationPrediction(this.projectId).then(response => {
        this.maxFragment = response.data.data.auxRowMin;
        this.avgFragment = response.data.data.avgFragmentationCalculate;
        this.percent = []
        this.percent = response.data.data.rockyFragmentPercent;
        console.log("******************************"+JSON.stringify(response.data.data.rockyFragmentPercent))
        // this.percent.forEach((item,index) => {
        //   console.log("+++"+item+"+++")
        //   this.size1 = item
        // })
        console.log(this.tableData.length)
        console.log(this.percent.length)
        // 遍历 tableData 数组，并逐一将 percent 列表中的值赋给每个对象的属性
        this.tableData.forEach((item, index) => {
          item.size1 = this.percent[0];
          item.size2 = this.percent[1];
          item.size3 = this.percent[2];
          item.size4 = this.percent[3];
          item.size5 = this.percent[4];
          item.size6 = this.percent[5];
          item.size7 = this.percent[6];
          item.size8 = this.percent[7];
          item.size9 = this.percent[8];
          item.size10 = this.percent[9];
        });

      })
    }
  }
}
</script>

<style scoped>
/* 使用 ::v-deep 或 >>> 来覆盖 Element UI 默认样式 */
.card8 ::v-deep .el-table__header th {
  border-right: 1px solid #5B9BD5 !important; /* 添加表头的右边框 */
}
.card8 ::v-deep .el-table th.is-center, .card8 ::v-deep .el-table td.is-center {
  text-align: center !important;
}

.card8 ::v-deep .el-table__header th {
  border-bottom: 1px solid #5B9BD5 !important; /* 添加表头的下边框 */
}

.card8 ::v-deep .el-table__body td {
  border-right: 1px solid #5B9BD5 !important; /* 添加单元格的右边框 */
}
div{
  white-space:nowrap;
}
.card8{
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
  width: 1280px;
  border-radius: 20px;
  background-color: white;
}
</style>
