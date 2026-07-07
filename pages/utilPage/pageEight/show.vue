<template>
  <!-- 此文件为threejs文件用以数据可视化 -->
  <div>
    <div id="container_eight" style="display: flex; justify-content: center; padding-left: 0"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "show",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      axesHelper: null,
      arcLine: null,
      straightLine: null,
      outLineData: {},
      getFatherData: null,
      getVertices: null,
      getVertices2: null,
      getTube: null,
      shape: null,
      extrudeMesh: null,
      extrudeSettings: {
        steps: 2,
        depth: -5,
        bevelEnabled: false,
        bevelThickness: 0,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 1,
        openEnded: true,
        curveSegments: 12
      }
    };
  },

  props: {
    itemData: {
      type: Object,
      default: () => ({}),
    },
    vertices: {
      type: Array,
      default: () => [],
    },
    vertices2: {
      type: Array,
      default: () => [],
    },
    tube: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    init() {
      const container = document.getElementById("container_eight");
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x011635);

      this.camera = new THREE.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        2000
      );
      // 修改相机位置和视角
      this.camera.position.set(10 ,6 ,10);  // 调整相机位置到右上方
      this.camera.lookAt(0, 0, 0);  // 让相机看向原点

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      this.axesHelper = new THREE.AxesHelper(10);
      // this.scene.add(this.axesHelper);

      // 添加光源
      const ambientLight = new THREE.AmbientLight(0x808080, 0.6);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(10, -10, 15);
      directionalLight.castShadow = true;
      this.scene.add(directionalLight);

      const pointLight = new THREE.PointLight(0xffffff, 0.6);
      pointLight.position.set(10, 10, 10);
      this.scene.add(pointLight);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(0, 0, 0);  // 设置控制器的目标点
      this.controls.addEventListener("change", this.render);
    },

    ArcLine(x, y, rx, startAngle, endAngle, isBottom) {
      const geometry = new THREE.BufferGeometry();
      const arc = new THREE.ArcCurve(
        x,
        y,
        rx,
        (startAngle / Math.PI) * 180 * (Math.PI / 180),
        (endAngle / Math.PI) * 180 * (Math.PI / 180)
      );
      const points = arc.getPoints(50);
      geometry.setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: isBottom === 1 ? 0xff0000 : 0xffffff,
      });

      this.arcLine = new THREE.Line(geometry, material);
      this.scene.add(this.arcLine);
    },

    StraightLine(x, y, z, i, j, k, isBottom) {
      const geometry = new THREE.BufferGeometry();
      const start = new THREE.Vector3(x, y, z);
      const end = new THREE.Vector3(i, j, k);
      const lineCurve = new THREE.LineCurve3(start, end);
      const points = lineCurve.getPoints(100);
      geometry.setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: isBottom === 1 ? 0xff0000 : 0xffffff,
        linewidth: 1,
      });

      const straightLine = new THREE.Line(geometry, material);
      this.scene.add(straightLine);
    },

    showTube(x, y, z, i, j, k) {
      const path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(x, y, 0),
        new THREE.Vector3(i, j, k),
      ]);
      const geometry = new THREE.TubeGeometry(path, 200, 0.1, 100);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);
    },

    initPoint(vertices) {
      const canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;
      const context = canvas.getContext("2d");
      context.fillStyle = "#ffffff";
      context.arc(50, 50, 20, 0, 2 * Math.PI);
      context.fill();

      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.4,
        map: texture,
      });

      return new THREE.Points(geometry, material);
    },

    render() {
      this.renderer.render(this.scene, this.camera);
    },
    parseNum(str) {
      return parseFloat(str);
    },

    getMidpoint(x1, y1, x2, y2) {
      return {
        x: (x1 + x2) / 2,
        y: (y1 + y2) / 2
      };
    },

    // 计算弧线参数的方法
    // 输入参数：
    // x1, y1: 起点坐标
    // x2, y2: 终点坐标
    // radius: 弧线半径
    calculateArcParams(x1, y1, x2, y2, radius) {
      // 计算两点之间的差值
      const dx = x2 - x1;
      const dy = y2 - y1;
      // 计算两点之间的直线距离
      const distance = Math.sqrt(dx * dx + dy * dy);
      // 计算两点连线的角度
      const angle = Math.atan2(dy, dx);
      // 计算圆心到两点连线的垂直距离
      const centerDistance = Math.sqrt(radius * radius - (distance / 2) * (distance / 2));
      // 计算圆心坐标
      const centerX = x1 + dx / 2 + centerDistance * Math.sin(angle);
      const centerY = y1 + dy / 2 - centerDistance * Math.cos(angle);
      // 计算起点和终点相对于圆心的角度
      const startAngle = Math.atan2(y1 - centerY, x1 - centerX);
      const endAngle = Math.atan2(y2 - centerY, x2 - centerX);

      return { centerX, centerY, startAngle, endAngle };
    },

    // 绘制形状的主要方法
    // pathData: 包含形状轮廓数据的数组，每个元素包含起点(x1,y1)、终点(x2,y2)和半径(r)
    drawShape(pathData) {
      // 创建一个新的THREE.Shape对象，用于定义2D形状
      this.shape = new THREE.Shape();

      // 获取第一个点作为起始点
      const firstPoint = pathData[0];
      // 移动到起始点位置
      this.shape.moveTo(this.parseNum(firstPoint.x1), this.parseNum(firstPoint.y1));

      // 遍历每个路径段，绘制形状轮廓
      pathData.forEach((segment) => {
        const x1 = this.parseNum(segment.x1);
        const y1 = this.parseNum(segment.y1);
        const x2 = this.parseNum(segment.x2);
        const y2 = this.parseNum(segment.y2);
        const radius = this.parseNum(segment.r);

        // 如果半径为0，则画直线
        if (radius === 0) {
          this.shape.lineTo(x2, y2);
        } else {
          // 如果有半径，则画弧线
          const arcParams = this.calculateArcParams(x1, y1, x2, y2, radius);
          const clockwise = x2 > x1; // 根据终点x坐标判断弧线方向
          // 使用absarc方法绘制弧线
          this.shape.absarc(
            arcParams.centerX,
            arcParams.centerY,
            radius,
            arcParams.startAngle,
            arcParams.endAngle,
            clockwise
          );
        }
      });

      // 如果已存在挤出网格，则从场景中移除
      if (this.extrudeMesh) {
        this.scene.remove(this.extrudeMesh);
      }

      // 创建挤出几何体，将2D形状转换为3D模型
      const extrudeGeometry = new THREE.ExtrudeGeometry(this.shape, this.extrudeSettings);
      // 计算法线，用于光照效果
      extrudeGeometry.computeVertexNormals();

      // 创建材质，设置物体的外观
      const extrudeMaterial = new THREE.MeshPhongMaterial({
        color: 0x4169E1,         // 皇家蓝色
        shininess: 50,           // 光泽度
        specular: 0x666666,      // 高光颜色
        reflectivity: 0.7,       // 反射率
        side: THREE.DoubleSide,  // 双面渲染
        transparent: true,       // 启用透明
        opacity: 0.9,            // 不透明度
        emissive: 0x000044,      // 自发光颜色
        flatShading: true,       // 平面着色
        wireframe: false,        // 线框模式
        depthWrite: true,        // 深度写入
        depthTest: true          // 深度测试
      });

      // 创建线框材质
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        wireframe: true,
        transparent: true,
        opacity: 0.1
      });

      // 创建网格对象并添加到场景
      this.extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
      this.scene.add(this.extrudeMesh);
    },
  },

  watch: {
    itemData: {
      handler(newV) {
        this.getFatherData = newV;
        if (this.getFatherData?.data) {
          this.drawShape(this.getFatherData.data);
        }
        this.render();
      },
      deep: true,
    },

    vertices: {
      handler(newV) {
        this.getVertices = newV;
        const points = this.initPoint(this.getVertices);
        this.scene.add(points);
      },
      deep: true,
    },

    vertices2: {
      handler(newV) {
        this.getVertices2 = newV;
        const points2 = this.initPoint(this.getVertices2);
        this.scene.add(points2);
      },
      deep: true,
    },

    tube: {
      handler(newV) {
        this.getTube = newV;
        this.getTube.forEach((item) => {
          this.showTube(item.x1, item.y1, 0, item.x2, item.y2, item.z2);
        });
      },
      deep: true,
    },
  },

  mounted() {
    this.init();
    this.render();
  },
};
</script>

<style>
#container_eight {
  height: 520px;
  width: 1160px;
}
</style>
