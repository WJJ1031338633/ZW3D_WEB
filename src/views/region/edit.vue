<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="width"
    :before-close="dialogBeforeClose"
  >
    <div slot="title">编辑</div>
    <el-form
      ref="info"
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
    <span slot="footer">
      <el-button
        type="info"
        @click="dialogClose"
      >取 消</el-button>
      <el-button
        type="primary"
        @click="updateRegion"
      >更 新</el-button>
    </span>
  </el-dialog>

</template>

<script>
import { update } from '@/interface/region'
export default {
  name: 'editInfo',
  props: {
    id: {
      type: Boolean,
      default: undefined,
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    region: { type: Object, default: {} },
  },
  data() {
    return {
      form: {},
      info: {
        name: '',
        no: '',
        population: '',
      },
      rules: {
        name: [{ required: true, message: '请填写地区名称', trigger: 'blur' }],
        no: [{ required: true, message: '请填写地区编号', trigger: 'blur' }],
        population: [{ required: true }],
      },
    }
  },

  methods: {
    load() {
      this.info = this.region
    },
    dialogClose() {
      // this.dialogVisible = false
      this.$emit('dialogClosed')
    },
    dialogBeforeClose() {
      this.$emit('dialogClosed')
    },
    async updateRegion() {
      debugger

      var response = await update('ModelRegion', this.info)
      debugger
      console.log(response)
      this.$emit('dialogClosed')
    },
  },
  watch: {
    dialogVisible(newV, oldV) {
      console.log(newV)
      debugger
      if (newV == true) {
        this.load()
      }
    },
  },
}
</script>