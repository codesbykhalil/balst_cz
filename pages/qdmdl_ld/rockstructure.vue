<template>
  <div class="card5_1">
    <h2 class=title-before
        style="margin-top: 21px;padding-top:21px;font-size: 20px;!important
          ;color: white;margin-left: 40px;">3
      岩体结构</h2><br><br>
    <h3 class="font-type7" style=" margin-top: -30px;color: white">
      <strong>岩体结构分值：</strong>
      <el-input style="width:1167px;margin-top: 10px;margin-bottom: 35px" v-model="structureScore16"></el-input>
    </h3>
  </div>
</template>

<script>
import {eventBus} from "../../plugins/nuxt-elementui";
import teamApi from "@/api/team";
import cookie from "js-cookie";

export default {
  mounted() {
    this.rockId = this.$route.query.rockId;
    this.ucs = this.$route.query.ucs;
  },
  data() {
    return {
      structureScore: null,
      structureScore16:16,
      values_1: [18, 17, 16, 15],
      values_2: [14, 13, 12],
      values_3: [11, 10, 9],
      values_4: [8, 7, 6],
      values_5: [5, 4, 3],
      rockId: '',
      ucs: '',
    }
  },
  created() {
    eventBus.$on('cloudFiles',(data)=>{
      if (data.structureScore !== undefined && data.structureScore !== null) {
        this.structureScore = data.structureScore;
        this.structureScore16 = data.structureScore;
      }
      this.rockId = data.rockId || this.rockId;
      this.ucs = data.ucs || this.ucs;
    });
    teamApi.getNewProject1Info().then(response => {
      this.project1Info = response.data.data;

      cookie.set("classifyInfo", this.project1Info);
      const classifyInfo = this.project1Info;
      this.testData2 = this.project1Info;

      let str = classifyInfo.Rc.match(/\b\d+\.(\d)\b/g);
      str = (Number(str[0]) + Number(str[1])) / 2;
      this.rockstrength = str;
      this.indexNum = parseFloat((this.ucs / 10).toFixed(2));
      if (classifyInfo.integrity == "完整") {
        this.structureScore = 16
      }
      if (classifyInfo.integrity == "较完整") {
        this.structureScore = 14
      }
      if (classifyInfo.integrity == "较破碎") {
        this.structureScore = 11
      }
      if (classifyInfo.integrity == "破碎") {
        this.structureScore = 8
      }
      if (classifyInfo.integrity == "极破碎") {
        this.structureScore = 5
      }

      if (classifyInfo.rockWeather == "未风化") {
        this.structuralPlaneScore = 15
      }
      if (classifyInfo.rockWeather == "微风化") {
        this.structuralPlaneScore = 12
      }
      if (classifyInfo.rockWeather == "弱风化") {
        this.structuralPlaneScore = 9
      }
      if (classifyInfo.rockWeather == "强风化") {
        this.structuralPlaneScore = 6
      }
      if (classifyInfo.rockWeather == "全风化") {
        this.structuralPlaneScore = 3
      }
      //新增
      this.rockLEvel = classifyInfo.classify;
    });
  },
  destroyed() {
    eventBus.$off('cloudFiles');
  },
}
</script>

<style scoped>
.title-before {
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #000;
  position: relative;
  padding-left: 12px;
  margin-right: 16px;
}

.title-before:before {
  position: absolute;
  width: 4px;
  height: 16px;
  background: #0052d9;
  left: 0;
  top: 26px;
  content: "";
}

.card1 {
  height: auto;
  width: 1280px;
  background-color: white;

}

.table1 {
  margin-top: -10px;
  height: 300px;
}

.centered-button1 {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: normal; /* 取消行高，以保持文字垂直居中 */
  width: 40px; /* 设置按钮宽度 */
  height: 40px; /* 设置按钮高度 */
  font-size: 15px;
  padding: 5px 5px;
  margin-right: 15px;
}

.centered-button2 {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: normal; /* 取消行高，以保持文字垂直居中 */
  width: 40px; /* 设置按钮宽度 */
  height: 40px; /* 设置按钮高度 */
  font-size: 15px;
  padding: 5px 5px;
  margin-right: 10px;
}

.centered-button2 {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: normal; /* 取消行高，以保持文字垂直居中 */
  width: 40px; /* 设置按钮宽度 */
  height: 40px; /* 设置按钮高度 */
  font-size: 15px;
  padding: 5px 5px;
  margin-right: 33px;
}

.centered-button3 {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: normal; /* 取消行高，以保持文字垂直居中 */
  width: 40px; /* 设置按钮宽度 */
  height: 40px; /* 设置按钮高度 */
  font-size: 15px;
  padding: 5px 5px;
  margin-right: 27px;
}

.centered-button4 {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: normal; /* 取消行高，以保持文字垂直居中 */
  width: 40px; /* 设置按钮宽度 */
  height: 40px; /* 设置按钮高度 */
  font-size: 15px;
  padding: 5px 5px;
  margin-right: 25px;
}

.centered-button5 {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: normal; /* 取消行高，以保持文字垂直居中 */
  width: 40px; /* 设置按钮宽度 */
  height: 40px; /* 设置按钮高度 */
  font-size: 15px;
  padding: 5px 5px;
  margin-right: 25px;
}

.row_style1 {
  width: 270px;
  padding-left: 40px;
  /*background-color: pink;*/
}

.row_style2 {
  width: 245px;
  /*background-color: green;*/
}

.row_style3 {
  margin-left: 15px;
  width: 240px;
  /*background-color: pink;*/
}

.row_style4 {
  margin-left: 12px;
  width: 240px;
  /*background-color: green;*/
}

.row_style5 {
  margin-left: -17px;
  width: 230px;
  /*background-color: pink;*/
}
</style>
