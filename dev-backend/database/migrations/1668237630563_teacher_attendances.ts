import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'teacher_attendances'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("teacher_nip", 20).references("nip").inTable("teachers");
      table.string("class_id", 10).references("id").inTable("classes");
      table
        .integer("activity_id")
        .references("id")
        .inTable("student_activities");
      table.date("date");
      table.time("in");
      table.time("out");
      table.string("status", 15);
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
