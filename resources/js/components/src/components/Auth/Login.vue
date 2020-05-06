<template>
    <div>
        <div class="login-container">
            <el-form :model="user" status-icon label-width="120px" class="demo-ruleForm">
                <el-form-item label="Email" prop="email">
                    <el-input type="text" size="small" v-model="user.email"></el-input>
                </el-form-item>

                <el-form-item label="Mật khẩu" size="small" prop="password">
                    <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item align="center">
                    <el-button type="primary" @click="submit" size="small">Đăng nhập</el-button>
                    <el-button type="default" size="small">Đăng ký mới</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>



<style>
    .login-container {
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
