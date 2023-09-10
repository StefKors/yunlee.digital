import Mode from 'frontmatter-markdown-loader/mode'
import Prismic from 'prismic-javascript'
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
    }
  ]
}

const fetchAllRoutePaths = async () => {
  // Create Client
  const client = Prismic.client('https://yuneel.cdn.prismic.io/api/v2')

  // Query for all overview pages
  const overview = await client.query(
    [
      Prismic.Predicates.any('document.type', ['overview']),
    ], { fetch: ['overview.title'], pageSize: 100 }
  )
  
  // Map overview pages to routes
  const overviewRoutes = overview.results.map(project => {
    return "/" + project.uid
  })
  
  // Query for all project pages
  const projects = await client.query(
    [
      Prismic.Predicates.any('document.type', ['projects']),
    ], { fetch: ['projects.types', 'projects.uid'], pageSize: 100 }
  )

  // Map project pages to project routes
  const projectRoutes = projects.results.map(project => {
    const types = project.data.types.map((type) => {
      const typeUID = type?.projectoverview?.uid
      if (typeUID) {
        return "/" + typeUID + "/" + project.uid
      }
      return null
    }).filter(n => n)
    return types
  }).flat(1)

  // Join all routes together
  const routes = [...projectRoutes, ...overviewRoutes]

  // Return routes
  return routes
}

export default {
  target: 'static',
  ssr: false,
  generate: {
    routes(callback) {
      fetchAllRoutePaths().then((routes) => {
        console.info(routes)
        callback(null, routes)
      }).catch((error) => {
        console.log(error)
        callback(null, [])
      })
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
