import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "student_permissions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("student_nis", 20).references("nis").inTable("students");
      table.enum("reason", ["sakit", "pulang", "kegiatan", "bolos"]);
      table.date("from");
      table.date("until");
      table.string("description", 100);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
