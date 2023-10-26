<template>
  <article>
    <div class="article-wrapper sounds-page">
      <div class="article-header">
        <div class="introduction">
          <prismic-rich-text v-if="title" :field="title" />
          <prismic-rich-text v-if="description" :field="description" />
        </div>
        <br />

        <div class="slices">
          <div
            class="slide_wrapper"
            v-for="(slice, i) in slices"
            :key="slice.id"
          >
            <div class="slice rich_text" v-if="slice.slice_type == 'rich_text'">
              <prismic-rich-text :field="slice?.primary?.rich_content" />
            </div>

            <div
              class="slice youtube_embed"
              v-if="slice.slice_type == 'youtube_embed'"
            >
              <div
                class="html_content"
                :data-provider="
                  slice.primary.embed_field.provider_name.toLowerCase()
                "
                v-html="slice?.primary?.embed_field?.html"
              ></div>
            </div>
          </div>
        </div>
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
        title: payload.data.title,
        description: payload.data.description,
        slices: payload.data.body
      }
    }
    try {
      const sounds = await $prismic.api.getSingle('sounds')
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

<style>
.sounds-page {
  max-width: 1200px;
}

.slice.rich_text {
  text-transform: none;
  margin: 1rem auto;
}

/* Youtube hack to make it responsive */
div[data-provider^='youtube'] iframe {
  width: 100%;
}
div[data-provider^='youtube'] {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
div[data-provider^='youtube'] iframe,
div[data-provider^='youtube'] object,
div[data-provider^='youtube'] embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
