import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Friendship extends BaseModel {
  @column({ isPrimary: true })
  public id: number


  @column()
  public userId: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public token: string
}
