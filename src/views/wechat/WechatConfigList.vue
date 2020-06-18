<template>
  <div>
    <!-- 搜索，可在下方开启 -->
    <t-table-search :search-col="tableColumn" :query-param="queryParam" @search="search"></t-table-search>
    <!-- 操作按钮，可直接在标签中定义新按钮 -->
    <t-table-operator :selectedRows="selectionRows" :add="hasAuth(['weChat:WechatConfig:ADD'])" @onAdd="handleAdd"
                      :delete="hasAuth(['weChat:WechatConfig:DELETE'])" @onDelete="handleDelete"></t-table-operator>
    <!-- 表格区域 -->
    <t-standard-table
        :selectedRows="selectionRows"
        :tableData="tableData"
        :tableColumn="tableColumn"
        :ipagination="ipagination"
        :url="url"
        :loading="loading"
        :import="hasAuth(['weChat:WechatConfig:IMPORT'])"
        :export="hasAuth(['weChat:WechatConfig:EXPORT'])"
        @pageSizeChange="handPageSizeChange"
        @onSelectRowChange="handSelectRowChange"
        @onTableHeadCommand="handlerTableHeadCommand"
    >
      <!-- 操作按钮 -->
      <template #options="{row}">
        <el-button type="primary" size="mini" @click="handleEdit(row)"
                   v-auth="['weChat:WechatConfig:ADD','weChat:WechatConfig:EDIT']">编辑
        </el-button>
        <el-dropdown>
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down"></i>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleDetail(row)">详情</el-dropdown-item>
            <el-dropdown-item @click.native="handleDelete([row.id])" v-auth="'weChat:WechatConfig:DELETE'">删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    
    </t-standard-table>
    <!-- 编辑modal -->
    <WechatConfigModal ref="entityModal" @success="loadData"></WechatConfigModal>
  </div>
</template>
<script>
    import {T4CloudListMixin} from '../../mixins/T4CloudListMixin'
    import WechatConfigModal from './modals/WechatConfigModal'

    export default {
        name: 'WechatConfigList',
        mixins: [T4CloudListMixin],
        components: {
            WechatConfigModal
        },
        data() {
            return {
                tableColumn: [
                    {
                        key: 'code_dict',
                        name: '编号',
                        query: true,
                        dict: 'we_code_type',
                    },
                    {
                        key: 'name',
                        name: '应用名称',
                        query: true,
                    },
                    {
                        key: 'appId',
                        name: 'APP-ID',
                        query: true,
                    },
                    {
                        key: 'secret',
                        name: 'SECRET ',
                    },
                    {
                        key: 'status_dict',
                        name: '状态',
                        query: true,
                        dict: 'common_status',
                    },
                ],
                url: {
                    page: '/T4Cloud-WeChat/WechatConfig/page',
                    delete: '/T4Cloud-WeChat/WechatConfig/delete',
                    exportXls: '/T4Cloud-WeChat/WechatConfig/export',
                    importXls: '/T4Cloud-WeChat/WechatConfig/import',
                }
            }
        },
        methods: {}
    }
</script>
