<template>
  <div class="card5_1">
    <div>
      <h2 class=title-before
          style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: white;margin-left: 40px;">15
        爆破成本计算</h2>

      <div style="height:auto;margin-left: 65px;margin-bottom: 20px">
        <!-- 表格2开始 -->
        <tables/>
        <!-- 表格2结束 -->
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css2/pages.css'
import cookie from 'js-cookie'
import tables from '../utilPage/pageFifteen/table.vue'

export default {
  components: {tables},
  data() {
    return {}
  }
}
</script>

<style>

</style>
