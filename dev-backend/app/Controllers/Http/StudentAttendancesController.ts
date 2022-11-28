import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Student from "App/Models/Student";
import StudentAttendance from "App/Models/StudentAttendance";
import Drive from "@ioc:Adonis/Core/Drive"

export default class StudentAttendancesController {
  public async index({ request, response }: HttpContextContract) {
    const req = request.body().data;
    const today = req.date.slice(0, 10);

    // return today;

    const studentAttendances = await StudentAttendance.query()
      .where("date", today)
      // .where("activity_id", req.activityId)
      .preload("students");

    let data: any[] = [];

    studentAttendances.forEach((each) => {
      const attendances = {
        student_nis: each.student_nis,
        class_id: each.class_id,
        activity_id: each.activity_id,
        date: each.date,
        in: each.in,
        status: each.status,
        name: each.students.name,
        gender: each.students.gender,
      };

      data.push(attendances);
    });

    response.status(200).json({
      status: 200,
      message: "success",
      data: data,
    });
  }

  public async create({ request, response }: HttpContextContract) {
    const req = request.body().data;

    try {
      const student = await Student.findByOrFail("nis", req.id);
      const picture = Drive.getUrl("/tmp/uploads/photos/students/0012421387.jpg")
      // console.log(picture);

      try {
        const store = await StudentAttendance.create({
          student_nis: req.id,
          class_id: req.class_id,
          activity_id: req.activity_id,
          date: req.date,
          in: req.in,
          status: req.status,
        });

        const data = {
          student_nis: req.id,
          class_id: req.class_id,
          activity_id: req.activity_id,
          date: req.date,
          in: req.in,
          status: req.status,
          name: student.name,
          gender: student.gender,
          picture
        };

        if (store.$isPersisted) {
          response.status(201).json({
            status: 201,
            message: "created",
            data: data,
          });
        }
      } catch (error) {
        response.status(304).json({
          status: 304,
          message: "not modified",
        });
      }
    } catch (error) {
      response.status(200).json({
        status: 200,
        message: "student not found",
      });
    }
  }

  public async store({ request }: HttpContextContract) {
    return request.body();
  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
