import { useState } from "react";
import {
  Avatar,
  Combobox,
  Group,
  Input,
  InputBase,
  Loader,
  ScrollArea,
  Text,
  useCombobox,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "./Types";
import { useApiClient } from "@/utils/trpc/Trpc";

interface Item {
  emoji: string;
  value: string;
  description: string;
}
interface Doctor {
  id: string;
  name: string;
  image: string;
  speciality: string;
}

const usersData: Doctor[] = [
  {
    id: "gdfgf",
    name: "Dr.Emily Johnson",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
    speciality: "General Practitioner",
  },
  {
    id: "cls3inf740fdgdfg00ffbmgyjtk4lxr",
    name: "Dr.Ava Rodriguez",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png",
    speciality: "General Practitioner",
  },
  {
    id: "cls3inf74000dfgffbmgyjtk4lxr",
    name: "Dr.Olivia Chen",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png",
    speciality: "General Practitioner",
  },
  {
    id: "cls3inf74000fdgdfffbmgyjtk4lxr",
    name: "Dr.Ethan Barnes",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
    speciality: "General Practitioner",
  },
  {
    id: "cls3inf74000ffdgdfbmgyjtk4lxr",
    name: "Dr.Mason Taylor",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    speciality: "General Practitioner",
  },
  {
    id: "cls3inf74000fdgffbmgyjtk4lxr",
    name: "Dr.Ava Rodriguez",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png",
    speciality: "General Practitioner",
  },
  {
    id: "cls3inf74000ffdfgbmgyjtk4lxr",
    name: "Dr.Olivia Chen",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png",
    speciality: "General Practitioner",
  },
  {
    id: "cls3inf74000ffbmdfgdgyjtk4lxr",
    name: "Dr.Ethan Barnes",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
    speciality: "General Practitioner",
  },
  {
    id: "cls3inf74000ffbfdgdmgyjtk4lxr",
    name: "Dr.Mason Taylor",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    speciality: "orthopedic surgeon",
  },
];

function SelectOption({ name, speciality, image }: Doctor) {
  return (
    <Group>
      <Avatar src={image} size={36} radius="xl" />
      <div>
        <Text size="sm">{name}</Text>
        <Text size="xs" opacity={0.5}>
          {speciality}
        </Text>
      </div>
    </Group>
  );
}

function getAsyncData() {
  return new Promise<Doctor[]>((resolve) => {
    setTimeout(() => resolve(usersData), 2000);
  });
}

interface DoctorSelectAsyncProps {
  form?: UseFormReturnType<FormValues>;
}

export default function DoctorSelectAsync({ form }: DoctorSelectAsyncProps) {
  const [data, setData] = useState<Doctor[]>([]);

  const { data: doctors, isLoading } =
    useApiClient.schedule.getScheduledDocs.useMutation({});

  const combobox = useCombobox({
    scrollBehavior: "smooth",
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => {
      if (data.length === 0 && !loading) {
        setLoading(true);
        getAsyncData().then((response) => {
          setData(response);
          setLoading(false);
          combobox.resetSelectedOption();
        });
      }
    },
  });

  const [search, setSearch] = useState("");
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const selectedOption = usersData.find((item) => item.id === value);

  const options = data
    .filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase().trim());
    })
    .map((item) => (
      <Combobox.Option value={item.id} key={item.id} id={item.id}>
        <SelectOption {...item} />
      </Combobox.Option>
    ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        form.setFieldValue("docid", val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          size="md"
          component="button"
          type="button"
          pointer
          rightSection={loading ? <Loader size={18} /> : <Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          multiline
          classNames={{
            input:
              "w-full border border-solid border-gray-200 rounded-md  focus:border-violet-300",
            root: "w-full",
            wrapper: "w-full",
          }}
          error={form.errors.docid}
        >
          {selectedOption ? (
            <SelectOption {...selectedOption} />
          ) : (
            <Input.Placeholder>Pick an Doctor</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Search
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Search Doctor"
        />
        <Combobox.Options>
          <ScrollArea.Autosize type="scroll" mah={200}>
            {loading ? <Combobox.Empty>Loading....</Combobox.Empty> : options}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
