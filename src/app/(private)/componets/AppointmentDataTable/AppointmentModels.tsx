import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useApiClient } from "@/utils/trpc/Trpc";
import { AppointmentDataType } from "@/utils/types";
import { Appointmentstatus } from "@/utils/comonDatas";

export const openDeleteModal = (record) => {
  const utils = useApiClient.useUtils();

  const { mutateAsync: deleteappointasync, isSuccess: deletedsuccess } =
    useApiClient.appointment.deleteAppointment.useMutation({
      onSuccess: (data) => {
        if (data.data.count > 0) {
          utils.appointment.getAppointments.invalidate();
        }
      },
    });

  const deleteHandler = async (deleteId: { id: string }[]) => {
    const id = notifications.show({
      title: "Deleting",
      message: "Deleting the appointment....",
      autoClose: false,
      withCloseButton: false,
      loading: true,
    });
    try {
      console.log(deleteId);
      const response = await deleteappointasync({ deleteMany: deleteId });
      console.log(response);
      notifications.update({
        id,
        title: "Deleted",
        message: "Appointment deleted successfully",
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
        color: "green",
      });
    } catch (error) {
      notifications.update({
        id,
        title: "Error",
        message: "Error while deleting the appointment",
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
        color: "red",
      });
    }
  };

  return modals.openConfirmModal({
    title: "Delete your profile",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to delete the Appointments? This action is
        destructive and the data cannot be recovered.
      </Text>
    ),
    labels: { confirm: "Delete account", cancel: "No don't delete it" },

    confirmProps: { color: "red" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => {
      const data = record.map((item) => ({
        id: item.id,
      }));
      return deleteHandler(data);
    },
  });
};

export const openEditModal = (
  record: AppointmentDataType[],
  type: (typeof Appointmentstatus)[number],
) => {
  const utils = useApiClient.useUtils();
  const { mutateAsync, isLoading } =
    useApiClient.appointment.editAppointment.useMutation({
      onSuccess: (data) => {
        if (data.data.count > 0) {
          utils.appointment.getAppointments.invalidate();
        }
      },
    });

  const handleAppointmentedit = async (
    record: AppointmentDataType[],
    data: (typeof Appointmentstatus)[number],
  ) => {
    const id = notifications.show({
      title: "Updating",
      message: "Updating the appointment....",
      autoClose: false,
      withCloseButton: false,
      loading: true,
    });
    try {
      const response = await mutateAsync({
        data: record.map((item) => ({
          id: item.id,
          status: data,
          date: item.appointmentDate,
        })),
      });

      if (response.data.count > 0) {
        notifications.update({
          id,
          title: "Updated",
          message: "Appointment updated successfully",
          loading: false,
          autoClose: 5000,
          withCloseButton: true,
          color: "green",
        });
      } else {
        return new Error("Error while Updating the appointment");
      }
    } catch (error) {
      notifications.update({
        id,
        title: "Error",
        message: "Error while Updating the appointment",
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
        color: "red",
      });
    }
  };

  return modals.openConfirmModal({
    title: "Please confirm your action",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to change the status of the Appointments to {type}{" "}
        ?
      </Text>
    ),
    labels: { confirm: "Confirm", cancel: "Cancel" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => handleAppointmentedit(record, type),
  });
};
