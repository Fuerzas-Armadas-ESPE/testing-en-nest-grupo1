import { Controller, Get } from '@nestjs/common';
import { PostsService } from '../posts/posts.service'; // Corrige la ruta de importación

@Controller()
export class ProfileController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getProfile(): string {
    return 'This is the profile page';
  }
}
