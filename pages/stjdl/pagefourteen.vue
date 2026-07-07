<template>
  <div>
    <div  style="width: 1450px;height: 600px">
      <h2 class= title-before style="margin-top: 21px;font-size: 20px;!important;color: black;margin-left: 40px;">14 爆破效果预测</h2>

      <div style="margin-top:50px">
          <h3 class="font-type6" style="display:inline-block">一次起爆药量不超过：
            <el-input style="width:100px" v-model="I"><template slot="suffix">kg</template></el-input>
          </h3>
          <el-button style="margin:20px 0 20px 10px" @click="calculate()" type="primary">炮孔起爆时序计算</el-button>
      </div>

      <div>
        <!-- 表格填入开始 -->
        <div style="float:left;margin-left:20px">
          <!-- <tables/> -->
        </div>
        <!-- 表格填入结束 -->

        <!-- 画布展示开始 -->
        <div style="width:450px;height:300px;float:left;margin:-180px 0 0 10px;border: 3px solid #e4e7ed;background-color:pink">
        </div>
        <!-- 画布展示结束 -->
      </div>

    </div>
  </div>
</template>

<script>
import '~/assets/css2/pages.css'
import cookie from 'js-cookie'
import tables from '../utilPage/pageFourteen/table.vue'
import surroundingHolesApi from '@/api/surroundingHoles.js'
import cuttingApi from '@/api/cutting.js'
import auxiliaryHolesApi from '@/api/auxiliaryHoles.js'
export default {
    components:{tables},
    data(){
        return{
          I:0,        //一次起爆药量
          upProjectId:'',
        }
    },
    methods:{
      calculate(){
            // this.projectId = '1695249792384970753'
            this.projectId = cookie.get("upProjectId");
            this.i = 0;
            this.timer = new Date().getTime()
            this.holeData =this.holeData.slice(0,0);
            this.holeDataMir =this.holeDataMir.slice(0,0);
            this.cal1()
        },
    }
}
</script>

<style>
</style>
