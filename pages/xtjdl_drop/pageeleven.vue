<template>
  <div class="card8_1">
    <div>
      <div style="padding-right: 20px" class="icon_title">
        <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;">2-辅助孔布置</h2>
      </div>
      <div style="margin-top:21px">
        <h3 class="font-type11" style="display:inline-block;margin-top: 21px">装药直径：
          <el-input style="width:1160px;padding-top: 10px" v-model="auxDc"><template slot="suffix">mm</template></el-input>
        </h3>
        <br/>
        <h3 class=" font-type11" style="display:inline-block;margin-top: 21px">排距系数：
          <el-input style="width:1160px;padding-top: 10px" v-model="ratioRow"></el-input>
        </h3>
        <br/>
        <h3 class="font-type11" style="display:inline-block;margin-top: 21px">孔距系数：
          <el-input style="width:1160px;padding-top: 10px" v-model="ratioSpacing"></el-input>
        </h3>
      </div>

      <div style="display: flex; align-items: center;">
        <span @click="calculate" class="draw_button" style="margin:30px 0 0 590px">计算与绘图</span>
      </div>

      <br>
      <div style="margin-left: 63px">
        <!-- 表格填入开始 -->
        <div >
          <tables :auxHoleData="auxHoleData" :key="timer"/>
        </div>
        <!-- 表格填入结束 -->
        <div style="display: flex;justify-content: space-between; width: 1160px; ">
          <div style="width: 545px">
            <el-table
              :data="tablesData1"
              size="large"
              style="border: 1px solid  rgba(35,73,109,1);margin-top:20px;font-size: 20px"
              :cell-style="cellStyle1"
              :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }">
              <el-table-column prop="TwoD" label="二维视图" align="center" width="544px" >
                <template slot-scope="scope">
                  <!-- 导入 show2 组件 -->
                  <show2 :vertices="vertices"  :key="timer"/>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="width: 545px">
            <el-table
              :data="tablesData2"
              size="large"
              style="border: 1px solid rgba(35,73,109,1);margin-top:20px;font-size: 20px"
              :cell-style="cellStyle1"
              :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }">
              <el-table-column prop="ThreeD" label="三维视图" align="center" width="544px" >
                <template slot-scope="scope">
                  <!-- d导入 show 组件 -->
                  <show :vertices="vertices" :tube="tube" :key="timer"/>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 画布展示结束 -->
      </div>

    </div>
  </div>
</template>

<script>
import '~/assets/css2/pages.css'
import auxiliaryHolesApi from '@/api/auxiliaryHoles.js'
import cuttingApi from '@/api/cutting.js'
import surroundingHolesApi from '@/api/surroundingHoles.js'
import cookie from 'js-cookie'
import show from '../utilPage/pageEleven/show.vue'
import tables from '../utilPage/pageEleven/table.vue'
import {eventBus} from "../../plugins/nuxt-elementui";
import show2 from "@/pages/utilPage/pageEleven/show2.vue";
import getProjectApi from "@/api/getProject";
export default {
  components:{show2, show,tables},
  data(){
    return{
      tablesData1:[
        {
          TwoD:'2D显示区域'
        }
      ] ,
      tablesData2:[
        {
          ThreeD:"3D显示区域"
        }
      ] ,
      timer: '',
      projectId:'',
      auxDc:'32',
      pitch:'',
      ratioRow:'0.6',
      ratioSpacing:'0.6',
      X:'',
      Y:'',
      calData: {
          id: "", //cuttingId
          x1: "", //辅助孔的x1
          y1: "", //辅助孔的y1
          x2: "", //辅助孔的x2
          z1: "", //辅助孔的z1
          y2: "", //辅助孔的y2
          z2: "", //辅助孔的z2
          shrinkNum: "", //辅助孔的内缩层数
          ratioSpacing: 0, //辅助孔孔距系数
          ratioRow: 0, //辅助孔排距系数
          auxDc: 0, //辅助孔装药直径
          explosiveAmount: "", //辅助孔的装药量
          projectId: "",
          auxSpacing: "", //辅助孔的孔距
          auxRow: "", //辅助孔的排距
          stepLine1:"",
          stepLine2:"",

  },
      vertices: [],          //show子组件数据
      tube:[],                //show子组件数据
      verticesMir:[],
      tubeMir:[],
      auxHoleData:[],         //table子组件数据
      auxHoleDataMir:[],
      cuttingHoles:[],    //掏槽孔
      surroundingHoles:[],    //周边孔
      num:0,  //计数
    }
  },
  mounted() {

  },
  created(){
    //云端文件导入回显
      eventBus.$on('cloudFileHoles',(data)=>{
        if(data.auxiliaryHole!=null){
          this.auxDc = data.auxiliaryHole[0].auxDc*1000;
          this.ratioRow = data.auxiliaryHole[0].ratioRow;
          this.ratioSpacing = data.auxiliaryHole[0].ratioSpacing;
          this.projectId = cookie.get("projectId");

          this.timer = new Date().getTime()
          this.verticesMir=[]
          this.tubeMir=[]
          this.auxHoleDataMir=[]
          //查询掏槽孔
          if(!cookie.get("upProjectId"))
            cuttingApi.getCuttingHoles(this.projectId).then(response => {
              this.cuttingHoles = response.data.data;
              this.cuttingHoles.map((item) => {
                this.verticesMir.push(item.x1,item.y1,0.0)
                this.tubeMir.push({x1:item.x1,y1:item.y1,z1:0,x2:item.x2,y2:item.y2,z2:item.z2,tubeNum:1})
              })
            })
            //查询周边孔
            surroundingHolesApi.readSurrounding(this.projectId).then(response => {
                this.surroundingHoles = response.data.data;
                this.surroundingHoles.map((item) => {
                  //添加周边孔
                  this.verticesMir.push(item.x1,item.y1,0.0)
                  this.tubeMir.push({x1:item.x1,y1:item.y1,z1:item.z1,x2:item.x2,y2:item.y2,z2:item.z2,tubeNum:2})
                })

                //查询辅助孔
                auxiliaryHolesApi.readAuxHoles(this.projectId).then(response => {
                  //回显表格
                  let datas =response.data.data;
                  let i=0;
                  datas.map((item) => {
                    i++;
                    this.verticesMir.push(item.x1,item.y1,0.0)
                    this.tubeMir.push({x1:item.x1,y1:item.y1,z1:item.z1,x2:item.x2,y2:item.y2,z2:item.z2,tubeNum:3})
                    this.auxHoleDataMir.push({
                      holeNum:'孔'+i, x1:item.x1, y1:item.y1,z1:item.z1, x2:item.x2, y2:item.y2,
                      z2:item.z2,
                    })
                  })
                  this.vertices=this.verticesMir;
                  this.tube=this.tubeMir;
                  this.auxHoleData = this.auxHoleDataMir;
                })
            })

        }else{
          this.timer = new Date().getTime();
        }
      });
  },
  beforeDestroy() {
    eventBus.$off('cloudFileHoles');
  },
  methods:{
    cellStyle1({ row, column, rowIndex, columnIndex }) {
      return "height:520px!important; border:1px solid rgba(35,73,109,1)!important;border-bottom:none; color:#FFFFFF!important; padding-left:0px!important;background-color:#011635;";
    },
    //计算辅助孔
    calculate(){
      this.timer = new Date().getTime()
      this.projectId = cookie.get("dwProjectId");
      console.log(this.projectId);
      // this.projectId = "1695249792384970753"
      this.cal()
    },
    cal(){
      //置空解决缓存问题
      this.verticesMir=[]
      this.tubeMir=[]
      this.auxHoleDataMir=[]
        //查询掏槽孔
        // cuttingApi.getCuttingHoles(this.projectId).then(response => {
        //   this.cuttingHoles = response.data.data;
        //   this.cuttingHoles.map((item) => {
        //     this.verticesMir.push(item.x1,item.y1,0.0)
        //     this.tubeMir.push({x1:item.x1,y1:item.y1,z1:0,x2:item.x2,y2:item.y2,z2:item.z2,tubeNum:1})
        //   })
        //   console.log(this.verticesMir)
        // })
        //查询周边孔
        surroundingHolesApi.readSurrounding(this.projectId).then(response => {
          this.surroundingHoles = response.data.data;
          // let i=0;
          this.surroundingHoles.map((item) => {
            // i++;
            this.verticesMir.push(item.x1, item.y1, 0.0)
            this.tubeMir.push({x1: item.x1, y1: item.y1, z1: 0, x2: item.x2, y2: item.y2, z2: item.z2, tubeNum: 2})
          })

          //辅助孔
          getProjectApi.getProject(this.projectId).then(response => {
            if (response.data.stepLine2!=null)
            {
              this.calData.stepLine2 = response.data.data.stepLine2;
            }else {
              this.calData.stepLine2 = response.data.data.stepLine1;
            }
            this.calData.ratioSpacing = this.ratioSpacing;
            this.calData.ratioRow = this.ratioRow;
            this.calData.auxDc = this.auxDc / 1000;
            this.calData.projectId = this.projectId;
            console.log("this.calData 数据信息" + this.calData);
            auxiliaryHolesApi.get_down_mid_aux(this.calData).then(response => {
              //回显表格
              let datas = response.data.data.auxiliaryHoles;
              let i = 0;
              datas.map((item) => {
                i++;
                this.verticesMir.push(item.x1, item.y1, 0.0)
                this.tubeMir.push({
                  x1: item.x1,
                  y1: item.y1,
                  z1: item.z1,
                  x2: item.x2,
                  y2: item.y2,
                  z2: item.z2,
                  tubeNum: 3
                })
                this.auxHoleDataMir.push({
                  holeNum: '孔' + i, x1: item.x1, y1: item.y1, z1: item.z1, x2: item.x2, y2: item.y2,
                  z2: item.z2,
                })
              })
              this.vertices = this.verticesMir;
              this.tube = this.tubeMir;
              this.auxHoleData = this.auxHoleDataMir;

              //保存辅助孔
              auxiliaryHolesApi.saveAuxHoles(datas).then(response => {
                if (response.data.code === 1) alert("保存辅助孔成功!")
                console.log("保存辅助孔" + JSON.stringify(response.data.data))
              })
            })
            //
          })
        })
    }
  }
}
</script>
<style>
.font-type11{
  width: 350px;
  font-size: 18px;
  margin-left: 67px;
  color: white;
}
</style>
