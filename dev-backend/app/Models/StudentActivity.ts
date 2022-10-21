import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
 
export default class StudentActivity extends BaseModel {
  @column({ isPrimary: true })
  public id: Number;

  @column()
  public name: String;

  @column()
  public day: String;

  // @column()
  // public except: String;

  @column()
  public start: String;

  @column()
  public end: String;

  @column()
  public order: Number;
}
