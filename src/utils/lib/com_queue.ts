import "server-only"
import { QueueEmailClientSingleton } from "./storage/QueueClient";
import { reqT, SendEmailAppointmentRequestPayloadT, sendEmailOTPPayloadT, SendMessageAppointmentPayloadT, sendMessageOTPPayloadT, SendPwdResetMailPayloadT } from "../types";



const encodeMessage = (message: string) => Buffer.from(message).toString('base64')


type datapayloadT = SendPwdResetMailPayloadT | sendEmailOTPPayloadT | SendEmailAppointmentRequestPayloadT

type addQueue_EmailToSendT = (datapayload: datapayloadT, type: reqT) => Promise<void>


export const addQueue_EmailToSend: addQueue_EmailToSendT = async (datapayload, type: reqT) => {

    try {

        console.log("email sending");
        const payload = {
            type: type,
            data: datapayload
        }

        const data = encodeMessage(JSON.stringify(payload))

        console.log("\nAdding email to the queue...");
        console.log(data);

        const client = QueueEmailClientSingleton.getInstance()


        const sendMessage = await client.sendMessage(btoa(data));

        console.log("\nsendmaee", btoa(data));

        console.log("Email added to the queue: ", sendMessage.requestId);


    } catch (error) {
        console.log("Error adding email to the queue: ", error);
    }



}




type dataMessagepayloadT = sendMessageOTPPayloadT | SendMessageAppointmentPayloadT

type addQueue_MessageToSendT = (datapayload: dataMessagepayloadT, type: reqT) => Promise<void>


const addQueue_MessageToSend: addQueue_MessageToSendT = async (datapayload, type) => {

    const payload = {
        type: type,
        data: datapayload
    }


}