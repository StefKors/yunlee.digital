<template>
  <article id="top">
    <!-- INTRODUCTION -->
    <div class="introduction">
      <prismic-rich-text :field="home.bio" />
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
          <div v-if="project.title" class="title">
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

          <Gallery :project="project" />
        </div>
      </div>
    </div>
    <a href="#top">Scroll to Top</a>
  </article>
</template>

<script>
import Gallery from '~/components/Gallery'
import textBalancer from 'text-balancer'
// Text balancer
// testing
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
      }
    }
  },
  async asyncData({ $prismic, error, payload }) {
    const home = payload
    const projects = payload.projects.map(project => {
      return project.link_to_projects.data
    })

    // Returns data to be used in template
    return {
      home,
      projects: projects,
      documentId: document.id
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
    // textBalancer.balanceText('.title, .introduction')
  },
  filters: {
    onlyYear(val) {
      let date = new Date(val)
      return date.getFullYear()
    }
  }
}
</script>
