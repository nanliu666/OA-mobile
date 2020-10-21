<template>
  <van-field
    name="uploader"
    input-align="left"
    v-bind="$attrs"
    :rules="rules"
  >
    <template #input>
      <van-uploader
        v-model="fileList"
        :disabled="disabled"
        multiple
        :max-count="limit"
        :max-size="2 * 1024 * 1024"
        :after-read="uploaderRead"
        :before-read="beforeRead"
        :before-delete="beforeDelete"
        @oversize="onOversize"
      >
        <div class="upload-box">
          <van-icon name="plus" />
        </div>
      </van-uploader>
    </template>
  </van-field>
</template>
<script>
import { uploadQiniu } from '@/util/uploadQiniu'
export default {
  name: 'ImageUpload',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 0
    },
    rules: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      uploadList: [], // 用来传递参数
      fileList: [] // 用来呈现当前，初始化
    }
  },
  watch: {
    fileList: {
      handler() {
        this.$emit('input', this.uploadList)
      },
      deep: true
    }
  },
  created() {
    this.fileList = _.cloneDeep(this.value)
  },
  methods: {
    beforeDelete(file) {
      let index = _.findIndex(this.uploadList, (item) => item.localName === file.file.name)
      if (index > -1) this.uploadList.splice(index, 1)
      this.fileList.splice(index, 1)
    },
    beforeRead(file) {
      const TYPE_LIST = ['image/jpeg', 'image/jpg', 'image/png']
      const isJPG = _.some(TYPE_LIST, (item) => file.type === item)
      if (!isJPG) {
        this.$toast('上传图片只能是jpeg/jpg/png格式之一!')
        return false
      }
      let index = _.findIndex(this.uploadList, (item) => item.localName === file.name)
      if (index > -1) {
        this.$toast('已存在相同图片')
        return false
      }
      return true
    },
    uploaderRead(file) {
      let that = this
      file.status = 'uploading'
      file.message = '上传中...'
      uploadQiniu(file.file, {
        error() {
          this.$toast('上传失败')
          file.status = 'failed'
          file.message = '上传失败'
        },
        complete(data) {
          file.status = 'done'
          file.message = '上传成功'
          that.uploadList.push({ url: data.url, localName: file.file.name })
        }
      })
    },
    onOversize() {
      this.$toast('文件大小不能超过2M')
    }
  }
}
</script>

<style lang="less" scoped>
.van-field {
  flex-direction: column;
}
/deep/ .van-cell__title {
  margin-bottom: 4px;
}
.upload-box {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f8fa;
  margin-bottom: 8px;
  .van-icon {
    font-size: 24px;
  }
}
</style>
