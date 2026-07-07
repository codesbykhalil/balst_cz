<template>
  <div>
    <div class="card5_1">
      <h2 class=title-before
          style="margin-top: 21px;padding-top:21px;font-size: 20px;!important
          ;color: white;margin-left: 40px;">5
        隧道地应力(隧道埋深或地应力2选1填写)</h2><br><br>
      <!--        <div class="strength-div">-->
      <h3 class="font-type7" style=" margin-top: -30px;color: white">
        <strong>隧道中心到地表距离：</strong>
        <el-input style="width:1167px;margin-top: 10px;margin-bottom: 35px" v-model="strength1">
          <template slot="suffix">m</template>
        </el-input>
      </h3>
      <!--        </div>-->
      <h3 class="font-type7" style=" margin-top: -30px;color: white"><strong>该处最大地应力值：</strong>
        <el-input style="width:1167px;margin-top: 10px;margin-bottom: 25px" v-model="strength2">
          <template slot="suffix" >MPa</template>
        </el-input>
      </h3>
    </div>
  </div>
</template>

<script>
import calculateApi from '@/api/calculate.js'
import cookie from 'js-cookie'
import {eventBus} from "../../plugins/nuxt-elementui";

export default {
  name: "pagefive",
  data() {
    return {
      strength1: '500',
      strength2: 45,
    }
  },
  created() {
    // console.log('A component created'); // 添加调试日志
    // // 调用 sendDataToB 方法，将默认值传递给 pageseven 组件
    // this.sendDataToB();
  },
  mounted() {

    // 异步加载数据
    this.loadData()
      .then(() => {
        // 数据加载完成后，调用 sendDataToB 方法，将默认值传递给 pageseven 组件
        this.sendDataToB();
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
  },
  methods: {
    loadData() {
      // 模拟异步数据加载，可以替换成实际的数据加载逻辑
      return new Promise((resolve, reject) => {
        // 假设在这里进行异步数据加载
        setTimeout(() => {
          // 模拟加载成功
          this.strength1 = '500';
          this.strength2 = 45;
          resolve(); // 数据加载成功时调用 resolve
        }, 400); // 模拟2秒的加载时间
      })
    },
    sendDataToB() {
      eventBus.$emit('s12_updated', {
        strength1: this.strength1,
        strength2: this.strength2
      });
    }
  },
  watch: {
    strength1(newVal) {
      this.strength2 = newVal !== '' ? newVal * 2550 * 10 * 0.000001 : 27.673875;
      this.sendDataToB();
    },
    strength2(newVal) {
      this.sendDataToB();
    }
  },
}
</script>

<style>
.title-front {
  margin-top: 50px;
  font-size: 40px !important;
}

.card5 {
  height: auto;
  width: 1280px;
  border-radius: 20px; /* 设置圆角为10像素 */
  background-color: white;
}

.strength-div {
  display: inline-block;
  width: 500px;
  height: auto;
  padding-bottom: 20px;
  margin-top: -200px
}

.strength-div_1 {
  display: inline-block;
  width: 500px;
  height: auto;
  padding-bottom: 20px;
  margin-left: 120px;

}

.card5:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.font-type3 {
  margin-left: 50px;
  font-size: 30px !important;
  width: 1200px;
}
.font-type7{
  margin-left: 50px;
  font-size: 18px !important;
  width: auto;
}
</style>
