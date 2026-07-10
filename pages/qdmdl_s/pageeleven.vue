<template>
  <div class="card8">
    <div>
      <div style="padding-right: 20px" class="icon_title11">
        <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;">11-一键布置炮孔</h2>
      </div>

        <h3 class="font-type11" style="display:inline-block"><strong>装药直径：</strong>
          <br>
          <el-input style="width:1167px;margin-top: 10px" v-model="auxDc"><template slot="suffix">mm</template></el-input>
        </h3>

        <h3  class="font-type11"><strong>排距系数：</strong>
          <br>
          <el-input style="width:1167px;margin-top: 10px" v-model="ratioRow"></el-input>
        </h3>

        <h3 class="font-type11" style="display:inline-block"><strong>孔距系数：</strong>
          <br>
          <el-input style="width:1167px;margin-top: 10px" v-model="ratioSpacing"></el-input>
        </h3>
      <br/>

      <div  style="display: flex; align-items: center;">
        <span @click="calculate" class="draw_button" style="margin:30px 0 20px 595px">计算与绘图</span>
      </div>

      <div style="margin-left: 63px">
        <!-- 表格填入开始 -->
        <div>
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
import show2 from "@/pages/utilPage/pageEleven/show2.vue";
import tables from '../utilPage/pageEleven/table.vue'
import {eventBus} from "../../plugins/nuxt-elementui";

export default {
  components:{show,tables,show2},
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
      ratioRow:'0.8',
      ratioSpacing:'0.8',
      X:'',
      Y:'',
      calData:{
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
        rolling_count:'',//药卷个数
        projectId: "",
        auxSpacing: "", //辅助孔的孔距
        auxRow: "" //辅助孔的排距
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
  created(){
    //云端文件导入回显
      eventBus.$on('cloudFileHoles',(data)=>{
        if(data.auxiliaryHole!=null && data.auxiliaryHole.length!=0){
          this.auxDc = data.auxiliaryHole[0].auxDc*1000;
          this.ratioRow = data.auxiliaryHole[0].ratioRow;
          this.ratioSpacing = data.auxiliaryHole[0].ratioSpacing;
          this.projectId = cookie.get("projectId");

          this.verticesMir=[]
          this.tubeMir=[]
          this.auxHoleDataMir=[]
          this.timer = new Date().getTime()
          Promise.all([
            cuttingApi.getCuttingHoles(this.projectId),
            surroundingHolesApi.readSurrounding(this.projectId),
            auxiliaryHolesApi.readAuxHoles(this.projectId)
          ]).then(([cuttingResponse, surroundingResponse, auxiliaryResponse]) => {
            const verticesMir = []
            const tubeMir = []
            const auxHoleDataMir = []

            this.cuttingHoles = cuttingResponse.data.data || [];
            this.cuttingHoles.forEach((item) => {
              verticesMir.push(item.x1,item.y1,0.0)
              tubeMir.push({x1:item.x1,y1:item.y1,z1:0,x2:item.x2,y2:item.y2,z2:item.z2,tubeNum:1,rolling_count:item.rolling_count})
            })

            this.surroundingHoles = surroundingResponse.data.data || [];
            this.surroundingHoles.forEach((item) => {
              verticesMir.push(item.x1,item.y1,0.0)
              tubeMir.push({x1:item.x1,y1:item.y1,z1:item.z1,x2:item.x2,y2:item.y2,z2:item.z2,tubeNum:2})
            })

            const datas = auxiliaryResponse.data.data || [];
            datas.forEach((item, index) => {
              verticesMir.push(item.x1,item.y1,0.0)
              tubeMir.push({x1:item.x1,y1:item.y1,z1:item.z1,x2:item.x2,y2:item.y2,z2:item.z2,tubeNum:3})
              auxHoleDataMir.push({
                holeNum:'孔'+(index + 1), x1:item.x1, y1:item.y1,z1:item.z1, x2:item.x2, y2:item.y2,
                z2:item.z2,
              })
            })

            this.verticesMir = verticesMir;
            this.tubeMir = tubeMir;
            this.auxHoleDataMir = auxHoleDataMir;
            this.vertices = verticesMir;
            this.tube = tubeMir;
            this.auxHoleData = auxHoleDataMir;
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
      this.projectId = cookie.get("projectId");
      // this.projectId = "1695249792384970753"
      this.cal()
    },
    cal(){
      //置空解决缓存问题
      this.verticesMir=[]
      this.tubeMir=[]
      this.auxHoleDataMir=[]
        //查询掏槽孔
        cuttingApi.getCuttingHoles(this.projectId).then(response => {
          this.cuttingHoles = response.data.data;
          this.cuttingHoles.map((item) => {
            this.verticesMir.push(item.x1,item.y1,0.0)
            this.tubeMir.push({x1:item.x1,y1:item.y1,z1:0,x2:item.x2,y2:item.y2,z2:item.z2,tubeNum:1,rolling_count:item.rolling_count})
          })
          console.log(this.verticesMir)
        })
        //查询周边孔
        surroundingHolesApi.readSurrounding(this.projectId).then(response => {
          this.surroundingHoles = response.data.data;
          // let i=0;
          this.surroundingHoles.map((item) => {
            // i++;
            this.verticesMir.push(item.x1,item.y1,0.0)
            this.tubeMir.push({x1:item.x1,y1:item.y1,z1:0,x2:item.x2,y2:item.y2,z2:item.z2,tubeNum:2})
          })

          //辅助孔
      this.calData.ratioSpacing=this.ratioSpacing;
      this.calData.ratioRow=this.ratioRow;
      this.calData.auxDc = this.auxDc/1000;
      this.calData.projectId = this.projectId;
      auxiliaryHolesApi.getAuxHoles(this.calData).then(response => {
        //回显表格
        let datas =response.data.data.auxiliaryHoles;
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

        //保存辅助孔
        auxiliaryHolesApi.saveAuxHoles(datas).then(response => {
          if(response.data.code === 1)    alert("保存辅助孔成功!")
          console.log("保存辅助孔"+JSON.stringify(response.data.data))
        })
      })
      //
        })
    }
  }
}
</script>
<style>
.card8{
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
  width: 1280px;
  border-radius: 20px;
  background-color: white;
  background-image: url('@/assets/img/ui/Rectangle 2@2x(1).png');
//background-size: calc(100%*2.6432); /* 将背景图缩小到原始尺寸的 50% */
  background-size: 100% 100%; /* 使背景图像宽度和高度都为容器的100% */
  background-position: top center; /* 确保背景图像从顶部开始 */
  background-attachment: local; /* 背景图像与元素的滚动一致 */
  padding-top: 0px;
}
.icon_title11{
  width: 230px;
  background-image: url('assets/img/ui/rectangle.png');
  background-size: calc(100% ); /* 将背景图缩小到原始尺寸的 50% */
  background-position: 10px 18px;
  background-repeat: no-repeat;
}
.font-type11{
  width: 1160px;
  font-size: 18px;
  margin-left: 64px;
  margin-top: 20px;
  color: #FFFFFF;
}

.card8{
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
  width: 1280px;
  border-radius: 20px;
  background-color: white;
}
.draw_button{
  display: block;
  font-size: 16px;
  color:white;
  background-image: url('@/assets/img/ui/Group 359@2x.png');
  background-size: 100% 100%; /* 背景图像覆盖整个容器，并强制拉伸以适应容器 */
  background-position: center; /* 背景图像居中对齐 */
  background-repeat: no-repeat; /* 背景图像不重复 */
  padding: 6px 10px;
  margin-top: 8px;
  margin-bottom: 8px
}
</style>
