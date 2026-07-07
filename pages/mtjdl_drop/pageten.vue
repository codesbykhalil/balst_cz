<template>
  <div class="card8_1">
  <div>
    <div style="padding-right: 20px" class="icon_title">
      <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;">1-周边孔设置</h2>
    </div>

        <h3 class="font-type10" style="color:white;display:inline-block;margin-top: 21px">装药直径：
          <el-input style="width:1160px;padding-top: 10px" v-model="surDc"><template slot="suffix">mm</template></el-input>
        </h3>
    <br/>
        <h3 class="font-type10" style="color:white;display:inline-block;margin-top: 21px">外插角：
          <el-input style="width:1160px;padding-top: 10px" v-model="heterodyneAngle"></el-input>
        </h3>
    <br/>

    <div style="display: flex; align-items: center;">
      <span @click="calculate" class="draw_button" style="margin:30px 0 0 590px">试算孔排距</span>
    </div>

        <h3 class="font-type10" style="color:white;display:inline-block;padding-top: 20px;">预估孔距：
          <el-input style="width:1160px;padding-top: 10px" v-model="surHoleSpacing"><template slot="suffix">m</template></el-input>
        </h3>
    <br/>
        <h3 class="font-type10" style="color:white;display:inline-block;padding-top: 20px;">光爆层厚度：
          <el-input style="width:1160px;padding-top: 10px" v-model="blastThick"><template slot="suffix">m</template></el-input>
        </h3>

    <br>
    <div style="display: flex; align-items: center;">
      <span @click="calHoles" class="draw_button" style="margin:30px 0 0 590px">布孔并画图</span>
    </div>
    <br>
    <div style=" height:auto;margin-left: 65px">
        <!-- 表格2开始 -->
        <div >
          <tables :holeTable="holeTable" :key="timer"/>
        </div>
        <br/>
        <!-- 表格2结束 -->
        <!-- 画布展示开始 -->
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
                <show2 :vertices="vertices"  :vertices2="vertices2"  :key="timer"/>
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
import surroundingHolesApi from '@/api/surroundingHoles.js'
import cuttingApi from '@/api/cutting.js'
import show from '../utilPage/pageTen/show.vue'
import cookie from 'js-cookie'
import tables from '../utilPage/pageTen/table.vue'
import {eventBus} from "../../plugins/nuxt-elementui";
import show2 from "@/pages/utilPage/pageTen/show2.vue";
import getProjectApi from "@/api/getProject";
import calculateApi from "@/api/calculate";
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
      timer:'',
      surDc:'32',               //周边孔装药直径
      heterodyneAngle:'5',     //周边空外差角
      surHoleSpacing:'',      //周边孔预估孔距
      blastThick:'',          //预估光爆层厚度
      holeTable:[],
      holeTableMir:[],
      vertices: [],          //show子组件数据
      vertices2: [],         //show子组件数据
      tube:[],                //show子组件数据
      calHolesData:{},
      surroundingHoles:[],
      cuttingHoles:[],
      projectId:'',
      saveProjectMessage:{},
    }
  },
  mounted() {

  },
  created(){
    //云端文件导入回显
      eventBus.$on('cloudFileHoles',(data)=>{
        if(data.surroundingHoles!=null && data.surroundingHoles.length!=0){
          this.surDc = data.surroundingHoles[0].surDc*1000;
          this.heterodyneAngle = data.surroundingHoles[0].heterodyneAngle;
          this.surHoleSpacing = data.surroundingHoles[0].surHoleSpacing;
          this.blastThick = data.surroundingHoles[0].blastThick;
          this.projectId = cookie.get("projectId");

            this.timer = new Date().getTime()
              this.holeTableMir=[]        //置空防止数据重复
              this.vertices2=[]
              this.tube=[]
              this.vertices=[]

            //查询掏槽孔
            // if(!cookie.get("upProjectId"))
            // cuttingApi.getCuttingHoles(this.projectId).then(response => {
            //   this.cuttingHoles = response.data.data;
            //   this.cuttingHoles.map((item) => {
            //     this.vertices.push(item.x1,item.y1,0.0)
            //     this.tube.push({x1:item.x1,y1:item.y1,z1:0,x2:item.x2,y2:item.y2,z2:item.z2,tubeNum:1})
            //   })
            //   console.log("查询掏槽孔"+JSON.stringify(this.cuttingHoles))
            // })
            //查询周边孔
            surroundingHolesApi.readSurrounding(this.projectId).then(response => {
                this.surroundingHoles = response.data.data;
                var i=0;
                this.surroundingHoles.map((item) => {
                  i=i+1;
                  //添加周边孔
                  this.vertices2.push(item.x1,item.y1,0.0)
                  this.tube.push({x1:item.x1,y1:item.y1,z1:item.z1,x2:item.x2,y2:item.y2,z2:item.z2,tubeNum:2})
                  this.holeTableMir.push({
                    holeNum:'孔'+i, x1:item.x1, y1:item.y1, x2:item.x2, y2:item.y2,
                    z2:item.z2, azimuth:item.azimuth, offsetDistance:item.offsetDistance
                  })
                })
                this.holeTable=this.holeTableMir
            })
        }else{
          this.surHoleSpacing = "";
          this.blastThick = "";
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
    calculate(){
      this.projectId = cookie.get("mdProjectId")
       console.log("projectId: "+this.projectId);

      this.cal()
    },
    //计算周边孔的排距和光爆层厚度
    cal(){
      let arry_data ={
        projectId:this.projectId,
        heterodyneAngle: this.heterodyneAngle,
      };
      surroundingHolesApi.arrayRow(arry_data).then(response =>{
        console.log('API res:'+response);
        this.blastThick = response.data.data.blastThick;
        this.surHoleSpacing = response.data.data.surHoleSpacing;
      })
    },
    //计算周边孔,回显表格
    calHoles(){
      getProjectApi.getProject(this.projectId).then(response => {
        this.calHolesData.blastThick = this.blastThick;
        this.calHolesData.surHoleSpacing = this.surHoleSpacing;
        this.calHolesData.surDc = this.surDc / 1000;
        this.calHolesData.heterodyneAngle = this.heterodyneAngle;
        this.calHolesData.projectId = this.projectId;
        this.calHolesData.stepLine1 =response.data.data.stepLine1;
        this.calHolesData.stepLine2 = response.data.data.stepLine2;


        this.timer = new Date().getTime()
        this.holeTableMir = []        //置空防止数据重复
        this.vertices2 = []
        this.tube = []
        this.vertices = []

        //查询掏槽孔
        // cuttingApi.getCuttingHoles(this.projectId).then(response => {
        //   this.cuttingHoles = response.data.data;
        //   this.cuttingHoles.map((item) => {
        //     this.vertices.push(item.x1,item.y1,0.0)
        //     this.tube.push({x1:item.x1,y1:item.y1,z1:0,x2:item.x2,y2:item.y2,z2:item.z2,tubeNum:1})
        //   })
        //   console.log("查询掏槽孔"+JSON.stringify(this.cuttingHoles))
        // })

        //根据下台阶的projectId查询与之关联的上台阶的周边孔
        // surroundingHolesApi.upSurInfo(this.projectId).then(response =>{
        //     let upHoles = response.data.data;
        //     console.log("upHoles"+JSON.stringify(response.data.data))
        // })

        //计算周边孔
        surroundingHolesApi.getSurrounding(this.calHolesData).then(response => {
          this.surroundingHoles = response.data.data.surroundingHoles;
          var i = 0;
          this.surroundingHoles.map((item) => {
            i = i + 1;
            //添加周边孔
            this.vertices2.push(item.x1, item.y1, 0.0)
            this.tube.push({x1: item.x1, y1: item.y1, z1: item.z1, x2: item.x2, y2: item.y2, z2: item.z2, tubeNum: 2})
            this.holeTableMir.push({
              holeNum: '孔' + i, x1: item.x1, y1: item.y1, x2: item.x2, y2: item.y2,
              z2: item.z2, azimuth: item.azimuth, offsetDistance: item.offsetDistance
            })
          })

          this.holeTable = this.holeTableMir

          //保存周边孔
          surroundingHolesApi.saveSurrounding(this.surroundingHoles).then(response => {
            console.log("周边孔已保存" + response.data.data)
          })
        }).catch(err => {
          console.log(err)
          this.$message({
            type: 'error',
            message: err.data.msg,
            duration: 6000,
            offset: 140
          });
        })
      })
    },
  }

}
</script>
<style>
.card8_1{
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
  width: 1280px;
  height: auto;
  border-radius: 20px;
  background-color: white;
  background-image: url('@/assets/img/ui/Rectangle 2@2x(1).png');
  //background-size: calc(100%*2.6432); /* 将背景图缩小到原始尺寸的 50% */
  background-size: 100% 100%; /* 使背景图像宽度和高度都为容器的100% */
  background-position: top center; /* 确保背景图像从顶部开始 */
  background-attachment: local; /* 背景图像与元素的滚动一致 */
  padding-top: 0px;
}
.icon_title{
  width: 220px;
  background-image: url('assets/img/ui/rectangle.png');
  background-size: calc(100% ); /* 将背景图缩小到原始尺寸的 50% */
  background-position: 10px 18px;
  background-repeat: no-repeat;
}
.font-type10{
  width: 1160px;
  font-size: 18px;
  margin-left: 63px;
  margin-top: 20px;
  color: #FFFFFF;
}
.title-before{
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: white;
  position: relative;
  padding-left: 12px;
  padding-right: 16px;
}
.title-before:before {
  position: absolute;
  width: 4px;
  height: 16px;
  background: white;
  left: 0;
  top: 26px;
  content: "";
}
.el-input__inner {
  padding:0 10px;
  background-color:#1A2332;
  border:1px solid rgba(248,248,255,0.5);
  color:#abb0f4;
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
