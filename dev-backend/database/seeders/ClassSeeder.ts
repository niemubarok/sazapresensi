import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Class from "App/Models/Class";

export default class extends BaseSeeder {
  public async run() {
    await Class.updateOrCreateMany("id", [
      {
        id: "klsvii",
        name: "Kelas VII",
      },
      {
        id: "klsviii",
        name: "Kelas VIII",
      },
      {
        id: "klsix",
        name: "Kelas IX",
      },
      {
        id: "klsx",
        name: "Kelas X",
      },
      {
        id: "klsxi",
        name: "Kelas XII",
      },
      {
        id: "msjdl",
        name: "Masjid Putra",
      },
      {
        id: "msjdp",
        name: "Masjid Putri",
      },
    ]);
  }
}
