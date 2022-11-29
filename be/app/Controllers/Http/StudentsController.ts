import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Student from "App/Models/Student";
import Drive from "@ioc:Adonis/Core/Drive";

export default class StudentsController {
  public async index({ }: HttpContextContract) {
    const students = await Student.all();

    const url = await Drive.getUrl("/photos/students/0012421387.jpg");
    return url;
  }

  public async create({ }: HttpContextContract) { }

  public async store({ }: HttpContextContract) { }

  public async getByNis({ request, response }: HttpContextContract) {
    const req = request.body();
    const student = await Student.findBy("nis", req?.nis);

    response.status(200).json({
      status: 200,
      message: "success",
      data: student,
    });
  }
  public async getByClass({ request, response }: HttpContextContract) {
    const req = request.body();

    try {

      let students = req?.isGeneral
        ? await Student.all()
        : await Student.query().where("class_id", req?.locationId);

      response.status(200).json({
        status: 200,
        message: "success",
        data: students,
      });
    } catch (error) {
      response.status(301).json({
        status: 301,
        message: "request not complete",
      });
    }
  }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
