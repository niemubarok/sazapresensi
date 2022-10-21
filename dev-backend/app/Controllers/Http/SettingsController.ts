import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Setting from "App/Models/Setting";

export default class SettingsController {
  public async index({ response }: HttpContextContract) {
    const settings = await Setting.all();

    response.status(200).json({
      status: 200,
      message: "success",
      data: settings,
    });
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {
    const req = request.body().data;

    const settings = await Setting.findBy("id", req.id);

    response.status(201).json({
      status: 201,
      message: "updated",
      data: settings,
    });
  }

  public async destroy({}: HttpContextContract) {}
}
