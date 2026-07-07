<template>
      <div style="height:auto;">
        <!-- 表格开始 -->
        <div style="float:left">
          <el-table
            :data="angleData"
            stripe
            border
            :span-method="objectSpanMethod"
            size="mini"
            style="width: 1160px;margin-top:20px;"
            @row-click="singleElection"
          >
            <!-- 走向与洞轴线夹角 -->
            <el-table-column
              prop="angle"
              label="走向与洞轴线夹角"
              align="center"
              width="290">
              <div class="item" slot-scope="scope">
                <el-input class="item__input" v-model="scope.row.angle"></el-input>
                <div class="item__txt">{{scope.row.angle}}</div>
              </div>
            </el-table-column>

            <!-- 倾角 -->
            <el-table-column
              prop="dipAngle"
              label="倾角"
              align="center"
              width="290">
              <div class="item" slot-scope="scope">
                <el-input class="item__input" v-model="scope.row.dipAngle"></el-input>
                <div class="item__txt">{{scope.row.dipAngle}}</div>
              </div>
            </el-table-column>

            <el-table-column
              prop="J"
              label="J修正值"
              align="center"
              width="290">
              <div class="item" slot-scope="scope">
                <el-input class="item__input" v-model="scope.row.J"></el-input>
                <div class="item__txt">{{scope.row.J}}</div>
              </div>
            </el-table-column>

            <el-table-column label="" width="289">
              <template slot-scope="scope">
                  <el-radio class="radio" v-model="selected" :label="scope.$index">&nbsp;</el-radio>
              </template>
            </el-table-column>

          </el-table>
          <div>
            <div class="proovr-collect__tags" style="display: flex; align-items: center;">

            <!--            <el-button style="margin:30px 0 20px 200px" @click="predict()" type="primary">周边孔超挖量预测</el-button>-->
              <span @click="calculate" class="proovr-collect__tag" style="margin:30px 0 20px 515px">周边孔超挖量预测</span>
            </div>
            <h3 class="font-type8" >超挖量预计为：
              <el-input style="width:1030px;margin-top: -20px"><template slot="suffix">m</template></el-input>
              <!-- <el-input style="width:150px" v-model="density"><template slot="suffix">m</template></el-input> -->
            </h3>
          </div>
        </div>
        <!-- 表格结束 -->
      </div>
</template>

<script>
import '~/assets/css2/pages.css'
import { getMergeCells } from '@/utils/table.js'
export default {
  data(){
    return{
      tableColumn: [
        { prop: 'angle', label: '走向与洞轴线夹角' }
      ],
      angleData: [
        {angle:'无主节理', dipAngle:'/', J:'1.0'},
        {angle:'0°~30°', dipAngle:'0°~30°', J:'0.6'},
        {angle:'0°~30°', dipAngle:'30°~60°', J:'0.5'},
        {angle:'0°~30°', dipAngle:'60°~90°', J:'0.4'},
        {angle:'30°~60°', dipAngle:'0°~30°', J:'0.25'},
        {angle:'30°~60°', dipAngle:'30°~60°', J:'0.2'},
        {angle:'30°~60°', dipAngle:'60°~90°', J:'0.15'},
        {angle:'60°~90°', dipAngle:'0°~30°', J:'0.05'},
        {angle:'60°~90°', dipAngle:'30°~60°', J:'0.04'},
        {angle:'60°~90°', dipAngle:'60°~90°', J:'0.03'},
      ],
      selected:{},
    }
  },
  computed: {
    // 获取所有单元格合并数据
    spanArr() {
      if (!this.tableColumn.length) return []
      const mergeCols = ['angle'] // 需要合并的列（字段）
      return getMergeCells(this.angleData, this.tableColumn, mergeCols)
    },
  },
  methods:{
    // 表数据合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      return this.spanArr[rowIndex][columnIndex]
    },

    singleElection (val) {
      this.selected = val.angle;
      alert(this.selected)
    },

  },

}
</script>

<style>
</style>
