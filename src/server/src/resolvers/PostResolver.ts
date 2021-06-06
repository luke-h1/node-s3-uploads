import { MyContext } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
import { Post } from '../entities/Post';

@InputType()
class PostInput {
  @Field()
  title: string;

  @Field()
  picture: string;
}

@Resolver(Post)
export class PostResolver {
  @Mutation(() => Boolean)
  async createPost(
    @Arg('input') input: PostInput,
    @Ctx() { req }: MyContext,
  ) {
    console.log('req.body', req.body);
    console.log('req.params', req.params);
    console.log('picture', input.picture);
    console.log('title', input.title);
    return true;
  }
}
