"use client";
import React,{useState,useEffect, use} from 'react'
import { Text, Badge, Button, Group,Table,TextInput,Switch,LoadingOverlay,Box } from '@mantine/core';
import {useSession } from "next-auth/react";
import { useApiClient } from '@/utils/trpc/Trpc';
import Image from 'next/image';


export default function page() {
  const { data: session,update, status } = useSession();
  console.log(session);
  const [successMessage, setSuccessMessage] = useState(null);
  const [saving, setSaving] = useState(false);


  const{
    mutateAsync,isLoading,isSuccess
  }=useApiClient.profile.profileUpdate.useMutation({
    onSuccess:async(val)=>{
      const session = await update({
        name:val.data.name,
        email:val.data.email,
        image:val.data.image,
        username:val.data.username,
        phone:val.data.phone,
        twoFactorEnabled:val.data.twoFactorEnabled,
      });
      if(session){
        window && window.location.reload();
      }
    }
  });

  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    if (session && session.user) {
      setEditedData({
        name: session.user.name,
        username: session.user.username,
        email: session.user.email,
        phone:session.user.phone,
        twoFactorEnabled: session.user.twoFactorEnabled
      });
    }
  }, [session]);
  
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try{
      setSaving(true);
      console.log("Edited Data:", editedData);
       await mutateAsync(editedData);
       setEditing(false);
    }catch(error){
      console.error("Error saving data: ",error)
    } finally{
      setSaving(false);
    }

  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTwoFactorToggle = async (event) => {
    const checked = event.target.checked; 
    if (!session || !session.user || !editedData) {
      console.error("Session, user, or editedData is undefined");
      return;
    }
  
    try {
      // Update the editedData state with the new value of twoFactorEnabled
      const updatedData = {
        ...editedData,
        twoFactorEnabled: checked,
      };
    
      // Update the editedData state
      setEditedData(updatedData);
    
      // Send the updated data to the API
      await mutateAsync(updatedData);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  

  const handleResetPassword = async () => {
    try {
      // Implement the logic to send the password reset request to your API here
      console.log('Sending password reset request...');
      setSuccessMessage("Password reset request sent successfully!");
      // await apiClient.sendPasswordResetRequest();
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };  
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    return <div>No user session found.</div>;
  }
  return (
    <>
    <div className="shadow-lg rounded-md p-5 flex" style={{ border: '1px solid #ccc' }} >
      <div className='flex-none w-1/3'>
        <div className="flex-none">
          <div className="flex justify-center items-center ">
            <Image className='w-1/3 m-2 mt-5'
              src={session.user.image}
              height={180}
              width={130}
              alt="Profile Image"
              style={{ borderRadius: '50%' }} 
             />
             </div>
             <div>
            <Group className="justify-center " justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{session.user.name}</Text>
            <Badge color="green">{session.user.role}</Badge>
            </Group>

             <Text className="text-center"size="sm" c="dimmed">
                {session.user.email}<br/>
                {session.user.phone}
               </Text>
               <div className="p-3 pr-5">
                {!editing?(
               <Button className="w-full bg-slate-200 text-gray-600 border-black"
               onClick={handleEditClick}>Edit Profile</Button>
                ):(
                  <>
                  <Button className="w-full bg-slate-200 text-gray-600 border-black" onClick={handleSaveClick}>Save</Button>
                  <Button className="w-full mt-2" onClick={handleCancelClick}>Cancel</Button>
                </>
                )}
               </div>
           </div>
           </div>
 
      </div>
      <div className='w-full' style={{ borderLeft: '1px solid #ccc' }}>
      <Box pos="relative">
        <LoadingOverlay visible={saving} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        
        <Table horizontalSpacing="lg" verticalSpacing="md">
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
              <Text className="font-semibold ...">User Profile</Text>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Name</Table.Td>
              <Table.Td>
              {editing ? (
                  <TextInput
                    value={editedData.name}
                    onChange={handleInputChange}
                    name="name"
                  />
                ) : (
                  session.user.name
                )}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>User Name</Table.Td>
              <Table.Td>
              {editing ? (
                  <TextInput
                    value={editedData.username}
                    onChange={handleInputChange}
                    name="username"
                  />
                ) : (
                  session.user.username
                )}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Role</Table.Td>
              <Table.Td>{session.user.role}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Email</Table.Td>
              <Table.Td>
              {editing ? (
                  <TextInput
                    value={editedData.email}
                    onChange={handleInputChange}
                    name="email"
                  />
                ) : (
                  session.user.email
                )}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Phone Number</Table.Td>
              <Table.Td>
              {editing ? (
                  <TextInput
                    value={editedData.phone}
                    onChange={handleInputChange}
                    name="email"
                  />
                ) : (
                  session.user.phone
                )}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Two Factor Enabled</Table.Td>
              <Table.Td>{session.user.twoFactorEnabled ? 'True' : 'False'}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
              {session.user.twoFactorEnabled ? 
                   "Disable two-factor authentication" : 
                   "Enable two-factor authentication"}
              </Table.Td>
              <Table.Td>
              <Switch size="lg" onLabel="Enable" offLabel="Disable" 
                defaultChecked={session.user.twoFactorEnabled}
                onChange={handleTwoFactorToggle}         
              />
              </Table.Td>
            </Table.Tr>
            <Table.Tr> 
              <Table.Td>Do you want to reset your password?</Table.Td>
              <Table.Td>
                <Button className="bg-yellow-200 text-gray-800" onClick={handleResetPassword}>Reset Password</Button>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        </Box>
          </div>
          </div>
          </>
     
  )
}