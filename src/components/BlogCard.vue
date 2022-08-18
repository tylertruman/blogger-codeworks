<template>
  <div class="blog-card card selectable">
    <div class="card-body">
        <div class="card-title">
            <h5>{{blog.title}}</h5>
        </div>
        <div>
            <p>{{blog.body}}</p>
            <img :src="blog.img">
        </div>
    </div>
  </div>
</template>


<script>

import { Blog } from '../models/Blog';


export default {
  props: {
    blog: { type: Blog, required: true }
  },
  setup(){

    return {

    }
  }
}
</script>


<style lang="scss" scoped>

</style>