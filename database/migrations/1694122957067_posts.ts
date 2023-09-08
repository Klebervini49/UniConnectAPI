import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.text('content').notNullable()

      table.timestamps(true, true)

      table.index(['user_id'], 'idx_user_id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
