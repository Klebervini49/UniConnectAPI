import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";
export default class PostsController {
    async POSTS_REF_ID ({ request, response }: HttpContextContract) {
        try {
            const { id } = request.only(['id']);
            const userId = id;

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
                    }).andWhere('users.id', '!=', userId);
                })
                .orderBy('posts.created_at', 'desc');

            return response.status(200).json({ posts });
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao buscar posts.' });
        }
    }


    async POSTS ({ params }: HttpContextContract) {
        const post_id = params.id;

        const myPost = await Post.find(post_id)

        if(!myPost) {
            return { message: 'Post não encontrado' }
        }

        return myPost

    }
}
