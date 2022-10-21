import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "student_attendances";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("student_nis", 20).references("nis").inTable("students");
      table.string("class_id", 10).references("id").inTable("classes");
      table
        .integer("activity_id")
        .references("id")
        .inTable("student_activities");
      table.date("date");
      table.time("in");
      table.string("status", 15);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
