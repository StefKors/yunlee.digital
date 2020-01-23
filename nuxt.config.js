import Mode from 'frontmatter-markdown-loader/mode'
const routerBase = {
      router: {
        base: '/Yun-2020'
      }
    }

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Yun Ingrid Eel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Yun Ingrid Lee is an artist, composer, and performer interested in invisibility, noise, and collective sensing.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  ...routerBase,
  plugins: [],


  prismic: {
    endpoint: 'https://yuneel.cdn.prismic.io/api/v2'
  },
  /*
  ** Nuxt.js dev-modules
  */
 buildModules: [],
  /*
  ** Nuxt.js modules
  */
 modules: [
   // Doc: https://axios.nuxtjs.org/usage
   '@nuxtjs/axios',
   '@nuxtjs/pwa',
   // Doc: https://github.com/nuxt-community/dotenv-module
   '@nuxtjs/dotenv',
   '@nuxtjs/prismic'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
 axios: {},
  /*
   ** Build configuration
   */

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          mode: [Mode.VUE_COMPONENT]
        }
      }),
        (config.resolve.alias['vue'] = 'vue/dist/vue.common')
    }
  }
}
