<template>
  <el-main class="bg-gray-200">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'products' }">Products</el-breadcrumb-item>
      <el-breadcrumb-item>Edit</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs class="mt-5" type="border-card" v-model="active_tab">
      <el-tab-pane label="Product Information" name="first">
        <el-form ref="form" class="w-1/2" size="meduim" label-position="top" :model="form">
          <el-form-item label="Product Name">
            <el-input v-model="form.name" placeholder="please type product name"></el-input>
          </el-form-item>
          <el-row :gutter="12">
            <el-col :span="12">
              <el-form-item label="SKU">
                <el-input v-model="form.sku" placeholder="please type product sku"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Brand">
                <el-select class="w-full" v-model="form.brand_id" placeholder="please select product brand">
                  <el-option v-for="brand in brands" :key="brand.id" :label="brand.name" :value="brand.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="Categories">
            <el-select class="w-full" multiple v-model="form.categories_id"
              placeholder="please select product categories">
              <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Weight">
            <el-input v-model="form.weight" type="number"></el-input>
          </el-form-item>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="Price">
                <el-input v-model="form.price" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Sale Price">
                <el-input type="number" v-model="form.sale_price"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Quantity">
                <el-input v-model="form.quantity" type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="Description">
            <el-input v-model="form.description" type="textarea" placeholder="please type product description">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.status">Status</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.featured">Featured</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit">Save</el-button>
            <el-button @click="onCancel" size="small">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Product Images" name="second">
        <el-upload ref="upload" multiple :file-list="fileList" :limit="6" action="#" list-type="picture-card"
          :auto-upload="false">
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
        <el-button class="mt-5" type="primary" size="small" @click="onUpload">Upload</el-button>
        <el-button class="mt-5" type="danger" size="small" @click="clearFiles">Clear Files</el-button>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
  import GET_CATEGORIES from '@/graphql/queries/category/categoriesExcept.gql';
  import GET_BRANDS from '@/graphql/queries/brand/brands.gql';
  import UPDATE_PRODUCT from '@/graphql/mutations/product/updateProduct.gql';
  import GET_PRODUCT from '@/graphql/queries/product/product.gql';
  import UPLOAD_PRODUCT_IMAGE from '@/graphql/mutations/product/uploadProductImage.gql';
  import DELETE_PRODUCT_IMAGE from '@/graphql/mutations/product/deleteProductImage.gql';
  import {
    pluck
  } from 'ramda';

  export default {
    data() {
      return {
        form: {
          name: '',
          sku: '',
          price: 0,
          sale_price: 0,
          brand_id: 0,
          categories_id: [],
          quantity: 0,
          weight: 0,
          description: '',
          status: false,
          featured: false,
          product_images: [],
        },
        active_tab: 'first',
        brands: [],
        categories: [],
        dialogImageUrl: '',
        dialogVisible: false,
      }
    },
    apollo: {
      categories: {
        prefetch: true,
        query: GET_CATEGORIES,
        variables() {
          return {
            id: 1
          }
        }
      },
      brands: {
        prefetch: true,
        query: GET_BRANDS
      }
    },
    created() {
      this.$apollo.query({
          query: GET_PRODUCT,
          variables: {
            id: this.$route.params.id
          },
        })
        .then(({
          data
        }) => {
          this.form.name = data.product.name;
          this.form.sku = data.product.sku;
          this.form.price = data.product.price;
          this.form.sale_price = data.product.sale_price;
          this.form.status = data.product.status;
          this.form.weight = data.product.weight;
          this.form.quantity = data.product.quantity;
          this.form.featured = data.product.featured;
          this.form.brand_id = data.product.Brand.id;
          this.form.description = data.product.description;
          this.form.categories_id = pluck('id', data.product.Categories);
          this.form.product_images = data.product.Images;
        });
    },
    computed: {
      fileList() {
        let images = [];
        this.form.product_images.forEach((image) => {
          images.push({
            name: image.image,
            url: "http://app-api.test/storage/uploads/products/" + image.image
          });
        })

        return images;
      }
    },
    methods: {
      onUpload() {
        let files = pluck('raw', this.$refs.upload.uploadFiles);
        this.$apollo.mutate({
            mutation: UPLOAD_PRODUCT_IMAGE,
            variables: {
              input: {
                images: files,
                product_id: this.$route.params.id
              }
            }
          })
          .then(() => {
            this.$notify({
              title: 'Success',
              message: 'Successfully Uploaded',
              type: 'success'
            });
          }).catch(() => {
            this.$notify({
              title: 'Error',
              message: 'Error while Uploading',
              type: 'error'
            });
          });
      },
      clearFiles() {
        this.$apollo.mutate({
            mutation: DELETE_PRODUCT_IMAGE,
            variables: {
              id: this.$route.params.id
            }
          })
          .then(() => {
            this.$notify({
              title: 'Success',
              message: 'Successfully Deleted',
              type: 'success'
            });
            this.$refs.upload.clearFiles();
          }).catch(() => {
            this.$notify({
              title: 'Error',
              message: 'Error while Deleting',
              type: 'error'
            });
          });
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      onCancel() {
        this.$router.push({
          name: 'products'
        });
      },
      onSubmit() {
        this.$apollo.mutate({
            mutation: UPDATE_PRODUCT,
            variables: {
              id: this.$route.params.id,
              input: {
                name: this.form.name,
                sku: this.form.sku,
                price: this.form.price,
                sale_price: this.form.sale_price,
                brand_id: this.form.brand_id,
                categories_id: this.form.categories_id,
                quantity: this.form.quantity,
                weight: this.form.weight,
                description: this.form.description,
                status: this.form.status,
                featured: this.form.featured
              }
            }
          })
          .then(() => {
            this.$notify({
              title: 'Success',
              message: 'Successfully Updated',
              type: 'success'
            });
          }).catch(() => {
            this.$notify({
              title: 'Error',
              message: 'Error while Updating',
              type: 'error'
            });
          });
      }
    },
  }

</script>
