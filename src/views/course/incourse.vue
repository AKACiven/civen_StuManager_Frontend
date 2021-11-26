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
          prop="grade"
          label="成绩"
          style="width: 25%">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          style="width: 25%">
          <template slot-scope="scope">
            <el-button @click="editgrade; temp.sno = scope.row.sno; dialogVisible = true" type="primary" size="small">录入成绩</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog
      title="成绩修改"
      :visible.sync="dialogVisible"
      width="20%">
      <span>
        <el-input v-model="gradeinput" placeholder="请输入内容"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false; temp.grade = gradeinput; editgrade()">提交</el-button>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { checkInCourse, editGrade } from '@/api/table'

export default {
  data() {
    return {
      cno: null,
      dialogVisible: false,
      gradeinput: null,
      tableData: [],
      temp: {
        gradeinput: null,
        sno: null,
      }
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
      checkInCourse({ cno: this.cno }).then(response => {
        this.tableData = response.data
      })
    },
    editgrade() {
      editGrade({ sno: this.temp.sno, cno: this.cno, grade: this.temp.grade })
      this.$alert('录入成功！', '消息', {
        confirmButtonText: '确认',
        callback: action => {
          window.location.reload()
        }
      })
    }
  }
}
</script>
