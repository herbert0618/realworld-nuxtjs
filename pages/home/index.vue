<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link exact class="nav-link" :class="{
                    active: tab === 'your_feed'
                  }" :to="{
                    name:'home',
                    query:{
                      tab:'your_feed'
                    }
                  }">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link exact class="nav-link" :class="{
                    active: tab === 'global_feed'
                  }" :to="{
                    name:'home',
                    query:{
                      tab:'global_feed'
                    }
                  }">Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if='tag'>
              <li class="nav-item">
                <nuxt-link v-if="tag" exact class="nav-link" :class="{
                      active: tab === tag
                        }" :to="{
                      name:'home',
                      query:{
                        tab:tag
                      }
                    }">#{{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link class="author" :to="`/profile/${article.author.username}`">
                <img :src="article.author.image" />
                <!-- 分页处理
                处理分页参数 -->
              </nuxt-link>
              <div class="info">
                <nuxt-link class="author" :to="`/profile/${article.author.username}`">
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{ active: article.favorited }">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{
              name: 'article',
              params: {
              slug: article.slug
              }}" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span @click="$router.push({
                name: 'article',
                params: {
                slug: article.slug
              }})">Read more...</span>
            </nuxt-link>
          </div>
          <nav>
            <ul class="pagination">
              <li class="page-item" v-for=" item in totalPage" :key="item" :class="item === page ? 'active' : ''">
                <nuxt-link class="page-link" :to="{
                  name:'home',
                  query: {
                    page: item,
                    tag: $route.query.tag,
                    tab: tab
                  }
                }">{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link :to="{
                name:'home',
                 query: {
                   tab: 'tag',
                   tag: item 
                 }
              }" class="tag-pill tag-default" v-for="item in tags" :key="item">{{ item }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticles, getFeedArticles } from '@/api/article'
import { getTags } from '@/api/tag'

export default {
  name: 'HomeIndex',
  props: {},
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 2
    const { tag } = query
    const tab = query.tab || 'global_feed'
    const loadArticles = store.state.user && tab === 
    'your_feed' 
      ? getFeedArticles 
      : getArticles
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit, // 每页大小
        offset: (page - 1) * limit,
      }),
      getTags(),
    ])
    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data
    return {
      limit,
      page,
      articles,
      articlesCount,
      tags,
      tag,
      tab: query.tab || 'global_feed',
    }
  },
  data() {
    return {}
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    },
    ...mapState(['user']),
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped>
</style>
