import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Teacher extends BaseModel {
  @column({ columnName: 'nip', isPrimary: true })
  public nip: String;

  @column()
  public name: String

  @column()
  public gender: String

  @column()
  public birthdate: Date

  @column()
  public phone: Number

  @column()
  public photo: String

  @column()
  public status: String
}
