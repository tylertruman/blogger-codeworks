<template>
<section class="container">
    <div class="row">
      <div class="col-8 offset-2 my-4">
        <BlogForm/>
      </div>
    </div>
    <div class="row">
      <div class="col-8 offset-2 my-4" v-for="b in blogs" :key="b.id">
      <BlogCard :blog="b"/>
    </div>
  </div>
</section>
  
</template>

<script>
import { computed } from '@vue/reactivity';
import { blogsService } from '../services/BlogsService.js';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup(){
    async function getBlogs(){
      try {
        await blogsService.getBlogs()
      } catch (error) {
        logger.error('Getting Blogs', error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getBlogs()
    })

    return {
      blogs: computed(() => AppState.blogs)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
