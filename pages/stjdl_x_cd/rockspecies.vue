<template>
  <div>
    <div class="card1_1">
      <h2 class= title1-before style="margin-top: 25px;font-size: 20px;!important;color: black;margin-left: 40px;padding-top: 21px;">1 岩石种类</h2>
      <div>
        <h3 class="title-front2" style="color: #0c72f0">火成岩（按拼音排序）</h3>
        <h3 style="display:inline-block;font-size: 15px !important;margin-left: 130px;color: #0c72f0">沉积岩（按拼音排序）</h3>
        <h3 style="display:inline-block;font-size: 15px !important;margin-left: 270px;color: #0c72f0">变质岩（按拼音排序）</h3>
      </div>
      <!-- 表格展示开始 -->

      <div class="table-style" style="background-color:pink;">
        <el-scrollbar wrap-style="overflow-x:hidden;" style="height: 100%;">
          <el-table
            ref="singleTable"
            :data="Igneous"
            border
            :show-header="false"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width:300px;font-size:15px;color: black">
            <el-table-column
              property="name"
              min-width="100%">
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>


      <div class="table-style" style="background-color:pink;margin-left: 130px">
        <el-scrollbar  wrap-style="overflow-x:hidden;" style="height: 100%;">
          <el-table
            ref="singleTable"
            :data="Sedimentary"
            border
            :show-header="false"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width:300px;font-size:15px;color: black">
            <el-table-column
              property="name"
              min-width="100%">
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>

      <div class="table-style" style="background-color:pink;margin-left: 130px">
        <el-scrollbar wrap-style="overflow-x:hidden;" style="height: 100%;">
          <el-table
            ref="singleTable"
            :data="Metamorphic"
            border
            :show-header="false"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width:300px;font-size:15px;color: black">
            <el-table-column
              property="name"
              min-width="100%">
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
      <!-- 表格展示结束 -->
      <div class="upload_area">
        <label class="upload-button">
          上传岩样照片智能识别
          <input type="file" accept="image/*" @change="handleFileUpload">
        </label>
        <input  style="border: #FFFFFF " class="text-box" v-model="uploadedFilePath" :readonly="true" placeholder="图片类型支持PNG、JPG、JPEG、BMP，大小不超过4M">
        <div class="success-message" v-if="uploadSuccess">上传成功！</div>
      </div>
      <div style="width: auto;margin-top: 10px">
      <span slot="label" style="font-size: 18px;width: 400px;margin-left:58px ">
        <strong>您判定的岩石种类：</strong>
      </span>
        <br>
        <div class="proovr-collect__tags" style="display: flex;width: 1200px; align-items: center;margin-left: 58px;">
          <el-input v-model="type" style="width: 1100px;margin-right: 10px;"></el-input>
          <span @click="confirm" class="proovr-collect__tag" >确认</span>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  import rockTypeApi from '@/api/getspecies.js'
  import calculateApi from '@/api/calculate.js'
  import cookie from 'js-cookie'
  import axios from 'axios'; // 引入 axios 库
  import {eventBus} from "../../plugins/nuxt-elementui";
  export default {
    data(){
        return{
            uploadedFilePath: '',
            uploadSuccess: false,
            ucs:'',
            type:'花岗岩',
            rockId:'18',
            getData:[],         //辅助数组
            Sedimentary:[],                         //沉积岩
            Igneous:[],                             //火成岩
            Metamorphic:[],                         //变质岩
            tableData: [{
            estimate: '标本只能用地质锤凿碎',
            example: '新鲜玄武岩、燧石、辉绿岩、片麻岩、花岗岩、石英岩',
            range: '>250'
            }, {
            estimate: '标本需要地质锤多次击打才能断裂',
            example: '角闪岩、砂岩、玄武岩、辉长岩、片麻岩、花岗闪长岩、石灰岩',
            range: '100-250'
            }, {
            estimate: '标本需要地质锤不止一次的击打才能断裂',
            example: '石灰石、大理石、千枚岩、砂岩、片岩、页岩、粉砂岩',
            range: '50-100'
            }, {
            estimate: '不能用小刀刮或剥皮，标本可以用刀一击就断裂',
            example: '粘土、煤、混凝土、片岩、页岩、粉砂岩',
            range: '25-50'
            }, {
            estimate: '用小刀很难剥开，用刀尖用力敲击，形成浅压痕',
            example: '白垩、岩盐、钾盐',
            range: '5-25'
            }, {
            estimate: '在地质锤的尖头猛烈的打击下，碎块可以被剥落',
            example: '高度风化或变质的岩石',
            range: '1-5'
            }, {
            estimate: '按缩略图缩进',
            example: '坚硬的断层泥',
            range: '0.25-1'
            }],
            multipleSelection: []
        }
        },
    created(){
        rockTypeApi.getRockType().then(response => {
            this.getData = response.data.data

            this.getData.map((item) => {
                if(item.type_code == '002001'){
                    this.Sedimentary.push({id:item.id,name:item.name,})
                }else if(item.type_code == '002002'){
                    this.Igneous.push({id:item.id,name:item.name,})
                }else if(item.type_code == '002003'){
                    this.Metamorphic.push({id:item.id,name:item.name,})
                }
            });

            //回显上台阶数据
            if(cookie.get('upData')){
              let upData = JSON.parse(cookie.get('upData'));
              this.getData.map((item) => {
                if(item.id==upData.rockId){
                  this.type=item.name;
                  this.rockId=item.id;
                }
              });
              this.confirm()
            }
        })

      //云端文件导入回显
      eventBus.$on('cloudFiles',(data)=>{
        if(data!=null){
          this.rockId = data.rockId;
          eventBus.$emit('rock-id-updated', {rockId:this.rockId});
          this.getData.map((item) => {
            if(item.id == this.rockId){
              this.type = item.name;
            }
          })
        }
      });
    },
    beforeDestroy() {
    eventBus.$off('cloudFiles');
  },
    methods:{
      async handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append('file', file);

          try {
            const response = await axios.post('/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });

            // 处理图片识别结果
            const analysisResult = response.data.analysisResult;

            this.uploadedFilePath = file.name + ' (' + this.formatFileSize(file.size) + ')';
            this.uploadSuccess = true;
          } catch (error) {
            console.error('Error during upload:', error);
          }
        }
      },
      formatFileSize(size) {
        if (size === 0) return '0 B';
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(1024));
        return `${(size / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
      },
        confirm(){
          eventBus.$emit('rock-id-updated', {rockId:this.rockId});
          console.log(this.rockId);
        },

    handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    //   控制单选
    handleCurrentChange(val) {
        this.rockId = val.id;
        this.type = val.name;
      }
    }
}
</script>

<style>
/*.title-front{*/
/*    margin-top: 21px;*/
/*    !*与左边时间线显示一致*!*/
/*    font-size: 20px !important;*/
/*  color: black;*/
/*}*/
.card1_1{
  height: auto;
  width: 1280px;
  color: black;
  border-radius: 20px; /* 设置圆角为10像素 */
  background-color: white;
}
.title-front2{
    font-size: 15px !important;
    margin: 10px 150px;
    display: inline-block;
}
.table-style{
    margin-left:60px;
    width:300px;
    height:400px;
    display:inline-block;
}
.upload_area{
  display: flex;
  align-items: center;
  margin-left: 58px;
}

.upload-button {
  width: 160px;
  height: 40px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
}

.upload-button input[type="file"] {
  display: none;
}

.text-box {
  height: 40px;
  margin-left: 17px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-left:  20px;
  box-sizing: border-box;
}
</style>
