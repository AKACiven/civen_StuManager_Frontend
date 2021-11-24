<template>
  <div class="app-container">
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
      添加学生
    </el-button>
    <el-divider></el-divider>
    <template>
      <el-table
        :data="tableData.filter(data => !search || data.sno.toLowerCase().includes(search.toLowerCase()) || data.sname.toLowerCase().includes(search.toLowerCase()))"
        border
        style="width: 100%">
        <el-table-column
          prop="sno"
          label="学号"
          width="250">
        </el-table-column>
        <el-table-column
          prop="sname"
          label="姓名"
          width="250">
        </el-table-column>
        <el-table-column
          prop="ssex"
          label="性别"
          width="250">
        </el-table-column>
        <el-table-column
          prop="sage"
          label="年龄"
          width="250">
        </el-table-column>
        <el-table-column
          prop="sdept"
          label="所在系"
          width="250">
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="500">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-user" size="small" @click="editStudent(scope.row)">学生</el-button>
<!--            <el-divider direction="vertical"></el-divider>-->
<!--            <el-popover-->
<!--              placement="left"-->
<!--              width="450"-->
<!--              trigger="click">-->
<!--              <el-table :data="stuCourse">-->
<!--                <el-table-column width="150" property="cname" label="课程"/>-->
<!--                <el-table-column width="150" property="grade" label="分数"></el-table-column>-->
<!--                <el-table-column width="150">-->
<!--                  <el-button type="primary" icon="el-icon-edit" circle @click="dialogVisible = true"></el-button>-->
<!--                </el-table-column>-->
<!--              </el-table>-->
<!--              <el-button slot="reference" type="success" size="small" @click="checkstucourse(scope.row)">查看课程</el-button>-->
<!--            </el-popover>-->
            <el-divider direction="vertical"></el-divider>
            <el-button type="primary" icon="el-icon-star-off" size="small" @click="checkstucourse(scope.row); dialogVisible1 = true; temp.sno = scope.row.sno">课程</el-button>
          </template>
        </el-table-column>s
      </el-table>
    </template>
    <el-drawer
      title="添加学生"
      :visible.sync="drawer"
      :with-header="true">
      <el-form ref="form" :model="add" label-width="80px">
        <el-form-item label="学号" style="width: 80%;">
          <el-input v-model="add.sno" ></el-input>
        </el-form-item>
        <el-form-item label="姓名" style="width: 80%;">
          <el-input v-model="add.sname"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="add.ssex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院系" style="width: 80%;">
          <el-input v-model="add.sdept" ></el-input>
        </el-form-item>
        <el-form-item label="年龄" style="width: 80%;">
          <el-input v-model="add.sage"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="stu_add()">添加</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
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
    <el-dialog
      title="学生课程信息"
      :visible.sync="dialogVisible1"
      width="40%">
      <span>
        <el-table :data="stuCourse">
          <el-table-column width="100" property="cno" label="课程号"></el-table-column>
          <el-table-column width="150" property="cname" label="课程"></el-table-column>
          <el-table-column width="150" property="grade" label="分数"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-table-column width="150">
                <el-button type="primary" icon="el-icon-edit" circle @click="dialogVisible = true; temp.cno = scope.row.cno; temp.grade = scope.row.grade"></el-button>
              </el-table-column>
            </template>
          </el-table-column>
        </el-table>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible1 = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { checkStuCourse, editGrade, getStudent } from '@/api/table'
import { addStudent } from '@/api/record'

export default {
  data() {
    return {
      tableData: null,
      drawer: false,
      search: '',
      add: {
        sno: null,
        sname: null,
        ssex: null,
        sdept: null,
        sage: null
      },
      stuCourse: {
        cno: null,
        cname: null,
        grade: null
      },
      temp: {
        sno: null,
        cno: null,
        grade: null
      },
      dialogVisible: false,
      dialogVisible1: false,
      gradeinput: null
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
        path: '/Student/Update',
        query: {
          sno: row.sno
        }
      })
    },
    stu_add() {
      addStudent(this.add).then(() => {
        this.$alert('添加成功！', '消息', {
          confirmButtonText: '确认',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },
    checkstucourse(row) {
      checkStuCourse({ sno: row.sno }).then(response => {
        this.stuCourse = response.data
        this.tempsno = row.sno
      })
    },
    editgrade() {
      editGrade(this.temp).then(() => {
        this.$alert('修改成功！', '消息', {
          confirmButtonText: '确认'
        })
      })
    }
  }
}
</script>
