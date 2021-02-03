<template>
  <div>
    <div class="w-full mb-6 pr-0 lg:pr-2 bg-white rounded shadow-xl">
      <div class="leading-loose lg:w-2/3">
        <div class="p-4">
          <div>
            <label class="block text-sm text-gray-600">Attributes</label>
            <select v-model="attribute"
              class="w-full border border-gray-600 px-5 py-2 text-gray-700 bg-gray-200 rounded">
              <option disabled value="">Select Attribute</option>
              <option v-for="attribute in attributes" :key="attribute.id" :value="attribute">{{ attribute.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div v-if="attribute != null" class="w-full my-6 pr-0 lg:pr-2 bg-white rounded shadow-xl">
      <div class="leading-loose lg:w-2/3">
        <div class="p-4">
          <div>
            <label class="block text-sm text-gray-600">Attributes Values</label>
            <select v-model="attribute_value"
              class="w-full border border-gray-600 px-5 py-2 text-gray-700 bg-gray-200 rounded">
              <option disabled value="">Select Attribute</option>
              <option v-for="attribute_value in attribute.AttributeValues" :key="attribute_value.id"
                :value="attribute_value">{{ attribute_value.value }}
              </option>
            </select>
          </div>
          <div v-if="attribute_value != null" class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-gray-600">Quantity</label>
              <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 border border-gray-600 rounded" type="text"
                v-model="quantity" required placeholder="Qunatity">
            </div>
            <div>
              <label class="block text-sm text-gray-600">Price</label>
              <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 border border-gray-600 rounded" type="text"
                v-model="price" required placeholder="Price">
            </div>
            <div class="mt-2">
              <button class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit"
                @click="submit">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full my-6 pr-0 lg:pr-2 bg-white rounded shadow-xl">
      <div class="leading-loose lg:w-2/3">
        <div class="p-4">
          <table class="min-w-full bg-white">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th class="w-3/5 text-left py-3 px-4 uppercase font-semibold text-sm">Value</th>
                <th class="w-2/5 text-left py-3 px-4 uppercase font-semibold text-sm">Price</th>
                <th class="text-center py-3 px-10 uppercase font-semibold text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-6" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody class="text-gray-700">
              <tr v-for="product_attribute of product_attributes" :key="product_attribute.id"
                class="hover:bg-gray-200 transition duration-500 ease-in-out">
                <td class="w-1/5 text-left py-3 px-4"> {{ product_attribute.value }} </td>
                <td class="w-1/3 text-left py-3 px-4"> {{ product_attribute.price }} </td>
                <td class="text-center py-3 px-4">
                  <button class="px-1" @click="deleteValue(product_attribute)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5" fill="none" viewBox="0 0 24 24" stroke="red">
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
    </div>
  </div>
</template>

<script>
  import GET_ATTRIBUTES from '@/graphql/queries/attribute/attributes.gql'
  import CREATE_PRODUCT_ATTRIBUTE from '@/graphql/mutations/product/createProductAttributes.gql'
  import DELETE_PRODUCT_ATTRIBUTE from '@/graphql/mutations/product/deleteProductAttributes.gql'

  export default {
    name: "ProductAttributes",
    props: ['product_attributes', 'product_id'],
    data() {
      return {
        attributes: [],
        attribute: null,
        attribute_value: null,
        quantity: 0,
        price: 0
      }
    },
    apollo: {
      attributes: {
        query: GET_ATTRIBUTES
      }
    },
    methods: {
      submit(){
        this.$apollo.mutate({
          mutation: CREATE_PRODUCT_ATTRIBUTE,
          variables: {
            input: {
              value: this.attribute_value.value,
              price: this.price,
              quantity: this.quantity,
              attribute_id: this.attribute.id,
              product_id: this.product_id
            }
          }
        })
        .then(({data}) => {
            this.$toast.success('Successfully created');
            this.product_attributes.push(data.product_attribute);
        }).catch((err) => {
            this.$toast.error('Error while creating');
        });
      },
      deleteValue(product_attribute) {
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
                mutation: DELETE_PRODUCT_ATTRIBUTE,
                variables: {
                  id: product_attribute.id
                }
              }).then((res) => {
                let index = this.product_attributes.findIndex(x => x.id == product_attribute.id);
                this.product_attributes.splice(index, 1);
                this.$swal('Deleted!', 'Your file has been deleted.', 'success');
              })
              .catch(err => {
                this.$toast.error('Error while deleting');
              });
          }
        });
      }
    },

  }

</script>
