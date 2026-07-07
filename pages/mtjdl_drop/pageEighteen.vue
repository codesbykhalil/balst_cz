<template>
    <div class="card8_1">
      <div>
        <div style="padding-right: 20px" class="icon_title_1">
          <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;">7-设计模块切换</h2>
        </div>
        <br/>
        <div style="display: flex; align-items: center;justify-content: center;margin-left: 115px;">
<!--          <span @click="handleClick" class="draw_button" style="margin-top: 20px;margin-left: 63px;">切换至上台阶</span>-->
          <span @click="handleClick1" class="draw_button" style="margin-top: 20px;margin-left: 450px;">切换至下台阶</span>
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
  methods:{
    // handleClick(){
    //   this.$router.push('/stjdl');
    // },
    handleClick1(){
      window.location.href = '/xtjdl_drop';
    },
  }

}

</script>

<style scoped>

</style>
