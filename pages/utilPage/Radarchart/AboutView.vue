<template>
    <div class="about">
        <!-- 雷达图容器 -->
        <div id="radar" style="width: 100%; height: 600px;"></div>
        <!-- 评分图容器，位于雷达图下方 -->
        <div id="score" style="width: 100%; height: 300px;margin-right: 260px;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import {eventBus} from "@/plugins/nuxt-elementui";

export default {
    name: 'AboutView',
    data() {
        return {
            scores:[],
            radarData: {
                indicators: [
                    { name: "超挖量", max: 100 },
                    { name: "欠挖量", max: 100 },
                    { name: "块度", max: 100 },
                    { name: "半孔率", max: 100 },
                    { name: "炮孔利用率", max: 100 },
                    { name: "振速", max: 100 }
                ],
                seriesData: [
                    // "很好", "好", "中", "差", "很差","很好"
                    // 初始化评价 <很好，好，中，差，很差>分别对应<100，80，60，40，0>分
                ]
            },
            // 评分映射规则
            scoreMapping: {
                "很好": 100,
                "好": 80,
                "中": 60,
                "差": 40,
                "很差": 0
            },

            score: 0 // 初始化评分为0

        }
    },
  created() {
    eventBus.$on('scores_updated',(data)=>{
      this.scores = data.scores;
    })
  },
  mounted() {
        this.processSeriesData();
        this.calculateScore();
        this.initRadar();
        this.initScoreChart();
    },

    methods: {
        processSeriesData() {
            // 把这里的evaluations与用户选择的评价对应上！！！！！！！！！
          let evaluations = this.scores;
            // let evaluations = [
            //     "好", "好", "很好", "很好", "中", "很好"
            // ];
            this.radarData.seriesData = evaluations.map(evaluation => {
                return this.scoreMapping[evaluation] || 0; // 如果评价不在映射中，则默认为0
            });
        },

        calculateScore() {
            let totalScore = this.radarData.seriesData.reduce((sum, score, index) => {
                // 计算每个分数的加权值（假设每个指标的权重相同）
                let weightedScore = score *0.01* (100 / 6); // 每个指标的满分为100，总共有6个指标
                // 累加到总分中
                return sum + weightedScore;
            }, 0); // 初始值为0
            // 将计算出的总分赋值给组件数据
            this.score = Number(totalScore.toFixed(2));
            // 在控制台打印出计算出的总分，便于调试
            console.log("Calculated score:", this.score);
        },
        initRadar() {
            let chartDom = document.getElementById('radar');
            let myChart = echarts.init(chartDom);
            let option = this.buildRadarOption();
            if (option) {
                myChart.setOption(option);
            }
        },
        buildRadarOption() {
            let { indicators, seriesData } = this.radarData;
            return {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                radar: {
                    indicator: indicators,
                    radius: '80%',
                    splitArea: {
                    show: true,
                    areaStyle: {
                      color: ['#2b3e5a','#33445c'] // 设置雷达图背景渐变色，可以自行调整颜色值
                    }
                  }
                },
                series: [
                    {
                        name: '评分',
                        type: 'radar',
                        data: [
                            {
                                value: seriesData,
                                name: '评分',
                                normal: {
                                    show: true,
                                    formatter: '{b}: {c}',
                                    textStyle: {
                                      color: '#FFA500' // 设置文字颜色为橙色
                                    }
                              }
                            }
                        ]
                    }
                ]
            };
        },
        initScoreChart() {
            let scoreDom = document.getElementById('score');
            let scoreChart = echarts.init(scoreDom);
            let scoreOption = this.buildScoreOption();
            if (scoreOption) {
                scoreChart.setOption(scoreOption);
            }
        },
        // buildScoreOption() {
        //     return {
        //         tooltip: {
        //             trigger: 'item',
        //             formatter: '{a} <br/>{b}: {c} ({d}%)'
        //         },
        //         series: [
        //             {
        //                 name: '得分',
        //                 type: 'pie',
        //                 radius: ['40%', '70%'], // 设置饼图的内半径和外半径
        //                 label: {
        //                     show: false,
        //                     position: 'center'
        //                 },
        //                 emphasis: {
        //                     label: {
        //                         show: true,
        //                         formatter: '{b}: {c0}',
        //                         color: '#333',
        //                         fontSize: '16',
        //                         fontWeight: 'bold'
        //                     }
        //                 },
        //                 data: [
        //                     { value: this.score, name: '评分' },
        //                     { value: 100 - this.score, name: '未得分', itemStyle: { color: 'rgba(0,0,0,0)' } } // 未得分部分透明
        //                 ]
        //             }
        //         ]
        //     };
        // }
        buildScoreOption() {
            return {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                series: [
                    {
                        name: '得分',
                        type: 'pie',
                        radius: ['40%', '70%'], // 设置饼图的内半径和外半径
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                formatter: () => {
                                    // 总是显示当前得分，保留两位小数
                                    return `评分: ${(this.score).toFixed(2)}`;
                                },
                                fontSize: '16',
                                fontWeight: 'bold',
                                color: '#FFFFFF'
                            }
                        },
                        data: [
                            {
                                value: this.score,
                                name: '评分',
                                itemStyle: {
                                    normal: {
                                        color: '#FFA500' // 根据需要设置得分部分的颜色
                                    }
                                }
                            },
                            {
                                value: 100 - this.score,
                                name: '未得分',
                                itemStyle: {
                                    normal: {
                                        color: '#79FDFF' // 未得分部分透明
                                    }
                                }
                            }
                        ]
                    }
                ]
            };
        }

    }
}
</script>

<style>
.about {
    position: relative;
}
#radar, #score {
    margin-bottom: 20px; /* 为图表添加间隔 */
}

</style>
