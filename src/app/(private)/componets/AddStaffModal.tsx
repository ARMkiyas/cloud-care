import {
  adminDepartment,
  AdminJobTitle,
  DoctorSpecialization,
  MedicalDepartments,
  OtherJobTitles,
  TadminDepartment,
  TAdminJobTitle,
  TDoctorSpecialization,
  TMedicalDepartments,
  TOtherJobTitles,
} from "@/utils/comonDatas";
import { frontSASimageUpload } from "@/utils/lib/frontSASimageUpload";
import { Ttitle, gender, title } from "@/utils/lib/others/person";
import { useApiClient } from "@/utils/trpc/Trpc";
import {
  ACCEPTED_IMAGE_TYPES,
  imageSchema,
} from "@/utils/ValidationSchemas/commonSc";
import { createStaffSchema } from "@/utils/ValidationSchemas/FrontendValidation";
import {
  AutocompleteFactory,
  Button,
  ClassNames,
  FileInput,
  FileInputFactory,
  InputBase,
  Modal,
  NativeSelect,
  NativeSelectFactory,
  Select,
  SelectFactory,
  TextInput,
  TextInputFactory,
} from "@mantine/core";
import { DateInput, DateInputFactory } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconPictureInPicture } from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";
import React, { HTMLAttributes, useEffect } from "react";
import { IMaskInput } from "react-imask";

type AddstaffPropsType = {
  opened: boolean;
  close: () => void;
  edit?: boolean;
  editdata?: editFormValue;
};

type staffType = "doctor" | "nurse" | "admin" | "others";

const staffType = [
  {
    label: "Doctor",
    value: "doctor",
  },
  { value: "nurse", label: "Nurse" },
  {
    value: "admin",
    label: "Admin or Managers",
  },
  { value: "others", label: "Others" },
];

export type TformValue = {
  title: Ttitle;
  firstName: string;
  lastName: string;
  picture?: File | null;
  idType: "NIC" | "Passport";
  GovtId: string;
  dob: Date;
  gender: (typeof gender)[number];
  phone: string;
  email: string;
  idNumber: string;
  staffType: staffType;
  department: TadminDepartment | TMedicalDepartments | "";
  jobtitle?: TAdminJobTitle | TOtherJobTitles | "";
  DoctorSpecialization?: TDoctorSpecialization | "";
};

export type editFormValue = {
  id: string;
  data: TformValue;
};

const TextInputClasses: ClassNames<
  | TextInputFactory
  | DateInputFactory
  | AutocompleteFactory
  | NativeSelectFactory
  | SelectFactory
  | FileInputFactory
> = {
  input:
    "w-full border border-solid border-gray-200 rounded-md  focus:border-violet-300",
  root: "w-full",
};

const FormGroupStyles: HTMLAttributes<HTMLDivElement>["className"] =
  "flex items-stretch justify-between gap-4 mt-5 max-md:max-w-full max-md:flex-wrap";

async function getBase64(file): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

export default function AddStaffModal({
  opened,
  close,
  edit,
  editdata,
}: AddstaffPropsType) {
  const initData: TformValue = {
    title: "Mr",
    firstName: "",
    lastName: "",
    dob: null,
    email: "",
    gender: "Male",
    GovtId: "",
    idNumber: "",
    idType: "NIC",
    phone: "",
    staffType: "doctor",
    department: null,
    jobtitle: null,
    DoctorSpecialization: null,
    picture: null,
  };

  const form = useForm<TformValue>({
    initialValues: initData,
    validate: zodResolver(createStaffSchema),
  });

  useEffect(() => {
    if (edit && editdata?.data) {
      form.setValues(editdata?.data);
    }

    return () => form.setValues(initData);
  }, [editdata?.data]);

  const [loading, setLoading] = React.useState(false);

  console.log(editdata);

  const { mutateAsync, isLoading } =
    useApiClient.manageStaff.createStaff.useMutation({
      onSuccess(val) {
        notifications.show({
          title: "Create an New staff",
          message: "New Staff Created successfully",
        });
        form.reset();
      },
      onError(error) {
        setLoading(false);
      },
    });

  const utils = useApiClient.useUtils();

  const { mutateAsync: getimagesas, isLoading: getsaasimagesas } =
    useApiClient.requestimgUploadLink.request.useMutation({
      onError: (error) => {
        setLoading(false);
      },
    });

  const CreateHanlder = async (val: TformValue) => {
    try {
      // uploading your img file
      setLoading(true);
      let imageupload = null;
      if (val?.picture) {
        const sasurl = await getimagesas({
          imagetype: val.picture.type,
          name: val.firstName,
        });

        imageupload = await frontSASimageUpload(
          sasurl.data.url,
          sasurl.data.blobname,
          val.picture,
        );
      }

      const create = await mutateAsync({
        ...val,
        ...(val.idType === "NIC"
          ? {
              NIC: val.GovtId,
            }
          : {
              Passport: val.GovtId,
            }),
        ...(val.staffType === "doctor" && {
          specialization: val.DoctorSpecialization as TDoctorSpecialization,
        }),
        jobtitle: val.jobtitle as TAdminJobTitle | TOtherJobTitles,
        dateOfBirth: val.dob,
        staffType: val.staffType,
        department: val.department as TadminDepartment | TMedicalDepartments,
        gender: val.gender === "Male" ? "male" : "female",
        ...(val.picture && {
          image: imageupload,
        }),
      });
      setLoading(false);
    } catch {
      setLoading(false);
      throw new Error("Error while creating new staff");
    }
  };

  const {
    mutateAsync: updateAsy,
    isLoading: updating,
    data,
  } = useApiClient.manageStaff.updatestaff.useMutation({
    onSuccess(data, variables, context) {
      utils.manageStaff.getStaff.invalidate();
      notifications.show({
        title: `updated staff Details`,
        message: ` ${data.data.title}.${data.data.firstName}  ${data.data.lastName} Updated successfully`,
      });
      close();
    },
    onError(error) {
      setLoading(false);
    },
  });

  const editHandler = async (val: TformValue) => {
    try {
      setLoading(true);
      let imageupload = null;
      if (val?.picture) {
        const sasurl = await getimagesas({
          imagetype: val.picture.type,
          name: val.firstName,
        });

        imageupload = await frontSASimageUpload(
          sasurl.data.url,
          sasurl.data.blobname,
          val.picture,
        );
      }

      const update = await updateAsy({
        staffID: editdata.id,
        data: {
          ...val,
          ...(val.idType === "NIC"
            ? {
                NIC: val.GovtId,
              }
            : {
                Passport: val.GovtId,
              }),
          ...(val.staffType === "doctor" && {
            specialization: val.DoctorSpecialization as TDoctorSpecialization,
          }),
          jobtitle: val.jobtitle as TAdminJobTitle | TOtherJobTitles,
          dateOfBirth: val.dob,
          staffType: val.staffType,
          department: val.department as TadminDepartment | TMedicalDepartments,
          gender: val.gender === "Male" ? "male" : "female",
          ...(val.picture && {
            image: imageupload,
          }),
        },
      });
    } catch (error) {
      setLoading(false);
      throw new Error("Error while updating staff");
    }
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => {
          !edit && utils.manageStaff.getStaff.invalidate();
          close();
        }}
        title="Create An Staff"
        centered
        size={"xl"}
      >
        <form
          className="space-y-3"
          onSubmit={form.onSubmit(!edit ? CreateHanlder : editHandler)}
        >
          <div className={FormGroupStyles}>
            <NativeSelect
              size="md"
              classNames={{
                input:
                  "w-full border border-solid border-gray-200 rounded-md  focus:border-violet-300",
                root: "w-[50%]",
              }}
              data={title}
              {...form.getInputProps("title")}
            />
            <TextInput
              size="md"
              placeholder="First Name"
              {...form.getInputProps("firstName")}
              classNames={TextInputClasses}
            />
            <TextInput
              size="md"
              placeholder="Last Name"
              {...form.getInputProps("lastName")}
              classNames={TextInputClasses}
            />
          </div>
          <div className={FormGroupStyles}>
            <NativeSelect
              size="md"
              classNames={{
                input:
                  "w-full border border-solid border-gray-200 rounded-md  focus:border-violet-300",
                root: "w-[50%]",
              }}
              data={["NIC", "Passport"]}
              {...form.getInputProps("idType")}
            />
            <TextInput
              size="md"
              placeholder="Staff NIC/Passport Number"
              classNames={TextInputClasses}
              {...form.getInputProps("GovtId")}
            />
            <TextInput
              size="md"
              placeholder="Staff Worker Id"
              classNames={TextInputClasses}
              {...form.getInputProps("idNumber")}
            />
          </div>

          <div className={FormGroupStyles}>
            <NativeSelect
              size="md"
              classNames={{
                input:
                  "w-full border border-solid border-gray-200 rounded-md  focus:border-violet-300",
                root: "w-[50%]",
              }}
              data={gender}
              {...form.getInputProps("gender")}
            />
            <DateInput
              maxDate={new Date()}
              size="md"
              placeholder="Date of Birth"
              classNames={TextInputClasses}
              {...form.getInputProps("dob")}
            />

            <InputBase
              component={IMaskInput}
              mask="+94 (000) 000-0000"
              size="md"
              placeholder="Phone Number"
              classNames={TextInputClasses}
              {...form.getInputProps("phone", {
                type: "input",
              })}
            />
          </div>
          <div className={FormGroupStyles}>
            <TextInput
              size="md"
              placeholder="Email Address"
              classNames={TextInputClasses}
              {...form.getInputProps("email")}
            />
            <Select
              placeholder="Select Staff Type"
              size="md"
              classNames={TextInputClasses}
              data={staffType}
              value={form.values.staffType}
              error={form.errors.staffType}
              onChange={(value: staffType) => {
                form.setValues({
                  department: null,
                  staffType: value,
                  jobtitle: null,
                  DoctorSpecialization: null,
                });

                form.resetDirty;
              }}
            />
          </div>

          <div className={FormGroupStyles}>
            <FileInput
              size="md"
              leftSection={<IconPictureInPicture size={20} />}
              placeholder="Upload Picture (optional)"
              leftSectionPointerEvents="none"
              classNames={TextInputClasses}
              style={{ maxWidth: "33%" }}
              clearable
              accept="image/png,image/jpg,image/jpeg"
              {...form.getInputProps("picture")}
            />
            {form.values.staffType && (
              <Select
                placeholder="Select Department"
                size="md"
                classNames={TextInputClasses}
                data={
                  form.values.staffType === "admin"
                    ? adminDepartment
                    : MedicalDepartments
                }
                searchable
                {...form.getInputProps("department")}
              />
            )}

            {form.values.staffType === "doctor" && (
              <Select
                placeholder="Doctor Specialization"
                size="md"
                classNames={TextInputClasses}
                data={DoctorSpecialization}
                searchable
                {...form.getInputProps("DoctorSpecialization")}
              />
            )}

            {(form.values.staffType === "admin" ||
              form.values.staffType === "others") && (
              <Select
                placeholder="Select JobTitle"
                size="md"
                classNames={TextInputClasses}
                data={
                  form.values.staffType === "others"
                    ? OtherJobTitles
                    : AdminJobTitle
                }
                searchable
                {...form.getInputProps("jobtitle")}
              />
            )}
          </div>
          <div className="flex space-x-3">
            {!edit ? (
              <>
                <Button
                  fullWidth
                  size="lg"
                  type="reset"
                  variant="gradient"
                  gradient={{ from: "lime", to: "teal", deg: 90 }}
                  disabled={isLoading || getsaasimagesas || loading}
                  onClick={form.reset}
                >
                  Reset
                </Button>
                <Button
                  fullWidth
                  size="lg"
                  type="submit"
                  variant="gradient"
                  gradient={{ from: "lime", to: "teal", deg: 90 }}
                  loading={isLoading || getsaasimagesas || loading}
                >
                  Create an New Staff
                </Button>
              </>
            ) : (
              <Button
                fullWidth
                size="lg"
                type="submit"
                variant="gradient"
                gradient={{ from: "lime", to: "teal", deg: 90 }}
                loading={updating || loading}
              >
                Edit Staff
              </Button>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
}
