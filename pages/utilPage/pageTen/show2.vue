<template>
  <div>
    <canvas id="two_dimension2" style="width: 580px;
                  height:10rem;
                  background-color: #051534;
                  margin-left: -10px;
                  margin-top: -5px;"></canvas>
  </div>
</template>

<script>
export default {
    name: 'show2',
    data() {
    return {
      getVertices:null,         //接收孔数据点
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
      scale:1,
      preScale:1,
    };
  },
    props: {
      vertices:{type: Array,
        default () {
          return []
        }},
        vertices2:{type: Array,
        default () {
          return []
        }},
    },
    watch: {
        vertices:{
        handler(newV) {
          this.getVertices = newV;
          //获取了孔口坐标xyz数组
          // console.log("show2 get =============this.getVertices   "+JSON.stringify(this.getVertices));
        if (this.canvas.getContext) {
          this.draw();
        }
        },
        deep: true,
      },
      vertices2:{
        handler(newV) {
          this.getVertices2 = newV;
          //获取了孔口坐标xyz数组
          // console.log("show2 get =============this.getVertices   "+JSON.stringify(this.getVertices));
        if (this.canvas.getContext) {
          this.draw2();
        }
        },
        deep: true,
      },
    },
    mounted(){
      this.canvas = document.getElementById("two_dimension2");
      this.canvas.addEventListener('mousewheel', this.onMousewheel);
      this.ctx = this.canvas.getContext("2d");
      this.clear()
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
        this.ctx.scale(this.scale, this.scale);
        this.draw();
        this.draw2();
      },
      clear() {
        this.canvas.width = 580;
        let width = this.canvas.height=520;
        let height = this.canvas.width=580;
        this.ctx.translate(width/2, height/2);
        this.ctx.lineWidth = 0.5;
        this.ctx.scale(4, -4);
      },
      draw() {
        let r=0.8,mul=10;
        this.ctx.strokeStyle ="rgba(0,255,0,0.5)";
        for(let i=0,j=1;i<this.vertices.length && j<this.vertices.length;){
          this.ctx.moveTo(this.vertices[i]*mul+r, this.vertices[j]*mul);
          this.ctx.arc(this.vertices[i]*mul, this.vertices[j]*mul, r, 0, Math.PI * 2, true);
          i+=3;
          j+=3;
        }
        this.ctx.stroke();
      },
      draw2() {
        let r=0.8,mul=10;
        for(let i=0,j=1;i<this.vertices2.length && j<this.vertices2.length;){
          this.ctx.moveTo(this.vertices2[i]*mul+r, this.vertices2[j]*mul);
          this.ctx.arc(this.vertices2[i]*mul, this.vertices2[j]*mul, r, 0, Math.PI * 2, true);
          i+=3;
          j+=3;
        }
        this.ctx.stroke();
      },
    },
}
</script>

<style>

</style>
