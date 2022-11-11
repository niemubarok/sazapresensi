import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Class from "App/Models/Class";

export default class extends BaseSeeder {
  public async run() {
    await Class.updateOrCreateMany("id", [
      {
        id: "klsvii",
        label: "Kelas VII",
      },
      {
        id: "klsviii",
        label: "Kelas VIII",
      },
      {
        id: "klsix",
        label: "Kelas IX",
      },
      {
        id: "klsx",
        label: "Kelas X",
      },
      {
        id: "klsxi",
        label: "Kelas XI",
      },
      {
        id: "klsxii",
        label: "Kelas XII",
      },
      {
        id: "general",
        label: "General",
      },
      // {
      //   id: "asrama",
      //   label: "Asrama",
      // },
    ]);
  }
}
