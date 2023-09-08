import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'hello world' }
})

Route.get('/users', 'UsersController.store')
