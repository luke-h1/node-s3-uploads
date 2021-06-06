import { MyContext } from 'src/types';
import {
  Arg, Args, Ctx, Field, Mutation, ObjectType, Resolver,
} from 'type-graphql';
import { Post } from '../entities/Post';

@ObjectType()
class PostResponse {
  @Field(() => String, { nullable: true })
  errors?: String;

  @Field(() => Post, { nullable: true })
  Post?: Post;
}

@Resolver(Post)
export class PostResolver {
    @Mutation(() => PostResponse)
  async createPost(
        @Arg('name') name: String,
        @Arg('picture') picture: String,
        @Ctx() { req }: MyContext,
  ): Promise<PostResponse> {
    console.log('req.body', req.body);
    console.log('req.params', req.params);
  }
}
