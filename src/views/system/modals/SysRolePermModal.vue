<template>
  <div :class="{fixedDialog:true,fixedHeightDialog:device!='mobile'}">
    <el-dialog :title="title" :visible.sync="isShow" :before-close="close" :fullscreen="device=='mobile'">
      <!-- <div class="dialog__body"> -->
        <el-tree ref="tree" :data="treeList" show-checkbox node-key="id" default-expand-all :check-strictly="true"
          :props="defaultProps" @check="handleCheck">
        </el-tree>
      <!-- </div> -->
      <span slot="footer" class="dialog__footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save" :disabled="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { T4CloudModalMixin } from '@/mixins/T4CloudModalMixin'
export default {
  name: 'SysRolePermModal',
  mixins: [T4CloudModalMixin],
  data() {
    return {
      roleId: '',
      treeList: [],
      selectTreeList: [],
      checkedKeys: null,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      url: {
        tree: '/T4Cloud-System/SysPermission/userPermission',
        select: '/T4Cloud-System/SysRolePermission/list',
        save: '/T4Cloud-System/SysRolePermission/save',
      }
    }
  },
  methods: {
    // 获取权限列表
    getList(forms) {
      this.forms = forms
      this.checkedKeys = null
      if (!this.url.tree) {
        this.$message.error("加载树状数据需要配置data中url.tree的属性");
        return;
      }
      this.loading = true;
      this.$http.GET(this.url.tree, {}).then(res => {
        if (res.success) {
          this.treeList = res.result;
          this.getSelectList()
        } else {
          this.$message.warning(res.message);
        }
      }).finally(() => {
        this.loading = false
      });
    },
    // 获取该角色已有的权限
    getSelectList() {
      if (!this.url.select) {
        this.$message.error("加载选中数据需要配置data中url.select的属性");
        return;
      }
      this.loading = true;
      this.$http.GET(this.url.select, { roleId: this.forms.roleId }).then(res => {
        if (res.success) {
          let arr = []
          res.result.forEach(item => {
            arr.push({
              id: item.permissionId
            })
          })
          this.selectTreeList = arr;
          this.$refs.tree.setCheckedNodes(arr);
        } else {
          this.$message.warning(res.message);
        }
      }).finally(() => {
        this.loading = false
      });
    },
    // 当复选框被点击的时候触发
    handleCheck(data, checked) {
      this.checkedKeys = checked.checkedKeys
    },
    // 
    beforeSave() {
      if (this.checkedKeys == null) {
        this.close()
        return false
      } else {
        this.forms.permissionIds = this.checkedKeys.join(',')
        return true
      }
    }
  }
}
</script>
