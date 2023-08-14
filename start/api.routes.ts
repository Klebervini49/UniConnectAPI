import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/usuarios/:id?', 'HomeController.usuarios').where('id', Route.matchers.number())
}).prefix('/api/')
