import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Student from "App/Models/Student";
import StudentAttendance from "App/Models/StudentAttendance";

export default class StudentAttendancesController {
  public async index({ request, response }: HttpContextContract) {
    const req = request.body().data;
    const today = req.date.slice(0, 10);

    // return today;

    const studentAttendances = await StudentAttendance.query()
      .where("date", today)
      // .where("activity_id", req.activityId)
      .preload("students");
    response.status(200).json({
      status: 200,
      message: "success",
      data: studentAttendances,
    });

    console.log(studentAttendances);
  }

  public async create({ request, response }: HttpContextContract) {
    const req = request.body().data;

    try {
      const student = await Student.findByOrFail("nis", req.student_nis);

      try {
        const store = await StudentAttendance.create({
          student_nis: req.student_nis,
          class_id: req.class_id,
          activity_id: req.activity_id,
          date: req.date,
          in: req.in,
          status: req.status,
        });

        const data = {
          student_nis: req.student_nis,
          class_id: req.class_id,
          activity_id: req.activity_id,
          date: req.date,
          in: req.in,
          status: req.status,
          students: {
            name: student.name,
          },
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

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
