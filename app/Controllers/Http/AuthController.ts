import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
export default class AuthController {

  async login ({ request, auth }: HttpContextContract) {
    const { email, password } = request.all();
    return await auth.attempt(email, password, {
      expiresIn: '365 days'
    });
  }
  async logout ({ auth }: HttpContextContract) {
    return await auth.logout();
  }

  async me ({ auth }: HttpContextContract) {
    return {
      isLoggedIn: auth.user,
    }
  }
}
