<template>
  <div>
    <canvas id="two" style="width: 1060px;height:520px;background-color: #01366a;"></canvas>
  </div>
</template>

<script>
import outPutApi from '@/api/outPut.js'
import cookie from "js-cookie";
export default {
  layout:'sign',
  name: 'firing_sequence',
  data() {
    return {
      ctx:null,   //画笔
      canvas:null,   //画布
      mousePosition:{x:0,y:0},
      offset:{x:0,y:0},
      curOffset:{x:0,y:0},
      x :0, // 记录鼠标点击Canvas时的横坐标
      y : 0, // 记录鼠标点击Canvas时的纵坐标
      maxScale: 8,
      minScale:0.4,
      scaleStep:0.2,
      scale:3,
      preScale:3,
      vertices:null,
      sequence:[],
    };
  },
  props: {
    getVertices:{type: Array,
      default () {
        return []
      }},
    getSequence:{type: Array,
      default () {
        return []
      }},
  },
  watch: {
    getVertices:{
      handler(newV) {
        this.vertices = newV;
        //获取了孔口坐标xyz数组
        // console.log("show2 get =============this.getVertices   "+JSON.stringify(this.getVertices));
        this.canvas = document.getElementById("two")
        this.canvas.addEventListener('mousewheel', this.onMousewheel);
        if (this.canvas.getContext) {
          this.ctx = this.canvas.getContext("2d");
          this.clear();
          this.draw();
        }
      },
      deep: true,
    },
    getSequence:{
      handler(newV) {
        this.sequence = newV;
        this.clear();
        this.draw();
      },
      deep: true,
    },
  },
  methods: {
    onMousewheel(e) {
      e.preventDefault();

      this.mousePosition.x = e.offsetX; // 记录当前鼠标点击的横坐标
      this.mousePosition.y = e.offsetY; // 记录当前鼠标点击的纵坐标
      if (e.wheelDelta > 0) {
        // 放大
        this.scale = parseFloat((this.scaleStep + this.scale).toFixed(2)); // 解决小数点运算丢失精度的问题
        if (this.scale > this.maxScale) {
          this.scale = this.maxScale;
          return;
        }
      } else {
        // 缩小
        this.scale = parseFloat((this.scale - this.scaleStep).toFixed(2)); // 解决小数点运算丢失精度的问题
        if (this.scale < this.minScale) {
          this.scale = this.minScale;
          return;
        }
      }

      this.offset.x = this.mousePosition.x - ((this.mousePosition.x -   this.offset.x) * this.scale) / this.preScale;
      this.offset.y = this.mousePosition.y - ((this.mousePosition.y - this.offset.y) * this.scale) / this.preScale;

      this.paint();
      this.preScale = this.scale;
      this.curOffset.x = this.offset.x;
      this.curOffset.y = this.offset.y;
    },
    paint() {
      this.clear();   //先清除画布
      // this.ctx.translate(this.offset.x, this.offset.y);
      // this.ctx.scale(this.scale, this.scale);
      this.draw();
    },
    clear() {
      let width = this.canvas.height=700;
      let height = this.canvas.width=1200;
      this.ctx.translate(width/1.15, height/3.2);
      this.ctx.lineWidth = 0.5;
      this.ctx.scale(this.scale, this.scale);
    },
    draw() {
      let r=3.5,mul=20;
      this.ctx.strokeStyle = "rgba(0,255,0,0.5)";
      this.ctx.font = "bold 4px HarmonyOS Sans SC"; //字体大小 首选字体 备选字体
      this.ctx.fillStyle = "white";
      for(let i=0,j=1;i<this.vertices.length && j<this.vertices.length;){
        this.ctx.moveTo(this.vertices[i]*mul+r, -this.vertices[j]*mul);
        this.ctx.arc(this.vertices[i]*mul, -this.vertices[j]*mul, r, 0, Math.PI * 2, true);
        if (this.sequence[i]<10)
          this.ctx.fillText(this.sequence[i], this.vertices[i]*mul-1, -this.vertices[j]*mul+1)//文字内容 x坐标 y坐标
        else
          this.ctx.fillText(this.sequence[i], this.vertices[i]*mul-2, -this.vertices[j]*mul+1)//文字内容 x坐标 y坐标
        i+=3;
        j+=3;
      }
      this.ctx.stroke();
    },
  },
}
</script>

<style>
#two{
  height:520px;
  width:1000px;
}
</style>
