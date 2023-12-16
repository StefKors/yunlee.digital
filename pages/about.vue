<template>
  <article>
    <div class="article-wrapper about-page">
      <div class="article-header">
        <div class="introduction">
          <prismic-rich-text v-if="title" :field="title" />
          <prismic-rich-text v-if="description" :field="description" />
        </div>
        <br />

        <div class="dates" v-for="date in dateLabels" :key="date">
          <h2 class="date_title">
            {{ date }}
          </h2>

          <div class="events">
            <div
              :key="event.id"
              v-for="event in sortByYear[date]"
            >
              <div class="event_type">{{ event?.type }}</div>
              <prismic-rich-text class="event_title" :field="event?.title1" />
              <prismic-rich-text
                class="event_name"
                :field="event?.event_name"
              />
              <prismic-rich-text
                class="event_location"
                :field="event?.location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import countBy from 'lodash.countby'
import groupBy from 'lodash.groupby'
export default {
  layout: 'default',
  async asyncData({ $prismic, error, params, payload }) {
    if (payload) {
      return {
        title: payload?.document?.title,
        description: payload?.document?.long_bio,
        events: payload?.document?.events?.map(event => {
          const year = new Date(event.date).getFullYear()
          event.year = year
          return event
        })
      }
    }
    try {
      const about = await $prismic.api.getSingle('about')

      return {
        title: about.data?.title,
        description: about.data?.long_bio,
        events: about.data?.events.map(event => {
          const year = new Date(event.date).getFullYear()
          event.year = year
          return event
        })
      }
    } catch (e) {
      // Returns error page
      console.log(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  computed: {
    dateCount() {
      return _.countBy(this.events, item => {
        return item.date
      })
    },
    dateData() {
      return Object.values(this.dateCount)
    },
    dateLabels() {
      return Object.keys(this.sortByYear).reverse()
    },
    typeCount() {
      return countBy(this.events, item => {
        return item.type
      })
    },
    typeData() {
      return Object.values(this.typeCount)
    },
    typeLabels() {
      return Object.keys(this.typeCount)
    },
    sortByYear() {
      return groupBy(this.events, item => {
        return item.year
      })
    }
  },
  methods: {
    onlyYear(val) {
      let date = new Date(val)
      return date.getFullYear()
    }
  }
}
</script>
