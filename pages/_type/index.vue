<template>
  <article>
    <div class="article-wrapper">
      <div class="article-header">
        {{ title }}
        <!-- <prismic-rich-text v-if="title" :field="title" /> -->
        <!-- <prismic-rich-text v-if="description" :field="description" /> -->
        <br />
        <div v-for="(project, i) in projects" :key="i">
          <NuxtLink :to="type + '/' + project.uid">
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

  async asyncData(data) {
    const { $prismic, error, params, payload } = data
    console.log("payload?", payload)
    return {
        title: payload?.title,
        description: payload?.description,
        type: params.type,
        projects: []
      }
    // try {
    //   const overview = await $prismic.api.getByUID('overview', params.type)

    //   const allProjects = await $prismic.api.query(
    //     [$prismic.predicates.any('document.type', ['projects'])
    //   ],
    //     { fetch: ['projects.types', 'projects.uid', 'projects.title'], pageSize: 100 }
    //   )

    //   const projects = allProjects?.results?.filter((proj) => {
    //     const types = proj.data.types.map((type) => {
    //       return type.projectoverview.uid
    //     })

    //     return types.includes(params.type)
    //   }) ?? []

    //   return {
    //     title: overview?.data?.title,
    //     description: overview?.data?.description,
    //     type: params.type,
    //     projects: projects
    //   }
    // } catch (e) {
    //   // Returns error page
    //   console.log(e)
    //   error({ statusCode: 404, message: 'Page not found' })
    // }
  }
}
</script>
