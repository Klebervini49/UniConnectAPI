import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
export default class extends BaseSeeder {
  public async run () {
    await User.create({
        email: 'klebervini0@gmail.com',
        password: '1A2s3d4f'
    })
  }
}
