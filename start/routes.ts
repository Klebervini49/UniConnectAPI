import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'hello world' }
})

Route.group(() => {
  Route.post('/login', 'UsersController.LOGIN')
  Route.post('/cadastro', 'UsersController.CADASTRO')
  Route.post('/mudar-senha', 'UsersController.MUDAR_SENHA')
}).prefix('/users')
