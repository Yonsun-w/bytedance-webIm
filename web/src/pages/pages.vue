<template>
    <div style="display: flex;justify-content: center">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="float: left">项目详情</span>
                <el-button style="float: right; padding: 3px 0" icon="el-icon-edit" type="text" @click="updateType"
                    v-if="type"></el-button>
                <el-button style="float: right;" type="primary" @click="updateType" v-if="!type">保存</el-button>
            </div>
            <div>
                <editor :init="editorInit" v-model="content" v-if="!type" />
                <div v-html="content" v-if="type"></div>
            </div>

            <div style="display: flex;justify-content: space-between;margin-top: 50px;">
                <span style="font-weight: bolder">页面</span>
                <el-button type="text" icon="el-icon-plus" @click="dialogVisible = true">新增页面</el-button>
            </div>
            <div style="display: flex;justify-content: flex-start;flex-wrap: wrap;">
                <div v-for="(info,index) in boxContent" :key="index"
                    style="display: flex;flex-direction: column;width: 20%;margin-left: 4%;">
                    <div style="margin-top: 20px;">{{info.title}}</div>
                    <el-card class="box-content-card" :body-style="{ padding: '0px' }" style="position: relative;">
                        <el-tooltip placement="top">
                            <div slot="content">
                                <el-button type="text" @click.stop="goto()">编辑页面</el-button>
                                <br />
                                <el-button type="text" @click="delPage(info.id,info.title)">删除页面</el-button>
                            </div>
                            <el-button type="text"
                                style="position: absolute;right:0;top: -15px;color: black;font-weight: bolder">...
                            </el-button>
                        </el-tooltip>
                        <img :src="info.imgSrc" class="image">
                    </el-card>
                </div>
            </div>
        </el-card>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <el-input v-model="titleInfo" placeholder="请输入页面标题"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submitTitle">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue'
    import axios from 'axios'
    export default {
        components: {
            Editor
        },
        name: "projectdetails",
        data() {
            return {
                dialogVisible: false,
                type: true,
                titleInfo: "",
                content: "这是正文，这是正文，这是正文，这是正文，这是正文，这是正文，这是正文，这是正文，这是正文，这是正文，这是正文",
                boxContent: [],
                editorInit: {
                    language: 'zh_CN',
                    convert_urls: false,
                    plugins: [
                        'advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr importcss insertdatetime link lists nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'
                    ],
                    toolbar: [
                        'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
                        'hr bullist numlist link charmap preview anchor pagebreak insertdatetime table emoticons forecolor backcolor fullscreen'
                    ],
                }
            }
        },
        created() {
            console.log(sessionStorage.getItem('token'))
            console.log(sessionStorage.getItem('project_id'))

            axios({
                    method: 'post',
                    url: '/api/page',
                    data: {
                        oper: "getPages",
                        token: sessionStorage.getItem('token'),
                        project_id: sessionStorage.getItem('project_id')
                    }
                })
                .then(res => {
                    if (res.data.code === 0) {
                        console.log(res.data)
                    } else {}
                })
                .catch(err => {
                    console.log(err)
                })
        },
        methods: {
            updateType() {
                if (this.type) {
                    this.type = false
                } else {
                    this.type = true
                }
            },
            closeDialog() {
                this.dialogVisible = false
                this.titleInfo = ""
            },
            submitTitle() {
                let data = {
                    title: this.titleInfo,
                    imgSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                }
                this.boxContent.push(data)

                this.dialogVisible = false
                this.titleInfo = ""
            },
            delPage(id, title) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let i = this.boxContent.findIndex(item => item.id === id && item.title === title)
                    console.log(i)
                    this.boxContent.splice(i, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            goto() {
                this.$router.replace('/details');
            }
        }
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 90%;
    }

    .box-content-card {
        width: 100%;
    }

    .image {
        width: 100%;
        display: block;
    }
</style>