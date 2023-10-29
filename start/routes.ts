import Route from '@ioc:Adonis/Core/Route'

Route.post('/', async () => {

  return { hello: 'world' }
})

Route.post('/login', 'AuthController.login');
Route.post('/logout', 'AuthController.logout');
Route.get('/me', 'AuthController.me').middleware('auth');
Route.get('/private', 'AuthController.private').middleware('auth');
Route.post('/cadastro', 'UsersController.singup');

Route.post('/reset-password', 'ResetsController.requestToken');
Route.put('/reset-password', 'ResetsController.resetPassword');

Route.resource('/posts/', 'PostsController').apiOnly();

Route.post('/string', 'StringsController.validateString')
