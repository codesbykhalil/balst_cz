<template>
  <div class="card8_1">
  <div>
      <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: black;margin-left: 40px;">10 周边孔布置</h2>

        <h3 class="font-type10" style="display:inline-block;margin-top: 21px">装药直径：
          <el-input style="width:1160px;padding-top: 10px" v-model="surDc"><template slot="suffix">mm</template></el-input>
        </h3>
    <br/>
        <h3 class="font-type10" style="display:inline-block;margin-top: 21px">外插角：
          <el-input style="width:1160px;padding-top: 10px" v-model="heterodyneAngle"></el-input>
        </h3>
    <br/>

     <div class="proovr-collect__tags" style="display: flex; align-items: center;">
       <span @click="calculate" class="proovr-collect__tag" style="margin:30px 0 0 560px">试算孔距与光爆层厚度</span>
     </div>

        <h3 class="font-type10" style="display:inline-block;padding-top: 20px;">预估孔距：
          <el-input style="width:1160px;padding-top: 10px" v-model="surHoleSpacing"><template slot="suffix">m</template></el-input>
        </h3>
    <br/>
        <h3 class="font-type10" style="display:inline-block;padding-top: 20px;">光爆层厚度：
          <el-input style="width:1160px;padding-top: 10px" v-model="blastThick"><template slot="suffix">m</template></el-input>
        </h3>

     <div class="proovr-collect__tags" style="display: flex; align-items: center;">
       <span @click="calHoles" class="proovr-collect__tag" style="margin:30px 0 30px 595px">布孔并绘图</span>
     </div>

    <div style=" height:auto;margin-left: 65px">
        <!-- 表格2开始 -->
        <div >
          <tables :holeTable="holeTable" :key="timer"/>
        </div>
        <br/>
        <!-- 表格2结束 -->
        <!-- 画布展示开始 -->
      <div>
        <el-table
            :data="tablesData1"
            size="large"
            style="width: 1160px;border: 1px solid #d4e3fc;margin-top:20px;font-size: 20px"
            :cell-style="cellStyle1"
            :header-cell-style="{ color: '#FFFFFF', borderColor: '#8caddb' ,backgroundColor:'#8caddb'}">
          <el-table-column prop="TwoD" label="二维视图" align="center" width="580px" >
            <template slot-scope="scope">
              <!-- 导入 show2 组件 -->
              <show2 :vertices="vertices"  :vertices2="vertices2"  :key="timer"/>
            </template>
          </el-table-column>
          <el-table-column prop="ThreeD" label="三维视图" align="center">
            <template slot-scope="scope">
              <!-- d导入 show 组件 -->
              <show :vertices="vertices" :tube="tube" :key="timer"/>
            </template>
          </el-table-column>
        </el-table>
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
          TwoD:'待显示',ThreeD:"3D显示区域"
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
      return "height:520px!important; border-color:#8caddb!important; color:#000000!important; padding:0px!important;background-color: #FFFFFF";
    },
    calculate(){
     //  if (!cookie.get("upProjectId")) {
     //    this.projectId = cookie.get("upProjectId");
     //  }else{
     //    this.projectId = cookie.get("downProjectId");
     // }
      this.projectId = cookie.get("upProjectId")
       console.log("projectId: "+this.projectId);
      // getProjectApi.getProject(this.projectId).then(response=> {
      //   console.log(response.data.data);
      //   this.saveProjectMessage.explosivityIndex = response.data.data.explosivityIndex ;
      //   this.saveProjectMessage.rockId= response.data.data.rockId;
      //   this.saveProjectMessage.ucs= response.data.data.ucs;
      //   this.saveProjectMessage.structureScore= response.data.data.structureScore;
      //   this.saveProjectMessage.structuralPlaneScore= response.data.data.structuralPlaneScore;
      //   this.saveProjectMessage.buriedDeep=response.data.data.buriedDeep;
      //   this.saveProjectMessage.initialGroundStress=response.data.data.initialGroundStress
      //   this.saveProjectMessage.holeDiameter=response.data.data.holeDiameter
      //   this.saveProjectMessage.holeLength=response.data.data.holeLength
      //   this.saveProjectMessage.explosiveDensity=response.data.data.explosiveDensity
      //   this.saveProjectMessage.d=response.data.data.d;
      //   this.saveProjectMessage.id = this.projectId;
      //   this.saveProjectMessage.tunnelName=null;
      //   this.saveProjectMessage.workArea=null;
      //   this.saveProjectMessage.workFace=null;
      //   this.saveProjectMessage.mileage=null;
      //   this.saveProjectMessage.excavationCode = "001006";
      //   console.log(this.saveProjectMessage);
      //   calculateApi.saveProject(this.saveProjectMessage).then(response => {
      //     if(response.data.code==1){
      //       console.log(response.data.data);
      //
      //       cookie.set("projectId",response.data.data.id);
      //       this.projectId = cookie.get("projectId");
      //       console.log("projectId: "+this.projectId);
      //     }})
      //
      // })
      this.cal()
    },
    //计算周边孔的排距和光爆层厚度
    cal(){
      let arry_data ={
        projectId:this.projectId,
        heterodyneAngle: this.heterodyneAngle,
      };
      surroundingHolesApi.arrayRow(arry_data).then(response =>{
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
        if (response.data.stepLine2!=null)
        {
          this.calHolesData.stepLine1 = response.data.data.stepLine1;
        }else {
          this.calHolesData.stepLine1 = response.data.data.stepLine2;
        }
        // this.calHolesData.stepLine1 = response.data.data.stepLine1;
        // this.calHolesData.stepLine2 = response.data.data.stepLine2;


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
.font-type10{
  width: 350px;
  font-size: 18px;
  margin-left: 67px;
}
</style>
