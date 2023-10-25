import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
export default class AuthController {

  async login ({ request, auth }: HttpContextContract) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password, {
      expiresIn: '365 days'
    });

    return token;
  }

  async logout ({ auth }: HttpContextContract) {
    return await auth.logout();
  }

  async me ({ auth }: HttpContextContract) {
    await auth.authenticate();

    return {
      isLoggedIn: auth.user?.email,
    }
  }

}