import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username', 255).notNullable()
      table.string('profile_picture_url', 255)
      table.string('email', 255).unique().notNullable()
      table.string('password').notNullable()
      table.boolean('email_checked').notNullable().defaultTo(0)

      table.timestamps(true, true)

      table.index(['username', 'email'], 'idx_username_email')
    })
  }

  public async down() {
    ;+this.schema.dropTable(this.tableName)
  }
}
