<template>
  <article id="top">
    <!-- INTRODUCTION -->
    <div class="introduction">
      <prismic-rich-text :field="home.bio" />
    </div>

    <div class="projects">
      <!-- TABLE OF CONTENTS -->
      <div v-if="projects.length !== 0" class="index">
        <div
          class="group"
          v-bind:style="{
            transform: `translate(${-percentage}%) translate3d(-280px, 0px, 0px)`
          }"
          v-for="index in 5"
          :key="index"
        >
          <!-- GROUP -->
          <div
            v-for="(project, i) in projects"
            :key="project.id"
            v-bind:project="project"
            class="item"
            v-bind:style="{
              transform: `translate3d(${(i * num) / 20}px, 0, 0)`
            }"
          >
            <a :href="'#key' + i">
              {{ $prismic.asText(project.title) }}
              <span class="date">
                <span v-if="project.start_date">
                  {{ project.start_date | onlyYear }}
                </span>
                <span v-if="project.end_date">
                  {{ project.end_date | onlyYear }}
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <!-- ALL PROJECTS -->
      <div class="project" v-if="projects">
        <div
          v-for="(project, i) in projects"
          :key="project.id"
          v-bind:project="project"
          class="item"
          :id="'key' + i"
        >
          <div v-if="project.title" class="title">
            {{ $prismic.asText(project.title) }}
            <span class="date">
              <span v-if="project.start_date">
                {{ project.start_date | onlyYear }}
              </span>
              <span v-if="project.end_date">
                - {{ project.end_date | onlyYear }}
              </span>
            </span>
          </div>

          <div class="type">
            <p>
            {{ $prismic.asText(project.type) }}
            </p>
          </div>

          <div v-if="project.description" class="description">
            <prismic-rich-text :field="project.description" />
          </div>

          <div v-if="project.gallery" class="media" v-dragscroll>
            <div v-for="(item, i) in project.gallery" :key="i">
              <a :href="item.image.url" target="_blank">
                <img
                  v-if="item.image.url"
                  :src="`${item.image.url},w=600&h=600`"
                  :alt="item.image.alt"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a href="#top">Scroll to Top</a>
  </article>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import textBalancer from 'text-balancer'
// Text balancer
// testing
export default {
  head() {
    return {
      title: 'Yun Ingrid Eel, Homepage',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'About our company Nuxt.js '
        }
      ]
    }
  },
  directives: {
    dragscroll
  },
  data() {
    return {
      percentage: 0,
      num: 0,
      fields: {
        title: null
      }
    }
  },
  async asyncData({ $prismic, error }) {
    try {
      // Query to get API object
      // Query to get blog home content with LinkedContent
      const document = await $prismic.api.getSingle('homepage-test-', {
        fetchLinks: [
          'projects.title',
          'projects.type',
          'projects.description',
          'projects.start_date',
          'projects.end_date',
          'projects.gallery'
        ]
      })

      const home = document.data
      const projects = document.data.projects.map(project => {
        return project.link_to_projects.data
      })

      // Returns data to be used in template
      return {
        home,
        projects: projects,
        documentId: document.id
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    handleScroll(event) {
      // Any code to be executed when the window is scrolled
      const elTop = document.querySelector('.group').offsetTop
      const winTop = window.scrollY - window.innerHeight

      this.num = elTop - winTop
      this.percentage = (100 / elTop) * winTop
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted() {
    this.handleScroll()
    textBalancer.balanceText('.title, .introduction')
  },
  filters: {
    onlyYear(val) {
      let date = new Date(val)
      return date.getFullYear()
    }
  }
}
</script>

<style lang="scss">
$bg: #151515;
$pink: #f29a9d;
$blue: #3d87ca;
$blue: #15a09b;
$transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 400ms;

p:first-of-type {
  margin-top: 0;
}

a {
  color: $blue;
  text-decoration: none;
}

article {
  padding: 2rem;

  .introduction {
    max-width: 1200px;
    font-size: 2rem;

    @media screen and (max-width: 480px) {
      font-size: 1.8rem;
    }
  }

  .index {
    padding: 2rem 0;
    margin-left: -30%;
    overflow: hidden;

    white-space: nowrap;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    transition: opacity 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);

    a {
      color: inherit;
    }

    .group {
      width: auto;
      font-size: 2rem;

      @media screen and (max-width: 480px) {
        font-size: 1.8rem;
      }

      & + .group {
        margin-left: 4rem;
      }

      .item {
        cursor: pointer;
        &:hover {
          .date {
            transform: translate3d(0px, 0, 0);
            transition: 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
            opacity: 0.5;
          }
        }

        .date {
          transform: translate3d(50px, 0, 0);
          transition: 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
          opacity: 0;
          color: $blue;
          display: inline-block;
        }
      }
    }
  }

  .projects {
    padding: 0rem;

    .project {
      .title {
        font-size: 4rem;
        font-weight: bold;
        line-height: 4rem;
        padding: 1rem 0;
        color: $blue;
        max-width: 80vw;

        @media screen and (max-width: 480px) {
          font-size: 2rem;
          line-height: 2rem;
        }

        .date {
          display: block;
          font-size: 2rem;

          @media screen and (max-width: 480px) {
            font-size: 1.5rem;
          }
        }
      }

      .type {
        color: $blue;
      }

      .item {
        text-transform: none;
        padding-bottom: 3rem;
        font-weight: normal;

        position: relative;

        .description {
          max-width: 450px;
        }

        .media {
          max-width: 150%;
          position: relative;
          display: flex;
          flex-direction: row;
          transition: $transition;
          overflow-x: scroll;
          cursor: grab;
          padding-top: 1rem;

          &::-webkit-scrollbar {
            display: none;
          }

          img {
            opacity: 0.5;
            max-height: 450px;
            transition: $transition;

            &:hover {
              opacity: 1;
              transition: $transition;
            }
          }

          div + div {
            padding: 0 0.2rem;
          }
        }
      }
    }
  }

  .cta {
    color: $pink;
    padding: 2rem;
    border-radius: 4px;
    text-align: center;
    max-width: 45rem;
    margin: 0 auto;

    h1 {
      font-weight: bold;
    }

    p {
      max-width: 35rem;
      margin: 0 auto;
    }

    button {
      background: $pink;
      color: $bg;
      border-radius: 4px;
      padding: 0.5rem 1rem;
      border: none;
      margin: 2rem 0 0 0;
    }
  }
}

.show {
  opacity: 1 !important;
  transition: $transition;

  img {
    right: 0px !important;
  }
}
</style>
