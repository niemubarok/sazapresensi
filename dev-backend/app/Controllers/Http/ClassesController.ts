import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Class from "App/Models/Class";

export default class ClassesController {
  public async index({ response }: HttpContextContract) {
    const classes = await Class.all();

    response.json(classes);
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
