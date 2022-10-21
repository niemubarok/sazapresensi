import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Student from "App/Models/Student";

export default class extends BaseSeeder {
  public async run() {
    await Student.updateOrCreateMany("nis", [
      {
        nis: "0012421387",
        class_id: "klsvii",
        name: "Husni Mubarok",
        gender: "L",
        birthdate: new Date("1992-09-20"),
        phone_1: parseInt("085524914191"),
        phone_2: parseInt("85523123123"),
        photo: "test",
        status: "active",
      },
      {
        nis: "320322",
        class_id: "klsvii",
        name: "Arina Muntazah",
        gender: "P",
        birthdate: new Date("1992-08-26"),
        phone_1: parseInt("085524914191"),
        phone_2: parseInt("85523123123"),
        photo: "test",
        status: "active",
      },
      {
        nis: "0009107838",
        class_id: "klsviii",
        name: "Rian Rizal Maulana",
        gender: "L",
        birthdate: new Date("1992-09-20"),
        phone_1: parseInt("085524914191"),
        phone_2: parseInt("85523123123"),
        photo: "test",
        status: "active",
      },
    ]);
    // Write your database queries inside the run method
  }
}
