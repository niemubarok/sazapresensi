import { BaseModel, column, scope } from "@ioc:Adonis/Lucid/Orm";

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

  public static current = scope((query, day, time) => {
    // console.log(day);

    query
      .where((query) => query.where("day", "=", day)
        .orWhere("day", '=', 'daily'))
      .where("start", "<=", time)
      .where("end", ">=", time);
  });
}
