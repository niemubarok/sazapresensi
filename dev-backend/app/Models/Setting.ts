import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Setting extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: String;

  @column()
  public value: Number;
}
