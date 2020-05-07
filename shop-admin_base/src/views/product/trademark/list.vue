<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 20px" @click="showAdd">添加</el-button>
    <el-table :data="trademarks" stripe border v-loading="loading">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="180">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" width="100px" height="60px" alt="LOGO">
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="warning" icon="el-icon-edit">修改</el-button>
          <el-button size="small" type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getTrademarks"
      :current-page="page"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->, sizes, total"
      :total="total"
      style="text-align:center;magin-top:20px"
      background>
    </el-pagination>
    <el-dialog title="添加" :visible="isShowDialog" :before-close="()=>isShowDialog=false">
      <el-form :model="form" style="width:80%">
        <el-form-item label="品牌名称" :label-width="formLabelWidth">
          <el-input v-model="form.tmName" autocomplete="off" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌Logo" :label-width="formLabelWidth">
          <!-- <img :src="form.logoUrl" alt="logo" /> -->
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="isShowDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TrademarkList',
  data() {
    return {
      // 当前品牌页的名称
      trademarks: [],
      // 总条数
      total: 0,
      // 当前的页码
      page: 1,
      // 每页显示的条数
      limit: 3,
      // 页面加载效果
      loading: false,
      // 不显示对话框
      isShowDialog: false,
      form: {
        // 品牌的名字
        tmName: '',
        // 品牌的图片路径
        logoUrl: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.getTrademarks()
  },
  methods: {
    async getTrademarks(page = 1) {
      // 设置页码
      this.page = page
      // 修改loading的值
      this.loading = true
      // 获取品牌信息列表
      const result = await this.$API.trademark.getTrademarkList(page, this.limit)
      // 再次修改loading的值
      this.loading = false
      if (result.code === 200) {
        // 成功
        console.log(result)
        const { records, total } = result.data
        // 更新状态数据
        this.trademarks = records
        this.total = total
      } else {
        // 失败,获取品牌列表失败
        this.$message({
          type: 'error',
          message: result.message || '获取品牌列表失败'
        })
      }
    },
    handleSizeChange(pageSize) {
      // console.log(`每页 ${pageSize} 条`)
      // 重新设置每页的条数
      this.limit = pageSize
      this.getTrademarks()
    },
    // handleCurrentChange(page) {
    //   console.log(`当前页: ${page}`)
    //   this.getTrademarks(page)
    // }
    // 添加数据
    showAdd() {
      // 显示对话框
      this.isShowDialog = true
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
