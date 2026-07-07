<template>
<div>
    <div class="card1_1">
        <h2 class= title-before style="margin-top: 21px;padding-top:21px;font-size: 20px;!important;color: black;margin-left: 40px">3 岩体结构</h2>
        <div class="table1">
            <table style=" border-collapse: separate;
    border-spacing: 42px;">
                <tbody style="font-size: 15px;">
                    <tr>
                        <td>
                            <img src="~/assets/img/岩石表面状况(1)/岩石表面状况 (2)/1.png" alt="A类岩石参考图示"
                            style="width:200px;height:150px">
                            <p style="color: black;width: 200px;white-space: normal;">A:完整或块状构造均匀的结构-完整的岩石样本或具有少数
                              间距较宽的不连续性的块状原位岩石。（15～18）</p>
                        </td>
                        <td>
                            <img src="~/assets/img/岩石表面状况(1)/岩石表面状况 (2)/2.png" alt="B类岩石参考图示"
                            style="width:200px;height:150px">
                            <p style="color: black;width: 200px;white-space: normal;">B:较完整结构-由节理、裂隙、层面三个相交的不连续集形成的立方体块组成的良好闭锁的未扰动岩体。（12～15）</p>
                        </td>
                        <td>
                            <img src="~/assets/img/岩石表面状况(1)/RockType-3.png" alt="C类岩石参考图示"
                            style="width:200px;height:150px">
                            <p style="color: black;width: 200px;width: 200px;white-space: normal;">C:较破碎结构-由节理、裂隙、层面、劈理或多个节理组形成的具有多棱角块的闭锁、部分扰动岩体。（9～12）</p>
                        </td>
                        <td>
                            <img src="~/assets/img/岩石表面状况(1)/RockType-4.png" alt="D类岩石参考图示"
                            style="width:200px;height:150px">
                            <p style="color: black;width: 200px;white-space: normal;">D:块状/扰动状/裂隙状结构-由许多相交的不连续集合形成的角块状褶皱。连续不断的层理面或片理。（6～9）</p>
                        </td>
                        <td>
                            <img src="~/assets/img/岩石表面状况(1)/RockType-5.png" alt="E类岩石参考图示"
                            style="width:200px;height:150px">
                            <p style="color: black;width: 200px;white-space: normal;">E:极其破碎结构-闭锁锁不良、严重破碎的散体结构岩体，含有棱角分明和圆形的岩石碎片。（3～6）</p>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <br>
      <div style="width: 1400px;display: flex">
          <div class="row_style1">
            <el-button class="centered-button1" type="primary" v-for="(item,index) in values_1" :key="index"
            @click="checkValue(item)"
            plain>
            {{item}}
            </el-button>
          </div>
          <div class="row_style2">
            <el-button class="centered-button2" type="primary" v-for="(item,index) in values_2" :key="index"
                       @click="checkValue(item)"
                       plain>
              {{item}}
            </el-button>
          </div>
          <div class="row_style3">
            <el-button class="centered-button3" type="primary" v-for="(item,index) in values_3" :key="index"
                       @click="checkValue(item)"
                       plain>
              {{item}}</el-button>
          </div>
        <div class="row_style4">
<el-button class="centered-button4" type="primary" v-for="(item,index) in values_4" :key="index"
            @click="checkValue(item)"
            plain>
            {{item}}</el-button>
          </div>
          <div class="row_style5">
<el-button class="centered-button5" type="primary" v-for="(item,index) in values_5" :key="index"
            @click="checkValue(item)"
            plain>
            {{item}}</el-button>
          </div>
     </div>
      <div class="upload_area3">
        <label class="upload-button">
          上传掌子面激光点云进行智能辨识
          <input type="file" accept=".xls, .xlsx"   @change="handleFileUpload">
        </label>
        <input class="text-box3"  style="padding-left: 10px;border: #FFFFFF" v-model="uploadedFilePath" :readonly="true" placeholder="请上传掌子面表面XYZ格式点云文件">
        <!--        <div class="success-message" v-if="uploadSuccess">上传成功！</div>-->
      </div>
      <div class="upload_area3">
        <label class="upload-button">
          上传图片进行智能辨识
          <input type="file" accept=".xls, .xlsx" @change="handleFileUpload" >
        </label>
        <input class="text-box3"  style="padding-left: 10px;border: #FFFFFF" v-model="uploadedFilePath" :readonly="true" placeholder="请上传清晰的掌子面jpg、png、jpeg格式图片">
        <!--        <div class="success-message" v-if="uploadSuccess">上传成功！</div>-->
      </div>
      <div style="width: auto;margin-top: 10px">
                <span slot="label" style="font-size: 18px;width: 400px;margin-left:48px ">
      	        <strong >您判定的岩体结构分值：</strong>
                </span>
        <div class="proovr-collect__tags" style="display: flex; width:1200px;align-items: center;margin-left: 48px">
          <el-input v-model="structureScore" style="width: 1100px;margin-right: 10px"></el-input>
          <span @click="check" class="proovr-collect__tag">确认</span>
        </div>
      </div>
    </div>
</div>

</template>

<script>
import {eventBus} from "../../plugins/nuxt-elementui";
import cookie from 'js-cookie'

export default {
    mounted(){
      //回显上台阶数据
      if(cookie.get('upData')){
        let upData = JSON.parse(cookie.get('upData'))
        this.structureScore=upData.structureScore;
        this.check()
      }
    },
    created() {
      //云端文件导入回显
      eventBus.$on('cloudFiles',(data)=>{
        if(data!=null){
          this.structureScore = data.structureScore;
          eventBus.$emit('structureScore_updated',{structureScore:this.structureScore});
        }
      });
    },
    beforeDestroy() {
      eventBus.$off('cloudFiles');
    },
    data(){
        return{
            structureScore:'11',
            values_1:[18,17,16,15],
            values_2:[14,13,12],
            values_3:[11,10,9],
            values_4:[8,7,6],
            values_5:[5,4,3],
            rockId:'',
            ucs:'',
        }
    },
    methods:{
      handleFileUpload(){

      },
      uploadedFilePath(){

      },
        checkValue(val){
            this.structureScore=val
        },
        check(){
            if(this.structureScore){
              console.log(this.structureScore);
              eventBus.$emit('structureScore_updated',{structureScore:this.structureScore});
            }
        }
    }
}
</script>

<style scoped>
.upload-button {
  width: 232px;
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
  margin-top: 20px;
}
.upload_area3{
  display: flex;
  align-items: center;
  margin-left: 42px;
}
.text-box3 {
  width: 875px;
  height: 40px;
  margin-left: 17px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 20px;
  box-sizing: border-box;
}
.card1{
    height: 600px;
    width: 100%;
}

.table1{
    margin-top: -10px;
    height: 300px;
}
.centered-button1 {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: normal; /* 取消行高，以保持文字垂直居中 */
  width: 40px; /* 设置按钮宽度 */
  height: 40px; /* 设置按钮高度 */
  font-size: 15px;
  padding:5px 5px;
  margin-right:15px;
}
.centered-button2{
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: normal; /* 取消行高，以保持文字垂直居中 */
  width: 40px; /* 设置按钮宽度 */
  height: 40px; /* 设置按钮高度 */
  font-size: 15px;
  padding:5px 5px;
  margin-right:10px;
}
.centered-button2{
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: normal; /* 取消行高，以保持文字垂直居中 */
  width: 40px; /* 设置按钮宽度 */
  height: 40px; /* 设置按钮高度 */
  font-size: 15px;
  padding:5px 5px;
  margin-right:33px;
}
.centered-button3{
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: normal; /* 取消行高，以保持文字垂直居中 */
  width: 40px; /* 设置按钮宽度 */
  height: 40px; /* 设置按钮高度 */
  font-size: 15px;
  padding:5px 5px;
  margin-right:27px;
}
.centered-button4{
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: normal; /* 取消行高，以保持文字垂直居中 */
  width: 40px; /* 设置按钮宽度 */
  height: 40px; /* 设置按钮高度 */
  font-size: 15px;
  padding:5px 5px;
  margin-right:25px;
}
.centered-button5{
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: normal; /* 取消行高，以保持文字垂直居中 */
  width: 40px; /* 设置按钮宽度 */
  height: 40px; /* 设置按钮高度 */
  font-size: 15px;
  padding:5px 5px;
  margin-right:25px;
}
.row_style1{
  width: 270px;
  padding-left: 40px;
  /*background-color: pink;*/
}
.row_style2{
  width: 245px;
  /*background-color: green;*/
}
.row_style3{
  margin-left: 15px;
  width: 240px;
  /*background-color: pink;*/
}
.row_style4{
  margin-left: 12px;
  width: 240px;
  /*background-color: green;*/
}
.row_style5{
  margin-left: -17px;
  width: 230px;
  /*background-color: pink;*/
}
</style>
