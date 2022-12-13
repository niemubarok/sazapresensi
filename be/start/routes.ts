import Route from "@ioc:Adonis/Core/Route";
import HealthCheck from "@ioc:Adonis/Core/HealthCheck";

Route.group(() => {
  Route.post("/", "TeachersController.show");
  Route.get("/all", "TeachersController.index");
  Route.post("/attendance/create", "TeacherAttendancesController.create");
}).prefix("teacher");

Route.group(() => {
  Route.get("/all", "StudentsController.index");
  Route.get("/activities/all", "StudentActivitiesController.index");
  Route.get("/classes", "ClassesController.index");

  Route.post("/nis", "StudentsController.getByNis");
  Route.post("/class", "StudentsController.getByClass");
  Route.post("/activities/day", "StudentActivitiesController.index");
  Route.patch("/activities/update", "StudentActivitiesController.update");
  Route.post("/attendances", "StudentAttendancesController.index");
  Route.post("/attendances/create", "StudentAttendancesController.create");
}).prefix("/student");

Route.group(() => {
  Route.get("/all", "SettingsController.index");
  Route.patch("/update", "SettingsController.index");
}).prefix("/setting");

Route.group(() => {
  // Route.get("/send/notif/presensi", "WhatsappsController.index");
}).prefix("/wa");

Route.get("/", () => {
  return "works";
});

Route.get("/health", async ({ response }) => {
  const { report, healthy } = await HealthCheck.getReport();
  return healthy
    ? response.status(200).send(report)
    : response.status(400).send(report);
});
