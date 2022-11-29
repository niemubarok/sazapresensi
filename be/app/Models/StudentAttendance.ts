import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Student from "./Student";

export default class StudentAttendance extends BaseModel {
  @belongsTo(() => Student, {
    foreignKey: "student_nis",
  })
  public students: BelongsTo<typeof Student>;

  @column({ isPrimary: true })
  public id: number;

  @column()
  public student_nis: String;

  @column()
  public activity_id: Number;

  @column()
  public class_id: String;

  @column()
  public date: Date;

  @column()
  public in: String;

  @column()
  public status: String;
}
