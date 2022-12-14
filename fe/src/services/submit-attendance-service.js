import { useStudentAttendancesStore } from "src/stores/student-attendances-store";
import AttendanceDialog from "src/components/AttendanceDialog.vue";
import { useStudentStore } from "src/stores/student-store";
import { Notify, Dialog } from "quasar";
import { ref, computed } from "vue";
import { getTime, addMinutes, compareTime } from "src/utilities/time-util.js";
import { useStudentActivitiesStore } from "src/stores/student-activities-store";

import { sendMessage } from "./whatsapp-service";
import ls from "localstorage-slim";
import { useTeacherStore } from "src/stores/teacher-store";
import { useTeacherAttendanceStore } from "src/stores/teacher-attendances-store";

const teacherStore = useTeacherStore();
const teacherAttendanceStore = useTeacherAttendanceStore();
const studentActivitiesStore = useStudentActivitiesStore();
const studentAttendanceStore = useStudentAttendancesStore();
const studentStore = useStudentStore();

export const submit = async (input) => {
  const successAudio = new Audio("src/assets/audio/success_notification.wav");
  await studentStore.getStudentByNisFromDB(input);

  const teacher = await teacherStore.getTeacherByNip(input);
  const student = computed(() => studentStore.student);
  const isStudent = student.value?.nis == input;

  const locationId = ref(ls.get("location").id);
  const activity = computed(() => studentActivitiesStore.activity);
  const activityId = ref(activity.value?.id);

  const message = `Santri atas nama *${student?.name}* absen masuk pkl. *${
    getTime().time
  }* \nuntuk kegiatan *${ls.get("activityName")}*`;

  const getTolerance = ls
    .get("settings")
    .find((setting) => setting.name == "toleransi").value;

  const tolerance = addMinutes(activity.value?.start, getTolerance);

  const status = ref("");

  const setStatus = () => {
    const isLate = getTime().time > tolerance;

    if (isLate) {
      status.value = "late";
    } else {
      status.value = "ontime";
    }
  };

  setStatus();

  const attendee = ref({
    id: input,
    class_id: locationId.value,
    activity_id: activityId.value,
    date: getTime().date,
    in: getTime().time,
    status: status.value,
  });

  // if(!isStudent && teacher == null){
  if (activityId.value == null) {
    Notify.create({
      message: "Belum waktunya absen",
      type: "negative",
      position: "center",
      classes: "q-px-xl",
    });
    return;
  } else if (!isStudent && teacher == null) {
    Notify.create({
      message: "Kelas salah",
      type: "negative",
      position: "center",
      classes: "q-px-xl",
    });
    return;
  }

  // return

  //cek apakah sudah absen sebelumnya
  const isStudentPresenced =
    studentAttendanceStore
      .getAttendances(activityId.value)
      .find((val) => val.student_nis == input) != undefined;
  // console.log(isStudentPresenced);

  // return

  //cek apakah dia student
  if (isStudent) {
    //cek putra apa putri
    if (student.gender != ls.get("gender") && ls.get("gender") != "both") {
      const gender = ls.get("gender") == "L" ? "Putra" : "Putri";
      Notify.create({
        message: `Hanya Santri ${gender} yang bisa absen disini`,
        type: "negative",
        position: "center",
        classes: "q-px-xl",
      });
      return;
    }

    // if (isStudentPresenced) {
    //   Notify.create({
    //     message: "Kamu Sudah Absen Sebelumnya",
    //     type: "negative",
    //     position: "center",
    //     classes: "q-px-xl",
    //   });
    // } else {

    successAudio.play();

    attendee.value.name = student?.name;
    attendee.value.activity = activity.value?.name;
    await studentAttendanceStore.addAttendance(attendee.value);
  } else {
    // console.log(teacher?.name);
    attendee.value.name = teacher?.name;
    await teacherAttendanceStore.addAttendance(attendee.value);
    teacherAttendanceStore.findTeacherByNip(input);
    // ls.set("teacher", attendee.value);
  }

  const senderId = ref(ls.get("sender"));
  // sendMessage(`0${student?.phone_1}`, message, senderId.value);

  const dialog = Dialog.create({
    progress: true,
    component: AttendanceDialog,
    componentProps: {
      name: attendee.value.name,
      // in: attendee.value.in,
      // out: attendee.value.out,
      status: attendee.value.status,
    },
  });

  dialog.update();
  setTimeout(() => {
    dialog.hide();
  }, 2000);
};
