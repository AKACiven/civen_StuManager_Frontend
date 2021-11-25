<template>
  <div class="app-container">
    <el-input v-model="input" placeholder="请输入院系名称进行查询" style="width: 30%; margin-left: 30%"></el-input>
    <el-divider direction="vertical"></el-divider>
    <el-button type="primary" icon="el-icon-search" circle @click="checkdepgrades"></el-button>
    <template>
      <el-table
        :data="scale"
        style="width: 100%"
        :default-sort = "{prop: 'grade', order: 'descending'}"
      >
        <el-table-column
          prop="sdept"
          label="系别"
          style="width: 20%">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="分数"
          sortable
          style="width: 20%"
        >
        </el-table-column>
        <el-table-column
          prop="cname"
          label="课程"
          style="width: 20%">
        </el-table-column>
        <el-table-column
          prop="sno"
          label="学号"
          style="width: 20%">
        </el-table-column>
        <el-table-column
          prop="sname"
          label="姓名"
          style="width: 20%">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>

import { deptGrades } from '@/api/table'

export default {
  data() {
    return {
      scale: null,
      input: null
    }
  },
  methods: {
    checkdepgrades() {
      deptGrades({ sdept: this.input }).then(response => {
        this.scale = response.data
      })
    }
  }
}
</script>
