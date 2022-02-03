import colors from 'vuetify/es5/util/colors'

export default {
  env: {
  
    baseURL: process.env.BASE_URL  || 'https://base.suped-ddne-back.com/api/' 
    // : 'https://base.ddne.net/api/'
  },

  
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ddne',
    title: 'Direction Départementale d\'Education du Nord-Est',
    htmlAttrs: {
      lang: 'en'
    },

  

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/jsonExcel.js',
    '~plugins/moment.js',
    '~plugins/apex.js',
    '~plugins/notifier.js',
      { src: '@/plugins/vue-html2pdf', mode: 'client' }
    

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',

    ['@nuxtjs/moment',{}],
    
  ],
  moment : {
    locales : ['fr'],

  },

  // Modules: https://go.nuxtjs.dev/config-modules
 
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    
   // '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
 
   axios: {
     baseURL : 'http://ddne-back.loc/api/',
     //  baseURL : 'https://base.suped-ddne.com/api/',
      // credentials: false,
      // proxy: true           
  },
  
//   proxy: {
//    "/api/":{
//   target: "http://base.suped-ddne.com/",    
//    pathRewrite: {"^/api/": ""}
//    }  
// },
   
   // '/api/': { target: 'https://base.suped-ddne.com/', pathRewrite: {'^/api/': ''}, changeOrigin: true }
  
  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
