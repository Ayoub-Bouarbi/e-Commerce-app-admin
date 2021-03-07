<template>
  <el-main class="bg-gray-200">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'users' }">Users</el-breadcrumb-item>
      <el-breadcrumb-item>Create</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt-5" shadow="never">
      <el-form ref="form" class="w-1/2" label-position="left" :model="form">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="First Name">
              <el-input v-model="form.first_name" placeholder="please type first name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Last Name">
              <el-input v-model="form.last_name" placeholder="please type last name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Email">
          <el-input v-model="form.email" placeholder="please type email"></el-input>
        </el-form-item>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="Address">
              <el-input v-model="form.address" placeholder="please type address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Phone Number">
              <el-input v-model="form.phone_number" placeholder="please type phone number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="8">
            <el-form-item label="Country">
              <el-input v-model="form.country" placeholder="please type country"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="City">
              <el-input v-model="form.city" placeholder="please type city"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Zip Code">
              <el-input v-model="form.zip_code" placeholder="please type zip code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="Password">
              <el-input v-model="password" placeholder="please type password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Password Confirmation">
              <el-input v-model="password_confirmation" placeholder="please type password confirmation"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">Create</el-button>
          <el-button @click="onCancel" size="small">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-main>
</template>

<script>
  import CREATE_USER from '@/graphql/mutations/user/createUser.gql';

  export default {
    data() {
      return {
        form: {
          first_name: '',
          last_name: '',
          email: '',
          address: '',
          country: '',
          zip_code: '',
          phone_number: '',
        },
        password: '',
        password_confirmation: '',
      }
    },
    methods: {
      onCancel() {
        this.$router.push({
          name: 'users'
        });
      },
      onSubmit() {
        this.$apollo.mutate({
            mutation: CREATE_USER,
            variables: {
              input: this.form,
              password: this.password,
              password_confirmation: this.password_confirmation,
            }
          })
          .then(() => {
            this.$notify({
              title: 'Success',
              message: 'Successfully created',
              type: 'success'
            });
          }).catch(() => {
            this.$notify({
              title: 'Error',
              message: 'Error while creating',
              type: 'error'
            });
          });
      }
    },
  }

</script>
