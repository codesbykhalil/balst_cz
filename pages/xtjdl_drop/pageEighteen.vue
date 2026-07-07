
<template>
    <div class="card8_1">
      <div>
        <div style="padding-right: 20px" class="icon_title_1">
          <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;">7-设计模块切换</h2>
        </div>
        <br/>
        <div style="display: flex; align-items: center;justify-content: center;margin-left: 230px;">
          <span @click="handerClick" class="draw_button" style="margin-top: 20px;margin-left: 63px;">切换至上台阶</span>
          <span @click="handerClick1" class="draw_button" style="margin-top: 20px;margin-left: 450px;">切换至中台阶</span>
        </div>
      </div>
    </div>
</template>

<script>
export  default {
  name:"mode",
  data(){
    return{

    }
  },
  methods: {
    handerClick() {
      this.$router.push('/stjdl'); // 使用Vue Router进行页面跳转
    },
    handerClick1() {
      window.location.href = '/mtjdl_drop';
    },
  }
}

</script>

<style >
.icon_title_1{
  width: 240px;
  background-image: url('assets/img/ui/rectangle.png');
  background-size: calc(100% ); /* 将背景图缩小到原始尺寸的 50% */
  background-position: 10px 18px;
  background-repeat: no-repeat;
}
</style>
