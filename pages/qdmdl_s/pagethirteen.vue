<template>
  <div class="card8">
    <div>
      <div style="padding-right: 20px" class="icon_title11">
        <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;">13-起爆网络设计</h2>
      </div>
      <br/>
          <h3 class="font-type6" style="display:inline-block">控制单响药量不超过：
            <el-input style="width:100px" v-model="I"><template slot="suffix">kg</template></el-input>
          </h3>
      <br/>
      <div  style="display: flex; align-items: center;justify-content: center">
        <!--          <el-button style="margin:20px 0 20px 10px" @click="calculate()" type="primary">炮孔起爆时序计算</el-button>-->
        <span class="draw_button" style="margin: 20px 0 20px 60px;" @click="calculate()">炮孔起爆时序计算</span>
      </div>


        <!-- 表格填入开始 -->
        <div style="margin-left: 63px">
          <tables :holeData="holeData" :key="timer"/>
        </div>
        <!-- 表格填入结束 -->

        <!--起爆网络画布图-->
      <div style="margin-left: 63px;margin-bottom: -20px">
        <el-table
            :data="tablesData1"
            size="large"
            style="width: 1160px;border: 1px solid rgba(35,73,109,1);margin-top: 20px;font-size: 20px"
            :cell-style="cellStyle1"
            :header-cell-style="{color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a'}">

          <el-table-column prop="ThreeD" label="炮孔起爆顺序图" align="center" width="1159px">
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
    methods:{
      cellStyle1({ row, column, rowIndex, columnIndex }) {
        return "height:520px!important; border:1px solid rgba(35,73,109,1)!important;border-bottom:none; color:#FFFFFF!important; padding-left:0px!important;background-color:#011635;";
      },
      calculate(){
          this.projectId = cookie.get("projectId")
          let datas = {"I": Number(this.I),"project_id": this.projectId};
        // let datas = {"I": 20,"project_id": "1723888621566660610"}
          this.timer = new Date().getTime()
          outPutApi.StraightSequence(datas).then(response => {
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
