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
import { Ttitle, gender, title } from "@/utils/lib/others/person";
import { useApiClient } from "@/utils/trpc/Trpc";
import {
  ACCEPTED_IMAGE_TYPES,
  imageSchema,
} from "@/utils/ValidationSchemas/commonSc";
import {
  AutocompleteFactory,
  Button,
  ClassNames,
  FileInput,
  FileInputFactory,
  Group,
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
import { IconImageInPicture, IconPictureInPicture } from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";
import React, { HTMLAttributes } from "react";
import { IMaskInput } from "react-imask";
import { z } from "zod";

type AddstaffPropsType = {
  opened: boolean;
  close: () => void;
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

type TformValue = {
  title: Ttitle;
  firstName: "";
  lastName: "";
  picture: File | null;
  idType: "NIC" | "Passport";
  GovtId: "";
  dob: Date;
  gender: (typeof gender)[number];
  phone: "";
  email: "";
  idNumber: "";
  staffType: staffType;
  department: TadminDepartment | TMedicalDepartments | "";
  jobtitle: TAdminJobTitle | TOtherJobTitles | "";
  DoctorSpecialization: TDoctorSpecialization | "";
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

const createStaffSchema = z
  .object({
    title: z.enum(title),
    firstName: z.string().min(1, "First Name is Required"),
    lastName: z.string().min(1, "Last Name is Required"),
    idType: z.enum(["NIC", "Passport"]),
    GovtId: z.string().min(1, "GovtId is Required").min(10, "Invalid GovtId"),
    idNumber: z.string().min(1, "Worker Id Number is Required"),
    dob: z.date(),
    email: z
      .string()
      .email({
        message: "Invalid Email Address",
      })
      .min(1, "Email is Required"),
    phone: z
      .string()

      .regex(
        /^\+94 \(\d{3}\) \d{3}-\d{4}$/,
        "Invalid Phone Number, please provide it in international format +94 (123) 456-7890",
      )
      .min(1, "phone is Required"),
    gender: z.enum(gender),

    picture: imageSchema.nullable().optional(),
    department: z.union([z.enum(adminDepartment), z.enum(MedicalDepartments)], {
      required_error: "Department is required",
      invalid_type_error: "Invalid Department",
    }),
    jobtitle: z
      .union([z.enum(AdminJobTitle), z.enum(OtherJobTitles)])
      .nullish()
      .optional(),
    DoctorSpecialization: z.enum(DoctorSpecialization).nullish().optional(),

    staffType: z.enum(["doctor", "nurse", "admin", "others"], {
      required_error: "Staff Type is required",
      invalid_type_error: "staff Type is required",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.staffType === "doctor" && !data.DoctorSpecialization) {
      ctx.addIssue({
        message: "Doctor Specialization is required",
        code: "custom",
        fatal: true,
        path: ["DoctorSpecialization"],
      });
    }
    if (
      (data.staffType === "admin" || data.staffType === "others") &&
      !data.jobtitle
    ) {
      ctx.addIssue({
        message: "Job Title is required",
        code: "custom",
        path: ["jobtitle"],
      });
    }

    if (data.idType === "NIC" && data.GovtId.length > 12) {
      ctx.addIssue({
        message: "NIC Number is Invalid",
        code: "custom",
        path: ["GovtId"],
      });
    }
  });

const FormGroupStyles: HTMLAttributes<HTMLDivElement>["className"] =
  "flex items-stretch justify-between gap-4 mt-5 max-md:max-w-full max-md:flex-wrap";

export default function AddStaffModal({ opened, close }: AddstaffPropsType) {
  const form = useForm<TformValue>({
    initialValues: {
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
    },
    validate: zodResolver(createStaffSchema),
  });

  const { mutateAsync, isLoading } =
    useApiClient.manageStaff.createStaff.useMutation({
      onSuccess(val) {
        notifications.show({
          title: "Create an New staff",
          message: "New Staff Created successfully",
        });
        form.reset();
      },
    });

  const utils = useApiClient.useUtils();

  const CreateHanlder = async (val: TformValue) => {
    try {
      const create = mutateAsync({
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
      });
    } catch {}
  };
  console.log(form.errors);
  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => {
          utils.manageStaff.getStaff.invalidate();
          close();
        }}
        title="Create An Staff"
        centered
        size={"xl"}
      >
        <form className="space-y-3" onSubmit={form.onSubmit(CreateHanlder)}>
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
            <Button
              fullWidth
              size="lg"
              type="reset"
              variant="gradient"
              gradient={{ from: "lime", to: "teal", deg: 90 }}
              disabled={isLoading}
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
              loading={isLoading}
            >
              Create an New Staff
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
