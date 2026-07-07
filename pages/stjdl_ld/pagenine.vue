<template>
  <div class="card5_1">
    <div>
      <h2 class= title-before style="margin-top: 21px;padding-top:21px;
      font-size: 20px;!important;color: white;margin-left: 40px;padding-bottom: 20px">9 掏槽孔设置</h2>

      <h3 class="font-type7" style="display:inline-block;color: white;margin-left: 65px;">装药直径：<br/>
        <el-input style="width:1160px;padding-top: 10px;margin-bottom: -20px" v-model="cuttingDc"><template slot="suffix">mm</template></el-input>
      </h3>
      <br/>
      <h3 class="font-type7" style="display:inline-block;margin-top: 21px;color: white;margin-left: 65px">掏槽级数：<br/>
        <el-input style="width:1160px;padding-top: 10px;" v-model="cuttingNum"></el-input>
      </h3>
      <br/>
      <h3 class="font-type7" style="cmargin-top: 21px;color: white;margin-left: 65px">掏槽高度：<br/>
        <el-input style="width:1160px;padding-top: 10px;margin-bottom: -20px" v-model="cuttingRow"><template slot="suffix">m</template></el-input>
      </h3>

      <h3 class="font-type7" style="display:inline-block;margin-top: 21px;color: white;margin-left: 65px">掏槽区底边高度调整系数：<br/>
        <el-input style="width:1160px;padding-top: 10px" v-model="cuttingN"><template slot="suffix"></template></el-input>
      </h3>
      <br/>




      <h3 class="font-type7" style="display:inline-block;margin-left: 65px;color: white">是否添加解炮孔：
        <el-radio-group v-model="radio" @change="switchRadio">
          <el-radio :label=1 border style="color:white;border: none;">是</el-radio>
          <el-radio :label=0 border style="color:white;border: none; ">否</el-radio>
        </el-radio-group>
        <br>
        <el-input style="width:1167px;margin-top: 10px" v-if="inputDis" v-model="JPK"><template slot="suffix"></template></el-input>
      </h3>
      <div>
        <h3 class="font-type7" style="color: #79FDFF;margin-bottom: 15px;margin-left: 65px" @click="openSubmenu">
          更多设置<i class="el-icon-arrow-down el-icon--right"></i>
        </h3>
        <h3 class="font-type7" style="display:inline-block;margin-left: 65px;color: white" v-if="subMenu">是否根据凿岩台车臂长计算适合角度：
          <el-radio-group style="margin-left: -8px;" v-model="radio3" @change="switchRadio3">
            <el-radio :label=1 border style="color:white;border: none;">是</el-radio>
            <el-radio :label=0 border style="color:white;border: none;">否</el-radio>
          </el-radio-group>
          <br>
          <h3 class="font-type7" v-if="inputDis3" style="display:inline-block;margin-left: 0;color: white">请输入凿岩台车臂长：
            <el-input style="width:1160px;margin-top: 10px" v-model="machineLength"><template slot="suffix"></template></el-input>
          </h3>
          <h3 class="font-type7" v-if="inputDis3" style="display:inline-block;margin-left: 0;color: white">最小角度为：
            <el-input style="width:1160px;margin-top: 10px" v-model="minAngle" :disabled="true"><template slot="suffix" style="color: #FFFFFF"></template></el-input>
          </h3>
          <h3 class="font-type7" v-if="subMenu" style="display:inline-block;margin-left: 0;color: white">第一级掏槽孔角度：
            <el-input style="width:1160px;margin-top: 10px;" v-model="firstAngle" ><template slot="suffix"></template></el-input>
          </h3>
        </h3>
        <h3 class="font-type7" v-if="subMenu" style="display:inline-block;margin-left: 65px;width: 1167px;color: white">是否采用辅助掏槽：
          <el-radio-group v-model="radio4" @change="switchRadio4">
            <el-radio :label=1  border style="color:white;border: none;">是</el-radio>
            <el-radio :label=0  border style="color:white;border: none;">否</el-radio>
          </el-radio-group>
        </h3>
        <!--        <h3 class="font-type9" v-if="subMenu" style="display:inline-block;margin-left: 65px;width: 1167px;color: white"><strong>是否采用复式掏槽：</strong>-->
        <!--          <el-radio-group v-model="radio2" @change="switchRadio2">-->
        <!--            <el-radio label="1"  border style="color:white;border: none;">是</el-radio>-->
        <!--            <el-radio label="0"  border style="color:white;border: none;">否</el-radio>-->
        <!--          </el-radio-group>-->
        <!--          <h3 class="font-type9" v-if="inputDis2" style="display:inline-block;margin-left: 268px;width: 550px;color: white">-->
        <!--            <strong>请输入调整系数(默认0.5)：</strong>-->
        <!--            <el-input style="width:327px;margin-top: 10px;" v-if="inputDis2" v-model="adjustFactor"><template slot="suffix"></template></el-input>-->
        <!--          </h3>-->
        <!--          <br>-->
        <!--          <el-input style="width:1167px;margin-top: 10px" v-if="inputDis2" v-model="FSTC"  :disabled="true"><template slot="suffix"></template></el-input>-->
        <!--        </h3>-->
      </div>

      <div class="proovr1-collect__tags" style="display: flex; align-items: center;margin-bottom: 15px;margin-top: -10px">
        <span @click="calculate()" class="proovr1-collect__tag" style="margin:30px 0 0 595px">保存掏槽孔信息</span>
      </div>

<!--      <div style="height:auto;">-->
<!--        &lt;!&ndash; 表格开始 &ndash;&gt;-->
<!--        <div style="margin-left: 65px;">-->
<!--          <el-table-->
<!--            :data="levelTable"-->
<!--            :span-method="objectSpanMethod"-->
<!--            border :row-class-name="tableRowClassName"-->
<!--            size="large"-->
<!--            style="width: 1160px;margin-top:50px;border: 1px solid #5B9BD5"-->
<!--            @cell-mouse-enter="handleCellEnter"-->
<!--            @cell-mouse-leave="handleCellLeave"-->
<!--            :cell-style="cellStyle"-->
<!--            :header-cell-style="{  color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }"-->
<!--          >-->

<!--            &lt;!&ndash; 级数 &ndash;&gt;-->
<!--            <el-table-column-->
<!--              prop="levelNum"-->
<!--              label="掏槽级数"-->
<!--              width="232"-->
<!--              align="center">-->
<!--              <div class="item" slot-scope="scope">-->
<!--                <el-input class="item__input" v-model="scope.row.levelNum" :disabled="true" placeholder="请输入"></el-input>-->
<!--                <div class="item__txt">{{scope.row.levelNum}}</div>-->
<!--              </div>-->
<!--            </el-table-column>-->

<!--            &lt;!&ndash; 角度 &ndash;&gt;-->
<!--            <el-table-column-->
<!--              prop="angle"-->
<!--              label="炮孔倾斜角度（°）"-->
<!--              width="232"-->
<!--              align="center">-->
<!--              <div class="item" slot-scope="scope">-->
<!--                <el-input class="item__input" v-model="scope.row.angle" :disabled="scope.row.tId>0 ? false : true" placeholder="请输入"></el-input>-->
<!--                <div class="item__txt">{{scope.row.angle}}</div>-->
<!--              </div>-->
<!--            </el-table-column>-->

<!--            <el-table-column-->
<!--              prop="position"-->
<!--              label=""-->
<!--              width="232"-->
<!--              align="center">-->
<!--              <div class="item" slot-scope="scope">-->
<!--                <el-input class="item__input" v-model="scope.row.position" :disabled="true" placeholder="请输入"></el-input>-->
<!--                <div class="item__txt">{{scope.row.position}}</div>-->
<!--              </div>-->
<!--            </el-table-column>-->

<!--            &lt;!&ndash; 排距 &ndash;&gt;-->
<!--            <el-table-column-->
<!--              prop="rowSpac"-->
<!--              label="排距(m)"-->
<!--              width="232"-->
<!--              align="center">-->
<!--              <div class="item" slot-scope="scope">-->
<!--                <el-input class="item__input" v-model="scope.row.rowSpac" :disabled="true"></el-input>-->
<!--                <div class="item__txt">{{scope.row.rowSpac}}</div>-->
<!--              </div>-->
<!--            </el-table-column>-->

<!--            &lt;!&ndash; 孔距 &ndash;&gt;-->
<!--            <el-table-column-->
<!--              prop="holeSpac"-->
<!--              label="孔距(m)"-->
<!--              width="231"-->
<!--              align="center">-->
<!--              <div class="item" slot-scope="scope">-->
<!--                <el-input class="item__input" v-model="scope.row.holeSpac" :disabled="scope.row.tId>2 ? false : true" placeholder="请输入"></el-input>-->
<!--                <div class="item__txt">{{scope.row.holeSpac}}</div>-->
<!--              </div>-->
<!--            </el-table-column>-->

<!--          </el-table>-->
<!--          <div class="proovr1-collect__tags" style="display: flex; align-items: center;">-->
<!--            <span @click="holeAndDraw" class="proovr1-collect__tag" style="margin:30px 0 0 530px">布孔并画图</span>-->
<!--          </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; 表格结束 &ndash;&gt;-->
<!--        <div style="padding-top: 30px;margin-left: 65px;width: 1160px;display: flex; justify-content: space-between;">-->
<!--          &lt;!&ndash;         画布展示开始 &ndash;&gt;-->
<!--          <div>-->
<!--            <el-table-->
<!--              :data="tablesData1"-->
<!--              size="large"-->
<!--              style="width: 1160px;-->
<!--                    /*border: 1px solid #5B9BD5;*/-->
<!--                    margin-top:20px;font-size: 20px"-->
<!--              :cell-style="cellStyle1"-->
<!--              :header-cell-style="{ color: 'white', borderColor: '#5B9BD5',backgroundColor:'#01366a' }">-->
<!--              <el-table-column prop="TwoD" label="二维视图" align="center" width="580px" >-->
<!--                <template slot-scope="scope" style="padding: 0">-->
<!--                  &lt;!&ndash; d导入 show 组件 &ndash;&gt;-->
<!--                  <show2 :vertices="vertices"  :key="timer"/>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="ThreeD" label="三维视图" align="center">-->
<!--                <template slot-scope="scope">-->
<!--                  &lt;!&ndash; d导入 show 组件 &ndash;&gt;-->
<!--                  <show :vertices="vertices" :tube="tube" :key="timer"/>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--            </el-table>-->
<!--          </div>-->
<!--        </div>-->
<!--        <br/>-->
<!--        &lt;!&ndash; 表格2开始 &ndash;&gt;-->
<!--&lt;!&ndash;        <tables style="margin-left: 40px" :holeTableNum="holeTableNum" :childData="childData"&ndash;&gt;-->
<!--&lt;!&ndash;                @childVertices="getChildData" @childTube="getChildTube" :key="timer"/>&ndash;&gt;-->
<!--        &lt;!&ndash; 表格2结束 &ndash;&gt;-->

<!--      </div>-->
    </div>
  </div>
</template>

<script>
import '~/assets/css2/pages.css'
import { getMergeCells } from '@/utils/table.js'
import show from '../utilPage/pageNine/show.vue'
import cuttingApi from '@/api/cutting.js'
import cookie from 'js-cookie'
import tables from '../utilPage/pageNine/table.vue'
import {eventBus} from "~/plugins/nuxt-elementui";
import show2 from "@/pages/utilPage/pageNine/show2.vue";
import getProjectApi from "@/api/getProject";
import pageeight from "@/pages/stjdl_ld/pageeight.vue";

export default {
  components:{show2, tables,show},
  data(){
    return{
      radio: 1,
      radio2:-1,
      radio3:0,
      radio4:1,
      JPK:3,
      FSTC:0,
      oldFSTC:0,          //保存旧值
      inputDis:true,
      inputDis2:true,
      inputDis3:false,
      adjustFactor:0.5,     //调整系数，需要watch监听
      subMenu:true,        //凿岩台车臂长显示
      machineLength:0,      //凿岩台车臂长
      firstAngle:65,
      minAngle:0,
      tablesData1:[
        {
          TwoD:'',ThreeD:"3D显示区域"
        }
      ] ,
      cutObj: {
      },
      timer: '',
      cuttingDc: '40',
      cuttingNum: '3',
      cuttingRow: '1.5',
      stepLine1:null,
      stepLine2:null,
      holeTableNum: 0,
      cuttingId:'',
      cuttingN: '0.5',
      vertices: [],         //show子组件数据
      tube:[],              //show子组件数据
      childData: null,         //table子组件数据
      tableColumn: [
        { prop: 'levelNum', label: '等级' },
        { prop: 'angle', label: '角度' },
        { prop: 'position', label: '' },
        { prop: 'rowSpac', label: '排距' },
        { prop: 'holeSpac', label: '孔距' },
      ],
      levelTable:[],
      cuttingMsg:[],          //保存掏槽孔信息数组
      cuttingTable:[],          //保存掏槽孔排距表
      cuttingObj:{
        id: '', //cuttingId （保存掏槽孔排距信息的时候生成）
        cuttingDc: 0, //掏槽孔装药直径
        cuttingNum: 0, //掏槽级数
        cuttingRow: 0, //掏槽排数
        cuttingN:0,//取值范围0.75到1
        orificeSpacing1: null, //第一级孔口孔距
        orificeSpacing2: null, //第二级孔口孔距
        orificeRow1: "", //第一级孔口排距
        bottomRow1: "", //第一级孔底排距
        cuttingDipAngle1: "70", //掏槽孔排距表第一级角度
        cuttingDipAngle2: "", //掏槽孔排距表第二级角度
        cuttingDipAngle3: "", //掏槽孔排距表第三级角度
        // projectId: "1688562209227726849" //projectId（保存项目信息的时候生成）
        projectId:'',
        isAssistHole:1,
      },          //计算掏槽孔排距信息对象
      editProp: ['levelNum', 'angle','position', 'rowSpac', 'holeSpac',],
    }
  },
  created(){
    eventBus.$on('cuttingDc', this.handleCuttingDc);
    //云端文件导入回显
    eventBus.$on('cloudFileHoles',(data)=>{
        if(data.cutting!=null || !cookie.get("upProjectId")){
          this.cuttingDc = (data.cutting.cutting.cuttingDc * 1000).toString();
          this.cuttingNum = data.cutting.cutting.cuttingNum.toString();
          this.cuttingRow = data.cutting.cutting.cuttingRow.toString();

          this.cuttingTable = data.cutting.cuttingArrays
          let i,j=0;
          this.cuttingTable.map((item) => {
            i = 2*item.cuttingNum;
            j = 2*item.cuttingNum+1;
            this.levelTable[i].rowSpac=item.orificeRow;
            this.levelTable[i].holeSpac=item.orificeSpacing;
            this.levelTable[i].angle=item.cuttingDipAngle;

            this.levelTable[j].rowSpac=item.bottomRow;
            this.levelTable[j].holeSpac=item.bottomSpacing;
            this.levelTable[j].angle=item.cuttingDipAngle;
          });
          this.cuttingId = data.cutting.cutting.id;
          this.cuttingTable.map((item) => {
            item.cuttingId = this.cuttingId
          });

          cuttingApi.getCuttingHoles(cookie.get("upProjectId")).then(response => {
            this.childData = response.data;
          })
        }else{
          this.levelTable.map((item) => {
            item.rowSpac=null;
            item.holeSpac=null;
            item.angle=null;
            item.rowSpac=null;
            item.holeSpac=null;
            item.angle=null;
          });
          this.timer = new Date().getTime()
        }
      }
    );
  },
  watch:{
    cuttingNum:{
      handler(newLevel,oldLevel){
        if(newLevel>5){
          alert("掏槽级数最高为5级！");
          this.cuttingNum='3';
        }else{
          this.levelTable=[];
          this.holeTableNum = newLevel;
          // console.log(this.levelTable)
          for(let i=1;i<=newLevel;i++){
            switch(i){
              case 1: {
                this.levelTable.push({levelNum:'一级',angle:'',position:'孔口',rowSpac:'',holeSpac:'',tId:3})
                this.levelTable.push({levelNum:'一级',angle:'',position:'孔底',rowSpac:'',holeSpac:'',tId:2})
              }break;
              case 2: {
                this.levelTable.push({levelNum:'二级',angle:'',position:'孔口',rowSpac:'',holeSpac:'',tId:3})
                this.levelTable.push({levelNum:'二级',angle:'',position:'孔底',rowSpac:'',holeSpac:'',tId:0})
              }break;
              case 3: {
                this.levelTable.push({levelNum:'三级',angle:'',position:'孔口',rowSpac:'',holeSpac:'',tId:0})
                this.levelTable.push({levelNum:'三级',angle:'',position:'孔底',rowSpac:'',holeSpac:'',tId:0})
              }break;
              case 4: {
                this.levelTable.push({levelNum:'四级',angle:'',position:'孔口',rowSpac:'',holeSpac:'',tId:0})
                this.levelTable.push({levelNum:'四级',angle:'',position:'孔底',rowSpac:'',holeSpac:'',tId:0})
              }break;
              case 5: {
                this.levelTable.push({levelNum:'五级',angle:'',position:'孔口',rowSpac:'',holeSpac:'',tId:0})
                this.levelTable.push({levelNum:'五级',angle:'',position:'孔底',rowSpac:'',holeSpac:'',tId:0})
              }break;
            }

          }
        }
      },
      immediate: true
    }
  },
  computed: {
    // 获取所有单元格合并数据
    spanArr() {
      if (!this.tableColumn.length) return []
      const mergeCols = ['levelNum', 'angle'] // 需要合并的列（字段）
      return getMergeCells(this.levelTable, this.tableColumn, mergeCols)
    },
  },
  async mounted() {
    if (cookie.get('upData')) {
      console.log("calculate将要执行了");
      await this.calculate();
      console.log("calculate方法执行了");
    }
  },


  beforeDestroy() {
    eventBus.$off('cloudFileHoles');
    eventBus.$off('cuttingDc', this.handleCuttingDc);
  },
  methods:{
    handleCuttingDc(data) {
      console.log(data.cuttingDc,"09090909");
      this.cuttingDc = data.cuttingDc;

    },

    switchRadio(val){
      this.inputDis = (val === 1);
      console.log(this.inputDis);
    },
    switchRadio2(val){
      console.log('Selected radio type:', val);
      console.log('Type of radio2:', typeof val);
      this.inputDis2 = (val === '1');
      console.log(this.inputDis2);
    },
    switchRadio3(val){
      this.inputDis3 = (val === 1);
    },
    openSubmenu(){
      if (this.subMenu) this.subMenu = false;
      else this.subMenu = true;
    },
    switchRadio4(val) {
      if (val === 1) {
        this.cuttingObj.isAssistHole = 1;
        console.log("isAssistHole: " + this.cuttingObj.isAssistHole);
      } else {
        this.cuttingObj.isAssistHole = 0;
        console.log("isAssistHole: " + this.cuttingObj.isAssistHole);
      }
    },

    tableRowClassName({row,rowIndex}){
      if(rowIndex %2=== 1){
        return 'warning-row';
      }else if (rowIndex %2=== 0){
        return 'success-row';
      }
      return '';
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "height:35px!important; border-color:#5B9BD5!important; color:#000000!important; padding:0px!important; height:40px!important";
    },
    cellStyle1({ row, column, rowIndex, columnIndex }) {
      return "height:520px!important; border-color:#8caddb!important; color:#000000!important; padding:0px!important;background-color: #FFFFFF";
    },

    //计算孔排距
    calculate(){
      // if(cookie.get('upData')){
      //   let upData = JSON.parse(cookie.get('upData'));
      //   upData.cuttingDc = this.cuttingDc;
      //   upData.cuttingRow = this.cuttingRow;
      //   upData.cuttingNum = this.cuttingNum;
      //   upData.cuttingN = this.cuttingN;
      // }
      this.cuttingObj.cuttingDc = this.cuttingDc/1000;
      this.cuttingObj.cuttingNum = this.cuttingNum/1;
      this.cuttingObj.cuttingRow = this.cuttingRow/1;
      this.cuttingObj.cuttingN = this.cuttingN/100;
      if(this.cuttingN>0.7 || this.cuttingN<0.5){
        this.$message({
          type: 'error',
          message: "n的范围必须在0.50~0.70m",
          duration: 6000,
          offset: 140
        })
        return
      }
      this.cuttingObj.orificeSpacing1 = this.levelTable[0].holeSpac;
      this.cuttingObj.orificeSpacing2 = this.levelTable[2].holeSpac;
      this.cuttingObj.projectId = cookie.get("upProjectId");             //save
      //1.计算掏槽孔排距信息     回显表格
      cuttingApi.getCuttingArray(this.cuttingObj).then(response =>{
        this.cuttingTable = response.data.data.cuttingArrays
        //需要添加cuttingId
        this.cuttingMsg = response.data.data.cutting

        var i,j=0;

        this.cuttingTable.map((item) => {
          i = 2*item.cuttingNum;
          j = 2*item.cuttingNum+1;
          console.log("计算掏槽孔排距信息"+JSON.stringify(item))
          this.levelTable[i].rowSpac=item.orificeRow;
          this.levelTable[i].holeSpac=item.orificeSpacing;
          this.levelTable[i].angle=item.cuttingDipAngle;

          this.levelTable[j].rowSpac=item.bottomRow;
          this.levelTable[j].holeSpac=item.bottomSpacing;
          this.levelTable[j].angle=item.cuttingDipAngle;
        });

        //2.保存掏槽孔信息
        // console.log("cuttingMsg2"+JSON.stringify(this.cuttingMsg))
        cuttingApi.saveCutting(this.cuttingMsg).then(response => {
          this.cuttingMsg = response.data.data;
          // console.log("保存/更新掏槽孔信息"+JSON.stringify(response.data.data))
          this.cuttingId = this.cuttingMsg.id;
          this.cuttingTable.map((item) => {
            item.cuttingId = this.cuttingId
          });
          this.holeAndDraw();
          //3.保存掏槽排距表
          cuttingApi.saveCuttingArray(this.cuttingTable).then(response => {
            if(response.data.data == null)
              alert("计算失败请重试！")
            else{
              // console.log("保存掏槽排距表"+JSON.stringify(response.data.data))
            }
          })

        })

      })

      //  this.cuttingObj.projectId = '1695249792384970753';
      this.timer = new Date().getTime()
      if(this.cuttingId===''){
        // alert("cuttingId为空,输入步骤有误!")
      }else {

        getProjectApi.getProject(this.cuttingObj.projectId).then(response => {
          console.log(response.data.data);
          this.cutObj.cuttingId = this.cuttingId;
          this.cutObj.n = this.cuttingN;
          this.cutObj.stepLine1 = response.data.data.stepLine1;
          console.log(this.cutObj);


          cuttingApi.getCutting(this.cutObj).then(response => {
            this.childData = response.data;     //回显
            let next = response.data.data.cuttingHolesList
            cuttingApi.saveCuttingHoles(next).then(response => {
              console.log("保存掏槽孔  "+JSON.stringify(response.data.data))
              alert("保存掏槽孔成功!")
            })

          }).catch(err=>{
            console.log(err)
            this.$message({
              type: 'error',
              message: err.data.msg,
              duration: 6000,
              offset: 140
            });
          })
        })
        //回显表格
        // this.cuttingId = '1689130042114420737'
        // let cBY = cookie.get("centerBottomY")
        // let data = {cuttingId: this.cuttingId,centerBottomY: cBY};       //save
        // let data = {cuttingId: this.cuttingId,centerBottomY: -3};



      }
    },

    //坐标赋值
    holeAndDraw(){
      this.timer = new Date().getTime()
      if(this.cuttingId===''){
        // alert("cuttingId为空,输入步骤有误!")
      }else {

        getProjectApi.getProject(this.cuttingObj.projectId).then(response => {
          console.log(response.data.data);
          this.cutObj.cuttingId = this.cuttingId;
          this.cutObj.n = this.cuttingN;
          this.cutObj.stepLine1 = response.data.data.stepLine1;
          console.log(this.cutObj);


          cuttingApi.getCutting(this.cutObj).then(response => {
            this.childData = response.data;     //回显
            let next = response.data.data.cuttingHolesList
            cuttingApi.saveCuttingHoles(next).then(response => {
              console.log("保存掏槽孔  "+JSON.stringify(response.data.data))
              alert("保存掏槽孔成功!")
            })

          }).catch(err=>{
            console.log(err)
            this.$message({
              type: 'error',
              message: err.data.msg,
              duration: 6000,
              offset: 140
            });
          })
        })
        //回显表格
        // this.cuttingId = '1689130042114420737'
        // let cBY = cookie.get("centerBottomY")
        // let data = {cuttingId: this.cuttingId,centerBottomY: cBY};       //save
        // let data = {cuttingId: this.cuttingId,centerBottomY: -3};



      }
    },

    //获取vertices
    getChildData(val){
      this.vertices = val;
    },

    //获取tube
    getChildTube(val){
      this.tube = val;
    },

    // 表数据合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      return this.spanArr[rowIndex][columnIndex]
    },

    // 鼠标移入cell
    handleCellEnter (row, column, cell, event) {
      const property = column.property
      if (this.editProp.includes(property)) {
        cell.querySelector('.item__input').style.display = 'block'
        cell.querySelector('.item__txt').style.display = 'none'
      }
    },
    // 鼠标移出cell
    handleCellLeave (row, column, cell, event) {
      const property = column.property
      if (this.editProp.includes(property)) {
        cell.querySelector('.item__input').style.display = 'none'
        cell.querySelector('.item__txt').style.display = 'block'
      }
    }
  },

}
</script>

<style scoped>
.title-front{
  margin-top: 50px;
  font-size: 40px !important;
}
.card5{
  height: auto;
  width: 100%;
}


.font-type3{
  margin-top: 50px;
  margin-left: 10%;
  font-size: 25px !important;
  width: 400px;
  line-height:30px;
}

.canvas{
  height: 600px;
}
/* 表格ui */
.item .item__input {
  display: none;
  width: 90px;
}
/* 调整elementUI中样式 如果不需要调整请忽略 */
.item .item__input .el-input__inner {
  height: 28px !important;
}
/* 调整elementUI中样式 如果不需要调整请忽略 */
.item .item__input .el-input__suffix i {
  font-size: 12px !important;
  line-height: 26px !important;
}
.item .item__txt {
  box-sizing: border-box;
  line-height: 24px;
  padding: 0 9px;
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
.change_main{
  display: flex;
  justify-content: center;
}
.change_main div{
  cursor: pointer;
  padding: 15px;
}
.is-Active{
  color: #409EFF;
}
.el-table__body-wrapper {
  border-collapse: separate;
  border-spacing: 0;
}

.el-table__body-wrapper tr {
  border-bottom: 1px solid #8caddb; /* 添加水平分隔线 */
}

.el-table__body-wrapper td {
  border-right: 1px solid #8caddb; /* 添加垂直分隔线 */
}
>>>.el-table .warning-row{
  background: #01366a;
}
>>>.el-table .success-row{
  background: #00122c;
}
/* 覆盖表格行鼠标滑过的背景色 */
>>>.el-table .el-table__body tr:hover > td {
  background-color: inherit; /* 继承父元素背景色或者指定为初始背景色 */
}
.el-table--border::after, .el-table--group::after, .el-table::before{
  background-color: rgba(35,73,109,1);
}
</style>
