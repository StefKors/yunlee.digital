<template>
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
        <NuxtLink v-if="project?.gallery?.[0].image" :to="projectLink(project)">
          <div class="single-media">
            <prismic-image :field="project?.gallery?.[0].image" />
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
</template>
<script>
// import { dragscroll } from 'vue-dragscroll'

export default {
  props: {
    projects: {},
  },
  methods: {
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
    }
  },
  filters: {
    onlyYear(val) {
      let date = new Date(val)
      return date.getFullYear()
    }
  }
  // directives: {
  //   dragscroll
  // }
}
</script>
