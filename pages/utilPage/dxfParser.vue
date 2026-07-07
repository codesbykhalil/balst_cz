<template>
  <div style="width:600px" class="up_area">
        <el-upload class="upload"
                    ref="upload"
                    action="string"
                    :file-list="fileList"
                    :auto-upload="false"
                    :http-request="uploadFile"
                    :on-change="handleChange"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    multiple="multiple">
            <span @click="delFile" class="proovr-collect__tag" style="padding-top:8px;padding-bottom:8px;margin-left: 63px;">导入dxf文件自动提取开挖轮廓信息</span>
        </el-upload>
        <el-button type="primary"  class="submit_button" v-show="isUpload" @click="onSubmit">保存</el-button>
  </div>
</template>
<script>
import DxfParser from 'dxf-parser'
import predictApi from '@/api/predict.js'
export default {
    layout: 'sign',
    name: "dxfParser",
   data() {
      return {
        fileList: [],
        // 不支持多选
        multiple: false,
        formData: "",
        tableData:[],
        isUpload:false,
      };
    },
    methods: {
        //保存按钮
        onSubmit () {
            let _this = this;
            const reader = new FileReader();
			reader.readAsText(this.fileList[0].raw);
			reader.onload = function(e) {
				const fileText = e.target.result;
				const parser = new DxfParser();
				let dxf = null;
			    try {
					dxf = parser.parseSync(fileText);
				} catch(err) {
					return console.error(err.stack);
				}

                console.log(dxf)
                const entities = Object.entries(dxf.entities)
                // console.log(dxf.entities[0])
                this.tableData=[];
                entities.forEach((item,index) => {
                    console.log("**************"+JSON.stringify(item[1])+"+++++++")
                    if(item[1].type == 'LINE'){
                    //强制转换直线为顺时针
                    let xs1 = item[1].vertices[0].x/100;
                    let xs2 = item[1].vertices[1].x/100;
                        if(xs1>xs2)
                            this.tableData.push({
                                x1:xs1,
                                y1:item[1].vertices[0].y/100,
                                x2:xs2,
                                y2:item[1].vertices[1].y/100,
                                r:'0',
                                serialLine:'',
                                isBottom:0
                            })
                        else if(xs1<xs2)
                            this.tableData.push({
                                x1:xs2,
                                y1:item[1].vertices[1].y/100,
                                x2:xs1,
                                y2:item[1].vertices[0].y/100,
                                r:'0',
                                serialLine:'',
                                isBottom:0
                            })
                    }
                    else if (item[1].type == 'ARC'){
                        // let startRadian = item[1].startAngle * (Math.PI/180);
                        // let endRadian = item[1].endAngle * (Math.PI/180);
                        let startRadian = item[1].startAngle;
                        let endRadian = item[1].endAngle;
                        if (endRadian < startRadian) {
                            endRadian += 2 * Math.PI;
                        }
                        let centerX = item[1].center.x;
                        let centerY = item[1].center.y;
                        let radius = item[1].radius;

                        let xa1 = centerX + radius * Math.cos(startRadian);
                        let xa2 = centerX + radius * Math.cos(endRadian);

                    //强制转换弧线为顺时针
                        if(xa1<xa2)
                            this.tableData.push({
                                //添加开始的点
                                x1:xa1/100,
                                y1:(centerY + radius * Math.sin(startRadian))/100,
                                //添加最终的点
                                x2:xa2/100,
                                y2:(centerY + radius * Math.sin(endRadian))/100,
                                r:radius/100,
                                serialLine:'',
                                isBottom:0
                            })
                        else
                            this.tableData.push({
                                //添加开始的点
                                x1:xa2/100,
                                y1:(centerY + radius * Math.sin(endRadian))/100,
                                //添加最终的点
                                x2:xa1/100,
                                y2:(centerY + radius * Math.sin(startRadian))/100,
                                r:radius/100,
                                serialLine:'',
                                isBottom:0
                            })
                    }
                })
                predictApi.test2(this.tableData).then(response => {
                    this.tableData = response.data.data
                    _this.$emit('tableData',this.tableData)
                })
                //发送至父组件
			};
        },
          //点击上传文件触发的额外事件,清空fileList
        delFile () {
            this.fileList = [];
            this.isUpload = true;
        },
        handleChange (file, fileList) {
            this.fileList = fileList;
            // console.log(this.fileList, "sb");
        },
        //自定义上传文件
        uploadFile (file) {
            this.formData.append("file", file.file);
            // console.log(file.file, "sb2");
        },
        //删除文件
        handleRemove (file, fileList) {
            console.log(file, fileList);
            this.isUpload = false;
        },
        // 点击文件
        handlePreview (file) {
            console.log(file);
        },

    }
};
</script>
<style>
.up_area{
  margin-top: 8px;
  display: flex;
  align-items: center;
}
.submit_button{
  background-color: #d4e3fc;
  color: #4b5b76;
  padding: 0;
  width: 40px;
  font-size: 15px;
  height: 30px;
  border-radius: 2px;
  border: 0;
}
.submit_button:hover{
  background-color: #0c72f0;
}
</style>
