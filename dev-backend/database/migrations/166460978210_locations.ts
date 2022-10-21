import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'locations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 15).primary()
      table.string('name',60)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
