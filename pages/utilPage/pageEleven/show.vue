<template>
  <!-- 此文件为threejs文件用以数据可视化 -->
    <div>
      <div id="show_11"></div>
    </div>
  </template>
  <script>
  import * as THREE from "three"
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
  import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
  import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
  export default {
    name: "show",
    data() {
      return {
        camera: null,//用于表示 Three.js 场景中的相机，它控制观察视角和渲染场景。
        scene: null,//用于表示 Three.js 场景中的相机，它控制观察视角和渲染场景。
        renderer: null,//表示 Three.js 渲染器，用于将场景渲染到 HTML 元素中。
        controls: null,//用于存储 Three.js 的 OrbitControls 控制器，它可以用于交互式地控制相机视角。
        arcLine: null,//用于存储创建的弧线对象，这个属性在创建弧线图形时会被赋值
        straightLine: null,// 用于存储创建的直线对象，这个属性在创建直线图形时会被赋值。
        ambientLight: null,//用于存储环境光，一种用于模拟场景中的间接光照的光源。
        pointLight: null,//用于存储点光源，一种用于模拟局部光照的光源。
  
        outLineData:{},
        getFatherData:null,       //接收轮廓线
        getVertices:null,         //接收掏槽孔数据点
        getVertices2:null,        //接收周边孔数据点
        getTube:null,
      };
    },
    props: {
        itemData: {
          type: Object,
          default () {
            return {}
          }
        },
        vertices:{type: Array,
          default () {
            return []
          }},
        vertices2:{type: Array,
          default () {
            return []
          }},
        tube:{type: Array,
          default () {
            return []
          }},
    },
  
    methods: {
      init() {
      // 创建场景和相机
      //与show.js不同
      let container = document.getElementById("show_11");
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x051534);
      this.camera = new THREE.PerspectiveCamera(70,
          container.clientWidth / container.clientHeight,
          0.01,
          2000);
        this.camera.position.set(10, 10, 8);//相机初始位置
      // 创建渲染器
          this.renderer = new THREE.WebGLRenderer();
          this.renderer.setSize(container.clientWidth, container.clientHeight);
          //与show.js不同
          container.appendChild(this.renderer.domElement);
  
      //控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.addEventListener('change', this.render);
      },
  
      ArcLine(x, y, rx, StartAngle, endAngle) {
          var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
          // // 创建弧线几何体
          //参数：前两个参数圆弧坐标原点x,y  第三个为：圆弧半径    0, 2 * Math.PI：圆弧起始角度
  
          // var StartAngle1 = (StartAngle / Math.PI * 180) / 180 * Math.PI
          // var endAngle1 = (endAngle / Math.PI * 180) / 180 * Math.PI
  
          var StartAngle1 = (((StartAngle / Math.PI) * 180) / 180) * Math.PI
          var endAngle1 = (((endAngle / Math.PI) * 180) / 180) * Math.PI
  
          var arc = new THREE.ArcCurve(x, y, rx, StartAngle1, endAngle1);
          //getPoints是基类Curve的方法,返回一个vector2对象作为元素组成的数组
          var points = arc.getPoints(50); //分段数50,返回51个顶点
          // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
          geometry.setFromPoints(points);
  
          // 创建线段材质
          var material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  
          // 创建线段对象
          this.arcLine = new THREE.Line(geometry, material);
  
          // 将线段添加到场景中
          this.scene.add(this.arcLine);
      },
      StraigrtLine(x, y, z, i, j, k) { //x,y,z为第一个点的坐标，i，j,k为第二个点的坐标
          const geometry = new THREE.BufferGeometry();
          const start = new THREE.Vector3(x, y, z);
          const end = new THREE.Vector3(i, j, k);
          const lineCurve = new THREE.LineCurve3(start, end);
          const points2 = lineCurve.getPoints(100);
          geometry.setFromPoints(points2);
          const material = new THREE.LineBasicMaterial({
              color: 0x8888,
              linewidth: 1,
          });
          const straightLine = new THREE.Line(geometry, material);
          this.scene.add(straightLine);
      },
  
  //掏槽孔
      showTube1(x, y, z, i, j, k) {
          // 三维样条曲线
          const path = new THREE.CatmullRomCurve3([
              new THREE.Vector3(x, y, 0),
              new THREE.Vector3(i, j, k),
          ]);
          // 样条曲线path作为TubeGeometry参数生成管道
          const geometry = new THREE.TubeGeometry(path, 64, 0.1, 8);
  
          const material = new THREE.MeshBasicMaterial({
              side: THREE.DoubleSide, //双面显示看到管道内壁
              color: 0x6bc235,
              wireframeLinecap: 'square',
              aoMapIntensity: 0,
              transparent: true,
              opacity: 0.8
          });
          const mesh = new THREE.Mesh(geometry, material);
          this.scene.add(mesh);
      },
      //周边孔
      showTube2(x, y, z, i, j, k) {
          // 三维样条曲线
          const path = new THREE.CatmullRomCurve3([
              new THREE.Vector3(x, y, 0),
              new THREE.Vector3(i, j, k),
          ]);
          // 样条曲线path作为TubeGeometry参数生成管道
          const geometry = new THREE.TubeGeometry(path, 64, 0.1, 8);
  
          const material = new THREE.MeshBasicMaterial({
              side: THREE.DoubleSide, //双面显示看到管道内壁
              color: 0x005aab,
              wireframeLinecap: 'square',
              aoMapIntensity: 0,
              transparent: true,
              opacity: 0.5
          });
          const mesh = new THREE.Mesh(geometry, material);
          this.scene.add(mesh);
      },
      //辅助孔
      showTube3(x, y, z, i, j, k) {
          // 三维样条曲线
          const path = new THREE.CatmullRomCurve3([
              new THREE.Vector3(x, y, 0),
              new THREE.Vector3(i, j, k),
          ]);
          // 样条曲线path作为TubeGeometry参数生成管道
          const geometry = new THREE.TubeGeometry(path, 64, 0.1, 8);
  
          const material = new THREE.MeshBasicMaterial({
              side: THREE.DoubleSide, //双面显示看到管道内壁
              color: 0xffde00,
              wireframeLinecap: 'square',
              aoMapIntensity: 0,
              transparent: true,
              opacity: 0.5
          });
          const mesh = new THREE.Mesh(geometry, material);
          this.scene.add(mesh);
      },
      initPoint(vertices) {
          let canvas = document.createElement("canvas");
          canvas.width = 100;
          canvas.height = 100;
  
          let context = canvas.getContext("2d");
          context.fillStyle = "#ffffff";
  
          //canvas 创建圆
          context.arc(50, 50, 20, 0, 2 * Math.PI);
          context.fill();
  
          // 创建材质
          let texture = new THREE.Texture(canvas);
          texture.needsUpdate = true;
  
          //创建点,是用PointsMaterial的map属性来设置材质
          let geometry = new THREE.BufferGeometry();
          // 点位置
          // geometry.setAttribute(
          //     'position',
          //     new THREE.Float32BufferAttribute(vertices, 3)
          // );
  
  
          let material = new THREE.PointsMaterial({
              color: 0xffffff,
              size: 0.4,
              map: texture
          });
  
          let points = new THREE.Points(geometry, material);
  
  
          return points;
      },
      render () {
        let container = document.getElementById("show_11");
        const composer = new EffectComposer(this.renderer);
        this.renderer.render(this.scene, this.camera);
        // this.renderer.setClearColor(0x0b0a0a, 0.5);
        //获取.setPixelRatio()设置的设备像素比
        const pixelRatio = this.renderer.getPixelRatio();
        // width、height是canva画布的宽高度
        const smaaPass = new SMAAPass(container.clientWidth * pixelRatio, container.clientHeight * pixelRatio);
        composer.addPass(smaaPass);
      },
      //实现画图测试
      buildLine(){
        // console.log()
        // if(this.outLineData){
        //   this.outLineData.forEach((item,index) => {
        //    console(item.x2)
        //   });
        // }
      },
      createLight() {
        //环境光
        let hesLight = new THREE.HemisphereLight(); //初始化一个光源
        hesLight.intensity = 1; //设置光的强度
        this.scene.add(hesLight);
  
        //平行光
        let dirLight = new THREE.DirectionalLight();
        dirLight.position.set(5, 5, -5);
        this.scene.add(dirLight);
      }
    },
    watch: {
        itemData:{
          handler(newV) {
            this.getFatherData = newV;//将监听到修改的值赋予到getFatherData中
              console.log("getFatherData"+JSON.stringify(this.getFatherData));
              // console.log("this.getFatherData   "+typeof(this.getFatherData))
              // if(this.getFatherData !== undefined && Object.keys(this.getFatherData).length !== 0){
                this.getFatherData.data.map((item) => {
                  if(item.r == 0){
                    this.StraigrtLine(item.x1,item.y1,0,item.x2,item.y2,0)
                  }else{
                    this.ArcLine(item.arcCenterX,item.arcCenterY,item.r,item.endAngle,item.startAngle)
                  }
                });
  
          },
          deep: true,
          // immediate:true
        },
        vertices:{
          handler(newV) {
            this.getVertices = newV;
            console.log("this.getVertices   "+JSON.stringify(this.getVertices));
            var points = this.initPoint(this.getVertices);
            this.scene.add(points);
          },
          deep: true,
        },
        vertices2:{
          handler(newV) {
            this.getVertices2 = newV;
            console.log("this.getVertices2    "+JSON.stringify(this.getVertices2))
            var points2 = this.initPoint(this.getVertices2);
            this.scene.add(points2);
          },
          deep: true,
        },
        tube:{
          handler(newV) {
            this.getTube = newV;
            this.getTube.map((item) => {
            if(item.tubeNum == 1)
              this.showTube1(item.x1,item.y1,0,item.x2,item.y2,item.z2)
            else if(item.tubeNum == 2)
              this.showTube2(item.x1,item.y1,0,item.x2,item.y2,item.z2)
            else if(item.tubeNum == 3)
              this.showTube3(item.x1,item.y1,0,item.x2,item.y2,item.z2)
            });
            this .render();
          },
          deep: true,
        },
      },
  
    mounted() {
      this.getFatherData= this.itemData;
      this.init();
      this.createLight();
      this.render();
    },
  };
  </script>
  <style>
  #show_11{
    width: 1160px;
    height:10rem;
    background-color: #051534;
    margin-left: -10px;
    /*margin-top: -5px;*/
  }
  </style>
  