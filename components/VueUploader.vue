<template>
    <div>
      <div v-for="(product_image,i) in product_images" :key="i"  class="img inline-block overflow-hidden relative m-2" style="width: 100px;height: 100px">
        <img :src="'http://app-api.test/storage/uploads/products/' + product_image.image" alt="">
        <div class="hidden bg-gray-500 bg-opacity-75 flex items-center absolute w-full h-full top-0">
          <button class="px-1 mx-auto" @click="deleteProductImage(product_image)">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5" fill="none" viewBox="0 0 24 24" stroke="red">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <uploader class="text-black p-0" v-model="fileList" :autoUpload="false" :title="'Product Images'" :limit="4">
      </uploader>
      <button class="ml-3 px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit"
        @click="submit">Submit</button>
    </div>
</template>

<script>

import UPLOAD_PRODUCT_IMAGE from '@/graphql/mutations/product/uploadProductImage.gql';
import DELETE_PRODUCT_IMAGE from '@/graphql/mutations/product/deleteProductImage.gql';
import {pluck} from 'ramda';

export default {
  props: ['product_id','product_images'],
  data() {
    return {
      fileList: [],
    }
  },
  methods: {
    submit(){
      let files = pluck('blob',this.fileList);
      this.$apollo.mutate({
        mutation: UPLOAD_PRODUCT_IMAGE,
        variables: {
          input: {
            images: files,
            product_id: this.product_id
          }
        }
      })
      .then(({data}) => {
          this.$toast.success('Successfully Uploaded');
        }).catch(res => {
          this.$toast.error('Error while Uploading');
        });
    },
    deleteProductImage(image){
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
                mutation: DELETE_PRODUCT_IMAGE,
                variables: {
                  id: image.id
                }
              }).then((res) => {
                let index = this.product_images.findIndex(x => x.id == image.id);
                this.product_images.splice(index, 1);
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
.vux-uploader .vux-uploader_bd .vux-uploader_input-box {
    width: 100px !important;
    height: 100px !important;
    border: 1px solid #888 !important;
}
.vux-uploader .vux-uploader_bd .vux-uploader_input-box:after,
.vux-uploader .vux-uploader_bd .vux-uploader_input-box:before {
    background-color: #888 !important;
}
.vux-uploader .vux-uploader_bd .vux-uploader_files .vux-uploader_file {
    width: 100px !important;
    height: 100px !important;
}
.img:hover > div {
  display: flex;
}
</style>
