<template>
  <article>
    <div class="article-wrapper">
      <div class="article-header">
        <prismic-rich-text :field="title" />
        <prismic-rich-text :field="description" />
        <br />
        <div v-for="(project, i) in projects" :key="i">
          <NuxtLink :to="type + '/'+ project.uid">
            <prismic-rich-text :field="project.data.title" />
          </NuxtLink>
        </div>
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
      const overview = await $prismic.api.query(
        [
          $prismic.predicates.fulltext('my.overview.title', params.type),
        ]
      )

      const projects = await $prismic.api.query(
        [
          $prismic.predicates.fulltext('my.projects.type', "Performance"),
        ], { fetch: ['projects.title'] }
      )

      return {
        title: overview.results[0].data.title,
        description: overview.results[0].data.description,
        type: params.type,
        projects: projects.results,
      }
    } catch (e) {
      // Returns error page
      console.log(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>
