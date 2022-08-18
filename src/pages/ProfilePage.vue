<template>
  <div class="profile-page" v-if="profile">

    <div class="cover-img">
      <div class="position-absolute " style="right:0" v-if="profile.id == account.id">
        <router-link class="btn square btn-warning " :to="{ name: 'Account' }">Edit Account</router-link>
      </div>
      <img :src="profile.picture" alt="" height="120">
      <h3>{{ profile.name }}</h3>
      <p>{{ profile.bio }}</p>
    </div>

    <div class="container">
      <div class="row">
        <div class="mx-auto my-3 col-md-10" v-for="b in blogs" :key="b.id">
          <BlogCard :blog="b" />
        </div>
      </div>
    </div>

  </div>
  <div v-else>
    loading...
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { router } from '../router.js';
import { profilesService } from '../services/ProfilesService.js';
import { blogsService } from '../services/BlogsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    const route = useRoute()

    async function getBlogsByCreatorId() {
      try {
        await blogsService.getBlogsByCreatorId(route.params.profileId)
      } catch (error) {
        logger.error('[Getting Profile Blogs]', error)
        Pop.error(error)
      }
    }

    async function getProfileById() {
      try {
        await profilesService.getProfileById(route.params.profileId)
      } catch (error) {
        logger.error('[Getting Profile]', error)
        Pop.error(error)
        router.push({ name: 'Home' })
      }
    }

    onMounted(() => {
      getProfileById()
      getBlogsByCreatorId()
    })


    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.activeProfile),
      cover: computed(() => `url(${AppState.activeProfile?.coverImg || 'https://cdn.pixabay.com/photo/2017/07/16/17/33/background-2509983_1280.jpg'})`),
      blogs: computed(() => AppState.profileBlogs)
    }
  }
}
</script>


<style lang="scss" scoped>
.cover-img {
  height: 300px;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  display: grid;
  place-content: center;
  color: aliceblue;
  background-image: v-bind(cover);
}
</style>