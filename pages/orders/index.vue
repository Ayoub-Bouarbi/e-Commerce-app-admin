<template>
  <div class="w-full overflow-x-hidden border-t flex flex-col">
    <main class="w-full flex-grow p-6">
      <div class="flex items-center justify-center">
        <h1 class="text-3xl flex-1 text-black">Orders</h1>
      </div>
      <div class="w-full mt-12">
        <p class="text-xl pb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-10 pr-2 pt-1" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Latest Reports
        </p>
        <div class="bg-white overflow-auto">
          <table class="min-w-full bg-white">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th class="w-2/5 text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                <th class="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">Placed By</th>
                <th class="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
                <th class="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">To</th>
                <th class="text-center py-3 px-10 uppercase font-semibold text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-6" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody v-if="$apollo.queries.orders.loading" class="text-gray-700">
              Loading...
            </tbody>
            <tbody v-else class="text-gray-700">
              <tr v-for="order of orders" :key="order.id"
                class="hover:bg-gray-200 transition duration-500 ease-in-out">
                <td class="w-2/5 text-left py-3 px-4"> {{ order.order_number }} </td>
                <td class="w-1/5 text-left py-3 px-4"> {{ order.User.first_name + ' ' + order.User.last_name }} </td>
                <td class="w-1/5 text-left py-3 px-4"> {{ order.created_at }} </td>
                <td class="w-1/5 text-left py-3 px-4"> {{ order.first_name + ' ' + order.last_name }} </td>
                <td class="w-1/5 text-center py-3 px-4">
                  <button class="px-1" @click="deleteOrder(order)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6" fill="none" viewBox="0 0 24 24" stroke="red">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import GET_ORDERS from '@/graphql/queries/order/orders.gql';
  import DELETE_ORDER from '@/graphql/mutations/order/deleteOrder.gql';

  export default {
    data() {
      return {
        orders: []
      }
    },
    apollo: {
      orders: {
        prefetch: true,
        query: GET_ORDERS,
      }
    },
    methods: {
      deleteOreder(order) {
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
                mutation: DELETE_ORDER,
                variables: {
                  id: order.id
                }
              }).then(({
                data
              }) => {
                let index = this.orders.findIndex(ord => ord.id == order.id);
                this.orders.splice(index, 1);
                this.$swal('Deleted!', 'Your file has been deleted.', 'success');
              })
              .catch(res => {
                this.$toast.error('Error while deleting');
              });
          }
        });
      },
    },
  }

</script>
