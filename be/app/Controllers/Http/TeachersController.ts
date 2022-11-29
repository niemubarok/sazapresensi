import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Teacher from 'App/Models/Teacher'

export default class TeachersController {
  public async index({ response }: HttpContextContract) {
    const teachers = await Teacher.all()


    response.status(200).json({
      status: 200,
      message: "success",
      data: teachers,
    });
  }

  public async create({ }: HttpContextContract) { }

  public async store({ }: HttpContextContract) { }

  public async show({ request, response }: HttpContextContract) {
    const req = request.body()

    const teacher = await Teacher.findBy('nip', req.nip)

    response.status(200).json({
      status: 200,
      message: "success",
      data: teacher,
    });
  }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
