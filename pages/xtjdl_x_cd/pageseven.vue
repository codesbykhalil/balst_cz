<template>
  <div class="card5_1">
    <div>
      <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: black;margin-left: 40px;">7 钻孔与炸药</h2><br><br>
      <h3 class="font-type7" style=" margin-top: -30px"><strong>炮孔直径：</strong>
        <br>
        <el-input style="width:1167px;margin-top: 10px" v-model="diameter"><template slot="suffix">mm</template></el-input>
      </h3>

      <br/>
      <h3 class="font-type7"><strong>设计进尺：</strong>
        <br>
        <el-input style="width:1167px;margin-top: 10px" v-model="advance"><template slot="suffix">m</template></el-input>
      </h3>
      <br/>


      <h3 class="font-type7"><strong>炸药密度：</strong>
        <br>
        <el-input style="width:1167px;margin-top: 10px" v-model="density"><template slot="suffix">kg/m3</template></el-input>
      </h3>

      <br/>

      <h3 class="font-type7"><strong>炸药爆速：</strong>
        <br>
        <el-input style="width:1167px;margin-top: 10px" v-model="burstSpeed"><template slot="suffix">m/s</template></el-input>
      </h3>

    </div>

    <div>
      <div class="proovr1-collect__tags" style="align-items: center;padding-bottom: 12px">
        <span @click="saveMessage" class="proovr1-collect__tag" style="margin-left: 550px;">确认并保存工程信息</span>
      </div>
    </div>

  </div>
</template>

<script>
import calculateApi from '@/api/calculate.js'
import cookie from 'js-cookie'
import {eventBus} from "../../plugins/nuxt-elementui";
export default {
  name:"pageseven",
  data () {

    return {
      // strength1:'',
      // strength2:3,
      // indexNum:'',
      diameter: 50,
      advance: '3',
      density: '1100',
      burstSpeed: '4100',
      // explosivityIndexObj:{}, //计算岩石普氏可爆性指数
      saveProjectMessage:{},
    }
  },
  created() {
    //回显上台阶数据
    if(cookie.get('dwData')){
      let upData = JSON.parse(cookie.get('dwData'));
      this.diameter=dwData.holeDiameter*1000;
      this.advance=dwData.holeLength;
      this.density=dwData.explosiveDensity;
      this.burstSpeed=dwData.d;
    }

    eventBus.$on('rock-id-updated',(data)=>{this.saveProjectMessage.rockId = data.rockId;});
    eventBus.$on('ucs_updated',(data)=>{this.saveProjectMessage.ucs = data.ucs;});
    eventBus.$on('structureScore_updated',(data)=>{this.saveProjectMessage.structureScore = data.structureScore;});
    eventBus.$on('structuralPlaneScore_updated',(data)=>{this.saveProjectMessage.structuralPlaneScore = data.structuralPlaneScore;});
    // eventBus.$on('data-sent',(data)=>{
    //   console.log('收到事件:', data);
    //   this.saveProjectMessage.rockId = data.rockId
    //     ,this.saveProjectMessage.ucs = data.ucs
    //     ,this.saveProjectMessage.structureScore = data.structureScore
    //     ,this.saveProjectMessage.structuralPlaneScore = data.structuralPlaneScore,
    //     this.saveProjectMessage.indexNum = data.indexNum;
    // })
    // eventBus.$on('dataToSendEvent', (data)=>{this.saveProjectMessage.indexNum=data.indexNum;})
    eventBus.$on('s12_updated',(data)=>{this.saveProjectMessage.strength1 = data.strength1;this.saveProjectMessage.strength2 = data.strength2;});
    eventBus.$on('index_updated',(data)=>{this.saveProjectMessage.indexNum = data.indexNum});
    eventBus.$on('data-from-a',(data)=>{this.saveProjectMessage.strength1 = data.strength1;this.saveProjectMessage.strength2 = data.strength2;})

    //云端文件导入回显
      eventBus.$on('cloudFiles',(data)=>{
        if(data!=null){
          this.advance = data.holeLength;
          this.density = data.explosiveDensity;
          this.burstSpeed = data.d;
          cookie.set("projectId",data.id)
        }
      });
  },
  beforeDestroy() {
    eventBus.$off('rock-id-updated');
    eventBus.$off('ucs_updated');
    eventBus.$off('structureScore_updated');
    eventBus.$off('structuralPlaneScore_updated')
    eventBus.$off('dataToSendEvent')
    eventBus.$off('s12_updated');
    eventBus.$off('index_updated');
    eventBus.$off('data-from-a');
    eventBus.$off('cloudFiles');
  },
  methods:{
    //保存 /更新工程信息
    saveMessage(){
      // console.log(this.$route.params.rockId);
      // console.log(this.$route.params.ucs);
      // console.log(this.$route.params.structureScore);
      // console.log(this.$route.params.structuralPlaneScore);
      // console.log(this.saveProjectMessage.strength1);
      // console.log(this.saveProjectMessage.strength2);

      // this.saveProjectMessage.rockId = this.$route.params.rockId;
      // this.saveProjectMessage.ucs = this.$route.params.ucs;
      // this.saveProjectMessage.structureScore = this.$route.params.structureScore;
      // this.saveProjectMessage.structuralPlaneScore = this.$route.params.structuralPlaneScore;
      // this.saveProjectMessage.indexNum = this.$route.params.ucs/10;
      // this.saveProjectMessage.advance = this.$route.params.advance;
      if(this.saveProjectMessage.indexNum!=null){
          this.saveProjectMessage.explosivityIndex = this.saveProjectMessage.indexNum ;
          this.saveProjectMessage.rockId= this.saveProjectMessage.rockId;
          this.saveProjectMessage.ucs= this.saveProjectMessage.ucs;
          this.saveProjectMessage.structureScore= this.saveProjectMessage.structureScore;
          this.saveProjectMessage.structuralPlaneScore= this.saveProjectMessage.structuralPlaneScore;
          this.saveProjectMessage.buriedDeep=this.saveProjectMessage.strength1;
          this.saveProjectMessage.initialGroundStress=this.saveProjectMessage.strength2*1000000;
          this.saveProjectMessage.holeDiameter=this.diameter/1000;
          this.saveProjectMessage.holeLength=this.advance;
          this.saveProjectMessage.explosiveDensity=this.density;
          this.saveProjectMessage.d=this.burstSpeed;

          this.saveProjectMessage.tunnelName=null;
          this.saveProjectMessage.workArea=null;
          this.saveProjectMessage.workFace=null;
          this.saveProjectMessage.mileage=null;
          console.log(this.saveProjectMessage)
          if(cookie.get('dwProjectId')){
            let dwData = JSON.parse(cookie.get('dwData'))
            this.saveProjectMessage.excavationCode=dwData.excavationCode;
            this.saveProjectMessage.dwProjectId=dwData.dwProjectId;
          }else{
            this.saveProjectMessage.excavationCode='001005';
            this.saveProjectMessage.dwProjectId="";
          }

        this.isReady()
      }else{
        alert("请正确填入数据！")
      }
    },
    isReady(){
      if(cookie.get("dwProjectId"))
        this.saveProjectMessage.id = cookie.get("dwProjectId");
      else
        this.saveProjectMessage.id = '';
      console.log(this.saveProjectMessage);
      calculateApi.saveProject(this.saveProjectMessage).then(response => {
        if(response.data.code==1){
          cookie.set("dwProjectId",response.data.data.id);

          //若修改了下台阶数据，则及时更新
          // if(cookie.get('upProjectId')){
          //   calculateApi.upDownProject(response.data.data.id).then(response => {
          //     let upDatas=response.data.data
          //     console.log(JSON.stringify(upDatas))
          //     cookie.set('upData', JSON.stringify(upDatas));
          //   })
          // }

          alert("工程信息保存成功!");
        }else{
          alert("工程信息保存失败，请重新尝试!");
        }
      })
    }
  }
}
</script>

<style>
.title-front{
    margin-top: 50px;
    font-size: 40px !important;
}
.card1{
    height: 600px;
    width: 100%;
}
.card5{
  height: auto;
  width: 100%;
}
.strength-div7{
  display:inline-block;
  width: 300px;
  height: auto;
}
.font-type7{
  margin-left: 50px;
  font-size: 18px !important;
  width: auto;
}
/*.font-type2{*/
/*  margin-left: 30%;*/
/*  font-size: 30px !important;*/
/*  width: 400px;*/
/*}*/
/*.font-type3{*/
/*  margin-left: 50px;*/
/*  font-size: 30px !important;*/
/*  width: 1200px;*/
/*}*/
.el-input__suffix {
  margin-top: 9px;
}
</style>
