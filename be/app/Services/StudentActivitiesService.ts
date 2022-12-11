import StudentActivities from "App/Models/StudentActivity";

import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { getTime, getDayName } from "App/Utils/TimeUtil";
import schedule from "node-schedule";
import Ws from "./Ws";
// import { DateTime } from "luxon";
// import Database from "@ioc:Adonis/Lucid/Database";

export default class StudentActivitiesService {
  public async scheduler() {
    const day = getDayName(getTime().date);

    console.log(day);

    const activitiesByDay = await StudentActivities.query()
      .where("day", day)
      .orWhere("day", "daily")

    activitiesByDay.forEach((activity) => {
      const start = activity?.start; // The start to run the job (HH:mm:ss)
      const end = activity?.end; // The start to run the job (HH:mm:ss)
      const startRule = new schedule.RecurrenceRule();
      startRule.hour = parseInt(start.split(":")[0]);
      startRule.minute = parseInt(start.split(":")[1]);
      startRule.second = parseInt(start.split(":")[2]);
      schedule.scheduleJob(startRule, () => {
        Ws.io.emit("activity:start", activity);
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

  public async getActivities(ctx: HttpContextContract) {
    const req = ctx.request.body();

    if (req?.day) {
      const activityByDay = await StudentActivities.query()
        .where("day", req?.day)
        .orWhere("day", "daily");
      ctx.response.status(200).json({
        status: 200,
        message: "success",
        data: activityByDay,
      });
    } else {
      const activities = await StudentActivities.all();
      ctx.response.status(200).json({
        status: 200,
        message: "success",
        data: activities,
      });
    }
  }

  public async getCurrentActivity() {
    const day = getDayName(getTime().date);
    const now = getTime().time
    const currentActivity = StudentActivities.query().withScopes((scopes) =>
      scopes.current(day, now)
    );
    return currentActivity;
  }

  // public async createActivity(ctx: HttpContextContract) {
  //   // Retrieve the student ID and activity data from the request body
  //   const studentId = ctx.params.id;
  //   const data = ctx.request.only(["title", "description"]);

  //   // Insert the new activity into the database
  //   const activity = await Database.table("activities").insert({
  //     studentId,
  //     ...data,
  //   });

  // Return the created activity
  //   return activity;
  // }

  // public async updateActivity(ctx: HttpContextContract) {
  //   // Retrieve the activity ID and updated data from the request body
  //   const activityId = ctx.params.id;
  //   const data = ctx.request.only(["title", "description"]);

  //   // Update the activity in the database
  //   const activity = await Database.table("activities")
  //     .where("id", activityId)
  //     .update(data);

  //   // Return the updated activity
  //   return activity;
  // }

  // public async deleteActivity(ctx: HttpContextContract) {
  //   // Retrieve the activity ID from the request parameters
  //   const activityId = ctx.params.id;

  //   // Delete the activity from the database
  //   const activity = await Database.table("activities")
  //     .where("id", activityId)
  //     .delete();

  //   // Return the deleted activity
  //   return activity;
  // }
}
