<template>
  <div class="card8_1">
    <div>
      <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: black;margin-left: 40px;">13 起爆网络设计</h2>
      <br/>
          <h3 class="font-type6" style="display:inline-block">控制单响药量不超过：
             <el-input style="width:100px" v-model="I"><template slot="suffix">kg</template></el-input>
          </h3>
      <br/>
        <div class="proovr-collect__tags" style="display: flex; align-items: center;">
<!--          <el-button style="margin:20px 0 20px 10px" @click="calculate()" type="primary">炮孔起爆时序计算</el-button>-->
          <span class="proovr-collect__tag" style="margin:20px 0 20px 63px;width:200px" @click="calculate()">炮孔起爆时序计算</span>
        </div>


        <!-- 表格填入开始 -->
        <div style="margin-left: 63px">
          <tables :holeData="holeData" :key="timer"/>
        </div>
        <!-- 表格填入结束 -->

      <div style="margin-top: 20px;margin-left: 55px;width: 1160px;display: flex; justify-content: space-between;">
        <!--         2D画布展示开始-->
        <div style="width: 545px;background-color: pink;margin-right: 70px">

        </div>
        <!--         2D画布展示开始-->
        <!--         3D画布展示开始-->
        <div style="background-color: black">
          <show :vertices="vertices" :tube="tube" :key="timer"/>
        </div>
        <!--         3D画布展示结束-->
      </div>
        <!-- 画布展示开始 -->
<!--        <div style="width:560px;height:450px;float:left;margin:20px 0 0 50px;background-color: black">-->
<!--          <show :vertices="vertices" :tube="tube"/>-->
<!--        </div>-->
        <!-- 画布展示结束 -->

      <br/>
      <div class="proovr-collect__tags" style="display: flex; justify-content: space-between;padding-left: 300px;padding-right: 300px">
        <!--      <el-button style="margin:20px 0 20px 200px" @click="calculate()" type="primary">计算与绘图</el-button>-->
        <span @click="drop_stj" class="proovr-collect__tag" >跳转至上台阶</span>
        <span @click="drop_mtj" class="proovr-collect__tag" >跳转至中台阶</span>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css2/pages.css'
import cookie from 'js-cookie'
import tables from '../utilPage/pageThirteen/table.vue'
import show from '../utilPage/pageThirteen/show.vue'
import outPutApi from "@/api/outPut";
import calculateApi from "@/api/calculate";
export default {
    components:{tables,show},
    data(){
        return{
          I:100,        //一次起爆药量
          projectId:'',
          holeData:[],
          holeDataMir:[],
          i:0,
          timer: '',
          vertices:[],
          tube:[],
          indexNum:0,
          submitDataBody:{},
        }
    },
    methods:{
      drop_stj(){
        window.location.href = '/stjdl_drop';
      },
      drop_mtj(){
        window.location.href = '/mtjdl_drop';
      },
      calculate(){
        // this.projectId = '1742912484875014145'
        this.projectId = cookie.get("dwProjectId");
        let datas = {"I": Number(this.I),"dwProjectId": this.projectId}
        outPutApi.dw_sequence(datas).then(response => {
          console.log(JSON.stringify(response.data.data))
          this.holeData = response.data
        })
          // calculateApi.getLoginData().then(response => {
          //   console.log("铁建重工token"+JSON.stringify(response.data.data.msg))
          //
          //   this.submitDataBody.authorization = response.data.data.msg;
          //   this.submitDataBody.projectId = this.projectId;
          //   this.submitDataBody.projectName = "康定2号隧道1号横洞";
          //   this.submitDataBody.mileage = "962.25";//传值
          //   this.submitDataBody.dataType = "6";
          //
          //   calculateApi.submitData(this.submitDataBody).then(response => {
          //     console.log("是否上传成功："+JSON.stringify(response.data.data.msg))
          //     alert("数据上传至铁建重工状态："+JSON.stringify(response.data.data.msg))
          //   })
          // })
      },
    }
}
</script>

<style>
</style>
