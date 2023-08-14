// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  protected Users = [
    {
      id: 1,
      nome: 'Kleberson',
    },
    {
      id: 2,
      nome: 'Vinicius',
    },
    {
      id: 3,
      nome: 'João',
    },
  ]

  public async usuarios({ params, response }) {
    if (!params['id'])
      return response.status(200).json({
        mensagem: 'Exemplo de código de status 200',
        users: {
          user: this.Users,
        },
      })

    let myRequestedId: number = params['id']
    let myUser = this.Users.find((user) => user.id == myRequestedId)
    if (!myUser) return response.status(404).json({ mensagem: 'Usuário não encontrado' })
    return response.status(200).json({
      mensagem: 'Exemplo de código de status 200',
      users: {
        user: myUser,
      },
    })
  }
}
