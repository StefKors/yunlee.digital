<template>
  <article>
    <div class="article-wrapper">
      <div class="article-header">
        <Carousel v-if="project?.length > 0" :project="project" />
        <prismic-rich-text
          v-if="project?.title"
          class="introduction"
          :field="project?.title"
        />
      </div>
      <div class="main_content">
        <SliceRenderer v-if="slices?.length > 0" :slices="slices" />
      </div>
    </div>
  </article>
</template>

<script>
import Carousel from '~/components/Carousel'
import SliceRenderer from '~/components/SliceRenderer'

export default {
  layout: 'default',
  components: {
    SliceRenderer,
    Carousel
  },
  async asyncData({ $prismic, error, params, payload }) {
    if (payload) {
      return {
        project: payload,
        slices: payload?.body
      }
    }
    try {
      const project = await $prismic.api.getByUID('projects', params.uid)

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
