import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import StudentAttendance from "App/Models/StudentAttendance";

export default class StudentAttendancesService {
    public static async getAttendancesByActivityAndLocation(ctx: HttpContextContract) {
        const req = ctx.request.body()?.data;
        const today = req.date.slice(0, 10);
        let data: any[] = [];

        if (req.activity_id) {

            const studentAttendances = await StudentAttendance.query()
                .where("date", today).where("activity_id", req.activity_id)
                .preload("students");


            studentAttendances.forEach(async (each: any) => {
                const avatar = await Drive.getUrl(
                    `/photos/students/${each.student_nis}.jpg`
                );
                const attendances = {
                    student_nis: each.student_nis,
                    class_id: each.class_id,
                    activity_id: each.activity_id,
                    date: each.date,
                    in: each.in,
                    status: each.status,
                    name: each.students.name,
                    gender: each.students.gender,
                    avatar,
                };

                data.push(attendances);
            });
        }

        ctx.response.status(200).json({
            status: 200,
            message: "success",
            data: data,
        });
    }
}