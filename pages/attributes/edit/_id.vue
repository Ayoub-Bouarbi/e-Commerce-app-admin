<template>
  <div class="w-full overflow-x-hidden border-t flex flex-col">
    <main class="w-full flex-grow p-6">
      <div class="flex items-center justify-center">
        <h1 class="text-3xl flex-1 text-black">Attribute Information</h1>
      </div>
      <div class="w-full mt-12">
        <div>
          <ul class="flex border-b">
            <li class="-mb-px mr-1" @click="openTab = 1">
              <a :class="openTab === 1 ? 'border-l border-t border-r rounded-t text-blue-700 font-semibold' : 'text-blue-500 hover:text-blue-800'"
                class="bg-white inline-block py-2 px-4 font-semibold" href="#">General</a>
            </li>
            <li class="mr-1" @click="openTab = 2">
              <a :class="openTab === 2 ? 'border-l border-t border-r rounded-t text-blue-700 font-semibold' : 'text-blue-500 hover:text-blue-800'"
                class="bg-white inline-block py-2 px-4 font-semibold" href="#">Attribute Value</a>
            </li>
          </ul>
        </div>
        <div v-show="openTab === 1" class="w-full pr-0 lg:pr-2 bg-white rounded shadow-xl">
          <div class="leading-loose lg:w-3/5">
            <div class="p-10">
              <div>
                <label class="block text-sm text-gray-600" for="name">Name</label>
                <input class="w-full border border-gray-600 px-2 py-1 text-gray-700 bg-gray-200 rounded"
                  v-model="attribute.name" id="name" name="name" type="text" required placeholder="Attribute Name">
              </div>
              <div>
                <label class="block text-sm text-gray-600">Frontend Type</label>
                <select name="frontend_type" id="frontend_type" v-model="attribute.frontend_type"
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
      <div v-show="openTab === 2" class="w-full pr-0">
        <div class="leading-loose bg-white rounded shadow-xl">
          <div class="p-10 lg:w-3/5 lg:pr-2">
            <div>
              <label class="block text-sm text-gray-600">Value</label>
              <input class="w-full border border-gray-600 px-2 py-1 text-gray-700 bg-gray-200 rounded"
                v-model="attributeValue.value" id="value" name="value" type="text" required
                placeholder="Attribute Value">
            </div>
            <div class="mt-6">
              <button v-show="isEdit === false"
                class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit"
                @click="onSave()">Save</button>
              <button v-show="isEdit === true"
                class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit"
                @click="onUpdate()">Update</button>
            </div>
          </div>
        </div>
        <div class="leading-loose my-10  bg-white rounded shadow-xl">
          <div class="p-10 lg:pr-2">
            <table class="min-w-full bg-white">
              <thead class="bg-gray-800 text-white">
                <tr>
                  <th class="w-3/5 text-left py-3 px-4 uppercase font-semibold text-sm">Value</th>
                  <th class="text-left py-3 px-10 uppercase font-semibold text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-6" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </th>
                </tr>
              </thead>
              <tbody class="text-gray-700">
                <tr v-for="attribute_value of attribute.attributeValues" :key="attribute_value.id"
                  class="hover:bg-gray-200 transition duration-500 ease-in-out">
                  <td class="w-3/5 text-left py-3 px-4"> {{ attribute_value.value }} </td>
                  <td class="text-center py-3 px-2">
                    <button class="px-1" @click="deleteAttributeValue(attribute_value)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-6" fill="none" viewBox="0 0 24 24" stroke="red">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <button class="px-1" @click="editAttributeValue(attribute_value)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-6" viewBox="0 0 24 24"
                        stroke="green">
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
      </div>
    </main>
  </div>
</template>

<script>
  import UPDATE_ATTRIBUTE from '@/graphql/mutations/attribute/updateAttribute.gql';
  import GET_ATTRIBUTE from '@/graphql/queries/attribute/attribute.gql';
  import CREATE_ATTRIBUTE_VALUE from '@/graphql/mutations/attributeValue/createAttributeValue.gql';
  import DELETE_ATTRIBUTE_VALUE from '@/graphql/mutations/attributeValue/deleteAttributeValue.gql';
  import UPDATE_ATTRIBUTE_VALUE from '@/graphql/mutations/attributeValue/updateAttributeValue.gql';

  export default {
    data() {
      return {
        attribute: {
          name: '',
          frontend_type: '',
          attributeValues: []
        },
        attributeValue: {
          id: 0,
          value: '',
        },
        openTab: 1,
        isEdit: false
      }
    },
    created() {
      this.$apollo.mutate({
          mutation: GET_ATTRIBUTE,
          variables: {
            id: this.$route.params.id
          }
        })
        .then(({ data }) => {
          this.attribute.name = data.attribute.name;
          this.attribute.frontend_type = data.attribute.frontend_type;
          this.attribute.attributeValues = data.attribute.AttributeValues;
        })
    },
    methods: {
      cancel() {
        this.$router.push({
          name: 'attributes'
        });
      },
      submit() {
        this.$apollo.mutate({
            mutation: UPDATE_ATTRIBUTE,
            variables: {
              id: this.$route.params.id,
              input: {
                name: this.attribute.name,
                frontend_type: this.attribute.frontend_type
              }
            }
          })
          .then((res) => {
            this.$toast.success('Successfully updated');
          }).catch(res => {
            this.$toast.error('Error while updating');
          });
      },
      editAttributeValue(attribute_value) {
        this.attributeValue.id = attribute_value.id;
        this.attributeValue.value = attribute_value.value;
        this.isEdit = true;
      },
      deleteAttributeValue(attribute_value) {
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
                mutation: DELETE_ATTRIBUTE_VALUE,
                variables: {
                  id: attribute_value.id
                }
              })
              .then(({ data }) => {
                let index = this.attribute.attributeValues.indexOf(x => x.id == data.attributeValue.id);
                this.attribute.attributeValues.splice(index, 1);
                this.$swal('Deleted!', 'Your file has been deleted.', 'success');
              })
              .catch(res => {
                this.$toast.success('Error while Deleting');
              });
          }
        });
      },
      onSave() {
        this.$apollo.mutate({
            mutation: CREATE_ATTRIBUTE_VALUE,
            variables: {
              input: {
                value: this.attributeValue.value,
                attribute_id: this.$route.params.id,
              }
            }
          })
          .then(({ data }) => {
            this.$toast.success('Successfully Created');
            this.attribute.attributeValues.push(data.attributeValue);
          }).catch(res => {
            this.$toast.error('Error while Creating');
          });
      },
      onUpdate() {
        this.$apollo.mutate({
            mutation: UPDATE_ATTRIBUTE_VALUE,
            variables: {
              id: this.attributeValue.id,
              input: {
                value: this.attributeValue.value,
                attribute_id: this.$route.params.id,
              }
            }
          })
          .then(({ data }) => {
            this.$toast.success('Successfully Updated');
            let index = this.attribute.attributeValues.indexOf(x => x.id == data.attributeValue.id);
            this.attribute.attributeValues.splice(index, 1);
            this.attribute.attributeValues.push(data.attributeValue);
            this.isEdit = false;
          }).catch(res => {
            this.$toast.error('Error while Updating');
          });
      }
    },
  }

</script>
