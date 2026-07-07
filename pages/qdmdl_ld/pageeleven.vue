<template>
  <div class="card8" >
    <div>
      <div style="padding-right: 20px" class="icon_title">
        <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;" @click="toggleData">8-开挖轮廓线</h2>
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
        <div style="float:left;margin-top: -50px;margin-left: 65px">
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
            <el-table-column type="selection"  reserve-selection = "true" width="55"   align="center"/>
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
            <span @click="clearLine" class="clear_icon" style="margin-left: 60px;font-size: 15px;color: #FFFFFF">一键清除坐标</span>
          </div>
        </div>
      </div>
      <!-- 表格填入结束 -->

      <div style="margin-left: 70px;">
        <el-table
          :data="tablesData1"
          size="large"
          style="width: 1160px;margin-top: 440px;font-size: 20px;"
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
</template>

<script>
import '~/assets/css2/pages.css'
import show from '../utilPage/pageEight/show.vue'
import cookie from 'js-cookie'
import outlineApi from '@/api/outline.js'
import {eventBus} from "../../plugins/nuxt-elementui";
import DxfParser from "@/pages/utilPage/dxfParser.vue";
import getCuttingNum from "@/api/cutting"
import * as XLSX from "xlsx";
export default {
  name:'pageEight',
  components:{DxfParser, show},
  data () {
    return {
      cuttingNum: 0,
      cuttingObj:{
        id: '', //cuttingId （保存掏槽孔排距信息的时候生成）
        cuttingDc: 0.4, //掏槽孔装药直径
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
      isTableData:'false',
      timer: '',
      // 表格数据
      // projectId: '1694535741543624706',       //测试
      projectId: '',
      itemData:null,
      tablesData1:[
        {
          TwoD:'待显示',ThreeD:"3D显示区域"
        }
      ] ,
      tableData: [

        {
          StringNum: 1,
          x1: '8.5',
          y1: '-0.65',
          x2: '-4.1',
          y2: '-0.65',
          r: '0',
          serialLine: '',
          isBottom: 1
        },
        {
          StringNum: 2,
          x1: '-4.1',
          y1: '-0.65',
          x2: '-4.465',
          y2: '1.477',
          r: '0',
          serialLine: '',
          isBottom: 0
        },
        {
          StringNum: 3,
          x1: '-4.465',
          y1: '1.477',
          x2: '-3.688',
          y2: '5.213',
          r: '6.6',
          serialLine: '',
          isBottom: 0
        },
        {
          StringNum: 4,
          x1: '-3.688',
          y1: '5.213',
          x2: '8.087',
          y2: '5.215',
          r: '6.7',
          serialLine: '',
          isBottom: 0
        },
        {
          StringNum: 5,
          x1: '8.087',
          y1: '5.215',
          x2: '8.784',
          y2: '0.928',
          r: '6.6',
          serialLine: '',
          isBottom: 0
        },
        {
          StringNum: 6,
          x1: '8.784',
          y1: '0.928',
          x2: '8.5',
          y2: '-0.65',
          r: '0',
          serialLine: '',
          isBottom: 0
        }



      ],
      // 需要编辑的属性
      editProp: ['X1', 'Y1','X2', 'Y2', 'R'],
    }
  },
  created(){
    eventBus.$on('data_Import',(data)=>{
      this.tableData = [];
      const id = cookie.get('projectId');
      this.cuttingObj.projectId = id;
      outlineApi.getOutlines(id).then(response=>{
        //轮廓线信息
        this.tableData = response.data.data;
        console.log(this.tableData);
        outlineApi.saveOutline(this.tableData).then(response => {
          //断面的线段信息
          this.itemData = response.data

          console.log("responseData:"+JSON.stringify(response.data.data))
          // this.outLineData.map((item) => {
          // this.itemData = item
          // });
          return getCuttingNum.get_CuttingNum(this.cuttingObj);
        }).then(response2=>{
          console.log("responseData2:"+JSON.stringify(response2.data.data));
          this.cuttingNum = response2.data.data;
          eventBus.$emit('cuNumUpdated',{cuttingNum:5});
        })
      })


    });
    eventBus.$on('cuttingDc',(data)=>{
      this.cuttingObj.cuttingDc = data.cuttingDc/100;
    })
    //云端文件导入回显
      eventBus.$on('cloudFileHoles',(data)=>{
        this.tableData = [];
        if(data.outlineList!=null && data.outlineList.length!=0){
          this.tableData = data.outlineList
          this.timer = new Date().getTime()
          this.buildLine();
          // this.$refs.buildLines.$el.click()
        }else{
          this.timer = new Date().getTime()
          this.buildLine();
        }
      });
  },
  mounted() {
    document.addEventListener('paste', this.handlePaste);
  },
  beforeDestroy() {
    document.removeEventListener('paste', this.handlePaste);
    eventBus.$off('cloudFileHoles');
  },
  methods: {
    handlePaste(event) {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData('Text');
      this.parseExcel(pastedData);
    },
    parseExcel(data) {
      // 清空当前的 tableData
      this.tableData = [];

      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // 处理jsonData并将其转换为适合表格的数据格式
      this.tableData = jsonData.map((row, index) => ({
        StringNum: index + 1,
        x1: row['X1'],
        y1: row['Y1'],
        x2: row['X2'],
        y2: row['Y2'],
        r: row['R'],
        serialLine: '',
        isBottom: row['isBottom'] || 0
      }));
    },
    toggleData(){
      console.log("被触发");
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
      console.log(this.tableData)
      this.projectId = sessionStorage.getItem('projectId')        //测试完解封
      this.cuttingObj.projectId = this.projectId; //掏槽孔信息ID赋值
      this.tableData = this.tableData.map((item) => {
        return{
          ...item,
          projectId : this.projectId
        }
      })
      //添加projectId结束
      this.timer = new Date().getTime()
      // 获取后端数据结果
      outlineApi.saveOutline(this.tableData).then(response => {
        this.itemData = response.data

        console.log("responseData:"+JSON.stringify(response.data.data))
        // this.outLineData.map((item) => {
        // this.itemData = item
        // });
        return getCuttingNum.get_CuttingNum(this.cuttingObj);
      }).then(response2=>{
        console.log("responseData2:"+JSON.stringify(response2.data.data));
        this.cuttingNum = response2.data.data;
        eventBus.$emit('cuNumUpdated',{cuttingNum:5});
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
    //删除所有轮廓线坐标
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

<style scoped>

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

.el-table__body-wrapper {
  border-collapse: separate;
  border-spacing: 0;
}

.el-table__body-wrapper tr {
  border-bottom: 1px solid #8caddb; /* 添加水平分隔线 */
}

.el-table__body-wrapper td {
  border-right: 1px solid #8caddb; /* 添加垂直分隔线 */
}
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
.icon_title{
  width: 190px;
  background-image: url('assets/img/ui/rectangle.png');
  background-size: calc(100% ); /* 将背景图缩小到原始尺寸的 50% */
  background-position: 10px 18px;
  background-repeat: no-repeat;
}
.el-icon-circle-plus-outline::before {
  font-size: 24px; /* 调整为你需要的大小 */
  width: 24px;     /* 调整为你需要的大小 */
  height: 24px;    /* 调整为你需要的大小 */
  line-height: 24px; /* 使图标垂直居中 */
  color:#c3c5c7; /* 调整为你需要的颜色，例如红色 */
}

</style>
