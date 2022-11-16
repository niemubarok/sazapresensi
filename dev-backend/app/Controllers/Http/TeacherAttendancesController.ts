import type { HttpContextContract } from '@ioc:Adonip/Core/HttpContext'
import Teacher from 'App/Models/Teacher';
import TeacherAttendance from 'App/Models/TeacherAttendance'

export default class TeacherAttendancesController {
  public async index({ }: HttpContextContract) { }

  public async create({ request, response }: HttpContextContract) {
    const req = request.body().data;

    try {
      const teacher = await Teacher.findByOrFail("nip", req.teacher_nip);

      try {
        const store = await TeacherAttendance.create({
          teacher_nip: req.teacher_nip,
          class_id: req.class_id,
          activity_id: req.activity_id,
          date: req.date,
          in: req.in,
          out: req.out,
          status: req.status,
        });

        const data = {
          teacher_nip: req.teacher_nip,
          class_id: req.class_id,
          activity_id: req.activity_id,
          date: req.date,
          in: req.in,
          status: req.status,
          teachers: {
            name: teacher.name,
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
        message: "teacher not found",
      });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const req = request.body()

    // const store = await TeacherAttendance.create({

    // })
  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
