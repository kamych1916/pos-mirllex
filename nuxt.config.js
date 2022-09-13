export default {
  server: {
    host: '0',
  },
  ssr: false,
  components: true,

  head: {
    title: 'Spacefarm',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: "robots", content: "index, follow" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" }
    ]
  },

  css: [
    "~/assets/scss/index.scss",
  ],

  styleResources: {
    scss: [
      '~assets/scss/_responsive.scss',
      '~assets/scss/_variables.scss',
    ]
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  buildModules: [
    "@nuxtjs/style-resources"
  ],

  build: {
    scss: {
      implementation: require('sass'),
    },
  },

  pageTransition: 'page-transition',

  plugins: [
    {
      src: '~/plugins/Paper.js',
      mode: 'client',
    },
  ],

  axios: {
    headers: {
      common: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
    baseURL: 'http://87.249.44.28:8005/api/'
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true,
          maxAge: 60 * 60
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get' }
        }
      }
    }
  }
}
