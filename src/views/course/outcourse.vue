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
          style="width: 25%">
        </el-table-column>
        <el-table-column
          prop="sname"
          label="姓名"
          style="width: 25%">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          style="width: 25%">
          <template slot-scope="scope">
            <el-button @click="addtocourse(scope.row)" type="primary" size="small">添加入课程</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>

import { addStuToCo, checkOutCourse } from '@/api/table'

export default {
  data() {
    return {
      cno: null,
      tableData: []
    }
  },
  created() {
    if (this.$route.query.cno == null) {
      this.$alert('请先在课程列表进行操作！', '提示', {
        confirmButtonText: '前往课程列表',
        callback: action => {
          this.$router.push({
            path: '/Course/CourseScale'
          })
        }
      })
    } else {
      this.cno = this.$route.query.cno
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      checkOutCourse({ cno: this.cno }).then(response => {
        this.tableData = response.data
      })
    },
    addtocourse(row) {
      addStuToCo({ sno: row.sno, cno: this.cno }).then(response => {
        window.location.reload()
      })
    }
  }
}
</script>
