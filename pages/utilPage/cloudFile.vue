<template>
  <div>
    <el-dialog title="云端文件" :visible.sync="dialogVisibles" width="1000px" @close="handleDialogClose">
        <el-table
        :data="tableData"
        v-loading="loading"
        style="width: 1000px">
        <el-table-column
            prop="id"
            label="工程ID"
            width="200">
        </el-table-column>
        <el-table-column
            prop="excavationCode"
            label="开挖方式"
            v-if="false"
            width="200">
        </el-table-column>
        <el-table-column
            prop="type"
            label="开挖方式"
            width="200">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="创建日期"
            width="200">
        </el-table-column>
        <el-table-column
            prop="updateTime"
            label="修改日期"
            width="200">
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="160" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="importProject(scope.row)">导入</el-button>
            <el-button size="mini" type="danger" @click="delProject(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>
<style>
</style>
<script>
import cloudFileApi from '@/api/cloudFile.js'
import getProjectApi from '@/api/getProject.js'
import {eventBus} from "../../plugins/nuxt-elementui";
const fixedCloudUserId = "1810969334082240513";
  export default {
    props: {
      dialogVisible: {
        type: Boolean,
        default () {
          return false
        }
      },
      userId: {
        type: String,
        default () {
          return ''
        }
      },
  },
    watch:{
      dialogVisible:{
        handler(newV) {
            this.dialogVisibles = newV;
            if (newV) {
              this.getCloudFileList();
            }
        },
        deep: true,
        immediate:true
      },
      userId:{
        handler(newV) {
            this.id = newV;
            if (this.dialogVisibles) {
              this.getCloudFileList();
            }
        },
        deep: true,
        immediate:true
      },
    },
    data() {
      return {
        dialogVisibles:false,
        loading: false,
        tableData: [],
        projectData: null,
        id:null,      //获取用户id
      };
    },
    methods: {
      handleDialogClose() {
        this.dialogVisibles = false;
        this.$emit('dialogVisibles',this.dialogVisibles)
      },
      getCloudFileList() {
        this.loading = true;
        cloudFileApi.getAllData(fixedCloudUserId).then(response => {
          const list = this.getResponseList(response);
          this.tableData = list.map((item) => {
            return {
              ...item,
              type: this.getExcavationName(item.excavationCode)
            }
          });
        }).catch(() => {
          this.tableData = [];
          this.$message({
            type: 'error',
            message: "云端文件获取失败！",
            duration: 6000,
            offset: 140
          })
        }).finally(() => {
          this.loading = false;
        })
      },
      getResponseList(response) {
        if (Array.isArray(response.data)) {
          return response.data;
        }
        if (response.data && Array.isArray(response.data.data)) {
          return response.data.data;
        }
        return [];
      },
      getExcavationName(excavationCode) {
        const excavationMap = {
          "001001": "全断面楔形掏槽",
          "001002": "全断面直孔掏槽",
          "001003": "分台阶法楔形掏槽",
          "001004": "分台阶法",
          "001005": "分台阶法楔形掏槽下台阶"
        };
        return excavationMap[excavationCode] || excavationCode || "";
      },
      importProject(val) {
        if (!val) {
          return;
        }
        //导入项目信息
        this.projectData = val;
        // console.log("projectData"+JSON.stringify(this.projectData))
        let router_path = this.$route.path

        if(val.type=="全断面楔形掏槽"){
          if(router_path!='/qdmdl_x'){
            alert("将跳转至全断面楔形掏槽页面")
            window.location.href =  "/qdmdl_x"
          }
        }
        else if(val.type=="全断面直孔掏槽"){
          alert("将跳转至全断面直孔掏槽页面")
          window.location.href =  "/qdmdl_s"
        }
        else if(val.type=="分台阶法楔形掏槽" || val.type=="分台阶法楔形掏槽下台阶"){
          if(router_path!='/stjdl'){
            alert("将跳转至分台阶法楔形掏槽页面")
            window.location.href =  "/stjdl"
          }
        }
        else if(val.type=="分台阶法"){
          alert("将跳转至分台阶法页面")
        }
        if(this.projectData!=null)
          eventBus.$emit('cloudFiles', this.projectData);
        else
          this.$message({
              type: 'error',
              message: "该文件不存在！",
              duration: 6000,
              offset: 140
            })


        cloudFileApi.getAllHole(this.projectData.id).then(response => {
          // console.log("getAllHole"+JSON.stringify(response.data))
          eventBus.$emit('cloudFileHoles', response.data.map);
        }).catch(() => {
          this.$message({
            type: 'error',
            message: "炮孔数据获取失败！",
            duration: 6000,
            offset: 140
          })
        })
      },
      delProject(row){
        if (!row || !row.id) {
          this.$message({
            type: 'error',
            message: "该文件不存在！",
            duration: 6000,
            offset: 140
          })
          return;
        }
        this.$confirm('确认删除该云端文件吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return getProjectApi.delProject(row.id);
        }).then(() => {
          this.$message({
            type: 'success',
            message: "删除成功！",
            duration: 2000,
            offset: 140
          })
          this.getCloudFileList();
        }).catch((error) => {
          if (error === 'cancel') {
            return;
          }
          this.$message({
            type: 'error',
            message: "删除失败！",
            duration: 6000,
            offset: 140
          })
        })
      },
    },
    mounted() {
    },
  };
</script>
