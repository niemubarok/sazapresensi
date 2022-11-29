import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import StudentActivity from "App/Models/StudentActivity";
// import { getTime } from "App/Utils/TimeUtil";

export default class StudentActivitiesController {
  public async index({ request, response }: HttpContextContract) {
    const req = request.body();

    const activityByDay = await StudentActivity.query()
      .where("day", req.day)
      .orWhere("day", "daily");

    if (req.day) {
      response.status(200).json({
        status: 200,
        message: "success",
        data: activityByDay,
      });
    } else {
      const activities = await StudentActivity.all();
      response.status(200).json({
        status: 200,
        message: "success",
        data: activities,
      });
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
