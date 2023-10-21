import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";
import Comment from "App/Models/Comment";
import LikePost from "App/Models/LikePost";

export default class PostsController {
  async index({ response }: HttpContextContract) {
    const posts = await Post.query()
      .select(['posts.id', 'posts.content', 'posts.user_id', 'users.username', 'users.email'])
      .innerJoin('users', 'posts.user_id', 'users.id')
      .orderBy('posts.created_at', 'desc');

    return response.status(200).json({ posts });
  }
  async store({ request, response }: HttpContextContract) {
    const { content } = request.only(['content', 'user_id']);

    if (!content) {
        return response.status(400).json({ message: 'Dados inválidos' });
    }
    const post = new Post();
    post.content = content;

    await post.save();

    return response.status(201).json({ message: 'Post criado com sucesso' });
  }
  async show({ params, response }: HttpContextContract) {
    const post_id = params.id;

    if (!post_id) {
      return response.status(400).json({ message: 'Dados inválidos' });
    }

    const myPost = await Post.find(post_id);

    if (!myPost) {
      return response.status(404).json({ message: 'Post não encontrado' });
    }

    return response.status(200).json(myPost);
  }
  async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const myPost = await Post.find(id);
    const comments = await Comment.findBy('post_id', id);
    const likes = await LikePost.findBy('post_id', id);

    if (!myPost) return response.status(404).json({ message: 'Post não encontrado' });
    if (comments) await comments.delete();
    if (likes) await likes.delete();

    await myPost.delete();

    return response.status(200).json({ message: 'Post deletado com sucesso' });
  }
  async update({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const { content } = request.only(['content']);

    const myPost = await Post.find(id);

    if (!myPost) {
        return response.status(404).json({ message: 'Post não encontrado' });
    }

    myPost.content = content;
    await myPost.save();

    return response.status(200).json({ message: 'Post atualizado com sucesso' });
  }
  async findPostsByUserId({ params, response }: HttpContextContract) {
    const userId = params.id;

    const posts = await Post.query()
      .distinct()
      .select([
        'posts.id',
        'posts.content',
        'users.username',
        'users.profile_picture_url',
        'users.email',
      ])
      .innerJoin('users', 'users.id', 'posts.user_id')
      .innerJoin('friendships', (join) => {
        join.on('users.id', 'friendships.user1_id').orOn('users.id', 'friendships.user2_id');
      })
      .where((query) => {
        query.where((subquery) => {
          subquery.where('friendships.user1_id', userId).orWhere('friendships.user2_id', userId);
        });
      })
      .orderBy('posts.created_at', 'desc');

    return response.status(200).json({ posts });
  }
}
