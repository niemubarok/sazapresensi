import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Class from "App/Models/Class";

export default class extends BaseSeeder {
  public async run() {
    await Class.updateOrCreateMany("id", [
      {
        id: "klsvii",
        label: "Kelas VII",
        description: "-"
      },
      {
        id: "klsviii",
        label: "Kelas VIII",
        description: "-"
      },
      {
        id: "klsix",
        label: "Kelas IX",
        description: "-"
      },
      {
        id: "klsx",
        label: "Kelas X",
        description: "-"
      },
      {
        id: "klsxi",
        label: "Kelas XI",
        description: "-"
      },
      {
        id: "klsxii",
        label: "Kelas XII",
        description: "-"
      },
      {
        id: "msjd",
        label: "Masjid",
        description: "general"
      },
      {
        id: "asrm",
        label: "Asrama",
        description: "general"
      },
    ]);
  }
}
