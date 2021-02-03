<template>
  <div class="w-full overflow-x-hidden border-t flex flex-col">
    <main class="w-full flex-grow p-6">
      <div class="flex items-center justify-center">
        <h1 class="text-3xl flex-1 text-black">Users Information</h1>
      </div>
      <div class="w-full mt-12">
        <div class="w-full my-6 pr-0 lg:pr-2 bg-white rounded shadow-xl">
          <div class="leading-loose lg:w-3/5">
            <div class="p-10 ">
              <div class="grid grid-cols-2 gap-4">
                <div class="">
                  <label class="block text-sm text-gray-600" for="first_name">First Name</label>
                  <input class="w-full px-3 py-1 border border-gray-600 text-gray-700 bg-gray-200 rounded"
                    v-model="data.first_name" type="text" required placeholder="First Name">
                </div>
                <div class="">
                  <label class="block text-sm text-gray-600" for="last_name">Last Name</label>
                  <input class="w-full px-3 py-1 border border-gray-600 text-gray-700 bg-gray-200 rounded"
                    v-model="data.last_name" type="text" required placeholder="Last Name">
                </div>
              </div>
              <div class="">
                <label class="block text-sm text-gray-600" for="email">Email</label>
                <input class="w-full px-3 py-1 border border-gray-600 text-gray-700 bg-gray-200 rounded"
                  v-model="data.email" type="email" required placeholder="Email">
              </div>
              <div class="">
                <label class="block text-sm text-gray-600" for="address">Address</label>
                <input class="w-full px-3 py-1 border border-gray-600 text-gray-700 bg-gray-200 rounded"
                  v-model="data.address" type="text" required placeholder="Address">
              </div>
              <div class="">
                <label class="block text-sm text-gray-600" for="phone_number">Phone Number</label>
                <input class="w-full px-3 py-1 border border-gray-600 text-gray-700 bg-gray-200 rounded"
                  v-model="data.phone_number" type="text" required placeholder="Phone Number">
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div class="">
                  <label class="block text-sm text-gray-600" for="country">Country</label>
                  <input class="w-full px-3 py-1 border border-gray-600 text-gray-700 bg-gray-200 rounded"
                    v-model="data.country" type="text" required placeholder="Country">
                </div>
                <div class="">
                  <label class="block text-sm text-gray-600" for="city">City</label>
                  <input class="w-full px-3 py-1 border border-gray-600 text-gray-700 bg-gray-200 rounded"
                    v-model="data.city" type="text" required placeholder="City">
                </div>
                <div class="">
                  <label class="block text-sm text-gray-600" for="zipcode">Zip Code</label>
                  <input class="w-full px-3 py-1 border border-gray-600 text-gray-700 bg-gray-200 rounded"
                    v-model="data.zip_code" type="text" required placeholder="Zip Code">
                </div>
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
  import GET_USER from '@/graphql/queries/user/user.gql';
  import UPDATE_USER from '@/graphql/mutations/user/updateUser.gql';

  export default {
    data() {
      return {
        data: {
          first_name: '',
          last_name: '',
          email: '',
          address: '',
          city: '',
          country: '',
          zip_code: '',
          phone_number: '',
        }
      }
    },
    created() {
      this.$apollo.query({
          query: GET_USER,
          variables: {
            id: this.$route.params.id
          }
        })
        .then(({
          data
        }) => {
          this.data.first_name = data.user.first_name;
          this.data.last_name = data.user.last_name;
          this.data.email = data.user.email;
          this.data.address = data.user.address;
          this.data.country = data.user.country;
          this.data.city = data.user.city;
          this.data.zip_code = data.user.zip_code;
          this.data.phone_number = data.user.phone_number;
        });
    },
    methods: {
      cancel() {
        this.$router.push({
          name: 'users'
        });
      },
      submit() {
        this.$apollo.mutate({
            mutation: UPDATE_USER,
            variables: {
              id: this.$route.params.id,
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
