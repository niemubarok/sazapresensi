import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/", "TeachersController.show")
  Route.get("/all", "TeachersController.index")
  Route.post("/attendance/create", "TeacherAttendancesController.create");
}).prefix("teacher")

Route.group(() => {
  Route.get("/all", "StudentsController.index");
  Route.get("/activities/all", "StudentActivitiesController.index");
  Route.get("/classes", "ClassesController.index");

  Route.post("/nis", "StudentsController.getByNis");
  Route.post("/class", "StudentsController.getByClass");
  Route.post("/activities/day", "StudentActivitiesController.index");
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


