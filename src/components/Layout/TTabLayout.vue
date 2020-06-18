<template>
  <div class="tab-layout">
    <el-tabs :class="{hidden: device!='desktop'}" v-model="activePage" @tab-click="handleClick" closable @tab-remove="removeTab">
      <el-tab-pane v-for="item in pageList" :key="item.path" :label="item.name" :name="item.path">
        <!-- {{item.content}} -->
      </el-tab-pane>
    </el-tabs>
    <div class="tabPageWrap">
      <transition name="page-toggle">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
const indexKey = '/dashboard/analysis'
export default {
  data() {
    return {
      pageList: [],
      linkList: [],
      activePage: '',
      lastActivePage: '',
    }
  },
  watch: {
    '$route': function (newRoute) {
       console.log(newRoute)
      this.activePage = newRoute.path
      if (this.linkList.indexOf(newRoute.path) < 0) {
        this.linkList.push(newRoute.path)
        this.pageList.push(Object.assign({}, newRoute))
      } else if (this.linkList.indexOf(newRoute.path) >= 0) {
        console.log(newRoute.path)
        let oldIndex = this.linkList.indexOf(newRoute.path)
        let oldPositionRoute = this.pageList[oldIndex]
        this.pageList.splice(oldIndex, 1, Object.assign({}, newRoute, { meta: oldPositionRoute.meta }))
      }
    },
    'activePage': function (newKey) {
      this.lastActivePage = newKey
    }
  },
  computed: {
    ...mapGetters(["device"])
  },
  created() {
    if (this.$route.path != indexKey) {
      this.pageList.push({
        name: '首页',
        path: indexKey,
        fullPath: indexKey,
        meta: {
          icon: 'dashboard',
          title: '首页'
        }
      })
      this.linkList.push(indexKey)
    }
    this.pageList.push(this.$route)
    this.linkList.push(this.$route.path)
    this.activePage = this.$route.path
  },
  provide() {
    return {
      closeCurrentTab: this.closeCurrentTab
    }
  },
  methods: {
    // tab点击事件
    handleClick(tab) {
      if (tab.paneName != this.lastActivePage) {
        let index = this.linkList.lastIndexOf(tab.paneName)
        let waitRouter = this.pageList[index]
        this.$router.push(Object.assign({}, waitRouter));
      }
    },
    closeCurrentTab() {
      this.removeTab(this.activePage);
    },
    // 删除标签
    removeTab(key) {
      if (key == indexKey) {
        this.$message.warning('首页不能关闭!')
        return
      }
      console.log(key)
      // if (this.pageList.length === 1) {
      //   this.$message.warning('这是最后一页，不能再关闭了啦')
      //   return
      // }
      this.pageList = this.pageList.filter(item => item.path !== key)
      let index = this.linkList.indexOf(key)
      this.linkList = this.linkList.filter(item => item !== key)
      index = index >= this.linkList.length ? this.linkList.length - 1 : index
      this.activePage = this.linkList[index]

      // let index = this.linkList.lastIndexOf(tab.paneName)
      let waitRouter = this.pageList[index]
      this.$router.push(Object.assign({}, waitRouter));

    }
  }
}
</script>
<style lang="scss" scoped>
.tab-layout {
  margin-top: 5px;
  // background-color: #fff;
  .el-tabs {
    height: 45px;
    line-height: 45px;
    background-color: #fff;
  }
  .hidden {
    display: none;
  }
  .tabPageWrap{
    margin: 12px;
  }
  
}
</style>
<style lang="scss">
.tab-layout {
  .el-tabs__nav {
    left: 20px;
  }
  .el-tabs__item {
    font-size: 13px;
  }
  .el-tabs__nav-wrap::after{
    background-color: #fafafa;
  }
  .el-tabs__nav-wrap{
    z-index: 1;
  }
}
</style>

