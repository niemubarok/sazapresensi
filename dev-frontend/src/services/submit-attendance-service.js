import { useAttendancesStore } from "src/stores/attendances-store";
import { useStudentScheduleStore } from "src/stores/studentSchedule-store";
import { useScheduleStore } from "src/stores/schedule-store";
// import { useSettingStore } from "src/stores/setting-store";
// import { useClockStore } from "src/stores/clock-store";
import AttendanceDialog from "src/components/AttendanceDialog.vue";
import { useStudentStore } from "src/stores/student-store";
import { Notify, Dialog } from "quasar";
import { ref } from "vue";
import { getTime } from "src/utilities/time-util.js";
import { useStudentActivitiesStore } from "src/stores/student-activities-store";

import { sendMessage } from "./whatsapp-service";
import ls from "localstorage-slim";

const useStudentAtivities = useStudentActivitiesStore();
const useStudentSchedules = useStudentScheduleStore();
const useSchedules = useScheduleStore();
const useAttendances = useAttendancesStore();
const useStudents = useStudentStore();

export const submit = async (input) => {
  const successAudio = new Audio("src/assets/audio/success_notification.wav");

  await useStudents.getStudentByNisFromDB(input);
  const student = useStudents.getStudentByNis();
  console.log(student?.phone_1);
  // const isStudent = student?.nis == input;

  const studentSchedule = useStudentSchedules.getStudentScheduleByNis(input);
  const schedule = useSchedules.getScheduleById(studentSchedule?.schedule_id);

  const locationId = ls.get("location");
  const isRightClass = schedule?.class_id === locationId.toString();

  const activity = () =>
    useStudentAtivities.getActivitiesTodayByTime(getTime().time);
  const activityId = ls.get("activityId");

  const message = `Santri atas nama *${student?.name}* absen masuk pkl. *${
    getTime().time
  }* \nuntuk kegiatan *${ls.get("activityName")}*`;

  const attendee = ref({
    student_nis: input,
    class_id: locationId,
    activity_id: activityId,
    date: getTime().date,
    in: getTime().time,
    status: "late",
  });

  //cek apakah dia student
  if (student) {
    //cek apakah lokasi dia absen sudah benar

    if (isRightClass == false) {
      Notify.create({
        message: "Kelas salah",
        type: "negative",
        position: "center",
        classes: "q-px-xl",
      });
    } else if (activityId == "null") {
      Notify.create({
        message: "Belum waktunya absen",
        type: "negative",
        position: "center",
        classes: "q-px-xl",
      });
    } else {
      successAudio.play();
      attendee.value.name = student?.name;
      attendee.value.activity = activity()?.name;
      sendMessage(`0${student?.phone_1}`, message);

      useAttendances.addAttendance(attendee.value);
      const dialog = Dialog.create({
        progress: true,
        component: AttendanceDialog,
        componentProps: {
          name: attendee.value.name,
          // in: attendee.value.in,
          // out: attendee.value.out,
          // status: attendee.value.status,
        },
      });
      dialog.update();
      setTimeout(() => {
        dialog.hide();
      }, 2000);
    }
    // else if () {

    // }
  } else {
    console.log("teacher");
  }
};
