<template>
<div>
<!--  <div class="proovr1-collect__tags" style="display: flex; align-items: center;">-->
<!--    <span class="proovr1-collect__tag" style="margin:5px 0 20px 568px;width:80px" @click="calculate">计算成本</span>-->
<!--  </div>-->
  <el-table
    :data="tableData"
    ref="tableRef"
    style="width: 1160px;height: auto;border: 1px solid rgba(35,73,109,1)"
    size="large"
    border
    stripe
    :span-method="objectSpanMethod"
    class="myTable"
    :row-style="rowStyle"
    :cell-style="cellStyle"
    :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a'   }"
  >
      <!-- 项目 -->
      <el-table-column
        prop="projectName"
        label="项目"
        width="220"
        align="center">
        <div class="item" slot-scope="scope">
          <el-input class="item__input" v-model="scope.row.projectName" :disabled="true" placeholder="请输入"></el-input>
          <div class="item__txt">{{scope.row.projectName}}</div>
        </div>
      </el-table-column>

    <!-- 型号 -->
    <el-table-column
      prop="size"
      label="型号"
      width="220"
      align="center">
      <div class="item" slot-scope="scope">
        <el-input class="item__input" v-model="scope.row.size" :disabled="true" placeholder="请输入"></el-input>
        <div class="item__txt">{{scope.row.size}}</div>
      </div>
    </el-table-column>

    <!-- 计量单位 -->
    <el-table-column
      prop="measure"
      label="计量单位"
      width="220"
      align="center">
      <div class="item" slot-scope="scope">
        <el-input class="item__input" v-model="scope.row.measure" :disabled="true" placeholder="请输入"></el-input>
        <div class="item__txt">{{scope.row.measure}}</div>
      </div>
    </el-table-column>

    <!-- 单价 -->
    <el-table-column
      prop="price"
      label="单价(元)"
      width="200"
      align="center">
      <template slot-scope="scope">
        <el-input
          v-model="scope.row.price"
          placeholder="请输入单价"
          :placeholder-style="{ textAlign: 'center' }"
        ></el-input>
      </template>
    </el-table-column>

    <!-- 工作量或消耗量 -->
    <el-table-column
      prop="workLoad"
      label="工作量或消耗量"
      width="200"
      align="center"
    >
      <template slot-scope="scope">
        <div >
          <el-input v-model="scope.row.workLoad" placeholder="请输入工作量或消耗量"></el-input>
        </div>
<!--        <div v-else>{{ scope.row.workLoad }}</div>-->
      </template>
    </el-table-column>

    <!-- 合价 -->
    <el-table-column
      prop="total"
      label="合价"
      align="center">
      <div class="item" slot-scope="scope">
        <el-input class="item__input" v-model="scope.row.total" :disabled="true" placeholder="请输入"></el-input>
        <div class="item__txt">{{scope.row.total}}</div>
      </div>
    </el-table-column>

  </el-table>
</div>
</template>

<script>
import '~/assets/css2/pages.css'
import cookie from 'js-cookie'
import {eventBus} from "@/plugins/nuxt-elementui";
import calculateApi from '@/api/calculate.js'
export default {
    name:'tables',
  data() {
    return {
      tableData: [
        {
          projectName:"钻孔",
          size:"50mm",
          measure:"m",
          price:'21',
          workLoad:'',
          total:''
        },
        {
          projectName:"炸药",
          size:"乳化炸药32mm",
          measure:"kg",
          price:'12',
          workLoad:'',
          total:''
        },
        {
          projectName:"雷管",
          size:"普通",
          measure:"发",
          price:'23',
          workLoad:'',
          total:''
        },
        {
          projectName:"导爆索",
          size:"普通",
          measure:"m",
          price:'3',
          workLoad:'',
          total:''
        },
        {
          projectName:"人工费",
          size:"普通",
          measure:"台班",
          price:'300',
          workLoad:'15',
          total:''
        },
        {
          projectName:"机械费",
          size:"其他机械",
          measure:"台班",
          price:'',
          workLoad:'',
          total:''
        },
        {
          projectName:"其他项目1",
          size:"自定义",
          measure:"自定义",
          price:'',
          workLoad:'',
          total:''
        },
        {
          projectName:"其他项目2",
          size:"自定义",
          measure:"自定义",
          price:'',
          workLoad:'',
          total:''
        },
        {
          projectName:"其他项目3",
          size:"自定义",
          measure:"自定义",
          price:'',
          workLoad:'',
          total:''
        },
        {
          projectName:"成本合计",
          size:"",
          measure:"",
          price:'',
          workLoad:'',
          total:''
        },
        {
          projectName:"综合单价",
          size:"",
          measure:"",
          price:'',
          workLoad:'',
          total:''
        }

      ], // 需要渲染的数据
      tableColumn: [
        { prop: 'projectName', label: '项目' },
        { prop: 'size', label: '型号' },
        { prop: 'measure', label: '计量单位' },
        { prop: 'price', label: '单价(元)' },
        { prop: 'workLoad', label: '工作量或消耗量' },
        { prop: 'total', label: '合价' },
      ],
      submitTableData: {},  //传递后端数据
    }
  },
  created(){
    eventBus.$on('autoMode', (data)=>{
      if(data.autoStep == 8){
        setTimeout(() => {
          this.calculate();
          setTimeout(() => {
            eventBus.$emit('autoMode',{autoStep:9})
          },500);
        },1000);
      }
    })
  },
  beforeDestroy() {
    eventBus.$off('autoMode');
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "height:35px!important;  border:1px solid rgba(35,73,109,1)!important; background-color:#011635;color:#FFFFFF; padding:0px!important; height:40px!important";
    },
    calculate(){
      this.submitTableData = {
        id: null,
        userId: null,
        drillingUnitPrice: this.tableData[0].price, //钻孔50mm单价
        explosivesUnitPrice: this.tableData[1].price, //乳化炸药32mm单价
        detonatorPrice: this.tableData[2].price, //普通雷管价格
        detonatingCordPrice: this.tableData[3].price, //普通导爆索价格
        laborCost: this.tableData[4].price, //人工费
        totalDrillingPrice: null, //钻孔总价
        totalExplosivesPrice: null, //炸药总价
        totalDetonatorPrice: null, //雷管总价
        totalDetonatingCordPrice: null, //导爆索总价
        totalLaborCost: null, //人工总价
        totalPrice: null, //成本总价
        comprehensiveUnitPrice: null, //综合单价
        projectId: cookie.get("projectId"),
        // projectId: "1750412397146341377",
        laborNum: this.tableData[4].workLoad //人工数
      }
      // console.log("成本计算="+JSON.stringify(this.submitTableData))
      calculateApi.getCost(this.submitTableData).then(response => {
        // console.log("成本计算="+JSON.stringify(response.data.data))
        this.tableData[0].total = response.data.data.totalDrillingPrice
        this.tableData[1].total = response.data.data.totalExplosivesPrice
        this.tableData[2].total = response.data.data.totalDetonatorPrice
        this.tableData[3].total = response.data.data.totalDetonatingCordPrice
        this.tableData[4].total = response.data.data.totalLaborCost
        // this.tableData[5].total = response.data.data.
        // this.tableData[6].total = response.data.data.
        this.tableData[9].size = response.data.data.totalPrice
        this.tableData[10].size = response.data.data.comprehensiveUnitPrice
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 10||rowIndex===9) {  // columnIndex：表示是第几行
        if (columnIndex  === 1) { // rowIndex：表示是第几列
          return {
            rowspan: 1,		// 2：需要合并的行数
            colspan: 5		// 1：需要合并的列数
          };
        } else if(columnIndex===2||columnIndex===3||columnIndex===4||columnIndex===5) {
          return {
            rowspan: 0,     // 0：只要是0，都代表着不显示
            colspan: 0
          };
        }

      }
    },
    setCellHeight() {
      return {
        height: '10px',
        padding:'2px'// 设置单元格宽度为 200px
      }
    },
    // 返回行样式的方法
    rowStyle({ row, rowIndex }) {
      if (rowIndex === 10||rowIndex === 11) {
        return { height: '40px' };
      } else {
        return {}; // 其他行的高度不做修改
      }
    }
  }
}
</script>
<style>

</style>
