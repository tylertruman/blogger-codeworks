<template>
    <form @submit.prevent="handleSubmit">
        <p><b>Create Blog</b></p>
        <input type="text" placeholder="title" v-model="editable.title" />
        <br>
        <textarea class="mt-2" type="text" placeholder="body" v-model="editable.body"></textarea>
        <br>
        <button class="btn btn-primary text-center">{{ editable.id ? 'Save' : 'Create' }}</button>
    </form>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { blogsService } from '../services/BlogsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})

    watchEffect(() => {
      if (!AppState.activeBlog) { return }
      editable.value = { ...AppState.activeBlog }
    })

    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await blogsService.editBlog(editable.value)
          } else {
            await blogsService.createBlog(editable.value)
          }
          editable.value = {}
        } catch (error) {
          logger.error('[Create or Edit Blog]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
