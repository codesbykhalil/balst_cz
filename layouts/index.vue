<template>
<client-only>
  <div class="default-page">
    <button @click="handleButtonClick">智能获取隧道围岩参数与钻爆模式</button>
  </div>
</client-only>
</template>

<script>
import connAnoSerApi from "@/api/connAnoSer";
  export default{
    methods: {
      async handleButtonClick() {
        try {
          // 调用接口获取开挖方法信息
          const response = await connAnoSerApi.getExcavatePlan();
          console.log("testData"+JSON.stringify(response.data.result));
          const excavationModel = response.data.result.excavation_model;

          // 根据获取的 excavation_model 值进行判断并跳转页面
          if (excavationModel == "全断面开挖") {
            // 跳转到 "/method1" 页面
            this.$router.push('/method1');
          } else if (excavationModel == "二台阶法开挖") {
            // 跳转到 "/method2" 页面
            this.$router.push('/method2');
          } else {
            // 处理其他情况
          }

          // 保存围岩参数
          const workData = {/* 围岩参数的数据 */};
          const token = 'your_token_here'; // 从登录信息或其他地方获取
          await connAnoSerApi.get_Info(workData, token);
        } catch (error) {
          console.error('Error while handling button click:', error);
        }
      },
    },
  };
</script>

<style scoped>
.default-page {
  /* 设置背景图片的路径，可以根据实际情况调整路径 */
  background-image: url('@/assets/img/model_select.png');
  /* 设置背景图片的样式，这里使用 cover 表示图片铺满整个页面 */
  background-size: cover;
  /* 设置背景图片不平铺 */
  background-repeat: no-repeat;
  /* 设置页面内容垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 设置页面高度，可以根据实际需求调整 */
  height: 100vh;
}

</style>
