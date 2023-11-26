import Prismic from 'prismic-javascript'

const fetchAboutRoute = async () => {
  // Create Client
  const client = Prismic.client('https://yuneel.cdn.prismic.io/api/v2')
  const document = await client.getSingle('about')

  return {
    route: '/about',
    payload: {
      document: document.data
    }
  }
}

const fetchSoundsRoute = async () => {
  // Create Client
  const client = Prismic.client('https://yuneel.cdn.prismic.io/api/v2')
  const document = await client.getSingle('sounds')

  return {
    route: '/sounds',
    payload: {
      document: document.data
    }
  }
}

const fetchHomePageRoute = async () => {
  // Create Client
  const client = Prismic.client('https://yuneel.cdn.prismic.io/api/v2')
  // ALSO UPDATE PAGE!
  const document = await client.getSingle('homepage-test-', {
    fetchLinks: [
      'projects.title',
      'projects.type',
      'projects.uid',
      'projects.types',
      'projects.description',
      'projects.start_date',
      'projects.end_date',
      'projects.gallery'
    ]
  })

  // Query for all overview pages
  const overview = await client.query(
    [Prismic.Predicates.any('document.type', ['overview'])],
    { pageSize: 100 }
  )

  console.log('APICONNECTION: overview count:', overview.results.length)

  return {
    route: '/',
    payload: {
      document: document.data,
      overview: overview.results
    }
  }
}

const fetchOverviewRoutes = async projectRoutes => {
  // Create Client
  const client = Prismic.client('https://yuneel.cdn.prismic.io/api/v2')

  // Query for all overview pages
  const overview = await client.query(
    [Prismic.Predicates.any('document.type', ['overview'])],
    { pageSize: 100 }
  )
  // Map overview pages to routes
  let result = overview.results.map(overview => {
    const projects = projectRoutes
      .filter(proj => {
        return proj.route.startsWith('/' + overview.uid)
      })
      .map(projroute => {
        return projroute.payload
      })

    return {
      route: '/' + overview.uid,
      payload: {
        overview: overview,
        projects: projects
      }
    }
  })
  console.log('results: ', result)
  return result
}

const fetchProjectRoutes = async () => {
  // Create Client
  const client = Prismic.client('https://yuneel.cdn.prismic.io/api/v2')

  // Query for all project pages
  const projects = await client.query(
    [Prismic.Predicates.any('document.type', ['projects'])],
    { pageSize: 100 }
  )

  // Map project pages to project routes
  // console.log(projects.results)

  const result = projects.results
    .map(project => {
      const types = project.data.types
        .map(type => {
          const typeUID = type?.projectoverview?.uid
          const routeUID = project?.uid
          if (typeUID && routeUID) {
            return {
              route: '/' + typeUID + '/' + routeUID,
              payload: project
            }
          }
          return null
        })
        .filter(n => n)
      return types
    })
    .flat(1)

  return result
}

export const fetchAllRoutePaths = async () => {
  // Fetch homepage route
  const homepageRoute = await fetchHomePageRoute()

  // Fetch project routes
  const projectRoutes = await fetchProjectRoutes()

  // console.log('projectRoutes', projectRoutes[0])
  // Fetch overview routes
  const overviewRoutes = await fetchOverviewRoutes(projectRoutes)

  // Fetch sounds route
  const soundsRoute = await fetchSoundsRoute()

  // Fetch about route
  const aboutRoute = await fetchAboutRoute()

  // Join all routes together
  const routes = [
    homepageRoute,
    soundsRoute,
    aboutRoute,
    ...projectRoutes,
    ...overviewRoutes
  ]

  // Return routes
  return routes
}
