<template>
  <div class="app-container">
    <el-input v-model="input" placeholder="请输入院系名称进行查询" style="width: 30%; margin-top: 200px;margin-left: 30%"></el-input>
    <el-divider direction="vertical"></el-divider>
    <el-button type="primary" icon="el-icon-search" circle @click="checkgradescale"></el-button>
    <template>
      <el-table
        :data="scale"
        style="width: 100%">
        <el-table-column
          prop="avggrade"
          label="平均分"
          style="width: 20%">
        </el-table-column>
        <el-table-column
          prop="highistgrade"
          label="最高分"
          style="width: 20%">
        </el-table-column>
        <el-table-column
          prop="lowistgrade"
          label="最低分"
          style="width: 20%">
        </el-table-column>
        <el-table-column
          prop="greatper"
          label="优秀率"
          style="width: 20%">
        </el-table-column>
        <el-table-column
          prop="countLow"
          label="不及格人数"
          style="width: 20%">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>

import { gradeScale } from '@/api/table'

export default {
  data() {
    return {
      scale: [{
        avggrade: 0,
        highistgrade: 0,
        lowistgrade: 0,
        greatper: 0,
        countLow: 0
      }],
      input: null
    }
  },
  methods: {
    checkgradescale() {
      gradeScale({ sdept: this.input }).then(response => {
        this.scale[0].avggrade = response.data.avggrade
        this.scale[0].highistgrade = response.data.highistgrade
        this.scale[0].lowistgrade = response.data.lowistgrade
        this.scale[0].greatper = response.data.greatper
        this.scale[0].countLow = response.data.countLow
        console.log(response.data.avggrade)
      })
    }
  }
}
</script>
