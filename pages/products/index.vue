<template>
  <el-main class="bg-gray-200">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item>Products</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt-5" shadow="never">
      <nuxt-link class="float-right mb-3" :to="{name: 'products-create'}">
        <el-button size="small">Add</el-button>
      </nuxt-link>
      <el-table border empty-text="There is no data to display" size="small"
        :data="productsList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
        <el-table-column label="Sku" prop="sku">
        </el-table-column>
        <el-table-column label="Name" prop="name">
        </el-table-column>
        <el-table-column label="Categories" prop="categories">
          <template slot-scope="scope">
            <el-tag size="mini" class="mx-1" v-for="category in scope.row.Categories" :key="category.id" type="primary"
              disable-transitions>{{ category.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Status" prop="Brand">
          <template slot-scope="scope">
            <el-tag size="mini" type="success" disable-transitions>{{ scope.row.Brand.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.$index, scope.row)">Edit</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="productsLength" @current-change="setPage">
      </el-pagination>
    </el-card>
  </el-main>
</template>

<script>
  import GET_PRODUCTS from '@/graphql/queries/product/products.gql';
  import DELETE_PRODUCT from '@/graphql/mutations/product/deleteProduct.gql';

  export default {
    data() {
      return {
        products: [],
        search: '',
        page: 1,
        pageSize: 9
      }
    },
    apollo: {
      products: {
        prefetch: true,
        query: GET_PRODUCTS
      }
    },
    computed: {
      productsList() {
        return this.products.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      },
      productsLength() {
        return this.products.length;
      }
    },
    methods: {
      setPage(val) {
        this.page = val;
      },
      remove(index, product) {
        this.$confirm('This will permanently delete the recored. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          })
          .then(() => {
            this.$apollo.mutate({
                mutation: DELETE_PRODUCT,
                variables: {
                  id: product.id
                }
              }).then(() => {
                this.products.splice(index, 1);
                this.$message({
                  type: 'success',
                  message: 'Delete completed'
                });
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: 'Error while deleting'
                });
              });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Delete canceled'
            });
          });

      },
      edit(index, product) {
        this.$router.push({
          name: "products-edit-id",
          params: {
            id: product.id
          }
        });
      }
    },
  }

</script>
