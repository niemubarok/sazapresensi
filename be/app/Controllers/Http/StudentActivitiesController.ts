import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import StudentActivitiesService from "App/Services/StudentActivitiesService";
// import StudentActivity from "App/Models/StudentActivity";
// import { getTime } from "App/Utils/TimeUtil";

export default class StudentActivitiesController {
  public async index(ctx: HttpContextContract) {
    // return new StudentActivitiesService().getActivities(ctx);
    return new StudentActivitiesService().getAllActivities(ctx);
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {
    return new StudentActivitiesService().getCurrentActivity();
  }

  public async edit({}: HttpContextContract) {}

  public async update(ctx: HttpContextContract) {
    return new StudentActivitiesService().updateActivity(ctx);
  }

  public async destroy({}: HttpContextContract) {}
}
