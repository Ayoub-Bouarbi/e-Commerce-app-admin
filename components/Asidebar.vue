<template>
  <aside class="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
    <div class="p-6">
      <a href="index.html" class="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
    </div>
    <nav class="text-white text-base font-semibold pt-3">
      <nuxt-link to="/" class="flex items-center active-nav-link text-white py-4 pl-6 nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 pr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Dashboard
      </nuxt-link>
      <nuxt-link :to="{name: 'categories'}"
        class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 pr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        Categories
      </nuxt-link>
      <nuxt-link :to="{name: 'brands'}"
        class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 pr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
        Brands
      </nuxt-link>
      <nuxt-link :to="{name: 'attributes'}"
        class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 pr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        Attributes
      </nuxt-link>
      <nuxt-link :to="{name: 'products'}"
        class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 pr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        Products
      </nuxt-link>
      <nuxt-link :to="{name: 'orders'}"
        class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 pr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Orders
      </nuxt-link>
      <nuxt-link :to="{name: 'users'}"
        class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 pr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Users
      </nuxt-link>
    </nav>
  </aside>

</template>

<script>
  export default {

  }

</script>

<style>
  .bg-sidebar {
    background-color: #3d68ff;
  }

</style>
