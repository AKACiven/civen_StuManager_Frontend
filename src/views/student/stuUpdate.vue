<template>
  <div class="app-container">
    <el-form ref="form" :model="updateStu" label-width="80px">
      <el-form-item label="学号" style="width: 30%;">
        <el-input v-model="updateStu.sno" readonly></el-input>
      </el-form-item>
      <el-form-item label="姓名" style="width: 30%;">
        <el-input v-model="updateStu.sname"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="updateStu.ssex" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="院系" style="width: 30%;">
        <el-input v-model="updateStu.sdept" ></el-input>
      </el-form-item>
      <el-form-item label="年龄" style="width: 30%;">
        <el-input v-model="updateStu.sage"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="stu_update()">修改信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { checkStudent } from '@/api/table'
import { updateStudent } from '@/api/record'

export default {
  data() {
    return {
      updateStu: {
        sno: null,
        sname: null,
        ssex: null,
        sdept: null,
        sage: null
      }
    }
  },
  created() {
    if (this.$route.query.sno == null) {
      this.$alert('请先在学生列表进行操作！', '提示', {
        confirmButtonText: '前往学生列表',
        callback: action => {
          this.$router.push({
            path: '/Home'
          })
        }
      })
    } else {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      checkStudent({ sno: this.$route.query.sno }).then(response => {
        this.updateStu = response.data
      })
    },
    stu_update() {
      updateStudent(this.updateStu).then(() => {
        this.$alert('修改成功！', '消息', {
          confirmButtonText: '确认',
          callback: action => {
            this.$router.push({
              path: '/Home'
            })
          }
        })
      })
    }
  }
}
</script>
