<template>
  <div class="card8_1">
    <div>
        <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: black;margin-left: 40px;">8 开挖轮廓线</h2>
      <div class="proovr-collect__tags" style="display: flex; align-items: center;">
        <dxfParser @tableData="getTableData"></dxfParser>
<!--        <span @click="InPut" class="proovr-collect__tag" style="margin-top: 20px;margin-left: 63px">读入DXF文件，自动识别轮廓线关键点</span>-->
      </div>
      <br/>
          <h3 style=" margin-left: 65px;
         font-size: 18px !important;
         width: 1200px;margin-bottom: 20px;">请将隧道中心置于(0,0)点，以线段为单位顺时针方向输入，若为底拱请在线段前方勾选，无底拱则勾选底边</h3>
      <!-- 表格填入开始 -->
        <div style="width:100%;">
            <div style="float:left;margin-top: -50px;margin-left: 65px">
                <el-table
                        :data="tableData"
                        size="large"
                        style="width: 1160px;margin-top:50px;border: 1px solid #5B9BD5"
                        @cell-mouse-enter="handleCellEnter"
                        @cell-mouse-leave="handleCellLeave"
                        @selection-change="handleSelectionChange"
                        :cell-style="cellStyle"
                        :header-cell-style="{ color: 'black', borderColor: '#5B9BD5',backgroundColor:'#d5e1f1' }"
                >
                    <el-table-column type="selection" width="55" align="center"/>
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
                <div class="proovr-collect__tags" style="display: flex; align-items: center;">
                    <span @click="buildLine" class="proovr-collect__tag" style="margin-left: 400px">确认并绘制开挖轮廓线</span>
                    <span @click="clearLine" class="proovr-collect__tag" style="margin-left: 60px">一键清除坐标</span>
                </div>
            </div>
        </div>
        <div style="margin-left: 70px;margin-top: -40px">
          <el-table
            :data="tablesData1"
            size="large"
            style="width: 1160px;border: 1px solid #d4e3fc;margin-top: 440px;font-size: 20px"
            :cell-style="cellStyle1"
            :header-cell-style="{ color: '#FFFFFF', borderColor: '#8caddb' ,backgroundColor:'#8caddb'}">

            <el-table-column prop="ThreeD" label="视图" align="center" width="1159px">
              <template slot-scope="scope" >
                <show :itemData="itemData" :key="timer"/>
              </template>
            </el-table-column>
          </el-table>
        </div>
      <div style="margin-top: 50px">
        <h3 style="
              font-size: 18px !important;
              width: 400px;margin-left: 68px;margin-top: -30px;padding-bottom: 20px;"><strong>台阶高度1(请输入其中二者中较高的高度）：</strong>
          <el-input style="width:1167px;margin-top: 10px" v-model="stepLine1"><template slot="suffix">M</template></el-input>
        </h3>
        <!--        </div>-->
        <h3   style=" margin-left: 68px;
                font-size: 18px !important;
                width: 400px;padding-bottom: 20px;"><strong>台阶高度2：</strong>
          <el-input style="width:1167px;margin-top: 10px" v-model="stepLine2"><template slot="suffix">M</template></el-input>
        </h3>
        <br>
        <div style="display:flex;justify-content:center;align-items: center">
          <el-button @click="step_affirm">确认</el-button>
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
      // 表格数据
      // projectId: '1694535741543624706',       //测试
      saveProjectMessage:{},
      stepLine1:'-0.20226',
      stepLine2:null,
      timer:'',
      projectId: '',
      itemData:null,
        tablesData1:[
            {
                TwoD:'待显示',ThreeD:"3D显示区域"
            }
        ] ,
      tableData: [

        // {
        //   x1: '3.825157',y1: '-0.239989999999998',x2: '-3.827897',y2: '-0.239989999999998',r: '0',serialLine:'',isBottom:1
        // },{
        //   x1: '-3.827897',y1: '-0.239989999999998',x2: '-3.40452600000001',y2: '1.297743',r: '6.22',serialLine:'',isBottom:0
        // },{
        //   x1: '-3.40452600000001',y1: '1.297743',x2: '3.40915199999999',y2: '1.285541',r: '3.73',serialLine:'',isBottom:0
        // },{
        //   x1: '3.40915199999999',y1: '1.285541',x2: '3.825157',y2: '-0.239989999999998',r: '6.22',serialLine:'',isBottom:0
        // },

        {//1 下1
          "StringNum":"1",
          "x1": "6.22",
          "y1": "-3.65",
          "x2": "-6.22",
          "y2": "-3.65",
          "r": "0",
          "serialLine":"",
          "isBottom": "1",
        },
        {//2
            "StringNum":"2",
          "x1": "-6.22",
          "y1": "-3.65",
          "x2": "-6.49",
          "y2": "3.65",
          "r": "0",
          "serialLine":"",
          "isBottom": "1",
        },
        {//3
            "StringNum":"3",
          "x1": "-6.49",
          "y1": "3.65",
          "x2": "6.49",
          "y2": "3.65",
          "r": "0",
          "serialLine":"",
          "isBottom": "0",
        },{ "StringNum":"4","x1": "6.49","y1": "3.65","x2": "6.22","y2": "-3.65","r": "0","serialLine":"","isBottom": "0",
        },

        //下2
        // {
        //   x1: '6.317942',y1: '-0.027056',x2: '5.91621',y2: '-0.027056',r: '0',serialLine:'',isBottom:1
        // },{
        //   x1: '5.91621',y1: '-0.027056',x2: '4.579787',y2: '-0.998471',r: '3.197417',serialLine:'',isBottom:1
        // },{
        //   x1: '4.579787',y1: '-0.998471',x2: '-4.579787',y2: '-0.998471',r: '13.97',serialLine:'',isBottom:1
        // },{
        //   x1: '-4.579787',y1: '-0.998471',x2: '-5.91621',y2: '-0.027056',r: '3.197417',serialLine:'',isBottom:1
        // },{
        //   x1: '-5.91621',y1: '-0.027056',x2: '-6.317942',y2: '-0.027056',r: '0',serialLine:'',isBottom:1
        // },{
        //   x1: '-6.317942',y1: '-0.027056',x2: '-6.669237',y2: '2.227056',r: '0',serialLine:'',isBottom:0
        // },{
        //   x1: '-6.669237',y1: '2.227056',x2: '6.669237',y2: '2.227056',r: '0',serialLine:'',isBottom:0
        // },{
        //   x1: '6.669237',y1: '2.227056',x2: '6.317942',y2: '-0.027056',r: '0',serialLine:'',isBottom:0
        // },

        // {//1
        //   "x1": "6.317942",
        //   "y1": "-4.027056",
        //   "x2": "5.91621",
        //   "y2": "-4.027056",
        //   "r": "0",
        //   "serialLine":"",
        //   "isBottom": "1",
        // },
        // {//2
        //   "x1": "5.91621",
        //   "y1": "-4.027056",
        //   "x2": "4.579787",
        //   "y2": "-4.998471",
        //   "r": "3.197417",
        //   "serialLine":"",
        //   "isBottom": "1",
        // },
        // {//3
        //   "x1": "4.579787",
        //   "y1": "-4.998471",
        //   "x2": "-4.579787",
        //   "y2": "-4.998471",
        //   "r": "13.97",
        //   "serialLine":"",
        //   "isBottom": "1",
        // },
        // {//4
        //   "x1": "-4.579787",
        //   "y1": "-4.998471",
        //   "x2": "-5.91621",
        //   "y2": "-4.027056",
        //   "r": "3.197417",
        //   "serialLine":"",
        //   "isBottom": "1",
        // },
        // {//5
        //   "x1": "-5.91621",
        //   "y1": "-4.027056",
        //   "x2": "-6.317942",
        //   "y2": "-4.027056",
        //   "r": "0",
        //   "serialLine":"",
        //   "isBottom": "1",
        // },
        // {//6
        //   "x1": "-6.317942",
        //   "y1": "-4.027056",
        //   "x2": "-6.669237",
        //   "y2": "-2.227056",
        //   "r": "0",
        //   "serialLine":"",
        //   "isBottom": "0",
        // },
        // {//7
        //   "x1": "-6.669237",
        //   "y1": "-2.227056",
        //   "x2": "-5.888973",
        //   "y2": "2.3845",
        //   "r": "6.71",
        //   "serialLine":"",
        //   "isBottom": "0",
        // },
        // {//8
        //   "x1": '-5.888973',
        //   "y1": '2.3845',
        //   "x2": "5.888973",
        //   "y2": "2.3845",
        //   "r": "6.8",
        //   "serialLine":"",
        //   "isBottom": "0",
        // },
        // {//9
        //   "x1": "5.888973",
        //   "y1": "2.3845",
        //   "x2": "6.669237",
        //   "y2": "-2.227056",
        //   "r": "6.71",
        //   "serialLine":"",
        //   "isBottom": "0",
        // },
        // {//10
        //   "x1": "6.669237",
        //   "y1": "-2.227056",
        //   "x2": "6.317942",
        //   "y2": "-4.027056",
        //   "r": "0",
        //   "serialLine":"",
        //   "isBottom":"0"
        // },
      ],
      // 需要编辑的属性
      editProp: ['X1', 'Y1','X2', 'Y2', 'R'],
    }
  },
  created(){
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
    step_affirm() {
      if (this.stepLine1 <= this.stepLine2 && this.stepLine2!=null) {
        this.$message({
          type: 'error',
          message: "输入有误，台阶高度1必须大于台阶高度2",
          duration: 6000,
          offset: 140
        });
        return
      }else if (this.stepLine2 == 0) {
        this.$message({
          type: 'error',
          message: "输入有误，台阶高度2不能为0",
          duration: 6000,
          offset: 140
        });
        return
      }
      else {
        this.projectId = cookie.get("dwProjectId");
        console.log("dwProjectId: " + this.projectId);
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
          this.saveProjectMessage.excavationCode = "001005";
          this.saveProjectMessage.stepLine1 = this.stepLine1;
          this.saveProjectMessage.stepLine2 = this.stepLine2;
          this.saveProjectMessage.isMechine = 0;//1是长短孔，是普通孔
          console.log("重新保存的信息"+this.saveProjectMessage);
          // cookie.get("upData").stepLine1 = this.stepLine1;
          // cookie.get("upData").stepLine2 = this.stepLine2;


          calculateApi.saveProject(this.saveProjectMessage).then(response => {
            if (response.data.code == 1) {
              console.log(response.data.data);

              // cookie.set("upProjectId", response.data.data.id);
              this.projectId = cookie.get("upProjectId");
              console.log("upProjectId: " + this.projectId);
            }
          })

        })
      }
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
              return "height:35px!important; border-color:#5B9BD5!important; color:#000000!important; padding:0px!important; height:40px!important";
          }
          else {
              return "height:35px!important; border-color:#5B9BD5!important; color:black!important;font-weight:bold;!important padding:0px!important; height:40px!important";
          }
      },
      cellStyle1({ row, column, rowIndex, columnIndex }) {
          return "height:520px!important; border-color:#8caddb!important; color:#000000!important; padding:0px!important;background-color: #FFFFFF;";
      },
    //获取添加的数据并返回至前端
    buildLine(){
      this.itemData=null
      console.log(this.tableData)
      this.projectId = cookie.get("dwProjectId");        //测试完解封
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
          StringNum:0,x1:'',y1:'',x2:'',y2:'',r:'',serialLine:'',isBottom:0
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
    }
  }
}
</script>

<style>
.title-front{
    margin-top: 50px;
    font-size: 40px !important;
}
.card5{
    height: auto;
    width: 100%;
}
.card8_1{
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
  width: 1280px;
  border-radius: 20px;
  background-color: white;
}

.font-type3{
  margin-top: 50px;
  margin-left: 10%;
  font-size: 25px !important;
  width: 400px;
  line-height:30px;
}

.canvas{
  height: 600px;
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
  background: #0052d9;
  left: 0;
  top: 26px;
  content: "";
}
</style>
