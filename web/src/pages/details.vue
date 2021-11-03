<template>
    <div class="page">
        <header class="header">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <!-- @select="handleSelect" -->
                <el-submenu index="1">
                    <template slot="title">文件</template>
                    <el-menu-item index="1-1" @click="addImg">上传图片</el-menu-item>
                    <el-menu-item index="1-2" @click="save">保存文件</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">置入</template>
                    <el-menu-item index="2-1" @click="addRect">矩形</el-menu-item>
                    <el-menu-item index="2-2" @click="addCircle">圆形</el-menu-item>
                    <el-menu-item index="2-3" @click="addTri">三⻆形</el-menu-item>
                    <el-menu-item index="2-4" @click="addStar">五角星</el-menu-item>
                    <el-menu-item index="2-5" @click="addText">文字</el-menu-item>
                </el-submenu>
                <el-menu-item index="3"><a href="#">帮助</a></el-menu-item>
            </el-menu>
        </header>
        <div class="content">
            <div class="left-nav" @keypress.delete="data_del">
                <!-- v-for="item in listItem"
                :key="item.id"
                :config="{
                x: item.x,
                y: item.y,
                name:item.name,
                }" -->
                <ul v-for="(item, index) in leftList" :key="index">
                    <li>{{item.name}}</li>
                </ul>
            </div>
            <!-- @dragstart="handleDragstart"
            @dragend="handleDragend"
            @dblclick="handDblclick" -->
            <v-stage ref="stage" :config="configKonva">
                <v-layer ref="layer">
                    <v-rect v-for="(item,index) in listRect" :key="item.id" :config="{
                    x: item.x,
                    y: item.y,
                    name:'正方形',
                    width: item.w,
                    height: item.h,
                    id: item.id,
                    fill: '#89b700',
                    opacity: 0.8,
                    stroke: '#000000',
                    draggable: true,
                    scaleX: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                    scaleY: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                    shadowColor: 'black',
                    shadowBlur: 10,
                    shadowOffsetX: dragItemId === item.id ? 15 : 5,
                    shadowOffsetY: dragItemId === item.id ? 15 : 5,
                    shadowOpacity: 0.6
                }" @click="startClick(item,index)" @mousemove="handleMouseMove">
                        <v-transformer ref="transformer" />
                    </v-rect>
                    <v-star v-for="(item,index) in listStar" :key="item.id" :config="{
                    x: item.x,
                    y: item.y,
                    rotation: item.rotation,
                    id: item.id,
                    numPoints: 5,
                    innerRadius: 30,
                    outerRadius: 50, 
                    fill: '#89b717',
                    stroke: '#000000',
                    opacity: 0.8,
                    draggable: true,
                    scaleX: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                    scaleY: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                    shadowColor: 'black',
                    shadowBlur: 10,
                    shadowOffsetX: dragItemId === item.id ? 15 : 5,
                    shadowOffsetY: dragItemId === item.id ? 15 : 5,
                    shadowOpacity: 0.6,
                }" @click="startClick(item,index)" @mousemove="handleMouseMove"></v-star>
                    <v-transformer ref="transformer" />
                    <v-circle v-for="(item,index) in listCircle" :key="item.id" :config="{
                    x: item.x,
                    y: item.y,
                    rotation: item.rotation,
                    id: item.id,
                    Radius: item.radius,
                    fill: '#89b717',
                    stroke: '#000000',
                    opacity: 0.8,
                    draggable: true,
                    scaleX: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                    scaleY: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                    shadowColor: 'black',
                    shadowBlur: 10,
                    shadowOffsetX: dragItemId === item.id ? 15 : 5,
                    shadowOffsetY: dragItemId === item.id ? 15 : 5,
                    shadowOpacity: 0.6
                }" @click="startClick(item,index)" @mousemove="handleMouseMove">
                    </v-circle>
                    <v-regular-polygon v-for="(item,index) in listTri" :key="item.id" :config="{
                    x: item.x,
                    y: item.y,
                    rotation: item.rotation,
                    id: item.id,
                    sides:item.sides,
                    Radius: 60,
                    fill: '#89b717',
                    stroke: '#000000',
                    opacity: 0.8,
                    draggable: true,
                    scaleX: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                    scaleY: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                    shadowColor: 'black',
                    shadowBlur: 10,
                    shadowOffsetX: dragItemId === item.id ? 15 : 5,
                    shadowOffsetY: dragItemId === item.id ? 15 : 5,
                    shadowOpacity: 0.6
                }" @click="startClick(item,index)" @mousemove="handleMouseMove">
                    </v-regular-polygon>
                    <v-text v-for="(item,index) in listText" :key="item.id" :config="{
                    x: item.x,
                    y: item.y,
                    rotation: item.rotation,
                    id: item.id,
                    fontSize: item.fontSize,
                    opacity: 0.8,
                    draggable: true,
                    stroke: '#000000',
                    scaleX: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                    scaleY: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                    shadowColor: 'black',
                    shadowBlur: 10,
                    shadowOffsetX: dragItemId === item.id ? 15 : 5,
                    shadowOffsetY: dragItemId === item.id ? 15 : 5,
                    shadowOpacity: 0.6,
                    text:item.text,
                }" @click="startClick(item,index)" @mousemove="handleMouseMove">
                    </v-text>
                </v-layer>
            </v-stage>
            <div class="property-panel">
                <div class="basic_info">
                    <div>基本</div>
                    <el-input type="text" v-model="basic_x" suffix="x" @change="changex"></el-input>
                    <el-input type="text" v-model="basic_y" suffix="y" @change="changey"></el-input>
                    <el-input type="text" v-model="basic_w" suffix="w" @change="changew"></el-input>
                    <el-input type="text" v-model="basic_h" suffix="h" @change="changeh"></el-input>
                </div>
                <div class="back_color">
                    <div>背景颜色</div>
                    <el-color-picker v-model="back_color" @change="changeBackColor"></el-color-picker>
                    <el-input type="text" v-model="back_color" suffix="h"></el-input>
                </div>
                <div class="border_color">
                    <div>边框颜色</div>
                    <el-color-picker v-model="bor_color" @change="changeBorCorlor"></el-color-picker>
                    <el-input type="text" v-model="bor_color" suffix="h"></el-input>
                </div>
                <div class="shadow">
                    <div>阴影</div>
                    <el-color-picker v-model="shadow_color" @change="changeShadowColor"></el-color-picker>
                    <el-input type="text" v-model="shadow_color" suffix="h"></el-input>
                    <el-input type="text" v-model="shadow_x" suffix="x" @change="changeShadowX"></el-input>
                    <el-input type="text" v-model="shadow_y" suffix="y" @change="changeShadowY"></el-input>
                    <el-input type="text" v-model="shadow_vague" suffix="模糊" @change="changeShadowVague"></el-input>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
    const width = window.innerWidth;
    const height = window.innerHeight;
    export default {
        data() {
            return {
                activeIndex: "0",
                listRect: [],
                listStar: [],
                listCircle: [],
                listTri: [],
                listText: [],
                leftList: [],
                dragItemId: null,
                configKonva: {
                    width: 850,
                    height: 900,
                },
                basic_x: 0,
                basic_y: 0,
                basic_w: 0,
                basic_h: 0,
                back_color: "#000000",
                bor_color: "#000000",
                shadow_color: "#000000",
                shadow_x: 0,
                shadow_y: 0,
                shadow_vague: 0,
                id: 0,
                msg: "请输入文本",
                selectedShapeId: '',
                selectedShape: " ",
                index: "0",
            };
        },
        methods: {
            // handleDragstart(e) {
            //   // save drag element:
            //   this.dragItemId = e.target.id();
            //   // move current element to the top:
            //   const item = this.list.find(i => i.id === this.dragItemId);
            //   const index = this.list.indexOf(item);
            //   this.list.splice(index, 1);
            //   this.list.push(item);
            // },
            handleDragend(e) {
                this.dragItemId = null;
            },
            handDblclick(msg) {
                this.text = msg;
            },
            // handleSelect(){
            // },
            //添加图片
            addImg() {},
            //保存  
            save() {},
            addRect() {
                let config = ({
                    id: "2",
                    x: 50,
                    y: 50,
                    w: 200,
                    h: 200,
                    rotation: 180,
                    scale: 1,
                    name: "正方形",
                    fill: '#89b700',
                    border: '#000000',
                    opacity: 0.8,
                    scaleX: 1,
                    scaleY: 1,
                    shadowColor: 'black',
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowOpacity: 0.6
                });
                this.listRect.push(config)
                this.leftList.push(config)
                this.basic_x = config.x;
                this.basic_y = config.y;
                this.basic_w = config.w;
                this.basic_h = config.h;
                this.back_color = config.fill;
                this.bor_color = config.stroke;
                this.shadow_color = config.shadowColor;
                this.shadow_x = config.shadowOffsetX;
                this.shadow_y = config.shadowOffsetY;
                this.shadow_vague = config.opacity;
            },
            addCircle() {
                let config = ({
                    id: "3",
                    x: 200,
                    y: 100,
                    radius: 50,
                    rotation: 180,
                    scale: 1,
                    name: "圆形",
                    fill: '#89b700',
                    border: '#000000',
                    opacity: 0.8,
                    scaleX: 1,
                    scaleY: 1,
                    shadowColor: 'black',
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowOpacity: 0.6
                });
                this.listCircle.push(config)
                this.leftList.push(config)
                this.basic_x = config.x;
                this.basic_y = config.y;
                this.basic_w = config.radius;
                this.basic_h = config.radius;
                this.back_color = config.fill;
                this.bor_color = config.stroke;
                this.shadow_color = config.shadowColor;
                this.shadow_x = config.shadowOffsetX;
                this.shadow_y = config.shadowOffsetY;
                this.shadow_vague = config.opacity;
            },
            addTri() {
                let config = ({
                    id: "4",
                    sides: 3,
                    x: 200,
                    y: 100,
                    radius: 60,
                    rotation: 180,
                    scale: 1,
                    name: "三角形",
                    fill: '#89b700',
                    border: '#000000',
                    opacity: 0.8,
                    scaleX: 1,
                    scaleY: 1,
                    shadowColor: 'black',
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowOpacity: 0.6
                });
                this.listTri.push(config)
                this.leftList.push(config)
                this.basic_x = config.x;
                this.basic_y = config.y;
                this.basic_w = config.radius;
                this.basic_h = config.radius;
                this.back_color = config.fill;
                this.bor_color = config.stroke;
                this.shadow_color = config.shadowColor;
                this.shadow_x = config.shadowOffsetX;
                this.shadow_y = config.shadowOffsetY;
                this.shadow_vague = config.opacity;
            },
            addStar() {
                let config = ({
                    id: "5",
                    x: 100,
                    y: 100,
                    rotation: 180,
                    scale: 1,
                    name: "五角星",
                    fill: '#89b700',
                    border: '#000000',
                    opacity: 0.8,
                    scaleX: 1,
                    scaleY: 1,
                    shadowColor: 'black',
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowOpacity: 0.6
                });
                this.listStar.push(config)
                this.leftList.push(config)
                this.basic_x = config.x;
                this.basic_y = config.y;
                this.basic_w = config.radius;
                this.basic_h = config.radius;
                this.back_color = config.fill;
                this.bor_color = config.stroke;
                this.shadow_color = config.shadowColor;
                this.shadow_x = config.shadowOffsetX;
                this.shadow_y = config.shadowOffsetY;
                this.shadow_vague = config.opacity;
            },
            addText() {
                let config = ({
                    id: "5",
                    x: 20,
                    y: 20,
                    fontSize: 25,
                    text: "原型图",
                    rotation: 0,
                    scale: 1,
                    name: "文本",
                    fill: '',
                    border: '',
                    opacity: 0.8,
                    scaleX: 1,
                    scaleY: 1,
                    shadowColor: '',
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowOpacity: 0.6
                });
                this.listText.push(config)
                this.leftList.push(config)
                this.basic_x = config.x;
                this.basic_y = config.y;
                this.basic_w = config.radius;
                this.basic_h = config.radius;
                this.back_color = config.fill;
                this.bor_color = config.stroke;
                this.shadow_color = config.shadowColor;
                this.shadow_x = config.shadowOffsetX;
                this.shadow_y = config.shadowOffsetY;
                this.shadow_vague = config.opacity;
            },
            //获取元素
            startClick(item, index) {
                this.selectedShapeId = item.index;
                this.selectedShape = item.name;
            },
            //拖拽事件
            //  handleTransformEnd(e) {
            //   // shape is transformed, let us save new attrs back to the node
            //   // find element in our state
            //   const shape = this.config.find(
            //     (r) => r.name === this.selectedShapeName
            //   );
            //   // update the state
            //   shape.x = e.target.x();
            //   shape.y = e.target.y();
            //   shape.rotation = e.target.rotation();
            //   shape.scaleX = e.target.scaleX();
            //   shape.scaleY = e.target.scaleY();
            //   // change fill
            //   shape.fill = Konva.Util.getRandomColor();
            // },
            // handleStageMouseDown(e) {
            //   // clicked on stage - clear selection
            //   if (e.target === e.target.getStage()) {
            //     this.selectedShapeName = '';
            //     this.updateTransformer();
            //     return;
            //   }
            //   // clicked on transformer - do nothing
            //   const clickedOnTransformer =
            //     e.target.getParent().className === 'Transformer';
            //   if (clickedOnTransformer) {
            //     return;
            //   }
            //   // find clicked rect by its name
            //   const name = e.target.name();
            //   const shape = this.shape.find((r) => r.name === name);
            //   if (shape) {
            //     this.selectedShapeName = name;
            //   } else {
            //     this.selectedShapeName = '';
            //   }
            //   this.updateTransformer();
            // },
            // updateTransformer() {
            //   // here we need to manually attach or detach Transformer node
            //   const transformerNode = this.$refs.transformer.getNode();
            //   const stage = transformerNode.getStage();
            //   const { selectedShapeName } = this;
            //   const selectedNode = stage.findOne('.' + selectedShapeName);
            //   // do nothing if selected node is already attached
            //   if (selectedNode === transformerNode.node()) {
            //     return;
            //   }
            //   if (selectedNode) {
            //     // attach to another node
            //     transformerNode.nodes([selectedNode]);
            //   } else {
            //     // remove transformer
            //     transformerNode.nodes([]);
            //   }
            // },
            //删除图像，没写完
            data_del(e) {
                //this.data.splice(index,1);
                this.remove();
            },
            handleMouseMove(dragend) {
                const mousePos = this.$refs.stage.getNode().getPointerPosition();
                const x = mousePos.x;
                const y = mousePos.y;
                this.basic_x = x;
                this.basic_y = y;
            },
            changex(basic_x) {
                this.name = this.selectedShape; //选中对应的图形？
                this.index = this.selectedShapeId; //选中id
                if (this.name == "正方形") {
                    this.listRect[index].x = basic_x;
                } else if (this.name == "圆形") {
                    this.listCircle[index].x = basic_x;
                } else if (this.name == "三角形") {
                    this.listTri[index].x = basic_x;
                } else if (this.name == "五角星") {
                    this.listStar[index].x = basic_x;
                } else if (this.name == "文本") {
                    this.listText[index].x = basic_x;
                }
            },
            changey(){
            },
            changew(){
            },
            changeh(){
            },
            changeBackColor(){
            },
            changeBorCorlor(){
            },
            changeShadowColor(){
            },
            changeShadowX(){
            },
            changeShadowY(){
            },
            changeShadowVague(){
            },
        },
    };
</script>

<style scope>
    body {
        margin: 0;
        padding: 0;
    }

    header {
        height: 61px;
        width: 100%;
        background-color: bisque;
        border: 1px;
    }

    a {
        text-decoration: none;
    }

    .content {
        /* background-color: rgb(77, 124, 172); */
        height: 100%;
        width: 100%;
        display: flex;
        border: 2px;
    }

    .left-nav {
        /* flex: 1; */
        float: left;
        width: 200px;
        height: 90%;
        flex-direction: column;
        writing-mode: sideways-lr;
        border: 5px;
        border-block-color: black;
    }

    v-stage {
        width: 800px;
        height: 90%;
        float: left;
        flex: 3;
        /* display: flex; */
        /* background-color: rgb(196, 166, 92); */
        border: 5px;
    }

    .property-panel {
        flex: 1;
        /* display: flex; */
        float: left;
        flex-direction: column;
        border: 5px;
        /* background-color: black; */
    }

    a {
        text-decoration: none;
    }

    .basic_info {
        margin: 20px;
        float: left;
        flex-direction: row;
    }

    .el-input {
        margin: 8px;
        /* float: left;  */
        /* flex: 1; */
        padding: 8px;
        width: 100px;
        display: inline-block
    }

    .el-color-picker {
        /* margin-top: 30px; */
        /* float: left;  */
        /* flex: 1; */
        /* padding-top: 20px; */
        /* width:150px; 
    height: 50px; 
    border-radius: 50px;  */
        display: absolute;
        right: 0;
        /* text-align: center;  */
        padding: 8px;
        display: inline-block
    }

    ul {
        padding: 5px;
        font-size: 15;
        color: black;
    }
</style>