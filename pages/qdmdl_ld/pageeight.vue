<template>
  <div class="card5_1">
    <div>
      <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px!important;
      color: white;margin-left: 40px;">8 开挖轮廓线</h2>
      <br/>
      <h3 style=" margin-left: 65px;
         font-size: 18px !important;
         width: 1200px;margin-bottom: 20px;color: white">请将隧道中心置于(0,0)点，请从底板线段右端点开始顺时针依次输入
      </h3>
      <!-- 表格填入开始 -->
      <div style="width:100%;">
        <div style="margin-top: -50px;margin-left: 65px">
          <el-table
            :data="tableData"
            border :row-class-name="tableRowClassName"
            size="large"
            style="width: 1160px;margin-top:70px;border: 1px solid #5B9BD5"
            @cell-mouse-enter="handleCellEnter"
            @cell-mouse-leave="handleCellLeave"
            @select="handleSelect"
            :cell-style="cellStyle"
            :row-key="getRowKeys"
            :header-cell-style="{  color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }"
          >

            <el-table-column type="selection" width="55" align="center" reserve-selection="true" />
            <el-table-column label="端点1坐标">
              <el-table-column
                prop="X1"
                label="X1"
                width="210">
                <div class="item" slot-scope="scope">
                  <el-input class="item__input" v-model="scope.row.x1" placeholder="请输入坐标"></el-input>
                  <div class="item__txt">{{scope.row.x1}}</div>
                </div>
              </el-table-column>
              <el-table-column
                prop="Y1"
                label="Y1"
                width="210">
                <div class="item" slot-scope="scope">
                  <el-input class="item__input" v-model="scope.row.y1" placeholder="请输入坐标"></el-input>
                  <div class="item__txt">{{scope.row.y1}}</div>
                </div>
              </el-table-column>
            </el-table-column>

            <el-table-column label="端点2坐标">
              <el-table-column
                prop="X2"
                label="X2"
                width="210">
                <div class="item" slot-scope="scope">
                  <el-input class="item__input" v-model="scope.row.x2" placeholder="请输入坐标"></el-input>
                  <div class="item__txt">{{scope.row.x2}}</div>
                </div>
              </el-table-column>
              <el-table-column
                prop="Y2"
                label="Y2"
                width="210">
                <div class="item" slot-scope="scope">
                  <el-input class="item__input" v-model="scope.row.y2" placeholder="请输入坐标"></el-input>
                  <div class="item__txt">{{scope.row.y2}}</div>
                </div>
              </el-table-column>
            </el-table-column>

            <el-table-column label="半径">
              <el-table-column
                prop="R"
                label="R"
                width="210">
                <div class="item" slot-scope="scope">
                  <el-input class="item__input" v-model="scope.row.r" placeholder="请输入半径"></el-input>
                  <div class="item__txt">{{scope.row.r}}</div>
                </div>
              </el-table-column>
            </el-table-column>

            <el-table-column
              label="操作"
              width="55">
              <div class="item" slot-scope="scope">
                <el-button @click="delLine(scope.$index, scope.row)" type="text" size="small">删除</el-button>
              </div>
            </el-table-column>

          </el-table>
          <i class="el-icon-circle-plus-outline" @click="addLine()"></i>  <br>
          <!--          <el-button style="margin:20px 0 40px 100px" @click="buildLine()" type="primary">确认并绘制开挖轮廓线</el-button>-->
          <!--          <el-button style="margin:-60px 0 0 100px" @click="clearLine()" type="danger">一键清除坐标</el-button>-->
          <div class="proovr1-collect__tags" style="display: flex; align-items: center;">
            <button @click="buildLine" class="btn btn-1 btn-1b" style="margin-left: 370px" id="buildLine">查询并绘制开挖轮廓线</button>
            <button @click="clearLine" class="btn btn-1 btn-1b" style="margin-left: 60px" id="clearLine">一键清除坐标</button>
          </div>
        </div>
      </div>
      <!-- 表格填入结束 -->

      <div style="margin-left: 70px;">
        <!--         画布展示开始-->
        <!--         3D画布展示开始-->
        <el-table
          :data="tablesData1"
          size="large"
          style="width: 1160px;border: 1px solid #d4e3fc;margin-top: 40px;font-size: 20px;margin-bottom: 15px"
          :cell-style="cellStyle1"
          :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }">

          <el-table-column prop="ThreeD" label="视图" align="center" width="1159px">
            <template slot-scope="scope" >
              <!-- d导入 show 组件 -->
              <show :itemData="itemData" :key="timer"/>
            </template>
          </el-table-column>
        </el-table>

        <!--         3D画布展示结束-->
      </div>
      <!-- 表格填入结束 -->
    </div>
  </div>
</template>

<script>
import '~/assets/css2/pages.css'
import show from '../utilPage/pageEight/show.vue'
import cookie from 'js-cookie'
import outlineApi from '@/api/outline.js'
import {eventBus} from "@/plugins/nuxt-elementui";
import teamApi from "@/api/team"
export default {
  name:'pageEight',
  components:{show},
  data () {
    return {
      // 表格数据
      // projectId: '1694535741543624706',       //测试
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
        // {StringNum:1,x1: '8.710424',y1: '-2.5733',x2: '-4.35042',y2: '-2.5733',r: '0',serialLine:'',isBottom:1
        // },{StringNum:2,x1: '-4.35042',y1: '-2.5733',x2: '-4.55567',y2: '-0.7547',r: '0',serialLine:'',isBottom:0
        // },{StringNum: 3,x1: '-4.55567',y1: '-0.7547',x2: '-3.70087',y2: '3.345735',r: '6.7',serialLine: '',isBottom: 0
        // },{StringNum: 4,x1: '-3.70087',y1: '3.345735',x2: '2.18',y2: '6.765987',r: '6.766',serialLine: '',isBottom: 0
        // },{StringNum: 5,x1: '2.18',y1: '6.765987',x2: '8.06087',y2: '3.345735',r: '6.766',serialLine: '',isBottom: 0
        // },{StringNum: 6,x1: '8.06087',y1: '3.345735',x2: '8.915674',y2: '-0.7547',r: '6.7',serialLine: '',isBottom: 0
        // },{StringNum: 7,x1: '8.915674',y1: '-0.7547',x2: '8.710424',y2: '-2.5733',r: '0',serialLine: '',isBottom: 0
        // }
        // {StringNum: 1,x1: '-4.03',y1: '-0.5',x2: '-4.29',y2: '0.77',r: '0',serialLine: '',isBottom: 0},
        // {StringNum: 2,x1: '-4.29',y1: '0.77',x2: '-3.54',y2: '5.34',r: '6.54',serialLine: '',isBottom: 0},
        // {StringNum: 3,x1: '-3.54',y1: '5.34',x2: '7.94',y2: '5.34',r: '6.63',serialLine: '',isBottom: 0},
        // {StringNum: 4,x1: '7.94',y1: '5.34',x2: '8.69',y2: '0.77',r: '6.54',serialLine: '',isBottom: 0},
        // {StringNum: 5,x1: '8.69',y1: '0.77',x2: '8.43',y2: '-0.5',r: '0',serialLine: '',isBottom: 0},
        // {StringNum: 6,x1: '8.43',y1: '-0.5',x2: '-4.03',y2: '-0.5',r: '0',serialLine: '',isBottom: 1},


        // {StringNum: 1,x1: '8.5',y1: '-0.65',x2: '-4.1',y2: '-0.65',r: '0',serialLine: '',isBottom: 1},
        // {StringNum: 2,x1: '-4.1',y1: '-0.65',x2: '-4.465',y2: '1.477',r: '0',serialLine: '',isBottom: 0},
        // {StringNum: 3,x1: '-4.465',y1: '1.477',x2: '-3.688',y2: '5.213',r: '6.6',serialLine: '',isBottom: 0},
        // {StringNum: 4,x1: '-3.688',y1: '5.213',x2: '8.087',y2: '5.215',r: '6.7',serialLine: '',isBottom: 0},
        // {StringNum: 5,x1: '8.087',y1: '5.215',x2: '8.784',y2: '0.928',r: '6.6',serialLine: '',isBottom: 0},
        // {StringNum: 6,x1: '8.784',y1: '0.928',x2: '8.5',y2: '-0.65',r: '0',serialLine: '',isBottom: 0}
      ],
      // 需要编辑的属性
      editProp: ['X1', 'Y1','X2', 'Y2', 'R'],
    }
  },

  created(){
    eventBus.$on('cuttingDc',(data)=>{
      this.cuttingObj.cuttingDc = data.cuttingDc/100;
    })
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
    getTableData(msg)
    {
      this.tableData = msg;
    },
    //根据项目ID查询并绘制已保存的轮廓线
    buildLine(){
       console.log(this.tableData)
      // 获取项目ID
      this.projectId = cookie.get("projectId");
      this.cuttingObj.projectId = this.projectId;

      // 为每条数据添加项目ID
      this.tableData = this.tableData.map((item) => {
        return{
          ...item,
          projectId : this.projectId
        }
      })

      // 更新时间戳触发重绘
      this.timer = new Date().getTime()

      outlineApi.getOutlines(this.projectId).then(response => {
        const outlineList = response.data && Array.isArray(response.data.data)
          ? response.data.data
          : (Array.isArray(response.data) ? response.data : []);
        this.tableData = outlineList;
        this.itemData = {data: outlineList};
        this.timer = new Date().getTime();
        console.log("轮廓线查询成功", outlineList);

        const btn = document.getElementById("buildLine");
        if (btn) {
          btn.innerHTML = "已查询并绘制轮廓线";
          btn.style.backgroundColor = "#79FDFF";
          btn.style.color = "#206686";
        }

      }).catch((err) => {
        console.error("轮廓线请求异常", err);
        this.$message({message: '轮廓线查询失败', type: 'error'});
      });
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
        document.getElementById("clearLine").innerHTML= "已成功清除坐标";
        document.getElementById("clearLine").style.backgroundColor = "#79FDFF";
        document.getElementById("clearLine").style.color = "#206686";
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
  },
  mounted(){
    this.buildLine();
    eventBus.$on('autoMode', (data)=>{
      if(data.autoStep == 1){
        this.buildLine()
        setTimeout(() => {
          eventBus.$emit('autoMode',{autoStep:2})
        },1000)
      }
    })
  },
  beforeDestroy(){
    eventBus.$off('autoMode')
  },

}
</script>


<style scoped>
.title-front{
  margin-top: 50px;
  font-size: 40px !important;
}
.card5{
  height: auto;
  width: 100%;
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
.change_main{
  display: flex;
  justify-content: center;
}
.change_main div{
  cursor: pointer;
  padding: 15px;
}
.is-Active{
  color: #409EFF;
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
</style>
