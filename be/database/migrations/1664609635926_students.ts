import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "students";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id')
      table.string("nis", 20).primary();
      table.string("class_id", 10).references("classes.id");
      table.string("name", 60);
      table.enum("gender", ["L", "P"]);
      table.date("birthdate");
      table.bigInteger("phone_1");
      table.bigInteger("phone_2");
      table.string("photo");
      table.enum("status", ["active", "inactive"]);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
