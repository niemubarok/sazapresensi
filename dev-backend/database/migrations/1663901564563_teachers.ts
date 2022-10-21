import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'teachers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('nip')
      table.string('name')
      table.enum('gender', ['L','P'])
      table.bigInteger('phone')
      table.string('photo')
      table.enum('status', ['aktif','inactive'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
