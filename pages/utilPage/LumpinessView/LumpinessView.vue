<template>
  <div>
    <div ref="chart" id="lumpiness" style="display:flex;justify-content:center;margin-left: 220px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'lumpinessview',
  props:["percent"],
  data(){
    return{
      percents:'',
    }
  },
  mounted() {
    this.renderChart();
    console.log(this.percent);
  },
  watch: {
    // 监听到父组件传递过来的数据后，加工一下，
    // 存到data中去，然后在页面上使用
    percent(newnew, oldold) {
      console.log("监听", newnew, "old",oldold);
      this.percent = newnew;
      this.renderChart();
    }
  },
  methods: {
    renderChart() {
      // console.log(this.percent);
      const myChart = echarts.init(this.$refs.chart);

      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          formatter: "Grain size : <br/>{b} : {c}%"
        },
        xAxis: {
          boundaryGap: false,
          type: 'category',
          name:'粒径',
          nameLocation: 'middle', // x轴说明文字位置
          nameGap: 40, // x轴说明文字与轴线之间的距离
          data: ['<10cm', '<20cm', '<30cm', '<40cm', '<50cm', '<60cm', '<70cm', '<80cm', '<90cm', '<100cm'],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true
          },
          axisLabel: {
            formatter: '{value}%'
          },
          name: '质量百分比', // 添加y轴说明文字
          nameLocation: 'middle', // y轴说明文字位置
          nameGap: 50, // y轴说明文字与轴线之间的距离
        },
        series: [{
          data: this.percent.map(value => value * 100), // 将百分比值转换为实际值（0-100）
          type: 'line',
          smooth: true,
          markLine: {
            symbol: 'none', // 去掉辅助线首尾圆点和箭头
            lineStyle:{
              color: '#F56C6C',
              type: 'dashed', // 虚线
            },
            data: [
              {
                xAxis: '<20cm', // 横坐标的值，决定纵向辅助线在x轴的位置
                label:{
                  formatter: '',
                },

              },
              {
                xAxis: '<30cm', // 横坐标的值，决定纵向辅助线在x轴的位置
                label:{
                  formatter: '',
                },
              },
              {
                xAxis: '<40cm', // 横坐标的值，决定纵向辅助线在x轴的位置
                label:{
                  formatter: '',
                },
              },
              {
                xAxis: '<50cm', // 横坐标的值，决定纵向辅助线在x轴的位置
                label:{
                  formatter: '',
                },
              },
              {
                xAxis: '<60cm', // 横坐标的值，决定纵向辅助线在x轴的位置
                label:{
                  formatter: '',
                },
              },
              {
                xAxis: '<70cm', // 横坐标的值，决定纵向辅助线在x轴的位置
                label:{
                  formatter: '',
                },
              },
              {
                xAxis: '<80cm', // 横坐标的值，决定纵向辅助线在x轴的位置
                label:{
                  formatter: '',
                },
              },
              {
                xAxis: '<90cm', // 横坐标的值，决定纵向辅助线在x轴的位置
                label:{
                  formatter: '',
                },
              },

              {
                xAxis: '<100cm', // 横坐标的值，决定纵向辅助线在x轴的位置
                label:{
                  formatter: '',
                },
              },
            ]
          }

        }],

      };
      myChart.setOption(option);
    }
  }
};
</script>
<style>
#lumpiness{
  height:520px;
  width:700px;
}
</style>
