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
            <PrismicImage :field="imageURLMods(project?.gallery?.[0].image)" />
          </div>
        </NuxtLink>
        <div>
          <div v-if="project?.title" class="title">
            <span v-if="hasProjectLink(project)">
              <NuxtLink :to="projectLink(project)">
                {{ $prismic.asText(project.title) }}
              </NuxtLink>
            </span>
            <span v-else>{{ $prismic.asText(project.title) }}</span>
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
              v-if="hasTypes(project.types)"
              v-for="(type, i) in project.types"
            >
              <NuxtLink :to="type?.projectoverview?.uid">{{
                capital(type?.projectoverview?.uid)
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
    projects: {}
  },
  methods: {
    hasTypes(types) {
      return Boolean(types?.[0]?.projectoverview?.uid)
    },
    imageURLMods(imageObj) {
      let url = new URL(imageObj.url)
      url.searchParams.delete('w')
      url.searchParams.delete('h')
      url.searchParams.set('w', 550 * 2) // retina
      url.searchParams.set('h', 550 * 2) // retina
      url.searchParams.set('fit', 'max')
      url.searchParams.set('fill', 'solid')
      url.searchParams.set('fill-color', '151515')
      // https://images.prismic.io/yuneel/...ympics007.JPG?auto=compress,format&rect=774,0,3097,3097&w=1200&h=1200&clip=fit&max-w=450&max-h=450
      imageObj.url = url.toString()
      return imageObj
    },
    capital(word) {
      const firstWord = word?.charAt(0)?.toUpperCase()
      if (firstWord) {
        return firstWord + word?.slice(1)
      }
      return word
    },
    hasProjectLink(project) {
      return Boolean(this.projectLink(project))
    },
    projectLink(project) {
      const type = project?.types?.find(type => {
        return type?.projectoverview?.uid
      })

      return `/${type?.projectoverview?.uid}/${project?.uid}`
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
