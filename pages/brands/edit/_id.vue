<template>
  <div class="w-full overflow-x-hidden border-t flex flex-col">
    <main class="w-full flex-grow p-6">
      <div class="flex items-center justify-center">
        <h1 class="text-3xl flex-1 text-black">Brand Information</h1>
      </div>
      <div class="w-full mt-12">
        <div class="w-full my-6 pr-0 lg:pr-2 bg-white rounded shadow-xl">
          <div class="leading-loose lg:w-1/2">
            <div class="p-10 ">
              <div class="">
                <label class="block text-sm text-gray-600" for="name">Name</label>
                <input class="w-full px-3 py-1 border border-gray-600 text-gray-700 bg-gray-200 rounded" v-model="name"
                  id="name" name="name" type="text" required placeholder="Brand Name">
              </div>
              <div class="mt-5">
                <div v-if="logo != null" class="img inline-block overflow-hidden relative m-2"
                  style="width: 100px;height: 100px">
                  <img :src="'http://app-api.test/storage/uploads/brands/' + logo" class="w-full h-full">
                  <div class="hidden bg-gray-500 bg-opacity-75 flex items-center absolute w-full h-full top-0">
                    <button class="px-1 mx-auto" @click="deleteBrandImage()">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5" fill="none" viewBox="0 0 24 24" stroke="red">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <uploader v-else class="text-gray-500 p-0" v-model="fileList" :autoUpload="false" :title="'Logo'"
                  :limit="1">
                </uploader>
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
  import UPDATE_BRAND from '@/graphql/mutations/brand/updateBrand.gql';
  import GET_BRAND from '@/graphql/queries/brand/brand.gql';
  import DELETE_BRAND_IMAGE from '@/graphql/mutations/brand/deleteBrandImage.gql';

  export default {
    data() {
      return {
        name: '',
        logo: '',
        fileList: []
      }
    },
    created() {
      this.$apollo.query({
          query: GET_BRAND,
          variables: {
            id: this.$route.params.id
          }
        })
        .then(({
          data
        }) => {
          this.name = data.brand.name;
          this.logo = data.brand.logo
        });
    },
    methods: {
      cancel() {
        this.$router.push({
          name: 'brands'
        });
      },
      submit() {
        this.$apollo.mutate({
            mutation: UPDATE_BRAND,
            variables: {
              id: this.$route.params.id,
              input: {
                name: this.name,
                logo: this.fileList[0].blob
              }
            }
          })
          .then((res) => {
            this.$toast.success('Successfully updated');
          }).catch(res => {
            this.$toast.error('Error while updating');
          });
      },
      deleteBrandImage() {
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
                mutation: DELETE_BRAND_IMAGE,
                variables: {
                  id: this.$route.params.id
                }
              }).then((res) => {
                this.logo = null;
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


<style>
  .vux-uploader {
    padding: 0 !important;
  }

  .img:hover>div {
    display: flex;
  }

</style>
