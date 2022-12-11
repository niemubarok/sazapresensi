import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Student from "App/Models/Student";
import StudentAttendance from "App/Models/StudentAttendance";
import Drive from "@ioc:Adonis/Core/Drive";
import StudentAttendancesService from "App/Services/StudentAttendancesService";

export default class StudentAttendancesController {
  public async index(ctx: HttpContextContract) {
    return StudentAttendancesService.getAttendancesByActivityAndLocation(ctx)
  }

  public async create({ request, response }: HttpContextContract) {
    const req = request.body().data;

    try {
      const student = await Student.findByOrFail("nis", req.id);
      const avatar = await Drive.getUrl(`/photos/students/${req.id}.jpg`);

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
          avatar,
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
