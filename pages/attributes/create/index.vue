<template>
  <div class="w-full overflow-x-hidden border-t flex flex-col">
    <main class="w-full flex-grow p-6">
      <div class="flex items-center justify-center">
        <h1 class="text-3xl flex-1 text-black">Attribute Information</h1>

      </div>
      <div class="w-full mt-12">
        <div class="w-full my-6 pr-0 lg:pr-2 bg-white rounded shadow-xl">
          <div class="leading-loose lg:w-3/5">
            <div class="p-10 ">
              <div>
                <label class="block text-sm text-gray-600" for="name">Name</label>
                <input class="w-full border border-gray-600 px-2 py-1 text-gray-700 bg-gray-200 rounded" v-model="data.name" id="name" name="name"
                  type="text" required placeholder="Your Name" aria-label="Name">
              </div>
              <div>
                <label class="block text-sm text-gray-600" for="name">Frontend Type</label>
                  <select name="frontend_type" id="frontend_type" v-model="data.frontend_type"
                    class="w-full border border-gray-600 px-2 py-2 text-gray-700 bg-gray-200 rounded">
                    <option value="radio">Radio</option>
                    <option value="select">Select</option>
                    <option value="text">Text</option>
                    <option value="text_area">Text Area</option>
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
  import CREATE_ATTRIBUTE from '@/graphql/mutations/attribute/createAttribute.gql';

  export default {
    data() {
      return {
        data: {
          name: '',
          frontend_type: ''
        }
      }
    },
    methods: {
      cancel(){
        this.$router.push({name: 'attributes'});
      },
      submit() {
        this.$apollo.mutate({
            mutation: CREATE_ATTRIBUTE,
            variables: {
              input: this.data
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
