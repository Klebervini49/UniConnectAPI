import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all()
    return { message: users }
  }

  public async store({}: HttpContextContract) {
    const data = {
      username: 'Kleberson',
      password: '1616161',
      email: '',
    }

    const user = new User()
    user.username = data.username
    user.email = data.email
    user.password = data.password
    await user.save()

    return { message: user }
  }
}
