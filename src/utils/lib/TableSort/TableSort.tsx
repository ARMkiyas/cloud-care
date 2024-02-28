"use client";
import React,{ useState } from 'react';
import { Table, Badge,ActionIcon ,TextInput,Text,Button} from '@mantine/core';
import { IconEdit, IconTrash,IconLockOpen } from '@tabler/icons-react';
import {ButtonAdd} from '@/utils/lib/ButtonAdd/ButtonAdd';
import {IconSearch } from '@tabler/icons-react';
import { useApiClient } from '@/utils/trpc/Trpc';

interface RowData {
  id:string;
  name:string;
  email:string;
  phone: string;
  username: string;
  role:{role:string};
  status:boolean;
  action:React.ReactNode;
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
  Object.keys(item).some((key) => {
    if (typeof item[key] === 'string') {
      return item[key].toLowerCase().includes(query);
    } else if (typeof item[key] === 'object'  && 'role' in item[key]) {
      return item[key].role.toLowerCase().includes(query);
    }
    return false;
  })
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

const TableSort = ({ userdata }) => {

  const {
    mutateAsync: updateAsync,
    isError: userUpdateError,
    isSuccess: userUpdateSuccess,
  } = useApiClient.manageUsers.updateUser.useMutation();

  const {
    mutateAsync:deleteAsync,
    isError:userdeleteerror,
    isSuccess:userdeletesucess,
  }=useApiClient.manageUsers.deleteUser.useMutation();


  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(userdata.data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<RowData | null>(null);

    const toggleEditing = (userId: string) => {
    setEditingRow(editingRow === userId ? null : userId);
    // Reset edited data when toggling editing
    setEditedData(editingRow === userId ?  null : userdata.data.find(user => user.id === userId));
  };

  const deletey=async(userId)=>{

    try{
      if(userdata){
        const deleteuserdata=await deleteAsync({
          userid:userId,
        });
        console.log(deleteuserdata)
      }
    }catch(error){
      
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(userdata.data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const handleFieldChange = (field: keyof RowData, value: string) => {
    // Update edited data when any field changes
    if (editedData) {
      if (field === 'role') {
        setEditedData({
          ...editedData,
          role: { ...editedData.role, role: value }
        });
      } else {
        setEditedData({ ...editedData, [field]: value });
      }
    } else {
      // If editedData is null, create a new object with the updated field
      const newData={ ...userdata.data.find(user => user.id === editingRow) };
      newData[field]= value;
      setEditedData(newData);
    }
  };
  


  const handleSave = async () => {
    try {
      if (editedData && editedData.id) {
        // Construct the payload for updating the user
        const payload = {
          userid: editedData.id,
          username: editedData.username,
            email: editedData.email,
            phone: editedData.phone,        
            //role:editedData.role.role,
        };

        // Send the payload to the API for updating the user
        const updatedUserData = await updateAsync(payload);
  
        console.log('Updated user data:', updatedUserData);
  
        // Update table data
        const updatedData = sortedData.map((user) => {
          if (user.id === editedData.id) {
            return { ...user, 
               email: editedData.email, 
               phone: editedData.phone,
               username: editedData.username,
                role: editedData.role };
          }
          return user;
        });
        setSortedData(updatedData);
  
        // Reset editing after successful save
        setEditingRow(null);
        setEditedData(null);
      }
    } catch (error) {
      console.error('Error updating user:', userUpdateError);
    }
  };

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(userdata.data, { sortBy: field, reversed, search }));
  };

  const handlePasswordReset = async (userId: string) => {
    try {
      // Send the password reset request
      const result = await updateAsync({ userid: userId, pwdreet: true });

      // Handle successful response
      console.log('Password reset request sent successfully:', result);
    } catch (error) {
      // Handle error
      console.error('Error sending password reset request:', error);

    }
  };

  return (
    <>
    <ButtonAdd/>
    <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch />}
        value={search}
        onChange={handleSearchChange}
      />
      
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Phone</Table.Th>
          <Table.Th>User Name</Table.Th>
          <Table.Th>Role</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        
        {sortedData.map(user=>(
          <Table.Tr key={user.id}>
            <Table.Td>{user.name}</Table.Td>
            <Table.Td>
            {editingRow === user.id ? (
                  <TextInput
                    value={editedData?.email || user.email}
                    onChange={(event) => handleFieldChange('email', event.target.value)}
                  />
                ) : (
                  <Text>{user.email}</Text>
                )}
            </Table.Td>
            <Table.Td>
            {editingRow === user.id ? (
            <TextInput
                    value={editedData?.phone || user.phone}
                    onChange={(event) => handleFieldChange('phone', event.target.value)}
                  />
                ) : (
              <Text>{user.phone}</Text>
                )}
              </Table.Td>
            <Table.Td>
            {editingRow === user.id ? (
            <TextInput
                    value={editedData?.username || user.username}
                    onChange={(event) => handleFieldChange('username', event.target.value)}
                  />
                ) : (
              <Text>{user.username}</Text>
                )}
                </Table.Td>
            <Table.Td>
            {editingRow === user.id ? (
            <TextInput
                    value={editedData?.role.role || user.role.role}
                    onChange={(event) => handleFieldChange('role', event.target.value)}
                  />
                ) : (
              <Text>{user.role.role}</Text>
                )}
              </Table.Td>
            <Table.Td>
        {userdata.data.active ? (
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
      {editingRow === user.id ? (
                  <Button onClick={handleSave}>Update</Button>
                ) : (
          <div className="flex items-center space-x-2">
               <ActionIcon color="green" onClick={() => toggleEditing(user.id)}>
                 <IconEdit size="1rem" />
               </ActionIcon>
               <ActionIcon color="red" onClick={()=>deletey(user.id)}>
                 <IconTrash size="1rem" />
               </ActionIcon>
               <ActionIcon color="blue" onClick={() => handlePasswordReset(user.id)}>
               <IconLockOpen size="1rem"/>
               </ActionIcon>
          </div>
                )}
      </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
    </>
  );
}
export default TableSort;