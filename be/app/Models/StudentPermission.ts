import Student from "App/Models/Student";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";

export default class StudentPermission extends BaseModel {
  @belongsTo(() => Student, {
    foreignKey: "student_nis",
  })
  public students: BelongsTo<typeof Student>;

  @column({ isPrimary: true })
  public id: number;

  @column()
  public student_nis: String;

  @column()
  public from: Date;

  @column()
  public until: Date;

  @column()
  public reason: String;

  @column()
  public description: String;
}
