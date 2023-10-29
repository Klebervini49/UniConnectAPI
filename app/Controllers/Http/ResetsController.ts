import crypto from 'crypto'
import moment from 'moment'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class ResetsController {
  async RequestToken({ request, response }) {
    const email = request.input('email')
    const user = await User.findBy('email', email)

    if (!user) {
      return response.status(404).send({ error: 'Usuário não encontrado' })
    }

    const token = crypto.randomBytes(2).toString('hex')
    const expires_at = moment().add(10, 'minutes').format()

    await Database.table('password_resets').insert({
      email,
      token,
      expires_at,
    })

    await Mail.send((message) => {
      message
        .to(email)
        .from('UniVerseSocial00@gmail.com', 'UniConnect')
        .subject('Resetar Senha')
        .htmlView('resetPassword', { token })
    })

    return response.send({ success: true })
  }
}
