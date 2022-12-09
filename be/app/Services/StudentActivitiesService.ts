import StudentActivities from "App/Models/StudentActivity";

import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { getTime, getDayName } from "App/Utils/TimeUtil";
import schedule from "node-schedule";
import Ws from "./Ws";
// import Database from "@ioc:Adonis/Lucid/Database";

export default class StudentActivitiesService {
  public async scheduler() {
    const day = getDayName(getTime().date);
    const activitiesByDay = await StudentActivities.query()
      .where("day", day)
      .orWhere("day", "daily");

    activitiesByDay.forEach((activity) => {
      const time = activity.start; // The time to run the job (HH:mm:ss)
      // const time = "11:22:00"; // The time to run the job (HH:mm:ss)

      // Create a rule to run the job every day at the specified time
      const rule = new schedule.RecurrenceRule();
      rule.hour = parseInt(time.split(":")[0]);
      rule.minute = parseInt(time.split(":")[1]);
      rule.second = parseInt(time.split(":")[2]);

      // Schedule the job to run using the created rule
      schedule.scheduleJob(rule, () => {
        Ws.io.emit("time", time);
        Ws.io.emit("activity:start", activity);

        // Add code here to perform the job
      });
    });

    // return activitiesByDay;
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
    const currentActivity = StudentActivities.query().withScopes((scopes) =>
      scopes.current("daily", "16:30:00")
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
