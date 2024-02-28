import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';

describe('PostsService', () => {
  let service: PostsService;
  let modelMock: jest.Mocked<any>; // Mock del modelo

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken('Post'),
          useFactory: () => ({
            find: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    modelMock = module.get(getModelToken('Post')); // Obtenemos el mock del modelo
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      // Mock data for posts
      const mockPosts = [
        { _id: '1', title: 'Post 1', content: 'Content 1' },
        { _id: '2', title: 'Post 2', content: 'Content 2' },
      ];

      // Mock the execution of find() method to return mockPosts
      modelMock.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockPosts) });

      // Call getAllPosts method on the service
      const result = await service.getAllPosts();

      // Check if the result matches the mockPosts
      expect(result).toEqual(mockPosts);
    });

    it('should throw an error if something goes wrong', async () => {
      // Mock error for the execution of find() method
      const error = new Error('Database connection failed');

      // Mock the execution of find() method to throw an error
      modelMock.find.mockReturnValue({ exec: jest.fn().mockRejectedValue(error) });

      // Call getAllPosts method on the service and expect it to throw an error
      await expect(service.getAllPosts()).rejects.toThrowError(error);
    });

    it('should throw an error if model.find() throws an exception', async () => {
      // Mock the execution of find() method to throw an exception
      modelMock.find.mockImplementation(() => { throw new Error('Database connection failed'); });

      // Call getAllPosts method on the service and expect it to throw an error
      await expect(service.getAllPosts()).rejects.toThrowError('Database connection failed');
    });
  });
});
