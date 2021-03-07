<template>

  <el-main class="bg-gray-200">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item>Orders</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt-5" shadow="never">
      <el-table border empty-text="There is no data to display" size="small" max-height="480"
        :data="ordersList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
        <el-table-column type="expand">
          <template slot-scope="props">
            <p>State: {{ props.row.state }}</p>
            <p>City: {{ props.row.city }}</p>
            <p>Address: {{ props.row.address }}</p>
            <p>Zip: {{ props.row.zip_code }}</p>
            <p>Country: {{ props.row.country }}</p>
            <p>Phone Number: {{ props.row.phone_number }}</p>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="order_number">
        </el-table-column>
        <el-table-column label="Placed By" prop="user">
          <template slot-scope="{row}">
            <span>{{ row.User.first_name + ' ' + row.User.last_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Date" prop="created_at">
          <template slot-scope="{row}">
            <el-tag size="small" type="success" disable-transitions>{{ row.created_at | shortDate }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="To" prop="first_name">
          <template slot-scope="{row}">
            <span class="capitalize">{{ row.first_name + ' ' + row.last_name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="remove(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="ordersLength" @current-change="setPage">
      </el-pagination>
    </el-card>
  </el-main>
</template>

<script>
  import GET_ORDERS from '@/graphql/queries/order/orders.gql';
  import DELETE_ORDER from '@/graphql/mutations/order/deleteOrder.gql';

  export default {
    data() {
      return {
        orders: [],
        search: '',
        page: 1,
        pageSize: 9
      }
    },
    apollo: {
      orders: {
        prefetch: true,
        query: GET_ORDERS,
      }
    },
    filters: {
      shortDate(date) {
        return (new Date(date)).toDateString();
      }
    },
    computed: {
      ordersList() {
        return this.orders.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      },
      ordersLength() {
        return this.orders.length;
      }
    },
    methods: {
      setPage(val) {
        this.page = val;
      },
      remove(index, order) {
        this.$confirm('This will permanently delete the recored. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          })
          .then(() => {
            this.$apollo.mutate({
                mutation: DELETE_ORDER,
                variables: {
                  id: order.id
                }
              }).then(() => {
                this.orders.splice(index, 1);
                this.$message({
                  type: 'success',
                  message: 'Your file has been deleted.'
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
    },
  }

</script>
