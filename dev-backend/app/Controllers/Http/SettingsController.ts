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

  public async create({ request, response }: HttpContextContract) {
    const req = request.body();
    const name = req.name;
    const value = req.value;

    const store = await Setting.create({ name: name, value: value });
    response.status(200).json({
      status: 201,
      message: "success",
      // data: settings,
    });
  }

  public async store({}: HttpContextContract) {}

  public async getSetting({}: HttpContextContract) {}

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
