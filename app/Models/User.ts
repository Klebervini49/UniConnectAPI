import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public username: string;

  @column({ columnName: 'profile_picture_url' })
  public pictureUrl: string;

  @column()
  public email: string;

  @column( { serializeAs: null })
  public password: string;

  @column()
  public emailChecked: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;
}
