import { AppState } from "../AppState.js";
import { Blog } from "../models/Blog.js";
import { server } from "./AxiosService.js";

class BlogsService{
    async getBlogs(){
        const res = await server.get('api/blogs')
        AppState.blogs = res.data.map(b => new Blog(b))
    }
}

export const blogsService = new BlogsService()