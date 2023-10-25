import Route from '@ioc:Adonis/Core/Route'

Route.post('/', async () => {

  return { hello: 'world' }
})

Route.post('/login', 'AuthController.login');
Route.post('/logout', 'AuthController.logout');
Route.get('/me', 'AuthController.me');
Route.post('/cadastro', 'UsersController.singup');

Route.resource('/posts/', 'PostsController').apiOnly();

Route.post('/string', 'StringsController.validateString')
