<template>
  <div class="hello">
    <el-row
      :gutter="10"
      type="flex"
    >
      <el-card>
        <el-form
          :inline="true"
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="地区名称">
            <el-input
              v-model="queryInfo.query['name%']"
              placeholder="name"
            ></el-input>
          </el-form-item>
          <el-form-item label="地区编号">
            <el-input
              v-model="queryInfo.query['no%']"
              placeholder="no"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="form.order[1]"
              placeholder="选择排序"
              clearable
              @change="orderChange($event)"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="form.order[0]"
              placeholder="优先"
            >
              <el-option
                v-for="item in secondOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >

              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="load()"
              style="margin-right:10px"
            >查 询</el-button>
            <el-button
              type="info"
              @click="reset()"
              style="margin-right:10px"
            >重 置</el-button>
            </el-button>
            <el-button
              type="success"
              style="margin-right:10px"
              @click="onShowNewInfo()"
            >创 建</el-button>
            </el-button>

          </el-form-item>
        </el-form>
        </el-col>
      </el-card>
    </el-row>
    <el-row
      :gutter="10"
      type="flex"
    >
      <div>
        <el-row :gutter="10">
          <el-card>
            <el-table :data="dataRegion">
              <el-table-column
                prop="name"
                label="地区"
                width="160"
              >

              </el-table-column>
              <el-table-column
                prop="no"
                label="编号"
                width="140
                "
              >
              </el-table-column>
              <el-table-column
                prop="population"
                label="人口"
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="updated_time"
                label="更新日期"
                width="220 "
              >
              </el-table-column>
              <el-table-column
                prop=""
                label="操作"
                width="240"
              >
                <template slot-scope="scope">

                  <el-card
                    shadow="hover"
                    :body-style="{ padding: '10px' }"
                  >

                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      style="margin-right:5px"
                      @click="onShowEditInfo(scope.row)"
                    >编 辑</el-button>
                    <el-popconfirm
                      confirm-button-text='删除'
                      cancel-button-text='按错了'
                      icon="el-icon-info"
                      icon-color="red"
                      title="确定要删除地区信息吗？"
                      @confirm="deleteRegion(scope.row)"
                    >
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        slot="reference"
                        style="margin-right:5px"
                      >删 除</el-button>
                    </el-popconfirm>
                  </el-card>

                </template>
              </el-table-column>

            </el-table>
          </el-card>
        </el-row>
        <el-row
          :gutter="10"
          type="flex"
          justify="center"
        >
          <el-card>
            <el-pagination
              @current-change="handlerCurrentChange()"
              @size-change="handlerSizeChange()"
              layout="sizes,total,prev, pager, next,jumper"
              :total="pageTotal"
              :page-sizes="[5, 10, 15, 30]"
              :page-size.sync="pageSize"
              :current-page.sync="pageNumber"
            >
            </el-pagination>

          </el-card>
        </el-row>
      </div>

    </el-row>

    <new-info
      :dialog-visible="newInfoVisible"
      @dialogClosed="offShowNewInfo()"
    ></new-info>
    <edit-info
      :id="selectedId"
      :dialog-visible="editInfoVisible"
      :region="editInfo"
      @dialogClosed="offShowEditInfo()"
    ></edit-info>
  </div>
</template>

<script>
import editInfo from '@/views/region/edit'
import newInfo from '@/views/region/new'
import { update, query } from '@/interface/region'
export default {
  name: 'Region',
  data() {
    return {
      pageTotal: 0,
      pageNumber: 1,
      pageSize: 5,
      selectedId: '',
      newInfoVisible: false,
      editInfoVisible: false,
      queryInfo: {
        limit: 20,
        skip: 0,
        structure: ['*'],
        query: {
          status: true,
        },
        order: [],
      },
      editInfo: {},
      form: {
        order: ['', ''],
      },
      dataRegion: [
        {
          id: '',
          name: '广州',
          no: 1,
          population: 54656,
        },
      ],
      updateRegion: {
        id: '',
        name: '',
        no: 0,
        population: 0,
        status: true,
      },
      secondOptions: [],
      options: [
        {
          value: 'update_time',
          label: '时间',
          order: [
            {
              label: '升序',
              value: '+',
            },
            {
              label: '降序',
              value: '-',
            },
          ],
        },
        {
          value: 'name',
          label: '名称',
          order: [
            {
              label: '升序',
              value: '+',
            },
            {
              label: '降序',
              value: '-',
            },
          ],
        },
        {
          value: 'no',
          label: '编号',
          order: [
            {
              label: '升序',
              value: '+',
            },
            {
              label: '降序',
              value: '-',
            },
          ],
        },
        {
          value: 'population',
          label: '人口',
          order: [
            {
              label: '升序',
              value: '+',
            },
            {
              label: '降序',
              value: '-',
            },
          ],
        },
      ],
    }
  },
  methods: {
    async load() {
      debugger
      var order = this.form.order[0] + this.form.order[1].value
      if (order !== '') {
        this.queryInfo.order[0] = order
      }
      this.queryInfo.limit = this.pageSize
      this.queryInfo.skip = (this.pageNumber - 1) * this.pageSize
      debugger
      var data = await query('ModelRegion', this.queryInfo)
      this.dataRegion = data.data.data
      this.pageTotal = data.data.total
      debugger
    },
    async reset() {
      debugger
      this.queryInfo = {
        limit: 20,
        skip: 0,
        structure: ['*'],
        query: {
          status: true,
        },
        order: [],
      }
      this.form = {
        order: ['', ''],
      }
      this.load()
    },
    onShowNewInfo() {
      // debugger
      this.newInfoVisible = true
      // debugger
    },
    offShowNewInfo() {
      this.newInfoVisible = false
      this.load()
    },
    onShowEditInfo(row) {
      this.editInfo = row
      this.editInfoVisible = true
    },
    offShowEditInfo() {
      this.editInfo = {}
      this.editInfoVisible = false
      this.load()
    },
    async deleteRegion(row) {
      debugger
      this.updateRegion = row
      this.updateRegion.status = false
      var response = await update('ModelRegion', this.updateRegion)
      debugger
      // alert(response)
      this.load()
    },
    handlerCurrentChange() {
      this.queryInfo.limit = this.pageSize
      this.queryInfo.skip = (this.pageNumber - 1) * this.pageSize
      this.load()
    },
    handlerSizeChange() {
      debugger
      this.queryInfo.limit = this.pageSize
      this.queryInfo.skip = (this.pageNumber - 1) * this.pageSize
      this.load()
    },
    orderChange(event) {
      debugger
      if (event !== '') {
        this.secondOptions = event.order
        this.form.order[0] = this.secondOptions[0].value
      } else {
        this.secondOptions = []
        this.form.order[0] = ''
      }
    },
  },
  mounted: function () {
    this.load()
  },
  components: { editInfo, newInfo },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  text-align: center;
}
button {
  height: 100%;
}
a {
  color: #721be4;
}
.el-card {
  display: flex;
  background-color: #f3c6eb;
}
.el-button {
  margin: auto;
}
.el-row {
  margin-bottom: 20px;
  display: flex;
}
.el-col {
  background-color: #58e9c5;
  display: flex;
  align-items: center;
}
.el-table {
  width: 100%;
  height: 100%;
}

.el-select {
  width: 120px;
}
</style>
