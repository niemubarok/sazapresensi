import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Setting from "App/Models/Setting";

export default class extends BaseSeeder {
  public async run() {
    await Setting.updateOrCreateMany("id", [
      {
        id: 1,
        name: "toleransi",
        value: "15",
      },
      {
        id: 2,
        name: "baseUrl",
        value: "http://localhost:3333",
      },
    ]);
  }
}
