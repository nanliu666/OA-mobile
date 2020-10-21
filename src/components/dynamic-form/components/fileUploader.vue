<template>
  <van-field
    name="uploader"
    input-align="left"
    v-bind="$attrs"
    :rules="[{ validator, message: `请选择${$attrs.label}` }]"
    validate-trigger="onChange"
  >
    <template #input>
      <van-uploader
        v-model="fileList"
        :disabled="disabled"
        accept="*"
        multiple
        :max-size="100 * 1024 * 1024"
        :after-read="uploaderRead"
        :before-read="beforeRead"
        @oversize="onOversize"
      >
        <div class="upload-box">
          <van-icon name="plus" />
        </div>
      </van-uploader>
      <ul class="uploader-ul">
        <li
          v-for="(item, index) in uploadList"
          :key="index"
          class="uploader-li"
        >
          <div class="li-left">
            <van-icon name="description" />
            <div class="li-title">
              {{ item.localName }}
            </div>
          </div>
          <van-icon
            name="delete"
            @click="deleteUpload(index)"
          />
        </li>
      </ul>
    </template>
  </van-field>
</template>
<script>
import { uploadQiniu } from '@/util/uploadQiniu'
export default {
  name: 'FileUpload',
  props: {
    disabled: {
      type: Boolean,
      default: false
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
      fileList: [],
      uploadList: [] // 用来传递参数
    }
  },
  watch: {
    uploadList: {
      handler() {
        this.$emit('input', this.uploadList)
      },
      deep: true
    }
  },
  created() {
    this.fileList = _.cloneDeep(this.value)
    this.uploadList = _.cloneDeep(this.value)
  },
  methods: {
    validator() {
      return this.uploadList.length !== 0
    },
    deleteUpload(index) {
      this.uploadList.splice(index, 1)
      this.fileList.splice(index, 1)
    },
    beforeRead(file) {
      let index = _.findIndex(this.uploadList, (item) => item.localName === file.name)
      if (index > -1) {
        this.$toast('已存在相同文件')
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
      this.$toast('文件大小不能超过100M')
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
/deep/ .van-field__control--custom {
  flex-direction: column;
  align-items: flex-start;
}
/deep/ .van-uploader__preview {
  display: none;
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
.uploader-ul {
  .uploader-li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100vw - 30px);
    .li-left {
      display: flex;
      align-items: center;
      .li-title {
        max-width: calc(100vw - 30px - 40px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
