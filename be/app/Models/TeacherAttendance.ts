import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TeacherAttendance extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public teacher_nip: String;

  @column()
  public activity_id: Number;

  @column()
  public class_id: String;

  @column()
  public date: Date;

  @column()
  public in: String;

  @column()
  public out: String;

  @column()
  public status: String;
}
