import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Teacher from 'App/Models/Teacher'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Teacher.updateOrCreateMany('nip', [

      {
        nip: "0009107837",
        name: "Arina",
        gender: "P",
        birthdate: new Date("1992-08-26"),
        phone: parseInt("851511315"),
        photo: "tes",
        status: "aktif",
      },
      {
        nip: "0009107839",
        name: "Rizal",
        gender: "L",
        birthdate: new Date("1996-3-26"),
        phone: parseInt("851511315"),
        photo: "tes",
        status: "tidak aktif",
      },

    ])
  }
}
