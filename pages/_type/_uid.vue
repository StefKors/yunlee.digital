<template>
  <article>
    <div class="article-wrapper">
      <div class="article-header">
        <Gallery :project="project" />
        <prismic-rich-text class="introduction" :field="project.title" />
      </div>
      <div class="main_content">
        <SliceRenderer :slices="slices" />
      </div>
    </div>
  </article>
</template>

<script>
import SliceRenderer from '~/components/SliceRenderer'

export default {
  layout: 'default',
  components: {
    SliceRenderer
  },
  async asyncData({ $prismic, error, params, payload }) {
    if (payload) {
      return {
        project: payload.data,
        slices: project.data?.body
      }
    }
    try {
      const project = await $prismic.api.getByUID('projects', params.uid)
      console.log(project.data.body)
      return {
        project: project.data,
        slices: project.data?.body
      }
    } catch (e) {
      // Returns error page
      console.log(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>
