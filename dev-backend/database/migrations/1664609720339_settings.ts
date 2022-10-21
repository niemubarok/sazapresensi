import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'settings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 60)
      table.string('value', 60)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
