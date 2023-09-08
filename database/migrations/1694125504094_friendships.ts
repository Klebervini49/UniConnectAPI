import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'friendships'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('user1_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
        .comment('Quem enviou a solicitação')
      table
        .integer('user2_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
        .comment('Quem recebeu a solicitação')
      table
        .enu('status', ['pendente', 'aceito', 'recusado', 'bloqueado'])
        .defaultTo('pendente')
        .notNullable()

      table.timestamps(true, true)

      table.index(['user1_id'])
      table.index(['user2_id'], 'idx_user1_id_user2_id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
