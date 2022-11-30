import Drive from "@ioc:Adonis/Core/Drive";
import { extname } from "path";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Teacher from "App/Models/Teacher";
import TeacherAttendance from "App/Models/TeacherAttendance";

export default class TeacherAttendancesController {
  public async index({}: HttpContextContract) {}

  public async create({ request, response }: HttpContextContract) {
    const req = request.body().data;

    try {
      const teacher = await Teacher.findByOrFail("nip", req.id);

      const avatar = await Drive.getUrl(`/photos/teachers/${req.id}`);
      // const file = makeUrl + ".jpg" || makeUrl + ".jpeg";
      // // const avatar = file
      // console.log(file);

      try {
        const store = await TeacherAttendance.create({
          teacher_nip: req.id,
          class_id: req.class_id,
          activity_id: req.activity_id,
          date: req.date,
          in: req.in,
          out: req.out,
          status: req.status,
        });

        const data = {
          id: req.id,
          class_id: req.class_id,
          activity_id: req.activity_id,
          date: req.date,
          in: req.in,
          status: req.status,
          name: teacher.name,
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
      response.status(404).json({
        status: 404,
        message: "teacher not found",
      });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    // const req = request.body();
    // const store = await TeacherAttendance.create({
    // })
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
