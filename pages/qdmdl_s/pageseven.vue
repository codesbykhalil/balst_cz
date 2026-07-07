<template>
  <div class="card5_1">
    <div>
      <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;
      color: white;margin-left: 40px;">7 钻孔与炸药</h2><br><br>
      <h3 class="font-type7" style=" margin-top: -30px;color: white"><strong>炮孔直径：</strong>
        <br>
        <el-input style="width:1167px;margin-top: 10px;margin-bottom: -20px" v-model="diameter"><template slot="suffix">mm</template></el-input>
      </h3>

      <br/>
      <h3 class="font-type7" style="color: white"><strong>设计进尺：</strong>
        <br>
        <el-input style="width:1167px;margin-top: 10px;margin-bottom: -20px" v-model="advance"><template slot="suffix">m</template></el-input>
      </h3>
      <br/>
      <h3 class="font-type7" style="color: white"><strong>装药类型：</strong></h3>
      <div style="margin-left: 50px">
        <el-radio-group style="margin-left: -10px;" v-model="radio" @change="switchRadio">
          <el-radio :label=1 border style="color:white;border: none;">40乳化装药</el-radio>
          <el-radio :label=2 border style="color:white;border: none;">32乳化装药</el-radio>
          <el-radio :label=3 border style="color:white;border: none;">装药台车装药</el-radio>
        </el-radio-group>
      </div>
      <h3 class="font-type7" style="color: white"><strong>炸药密度：</strong>
        <br>
        <el-input style="width:1167px;margin-top: 10px;margin-bottom: -20px" v-model="density"><template slot="suffix">kg/m3</template></el-input>
      </h3>

      <br/>

      <h3 class="font-type7" style="color: white"><strong>炸药爆速：</strong>
        <br>
        <el-input style="width:1167px;margin-top: 10px;margin-bottom: -20px" v-model="burstSpeed"><template slot="suffix">m/s</template></el-input>
      </h3>
      <br/>
      <h3 class="font-type7" style="color: white"><strong>图像中心点坐标：</strong>
        <el-input style="width:1167px;margin-top: 10px;margin-bottom: 0px" v-model="offsetX"><template slot="suffix">X轴</template></el-input>
        <el-input style="width:1167px;margin-top: 10px;margin-bottom: -20px" v-model="offsetY"><template slot="suffix">Y轴</template></el-input>
      </h3>
    </div>

    <div>
      <div class="proovr1-collect__tags" style="align-items: center;padding-bottom: 12px">
        <span @click="saveMessage" class="proovr1-collect__tag" style="margin-left: 550px;margin-top: 15px">确认并保存工程信息</span>
      </div>
    </div>

  </div>
</template>

<script>
import calculateApi from '@/api/calculate.js'
import cookie from 'js-cookie'
import {eventBus} from "../../plugins/nuxt-elementui";
import teamApi from "@/api/team"
export default {
  name:"pageseven",
  data () {
    return {
      isToggle:'false',
      chargeType:1,
      radio:1,
      diameter: 50,
      advance: '4.8',
      density: '1100',
      burstSpeed: '4100',
      saveProjectMessage:{},
      project1Info:{},
      indexNum:'1.55',
      offsetX: 2.18,
      offsetY: 4,
      isAuto:0,
    }
  },
  mounted() {
    eventBus.$on('dataToSendEvent', (data)=>{this.saveProjectMessage.indexNum=data.indexNum;})
    eventBus.$on('s12_updated',(data)=>{this.saveProjectMessage.strength1 = data.strength1;this.saveProjectMessage.strength2 = data.strength2;});
    eventBus.$on('index_updated',(data)=>{this.saveProjectMessage.indexNum = data.indexNum});
    eventBus.$on('data-from-a',(data)=>{this.saveProjectMessage.strength1 = data.strength1;this.saveProjectMessage.strength2 = data.strength2;});
    this.isAuto = cookie.get('isAutoMode')
    setTimeout(() => {
      if(this.isAuto == 1){
        this.saveMessage();
      }
    },1000);

  },
  beforeDestroy() {
    eventBus.$off('dataToSendEvent')
    eventBus.$off('s12_updated');
    eventBus.$off('index_updated');
    eventBus.$off('data-from-a');
  },
  created(){

  },
  watch:{
    diameter:{
      handler(newNum,oldNum){
        if (this.radio ===3){
          console.log(this.radio);
          eventBus.$emit('cuttingDc',{cuttingDc:this.diameter})
        }else {

        }
      },
      immediate: true
    }
  },
  methods:{
    switchRadio(val){
      if (val ===1 )
      {
        this.chargeType = 1;
        eventBus.$emit('cuttingDc',{cuttingDc:40})
      }
      if (val === 2) {
        this.chargeType = 2
        eventBus.$emit('cuttingDc',{cuttingDc:32})
      }
      else if (val === 3)
      {
        eventBus.$emit('cuttingDc',{cuttingDc:this.diameter})
        this.chargeType = 3
      }

    },
    // updateRockId(rockId){
    //
    // },
    //保存 /更新工程信息
    saveMessage(){
      console.log(this.$route.query.dataToSend.rockId);
      console.log(this.$route.query.dataToSend.ucs);
      console.log(this.$route.query.dataToSend.structureScore);
      console.log(this.$route.query.dataToSend.structuralPlaneScore);
      console.log(this.saveProjectMessage.strength1);
      console.log(this.saveProjectMessage.strength2);

      this.saveProjectMessage.rockId = this.$route.query.dataToSend.rockId;
      this.saveProjectMessage.ucs = this.$route.query.dataToSend.ucs;
      this.saveProjectMessage.structureScore = this.$route.query.dataToSend.structureScore;
      this.saveProjectMessage.structuralPlaneScore = this.$route.query.dataToSend.structuralPlaneScore;
      this.saveProjectMessage.indexNum = this.$route.query.dataToSend.ucs/10;

      if(this.saveProjectMessage.indexNum!=null){
        this.saveProjectMessage.explosivityIndex = this.saveProjectMessage.indexNum ;
        this.saveProjectMessage.rockId= this.saveProjectMessage.rockId;
        this.saveProjectMessage.ucs= this.saveProjectMessage.ucs * 1000000;
        // this.saveProjectMessage.structureScore= this.saveProjectMessage.structureScore;
        // this.saveProjectMessage.structuralPlaneScore= this.saveProjectMessage.structuralPlaneScore;
        //先设为定值
        this.saveProjectMessage.structureScore=16
        this.saveProjectMessage.structuralPlaneScore=14;
        this.saveProjectMessage.buriedDeep=this.saveProjectMessage.strength1;
        this.saveProjectMessage.initialGroundStress=this.saveProjectMessage.strength2*1000000;
        this.saveProjectMessage.holeDiameter=this.diameter/1000;

        if(this.$route.query.dataToSend.advance)
          this.saveProjectMessage.holeLength=this.$route.query.dataToSend.advance;
        else
          this.saveProjectMessage.holeLength=this.advance;
        this.saveProjectMessage.explosiveDensity=this.density;
        this.saveProjectMessage.d=this.burstSpeed;
        this.saveProjectMessage.chargeType = 1;
        this.saveProjectMessage.offsetX = "2.18"
        this.saveProjectMessage.offsetY = "4"
        this.saveProjectMessage.excavationCode='001001';
        if(cookie.get("projectId"))
          this.saveProjectMessage.id = cookie.get("projectId");
        else
          this.saveProjectMessage.id = '';
        console.log(this.saveProjectMessage);
        console.log(this.$route.query.dataToSend)
        calculateApi.saveProject(this.saveProjectMessage).then(response => {
          if(response.data.code==1){
            cookie.set("projectId",response.data.data.id);
            eventBus.$emit("advance",this.advance);
            //查询课题一保存的数据并保存(链接projectId)
            teamApi.getDataFromP1(cookie.get("mileageId")).then(response => {
              if(response.data.code == 1){
                this.project1Info = response.data.data;
                this.project1Info.projectId = cookie.get("projectId");
                console.log("pageseven obtain",JSON.stringify(this.project1Info))
                teamApi.saveDataFromP1(this.project1Info).then(response => {
                  if(response.data.code == 1){
                    let jsonData = {projectId:cookie.get("projectId"),statusCode:111}
                    teamApi.pushLogData(jsonData).then(response => {
                      console.log(response.data.data.data)
                      jsonData.statusCode = 112;
                      teamApi.pushLogData(jsonData).then(response => {
                        console.log(response.data.data.data)
                        //如果为1则为自动操作
                        if(this.isAuto == 1){
                          eventBus.$emit('autoMode',{autoStep:1})
                        }
                      })
                    })
                    console.log("已将数据推送至课题一")
                  }
                })
              }
            })
            // alert("工程信息保存成功!");
          }else{
            alert("工程信息保存失败，请重新尝试!");
          }
        })

      }else{
        alert("请正确填入数据！")
      }

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
.input7{
  width:1167px;
  margin-top: 10px;
  margin-bottom: -5px;
}
</style>
