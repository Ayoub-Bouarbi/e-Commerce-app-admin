<template>
  <el-main class="bg-gray-200">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item>Brands</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt-5" shadow="never">
      <nuxt-link class="float-right mb-3" :to="{name: 'brands-create'}">
        <el-button size="small">Add</el-button>
      </nuxt-link>
      <el-table border empty-text="There is no data to display" size="small" max-height="480"
        :data="brandsList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
        <el-table-column label="Name" prop="name">
        </el-table-column>
        <el-table-column label="Slug" prop="slug">
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
      <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="brandsLength"
        @current-change="setPage">
      </el-pagination>
    </el-card>
  </el-main>
</template>

<script>
  import GET_BRANDS from '@/graphql/queries/brand/brands.gql';
  import DELETE_BRAND from '@/graphql/mutations/brand/deleteBrand.gql';

  export default {
    data() {
      return {
        brands: [],
        search: '',
        page: 1,
        pageSize: 10
      }
    },
    apollo: {
      brands: {
        prefetch: true,
        query: GET_BRANDS
      }
    },
    computed: {
      brandsList() {
        return this.brands.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      },
      brandsLength() {
        return this.brands.length;
      }
    },
    methods: {
      setPage(val) {
        this.page = val;
      },
      remove(index,brand) {
        this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$apollo.mutate({
                mutation: DELETE_BRAND,
                variables: {
                  id: brand.id
                }
              }).then(() => {
                this.brands.splice(index, 1);
                this.$swal('Deleted!', 'Your file has been deleted.', 'success');
              })
              .catch(() => {
                this.$toast.error('Error while deleting');
              });
          }
        });
      },
      edit(index,brand) {
        this.$router.push({
          name: "brands-edit-id",
          params: {
            id: brand.id
          }
        });
      }
    },
  }

</script>
