<template>
  <div class="card5_1">
    <h2 class=title-before
        style="margin-top: 21px;padding-top:21px;font-size: 20px!important
          ;color: white;margin-left: 40px;">2
      岩石强度</h2><br><br>
    <h3 class="font-type7" style=" margin-top: -30px;color: white">
      <strong>岩石单轴抗压强度：</strong>
      <el-input style="width:1167px;margin-top: 10px;margin-bottom: 35px" v-model="rockstrength"><template slot="suffix">MPa</template></el-input>
    </h3>
  </div>
</template>

<script>
import rockTypeApi from '@/api/getspecies.js'
import calculateApi from '@/api/calculate.js'
import cookie from 'js-cookie'
import {eventBus} from "../../plugins/nuxt-elementui";
import teamApi from "@/api/team";
export default {
  name: "rockstrength",
  data() {
    return {
      ucs: '100',
      type: '',
      rockId: '',
      getData: [],         //辅助数组
      Sedimentary: [],                         //沉积岩
      Igneous: [],                             //火成岩
      Metamorphic: [],                         //变质岩
      multipleSelection: [],
      // RC:'41.6~51.5',
      rockstrength:'null',
    }
  },
  created() {
    eventBus.$on('cloudFiles',(data)=>{
      this.rockId = data.rockId || this.rockId;
      this.ucs = data.ucs || this.ucs;
      if (data.ucs !== undefined && data.ucs !== null) {
        this.rockstrength = Number(data.ucs) > 100000 ? Number(data.ucs) / 1000000 : data.ucs;
      }
    });
    // rockTypeApi.getRockType().then(response => {
    //   this.getData = response.data.data
    //
    //   this.getData.map((item) => {
    //     if (item.type_code == '002001') {
    //       this.Sedimentary.push({id: item.id, name: item.name,})
    //     } else if (item.type_code == '002002') {
    //       this.Igneous.push({id: item.id, name: item.name,})
    //     } else if (item.type_code == '002003') {
    //       this.Metamorphic.push({id: item.id, name: item.name,})
    //     }
    //   });
    // })
    teamApi.getNewProject1Info().then(response => {
      this.project1Info = response.data.data;

      cookie.set("classifyInfo", this.project1Info);
      const classifyInfo = this.project1Info;
      this.testData2 = this.project1Info;

      let str = classifyInfo.Rc.match(/\b\d+\.(\d)\b/g);
      str = (Number(str[0])+Number(str[1]))/2;
      this.rockstrength = str;
    });
  },
  destroyed() {
    eventBus.$off('cloudFiles');
  },
  // mounted(){
  //   this.handlInit();
  // },
  // methods: {
  //   check() {
  //     if (this.ucs) {
  //       let u = this.ucs * 1000000;
  //       console.log(u);
  //       eventBus.$emit('ucs_updated',{ucs:u});
  //     }
  //   },
  //   handlInit(){
  //     const {Rc} = this.$route.query || {};
  //     //const parsonData = JSON.parse(dataToSend) || {};
  //     this.lithology = Rc || '';
  //
  //   },
  //   // confirm() {
  //   //   console.log(this.ucs);
  //   //   eventBus.$emit('ucs_updated',{ucs:this.ucs});
  //   // },
  //
  //   handleSelectionChange(val) {
  //     this.ucs = val.strength;
  //   },
  //   //   控制单选
  //   handleCurrentChange(val) {
  //     this.rockId = val.id;
  //     this.type = val.name;
  //   },
  //
  //   async handleFileUpload(event) {
  //     const file = event.target.files[0];
  //     if (file) {
  //       const formData = new FormData();
  //       formData.append('file', file);
  //
  //       try {
  //         // 这里发送文件到服务器的逻辑
  //         // 可以使用 axios 或其他适当的库来进行文件上传
  //         // 示例：axios.post('/upload', formData);
  //         this.text = "文件上传成功！";
  //       } catch (error) {
  //         console.error('Error during file upload:', error);
  //         this.text = "文件上传失败，请重试。";
  //       }
  //     }
  //   },
  //   getRangeClass(range) {
  //     // 根据范围值返回不同的样式类名
  //     if (range === '>250') {
  //       return 'range-a';
  //     } else if (range === '100-250') {
  //       return 'range-b';
  //     } else if (range === '50-100') {
  //       return 'range-c';
  //     } else if (range === '25-50') {
  //       return 'range-d';
  //     } else if (range === '5-25') {
  //       return 'range-e';
  //     } else if (range === '1-5') {
  //       return 'range-f';
  //     }
  //   }
  // }
}
</script>

<style scoped>
.upload_area2{
  display: flex;
  align-items: center;
  margin-left: 58px;
  margin-top: 10px;
}
.range-container {
  display: flex;
  align-items: center;
}

.range-ellipse {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 30px;
  border-radius: 10px;
  margin-right: 10px;
}
.title-before{
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
.range-a {
  background-color: green; /* 样式1的颜色 */
  color: white;
}

.range-b {
  background-color: blue; /* 样式2的颜色 */
  color: white;
}

.range-c {
  background-color: orange; /* 样式3的颜色 */
  color: white;
}
.range-d{
  background-color: pink; /* 样式3的颜色 */
  color: white;
}
.range-e{
  background-color: palevioletred; /* 样式3的颜色 */
  color: white;
}
.range-f{
  background-color: burlywood; /* 样式3的颜色 */
  color: white;
}
</style>
