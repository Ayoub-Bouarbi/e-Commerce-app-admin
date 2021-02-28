<template>
  <el-container class="h-full">
    <el-aside class="w-56">
      <el-row>
        <el-col :span="24">
          <el-menu background-color="#545c64" text-color="#fff">
            <el-menu-item>
              <nuxt-link to="/">
                <i class="el-icon-house"></i>
                <span>Dashboard</span>
              </nuxt-link>
            </el-menu-item>
            <el-menu-item>
              <nuxt-link :to="{name: 'categories'}">
                <i class="el-icon-files"></i>
                <span>Categories</span>
              </nuxt-link>
            </el-menu-item>
            <el-menu-item>
              <nuxt-link :to="{name: 'brands'}">
                <i class="el-icon-menu"></i>
                <span>Brands</span>
              </nuxt-link>
            </el-menu-item>
            <el-menu-item>
              <nuxt-link :to="{name: 'products'}">
                <i class="el-icon-goods"></i>
                <span>Products</span>
              </nuxt-link>
            </el-menu-item>
            <el-menu-item>
              <nuxt-link :to="{name: 'orders'}">
                <i class="el-icon-coin"></i>
                <span>Orders</span>
              </nuxt-link>
            </el-menu-item>
            <el-menu-item>
              <nuxt-link :to="{name: 'users'}">
                <i class="el-icon-user"></i>
                <span>Users</span>
              </nuxt-link>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container class="h-screen">
      <Nuxt />
    </el-container>
  </el-container>
</template>

<script>
  export default {

  }

</script>

<style lang="css">
.el-aside{
  background-color: #545c64;
}
</style>
