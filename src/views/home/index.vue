<template>
  <div class="app-container">
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="sno"
          label="学号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="sname"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ssex"
          label="性别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sage"
          label="年龄"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sdept"
          label="所在系"
          width="300">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="editStudent(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { getStudent } from '@/api/table'

export default {
  data() {
    return {
      tableData: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getStudent().then(response => {
        this.tableData = response.data
      })
    },
    editStudent(row) {
      this.$router.push({
        path: '/Path/Scan' + row.where,
        query: {
          sno: row.sno
        }
      })
    }
  }
}
</script>
