<template>
  <article>
    <div class="article-wrapper">
      <div class="article-header">
        <Gallery :project="project" />
        <prismic-rich-text class="introduction" :field="project.title" />
        <!-- <DateFormatter :data="article" /> -->
      </div>
    </div>
  </article>
</template>

<script>
import Gallery from '~/components/Gallery'

export default {
  layout: 'default',
  components: {
    Gallery
  },
  async asyncData({ $prismic, error, params, payload }) {
    if (payload) {
      return {
        project: payload.data
      }
    }
    try {
      const project = await $prismic.api.getByUID("projects", params.uid)
      console.log(project.data)
      console.log(project.data.body)
      return {
        project: project.data
      }
    } catch (e) {
      // Returns error page
      console.log(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>
