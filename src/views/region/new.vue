<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="width"
    :before-close="dialogBeforeClose"
  >

    <div slot="title">新增地区</div>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item
        label="地区名称"
        prop="name"
      >
        <el-input
          v-model="info.name"
          placeholder="地区名称"
          maxlength="20"
          show-word-limit
        > </el-input>
      </el-form-item>
      <el-form-item
        label="编号"
        prop="no"
      >
        <el-input
          v-model="info.no"
          placeholder="地区编号"
          maxlength="20"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item
        label="人口"
        prop="population"
      >
        <el-input
          v-model="info.population"
          placeholder="地区人口"
          maxlength="20"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item
        label="备注"
        prop="memo"
      >
        <el-input
          type="textarea"
          v-model="info.memo"
          maxlength="100"
          show-word-limit
        ></el-input>
      </el-form-item>

    </el-form>

    <div slot="footer">
      <el-button
        type="info"
        @click="dialogClose"
      >取 消</el-button>
      <el-button
        type="primary"
        @click="createRegion"
      >创 建</el-button>
    </div>
  </el-dialog>

</template>

<script>
import { addRegion } from '@/interface/region'
export default {
  name: 'newInfo',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // visible: false,
      form: {},
      info: {
        name: '',
        no: '',
        population: '',
      },
      rules: {
        name: [{ required: true, message: '请填写地区名称', trigger: 'blur' }],
        no: [{ required: true, message: '请填写地区编号', trigger: 'blur' }],
        population: [
          { required: true, message: '请填写人口', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    dialogClose() {
      // this.dialogVisible = false
      this.$emit('dialogClosed')
      this.load()
    },
    dialogBeforeClose() {
      this.$emit('dialogClosed')
    },
    async createRegion() {
      debugger
      var response = await addRegion(this.info)
      debugger
      this.dialogClose()
    },
    load() {
      this.info = {
        name: '',
        no: '',
        population: '',
      }
    },
  },

  watch: {},
}
</script>