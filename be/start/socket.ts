import StudentActivitiesService from "App/Services/StudentActivitiesService";
import Ws from "App/Services/Ws";
Ws.boot();
const studentActivitiesService = new StudentActivitiesService();

/**
 * Listen for incoming socket connections
 */
Ws.io.on("connection", (socket) => {
  let token = socket.handshake.auth.token;
  if (token == "dedenfriatna") {
    // socket.emit("news", { hello: "worldsdsdsd" });
    // socket.emit("new:user", { user: "Arina Muntazah" });
    // socket.on("tes", (data) => {
    //   console.log(data);
    // });
    //
    studentActivitiesService.scheduler();
    socket.on("activity:getcurrent", async () => {
      const data = await studentActivitiesService.getCurrentActivity();
      socket.emit("activity:current", data);
    });
  }
});
