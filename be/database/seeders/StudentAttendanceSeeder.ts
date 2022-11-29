import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import StudentAttendance from "App/Models/StudentAttendance";

export default class extends BaseSeeder {
  public async run() {
    await StudentAttendance.updateOrCreateMany("id", [
      {
        id: 1,
        student_nis: "0012421387",
        class_id: "klsvii",
        activity_id: 1,
        date: new Date(2022, 9, 27),
        in: "08:00:00",
        status: "late",
      },
      {
        id: 2,
        student_nis: "320322",
        class_id: "klsviii",
        activity_id: 1,
        date: new Date(2022, 9, 27),
        in: "08:00",
        status: "ontime",
      },
      {
        id: 3,
        student_nis: "0009107838",
        class_id: "klsix",
        activity_id: 2,
        date: new Date(2022, 9, 27),
        in: "08:00",
        status: "ontime",
      },
    ]);
  }
}
