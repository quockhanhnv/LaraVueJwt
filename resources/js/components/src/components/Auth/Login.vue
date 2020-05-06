<template>
    <div>
        <a href="#" @click="setLocale('en')"><flag iso="us"></flag></a> &nbsp;
        <a href="#" @click="setLocale('vn')"><flag iso="vn"></flag></a> &nbsp;
        <a href="#" @click="setLocale('jp')"><flag iso="jp"></flag></a> &nbsp;
        <div class="login-container">
            <el-form :model="user" status-icon label-width="120px" class="demo-ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="" prop="email">
                    <label>{{ $t('email') }}</label>
                    <el-input type="text" size="small" v-model="user.email"></el-input>
                </el-form-item>

                <el-form-item label="" size="small" prop="password">
                    <label>{{ $t('password') }}</label>
                    <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item align="center">
                    <el-button type="primary" @click="submit" size="small">{{ $t('login') }}</el-button>
                    <el-button type="default" size="small">{{ $t('register') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex' // để sử dụng 1 action từ 1 component khác
    export default {
        name: 'Login',
        props: {},
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                },

                rules: {
                    email: [
                        { required: true, message: 'Please input your email', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please input your password', trigger: 'blur' }
                    ]

                }
            }
        },
        methods: {
            ...mapActions({
                signIn: 'auth/signIn' // gọi đến action onSubmit bên auth.js
            }),
            submit() { // từ component gọi đến action của 1 vuex sẽ dùng dispatch (trong hàm signIn của auth.js)
                this.signIn(this.user).then(() => {
                    this.$router.replace({
                        name: 'dashboard'
                    }).catch(() => {
                        console.log('failed')
                    })
                });
            },
            setLocale(locale) {
                import(`../../langs/${locale}.json`).then((msgs) => {
                    this.$i18n.setLocaleMessage(locale, msgs)
                    this.$i18n.locale = locale
                })

            }
        },
        mounted () {

        }
    }
</script>

<style>
    .login-container {
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
