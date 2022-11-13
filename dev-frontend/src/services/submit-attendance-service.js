import { useStudentAttendancesStore } from "src/stores/student-attendances-store";
import { useStudentScheduleStore } from "src/stores/studentSchedule-store";
import { useScheduleStore } from "src/stores/schedule-store";
// import { useSettingStore } from "src/stores/setting-store";
// import { useClockStore } from "src/stores/clock-store";
import AttendanceDialog from "src/components/AttendanceDialog.vue";
import { useStudentStore } from "src/stores/student-store";
import { Notify, Dialog } from "quasar";
import { ref } from "vue";
import { getTime, addMinutes, compareTime } from "src/utilities/time-util.js";
import { useStudentActivitiesStore } from "src/stores/student-activities-store";

import { sendMessage } from "./whatsapp-service";
import ls from "localstorage-slim";
import { useTeacherStore } from "src/stores/teacher-store";

const teacherStore = useTeacherStore()
const studentActivitiesStore = useStudentActivitiesStore();
const studentScheduleStore = useStudentScheduleStore();
// const useSchedules = useScheduleStore();
const attendanceStore = useStudentAttendancesStore();
const studentStore = useStudentStore();

export const submit = async (input) => {
  const successAudio = new Audio("src/assets/audio/success_notification.wav");
  await studentStore.getStudentByNisFromDB(input);
  
  const teacher = await teacherStore.getTeacherByNip(input)
  const student = studentStore.getStudentByNis();
  const isStudent = student?.nis == input;

  const studentSchedule = studentScheduleStore.getStudentScheduleByNis(input);
  // const schedule = useSchedules.getScheduleById(studentSchedule?.schedule_id);

  const locationId = ls.get("location");
  const isRightClass =
    studentSchedule?.class_id === locationId.toString() || locationId == "general";

  const activity = () =>
    studentActivitiesStore.getActivitiesTodayByTime(getTime().time);
  const activityId = ref(ls.get("activityId"));

  const message = `Santri atas nama *${student?.name}* absen masuk pkl. *${
    getTime().time
  }* \nuntuk kegiatan *${ls.get("activityName")}*`;

  const toleransi = ls
    .get("settings")
    .data.find((setting) => setting.name == "toleransi").value;

  const status = ref("");
  // const addMin = addMinutes(activity()?.start, toleransi);

  const setStatus = () => {
    const isLate = getTime().time > addMinutes(activity()?.start, toleransi);

    if (isLate) {
      status.value = "late";
    } else {
      status.value = "ontime";
    }
  };

  setStatus();

  const attendee = ref({
    student_nis: input,
    class_id: locationId,
    activity_id: activityId.value,
    date: getTime().date,
    in: getTime().time,
    status: status.value,
  });

  // console.log(activityId.value);
  //cek apakah dia student
  if (isStudent) {
    //cek apakah lokasi dia absen sudah benar

    if (isRightClass == false) {
      Notify.create({
        message: "Kelas salah",
        type: "negative",
        position: "center",
        classes: "q-px-xl",
      });
    } else if (activityId.value == null) {
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

      // console.log(attendee.value.status);

      const senderId = ref(ls.get("sender"));
      // sendMessage(`0${student?.phone_1}`, message, senderId.value);

      attendanceStore.addAttendance(attendee.value);
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

    console.log(teacher);
  }
};
