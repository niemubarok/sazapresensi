import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "classes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id').primary()
      table.string("id", 10).primary().notNullable();
      table.string("label", 60).notNullable();
      table.string("description", 40);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
