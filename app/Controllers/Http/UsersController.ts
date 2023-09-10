import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { validate } from 'indicative/validator'
// @ts-ignore
import bcrypt from 'bcrypt'

export default class UsersController {
  private validationRules = {
    email: 'required|email',
    password: 'required|string',
    username: 'required|string',
  }

  async LOGIN({ request, response }: HttpContextContract) {
    const data = request.only(['email', 'password'])

    try {
      await validate(data, {
        email: this.validationRules.email,
        password: this.validationRules.password,
      })
    } catch (error) {
      return response.badRequest({ message: 'Dados inválidos' })
    }

    const user = await User.findBy('email', data.email)

    if (!user) return response.badRequest({ message: 'Email não cadastrado' })

    const passwordMatch = await bcrypt.compare(data.password, user.password)

    if (!passwordMatch) return response.badRequest({ message: 'Senha incorreta' })

    return user
  }

  async CADASTRO({ request, response }: HttpContextContract) {
    const data = request.only(['username', 'email', 'password'])

    try {
      await validate(data, this.validationRules)
    } catch (error) {
      return response.badRequest({ message: 'Dados inválidos' })
    }

    const emailExists = await User.findBy('email', data.email)

    if (emailExists) {
      return response.badRequest({ message: 'Email já cadastrado' })
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = new User()
    user.username = data.username
    user.email = data.email
    user.password = hashedPassword

    await user.save()

    return user
  }

  async MUDAR_SENHA({ request, response }: HttpContextContract) {
    const data = request.only(['email', 'password', 'newpassword'])

    try {
      await validate(data, {
        email: this.validationRules.email,
        password: this.validationRules.password,
        newPassword: 'required|string',
      })
    } catch (error) {
      return response.badRequest({ message: 'Dados inválidos' })
    }

    const user = await User.findBy('email', data.email)

    if (!user) return response.badRequest({ message: 'Email não cadastrado' })

    const passwordMatch = await bcrypt.compare(data.password, user.password)

    if (!passwordMatch) return response.badRequest({ message: 'Senha incorreta' })

    const hashedPassword = await bcrypt.hash(data.newpassword, 10)

    user.password = hashedPassword

    return await user.save()
  }
}
