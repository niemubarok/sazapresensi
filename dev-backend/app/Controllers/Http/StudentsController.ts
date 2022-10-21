import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Student from "App/Models/Student";

export default class StudentsController {
  public async index({}: HttpContextContract) {
    const students = await Student.all();

    return students;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({ request, response }: HttpContextContract) {
    const req = request.body();
    const student = await Student.findBy("nis", req.nis);

    response.status(200).json({
      status: 200,
      message: "success",
      data: student,
    });
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
