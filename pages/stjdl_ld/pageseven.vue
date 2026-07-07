<template>
  <div class="card5_1">
    <div>
      <div style="padding-right: 20px" class="icon_title">
        <h2  class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;" >7-钻孔与炸药</h2>
      </div><br><br>
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
      <h3 class="font-type7"><strong>装药类型：</strong>
        <br>
        <el-radio-group style="margin-left: 18px;" v-model="radio" @change="switchRadio">
          <el-radio :label=1 border style="color:white;border: none;">40乳化装药</el-radio>
          <el-radio :label=2 border style="color:white;border: none;">32乳化装药</el-radio>
          <el-radio :label=3 border style="color:white;border: none;">装药台车装药</el-radio>
        </el-radio-group>
      </h3>

      <h3 class="font-type7"><strong>炸药密度：</strong>
        <br>
        <el-input style="width:1167px;margin-top: 10px" v-model="density"><template slot="suffix">kg/m3</template></el-input>
      </h3>

      <br/>

      <h3 class="font-type7"><strong>炸药爆速：</strong>
        <br>
        <el-input style="width:1167px;margin-top: 10px" v-model="burstSpeed"><template slot="suffix">m/s</template></el-input>
      </h3>
      <br>
      <h3 class="font-type7"><strong>图像中心点坐标：</strong>
        <br>
        <label><span style="color: #FFFFFF;font-size: 18px">x:</span></label>
        <el-input style="width:1148px;margin-top: 10px" v-model="offsetX"><template slot="suffix">m</template></el-input>
        <br>
        <label><span style="color: #FFFFFF;font-size: 18px">y:</span></label>
        <el-input style="width:1148px;margin-top: 10px" v-model="offsetY"><template slot="suffix">m</template></el-input>
      </h3>
    </div>

    <div>
      <div class="proovr1-collect__tags" style="align-items: center;padding-bottom: 12px">
        <span @click="saveMessage" class="save_button" style="margin-left: 550px;">确认并保存工程信息</span>
      </div>
    </div>

  </div>
</template>

<script>
import calculateApi from '@/api/calculate.js'
import cookie from 'js-cookie'
import {eventBus} from "../../plugins/nuxt-elementui";
import getProject from "@/api/getProject";
import teamApi from "@/api/team";
export default {
  name:"pageseven",
  data () {
    return {
      offsetX: 42.94968,
      offsetY: 17.4,
      diameter: 50,
      advance: '3',
      density: '1100',
      burstSpeed: '4100',
      radio:1,
      chargeType:1,
      save_relate_project:{
        id: "",
        stepUpWedgeId:"",//1。上台阶楔形掏槽法项目id
        stepUpStraightId:"",//2.上台阶直孔掏槽法项目id
        stepDownId:"",//3.下台阶项目id
        stepMidId:""//4.中台阶项目id
      },
      saveProjectMessage:{
        // rockId:'9',
        // ucs:'80000000',
        // structureScore:'13',
        // structuralPlaneScore:'12',
        // strength1:'1085.25',
        // strength2: 27.673875,
        // indexNum:'0.8',
      },
    }
  },
  mounted() {
    eventBus.$on('rock-id-updated',(data)=>{this.saveProjectMessage.rockId = data.rockId;});
    eventBus.$on('ucs_updated',(data)=>{this.saveProjectMessage.ucs = data.ucs;});
    eventBus.$on('structureScore_updated',(data)=>{this.saveProjectMessage.structureScore = data.structureScore;});
    eventBus.$on('structuralPlaneScore_updated',(data)=>{this.saveProjectMessage.structuralPlaneScore = data.structuralPlaneScore;});
    eventBus.$on('s12_updated',(data)=>{this.saveProjectMessage.strength1 = data.strength1;this.saveProjectMessage.strength2 = data.strength2;});
    eventBus.$on('index_updated',(data)=>{this.saveProjectMessage.indexNum = data.indexNum});
    eventBus.$on('data-from-a',(data)=>{this.saveProjectMessage.strength1 = data.strength1;this.saveProjectMessage.strength2 = data.strength2;})
  },
  created() {
    //回显上台阶数据
    if(cookie.get('upData')){
      let upData = JSON.parse(cookie.get('upData'));
      this.diameter=upData.holeDiameter*1000;
      this.advance=upData.holeLength;
      this.density=upData.explosiveDensity;
      this.burstSpeed=upData.d;
    }

    eventBus.$on('rock-id-updated',(data)=>{this.saveProjectMessage.rockId = data.rockId;});
    eventBus.$on('ucs_updated',(data)=>{this.saveProjectMessage.ucs = data.ucs;});
    eventBus.$on('structureScore_updated',(data)=>{this.saveProjectMessage.structureScore = data.structureScore;});
    eventBus.$on('structuralPlaneScore_updated',(data)=>{this.saveProjectMessage.structuralPlaneScore = data.structuralPlaneScore;});
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
        this.saveProjectMessage.offsetX = "42.94968"
        this.saveProjectMessage.offsetY = "17.4"
        this.saveProjectMessage.excavationCode='001001';
        // if(cookie.get('upProjectId')){
        //   let upData = JSON.parse(cookie.get('upData'))
        //   this.saveProjectMessage.excavationCode=upData.excavationCode;
        //   this.saveProjectMessage.upProjectId=upData.upProjectId;
        // }else{
        //   //第一次加载组件 生成upProjectId
        //   this.saveProjectMessage.excavationCode='001003';
        //   this.saveProjectMessage.upProjectId="";
        // }
        this.isReady()
        console.log(this.saveProjectMessage);

        console.log(this.$route.query.dataToSend)
        calculateApi.saveProject(this.saveProjectMessage).then(response => {
          if(response.data.code==1){
            cookie.set("projectId",response.data.data.id);
            eventBus.$emit("advance",this.advance);
            //查询课题一保存的数据并保存(链接projectId)
            teamApi.getNewProject1Info().then(response => {
              this.project1Info = response.data.data;
              this.project1Info.projectId = cookie.get("projectId");
              console.log("pagesixTeen obtain",JSON.stringify(this.project1Info))
              teamApi.saveDataFromP1(this.project1Info).then(response => {
                let jsonData = {projectId:cookie.get("projectId"),statusCode:111}
                teamApi.pushLogData(jsonData).then(response => {
                  if(response.data.code == 1){
                    console.log(response.data.data.data)
                    jsonData.statusCode = 112;
                    teamApi.pushLogData(jsonData).then(response => {
                      console.log(response.data.data.data)
                      //如果为1则为自动操作
                      if(this.isAuto == 1){
                        eventBus.$emit('autoMode',{autoStep:1})
                      }
                    })
                  }
                })
                console.log("已将数据推送至课题一")
              })
            })
            // alert("工程信息保存成功!");
          }else{
            alert("工程信息保存失败，请重新尝试!");
          }
        })

      }else{
        alert("请正确填入数据！")
      }

    },
    isReady(){
      if(cookie.get("upProjectId")) {
        this.saveProjectMessage.id = cookie.get("upProjectId");//有则赋值
        this.saveProjectMessage.upProjectId = cookie.get("upProjectId");//有则赋值
        // alert("工程信息更新成功!");
      }
      else
        this.saveProjectMessage.id = '';

      console.log(this.saveProjectMessage);
      calculateApi.saveProject(this.saveProjectMessage).then(response => {
        if(response.data.code==1){
          cookie.set("upProjectId",response.data.data.id);
          this.save_relate_project.stepUpWedgeId = cookie.get("upProjectId");
          getProject.save_relate_project(this.save_relate_project).then(res=>{
            console.log(res.data.data);
            // alert("相关联的信息保存成功!");
          })
          let upDatas=response.data.data
          console.log(JSON.stringify(upDatas))
          cookie.set('upData', JSON.stringify(upDatas));//存储上台阶工程信息
          console.log("页面 7工程信息保存成功 upProjectId"+cookie.get("upProjectId"));
          // 若修改了下台阶数据，则及时更新
          // if(cookie.get('upProjectId')){
          //   calculateApi.upDownProject(response.data.data.id).then(response => {
          //     let upDatas=response.data.data
          //     console.log(JSON.stringify(upDatas))
          //     cookie.set('upData', JSON.stringify(upDatas));
          //   })
          // }

          // alert("工程信息保存成功!");
        }else{
          alert("工程信息保存失败，请重新尝试!");
        }
      }).catch(err=>{
        console.log(err);
        this.$Message.error(err.response.data.message, 8000);
      })
    },
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
  color: white;
}
.save_button{
  display: block;
  font-size: 16px;
  color:white;
  background-image: url('@/assets/img/ui/Group 359@2x.png');
  background-size: 100% 100%; /* 背景图像覆盖整个容器，并强制拉伸以适应容器 */
  background-position: center; /* 背景图像居中对齐 */
  background-repeat: no-repeat; /* 背景图像不重复 */
  padding: 6px 10px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.el-input__suffix {
  margin-top: 9px;
}
</style>
