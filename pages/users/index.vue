<template>
  <el-main class="bg-gray-200">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item>Users</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt-5" shadow="never">
      <nuxt-link class="float-right mb-3" :to="{name: 'users-create'}">
        <el-button size="small">Add</el-button>
      </nuxt-link>
      <el-table border empty-text="There is no data to display" size="small"
        :data="usersList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
        <el-table-column label="First Name" prop="first_name">
        </el-table-column>
        <el-table-column label="Last Name" prop="last_name">
        </el-table-column>
        <el-table-column label="Email" prop="email">
        </el-table-column>
        <el-table-column label="Address" prop="address">
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
      <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="usersLength"
        @current-change="setPage">
      </el-pagination>
    </el-card>
  </el-main>
</template>

<script>
  import GET_USERS from '@/graphql/queries/user/users.gql';
  import DELETE_USER from '@/graphql/mutations/user/deleteUser.gql';

  export default {
    data() {
      return {
        users: [],
        search: '',
        page: 1,
        pageSize: 10
      }
    },
    apollo: {
      users: {
        prefetch: true,
        query: GET_USERS
      }
    },
    computed: {
      usersList() {
        return this.users.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      },
      usersLength() {
        return this.users.length;
      }
    },
    methods: {
      setPage(val) {
        this.page = val;
      },
      remove(index,user) {
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
                mutation: DELETE_USER,
                variables: {
                  id: user.id
                }
              }).then(() => {
                this.users.splice(index, 1);
                this.$swal('Deleted!', 'Your file has been deleted.', 'success');
              })
              .catch(() => {
                this.$toast.error('Error while deleting');
              });
          }
        });
      },
      edit(index,user) {
        this.$router.push({
          name: "users-edit-id",
          params: {
            id: user.id
          }
        });
      }
    },
  }

</script>
