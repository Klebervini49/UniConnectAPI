import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Friendship extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user1Id: number

  @column()
  public user2Id: number

  @column()
  public status: 'pendente' | 'aceito' | 'recusado' | 'bloqueado'

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
