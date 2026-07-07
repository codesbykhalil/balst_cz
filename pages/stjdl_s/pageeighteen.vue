<template>
  <div class="card8_1">
    <div>
      <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: black;margin-left: 40px;">11 设计模块切换</h2>
      <br/>
      <div class="proovr-collect__tags" style="display: flex; justify-content: space-between;padding-left: 300px;padding-right: 300px">
        <span @click="drop_mtj" class="proovr-collect__tag" style="margin-left: 30px">跳转至中台阶</span>
        <span @click="drop_xtj" class="proovr-collect__tag" style="margin-left: 400px">跳转至下台阶</span>
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
import {eventBus} from "@/plugins/nuxt-elementui";
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
  beforeDestroy() {
    eventBus.$off('step_updated');
  },
  created() {

  },
  methods:{
    drop_mtj(){
      window.location.href = 'mtjdl_drop'
    },
    drop_xtj(){
      window.location.href = 'xtjdl_drop';
    },
    calculate(){
      // this.projectId = '1742912484875014145'
      this.projectId = cookie.get("upProjectId");
      let datas = {"I": Number(this.I),"upProjectId": this.projectId}
      outPutApi.up_sequence(datas).then(response => {
        console.log(JSON.stringify(response.data.data))
        this.holeData = response.data
      })
    },
  }
}
</script>

<style>
</style>
