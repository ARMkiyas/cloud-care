import "server-only"
import { QueueEmailClientSingleton, QueueMessageClientSingleton } from "./storage/QueueClient";
import { reqT, SendEmailAppointmentRequestPayloadT, sendEmailOTPPayloadT, SendMessageAppointmentPayloadT, sendMessageOTPPayloadT, SendPwdResetMailPayloadT, SendPwdResetMessagePayloadT } from "../types";



const encodeMessage = (message: string) => Buffer.from(message).toString('base64')


type datapayloadT = SendPwdResetMailPayloadT | sendEmailOTPPayloadT | SendEmailAppointmentRequestPayloadT | sendMessageOTPPayloadT | SendMessageAppointmentPayloadT | SendPwdResetMessagePayloadT

type addQueue_ToSendT = (datapayload: datapayloadT, type: reqT, mode: "email" | "wp" | "both") => Promise<void>



export const addQueue_ToSend: addQueue_ToSendT = async (datapayload, type: reqT, mode) => {

    try {

        console.log("email sending");
        const payload = {
            type: type,
            data: datapayload
        }

        const data = encodeMessage(JSON.stringify(payload))
        if (mode === "email" || mode === "both") {

            console.log("\nAdding email to the queue...");

            const clientEmail = QueueEmailClientSingleton.getInstance()

            const sendMessage = await clientEmail.sendMessage(btoa(data));

        }

        if (mode === "wp" || mode === "both") {

            console.log("\nAdding Message to the queue...");

            const clientMessge = QueueMessageClientSingleton.getInstance()

            await clientMessge.sendMessage(btoa(data));
        }


    } catch (error) {
        console.log("Error adding email to the queue: ", error);
    }


}


