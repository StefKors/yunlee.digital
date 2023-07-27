<template>
  <article>
    <div class="article-wrapper">
      <div class="article-header">
        <h1>article page</h1>
        <prismic-rich-text :field="article.title" />
        <!-- <DateFormatter :data="article" /> -->
      </div>
    </div>
  </article>
</template>

<script>
import get from 'lodash.get'

export default {
  layout: 'default',
  async asyncData({ $prismic, error, params }) {
    try {
      const article = await $prismic.api.getByUID("projects", params.uid)
      return {
        article: article.data,
        title: article.data.title[0].text
      }
    } catch (e) {
      // Returns error page
      console.log(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>
