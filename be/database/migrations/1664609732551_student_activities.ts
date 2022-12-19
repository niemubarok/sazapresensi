import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "student_activities";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("name", 60);
      table.string("day", 15);
      table.string("start", 8);
      table.string("end", 8);
      table.integer("order", 2);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
