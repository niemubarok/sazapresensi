import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'teachers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('nip', 20).primary()
      table.string('name')
      table.enum('gender', ['L', 'P'])
      table.date('birthdate')
      table.bigInteger('phone')
      table.string('photo')
      table.enum('status', ['aktif', 'inactive'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
