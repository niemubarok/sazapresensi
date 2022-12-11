import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import StudentPermission from "App/Models/StudentPermission";

export default class extends BaseSeeder {
  public async run() {
    await StudentPermission.updateOrCreateMany("id", [
      {
        id: 1,
        student_nis: "0012421387",
        from: new Date("2022-12-11"),
        until: new Date("2022-12-15"),
        reason: "pulang",
        description: "santri pulang kampung",
      },
    ]);
  }
}
