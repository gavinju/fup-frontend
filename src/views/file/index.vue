<template>
  <div class="home">
    <Card>
      <Row style="margin-bottom: 20px" @keydown.enter.native="getList">
        <Col span="6" style="display: flex">
          <Input style="width: 300px" v-model="searchForm.description" placeholder="请输入文件描述" clearable></Input>
        </Col>
        <Col span="18" style="display: flex; gap: 10px">
          <Button type="primary" @click="getList">搜索</Button>
          <Button @click="addVisible = true" type="success" icon="ios-cloud-upload-outline">文件上传</Button>
        </Col>
      </Row>
      <Table border :columns="columns" :data="tableData"></Table>
      <Row type="flex" justify="end" class="page">
        <Page
          :current="searchForm.current"
          :total="total"
          :page-size="searchForm.pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[10, 20, 50]"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>
    </Card>

    <Drawer :closable="false" width="640" title="文件上传" v-model="addVisible" closable>
      <Form :model="formData">
        <Row :gutter="32">
          <FormItem label="类型" label-position="top" style="width: 95%; margin-left: 18px">
            <Select v-model="formData.type" placeholder="请选择类型">              
              <Option value="文件">文件</Option>              
            </Select>
          </FormItem>
        </Row>
        <FormItem label="文件描述" label-position="top">
          <Input type="textarea" v-model="formData.description" :rows="4" placeholder="请输入文件描述" />
        </FormItem>
        <FormItem>
          <div>
            <Upload multiple type="drag" :before-upload="handleUpload" action="/api/file/upload">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击这里文件上传或将文件拖拽到这里上传</p>
              </div>
            </Upload>
            <div v-if="uploadFile !== null">上传文件: {{ uploadFile.name }}</div>
          </div>
        </FormItem>
      </Form>
      <div class="drawer-footer">
        <Button style="margin-right: 8px" @click="addVisible = false" type="error">清空文件</Button>
        <Button type="primary" @click="doUploadFile" :loading="loadingUpload">确认上传</Button>
      </div>
    </Drawer>

    <Modal v-model="picVisible" title="图片预览" footer-hide draggable>
      <img :src="infoForm.url" alt="无效的图片链接" style="width: 100%; margin: 0 auto; display: block" />
    </Modal>

    <Modal v-model="updateVisible" title="修改" width="350px" @on-cancel="updateVisible = false">
      <Form ref="dataForm" :model="currentRow">
        <FormItem prop="description" label="描述">
          <Input type="text" v-model="currentRow.description" placeholder="请输入" clearable style="width: 200px" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="updateVisible = false">取消</Button>
        <Button type="primary" @click="handleUpdate">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { deleteFile, getListFileByPage, updateFile, uploadFile } from '@/api/file'
import { saveAs } from 'file-saver'
import Update from './Update'

export default {
  name: 'HomeView',
  components: {
    Update,
  },
  data() {
    return {
      searchForm: {},
      tableData: [],
      total: 0,
      picVisible: false, //图片预览
      infoForm: {}, //图片信息
      addVisible: false, //文件上传窗口
      // 文件上传表单
      formData: {
        type: '文件',
        description: '',
      },
      uploadFile: null,
      loadingUpload: false,
      currentRow: {},
      updateVisible: false,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: 'left',
        },
        {
          title: '文件',
          key: 'url',
          fixed: 'left',
          render: (h, params) => {
            if (params.row.type === '文件') {
              return h('a', {}, '文件')
            } else {
              return h('img', {
                attrs: {
                  src: params.row.url,
                  alt: '加载图片失败',
                },
                style: {
                  cursor: 'pointer',
                  width: '40px',
                  height: '40px',
                  'margin-top': '5px',
                  'object-fit': 'contain',
                },
                on: {
                  click: () => {
                    this.showPic(params.row)
                  },
                },
              })
            }
          },
        },
        {
          title: '大小(B)',
          key: 'size',
          sortable: true,
        },
        {
          title: '描述',
          key: 'description',
        },
        {
          title: '分类',
          key: 'type',
          filters: [
            {
              label: '图片',
              value: '图片',
            },
            {
              label: '文件',
              value: '文件',
            },
          ],
          filterMethod(value, row) {
            if (value === '' || value === null) {
              return true
            }
            return row.type && row.type.indexOf(value) > -1
          },
        },
        {
          title: '创建时间',
          key: 'createTime',
          sortable: true,
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h(
                'a',
                {
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.download(params.row)
                    },
                  },
                },
                '下载',
              ),
              h(
                'a',
                {
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.copyUrl(params.row)
                    },
                  },
                },
                '复制链接',
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small',
                    ghost: true,
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    },
                  },
                },
                '删除',
              ),
            ])
          },
        },
      ],
    }
  },
  methods: {
    async getList() {
      const res = await getListFileByPage(this.searchForm)
      if (res.code === 0) {
        this.tableData = res.data.records
        this.total = res.data.total
      }
    },
    showPic(v) {
      this.infoForm.url = v.url
      this.picVisible = true
    },
    download(v) {
      // 用file-server实现下载文件v.url
      const fileUrl = v.url
      const suffix = fileUrl.substring(fileUrl.lastIndexOf('.'))

      const xhr = new XMLHttpRequest()
      xhr.open('GET', v.url, true)
      xhr.responseType = 'blob'

      xhr.onload = function () {
        if (xhr.status === 200) {
          // 时间戳.文件(可根据实际情况更改文件名)
          const fileName = new Date().getTime() + suffix
          saveAs(xhr.response, fileName)
        }
      }
      xhr.send()
    },
    handleUpload(file) {
      this.uploadFile = file
      return false
    },
    async doUploadFile() {
      this.loadingUpload = true
      try {
        const formData = new FormData()
        formData.append('uploadFile', this.uploadFile)
        formData.append('type', this.formData.type)
        formData.append('description', this.formData.description)

        const res = await uploadFile(formData)
        if (res.code === 0) {
          this.$Message.success('上传成功')
        }
        this.uploadFile = null
        this.formData = {}
      } catch (error) {
        console.error(error)
      } finally {
        this.loadingUpload = false
        this.addVisible = false
        await this.getList()
      }
    },
    copyUrl(row) {
      this.$copyText(row.url).then(() => {
        this.$Message.success('复制成功')
      })
    },
    update(row) {
      // 创建当前行数据的一个深拷贝，防止直接修改原始数据
      this.currentRow = JSON.parse(JSON.stringify(row))
      this.updateVisible = true
    },
    async handleUpdate() {
      const res = await updateFile(this.currentRow)
      if (res.code === 0) {
        this.$Message.success('操作成功')
        this.$emit('close')
      } else {
        this.$Message.error('操作失败' + res.message)
      }
      this.updateVisible = false
    },
    remove(row) {
      this.$Modal.confirm({
        title: '正在删除',
        content: '确定删除文件吗？',
        onOk: async () => {
          const res = await deleteFile({ id: row.id })
          if (res.code === 0) {
            this.$Message.success('删除成功')
            await this.getList()
          }
        },
      })
    },
    changePage(v) {
      this.searchForm.current = v
      this.getList()
    },
    changePageSize(v) {
      this.searchForm.pageSize = v
      this.getList()
    },
  },
  mounted() {
    this.getList()
  },
}
</script>

<style>
.drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
