import StudentActivities from "App/Models/StudentActivity";

import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { getTime, getDayName } from "App/Utils/TimeUtil";
import schedule from "node-schedule";
import Ws from "./Ws";
import Database from "@ioc:Adonis/Lucid/Database";
// import { DateTime } from "luxon";
// import Database from "@ioc:Adonis/Lucid/Database";

export default class StudentActivitiesService {
  public async scheduler() {
    let day = getDayName(getTime().date);

    schedule.scheduleJob("0 5 0 * * *", async () => {
      day = getDayName(getTime().date);
      console.log("new day");
    });

    const activitiesByDay = await StudentActivities.query()
      .where("day", day)
      .orWhere("day", "daily")
      .orWhere("day", "weekday");

    activitiesByDay.forEach((activity) => {
      const start = activity?.start; // The start to run the job (HH:mm:ss)
      const end = activity?.end; // The start to run the job (HH:mm:ss)

      const startRule = new schedule.RecurrenceRule();
      startRule.hour = parseInt(start.split(":")[0]);
      startRule.minute = parseInt(start.split(":")[1]);
      startRule.second = parseInt(start.split(":")[2]);
      schedule.scheduleJob(startRule, () => {
        Ws.io.emit("activity:start", activity);
        console.log(getTime().time);
        console.log(activity?.name);
      });

      const endRule = new schedule.RecurrenceRule();
      endRule.hour = parseInt(end.split(":")[0]);
      endRule.minute = parseInt(end.split(":")[1]);
      endRule.second = parseInt(end.split(":")[2]);

      schedule.scheduleJob(endRule, () => {
        Ws.io.emit("activity:end");
      });
    });
  }

  public async getAllActivities(ctx: HttpContextContract) {
    try {
      const activities = await Database.from("student_activities")
        .select("*")
        .orderBy("order", "asc");

      ctx.response.status(200).json({
        status: 200,
        message: "success",
        data: activities,
      });
    } catch (error) {
      ctx.response.status(500).json({
        message: "success",
        data: error,
      });
    }
  }

  public async getCurrentActivity() {
    const day = getDayName(getTime().date);
    const now = getTime().time;
    const currentActivity = StudentActivities.query().withScopes((scopes) =>
      scopes.current(day, now)
    );
    return currentActivity;
  }

  public async createActivity(ctx: HttpContextContract) {
    // Retrieve the student ID and activity data from the request body
    const data = ctx.request.body().data;

    try {
      // Insert the new activity into the database
      const activity = await StudentActivities.create(data.activity);

      Ws.io.emit("activity:update");
      await this.scheduler();

      ctx.response.status(201).json({
        message: "berhasil tambah aktivitas",
        data: activity,
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async updateActivity(ctx: HttpContextContract) {
    // Retrieve the activity ID and updated data from the request body
    const req = ctx.request.body().data;

    // // Update the activity in the database
    try {
      await StudentActivities.query()
        .where("id", req?.id)
        .update({ [req?.column]: req?.value });

      Ws.io.emit("activity:update");
      await this.scheduler();

      ctx.response.status(201).json({
        message: "berhasil update",
      });
    } catch (err) {
      ctx.response.status(304).json({
        message: "not modified",
      });
    }

    // // Return the updated activity
    // return activity;
  }

  public async deleteActivity(ctx: HttpContextContract) {
    const activityId = ctx.request.body().id;
    const isExist = await StudentActivities.findBy("id", activityId);

    try {
      if (isExist) {
        await StudentActivities.query().where("id", activityId).delete();

        ctx.response.status(204).json({
          message: "berhasil dihapus",
        });
      } else {
        ctx.response.status(301).json({
          message: "Gagal dihapus",
        });
      }
    } catch (error) {
      ctx.response.status(301).json({
        message: "Gagal dihapus",
      });
    }
  }
}
