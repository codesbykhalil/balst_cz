<template>
  <el-table
    :data="tableData"
    ref="tableRef"
    style="width: 1160px;border: 1px solid rgba(35,73,109,1)"
    :cell-style="cellStyle"
    :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }"
    size="medium"
    max-height="450"
    stripe
    class="myTable"

  >
    <div slot="empty" style="background-color: #01366a;width: 1200px;margin-left: -315px">暂无数据</div>
    <!-- 序号 -->
    <el-table-column
      prop="holeNum"
      label="序号"
      align="center"
      width="100px"
      style="border-color: #73868E">
    </el-table-column>

    <!-- 炮孔类型 -->
    <el-table-column
      prop="holeStyle"
      label="炮孔类型"
      width="110"
      align="center"
      style="border-color: #73868E;">
    </el-table-column>

    <el-table-column label="孔口坐标(m)" align="center">
      <el-table-column
        prop="x1"
        label="X"
        width="119"
        align="center">
      </el-table-column>
      <el-table-column
        prop="y1"
        label="Y"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="z1"
        label="Z"
        width="150"
        align="center">
      </el-table-column>
    </el-table-column>

    <el-table-column label="孔底坐标(m)" align="center">
      <el-table-column
        prop="x2"
        label="X"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="y2"
        label="Y"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="z2"
        label="Z"
        width="100"
        align="center">
      </el-table-column>
    </el-table-column>

    <el-table-column
      prop="explosiveAmount"
      label="装药量(kg)"
      width="130"
      align="center">
    </el-table-column>

    <el-table-column
      prop="rolling_count"
      label="药卷个数"
      width="130"
      align="center">
    </el-table-column>
  </el-table>
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
          divWarpChild.className = 'fix-warp3'
          // 把tableRef的第一个子元素移动到新创建的盒子divWarpChild中
          divWarpChild.append(this.tableRef.children[0])
          // 把divWarpChild添加到divWarpPar中，最把divWarpPar添加到tableRef中
          divWarpPar.append(divWarpChild)
          this.tableRef.append(divWarpPar)

          // 被设置的transform元素
          this.tableWarp = document.querySelector(
            '.el-table .el-table__body-wrapper .fix-warp3'
          )

          this.tableRef.addEventListener('scroll', this.onScroll)
        })
        this.init();
      },
    },
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "height:35px!important; border:1px solid rgba(35,73,109,1)!important; background-color:#011635;color:#FFFFFF!important; padding:0px!important; height:40px!important";
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
.myTable{
  border: 1px solid black;
}
</style>
