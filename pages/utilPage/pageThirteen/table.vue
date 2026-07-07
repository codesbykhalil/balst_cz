<template>
  <div>
    <el-table
      :data="tableData"
      ref="tableRef"
      style="width: 1160px;border: 1px solid rgba(35,73,109,1)"
      max-height="380"
      border
      stripe
      class="myTable"
      :cell-style="cellStyle"
      :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }"
    >
      <div slot="empty" style="background-color: #01366a;width: 1200px;margin-left: -315px">暂无数据</div>
      <!-- 序号 -->
      <el-table-column
        prop="Serial_num"
        label="序号"
        width="232"
        align="center">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.Serial_num"></el-input>
          <div class="item__txt">{{scope.row.Serial_num}}</div>
        </div>
      </el-table-column>

      <el-table-column
        prop="Hole_type"
        label="炮孔类型"
        width="232"
        align="center">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.Hole_type"></el-input>
          <div class="item__txt">{{scope.row.Hole_type}}</div>
        </div>
      </el-table-column>
      <el-table-column
        prop="Explosive_amount"
        label="装药量(kg)"
        width="232"
        align="center">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.Explosive_amount"></el-input>
          <div class="item__txt">{{scope.row.Explosive_amount}}</div>
        </div>
      </el-table-column>
      <el-table-column
        prop="Firing_sequence"
        label="起爆顺序"
        width="232"
        align="center">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.Firing_sequence"></el-input>
          <div class="item__txt">{{scope.row.Firing_sequence}}</div>
        </div>
      </el-table-column>
      <el-table-column
        prop="Time"
        label="起爆时间(ms)"
        width="231"
        align="center">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.Time"></el-input>
          <div class="item__txt">{{scope.row.Time}}</div>
        </div>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import '~/assets/css2/pages.css'
export default {
  name:'tables',
  props:{
    holeData:{type: Array,
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
      editProp: ['Serial_num','Hole_type','Explosive_amount','Firing_sequence','Time'],
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
    holeData:{
      handler(newV) {
        this.saveDATA = []
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
          divWarpChild.className = 'fix-warp4'
          // 把tableRef的第一个子元素移动到新创建的盒子divWarpChild中
          divWarpChild.append(this.tableRef.children[0])
          // 把divWarpChild添加到divWarpPar中，最把divWarpPar添加到tableRef中
          divWarpPar.append(divWarpChild)
          this.tableRef.append(divWarpPar)

          // 被设置的transform元素
          this.tableWarp = document.querySelector(
            '.el-table .el-table__body-wrapper .fix-warp4'
          )

          this.tableRef.addEventListener('scroll', this.onScroll)
        })
        this.init();
      },
    },
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "height:35px!important;border:1px solid rgba(35,73,109,1)!important; background-color:#011635;color:#FFFFFF!important; padding:0px!important; height:40px!important";
    },
    init() {
      this.tableData = this.saveDATA.slice(this.start, this.end)
      //   console.log("this.tableData   "+JSON.stringify(this.tableData))
    },
    onScroll() {
      this.scrollTop = this.tableRef.scrollTop
      this.num = Math.floor(this.scrollTop / (this.itemHeight * this.pageList))
    },
    //添加
    addRow(){
      this.tableData.push({
        holeNum:'孔', x1:'', y1:'',z1:'', x2:'', y2:'',z2:''
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
</style>
