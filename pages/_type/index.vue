<template>
  <article>
    <div class="article-wrapper">
      <div class="article-header">
        <div class="introduction">
          <prismic-rich-text v-if="title" :field="title" />
          <prismic-rich-text v-if="description" :field="description" />
        </div>
        <br />

        <ProjectsList v-if="projects?.length" :projects="projects" />
      </div>
    </div>
  </article>
</template>

<script>
import ProjectsList from '~/components/ProjectsList'

export default {
  layout: 'default',
  components: {
    ProjectsList
  },
  async asyncData({ $prismic, error, params, payload }) {
    if (payload) {
      const formattedProjects = payload.projects.map(project => {
        return {
          uid: project?.uid,
          title: project?.data?.title,
          description: project?.data?.description,
          type: project?.data?.type,
          types: project?.data?.types,
          start_date: project?.data?.start_date,
          end_date: project?.data?.end_date,
          gallery: project?.data?.gallery
        }
      })

      return {
        title: payload.overview?.data?.title,
        description: payload.overview?.data?.description,
        type: params.type,
        projects: formattedProjects
      }
    }

    try {
      const overview = await $prismic.api.getByUID('overview', params.type)

      const allProjects = await $prismic.api.query(
        [$prismic.predicates.any('document.type', ['projects'])],
        {
          fetch: [
            'projects.title',
            'projects.type',
            'projects.uid',
            'projects.types',
            'projects.description',
            'projects.start_date',
            'projects.end_date',
            'projects.gallery'
          ],
          pageSize: 100
        }
      )

      const projects =
        allProjects?.results?.filter(proj => {
          const types = proj.data.types.map(type => {
            return type.projectoverview.uid
          })

          return types.includes(params.type)
        }) ?? []

      const formattedProjects = projects.map(project => {
        return {
          uid: project?.uid,
          title: project?.data?.title,
          description: project?.data?.description,
          type: project?.data?.type,
          types: project?.data?.types,
          start_date: project?.data?.start_date,
          end_date: project?.data?.end_date,
          gallery: project?.data?.gallery
        }
      })

      return {
        title: overview?.data?.title,
        description: overview?.data?.description,
        type: params.type,
        projects: formattedProjects
      }
    } catch (e) {
      // Returns error page
      console.log(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>
