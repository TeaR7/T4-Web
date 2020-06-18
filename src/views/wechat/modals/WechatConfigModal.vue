<template>
  <div>
    <el-dialog :title="title" :visible.sync="isShow" :before-close="close" :fullscreen="device=='mobile'">
      <el-form :model="forms" :rules="rules" class="dialogForm" ref="baseForm" label-width="100px" v-loading="loading">
        <el-form-item label="编号" prop="code">
          <t-dict v-model="forms.code" type="radio" dictCode="we_code_type"
                  :readonly="disableSubmit||forms.id ? true: false"></t-dict>
          <div class="tips">用于区分同一应用下，不同的APPID，例如小程序、H5、APP等</div>
        </el-form-item>
        <el-form-item label="应用名称" prop="name">
          <el-input placeholder="输入应用名称" v-model="forms.name" :readonly="disableSubmit"></el-input>
        </el-form-item>
        <el-form-item label="APP-ID" prop="appId">
          <el-input placeholder="输入WX APPID" v-model="forms.appId" :readonly="disableSubmit"></el-input>
        </el-form-item>
        <el-form-item label="SECRET" prop="secret">
          <el-input placeholder="输入对应的SECRET" v-model="forms.secret" :readonly="disableSubmit"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <t-dict v-model="forms.status" type="radio" dictCode="common_status"
                  :readonly="disableSubmit"></t-dict>
        </el-form-item>
      </el-form>
      <span slot="footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submitForm('baseForm')" :disabled="disableSubmit"
                           v-auth="['weChat:WechatConfig:ADD','weChat:WechatConfig:EDIT']">确定</el-button>
          </span>
    </el-dialog>
  </div>
</template>
<script>
    import {T4CloudModalMixin} from '@/mixins/T4CloudModalMixin'

    export default {
        name: 'WechatConfigModal',
        mixins: [T4CloudModalMixin],
        data() {
            const validateCode = this.valiteValue('配置编号');
            return {
                rules: {
                    code: { required: true, validator: validateCode, trigger: 'blur' },
                    name: {required: true, message: '应用名称不允许为空', trigger: 'blur'},
                    appId: {required: true, message: 'WX APPID不允许为空', trigger: 'blur'},
                    status: {required: true, message: '状态(1-正常,0-删除)不允许为空', trigger: 'blur'},
                },
                url: {
                    detail: '/T4Cloud-WeChat/WechatConfig/detail',
                    save: '/T4Cloud-WeChat/WechatConfig/save',
                    check: '/T4Cloud-WeChat/WechatConfig/check',
                    update: '/T4Cloud-WeChat/WechatConfig/update',
                }
            }
        },
        methods: {
            //初始化form表单字段
            initForm() {
                return {
                    id: null,
                    code: null, // 编号（可以用来区分同一应用下的公众号、小程序、H5等）
                    name: null, // 应用名称
                    appId: null, // WX APPID
                    secret: null, // 对应的secret
                    status: null, // 状态(1-正常,0-删除)
                }
            },
        }
    }
</script>
