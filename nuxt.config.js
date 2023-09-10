import Mode from 'frontmatter-markdown-loader/mode'
import { fetchAllRoutePaths } from './utils/apiConnection'
const routerBase = {
  router: {
    base: '/'
  }
}

const apiOptions = {
  routes: [
    {
      type: 'projects',
      path: '/:type/:uid',
      resolvers: {
        // A list of "path variables" mapped to the API ID
        // of a content relationship field in the page type
        type: 'type'
      }
    },
    {
      type: 'overview',
      path: '/:type',
      resolvers: {
        // A list of "path variables" mapped to the API ID
        // of a content relationship field in the page type
        type: 'type'
      }
    }
  ]
}

export default {
  target: 'static',
  ssr: true,
  generate: {
    routes() {
      let user = { title: 'string' }
      return [{
        route: '/performances',
        payload: user
      }]
      // callback(null, [
      //   {
      //     route: '/performances',
      //     payload: user
      //   }
      // ])

      // fetchAllRoutePaths().then((routes) => {
      //   // console.info(routes)

      //   callback(null, routes)
      // }).catch((error) => {
      //   console.log(error)
      //   callback(null, [])
      // })
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Yun Ingrid Lee',
    titleTemplate: 'Yun Ingrid Lee',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Yun Ingrid Lee is an artist, composer, and performer interested in invisibility, noise, and collective sensing.'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://www.yunlee.digital/social.jpg'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico'
      }
    ]
  },
  components: true,
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
    endpoint: 'https://yuneel.cdn.prismic.io/api/v2',
    apiOptions
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
    '@nuxtjs/prismic',
    [
      'nuxt-social-meta',
      {
        url: 'https://www.yunlee.digital',
        title: 'Yun Ingrid Lee',
        description:
          'Yun Ingrid Lee is an artist, composer, and performer interested in invisibility, noise, and collective sensing.',
        img: 'https://www.yunlee.digital/social.jpg',
        locale: 'en_EN',
        themeColor: '#f29a9d'
      }
    ]
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
      config.module.rules.push(
        {
          test: /\.md$/,
          loader: 'frontmatter-markdown-loader',
          options: {
            mode: [Mode.VUE_COMPONENT]
          }
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader: 'file-loader'
        }
      ),
        (config.resolve.alias['vue'] = 'vue/dist/vue.common')
    }
  }
}
