<template>
  <article id="top">
    <!-- INTRODUCTION -->
    <div class="introduction">
      <prismic-rich-text :field="home.bio" />
    </div>
    <hr />
    <div class="filters">
      <div
        class="filter"
        v-on:click="onFilterClick(null)"
        v-bind:class="{ active: filter === null }"
      >
        <h1>Everything</h1>
      </div>
      <div
        class="filter"
        v-for="(overview, i) in overviews"
        :key="overview.id"
        v-on:click="onFilterClick(i)"
        v-bind:class="{ active: filter === i }"
      >
        <prismic-rich-text :field="overview.data.title" />
      </div>
      <NuxtLink class="filter" to="/sounds">
        <h1>sounds</h1>
      </NuxtLink>
    </div>
    <ProjectsList :projects="filteredProjects" />
    <a href="#top">Scroll to Top</a>
  </article>
</template>

<script>
import ProjectsList from '~/components/ProjectsList'
export default {
  layout: 'default',
  components: {
    ProjectsList
  },
  data() {
    return {
      filter: null
    }
  },
  async asyncData({ $prismic, error, payload }) {
    if (payload) {
      const home = payload?.document
      const projects = home?.projects.map(project => {
        return project?.link_to_projects?.data
      })

      // Returns data to be used in template
      return {
        home,
        projects: projects,
        overviews: payload?.overview,
        documentId: payload?.id
      }
    }

    try {
      // Query to get API object
      // Query to get blog home content with LinkedContent
      // ALSO UPDATE API CONNECTION!
      const document = await $prismic.api.getSingle('homepage-test-', {
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

      const home = document.data
      const projects = document.data.projects.map(project => {
        return project?.link_to_projects.data
      })

      // Query for all overview pages
      const overview = await $prismic.api.query(
        [$prismic.predicates.any('document.type', ['overview'])],
        { pageSize: 100 }
      )

      // Returns data to be used in template
      return {
        home,
        projects: projects,
        overviews: overview?.results,
        documentId: document?.id
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  computed: {
    filteredProjects() {
      if (this.filter == null) {
        return this.projects
      } else {
        return this.projects.filter(project => {
          const typesOnProject =
            project?.types?.map(type => {
              return type.projectoverview.uid
            }) ?? []

          const selectedFilter = this.overviews[this.filter]?.uid
          if (typesOnProject.includes(selectedFilter)) {
            return true
          } else {
            return false
          }
        })
      }
    }
  },
  methods: {
    onFilterClick(index) {
      // set to show all
      if (index === null) {
        this.filter = null
      }

      if (this.filter == index) {
        this.filter = null
      } else {
        this.filter = index
      }
    }
  }
}
</script>
