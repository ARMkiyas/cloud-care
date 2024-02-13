
import "server-only"
import { db } from "@/server/db"
import { DayOfWeek } from "@prisma/client"

type validateDB = (doctorId: string, date: Date, startTime: string | Date, endTime: string | Date, dayofweek: DayOfWeek, update?: boolean, scheduleid?: string) => Promise<boolean>


export const ValidateDB: validateDB = async (doctorId, date, startTime, endTime, dayofweek, update, scheduleid) => {



    const timeSc = [
        {
            startTime: {
                lte: startTime

            },
            endTime: {
                gte: endTime
            }

        },
        // check if the start time is between the given time
        {
            startTime: {
                lte: startTime,

            },
            endTime: {
                gte: endTime
            }
        },
        // check if the start time and end time is included in the given time
        {
            startTime: {
                gte: startTime,
            },
            endTime: {
                lte: endTime
            }
        },
    ]

    const schedule = await db.schedule.findFirst({
        where: {
            doctorId: doctorId,
            OR: [
                // check if the start time and end time is between the given time
                {
                    Date: date,
                    OR: timeSc,
                    ...update && {
                        id: {
                            not: scheduleid || null
                        }
                    }

                },

                {
                    dayOfWeek: dayofweek,
                    OR: timeSc,
                    ...update && {
                        id: {
                            not: scheduleid || null

                        }
                    }
                },
                // check if the end time is between the given time

            ]
        }
    })

    console.log(schedule);

    if (schedule) {
        return false
    } {
        return true
    }

}