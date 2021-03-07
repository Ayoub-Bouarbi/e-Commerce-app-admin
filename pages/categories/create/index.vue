<template>
  <el-main class="bg-gray-200">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'categories' }">Categories</el-breadcrumb-item>
      <el-breadcrumb-item>Create</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt-5" shadow="never">
      <el-form ref="form" size="meduim" label-position="top" :model="form">
        <el-form-item class="w-1/2" label="Category Name">
          <el-input v-model="form.name" placeholder="please type category name"></el-input>
        </el-form-item>
        <el-form-item class="w-1/2" label="Category Parent">
          <el-select class="w-full" v-model="form.parent_id" placeholder="please select category parent">
            <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id">
            </el-option>
          </el-select>
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
  import CREATE_CATEGORY from '@/graphql/mutations/category/createCategory.gql';
  import CATEGORIES from '@/graphql/queries/category/categories.gql';

  export default {
    data() {
      return {
        form: {
          name: '',
          parent_id: null
        },
        categories: []
      }
    },
    apollo: {
      categories: {
        query: CATEGORIES,
        prefetch: true
      }
    },
    methods: {
      onCancel() {
        this.$router.push({
          name: 'categories'
        });
      },
      onSubmit() {
        this.$apollo.mutate({
            mutation: CREATE_CATEGORY,
            variables: {
              input: this.form
            }
          })
          .then(({ data }) => {
            this.$notify({
              title: 'Success',
              message: 'Successfully created',
              type: 'success'
            });
            this.categories.push(data.category);
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
