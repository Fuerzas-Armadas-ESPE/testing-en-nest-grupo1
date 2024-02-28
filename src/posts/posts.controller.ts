import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return await this.postsService.getPost(id);
  }

  @Post()
  async createPost(@Body() postData: any) {
    return await this.postsService.createPost(postData);
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() postData: any,
  ): Promise<any> {
    return await this.postsService.updatePost(id, postData);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    await this.postsService.deletePost(id);
    return { message: 'Post deleted successfully' };
  }
}
