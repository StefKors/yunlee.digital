import Prismic from 'prismic-javascript'

const fetchHomePageRoute = async () => {
  // Create Client
  const client = Prismic.client('https://yuneel.cdn.prismic.io/api/v2')
  const document = await client.getSingle('homepage-test-', {
    fetchLinks: [
      'projects.title',
      'projects.type',
      'projects.types',
      'projects.description',
      'projects.start_date',
      'projects.end_date',
      'projects.gallery'
    ]
  })

  return {
    route: '/',
    payload: document.data
  }
}

const fetchOverviewRoutes = async (projectRoutes) => {
  // Create Client
  const client = Prismic.client('https://yuneel.cdn.prismic.io/api/v2')

  // Query for all overview pages
  const overview = await client.query(
    [Prismic.Predicates.any('document.type', ['overview'])],
    { pageSize: 100 }
  )

  // Map overview pages to routes
  return overview.results.map(overview => {
    const projects = projectRoutes.filter(proj => {
      return proj.route.startWith('/' + overview.uid)
    })
    return {
      route: '/' + overview.uid,
      payload: {
        overview: overview,
        projects: projects
      }
    }
  })
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
  return projects.results
    .map(project => {
      const types = project.data.types
        .map(type => {
          const typeUID = type?.projectoverview?.uid
          if (typeUID) {
            return {
              route: '/' + typeUID + '/' + project.uid,
              payload: project
            }
          }
          return null
        })
        .filter(n => n)
      return types
    })
    .flat(1)
}

export const fetchAllRoutePaths = async () => {
  // Fetch homepage route
  const homepageRoute = await fetchHomePageRoute()

    // Fetch project routes
    const projectRoutes = await fetchProjectRoutes()

  // Fetch overview routes
  const overviewRoutes = await fetchOverviewRoutes(projectRoutes)



  // Join all routes together
  const routes = [homepageRoute, ...projectRoutes, ...overviewRoutes]

  // Return routes
  return routes
}
