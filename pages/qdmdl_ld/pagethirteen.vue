<template>
  <div class="card5_1">
    <div>
      <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;
      color: white;margin-left: 40px;">13 起爆网络设计</h2>
      <br/>
      <h3 class="font-type6" style="display:inline-block;color: white">控制单响药量不超过：
        <el-input style="width:100px;margin-bottom: 20px" v-model="I"><template slot="suffix">kg</template></el-input>
      </h3>
      <br/>
<!--      <div class="proovr1-collect__tags" style="display: flex; align-items: center;">-->
<!--        &lt;!&ndash;          <el-button style="margin:20px 0 20px 10px" @click="calculate()" type="primary">炮孔起爆时序计算</el-button>&ndash;&gt;-->
<!--        <span class="proovr1-collect__tag" style="margin:20px 0 20px 568px;width:120px" @click="calculate()">炮孔起爆时序计算</span>-->
<!--      </div>-->


      <!-- 表格填入开始 -->
      <div style="margin-left: 63px;margin-bottom: 25px">
        <tables :holeData="holeData" :key="timer"/>
      </div>
      <!-- 表格填入结束 -->

      <!--起爆网络画布图-->
      <div style="margin-left: 63px;">
        <el-table
          :data="tablesData1"
          size="large"
          style="width: 1160px;
          /*border: 1px solid #d4e3fc;*/
          margin-top: 40px;font-size: 20px"
          :cell-style="cellStyle1"
          :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }">

          <el-table-column prop="ThreeD" label="起爆网络设计云图" align="center" width="1159px">
            <template slot-scope="scope" >
              <!-- 导入 fringSequnce 组件 -->
              <firingSequence :getVertices="vertices" :getSequence="sequence" :key="timer"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br/>

    </div>
  </div>
</template>

<script>
import '~/assets/css2/pages.css'
import cookie from 'js-cookie'
import tables from '../utilPage/pageThirteen/table.vue'
import show from '../utilPage/pageThirteen/show.vue'
import firingSequence from '../utilPage/firingSequence.vue'
import outPutApi from '@/api/outPut.js'
import {eventBus} from "../../plugins/nuxt-elementui";
export default {
  components:{tables,show,firingSequence},
  data(){
    return{
      tablesData1:[
        {
          TwoD:'待显示',ThreeD:"3D显示区域"
        }
      ] ,
      I:100,        //一次起爆药量
      projectId:'',
      holeData:[],
      holeDataMir:[],
      i:0,
      timer: '',
      tube:[],
      indexNum:0,

      vertices:[],
      getVertices:[],
      getSequence:[],
      sequence:[],
    }
  },
  mounted(){
    eventBus.$on('autoMode', (data)=>{
      if(data.autoStep == 6){
        setTimeout(() => {
          this.calculate();
          setTimeout(() => {
            eventBus.$emit('autoMode',{autoStep:7})
          },1000);
        },1000);
      }
    })
  },
  beforeDestroy() {
    eventBus.$off('autoMode');
  },
  methods:{
    cellStyle1({ row, column, rowIndex, columnIndex }) {
      return "height:520px!important; border-color:#8caddb!important; color:#000000!important; padding:0px!important;background-color: #01366a;";
    },
    calculate(){
      this.projectId = cookie.get("projectId")
      let datas = {"I": Number(this.I),"project_id": this.projectId};
      // let datas = {"I": 20,"project_id": "1723888621566660610"}
      this.timer = new Date().getTime()
      outPutApi.firingSequence(datas).then(response => {
        this.holeData = response.data;

        this.getVertices = []
        this.sequence = []
        response.data.map((item) => {
          // console.log("起爆网络起爆网络起爆网络起爆网络"+JSON.stringify(item))
          this.getVertices.push(item.X1,item.Y1,0)
          this.getSequence.push(item.Firing_sequence,item.Time,0)
        })
        this.sequence = this.getSequence;
        this.vertices = this.getVertices;
      })
    },
  }
}
</script>

<style>
</style>
