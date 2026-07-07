<template>
  <div class="card5_1">
    <div>
      <h2 class= title-before style="margin-top: 21px;padding-top:21px;
      font-size: 20px;!important;color: white;margin-left: 40px;">10 周边孔设置</h2>

      <h3 class="font-type10" style="display:inline-block;margin-top: 21px;color: white">装药直径：
        <el-input style="width:1160px;padding-top: 10px" v-model="surDc"><template slot="suffix">mm</template></el-input>
      </h3>
      <br/>
      <h3 class="font-type10" style="display:inline-block;margin-top: 21px;color: white">外插角：
        <el-input style="width:1160px;padding-top: 10px" v-model="heterodyneAngle"></el-input>
      </h3>
      <br/>
      <h3 class="font-type10" style="display:inline-block;padding-top: 0;color: white">孔距：
        <el-input style="width:1160px;padding-top: 5px" v-model="surHoleSpacing"><template slot="suffix">m</template></el-input>
      </h3>
      <br/>
      <h3 class="font-type10" style="display:inline-block;padding-top: 0;color: white">光爆层厚度：
        <el-input style="width:1160px;padding-top: 10px;margin-bottom: 20px" v-model="blastThick"><template slot="suffix">m</template></el-input>
      </h3>
            <div class="proovr1-collect__tags" style="display: flex; align-items: center;">
              <button @click="calculate" class="btn btn-1 btn-1b" style="margin:15px 0 15px 545px" id="calculate2">保存周边孔信息并画图</button>
            </div>



<!--            <div class="proovr1-collect__tags" style="display: flex; align-items: center;">-->
<!--              <span @click="calHoles" class="proovr1-collect__tag" style="margin:30px 0 30px 595px">布孔并绘图</span>-->
<!--            </div>-->
<!--            <div style=" height:auto;margin-left: 65px">-->
<!--              &lt;!&ndash; 表格2开始 &ndash;&gt;-->
<!--              <div >-->
<!--                <tables :holeTable="holeTable" :key="timer"/>-->
<!--              </div>-->
<!--              <br/>-->
<!--              &lt;!&ndash; 表格2结束 &ndash;&gt;-->
<!--              &lt;!&ndash; 画布展示开始 &ndash;&gt;-->
<!--              <div>-->
<!--                <el-table-->
<!--                  :data="tablesData1"-->
<!--                  size="large"-->
<!--                  style="width: 1160px;margin-top:20px;font-size: 20px;margin-bottom: 15px"-->
<!--                  :cell-style="cellStyle1"-->
<!--                  :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }">-->
<!--                  <el-table-column prop="TwoD" label="二维视图" align="center" width="580px" >-->
<!--                    <template slot-scope="scope">-->
<!--                      &lt;!&ndash; 导入 show2 组件 &ndash;&gt;-->
<!--                      <show2 :vertices="vertices"  :vertices2="vertices2"  :key="timer"/>-->
<!--                    </template>-->
<!--                  </el-table-column>-->
<!--                  <el-table-column prop="ThreeD" label="三维视图" align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                      &lt;!&ndash; d导入 show 组件 &ndash;&gt;-->
<!--                      <show :vertices="vertices" :vertices2="vertices2" :tube="tube" :key="timer"/>-->
<!--                    </template>-->
<!--                  </el-table-column>-->
<!--                </el-table>-->
<!--              </div>-->
<!--              &lt;!&ndash; 画布展示结束 &ndash;&gt;-->
<!--            </div>-->

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
import show2 from "@/pages/utilPage/pageTen/show2.vue";
import {eventBus} from "@/plugins/nuxt-elementui";

export default {
  components:{show2,show,tables},
  data(){
    return{
      tablesData1:[
        {
          TwoD:'待显示',ThreeD:"3D显示区域"
        }
      ] ,
      timer:'',
      surDc:'40',               //周边孔装药直径
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
    }
  },
  created(){
    eventBus.$on('cuttingDc', this.handleCuttingDc);
  },
  methods:{
    handleCuttingDc(data) {
      console.log(data.cuttingDc,"09090909");
      this.surDc = data.cuttingDc;

    },
    calculate(){
      this.projectId = cookie.get("projectId");
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
        this.calHoles()
      })
    },
    cellStyle1({ row, column, rowIndex, columnIndex }) {
      return "height:520px!important; border-color:#8caddb!important; color:#000000!important; padding:0px!important;background-color: #FFFFFF";
    },
    //计算周边孔,回显表格
    calHoles(){
      this.calHolesData.blastThick = this.blastThick;
      this.calHolesData.surHoleSpacing = this.surHoleSpacing;
      this.calHolesData.surDc = this.surDc/1000;
      this.calHolesData.heterodyneAngle = this.heterodyneAngle;
      this.calHolesData.projectId = this.projectId;

      // this.timer = new Date().getTime()
      // this.holeTableMir=[]        //置空防止数据重复
      // this.vertices2=[]
      // this.tube=[]
      // this.vertices=[]

      // //查询掏槽孔
      // cuttingApi.getCuttingHoles(this.projectId).then(response => {
      //   this.cuttingHoles = response.data.data;
      //   this.cuttingHoles.map((item) => {
      //     this.vertices.push(item.x1,item.y1,0.0)
      //     this.tube.push({x1:item.x1,y1:item.y1,z1:0,x2:item.x2,y2:item.y2,z2:item.z2,tubeNum:1})
      //   })
      //   console.log("查询掏槽孔"+JSON.stringify(this.cuttingHoles))
      // })

      //计算周边孔
      surroundingHolesApi.getSurrounding(this.calHolesData).then(response =>{
        this.surroundingHoles = response.data.data.surroundingHoles;
        // var i=0;
        // this.surroundingHoles.map((item) => {
        //   i=i+1;
        //   //添加周边孔
        //   this.vertices2.push(item.x1,item.y1,0.0)
        //   this.tube.push({x1:item.x1,y1:item.y1,z1:item.z1,x2:item.x2,y2:item.y2,z2:item.z2,tubeNum:2})
        //   this.holeTableMir.push({
        //     holeNum:'孔'+i, x1:item.x1, y1:item.y1, x2:item.x2, y2:item.y2,
        //     z2:item.z2, azimuth:item.azimuth, offsetDistance:item.offsetDistance
        //   })
        // })
        // this.holeTable=this.holeTableMir

        //保存周边孔
        surroundingHolesApi.saveSurrounding(this.surroundingHoles).then(response => {
          console.log("周边孔已保存"+response.data.data)
          eventBus.$emit('autoMode',{autoStep:4})
        })
      })
      document.getElementById("calculate2").innerHTML= "已成功布孔";
      document.getElementById("calculate2").style.backgroundColor = "#79FDFF";
      document.getElementById("calculate2").style.color = "#206686";
    },
  },
  mounted() {
    eventBus.$on('autoMode', (data)=>{
      if(data.autoStep == 3){
        setTimeout(() => {
          this.calculate();
        },1000);
      }
    })
  },
  beforeDestroy() {
    eventBus.$off('autoMode');
    eventBus.$off('cuttingDc', this.handleCuttingDc);
  }

}
</script>
<style>
.font-type10{
  width: 1160px;
  font-size: 18px;
  margin-left: 63px;
  margin-top: 20px
}

</style>
