<template>
  <div>
    <el-table
      :data="tableData"
      ref="tableRef"
      style="width: 1160px;border: 1px solid #5B9BD5"
      size="large"
      max-height="380"
      border :row-class-name="tableRowClassName"
      class="myTable"
      @cell-mouse-enter="handleCellEnter"
      @cell-mouse-leave="handleCellLeave"
      @selection-change="handleSelectionChange"
      :cell-style="cellStyle"
      :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }"
    >
      <div slot="empty" style="background-color: #01366a;width: 1200px;margin-left: -315px">暂无数据</div>
      <!-- 等级 -->
      <el-table-column label="">
        <el-table-column
          prop="holeNum"
          label=""
          width="119"
          align="center">
          <div class="item" slot-scope="scope">
            <el-input class="item__input" v-model="scope.row.holeNum"></el-input>
            <div class="item__txt">{{scope.row.holeNum}}</div>
          </div>
        </el-table-column>
      </el-table-column>

      <el-table-column label="孔口坐标" align="center">
        <el-table-column
          prop="X1"
          label="X1"
          width="130"
          align="center">
          <div class="item" slot-scope="scope">
            <el-input class="item__input" v-model="scope.row.x1"></el-input>
            <div class="item__txt">{{scope.row.x1}}</div>
          </div>
        </el-table-column>
        <el-table-column
          prop="Y1"
          label="Y1"
          width="130"
          align="center">
          <div class="item" slot-scope="scope">
            <el-input class="item__input" v-model="scope.row.y1"></el-input>
            <div class="item__txt">{{scope.row.y1}}</div>
          </div>
        </el-table-column>
      </el-table-column>

      <el-table-column label="孔底坐标" align="center">
        <el-table-column
          prop="X2"
          label="X2"
          width="130"
          align="center">
          <div class="item" slot-scope="scope">
            <el-input class="item__input" v-model="scope.row.x2"></el-input>
            <div class="item__txt">{{scope.row.x2}}</div>
          </div>
        </el-table-column>
        <el-table-column
          prop="Y2"
          label="Y2"
          width="130"
          align="center">
          <div class="item" slot-scope="scope">
            <el-input class="item__input" v-model="scope.row.y2"></el-input>
            <div class="item__txt">{{scope.row.y2}}</div>
          </div>
        </el-table-column>
        <el-table-column
          prop="Z2"
          label="Z2"
          width="130"
          align="center">
          <div class="item" slot-scope="scope">
            <el-input class="item__input" v-model="scope.row.z2"></el-input>
            <div class="item__txt">{{scope.row.z2}}</div>
          </div>
        </el-table-column>
      </el-table-column>

      <el-table-column
        prop="azimuth"
        label="方位角"
        width="130"
        align="center">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.azimuth"></el-input>
          <div class="item__txt">{{scope.row.azimuth}}</div>
        </div>
      </el-table-column>

      <el-table-column
        prop="distance"
        label="外偏距离(m)"
        width="130"
        align="center">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.offsetDistance"></el-input>
          <div class="item__txt">{{scope.row.offsetDistance}}</div>
        </div>
      </el-table-column>

      <el-table-column
        label="操作"
        width="130"
        align="center">
        <div class="item" slot-scope="scope">
          <el-button @click="delRow(scope.$index, scope.row)" type="text" size="small">删除</el-button>
        </div>
      </el-table-column>
    </el-table>
    <i class="el-icon-circle-plus-outline" @click="addRow()"></i><br>
    <div class="proovr-collect__tags" style="display: flex; align-items: center;">
      <!--  <el-button style="margin:20px 0 20px 200px" @click="buildLine()" type="primary">手动调整确认并绘图</el-button>-->
      <!--    <span @click="buildLine" class="proovr-collect__tag" style="margin:20px 0 0 515px">手动调整确认并绘图</span>-->
    </div>
  </div>
</template>

<script>
import '~/assets/css2/pages.css'
export default {
  name:'tables',
  props:{
    holeTable:{type: Array,
      default () {
        return []
      }},
  },
  data() {
    return {
      tableData: [], // 需要渲染的数据
      saveDATA: [], // 所有数据
      tableRef: null, // 设置了滚动的那个盒子
      tableWarp: null,
      scrollTop: 0,
      num: 0,
      start: 0,
      end: 42, // 3倍的pageList
      starts: 0, // 备份[保持与上一样]
      ends: 42, // 备份[保持与上一样]
      pageList: 14, // 一屏显示
      itemHeight: 41, // 每一行高度
      editProp: ['holeNum','X1','Y1','X2','Y2','Z2','azimuth','distance'],
    }
  },
  watch: {
    num: function(newV) {
      // 因为初始化时已经添加了3屏的数据，所以只有当滚动到第3屏时才计算位移量
      if (newV > 1) {
        this.start = (newV - 1) * this.pageList
        this.end = (newV + 2) * this.pageList
        requestAnimationFrame(() => {
          // 计算偏移量
          this.tableWarp.style.transform = `translateY(${this.start *
          this.itemHeight}px)`
          this.tableData = this.saveDATA.slice(this.start, this.end)
        })
      } else {
        requestAnimationFrame(() => {
          this.tableData = this.saveDATA.slice(this.starts, this.ends)
          this.tableWarp.style.transform = `translateY(0px)`
        })
      }
    },
    holeTable:{
      handler(newV) {
        console.log("newV"+newV.length)
        this.saveDATA = []
        this.tableData= []
        this.saveDATA = newV;
        this.$nextTick(() => {
          // 设置了滚动的盒子
          this.tableRef = this.$refs.tableRef.bodyWrapper
          /**
           * fixed-left | 主体 | fixed-right
           */
            // 主体改造
            // 创建内容盒子divWarpPar并且高度设置为所有数据所需要的总高度
          let divWarpPar = document.createElement('div')
          // 如果这里还没获取到saveDATA数据就渲染会导致内容盒子高度为0，可以通过监听saveDATA的长度后再设置一次高度
          divWarpPar.style.height = this.saveDATA.length * this.itemHeight + 'px'
          // 新创建的盒子divWarpChild
          let divWarpChild = document.createElement('div')
          divWarpChild.className = 'fix-warp'
          // 把tableRef的第一个子元素移动到新创建的盒子divWarpChild中
          divWarpChild.append(this.tableRef.children[0])
          // 把divWarpChild添加到divWarpPar中，最把divWarpPar添加到tableRef中
          divWarpPar.append(divWarpChild)
          this.tableRef.append(divWarpPar)

          // 被设置的transform元素
          this.tableWarp = document.querySelector(
            '.el-table .el-table__body-wrapper .fix-warp'
          )

          this.tableRef.addEventListener('scroll', this.onScroll)
        })
        this.init();
      },
    },
  },
  methods: {
    tableRowClassName({row,rowIndex}){
      if(rowIndex %2=== 1){
        return 'warning-row';
      }else if (rowIndex %2=== 0){
        return 'success-row';
      }
      return '';
    },
    handleSelectionChange(selection) {
      selection.map((item) => {
        item.isBottom = 1;
      })
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "height:35px!important; border-color:black!important; color:#000000!important; padding:0px!important; height:40px!important";
    },
    buildLine(){
      console.log(this.tableData)
    },
    init() {
      this.tableData = this.saveDATA.slice(this.start, this.end)
    },
    onScroll() {
      this.scrollTop = this.tableRef.scrollTop
      this.num = Math.floor(this.scrollTop / (this.itemHeight * this.pageList))
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
    //添加
    addRow(){
      this.tableData.push({
        holeNum:'',x1:'',y1:'',x2:'',y2:'',z2:'',azimuth:'',distance:''
      })
    },
    //删除行
    delRow(index, row) {
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
  }
}
</script>
<style>
/*滚动条样式*/

.myTable .el-table__body-wrapper::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}

.myTable .el-table__body-wrapper::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 2px;
  background: #666;
}

.myTable .el-table__body-wrapper::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: #ccc;
}
.el-table .warning-row{
  background: #01366a;
}
.el-table .success-row{
  background: #00122c;
}
</style>
