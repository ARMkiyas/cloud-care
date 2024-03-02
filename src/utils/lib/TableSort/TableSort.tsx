"use client";
import React,{ useState } from 'react';
import { Table, Badge,ActionIcon ,TextInput,Text,Button,Modal,Notification} from '@mantine/core';
import { IconEdit, IconTrash,IconLockOpen } from '@tabler/icons-react';
import {ButtonAdd} from '@/utils/lib/ButtonAdd/ButtonAdd';
import {IconSearch } from '@tabler/icons-react';
import { useApiClient } from '@/utils/trpc/Trpc';
import { useDisclosure } from '@mantine/hooks';

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

const TableSort = ({userdata}) => {  

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
  const [openedUpdateModal, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);
  const [openedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  
  const [showNotification, setShowNotification] = useState(false);

// Function to open the delete modal and set the user id
const handleOpenDeleteModal = (userId: string) => {
  setDeleteUserId(userId);
  openDeleteModal();
};

    const toggleEditing = (userId: string) => {
    setEditingRow(editingRow === userId ? null : userId);
    // Reset edited data when toggling editing
    setEditedData(editingRow === userId ?  null : userdata.data.find(user => user.id === userId));
  };

const deletey = async (userId: string) => {
  try {
    const deleteuserdata = await deleteAsync({ userid: userId });
    console.log(deleteuserdata);

    // Update table data after deletion
    const updatedData = sortedData.filter(user => user.id !== userId);
    setSortedData(updatedData);

    // Close the delete modal
    closeDeleteModal();
  } catch (error) {
    console.error('Error deleting user:', error);
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

      setShowNotification(true);
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
            {showNotification && (
        <Notification className='w-1/4'
          title="We notify you that"
          color="green"
          onClose={() => setShowNotification(false)}
        >
          Password reset request has been sent successfully.
        </Notification>
      )}
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
                  
                  <>
                  <Modal opened={openedUpdateModal} onClose={closeUpdateModal} 
                  title="Are you Sure you want to do this?">
                    <div className="flex justify-end space-x-2">
                        <Button onClick={handleSave}>Confirm</Button>
                        <Button style={{ backgroundColor: 'white', color: 'black',border: '1px solid black' }}
                        onClick={closeUpdateModal}>Cancel</Button>
                    </div>
                </Modal>
                  <Button onClick={openUpdateModal}>Update</Button>
                  </>
                ) : (
          <div className="flex items-center space-x-2">
               <ActionIcon color="green" onClick={() => toggleEditing(user.id)}>
                 <IconEdit size="1rem" />
               </ActionIcon>
               <ActionIcon color="red" onClick={()=>handleOpenDeleteModal(user.id)}>
               <Modal opened={openedDeleteModal} onClose={closeDeleteModal} 
               style={{ display: 'flex', justifyContent: 'center'}}
                  title="Are you Sure you want to delete ">
                    <div className="flex justify-end space-x-2">
                        <Button style={{ backgroundColor: 'white', color: 'black',border: '1px solid black' }} 
                        onClick={closeDeleteModal}>Cancel</Button>
                        <Button onClick={()=>deletey(deleteUserId)}>Delete</Button>
                    </div>
                </Modal>
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