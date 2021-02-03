<template>
  <div class="w-full overflow-x-hidden border-t flex flex-col">
    <main class="w-full flex-grow p-6">
      <div class="flex items-center justify-center">
        <h1 class="text-3xl flex-1 text-black">Category Information</h1>
      </div>
      <div class="w-full mt-12">
        <div class="w-full my-6 pr-0 lg:pr-2 bg-white rounded shadow-xl">
          <div class="leading-loose lg:w-1/2">
            <div class="p-10 ">
              <div class="">
                <label class="block text-sm text-gray-600" for="name">Name</label>
                <input class="w-full px-3 py-1 border border-gray-600 text-gray-700 bg-gray-200 rounded" v-model="data.name" id="name" name="name"
                  type="text" required placeholder="Your Name" aria-label="Name">
              </div>
              <div class="">
                <label class="block text-sm text-gray-600" for="name">Categories</label>
                <select class="w-full border border-gray-600 px-5 py-2 text-gray-700 bg-gray-200 rounded" v-model="data.parent_id">
                  <option value="" disabled selected>Select Parent Category</option>
                  <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.name }}</option>
                </select>
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
      </div>
    </main>
  </div>
</template>

<script>
  import CREATE_CATEGORY from '@/graphql/mutations/category/createCategory.gql';
  import CATEGORIES from '@/graphql/queries/category/categories.gql';

  export default {
    data() {
      return {
        data: {
          name: '',
          parent_id: 0
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
      cancel(){
        this.$router.push({name: 'categories'});
      },
      submit() {
        this.$apollo.mutate({
            mutation: CREATE_CATEGORY,
            variables: {
              input: this.data
            }
          })
          .then(({data}) => {
            this.$toast.success('Successfully created');
            this.categories.push(data.category);
          }).catch(res => {
            this.$toast.error('Error while creating');
          });
      }
    },
  }

</script>
