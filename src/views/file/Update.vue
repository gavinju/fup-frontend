<template>
  <div>
    <Modal v-model="innerVisible" title="修改" width="350px" @on-cancel="handleCancel">
      <Form ref="dataForm" :model="dataForm">
        <!--TODO 修改dataForm对象-->
        <FormItem prop="description" label="描述">
          <Input type="text" v-model="dataForm.description" placeholder="请输入" clearable style="width: 200px" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" @click="handleSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { updateFile } from '@/api/file'

export default {
  props: {
    visible: {
      type: Boolean,
      require: true,
    },
    dataForm: {
      type: Object,
    },
  },
  data() {
    return {
      innerVisible: this.visible,
      dataForm: {
        description: '',
      },
    }
  },
  watch: {
    visible(newValue) {
      this.innerVisible = newValue
    },
  },
  methods: {
    async handleSubmit() {
      console.log(this.dataForm)
      const res = await updateFile(this.dataForm)
      if (res.code === 0) {
        this.$Message.success('操作成功')
        this.$emit('close')
      } else {
        this.$Message.error('操作失败' + res.message)
      }
    },
    handleCancel() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped></style>
