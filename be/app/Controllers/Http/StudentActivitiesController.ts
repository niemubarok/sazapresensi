import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import StudentActivitiesService from "App/Services/StudentActivitiesService";
import StudentActivity from "App/Models/StudentActivity";
// import { getTime } from "App/Utils/TimeUtil";

export default class StudentActivitiesController {
  public async index(ctx: HttpContextContract) {
    // return new StudentActivitiesService().getActivities(ctx);
    return new StudentActivitiesService().scheduler();
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
