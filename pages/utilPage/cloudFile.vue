<template>
  <div>
    <el-dialog title="云端文件" :visible.sync="dialogVisibles" width="1000px" @close="handleDialogClose">
        <el-table
        :data="pagedTableData"
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
        <el-pagination
          v-if="tableData.length > pageSize"
          class="cloud-file-pagination"
          background
          layout="prev, pager, next, total"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="tableData.length"
          @current-change="handlePageChange">
        </el-pagination>
    </el-dialog>
  </div>
</template>
<style scoped>
.cloud-file-pagination {
  margin-top: 16px;
  text-align: right;
}
</style>
<script>
import cloudFileApi from '@/api/cloudFile.js'
import getProjectApi from '@/api/getProject.js'
import cookie from 'js-cookie'
import {eventBus} from "../../plugins/nuxt-elementui";
const fixedCloudUserId = "2074397063014092802";
const projectDetailFields = [
  "id",
  "projectName",
  "excavationCode",
  "rockId",
  "lithology",
  "ucs",
  "structureScore",
  "structuralPlaneScore",
  "buriedDeep",
  "initialGroundStress",
  "holeDiameter",
  "holeLength",
  "explosiveDensity",
  "d",
  "chargeType",
  "offsetX",
  "offsetY",
  "explosivityIndex",
  "rockLevel",
  "rockLEvel",
  "classify",
  "totalExplosiveAmount",
  "holeNum",
  "createTime",
  "updateTime"
];
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
        currentPage: 1,
        pageSize: 10,
        projectData: null,
        id:null,      //获取用户id
      };
    },
    computed: {
      pagedTableData() {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.tableData.slice(start, start + this.pageSize);
      }
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
          this.currentPage = 1;
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
      handlePageChange(page) {
        this.currentPage = page;
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
        if (!val || !val.id) {
          this.$message({
            type: 'error',
            message: "该文件不存在！",
            duration: 6000,
            offset: 140
          })
          return;
        }
        this.loading = true;
        cloudFileApi.getProject(val.id).then(response => {
          const projectDetail = this.getProjectDetail(response);
          if(!projectDetail || !projectDetail.id){
            throw new Error("empty project detail");
          }
          this.projectData = this.filterProjectDetail(projectDetail);
          this.projectData.type = this.getExcavationName(this.projectData.excavationCode);
          return cloudFileApi.getAllHole(this.projectData.id);
        }).then(response => {
          const holesData = response.data.map;
          this.rewriteProjectIdCookie(this.projectData);
          this.savePendingCloudData(this.projectData, holesData);
          this.importToProjectPage(this.projectData, holesData);
        }).catch(() => {
          this.$message({
            type: 'error',
            message: "项目导入失败！",
            duration: 6000,
            offset: 140
          })
        }).finally(() => {
          this.loading = false;
        })
      },
      importToProjectPage(projectData, holesData) {
        const targetPath = this.getTargetPath(projectData);
        if (!targetPath) {
          this.emitCloudData(projectData, holesData);
          this.handleDialogClose();
          return;
        }
        if (this.normalizePath(this.$route.path) === this.normalizePath(targetPath)) {
          this.emitCloudData(projectData, holesData);
          this.handleDialogClose();
          this.$message({
            type: 'success',
            message: "导入成功！",
            duration: 2000,
            offset: 140
          })
          return;
        }
        alert(`将跳转至${projectData.type}页面`);
        window.location.href = targetPath;
      },
      normalizePath(path) {
        if (!path || path === "/") {
          return "/";
        }
        return path.replace(/\/+$/, "");
      },
      getTargetPath(projectData) {
        if(projectData.type=="全断面楔形掏槽"){
          return "/qdmdl_ld";
        }
        if(projectData.type=="全断面直孔掏槽"){
          return "/qdmdl_s";
        }
        if(projectData.type=="分台阶法楔形掏槽" || projectData.type=="分台阶法楔形掏槽下台阶"){
          return "/stjdl";
        }
        return "";
      },
      emitCloudData(projectData, holesData) {
        eventBus.$emit('cloudFiles', projectData);
        eventBus.$emit('cloudFileHoles', holesData);
      },
      rewriteProjectIdCookie(projectData) {
        if (projectData && projectData.id) {
          cookie.set("projectId", projectData.id);
        }
      },
      savePendingCloudData(projectData, holesData) {
        sessionStorage.setItem("pendingCloudProject", JSON.stringify(projectData));
        sessionStorage.setItem("pendingCloudHoles", JSON.stringify(holesData));
      },
      emitPendingCloudData() {
        const projectData = sessionStorage.getItem("pendingCloudProject");
        const holesData = sessionStorage.getItem("pendingCloudHoles");
        if (!projectData) {
          return;
        }
        setTimeout(() => {
          eventBus.$emit('cloudFiles', JSON.parse(projectData));
          if (holesData) {
            eventBus.$emit('cloudFileHoles', JSON.parse(holesData));
          }
          sessionStorage.removeItem("pendingCloudProject");
          sessionStorage.removeItem("pendingCloudHoles");
        }, 0);
      },
      getProjectDetail(response) {
        if (response.data && response.data.data) {
          return response.data.data;
        }
        return response.data || null;
      },
      filterProjectDetail(projectDetail) {
        return projectDetailFields.reduce((detail, field) => {
          if (projectDetail[field] !== undefined) {
            detail[field] = projectDetail[field];
          }
          return detail;
        }, {});
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
      this.emitPendingCloudData();
    },
  };
</script>
