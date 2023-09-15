import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'hello world' }
})

Route.group(() => {
  Route.post('/login', 'UsersController.LOGIN')
  Route.post('/cadastro', 'UsersController.CADASTRO')
  Route.post('/mudar-senha', 'UsersController.MUDAR_SENHA')
}).prefix('/users')

Route.group(() => {
  Route.post('/retornar-posts', 'PostsController.POSTS_REF_ID')
  Route.get('/retornar-post:id', 'PostsController.POSTS')
}).prefix('/posts')
