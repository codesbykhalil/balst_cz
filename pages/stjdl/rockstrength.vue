<template>
  <div class="card1_1">
    <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: black;margin-left: 40px">2 岩石强度</h2>
    <br>
    <el-table
      :cell-style="{color:'black'}"
      ref="multipleTable"
      :data="tableData"
      :header-cell-style="{fontSize: '18px',color:'black'}"
      tooltip-effect="dark"
      style="width: 1170px;font-size:15px;margin-left: 30px"
      @current-change="handleSelectionChange">
      <el-table-column
        label="实地估算"
        width="430">
        <template slot-scope="scope">{{ scope.row.estimate }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="示例"
        width="540">
        <template slot-scope="scope">{{ scope.row.example }}</template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="强度范围"
        width="200"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="range-container">
          <!-- 使用 v-bind:class 动态绑定样式 -->
          <div :class="['range-ellipse', getRangeClass(scope.row.range)]"> {{ scope.row.range }}</div>
        </div>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <div class="upload_area2">
      <label class="upload-button">
        上传随钻参数智能识别
        <input type="file" accept=".xls, .xlsx" @change="handleFileUpload">
      </label>
      <input style="border: #FFFFFF"  class="text-box" :readonly="true" placeholder="文件类型支持excel，上一个进尺所有炮孔孔底10cm参数">
    </div>
    <div style="width: auto;margin-top: 10px">
        <span slot="label" style="font-size: 18px;width: 400px;margin-left:40px ">
          <strong>您判定的岩石强度：</strong>
        </span>
      <br>
      <div class="proovr-collect__tags" style="display: flex;width: 1200px;align-items: center;margin-left: 40px">
        <el-input v-model="ucs" style="width: 1100px;margin-right: 10px;"><template slot="suffix">MPa</template></el-input>
        <span @click="check" class="proovr-collect__tag" >确认</span>
      </div>

    </div>

  </div>
</template>

<script>
import rockTypeApi from '@/api/getspecies.js'
import calculateApi from '@/api/calculate.js'
import cookie from 'js-cookie'
import {eventBus} from "../../plugins/nuxt-elementui";
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
      tableData: [{
        estimate: '标本只能用地质锤凿碎',
        example: '新鲜玄武岩、燧石、辉绿岩、片麻岩、花岗岩、石英岩',
        range: '>250',strength:250
      }, {
        estimate: '标本需要地质锤多次击打才能断裂',
        example: '角闪岩、砂岩、玄武岩、辉长岩、片麻岩、花岗闪长岩、石灰岩',
        range: '100-250',strength:225
      }, {
        estimate: '标本需要地质锤不止一次的击打才能断裂',
        example: '石灰石、大理石、千枚岩、砂岩、片岩、页岩、粉砂岩',
        range: '50-100',strength:75
      }, {
        estimate: '不能用小刀刮或剥皮，标本可以用刀一击就断裂',
        example: '粘土、煤、混凝土、片岩、页岩、粉砂岩',
        range: '25-50',strength:37.5
      }, {
        estimate: '用小刀很难剥开，用刀尖用力敲击，形成浅压痕',
        example: '白垩、岩盐、钾盐',
        range: '5-25',strength:15
      }, {
        estimate: '在地质锤的尖头猛烈的打击下，碎块可以被剥落',
        example: '高度风化或变质的岩石',
        range: '1-5',strength:3
      },],
      multipleSelection: []
    }
  },
  created() {
    //回显上台阶数据
    if(cookie.get('upData')) {
      let upData = JSON.parse(cookie.get('upData'));
      this.ucs = upData.ucs/1000000;
      this.check();
    }
    //云端文件导入回显
      eventBus.$on('cloudFiles',(data)=>{
        if(data!=null){
          this.ucs = data.ucs / 1000000;
          eventBus.$emit('ucs_updated',{ucs:data.ucs});
        }
      });
  },
  beforeDestroy() {
    eventBus.$off('cloudFiles');
  },
  methods: {
    check() {
      if (this.ucs) {
        let u = this.ucs * 1000000;
        console.log(u);
        eventBus.$emit('ucs_updated',{ucs:u});
      }
    },

    handleSelectionChange(val) {
      this.ucs = val.strength;
    },
    //   控制单选
    handleCurrentChange(val) {
      this.rockId = val.id;
      this.type = val.name;
    },

    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          // 这里发送文件到服务器的逻辑
          // 可以使用 axios 或其他适当的库来进行文件上传
          // 示例：axios.post('/upload', formData);
          this.text = "文件上传成功！";
        } catch (error) {
          console.error('Error during file upload:', error);
          this.text = "文件上传失败，请重试。";
        }
      }
    },
    getRangeClass(range) {
      // 根据范围值返回不同的样式类名
      if (range === '>250') {
        return 'range-a';
      } else if (range === '100-250') {
        return 'range-b';
      } else if (range === '50-100') {
        return 'range-c';
      } else if (range === '25-50') {
        return 'range-d';
      } else if (range === '5-25') {
        return 'range-e';
      } else if (range === '1-5') {
        return 'range-f';
      }
    }
  }
}
</script>

<style >

.upload_area2{
  display: flex;
  align-items: center;
  margin-left: 40px;
  margin-top: 10px;
}
.upload-button {
  width: 232px;
  height: 40px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  font-size: 15px;
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
.text-box {
  width: 800px;
  height: 40px;
  margin-left: 17px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
