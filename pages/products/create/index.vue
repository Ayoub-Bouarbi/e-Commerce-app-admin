<template>
  <el-main class="bg-gray-200">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'products' }">Products</el-breadcrumb-item>
      <el-breadcrumb-item>Create</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt-5" shadow="never">
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
                <el-option v-for="brand in brands" :key="brand.id" :label="brand.name" :value="brand.id"></el-option>
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
          <el-input v-model="form.description" type="textarea" placeholder="please type product description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.status">Status</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.featured">Featured</el-checkbox>
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
  import GET_CATEGORIES from '@/graphql/queries/category/categoriesExcept.gql';
  import GET_BRANDS from '@/graphql/queries/brand/brands.gql';
  import CREATE_PRODUCT from '@/graphql/mutations/product/createProduct.gql';

  export default {
    data() {
      return {
        form: {
          name: '',
          sku: '',
          price: 0,
          sale_price: 0,
          brand_id: null,
          categories_id: [],
          quantity: 0,
          weight: 0,
          description: '',
          status: false,
          featured: false,
        },
        brands: [],
        categories: []
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
    methods: {
      onCancel() {
        this.$router.push({
          name: 'products'
        });
      },
      onSubmit() {
        this.$apollo.mutate({
            mutation: CREATE_PRODUCT,
            variables: {
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
