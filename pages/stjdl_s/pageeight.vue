<template>
  <div class="card8_1">
    <div>
      <div style="padding-right: 20px" class="icon_title">
        <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;" >8-开挖轮廓线</h2>
      </div>
      <div class="proovr-collect__tags" style="display: flex; align-items: center;justify-content: center;">
        <dxfParser @tableData="getTableData"></dxfParser>
      </div>
      <br/>
      <h3 style=" margin-left: 65px;
         font-size: 18px !important;
         width: 1200px;margin-bottom: 20px;
          color: #FFFFFF">
        请将隧道中心置于(0,0)点，以线段为单位顺时针方向输入，若为底拱请在线段前方勾选，无底拱则勾选底边
      </h3>
      <!-- 表格填入开始 -->
      <div style="width:100%;">
        <div style="margin-top: -50px;margin-left: 65px">
          <el-table
            :data="tableData"
            :row-class-name="tableRowClassName"
            size="large"
            style="width: 1160px;margin-top:50px;border: 1px solid #5B9BD5"
            @cell-mouse-enter="handleCellEnter"
            @cell-mouse-leave="handleCellLeave"
            @selection-change="handleSelectionChange"
            @select="handleSelect"
            :row-key="getRowKeys"
            :cell-style="cellStyle"
            :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a'  }"
          >
            <el-table-column type="selection"  reserve-selection = "true" width="55" align="center"/>
            <!-- 序号 -->
            <el-table-column
              prop="StringNum"
              label="序号"
              width="100"
              align="center"
              style=" width:100px;" >
            </el-table-column>
            <el-table-column label="端点1坐标(m)" align="center">
              <el-table-column
                prop="X1"
                label="X1"
                width="189"
                align="center">
                <div class="item" slot-scope="scope">
                  <el-input class="item__input" v-model="scope.row.x1" placeholder="请输入坐标"></el-input>
                  <div class="item__txt">{{scope.row.x1}}</div>
                </div>
              </el-table-column>
              <el-table-column
                prop="Y1"
                label="Y1"
                width="190" align="center">
                <div class="item" slot-scope="scope">
                  <el-input class="item__input" v-model="scope.row.y1" placeholder="请输入坐标"></el-input>
                  <div class="item__txt">{{scope.row.y1}}</div>
                </div>
              </el-table-column>
            </el-table-column>

            <el-table-column label="端点2坐标(m)" align="center">
              <el-table-column
                prop="X2"
                label="X2"
                width="190"
                align="center">
                <div class="item" slot-scope="scope">
                  <el-input class="item__input" v-model="scope.row.x2" placeholder="请输入坐标"></el-input>
                  <div class="item__txt">{{scope.row.x2}}</div>
                </div>
              </el-table-column>
              <el-table-column
                prop="Y2"
                label="Y2"
                width="190"
                align="center">
                <div class="item" slot-scope="scope">
                  <el-input class="item__input" v-model="scope.row.y2" placeholder="请输入坐标"></el-input>
                  <div class="item__txt">{{scope.row.y2}}</div>
                </div>
              </el-table-column>
            </el-table-column>

            <el-table-column label="半径(m)" align="center">
              <el-table-column
                prop="R"
                label="R"
                width="190"
                align="center">
                <div class="item" slot-scope="scope">
                  <el-input class="item__input" v-model="scope.row.r" placeholder="请输入半径"></el-input>
                  <div class="item__txt">{{scope.row.r}}</div>
                </div>
              </el-table-column>
            </el-table-column>

            <el-table-column
              label="操作"
              width="55"
              align="center">
              <div class="item" slot-scope="scope">
                <el-button @click="delLine(scope.$index, scope.row)" type="text" size="small">删除</el-button>
              </div>
            </el-table-column>
          </el-table>
          <i class="el-icon-circle-plus-outline" @click="addLine()"></i>  <br>
          <div class="proovr-collect__tags" style="display: flex; position:relative;align-items: center;margin-bottom: 20px;">
            <span @click="buildLine" class="affirm_icon" style="margin-left: 400px;font-size: 15px;color: #FFFFFF">确认并绘制开挖轮廓线</span>
            <span @click="clearLine"  class="clear_icon"  style="margin-left: 60px;font-size: 15px;color: #FFFFFF">一键清除坐标</span>
          </div>
        </div>
        <!--         二三台阶轮廓线距离输入-->
        <div style="padding-left: 65px;margin-top: 15px;width: 1160px;">
          <el-tabs v-model="activeName" type="border-card" style="background-color: #01366a">
            <el-tab-pane label="二台阶" name="first">
              <h3 style="
              font-size: 18px !important;
              width:100%;
              padding-bottom: 0px;color: white;" >
                台阶高度(隧道轮廓线底边到台阶线距离):
                <el-input style="width:100%;margin-top: 10px" v-model="h1">
                  <!--              <template slot="append">-->
                  <!--                <span style="color: gray;">(中心以上正值，中心以下负值)</span>-->
                  <!--              </template>-->
                  <template slot="suffix">M</template>
                </el-input>
              </h3>
            </el-tab-pane>
            <el-tab-pane label="三台阶" name="second">
              <div style="margin-top: 10px;" >
                <h3 style="
              font-size: 18px !important;
              width:100%;
              padding-bottom: 0px;color: white">
                  下台阶高度:
                  <el-input style="width:100%;margin-top: 10px" v-model="h1">
                    <!--              <template slot="append">-->
                    <!--                <span style="color: gray;">(中心以上正值，中心以下负值)</span>-->
                    <!--              </template>-->
                    <template slot="suffix">M</template>
                  </el-input>
                </h3>
                <!--        </div>-->
                <h3   style="
                font-size: 18px !important;
                width: 100%;padding-bottom: 20px;margin-top: 5px;color: white">中台阶高度:
                  <el-input style="width:100%;margin-top: 10px" v-model="h2"><template slot="suffix">M</template></el-input>
                </h3>
                <br>

              </div>
            </el-tab-pane>

          </el-tabs>
          <br>
          <div class="proovr-collect__tags" style="display: flex; position:relative;align-items: center;margin-bottom: 20px;">
            <span @click="step_affirm" class="affirm_icon1" style="margin-left: 500px;font-size: 15px;color: #FFFFFF">确认填入数据</span>
          </div>

        </div>

        <!--          开始画图-->
        <div style="margin-left: 70px;">
          <el-table
            :data="tablesData1"
            size="large"
            style="width: 1160px;font-size: 20px;"
            :cell-style="cellStyle1"
            :header-cell-style="{ color: 'white',border:'none',backgroundColor:'#01366a'}">

            <el-table-column prop="TwoD" label="视图" align="center" width="1160px">
              <template slot-scope="scope" >
                <!-- d导入 show 组件 -->
                <show :itemData="itemData" :key="timer"/>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css2/pages.css'
import show from '../utilPage/pageEight/show.vue'
import cookie from 'js-cookie'
import outlineApi from '@/api/outline.js'
import {eventBus} from "../../plugins/nuxt-elementui";
import DxfParser from "@/pages/utilPage/dxfParser.vue";
import getProjectApi from "@/api/getProject";
import calculateApi from "@/api/calculate";
import connAnoSerApi from "@/api/connAnoSer";
export default {
  name:'pageEight',
  components:{DxfParser, show},
  filters: {
    formatDecimal(value) {
      // 保留两位小数
      if (!isNaN(value)) {
        return parseFloat(value).toFixed(3);
      }
      return value;
    },
  },
  data () {
    return {
      saveProjectMessage:{},
      // 表格数据
      // projectId: '1694535741543624706',       //测试
      h1:'',
      h2:'',
      timer:'',
      projectId: '',
      itemData:null,
      tablesData1:[
        {
          TwoD:'待显示',ThreeD:"3D显示区域"
        }
      ] ,
      tableData:
      // [
      //   {
      //     StringNum: 1,
      //     x1: '4.647768',
      //     y1: '1.348776',
      //     x2: '4.539768',
      //     y2: '1.348776',
      //     r: '0',
      //     serialLine: '',
      //     isBottom: 1
      //   },
      //   {
      //     StringNum: 2,
      //     x1: '4.539768',
      //     y1: '1.348776',
      //     x2: '4.539768',
      //     y2: '1.391776',
      //     r: '0',
      //     serialLine: '',
      //     isBottom: 1
      //   },
      //   {
      //     StringNum: 3,
      //     x1: '4.539768',
      //     y1: '1.391776',
      //     x2: '3.941768',
      //     y2: '1.391776',
      //     r: '0',
      //     serialLine: '',
      //     isBottom: 1
      //   },
      //   {
      //     StringNum: 4,
      //     x1: '3.941768',
      //     y1: '1.391776',
      //     x2: '3.918187',
      //     y2: '1.513139',
      //     r: '0',
      //     serialLine: '',
      //     isBottom: 0
      //   },
      //   {
      //     StringNum: 5,
      //     x1: '3.918187',
      //     y1: '1.513139',
      //     x2: '3.95494',
      //     y2: '1.870549',
      //     r: '0.622',
      //     serialLine: '',
      //     isBottom: 0
      //   },
      //   {
      //     StringNum: 6,
      //     x1: '3.95494',
      //     y1: '1.870549',
      //     x2: '4.634995',
      //     y2: '1.87083',
      //     r: '0.373',
      //     serialLine: '',
      //     isBottom: 0
      //   },
      //   {
      //     StringNum: 7,
      //     x1: '4.634995',
      //     y1: '1.87083',
      //     x2: '4.676116',
      //     y2: '1.541053',
      //     r: '0.622',
      //     serialLine: '',
      //     isBottom: 0
      //   },
      //   {
      //     StringNum: 8,
      //     x1: '4.676116',
      //     y1: '1.541053',
      //     x2: '4.647768',
      //     y2: '1.348776',
      //     r: '0',
      //     serialLine: '',
      //     isBottom: 0
      //   }
      //
      // ],
        [
          {
            StringNum: 1,
            x1: '46.47768',
            y1: '13.48776',
            x2: '45.39768',
            y2: '13.48776',
            r: '0',
            serialLine: '',
            isBottom: 1
          },
          {
            StringNum: 2,
            x1: '45.39768',
            y1: '13.48776',
            x2: '45.39768',
            y2: '13.91776',
            r: '0',
            serialLine: '',
            isBottom: 1
          },
          {
            StringNum: 3,
            x1: '45.39768',
            y1: '13.91776',
            x2: '39.41768',
            y2: '13.91776',
            r: '0',
            serialLine: '',
            isBottom: 1
          },
          {
            StringNum: 4,
            x1: '39.41768',
            y1: '13.91776',
            x2: '39.18187',
            y2: '15.13139',
            r: '0',
            serialLine: '',
            isBottom: 0
          },
          {
            StringNum: 5,
            x1: '39.18187',
            y1: '15.13139',
            x2: '39.5494',
            y2: '18.70549',
            r: '6.22',
            serialLine: '',
            isBottom: 0
          },
          {
            StringNum: 6,
            x1: '39.5494',
            y1: '18.70549',
            x2: '46.34995',
            y2: '18.7083',
            r: '3.73',
            serialLine: '',
            isBottom: 0
          },
          {
            StringNum: 7,
            x1: '46.34995',
            y1: '18.7083',
            x2: '46.76116',
            y2: '15.41053',
            r: '6.22',
            serialLine: '',
            isBottom: 0
          },
          {
            StringNum: 8,
            x1: '46.76116',
            y1: '15.41053',
            x2: '46.47768',
            y2: '13.48776',
            r: '0',
            serialLine: '',
            isBottom: 0
          }
        ],
      // 需要编辑的属性
      editProp: ['X1', 'Y1','X2', 'Y2', 'R'],
      activeName:'first',
    }
  },
  mounted() {
    document.addEventListener('paste', this.handlePaste);
    connAnoSerApi.getExcavatePlan().then(response => {
      let str = response.data.result.steps_height;
      // str = str.substring(0, str.lastIndexOf('米'));
      this.h1 = str;
    })
  },
  watch: {

  },
  created(){
    if(cookie.get('upData')){
      let upData = JSON.parse(cookie.get('upData'));
      this.h2=upData.stepLine1-upData.stepLine2;
      this.h1=upData.stepLine2;
      this.buildLine();
    }

    //云端文件导入回显
    eventBus.$on('cloudFileHoles',(data)=>{
      if(data.outlineList!=null){
        this.tableData = data.outlineList
        this.buildLine();
      }else{
        this.timer = new Date().getTime()
        this.buildLine();
      }
    });
  },
  beforeDestroy() {
    eventBus.$off('cloudFileHoles');
  },
  methods: {
    pro_updated(){
      this.projectId = cookie.get("upProjectId");
      console.log("upProjectId: " + this.projectId);
      getProjectApi.getProject(this.projectId).then(response => {
        console.log(response.data.data);
        this.saveProjectMessage.explosivityIndex = response.data.data.explosivityIndex
        this.saveProjectMessage.rockId = response.data.data.rockId;
        this.saveProjectMessage.ucs = response.data.data.ucs;
        this.saveProjectMessage.structureScore = response.data.data.structureScore;
        this.saveProjectMessage.structuralPlaneScore = response.data.data.structuralPlaneScore;
        this.saveProjectMessage.buriedDeep = response.data.data.buriedDeep;
        this.saveProjectMessage.initialGroundStress = response.data.data.initialGroundStress
        this.saveProjectMessage.holeDiameter = response.data.data.holeDiameter
        this.saveProjectMessage.holeLength = response.data.data.holeLength
        this.saveProjectMessage.explosiveDensity = response.data.data.explosiveDensity
        this.saveProjectMessage.d = response.data.data.d;
        this.saveProjectMessage.id = this.projectId;
        this.saveProjectMessage.tunnelName = null;
        this.saveProjectMessage.workArea = null;
        this.saveProjectMessage.workFace = null;
        this.saveProjectMessage.mileage = null;
        this.saveProjectMessage.excavationCode = "001003";
        this.saveProjectMessage.offsetX = response.data.data.offsetX;
        this.saveProjectMessage.offsetY = response.data.data.offsetY;
        this.saveProjectMessage.isMachine = 0;//1是长短孔，是普通孔

        calculateApi.saveProject(this.saveProjectMessage).then(response => {
          if (response.data.code == 1) {
            console.log(response.data.data);
            //同步保存所有工程信息到浏览器
            let upDatas=response.data.data;
            cookie.set('upData',JSON.stringify(upDatas));
            this.projectId = cookie.get("upProjectId");
            console.log("upProjectId: " + this.projectId);
          }
        })

      })
    },
    step_affirm() {
      if (this.activeName == 'first') {
        if (this.h1==0||this.h1==null) {
          this.$message({
            type: 'error',
            message: "输入有误，二台阶法的下台阶高度不能为0",
            duration: 6000,
            offset: 140
          });
        }else{
          this.saveProjectMessage.stepLine1 = this.h1;
          this.pro_updated();
        }
      }else  if(this.activeName == 'second') {
        if (this.h1==0||this.h2==0||this.h1==null||this.h2==null){
          this.$message({
            type: 'error',
            message: "输入有误，三台阶法的中下台阶高度均不能为0",
            duration: 6000,
            offset: 140
          });
        }else{
          if (this.h1<this.h2){
            this.saveProjectMessage.stepLine2 = this.h1;//确保stepLine1是最大值
            this.saveProjectMessage.stepLine1 =Number(this.h1)+Number(this.h2);
            console.log("stepLine1高度为："+this.saveProjectMessage.stepLine1);
          }else {
            this.saveProjectMessage.stepLine1 = Number(this.h1)+Number(this.h2);
            this.saveProjectMessage.stepLine2=this.h2;
          }
          this.pro_updated();
        }
      }
      // else {
      //   this.projectId = cookie.get("upProjectId");
      //   console.log("upProjectId: " + this.projectId);
      //   getProjectApi.getProject(this.projectId).then(response => {
      //     console.log(response.data.data);
      //     this.saveProjectMessage.explosivityIndex = response.data.data.explosivityIndex
      //     this.saveProjectMessage.rockId = response.data.data.rockId;
      //     this.saveProjectMessage.ucs = response.data.data.ucs;
      //     this.saveProjectMessage.structureScore = response.data.data.structureScore;
      //     this.saveProjectMessage.structuralPlaneScore = response.data.data.structuralPlaneScore;
      //     this.saveProjectMessage.buriedDeep = response.data.data.buriedDeep;
      //     this.saveProjectMessage.initialGroundStress = response.data.data.initialGroundStress
      //     this.saveProjectMessage.holeDiameter = response.data.data.holeDiameter
      //     this.saveProjectMessage.holeLength = response.data.data.holeLength
      //     this.saveProjectMessage.explosiveDensity = response.data.data.explosiveDensity
      //     this.saveProjectMessage.d = response.data.data.d;
      //     this.saveProjectMessage.id = this.projectId;
      //     this.saveProjectMessage.tunnelName = null;
      //     this.saveProjectMessage.workArea = null;
      //     this.saveProjectMessage.workFace = null;
      //     this.saveProjectMessage.mileage = null;
      //     this.saveProjectMessage.excavationCode = "001003";
      //     this.saveProjectMessage.stepLine1 = this.stepLine1;
      //     this.saveProjectMessage.stepLine2 = this.stepLine2;
      //     this.saveProjectMessage.isMachine = 0;//1是长短孔，是普通孔
      //
      //     calculateApi.saveProject(this.saveProjectMessage).then(response => {
      //       if (response.data.code == 1) {
      //         console.log(response.data.data);
      //             //同步保存所有工程信息到浏览器
      //             let upDatas=response.data.data
      //             console.log(JSON.stringify(upDatas))
      //             cookie.set('upData', JSON.stringify(upDatas));
      //
      //         // cookie.set("upProjectId", response.data.data.id);
      //         this.projectId = cookie.get("upProjectId");
      //         console.log("upProjectId: " + this.projectId);
      //       }
      //     })
      //
      //   })
      // }
    },
    InPut() {
      this.tableData = [];
    },
    //获取dxf转换信息
    getTableData(msg)
    {
      this.tableData = msg;
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (column.property !== 'StringNum') {
        return "height:35px!important; border-color:#5B9BD5!important; color:#FFFFFF!important; padding:0px!important; height:40px!important";
      }
      else {
        return "height:35px!important; border-color:#5B9BD5!important; color:#FFFFFF!important;font-weight:bold;!important padding:0px!important; height:40px!important";
      }
    },
    cellStyle1({ row, column, rowIndex, columnIndex }) {
      return "height:520px!important; border:1px solid rgba(35,73,109,1)!important;border-bottom:none; color:#FFFFFF!important; padding-left:0px!important;background-color:#011635;";
    },
    //获取添加的数据并返回至前端
    buildLine(){
      this.itemData=null
      console.log(this.tableData)
      this.projectId = cookie.get("upProjectId");        //测试完解封
      //轮廓线信息
      this.tableData = this.tableData.map((item) => {
        return{
          ...item,
          projectId : this.projectId
        }
      })
      this.timer = new Date().getTime()
      // 获取后端数据结果
      outlineApi.saveOutline(this.tableData).then(response => {
        this.itemData = response.data

        console.log("responseData:"+JSON.stringify(response.data.data))
        // this.outLineData.map((item) => {
        // this.itemData = item
        // });
      })
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      selection.map((item) => {
        item.isBottom = 1;
      })
    },

    //添加轮廓线坐标
    addLine(){
      if(this.tableData.length==0){
        this.tableData.push({
          StringNum:1,x1:'',y1:'',x2:'',y2:'',r:'',serialLine:'',isBottom:0
        })
      }else{
        let len =this.tableData.length-1
        let arr=[this.tableData[len].StringNum,this.tableData[len].x2,this.tableData[len].y2]
        this.tableData.push({
          StringNum:arr[0]+1,x1:arr[1],y1:arr[2],x2:'',y2:'',r:'',serialLine:'',isBottom:0
        })
      }
    },

    //删除轮廓线坐标
    delLine(index, row) {
      var that = this;
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //点击确定的操作(调用接口)
        var hasmembers = that.tableData;
        for (var i = 0; i < hasmembers.length; i++) {
          if (row == hasmembers[i]) {
            that.tableData.splice(i, 1);
            // this.$message({ message: '删除成功', duration: 2000, type: 'success' });
          }
        }
      }).catch(() => {
        //点取消的提示
        return;
      });
    },
    clearLine(index, row) {
      var that = this;
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.tableData = [];
      }).catch(() => {
        return;
      });
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
    },
    handleSelect(list, item){
      if(list.includes(item)){
        //勾选时做的事
        item.isBottom = 1;
        // alert(JSON.stringify(item))
      }else{
        //取消勾选时做的事，arguments[1]是当前取消勾选的项
        item.isBottom = 0;
        // alert("aa"+JSON.stringify(arguments[1]));
      }
    },
    getRowKeys(row){
      return row.StringNum;
    },
    tableRowClassName({row,rowIndex}){
      if(rowIndex %2=== 1){
        return 'warning-row';
      }else if (rowIndex %2=== 0){
        return 'success-row';
      }
      return '';
    },
  }
}
</script>

<style scoped>
>>>.el-table .warning-row{
  background: #01366a;
}
>>>.el-table .success-row{
  background: #00122c;
}
/* 覆盖表格行鼠标滑过的背景色 */
>>>.el-table .el-table__body tr:hover > td {
  background-color: inherit; /* 继承父元素背景色或者指定为初始背景色 */
}
.el-table--border::after, .el-table--group::after, .el-table::before{
  background-color: rgba(35,73,109,1);
}

.el-table__body-wrapper tr {
  border-bottom: 1px solid #8caddb; /* 添加水平分隔线 */
}

.el-table__body-wrapper td {
  border-right: 1px solid #8caddb; /* 添加垂直分隔线 */
}
.card8_1{
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
.affirm_icon{
  height: 40px;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 15px;
  background-image: url('@/assets/img/ui/Group 359@2x.png');
  background-size: calc(100%); /* 将背景图缩小到原始尺寸的 50% */
  background-position: left;
  background-repeat: no-repeat;
}
.affirm_icon1{
  display: block;
  font-size: 16px;
  color:white;
  background-image: url('@/assets/img/ui/Group 359@2x.png');
  background-size: 100% 100%; /* 背景图像覆盖整个容器，并强制拉伸以适应容器 */
  background-position: center; /* 背景图像居中对齐 */
  background-repeat: no-repeat; /* 背景图像不重复 */
  padding: 6px 10px;
}
.clear_icon{
  display: block;
  font-size: 16px;
  color:white;
  background-image: url('@/assets/img/ui/Group 359@2x.png');
  background-size: 100% 100%; /* 背景图像覆盖整个容器，并强制拉伸以适应容器 */
  background-position: center; /* 背景图像居中对齐 */
  background-repeat: no-repeat; /* 背景图像不重复 */
  padding: 6px 10px;
}

/* 表格ui */
.item .item__input {
  display: none;
  width: 90px;
}
/* 调整elementUI中样式 如果不需要调整请忽略 */
.item .item__input .el-input__inner {
  height: 24px !important;
}
/* 调整elementUI中样式 如果不需要调整请忽略 */
.item .item__input .el-input__suffix i {
  font-size: 12px !important;
  line-height: 26px !important;
}
.item .item__txt {
  box-sizing: border-box;
  line-height: 24px;
  padding: 0 9px;
}
.title-before{
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #000;
  position: relative;
  padding-left: 12px;
  margin-right: 16px;
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
.el-icon-circle-plus-outline::before {
  font-size: 24px; /* 调整为你需要的大小 */
  width: 24px;     /* 调整为你需要的大小 */
  height: 24px;    /* 调整为你需要的大小 */
  line-height: 24px; /* 使图标垂直居中 */
  color:#c3c5c7; /* 调整为你需要的颜色，例如红色 */
}
</style>
