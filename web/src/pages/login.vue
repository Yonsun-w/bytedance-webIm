<template>
    <div class="root">
        <div v-if="login">
            <div class="title">登录</div>
            <div class="login">
                <el-form :model="loginFrom" status-icon label-width="100px" class="From">
                    <el-form-item label="用户名" prop="l_username">
                        <el-input type="text" v-model="loginFrom.l_username" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="l_passwd">
                        <el-input type="password" v-model="loginFrom.l_passwd" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-tooltip class="item" effect="dark" :disabled="!showlogininfo" :content="logininfo"
                            placement="top">
                            <div class="tooltip bottom reg">
                                <el-button type="primary" :disabled="!canlogin" @click="toLogin()">登录
                                </el-button>
                            </div>
                        </el-tooltip>
                        <div class="bottom butmargin reset">
                            <el-button @click="resetloginForm()">重置</el-button>
                        </div>
                        <div class="bottom  ">
                            <span class="oper" @click="oper()">去注册</span>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div v-else>
            <div class="title">注册</div>
            <div class="register">
                <el-form :model="regForm" status-icon label-width="100px" class="From">
                    <el-form-item label="用户名" prop="r_username">
                        <el-input type="text" v-model="regForm.r_username" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="r_passwd1">
                        <el-input type="password" v-model="regForm.r_passwd1" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="r_passwd2">
                        <el-input type="password" v-model="regForm.r_passwd2" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-tooltip class="item" effect="dark" :disabled="!showreginfo" :content="reginfo"
                            placement="top">
                            <div class="tooltip bottom reg">
                                <el-button type="primary" :disabled="!canreg" @click="toRegister()">注册
                                </el-button>
                            </div>
                        </el-tooltip>
                        <div class="bottom butmargin reset">
                            <el-button @click="resetregForm()">重置</el-button>
                        </div>
                        <div class="bottom">
                            <span class="oper" @click="oper()">去登录</span>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                login: true,
                canlogin: false,
                canreg: false,
                loginFrom: {
                    l_username: '',
                    l_passwd: '',
                },
                regForm: {
                    r_username: '',
                    r_passwd1: '',
                    r_passwd2: ''
                },

                showlogininfo: true,
                logininfo: '请输入用户名',

                showreginfo: true,
                reginfo: '请输入用户名'
            }
        },
        watch: {
            loginFrom: {
                handler(newVal, oldVal) {
                    if (newVal.l_username === '') {
                        this.canlogin = false;
                        this.showlogininfo = true;
                        this.logininfo = '请输入用户名'
                    } else if (newVal.l_username.length > 20) {
                        this.canlogin = false;
                        this.showlogininfo = true;
                        this.logininfo = '用户名太长，请输入20字以内';
                    } else {
                        if (newVal.l_passwd === '') {
                            this.canlogin = false;
                            this.showlogininfo = true;
                            this.logininfo = '请输入密码';
                        } else if (newVal.l_passwd.length < 6) {
                            this.canlogin = false;
                            this.showlogininfo = true;
                            this.logininfo = '密码太短';
                        } else {
                            this.canlogin = true;
                            this.showlogininfo = false;
                        }
                    }
                },
                deep: true
            },

            regForm: {
                handler(newVal, oldVal) {
                    if (newVal.r_username === '') {
                        this.canreg = false;
                        this.reginfo = '请输入用户名';
                        this.showreginfo = true;
                    } else if (newVal.r_username.length > 20) {
                        this.canreg = false;
                        this.reginfo = '用户名太长，请输入20字以内';
                        this.showreginfo = true;
                    } else {
                        if (newVal.r_passwd1 === '') {
                            this.canreg = false;
                            this.reginfo = '请输入密码';
                            this.showreginfo = true;
                        } else if (newVal.r_passwd1.length < 6) {
                            this.canreg = false;
                            this.reginfo = '密码过短';
                            this.showreginfo = true;
                        } else if (newVal.r_passwd1 !== newVal.r_passwd2) {
                            this.canreg = false;
                            this.reginfo = '两次密码不一致';
                            this.showreginfo = true;
                        } else {
                            this.canreg = true;
                            this.showreginfo = false;
                        }
                    }
                },
                deep: true
            }
        },
        methods: {
            oper() {
                if (this.login) {
                    this.login = false
                } else {
                    this.login = true
                }
            },

            toLogin() {
                axios({
                        method: 'post',
                        url: '/api/login',
                        data: {
                            username: this.loginFrom.l_username,
                            passwd: this.loginFrom.l_passwd
                        }
                    })
                    .then(res => {
                        if (res.data.code === 0) {
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });

                            // token
                            sessionStorage.setItem('token', res.data.token)
                        } else {
                            this.$message({
                                message: '登录失败，用户名或密码错误',
                                type: 'warning'
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        this.$message({
                            message: err,
                            type: 'warning'
                        });
                    })

                this.$router.replace('/project');
            },

            resetloginForm() {
                this.loginFrom = {
                    l_username: '',
                    l_passwd: '',
                }
            },

            toRegister() {
                axios({
                        method: 'post',
                        url: '/api/register',
                        data: {
                            username: this.regForm.r_username,
                            passwd: this.regForm.r_passwd2
                        }
                    })
                    .then(res => {
                        console.log(res)
                        if (res.data.code === 0) {
                            this.$message({
                                message: '注册成功',
                                type: 'success'
                            });
                        } else {
                            this.$message({
                                message: '注册失败，用户名重复，换一个吧',
                                type: 'warning'
                            });
                        }
                    })
                    .catch(err => {
                        // console.log(err)
                        this.$message({
                            message: err,
                            type: 'warning'
                        });
                    })
            },

            resetregForm() {
                this.regForm = {
                    r_username: '',
                    r_passwd1: '',
                    r_passwd2: ''
                }
            }
        }
    }
</script>

<style>
    body {
        /* background: url(../../public/bg.jpg); */
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .root {
        margin-top: -400px;  
    }

    .title {
        background-color: #c6e2ff;
        color: #606266;
        height: 35px;
        font-size: 25px;
        font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    .login {
        display: flex;
        background-color: #d9ecff;
        height: 200px;
        width: 400px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    .register {
        display: flex;
        background-color: #d9ecff;
        height: 270px;
        width: 400px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    .From {
        height: 250px;
        width: 350px;
        margin: 20px 0;
    }

    .oper {
        color: #5b6779;
        margin-left: 30px;
    }

    .oper:hover {
        color: #67c23a;
        cursor: pointer;
    }

    .bottom {
        display: inline;
    }

    .reg {
        margin-right: 10px;
    }

    .reset {
        margin-left: 10px;
    }
</style>