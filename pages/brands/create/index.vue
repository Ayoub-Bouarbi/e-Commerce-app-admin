<template>
  <el-main class="bg-gray-200">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'brands' }">Brands</el-breadcrumb-item>
      <el-breadcrumb-item>Create</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt-5" shadow="never">
      <el-form ref="form" size="meduim" label-position="top" :model="form">
        <el-form-item class="w-1/2" label="Brand Name">
          <el-input v-model="form.name" placeholder="please type brand name"></el-input>
        </el-form-item>
        <el-form-item class="w-1/2" label="Brand Image">
          <el-upload ref="upload" :file-list="fileList" action="#" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">Create</el-button>
          <el-button @click="onCancel" size="small">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-main>
</template>

<script>
  import CREATE_BRAND from '@/graphql//mutations/brand/createBrand.gql';
  const R = require('ramda');

  export default {
    data() {
      return {
        form: {
          name: '',
        },
        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false
      }
    },
    methods: {
      onCancel() {
        this.$router.push({
          name: 'brands'
        });
      },
      handleRemove(file) {
        this.fileList.splice(0, 1);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      onSubmit() {
        let file = R.pluck('raw', this.$refs.upload.uploadFiles);

        this.$apollo.mutate({
            mutation: CREATE_BRAND,
            variables: {
              input: {
                name: this.name,
                logo: file
              }
            }
          })
          .then(() => {
            this.$notify({
              title: 'Success',
              message: 'Successfully created',
              type: 'success'
            });
          }).catch(() => {
            this.$notify({
              title: 'Error',
              message: 'Error while creating',
              type: 'error'
            });
          });
      }
    },
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
    border-color: #409EFF;
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
