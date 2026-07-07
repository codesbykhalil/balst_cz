<template>
  <div>
    <el-tree
      :data="sideBarData"
      ref="menuTree"
      node-key="name"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sideBarData: [
        { name: "父节点", children: [{ name: "子节点", children: [] }] },
      ],
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },

  components: {},

  methods: {
    handleNodeClick(e) {
      const a = this.$refs.menuTree.getNode(e.name);
      if (a.childNodes.length === 0) {
        console.log();
      }
    },
  },
};
</script>

<style scoped>
</style>
