<template>
  <div>
    <el-dialog title="服务日志" :visible.sync="dialogVisibles" width="1000px" @close="handleDialogClose">
        <el-table
        :data="tableData"
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
        <el-table-column label="操作" fixed="right" min-width="200" align="center">
          <template>
            <el-button size="mini" @click="readDetail">查看详情</el-button>
            <el-button size="mini" type="danger" @click="delProject">删除</el-button>
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
import cookie from 'js-cookie'
import {eventBus} from "../../../plugins/nuxt-elementui";
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
        },
        deep: true,
        immediate:true
      },
      userId:{
        handler(newV) {
            this.id = newV;
            if(this.id!='' && this.id!=null){
              // console.log("userId"+this.id);
              cloudFileApi.getAllData(this.id).then(response => {
                // console.log("cloudFileApi"+JSON.stringify(response.data.data));
                //表格赋值
                this.tableData = response.data.data;
                this.tableData.map((item) => {
                  if(item.excavationCode=="001001")
                    item.type="全断面楔形掏槽"
                  else if(item.excavationCode=="001002")
                    item.type="全断面直孔掏槽"
                  else if(item.excavationCode=="001003")
                    item.type="分台阶法楔形掏槽"
                  else if(item.excavationCode=="001004")
                    item.type="分台阶法"
                  else if(item.excavationCode=="001005")
                    item.type="分台阶法楔形掏槽下台阶"
                })
              })
            }
        },
        deep: true,
        immediate:true
      },
    },
    data() {
      return {
        dialogVisibles:false,
        tableData: [],
        projectData: null,
        id:null,      //获取用户id
      };
    },
    methods: {
      readDetail(){
        const { href } = this.$router.resolve({
          path: `utilPage/logFile/projectDetail`,
          query: {
            userId: this.id
          }
        });
        window.open(href, '_blank');
      },
      handleDialogClose() {
        this.dialogVisibles = false;
        this.$emit('dialogVisibles',this.dialogVisibles)
      },
      delProject(){},
    },
    mounted() {
    },
  };
</script>
