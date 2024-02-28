import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
      imports: [PostsModule],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should return an array of posts', async () => {
    // Mock data for the postData
    const postData: any = {
      title: 'Título de la publicación',
      content: 'Contenido de la publicación',
    };

    // Mock the response of createPost method in the service
    const mockedResponse = {
      ...postData,
      _id: '65df0de655d6a53bb90bfa17',
      createdAt: '2024-02-28T10:41:42.664Z',
      updatedAt: '2024-02-28T10:41:42.664Z',
      __v: 0,
    };
    jest.spyOn(service, 'createPost').mockResolvedValue(mockedResponse);

    // Call the createPost method on the controller
    const response = await controller.createPost(postData);

    // Check if the response matches the mocked response
    expect(response).toEqual(mockedResponse);
  });
});
