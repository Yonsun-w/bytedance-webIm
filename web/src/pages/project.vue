<template>
    <div class="root">
        <h1>项目列表</h1>
        <el-card class="bg-box">
            <div class="controller">
                <i class="el-icon-circle-plus-outline" @click="createProject()">创建项目</i>
                <el-dropdown @command="sortProject">
                    <span class="el-dropdown-link">
                        <i class="el-icon-arrow-down el-icon--right"></i>{{sortway}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="byname">按名称排序</el-dropdown-item>
                        <el-dropdown-item command="bytime">按时间排序</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
                <el-form :model="project">
                    <el-form-item label="项目名称" :label-width="formLabelWidth">
                        <el-input type="text" v-model="project.name" maxlength='20' show-word-limit autocomplete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="项目简介" :label-width="formLabelWidth">
                        <el-input type="textarea" maxlength='300' resize="vertical" v-model="project.desc"
                            show-word-limit autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="项目封面" :label-width="formLabelWidth">
                        <input type="file" @change="getPicture">
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveProject" :disabled='!canSave'>确 定</el-button>
                </div>
            </el-dialog>

            <div class="items">
                <el-card class="item" :body-style="{ padding: '0px' }" v-for="(item, index) in items" :key="index" @click.native="openProject(index)">
                    <img class="item-img" :src="item.data.img" alt="">
                    <i class="el-icon-more item-more" @click="moreOper(index)"></i>
                    <div class="item-operate" v-if="item.isChackMore">
                        <div class="item-change" @click="changeItem(index)">编辑项目</div>
                        <div class="item-drop" @click="dropItem(index)">删除项目</div>
                    </div>
                    <div class="basic-info">
                        <span class="title">{{item.data.title}}</span>
                        <span class="time">{{item.update_time}}</span>
                    </div>
                    <div class="desc">{{item.data.desc}}</div>
                </el-card>
            </div>

            <!-- <el-pagination class="pagination" background layout="prev, pager, next" :page-count='10' hide-on-single-page
                @current-change="getCurrentPage"></el-pagination> -->
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios';
    import {
        uploadFile
    } from '../utils/upload';

    export default {
        data() {
            return {
                dialogTitle: '添加项目',
                dialogFormVisible: false,
                project: {
                    name: '',
                    desc: '',
                    picture: '',
                    index: ''
                },
                formLabelWidth: '70px',

                canSave: false,

                sortway: '按名称排序',

                items: []
            }
        },

        created() {
            // console.log(sessionStorage.getItem('token'))
            axios({
                    method: 'post',
                    url: '/api/project',
                    data: {
                        oper: "getProjects",
                        token: sessionStorage.getItem('token')
                    }
                })
                .then(res => {
                    if (res.data.code === 0) {
                        this.items = res.data.data;
                    } else {

                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        methods: {
            createProject() {
                this.dialogFormVisible = true;
                this.dialogTitle === '添加项目'
            },

            sortProject(command) {
                console.log(command)
                if (command === 'byname') {

                }
            },

            saveProject() {
                // console.log(this.project);

                this.dialogFormVisible = false;
                this.$message({
                    message: '操作成功',
                    type: 'success'
                });

                uploadFile(this.project.picture).then(res => {
                    if (this.dialogTitle === '添加项目') {
                        let itemNew = {
                            title: this.project.name,
                            time: '2021-09-23 09：00',
                            data: {
                                img: res,
                                desc: this.project.desc
                            },
                            isChackMore: false,
                        }
                        this.items.push(itemNew)

                        axios({
                                method: 'post',
                                url: '/api/project',
                                data: {
                                    oper: "addProject",
                                    token: sessionStorage.getItem('token'),
                                    data: {
                                        "img": res,
                                        "title": this.project.name,
                                        "desc": this.project.desc
                                    }
                                }
                            })
                            .then(res => {
                                if (res.data.code === 0) {
                                    console.log(res.data.data)
                                } else {

                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    } else {
                        let index = this.project.index;
                        axios({
                                method: 'post',
                                url: '/api/project',
                                data: {
                                    oper: "updateProject",
                                    token: sessionStorage.getItem('token'),
                                    project_id: this.items[index].project_id,
                                    data: {
                                        "img": res,
                                        "title": this.project.name,
                                        "desc": this.project.desc
                                    }
                                }
                            })
                            .then(res => {
                                if (res.data.code === 0) {
                                    console.log(res.data.data)
                                    location.reload();
                                } else {
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                })
            },

            getPicture(event) {
                if (event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png') {
                    this.project.picture = event.target.files[0];
                } else {
                    this.$message({
                        message: '只支持JPG或PNG格式',
                        type: 'warning'
                    });
                }
            },

            moreOper(index) {
                console.log(this.items[index].isChackMore)
                if (this.items[index].isChackMore) {
                    this.items[index].isChackMore = false;
                } else {
                    this.items[index].isChackMore = true;
                }
            },

            changeItem(index) {
                this.items[index].isChackMore = false;

                this.dialogFormVisible = true;
                this.dialogTitle = '编辑项目';
                this.project.name = this.items[index].data.title;
                this.project.desc = this.items[index].data.desc;
                this.project.index = index;
            },

            dropItem(index) {
                this.items[index].isChackMore = false;

                this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.items.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });

                    axios({
                            method: 'post',
                            url: '/api/project',
                            data: {
                                oper: "dropProject",
                                token: sessionStorage.getItem('token'),
                                project_id: this.items[index].project_id
                            }
                        })
                        .then(res => {
                            if (res.data.code === 0) {
                                console.log(res.data.data)
                            } else {

                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            openProject(index) {
                // console.log(index);
                let project_id = this.items[index].project_id;
                // console.log(project_id);
                sessionStorage.setItem('project_id', project_id);
                this.$router.push({
                    path: `/pages/`
                })
            }
            // getCurrentPage(val) {
            //     console.log(val)
            // },
        },

        watch: {
            project: {
                handler(newVal) {
                    if (newVal.name === '' || newVal.desc === '' || newVal.picture === '') {
                        this.canSave = false;
                    } else {
                        this.canSave = true;
                    }
                },
                deep: true
            },
        }
    }
</script>

<style>
    .bg-box {
        width: 95%;
        margin: auto;
    }

    .controller {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    i {
        color: #606266;
        font-size: 14px;
    }

    i:hover {
        color: #409EFF;
        cursor: pointer;
    }

    .el-dropdown-link {
        margin-left: 10px;
    }

    .el-dropdown-link:hover {
        color: #409EFF;
        cursor: pointer;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .items {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .item {
        width: 230px;
        height: 250px;
        position: relative;
        margin-top: 25px;
    }

    .items:after {
        content: "";
        width: 230px;
    }

    .item:hover {
        transform: scale(1.05);
        cursor: pointer;
    }

    .item:hover .item-more {
        background-color: #ffffff;
    }

    .item-img {
        margin: 0;
        width: 230px;
        height: 143px;
    }

    .item-more {
        position: absolute;
        top: 7px;
        right: 7px;
        transform: rotate(90deg);
        border-radius: 20%;
        height: 15px;
        width: 20px;
    }

    .item-operate {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        top: 13px;
        right: 25px;
        width: 80px;
        height: 45px;
        background-color: #dce0e6;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    .item-change,
    .item-drop {
        overflow: hidden;
        font-size: 1em;
        font-weight: 500;
    }

    .item-change:hover,
    .item-drop:hover {
        background-color: #409EFF;
        color: #dce0e6;
    }

    .basic-info {
        display: flex;
        align-content: center;
        justify-content: space-between;
    }

    .basic-info .title {
        background-color: white;
        font-size: 1.15em;
        margin-left: 4px;
        font-weight: 700;
    }

    .basic-info .time {
        font-size: 0.95em;
        font-weight: 300;
        margin-top: 3px;
        margin-right: 4px;
    }

    .desc {
        font-size: 0.9em;
        color: #71757e;
        margin: 10px 5px 0 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }

    .pagination {
        margin-top: 30px;
    }
</style>