<template>
  <article>
    <div class="article-wrapper sounds-page">
      <div class="article-header">
        <div class="introduction">
          <prismic-rich-text v-if="title" :field="title" />
          <prismic-rich-text v-if="description" :field="description" />
        </div>
        <br />
        <SliceRenderer v-if="slices?.length > 0" :slices="slices" />
      </div>
    </div>
  </article>
</template>

<script>
import SliceRenderer from '../components/SliceRenderer.vue'

export default {
  layout: 'default',
  components: {
    SliceRenderer
  },
  async asyncData({ $prismic, error, params, payload }) {
    if (payload) {
      console.log('sounds', payload)
      return {
        title: payload?.document?.title,
        description: payload?.document?.description,
        slices: payload?.document?.body
      }
    }
    try {
      const sounds = await $prismic.api.getSingle('sounds')
      console.log('sounds', sounds)
      return {
        title: sounds.data.title,
        description: sounds.data.description,
        slices: sounds.data.body
      }
    } catch (e) {
      // Returns error page
      console.log(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style scoped>
.sounds-page {
  max-width: 1200px;
}
</style>
