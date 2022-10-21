import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'classes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id').primary()
      table.string('id',10).primary()
      table.string('name', 60)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
