<template>
  <div class="app-container">
    <el-button @click="dialogVisible = true" type="primary" style="margin-left: 16px;">
      添加课程
    </el-button>
    <el-divider direction="vertical"></el-divider>
    <el-button @click="squeeze" type="primary" style="margin-left: 0px;">删除无选课课程</el-button>
    <el-divider></el-divider>
    <template>
      <el-table
        :data="coursescale"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="cno"
          label="课程号"
          style="width: 25%">
        </el-table-column>
        <el-table-column
          prop="cname"
          label="课程名"
          style="width: 25%">
        </el-table-column>
        <el-table-column
          prop="ccredit"
          label="学分"
          style="width: 25%">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          style="width: 25%">
          <template slot-scope="scope">
            <el-button @click="dialogVisible2 = true; course_cno = scope.row.cno; course_name = scope.row.cname" type="danger" size="small">编辑</el-button>
            <el-button @click="checkin(scope.row)" type="success" size="small">录入成绩</el-button>
            <el-button @click="checkout(scope.row)" type="warning" size="small">添加学生</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog
      title="添加课程"
      :visible.sync="dialogVisible"
      width="30%">
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="课程号">
            <el-input v-model="form.cno"></el-input>
          </el-form-item>
          <el-form-item label="课程名">
            <el-input v-model="form.cname"></el-input>
          </el-form-item>
          <el-form-item label="学分">
            <el-input v-model="form.ccredit"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false; addcourse()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="课程信息修改"
      :visible.sync="dialogVisible2"
      width="20%">
      <span>
        <el-input v-model="course_ccred" placeholder="请输入内容"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible2 = false; editcourse()">提交</el-button>
        <el-button @click="dialogVisible2 = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { courseScale, squeezeCourse, updateCourse } from '@/api/table'
import { addCourse } from '@/api/record'

export default {
  data() {
    return {
      coursescale: [],
      dialogVisible: false,
      form: {
        cno: null,
        cname: null,
        ccredit: null
      },
      dialogVisible2: null,
      course_ccred: null,
      course_cno: null,
      course_name: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      courseScale().then(response => {
        this.coursescale = response.data
      })
    },
    addcourse() {
      addCourse(this.form).then(() => {
        this.$alert('添加成功！', '消息', {
          confirmButtonText: '确认',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },
    editcourse() {
      updateCourse({ cno: this.course_cno, cnmae: this.course_name, ccredit: this.course_ccred }).then(response => {
        this.$alert('修改成功！', '消息', {
          confirmButtonText: '确认',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },
    squeeze() {
      squeezeCourse().then(response => {
        this.$alert('执行成功！', '消息', {
          confirmButtonText: '确认',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },
    checkin(row) {
      this.$router.push({
        path: '/Course/InCourse',
        query: {
          cno: row.cno
        }
      })
    },
    checkout(row) {
      this.$router.push({
        path: '/Course/outCourse',
        query: {
          cno: row.cno
        }
      })
    }
  }
}
</script>
