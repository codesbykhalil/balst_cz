<template>
  <div class="card5_1">
    <div style="width: 1280px">
      <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;">17 爆破方案优化</h2>
      <!-- 超挖量评价表格 -->
<!--      <div class="proovr1-collect__tags" style="display: flex;">-->
<!--        <span class="proovr1-collect__tag" style="margin:30px 0 0 555px" @click="handleButtonClick">爆破现场数据接收</span>-->
<!--      </div>-->
      <!--        <h3 style="text-align: center;font-size: 20px !important;color: white"><strong>光爆效果评价</strong></h3>-->
      <!-- 超挖量评价表格 -->

      <div style="margin-left: 15px;display: flex;">
        <div class="left-column">
          <div class="evaluation-table" v-for="(item, index) in evaluationItems" :key="index">
            <el-table
              :data="item.data"
              style="width: 350px; margin-left: 10px;font-size: 12px;border: 1px solid  rgba(35,73,109,1)"
              :row-style="rowStyle"
              :cell-style="{ backgroundColor: '#011635', color: 'white' }"
              :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }">
              <el-table-column :label="item.title" width="200px" align="center"  >
                <template slot-scope="scope">
                  <el-select v-model="scope.row.superExcavationValue" placeholder="" class="custom-select" @change="updateScore(item, scope.$index)">
                    <el-option v-for="(option, index) in item.options" :key="index" :label="option.label" :value="option.value"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="" width="149px" align="center">
                <template slot-scope="scope" style="font-size: 10px; ">
                  <div style=" border: 1px solid #9e9d9d;border-radius: 2px;padding-top: 7px;padding-bottom: 7px">
                    {{ getScore(scope.row.superExcavationValue) || '无' }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="right-column">
          <about-view :evaluationItems="transformEvaluationItems" ></about-view>
        </div>
      </div>


      <!--      按钮-->
      <div class="proovr1-collect__tags" style="display: flex; align-items: center;">
        <span @click="analyze" class="proovr1-collect__tag" style="margin:30px 0 0 560px">智能分析与优化</span>
      </div>

      <div style="margin: 20px 0 0 60px;width:100%;height:auto;">
        <div>
          <h3 class="font-type8" style="margin-left: 0px;color: white"><strong>原因分析</strong>
            <el-input  :row="2" style="width:1167px;margin-top: 10px;height: 40px" v-model="reason" ><template slot="suffix"></template></el-input>
            <!--            type="textarea"-->
          </h3>
          <h3 class="font-type8" style="margin-left: 0px;color: white"><strong>优化建议</strong>
            <el-input  :row="2" style="width:1167px;margin-top: 10px;margin-bottom: 15px" v-model="advice"><template slot="suffix"></template></el-input>
          </h3>
        </div>
      </div>
      <!-- 表格2开始 -->
      <!--      <div style="height:auto; margin: 30px 0 0 63px">-->
      <!--        <tables :holeData="holeData" :key="timer"/>-->
      <!--      </div>-->
      <!-- 表格2结束 -->
    </div>
  </div>
</template>

<script>
import tables from "@/pages/utilPage/pageSeventeen/table.vue";
import outPutApi from "@/api/outPut";
import calculateApi from "@/api/calculate";
import AboutView from "@/pages/utilPage/Radarchart/AboutView.vue";
import * as events from "events";
import {eventBus} from "@/plugins/nuxt-elementui";
import connAnoSerApi from "@/api/connAnoSer";
export default {
  components: {AboutView, tables},
  data() {
    return {
      submitScoreData: {},  //传递后端数据
      scores: [] ,// 存储分数的数组
      reason: '',
      advice: '',
      holeData: [],
      timer: '',
      evaluationItems: [
        {
          title: "超挖值（cm)",
          name: "",
          options: [
            {value: "value1", label: "0-5"},
            {value: "value2", label: "5-10"},
            {value: "value3", label: "10-15"},
            {value: "value4", label: "15-20"},
            {value: "value5", label: ">20"},
            // 添加其他超挖量评价的选项
          ],
          data: [
            {superExcavationValue: "value1", score: "很好"}, // 设置初始值为"很好"
            // 添加其他超挖量评价的数据项
          ],
        },
        {
          title: "欠挖值（cm)",
          name: "",
          options: [
            {value: "value1", label: "0-5"},
            {value: "value2", label: "5-10"},
            {value: "value3", label: "10-15"},
            {value: "value4", label: "15-20"},
            {value: "value5", label: ">20"},
            // 添加其他超挖量评价的选项
          ],
          data: [
            {superExcavationValue: "value1", score: "很好"},
            // 添加其他超挖量评价的数据项
          ],
        },
        {
          title: "块度",
          name: "",
          options: [
            {value: "value1", label: "很均匀"},
            {value: "value2", label: "均匀"},
            {value: "value3", label: "一般"},
            {value: "value4", label: "有大块"},
            {value: "value5", label: "大块多"},
            // 添加其他超挖量评价的选项
          ],
          data: [
            {superExcavationValue: "value1", score: "很好"},
            // 添加其他超挖量评价的数据项
          ],
        },
        {
          title: "半孔率 %",
          name: "光爆效果评价",
          options: [
            {value: "value1", label: ">90"},
            {value: "value2", label: "70-90"},
            {value: "value3", label: "50-70"},
            {value: "value4", label: "30-50"},
            {value: "value5", label: "<30"},
            // 添加其他超挖量评价的选项
          ],
          data: [
            {superExcavationValue: "value1", score: "很好"},
            // 添加其他超挖量评价的数据项
          ],
        },
        {
          title: "炮孔利用率 %",
          name: "",
          options: [
            {value: "value1", label: ">90"},
            {value: "value2", label: "80-90"},
            {value: "value3", label: "70-80"},
            {value: "value4", label: "60-70"},
            {value: "value5", label: "<60"},
            // 添加其他超挖量评价的选项
          ],
          data: [
            {superExcavationValue: "value1", score: "很好"},
            // 添加其他超挖量评价的数据项
          ],
        },
        {
          title: "振速(cm/s)",
          name: "",
          options: [
            {value: "value1", label: "<0.1"},
            {value: "value2", label: "0.1-1"},
            {value: "value3", label: "1-2"},
            {value: "value4", label: "2-5"},
            {value: "value5", label: ">5"},
            // 添加其他超挖量评价的选项
          ],
          data: [
            {superExcavationValue: "value1", score: "很好"},
            // 添加其他超挖量评价的数据项
          ],
        },
        // 添加其他评价项
      ],

    };
  },
  mounted() {
    console.log("evaluationItems:", this.evaluationItems);
    this.evaluationItems.forEach(item => {
      console.log(item.data);
    });
    eventBus.$on('cloudFiles', this.handleCloudFileImport);
  },
  beforeDestroy() {
    eventBus.$off('cloudFiles', this.handleCloudFileImport);
  },
  computed: {
    transformEvaluationItems() {
      // 转换评估项数据
      return this.evaluationItems.map(item => ({
        name: item.title,
        max: 100,
        selectedValue: this.getScore(item.data[0].superExcavationValue) // 使用 getScore 方法获取选择后的分数
      }));
    }
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (column.property !== 'StringNum') {
        return "height:35px!important; border-color:#5B9BD5!important; color:#000000!important; padding:0px!important; height:40px!important";
      }
      else {
        return "height:35px!important; border-color:#5B9BD5!important; color:black!important;font-weight:bold;!important padding:0px!important; height:40px!important";
      }
    },
    // 返回行样式的方法
    rowStyle({row, rowIndex}) {
      if (rowIndex === 10 || rowIndex === 11) {
        return {height: '40px'};
      } else {
        return {}; // 其他行的高度不做修改
      }
    },

    handleButtonClick() {
      connAnoSerApi.listOverbreakData().then(response => {
        console.log("asasasasasasas"+JSON.stringify(response.data.data[0].data[1]));
        let overMaxValue = response.data.data[0].data[1].overMaxValue   //超挖
        let oweMaxValue = Math.abs(response.data.data[0].data[1].oweMaxValue)   //欠挖

        if(overMaxValue>0 && overMaxValue<5){
          this.evaluationItems[0].data[0].superExcavationValue = "value1"
        }else if(overMaxValue>=5 && overMaxValue<10){
          this.evaluationItems[0].data[0].superExcavationValue = "value2"
        }else if(overMaxValue>=10 && overMaxValue<15){
          this.evaluationItems[0].data[0].superExcavationValue = "value3"
        }else if(overMaxValue>=15 && overMaxValue<20){
          this.evaluationItems[0].data[0].superExcavationValue = "value4"
        }else if(overMaxValue>=20){
          this.evaluationItems[0].data[0].superExcavationValue = "value5"
        }
        this.updateScore(this.evaluationItems[0],0)

        if(oweMaxValue>0 && oweMaxValue<5){
          this.evaluationItems[1].data[0].superExcavationValue = "value1"
        }else if(oweMaxValue>=5 && oweMaxValue<10){
          this.evaluationItems[1].data[0].superExcavationValue = "value2"
        }else if(oweMaxValue>=10 && oweMaxValue<15){
          this.evaluationItems[1].data[0].superExcavationValue = "value3"
        }else if(oweMaxValue>=15 && oweMaxValue<20){
          this.evaluationItems[1].data[0].superExcavationValue = "value4"
        }else if(oweMaxValue>=20){
          this.evaluationItems[1].data[0].superExcavationValue = "value5"
        }
        this.updateScore(this.evaluationItems[1],0)
      })
    },
    // 更新 score 字段
    updateScore(item, dataIndex) {
      const value = item.data[dataIndex].superExcavationValue;
      const score = this.getScore(value);
      // 更新 score 字段
      this.$set(item.data[dataIndex], 'score', score);
    },

    handleCloudFileImport() {
      this.$nextTick(() => {
        this.analyze();
      });
    },

    analyze() {
      this.submitScoreData = {
        overbreak: this.evaluationItems[0].data[0].score,
        underbreak: this.evaluationItems[1].data[0].score,
        lumpiness: this.evaluationItems[2].data[0].score,
        half_hole: this.evaluationItems[3].data[0].score,
        excavation: this.evaluationItems[4].data[0].score,
        safe: this.evaluationItems[5].data[0].score,

      },
        // 将每项分数添加到数组中
        // this.scores = [
        //   this.evaluationItems[0].data[0].score,
        //   this.evaluationItems[1].data[0].score,
        //   this.evaluationItems[2].data[0].score,
        //   this.evaluationItems[3].data[0].score,
        //   this.evaluationItems[4].data[0].score,
        //   this.evaluationItems[5].data[0].score
        // ];

        // console.log(this.scores);
        // eventBus.$emit('scores_updated',{scores:this.scores});
        // if (this.submitScoreData.overbreak=="很好"&&this.submitScoreData.underbreak=="很好"&&this.submitScoreData.lumpiness=="很好"&&this.submitScoreData.half_hole=="很好"
        // this.submitScoreData.excavation.)
        outPutApi.returnAdvice(this.submitScoreData).then(response => {
          console.log("advice" + JSON.stringify(response.data.data))
          this.reason = response.data.data[0];
          this.advice = response.data.data[1];
        })
    },
    // const allScores = {};
    // this.evaluationItems.forEach(item => {
    //   const scores = item.data.map(data => data.score);
    //   allScores[item.title] = scores;
    //   console.log(allScores[item.title]);
    // });

    getScore(value, itemIndex, dataIndex) {
      if (!value) {
        return '无';
      }
      console.log(this.evaluationItems[0]);
      let score1 = '';
      if (value === "value1") {
        score1 = "很好";
      } else if (value === "value2") {
        score1 = "好";
      } else if (value === "value3") {
        score1 = "中";
      } else if (value === "value4") {
        score1 = "差";
      } else if (value === "value5") {
        score1 = "很差";
      }

      return score1;
    },
  }
}

</script>
<style scoped>
.evaluation-table {
  display: inline-block;
  margin: 20px 15px 20px 30px;
}
.custom-select .el-input__inner {
  font-size: 5px; /* 设置下拉菜单中输入框的字体大小 */
}
.left-column {
  flex: 1;
  display: flex;
  flex-direction: column; /* 垂直排列 */
}
.right-column {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.el-input {

  height: 52px;

  border-radius: 8px;
}
.el-input__inner {
  height: 52px;
  background: #1e3658;
  ont-size: 14 px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #1e3658;
}
.el-table .warning-row{
  background: #01366a;
}
.el-table .success-row{
  background: #00122c;
}
</style>
