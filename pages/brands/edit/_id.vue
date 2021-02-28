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
          <el-upload ref="upload" action="#" :file-list="fileList" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">Save</el-button>
          <el-button @click="onCancel" size="small">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-main>
</template>

<script>
  import UPDATE_BRAND from '@/graphql/mutations/brand/updateBrand.gql';
  import GET_BRAND from '@/graphql/queries/brand/brand.gql';
  import DELETE_BRAND_IMAGE from '@/graphql/mutations/brand/deleteBrandImage.gql';
  import {
    pluck
  } from 'ramda';


  export default {
    data() {
      return {
        form: {
          name: '',
        },
        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false,
      }
    },
    created() {
      this.$apollo.query({
          query: GET_BRAND,
          prefetch: true,
          variables: {
            id: this.$route.params.id
          }
        })
        .then(({
          data
        }) => {
          this.form.name = data.brand.name;
          if(data.brand.logo != null){
            this.fileList.push({
              name: data.brand.logo,
              url: "http://app-api.test/storage/uploads/brands/" + data.brand.logo
            });
          }
        });
    },
    methods: {
      onCancel() {
        this.$router.push({
          name: 'brands'
        });
      },
      // handleRemove(file) {
      //   this.$apollo.mutate({
      //       mutation: DELETE_BRAND_IMAGE,
      //       variables: {
      //         id: this.$route.params.id
      //       }
      //     }).then(() => {
      //       this.fileList.splice(0, 1);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      onSubmit() {
        let file = pluck('raw', this.$refs.upload.uploadFiles);

        this.$apollo.mutate({
            mutation: UPDATE_BRAND,
            variables: {
              id: this.$route.params.id,
              input: {
                name: this.name,
                logo: file
              }
            }
          })
          .then(() => {
            this.$toast.success('Successfully updated');
          }).catch(() => {
            this.$toast.error('Error while updating');
          });
      },
    },
  }

</script>
