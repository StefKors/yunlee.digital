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
        v-for="(overview, i) in overviews"
        :key="overview.id"
        v-on:click="onFilterClick(i)"
        v-bind:class="{ active: filter === i }"
      >
        <prismic-rich-text :field="overview.data.title" />
      </div>
    </div>

    <div class="projects">
      <!-- ALL PROJECTS -->
      <div class="project" v-if="projects">
        <div
          v-for="(project, i) in projects"
          :key="project.id"
          v-bind:project="project"
          class="item"
          :id="'key' + i"
        >
          <NuxtLink :to="projectLink(project)">
            <div class="single-media">
              <prismic-image :field="project.gallery?.[0].image" />
            </div>
          </NuxtLink>
          <div>
            <div v-if="project?.title" class="title">
              {{ $prismic.asText(project.title) }}
              <span class="date">
                <span v-if="project.start_date">
                  {{ project.start_date | onlyYear }}
                </span>
                <span v-if="project.end_date">
                  - {{ project.end_date | onlyYear }}
                </span>
              </span>
            </div>

            <p>
              <span
                class="type"
                v-if="project.types"
                v-for="(type, i) in project.types"
              >
                <NuxtLink :to="type.projectoverview.uid">{{
                  capital(type.projectoverview.uid)
                }}</NuxtLink
                ><span v-if="i < project.types.length - 1">, </span>
              </span>
            </p>
            <div v-if="project.description" class="description">
              <prismic-rich-text :field="project.description" />
            </div>
          </div>

          <!-- <ClientOnly fallback-tag="span" fallback="Loading comments...">
            <Gallery :project="project" />
          </ClientOnly> -->
        </div>
      </div>
    </div>
    <a href="#top">Scroll to Top</a>
  </article>
</template>

<script>
import Gallery from '~/components/Gallery'
export default {
  layout: 'default',
  components: {
    Gallery
  },
  data() {
    return {
      percentage: 0,
      num: 0,
      fields: {
        title: null
      },
      filter: null
    }
  },
  async asyncData({ $prismic, error, payload }) {
    if (payload) {
      const home = payload.document
      const projects = home.projects.map(project => {
        return project.link_to_projects.data
      })

      // Returns data to be used in template
      return {
        home,
        projects: projects,
        overviews: payload.overviews,
        documentId: payload.id
      }
    }

    try {
      // Query to get API object
      // Query to get blog home content with LinkedContent
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
        return project.link_to_projects.data
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
        overviews: overview.results,
        documentId: document.id
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    handleScroll(event) {
      // Any code to be executed when the window is scrolled
      const elTop = document.querySelector('.group').offsetTop
      const winTop = window.scrollY - window.innerHeight

      this.num = elTop - winTop
      this.percentage = (100 / elTop) * winTop
    },
    capital(word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    },
    projectLink(project) {
      const type = project?.types?.find(type => {
        return type.projectoverview.uid
      })
      if (type) {
        return `/${type.projectoverview.uid}/${project.uid}`
      } else {
        console.error('todo: remove')
        return 'test'
      }
    },
    onFilterClick(index) {
      console.log("click", index, this.filter == index)
      if (this.filter == index) {
        this.filter = null
      } else {
        this.filter = index
      }
    }
  },
  created() {
    // window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    // window.removeEventListener('scroll', this.handleScroll)
  },
  mounted() {
    // this.handleScroll()
  },
  filters: {
    onlyYear(val) {
      let date = new Date(val)
      return date.getFullYear()
    }
  }
}
</script>
