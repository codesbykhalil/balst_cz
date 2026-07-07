<template>
  <div class="card8">
    <div>
      <div style="padding-right: 20px" class="icon_title">
        <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;">9-掏槽孔设置</h2>
      </div>
        <h3 class="font-type9" style="display:inline-block"><strong>装药直径：</strong>
          <br>
          <el-input style="width:1167px;margin-top: 10px" v-model="cuttingDc"><template slot="suffix">mm</template></el-input>
        </h3>
      <br/>
        <h3 class="font-type9" style="display:inline-block"><strong>掏槽级数：</strong>
          <br>
          <el-input style="width:1167px;margin-top: 10px" v-model="cuttingNum"></el-input>
        </h3>
      <br/>
        <h3 class="font-type9" style="display:inline-block"><strong>掏槽高度：</strong>
          <br>
          <el-input style="width:1167px;margin-top: 10px" v-model="cuttingRow"><template slot="suffix">m</template></el-input>
        </h3>
      <br/>
      <h3 class="font-type9" style="display:inline-block;margin-left: 65px"><strong>掏槽区底边高度调整系数：</strong>
        <br>
        <el-input style="width:1167px;margin-top: 10px" v-model="cuttingN"><template slot="suffix"></template></el-input>
      </h3>
      <h3 class="font-type9" style="display:inline-block;margin-left: 65px"><strong>空孔直径：</strong>
        <br>
        <el-input style="width:1167px;margin-top: 10px" v-model="emptyCuttingDc"><template slot="suffix"></template></el-input>
      </h3>
      <h3 class="font-type9" style="display:inline-block;margin-left: 65px"><strong>空孔个数：</strong>
        <br>
        <el-input style="width:1167px;margin-top: 10px" v-model="emptyHoles"><template slot="suffix"></template></el-input>
      </h3>
      <div style="display: flex; align-items: center;">
        <span @click="calculate" class="draw_button" style="margin:30px 0 0 590px">试算孔排距</span>
      </div>
      <div style="height:auto;">
        <!-- 表格开始 -->
        <div style="margin-left: 65px;">
          <el-table
            :data="levelTable"
            :span-method="objectSpanMethod"
            border
            size="large"
            style="width: 1160px;margin-top:50px;border: 1px solid #5B9BD5"
            @cell-mouse-enter="handleCellEnter"
            @cell-mouse-leave="handleCellLeave"
            :cell-style="cellStyle"
            :header-cell-style="{  color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }"
          >
            <!-- 级数 -->
            <el-table-column
              prop="levelNum"
              label="掏槽级数"
              width="232"
              align="center">
              <div class="item" slot-scope="scope">
                <el-input class="item__input" v-model="scope.row.levelNum" :disabled="true" placeholder="请输入"></el-input>
                <div class="item__txt">{{scope.row.levelNum}}</div>
              </div>
            </el-table-column>

            <!-- 角度 -->
            <el-table-column
              prop="angle"
              label="炮孔倾斜角度（°）"
              width="232"
              align="center">
              <div class="item" slot-scope="scope">
                <el-input class="item__input" v-model="scope.row.angle" :disabled="scope.row.tId>0 ? false : true" placeholder="请输入"></el-input>
                <div class="item__txt">{{scope.row.angle}}</div>
              </div>
            </el-table-column>

            <el-table-column
              prop="position"
              label=""
              width="232"
              align="center">
              <div class="item" slot-scope="scope">
                <el-input class="item__input" v-model="scope.row.position" :disabled="true" placeholder="请输入"></el-input>
                <div class="item__txt">{{scope.row.position}}</div>
              </div>
            </el-table-column>

            <!-- 排距 -->
            <el-table-column
              prop="rowSpac"
              label="排距(m)"
              width="232"
              align="center">
              <div class="item" slot-scope="scope">
                <el-input class="item__input" v-model="scope.row.rowSpac" :disabled="true"></el-input>
                <div class="item__txt">{{scope.row.rowSpac}}</div>
              </div>
            </el-table-column>

            <!-- 孔距 -->
            <el-table-column
              prop="holeSpac"
              label="孔距(m)"
              width="231"
              align="center">
              <div class="item" slot-scope="scope">
                <el-input class="item__input" v-model="scope.row.holeSpac" :disabled="scope.row.tId>2 ? false : true" placeholder="请输入"></el-input>
                <div class="item__txt">{{scope.row.holeSpac}}</div>
              </div>
            </el-table-column>

          </el-table>
<!--          <el-button style="margin:30px 0 20px 200px" @click="holeAndDraw()" type="primary">布孔并绘图</el-button>-->
          <div  style="display: flex; align-items: center;">
            <span @click="holeAndDraw" class="draw_button" style="margin:20px 0 0 530px">布孔并画图</span>
          </div>
        </div>
        <!-- 表格结束 -->
<!-- 而三维视图显示-->
        <div style="margin-left: 70px;display: flex;justify-content: space-between; width: 1160px; ">
          <div style="width: 545px">
            <el-table
                :data="tablesData1"
                size="large"
                style="width:545px;border: 1px solid rgba(35,73,109,1);margin-top:20px;font-size: 20px"
                :cell-style="cellStyle1"
                :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }">
              <el-table-column prop="TwoD" label="二维视图" align="center" width="544px" >
                <template slot-scope="scope" style="padding: 0">
                  <!-- 导入 show 组件 -->
                  <show2 :vertices="vertices"  :key="timer"  />
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="width: 545px">
            <el-table
                :data="tablesData2"
                size="large"
                style="width: 545px;border: 1px solid rgba(35,73,109,1);margin-top:20px;font-size: 20px"
                :cell-style="cellStyle1"
                :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }">
              <el-table-column prop="ThreeD" label="三维视图" align="center" width="544px" >
                <template slot-scope="scope">
                  <!-- 导入 show 组件 -->
                  <show :vertices="vertices" :tube="tube" :key="timer" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
<br/>
      <!-- 表格2开始 -->
      <div v-show="false">
      <tables style="margin-top:-40px;margin-left: 40px;" :holeTableNum="holeTableNum" :childData="childData"
              @childVertices="getChildData" @childTube="getChildTube" :key="timer"/>
      </div>
      <!-- 表格2结束 -->

    </div>
  </div>
</template>

<script>
import '~/assets/css2/pages.css'
import { getMergeCells } from '@/utils/table.js'
import show from '../utilPage/pageNine/show.vue'
import show2 from "@/pages/utilPage/pageNine/show2.vue";
import cuttingApi from '@/api/cutting.js'
import cookie from 'js-cookie'
import tables from '../utilPage/pageNine/table.vue'
import {eventBus} from "../../plugins/nuxt-elementui";
export default {
  components:{tables,show,show2},
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
      emptyCuttingDc:'32',
      emptyHoles:'1',
      timer: '',
      cuttingDc: '32',
      cuttingNum: '4',
      cuttingRow: '5',
      cuttingN: '1',
      holeTableNum: 0,
      cuttingId:'',
      vertices: [],         //show子组件数据
      tube:[],              //show子组件数据
      childData: null,         //table子组件数据
      tableColumn: [
        { prop: 'levelNum', label: '等级' },
        { prop: 'angle', label: '角度' },
        { prop: 'position', label: '' },
        { prop: 'rowSpac', label: '排距' },
        { prop: 'holeSpac', label: '孔距' },
      ],
      cutObj:{},
      levelTable:[],
      cuttingMsg:[],          //保存掏槽孔信息数组
      cuttingTable:[],          //保存掏槽孔排距表
      cuttingObj:{
        emptyCuttingDc:'32',
        emptyHoles:'1',
        id: '', //cuttingId （保存掏槽孔排距信息的时候生成）
        cuttingDc: 0, //掏槽孔装药直径
        cuttingNum: 0, //掏槽级数
        cuttingRow: 0, //掏槽排数
        cuttingN:1,
        orificeSpacing1: null, //第一级孔口孔距
        orificeSpacing2: null, //第二级孔口孔距
        orificeRow1: "", //第一级孔口排距
        bottomRow1: "", //第一级孔底排距
        cuttingDipAngle1: "70", //掏槽孔排距表第一级角度
        cuttingDipAngle2: "", //掏槽孔排距表第二级角度
        cuttingDipAngle3: "", //掏槽孔排距表第三级角度
        // projectId: "1688562209227726849" //projectId（保存项目信息的时候生成）
        projectId:'',
      },          //计算掏槽孔排距信息对象
      editProp: ['levelNum', 'angle','position', 'rowSpac', 'holeSpac',],
    }
  },
  watch:{
    cuttingNum:{
      handler(newLevel,oldLevel){
        if(newLevel>5){
          alert("掏槽级数最高为5级！");
          this.cuttingNum='3';
        }else{
          this.levelTable=[];
          this.holeTableNum = newLevel;
          // console.log(this.levelTable)
          for(let i=1;i<=newLevel;i++){
            switch(i){
              case 1: {
                this.levelTable.push({levelNum:'一级',angle:'',position:'孔口',rowSpac:'',holeSpac:'',tId:3})
                this.levelTable.push({levelNum:'一级',angle:'',position:'孔底',rowSpac:'',holeSpac:'',tId:2})
              }break;
              case 2: {
                this.levelTable.push({levelNum:'二级',angle:'',position:'孔口',rowSpac:'',holeSpac:'',tId:3})
                this.levelTable.push({levelNum:'二级',angle:'',position:'孔底',rowSpac:'',holeSpac:'',tId:0})
              }break;
              case 3: {
                this.levelTable.push({levelNum:'三级',angle:'',position:'孔口',rowSpac:'',holeSpac:'',tId:0})
                this.levelTable.push({levelNum:'三级',angle:'',position:'孔底',rowSpac:'',holeSpac:'',tId:0})
              }break;
              case 4: {
                this.levelTable.push({levelNum:'四级',angle:'',position:'孔口',rowSpac:'',holeSpac:'',tId:0})
                this.levelTable.push({levelNum:'四级',angle:'',position:'孔底',rowSpac:'',holeSpac:'',tId:0})
              }break;
              case 5: {
                this.levelTable.push({levelNum:'五级',angle:'',position:'孔口',rowSpac:'',holeSpac:'',tId:0})
                this.levelTable.push({levelNum:'五级',angle:'',position:'孔底',rowSpac:'',holeSpac:'',tId:0})
              }break;
            }

          }
        }
      },
      immediate: true
    }
  },
  created(){
    //云端文件导入回显
      eventBus.$on('cloudFileHoles',(data)=>{
        if(data.cutting!=null && data.cutting.length!=0){
          this.cuttingDc = (data.cutting.cutting.cuttingDc * 1000).toString();
          this.cuttingNum = data.cutting.cutting.cuttingNum.toString();
          this.cuttingRow = data.cutting.cutting.cuttingRow.toString();

          this.$nextTick(()=> {
            this.cuttingTable = data.cutting.cuttingArrays
            let i, j = 0;
            this.timer = new Date().getTime()
            if (data.cutting != null && data.cutting.length != 0)
              this.cuttingTable.map((item) => {
                i = 2 * item.cuttingNum;
                j = 2 * item.cuttingNum + 1;
                this.levelTable[i].rowSpac = item.orificeRow;
                this.levelTable[i].holeSpac = item.orificeSpacing;
                this.levelTable[i].angle = item.cuttingDipAngle;

                this.levelTable[j].rowSpac = item.bottomRow;
                this.levelTable[j].holeSpac = item.bottomSpacing;
                this.levelTable[j].angle = item.cuttingDipAngle;
              });
            this.cuttingId = data.cutting.cutting.id;
            this.cuttingTable.map((item) => {
              item.cuttingId = this.cuttingId
            });

            cuttingApi.getCuttingHoles(cookie.get("projectId")).then(response => {
              this.childData = response.data;
            })
          })
        }else{
          this.levelTable.map((item) => {
            item.rowSpac=null;
            item.holeSpac=null;
            item.angle=null;
            item.rowSpac=null;
            item.holeSpac=null;
            item.angle=null;
          });
          this.timer = new Date().getTime()
        }
      });
  },
  beforeDestroy() {
    eventBus.$off('cloudFileHoles');
  },
  computed: {
    // 获取所有单元格合并数据
    spanArr() {
      if (!this.tableColumn.length) return []
      const mergeCols = ['levelNum', 'angle'] // 需要合并的列（字段）
      return getMergeCells(this.levelTable, this.tableColumn, mergeCols)
    },
  },
  methods:{
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "height:35px!important; border-color:rgba(35,73,109,1)!important;background-color:#011635;color:#FFFFFF!important; padding:0px!important; height:40px!important";
    },
    cellStyle1({ row, column, rowIndex, columnIndex }) {
      return "height:520px!important; border:1px solid rgba(35,73,109,1)!important;border-bottom:none; color:#FFFFFF!important; padding-left:0px!important;background-color:#011635;";
    },
    //计算孔排距
    calculate(){
      this.cuttingObj.cuttingDc = this.cuttingDc/1000;
      this.cuttingObj.cuttingNum = this.cuttingNum/1;
      this.cuttingObj.cuttingRow = this.cuttingRow/1;
      this.cuttingObj.cuttingN = this.cuttingN/1;
      this.cuttingObj.emptyCuttingDc = this.emptyCuttingDc/1000;
      this.cuttingObj.emptyHoles = this.emptyHoles/1;
      this.cuttingObj.orificeSpacing1 = this.levelTable[0].holeSpac;
      this.cuttingObj.orificeSpacing2 = this.levelTable[2].holeSpac;
      this.cuttingObj.projectId = cookie.get("projectId");             //save
      //  this.cuttingObj.projectId = '1695249792384970753';

      //1.计算掏槽孔排距信息     回显表格
      cuttingApi.getCuttingStraightArray(this.cuttingObj).then(response =>{
        this.cuttingTable = response.data.data.cuttingArrays
        //需要添加cuttingId
        this.cuttingMsg = response.data.data.cutting

        var i,j=0;

        this.cuttingTable.map((item) => {
          i = 2*item.cuttingNum;
          j = 2*item.cuttingNum+1;
          console.log("计算掏槽孔排距信息"+JSON.stringify(item))
          this.levelTable[i].rowSpac=item.orificeRow;
          this.levelTable[i].holeSpac=item.orificeSpacing;
          this.levelTable[i].angle=item.cuttingDipAngle;

          this.levelTable[j].rowSpac=item.bottomRow;
          this.levelTable[j].holeSpac=item.bottomSpacing;
          this.levelTable[j].angle=item.cuttingDipAngle;
        });

        //2.保存掏槽孔信息
        // console.log("cuttingMsg2"+JSON.stringify(this.cuttingMsg))
        cuttingApi.saveCutting(this.cuttingMsg).then(response => {
          this.cuttingMsg = response.data.data;
          // console.log("保存/更新掏槽孔信息"+JSON.stringify(response.data.data))
          this.cuttingId = this.cuttingMsg.id;
          this.cuttingTable.map((item) => {
            item.cuttingId = this.cuttingId
          });
          //3.保存掏槽排距表
          cuttingApi.saveCuttingArray(this.cuttingTable).then(response => {
            if(response.data.data == null)
              alert("计算失败请重试！")
            else{
              // console.log("保存掏槽排距表"+JSON.stringify(response.data.data))
            }
          })
        })
      })
    },

    //坐标赋值
    holeAndDraw(){
      this.timer = new Date().getTime()
      if(this.cuttingId===''){
        alert("cuttingId为空,输入步骤有误!")
      }else{
        //回显表格
        // this.cuttingId = '1689130042114420737'
        // let cBY = cookie.get("centerBottomY")
        // let data = {cuttingId: this.cuttingId,centerBottomY: cBY};       //save
        // let data = {cuttingId: this.cuttingId,centerBottomY: -3};
        this.cutObj.cuttingId = this.cuttingId;
        this.cutObj.n = this.cuttingN;
        cuttingApi.getstraightCutting(this.cutObj).then(response => {
          this.childData = response.data;     //回显
          let next = response.data.data.cuttingHolesList
          cuttingApi.saveCuttingHoles(next).then(response => {
            // console.log("保存掏槽孔  "+JSON.stringify(response.data.data))
            alert("保存掏槽孔成功!")
          })
        })
      }
    },

    //获取vertices
    getChildData(val){
      this.vertices = val;
    },

    //获取tube
    getChildTube(val){
      this.tube = val;
    },

    // 表数据合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      return this.spanArr[rowIndex][columnIndex]
    },

    // 鼠标移入cell
    handleCellEnter (row, column, cell, event) {
      const property = column.property
      if (this.editProp.includes(property)) {
        cell.querySelector('.item__input').style.display = 'block'
        cell.querySelector('.item__txt').style.display = 'none'
      }
    },
    // 鼠标移出cell
    handleCellLeave (row, column, cell, event) {
      const property = column.property
      if (this.editProp.includes(property)) {
        cell.querySelector('.item__input').style.display = 'none'
        cell.querySelector('.item__txt').style.display = 'block'
      }
    }
  },

}
</script>

<style scoped>

.card8{
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

.font-type9{
  width: 1160px;
  font-size: 18px;
  margin-left:65px;
  padding-top: 20px;
  color: #FFFFFF;
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


.el-table__body-wrapper {
    border-collapse: separate;
    border-spacing: 0;
}


</style>
