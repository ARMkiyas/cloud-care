"use client"
import { useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,Badge,ActionIcon
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from './TableSort.module.css';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import {ButtonAdd} from '@/utils/lib/ButtonAdd/ButtonAdd';

interface RowData {
    id:string;
  name: string;
  email: string;
  gender:string;
  role:string;
  active:boolean;
  action: React.ReactNode;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => (item[key] as string).toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  /*if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );*/
  return filterData(
    [...data].sort((a, b) => {
      const valueA = a[sortBy] as string; // Type assertion
      const valueB = b[sortBy] as string; // Type assertion

      if (payload.reversed) {
        return valueB.localeCompare(valueA);
      }

      return valueA.localeCompare(valueB);
    }),
    payload.search
  );
  
}


const data = [
  {
    id:'001',
    name: 'Athena Weissnat',
    email: 'Elouise.Prohaska@yahoo.com',
    gender:'M',
    role:'doctor',
    active:true,

  },
  {
    id:'002',
    name: 'Deangelo Runolfsson',
    email: 'Kadin_Trantow87@yahoo.com',
    gender:'M',
    role:'doctor',
    active:false,
  },
  {
    id:'001',
    name: 'Danny Carter',
    gender:'M',
    role:'doctor',
    active:true,
    email: 'Marina3@hotmail.com',
  },
  {
    id:'001',
    name: 'Trace Tremblay PhD',
    gender:'M',
    role:'doctor',
    active:false,
    email: 'Antonina.Pouros@yahoo.com',
  },
  {
    id:'001',
    name: 'Derek Dibbert',
    gender:'M',
    role:'doctor',
    active:true,
    email: 'Abagail29@hotmail.com',
  },
  {
    id:'001',
    name: 'Viola Bernhard',
    email: 'Jamie23@hotmail.com',
    gender:'M',
    role:'doctor',
    active:false,
    
  },
  {
    id:'001',
    name: 'Austin Jacobi',
    email: 'Genesis42@yahoo.com',
    gender:'M',
    role:'doctor',
    active:true,
    
  },
  {
    id:'001',
    name: 'Hershel Mosciski',
    email: 'Idella.Stehr28@yahoo.com',
    gender:'M',
    role:'doctor',
    active:true,
    
  },
  {
    id:'001',
    name: 'Mylene Ebert',
    email: 'Hildegard17@hotmail.com',
    gender:'M',
    role:'doctor',
    active:true,
    
  },
  {
    id:'001',
    name: 'Lou Trantow',
    email: 'Hillard.Barrows1@hotmail.com',
    gender:'M',
    role:'doctor',
    active:false,
    
  },
  {
    id:'001',
    name: 'Dariana Weimann',
    email: 'Colleen80@gmail.com',
    gender:'M',
    role:'doctor',
    active:false,
    
  },
  {
    id:'001',
    name: 'Dr. Christy Herman',
    email: 'Lilyan98@gmail.com',
    gender:'M',
    role:'doctor',
    active:true,
    
  },
  {
    id:'001',
    name: 'Katelin Schuster',
    email: 'Erich_Brekke76@gmail.com',
    gender:'M',
    role:'doctor',
    active:false,
    
  },
  {
    id:'001',
    name: 'Melyna Macejkovic',
    email: 'Kylee4@yahoo.com',
    gender:'M',
    role:'doctor',
    active:false,
    
  },
  {
    id:'001',
    name: 'Pinkie Rice',
    email: 'Fiona.Kutch@hotmail.com',
    gender:'M',
    role:'doctor',
    active:true,
    
  },
  {
    id:'001',
    name: 'Brain Kreiger',
    email: 'Rico98@hotmail.com',
    gender:'M',
    role:'doctor',
    active:false,
    
  },
] as RowData[];

export function TableSort() {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));          
  };

  const editRow = (id: string) => {
    // Perform action when edit button is clicked
    console.log(`Editing row with id: ${id}`);
  };
  const handleDelete=(id:string)=>{
    console.log(`Deleting row with id: ${id}`);
  }

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.id}>
        <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.gender}</Table.Td>
      <Table.Td>{row.role}</Table.Td>
      <Table.Td>
        {row.active ? (
          <Badge fullWidth variant="light">
            Active
          </Badge>
        ) : (
          <Badge color="gray" fullWidth variant="light">
            Disabled
          </Badge>
        )}
      </Table.Td>
      <Table.Td>
      <div className="flex items-center space-x-2">
        {/*<UnstyledButton onClick={() => editRow(row.id)} className="flex items-center space-x-1 p-2 bg-green-600 rounded-md text-white">
          <IconEdit /></UnstyledButton>
          <UnstyledButton className="flex items-center space-x-1 p-2 bg-[#C92A2A] rounded-md ">
          <IconTrash />
        </UnstyledButton>*/}
        <ActionIcon color="green" onClick={() => editRow(row.id)} >
        <IconEdit size="1rem" />
      </ActionIcon>
        <ActionIcon color="red">
        <IconTrash size="1rem" />
      </ActionIcon>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <ButtonAdd/>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={900} layout="auto">
        <Table.Tbody>
          <Table.Tr>
          <Th
              sorted={sortBy === 'id'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('id')}
            >
              ID
            </Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Gender</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}