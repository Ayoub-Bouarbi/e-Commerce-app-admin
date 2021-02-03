<template>
  <div class="w-full overflow-x-hidden border-t flex flex-col">
    <main class="w-full flex-grow p-6">
      <div class="flex items-center justify-center">
        <h1 class="text-3xl flex-1 text-black">Product Information</h1>
      </div>
      <div class="w-full mt-12">
        <ul class="flex border-b">
          <li class="-mb-px mr-1" @click="openTab = 1">
            <a :class="openTab === 1 ? 'border-l border-t border-r rounded-t text-blue-700 font-semibold' : 'text-blue-500 hover:text-blue-800'"
              class="bg-white inline-block py-2 px-4 font-semibold" href="#">General</a>
          </li>
          <li class="mr-1" @click="openTab = 2">
            <a :class="openTab === 2 ? 'border-l border-t border-r rounded-t text-blue-700 font-semibold' : 'text-blue-500 hover:text-blue-800'"
              class="bg-white inline-block py-2 px-4 font-semibold" href="#">Product Images</a>
          </li>
          <li class="mr-1" @click="openTab = 3">
            <a :class="openTab === 3 ? 'border-l border-t border-r rounded-t text-blue-700 font-semibold' : 'text-blue-500 hover:text-blue-800'"
              class="bg-white inline-block py-2 px-4 font-semibold" href="#">Product Attributes</a>
          </li>
        </ul>
        <div v-show="openTab === 1" class="w-full pr-0 lg:pr-2 bg-white rounded shadow-xl">
          <div class="leading-loose lg:w-2/3">
            <div class="p-10">
              <div>
                <label class="block text-sm text-gray-600" for="name">Name</label>
                <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 border border-gray-600 rounded"
                  v-model="data.name" id="name" name="name" type="text" required placeholder="Product Name">
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-gray-600" for="name">SKU</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 border border-gray-600 rounded"
                    v-model="data.sku" id="sku" name="sku" type="text" required placeholder="Product Sku">
                </div>
                <div>
                  <label class="block text-sm text-gray-600" for="brand_id">Brand</label>
                  <select name="brand_id" id="brand_id" v-model="data.brand_id"
                    class="w-full border border-gray-600 px-5 py-2 text-gray-700 bg-gray-200 rounded">
                    <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-sm text-gray-600" for="category_id">Categories</label>
                <v-select class="text-black" v-model="data.categories_id" as="name:id:id" :from="categories" tagging
                  :tag-keys="[9,32,188]"></v-select>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-gray-600" for="price">Price</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 border border-gray-600 rounded"
                    v-model="data.price" id="price" name="price" type="number" required placeholder="Product Price">
                </div>
                <div>
                  <label class="block text-sm text-gray-600" for="price">Special Price</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 border border-gray-600 rounded"
                    v-model="data.sale_price" id="sale_price" name="sale_price" type="number" step="0.1" required
                    placeholder="Product Specail Price">
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-gray-600" for="quntity">Quantity</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 border border-gray-600 rounded"
                    v-model="data.quantity" id="quantity" name="quantity" type="number" required
                    placeholder="Product Quntity">
                </div>
                <div>
                  <label class="block text-sm text-gray-600" for="price">Weight</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 border border-gray-600 rounded"
                    v-model="data.weight" id="weight" name="weight" type="number" required placeholder="Product Weight">
                </div>
              </div>
              <div>
                <label class="block text-sm text-gray-600" for="description">Description</label>
                <textarea name="description" id="description" v-model="data.description" rows="4"
                  class="w-full px-5 py-1 text-gray-700 bg-gray-200 border border-gray-600 rounded"></textarea>
              </div>
              <div class="form-check">
                <label class="text-gray-600">
                  <input class="py-1" type="checkbox" id="status" v-model="data.status" name="status" /> Status
                </label>
              </div>
              <div class="form-check">
                <label class="text-gray-600">
                  <input class="py-1" type="checkbox" id="featured" v-model="data.featured" name="featured" /> Featured
                </label>
              </div>
              <div class="mt-6">
                <button class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit"
                  @click="submit">Submit</button>
                <button class="px-4 py-1 text-white font-light tracking-wider bg-red-500 rounded" type="submit"
                  @click="cancel">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <div v-show="openTab === 2" class="w-full pr-0 lg:pr-2 bg-white rounded shadow-xl">
          <div class="leading-loose lg:w-2/3">
            <div class="p-4">
              <vue-uploader :product_images="data.product_images" :product_id="$route.params.id"></vue-uploader>
            </div>
          </div>
        </div>
        <div v-show="openTab === 3">
          <product-attributes :product_attributes="data.product_attributes" :product_id="$route.params.id"></product-attributes>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

  import GET_CATEGORIES from '@/graphql/queries/category/categoriesExcept.gql';
  import GET_BRANDS from '@/graphql/queries/brand/brands.gql';
  import UPDATE_PRODUCT from '@/graphql/mutations/product/updateProduct.gql';
  import GET_PRODUCT from '@/graphql/queries/product/product.gql';
  import { vSelect } from '@desislavsd/vue-select';
  import { pluck } from 'ramda';

  export default {
    data() {
      return {
        data: {
          name: '',
          sku: '',
          price: 0,
          sale_price: 0,
          brand_id: 0,
          categories_id: [],
          quantity: 0,
          weight: 0,
          description: '',
          status: false,
          featured: false,
          product_attributes: [],
          product_images: [],
        },
        brands: [],
        categories: [],
        openTab: 1,
      }
    },
    components: {
      vSelect,
    },
    apollo: {
      categories: {
        prefetch: true,
        query: GET_CATEGORIES,
        variables() {
          return{
            id: 1
          }
        }
      },
      brands: {
        prefetch: true,
        query: GET_BRANDS
      }
    },
    created() {
      this.$apollo.query({
          query: GET_PRODUCT,
          variables: {
            id: this.$route.params.id
          },
        })
        .then(({ data }) => {
          this.data.name = data.product.name;
          this.data.sku = data.product.sku;
          this.data.price = data.product.price;
          this.data.sale_price = data.product.sale_price;
          this.data.status = data.product.status;
          this.data.weight = data.product.weight;
          this.data.quantity = data.product.quantity;
          this.data.featured = data.product.featured;
          this.data.brand_id = data.product.Brand.id;
          this.data.description = data.product.description;
          this.data.categories_id = pluck('id', data.product.Categories);
          this.data.product_attributes = data.product.ProductAttributes;
          this.data.product_images = data.product.Images;
        });
    },
    methods: {
      cancel() {
        this.$router.push({
          name: 'products'
        });
      },
      submit() {
        this.$apollo.mutate({
            mutation: UPDATE_PRODUCT,
            variables: {
              id: this.$route.params.id,
              input: {
                name: this.data.name,
                sku: this.data.sku,
                price: this.data.price,
                sale_price: this.data.sale_price,
                brand_id: this.data.brand_id,
                categories_id: this.data.categories_id,
                quantity: this.data.quantity,
                weight: this.data.weight,
                description: this.data.description,
                status: this.data.status,
                featured: this.data.featured
              }
            }
          })
          .then((res) => {
            this.$toast.success('Successfully created');
          }).catch(res => {
            this.$toast.error('Error while creating');
          });
      }
    },
  }

</script>
