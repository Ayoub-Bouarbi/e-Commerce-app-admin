export default {
  server: {
    port: 8000, // default: 3000
    host: 'localhost' // default: localhost
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'app-admin',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '~/plugins/element-ui.js',
      ssr: false
    }
  ],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  // Defaults options
  // tailwindcss: {
  //   configPath: 'tailwind.config.js',
  // },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/proxy',
  ],
  proxy: {
    '/api': {
      target: process.env.APP_GRAPHQL_ENDPOINT,
      pathRewrite: {
        '^/api': '/'
      }
    },
  },

  toast: {
    position: 'top-right',
    duration: 1000
  },

  apollo: {
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'no-cache'
      }
    },
    clientConfigs: {
      default: {
        httpEndpoint: process.env.APP_CLIENT_URL,
        wsEndpoint: null
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

}
