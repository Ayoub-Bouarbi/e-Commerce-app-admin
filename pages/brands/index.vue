<template>
  <div class="w-full overflow-x-hidden border-t flex flex-col">
    <main class="w-full flex-grow p-6">
      <div class="flex items-center justify-center">
        <h1 class="text-3xl flex-1 text-black">Brands</h1>
        <nuxt-link :to="{name: 'brands-create'}"
          class="bg-sidebar text-white cta-btn font-semibold py-2 px-3 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-8 pr-1" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New
        </nuxt-link>
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
          <table class="table-auto min-w-full bg-white">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th class="w-3/5 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                <th class="w-2/5 text-left py-3 px-4 uppercase font-semibold text-sm">Slug</th>
                <th class="text-left py-3 px-10 uppercase font-semibold text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-6" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody v-if="$apollo.queries.brands.loading" class="text-gray-700">
              Loading...
            </tbody>
            <tbody v-else class="text-gray-700">
              <tr v-for="brand of brands" :key="brand.id" class="hover:bg-gray-200 transition duration-500 ease-in-out">
                <td class="w-1/3 text-left py-3 px-4"> {{ brand.name }} </td>
                <td class="w-1/3 text-left py-3 px-4"> {{ brand.slug }} </td>
                <td class="text-center py-3 px-4">
                  <button class="px-1" @click="deleteBrand(brand)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6" fill="none" viewBox="0 0 24 24" stroke="red">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button class="px-1" @click="editBrand(brand)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-6" viewBox="0 0 24 24" stroke="green">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
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
  import GET_BRANDS from '@/graphql/queries/brand/brands.gql';
  import DELETE_BRAND from '@/graphql/mutations/brand/deleteBrand.gql';

  export default {
    data() {
      return {
        brands: []
      }
    },
    apollo: {
      brands: {
        prefetch: true,
        query: GET_BRANDS
      }
    },
    methods: {
      deleteBrand(brand) {
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
              }).then(({ data }) => {
                let index = this.brands.findIndex(b => b.id == brand.id);
                this.brands.splice(index, 1);
                this.$swal('Deleted!', 'Your file has been deleted.', 'success');
              })
              .catch(res => {
                this.$toast.error('Error while deleting');
              });
          }
        });
      },
      editBrand(brand) {
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
