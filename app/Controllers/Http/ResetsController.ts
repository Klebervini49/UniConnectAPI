import crypto from 'crypto';
import moment from 'moment-timezone';
import User from 'App/Models/User';
import Database from '@ioc:Adonis/Lucid/Database';
import Mail from '@ioc:Adonis/Addons/Mail';
import bcrypt from 'bcrypt';

export default class ResetsController {
  async requestToken({ request, response }) {
    const email = request.input('email');
    const user = await User.findBy('email', email);

    if (!user) {
      return response.status(404).send({ error: 'Usuário não encontrado' });
    }

    const token = crypto.randomBytes(2).toString('hex');
    const EXPIRATION_TIME = 10;
    const expires_at = moment.tz('America/Sao_Paulo').add(EXPIRATION_TIME, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    const hashedToken = await bcrypt.hash(token, 10);

    await Database.table('password_resets').insert({
      email,
      token: hashedToken,
      expires_at,
    });

    await Mail.send((message) => {
      message
        .to(email)
        .from('UniVerseSocial00@gmail.com', 'UniConnect')
        .subject('Resetar Senha')
        .htmlView('resetPassword', { token });
    });

    return response.send({
      success: true,
      expires_at: expires_at
    });
  }

  async resetPassword({ request, response }) {
    const { token, password, email } = request.only(['token', 'password', 'email']);

    const resetData = await Database.from('password_resets').where('email', email).first();

    if (!resetData) {
      return response.status(404).send({ error: 'Token ou e-mail inválidos' });
    }

    const isTokenValid = await bcrypt.compare(token, resetData.token);

    if (!isTokenValid) {
      return response.status(401).send({ error: 'Token inválido' });
    }

    const isTokenExpired = moment().isAfter(moment(resetData.expires_at));

    if (isTokenExpired) {
      return response.status(401).send({ error: 'Token expirado' });
    }

    const user = await User.findBy('email', email);

    if (!user) {
      return response.status(404).send({ error: 'Usuário não encontrado' });
    }

    user.password = password;
    await user.save();

    await Database.from('password_resets').where('email', email).delete();

    await Mail.send((message) => {
      message
        .to(email)
        .from('UniVerseSocial00@gmail.com', 'UniConnect')
        .subject('Sua senha foi alterada!')
        .htmlView('changedPassword');
    });

    return response.send({ success: true });
  }
}
