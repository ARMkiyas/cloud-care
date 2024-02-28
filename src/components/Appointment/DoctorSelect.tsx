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

function SelectOption({
  id,
  title,
  firstName,
  lastName,
  image,
  specialization,
}) {
  return (
    <Group>
      <Avatar src={image} size={36} radius="xl" />
      <div>
        <Text size="sm">{`${title}.${firstName} ${lastName}`}</Text>
        <Text size="xs" opacity={0.5}>
          {(specialization as string).split("_").join(" ")}
        </Text>
      </div>
    </Group>
  );
}

interface DoctorSelectAsyncProps {
  form?: UseFormReturnType<FormValues>;
}

export default function DoctorSelectAsync({ form }: DoctorSelectAsyncProps) {
  const {
    data: doctors,
    isLoading,
    refetch,
    isFetching,
    isError,
  } = useApiClient.schedule.getScheduledDocs.useQuery({});

  console.log(isFetching);
  const combobox = useCombobox({
    scrollBehavior: "smooth",
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => {
      if (!doctors && !isFetching) {
        refetch();
      }
    },
  });

  const [search, setSearch] = useState("");
  const [value, setValue] = useState<string | null>(null);

  const selectedOption =
    !isFetching && !isError
      ? doctors.data.find((item) => item.id === value)
      : "";

  const options =
    !isFetching && !isError
      ? doctors.data
          .filter((item) => {
            return (
              item.firstName
                .toLowerCase()
                .includes(search.toLowerCase().trim()) ||
              item.lastName
                .toLowerCase()
                .includes(search.toLowerCase().trim()) ||
              item.specialization
                .toLowerCase()
                .includes(search.toLowerCase().trim())
            );
          })
          .map((item) => (
            <Combobox.Option value={item.id} key={item.id} id={item.id}>
              <SelectOption {...item} />
            </Combobox.Option>
          ))
      : "";

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
          rightSection={
            isFetching ? <Loader size={18} /> : <Combobox.Chevron />
          }
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
            {isFetching && !isError ? (
              <Combobox.Empty>Loading....</Combobox.Empty>
            ) : (
              options
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
