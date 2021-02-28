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
          <el-input clearable v-model="form.name" placeholder="please type category name"></el-input>
        </el-form-item>
        <el-form-item class="w-1/2" label="Category Parent">
          <el-select clearable class="w-full" v-model="form.parent_id" placeholder="please select category parent">
            <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id">
            </el-option>
          </el-select>
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
  import UPDATE_CATEGORY from '@/graphql/mutations/category/updateCategory.gql';
  import GET_CATEGORY from '@/graphql/queries/category/category.gql';
  import CATEGORIES from '@/graphql/queries/category/categoriesExcept.gql';

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
        prefetch: true,
        variables() {
          return {
            id: this.$route.params.id
          }
        }
      }
    },
    created() {
      this.$apollo.query({
          query: GET_CATEGORY,
          variables: {
            id: this.$route.params.id
          }
        })
        .then(({ data }) => {
          this.form.name = data.category.name;
          this.form.parent_id = data.category.parent_id + '';
        });
    },
    methods: {
      onCancel() {
        this.$router.push({
          name: 'categories'
        });
      },
      onSubmit() {
        this.$apollo.mutate({
            mutation: UPDATE_CATEGORY,
            variables: {
              id: this.$route.params.id,
              input: this.form
            }
          })
          .then(() => {
            this.$toast.success('Successfully updated');
          }).catch(() => {
            this.$toast.error('Error while updating');
          });
      }
    },
  }

</script>
