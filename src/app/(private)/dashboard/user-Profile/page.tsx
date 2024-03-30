"use client";
import React,{useState,useEffect, use} from 'react'
import { Image, Text, Badge, Button, Group,Table,TextInput,Switch } from '@mantine/core';
import {useSession } from "next-auth/react";
import { useApiClient } from '@/utils/trpc/Trpc';



export default function page() {
  const { data: session,update, status } = useSession();
  console.log(session);


  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    if (session && session.user) {
      setEditedData({
        name: session.user.name,
        username: session.user.username,
        email: session.user.email,
        iat: session.user.iat,
        twoFactorEnabled: session.user.twoFactorEnabled
      });
    }
  }, [session]);
  
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Handle saving edited data, for simplicity, let's just log it for now
    console.log("Edited Data:", editedData);
    setEditing(false);
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

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    return <div>No user session found.</div>;
  }
  return (
    <div className="shadow-lg rounded-md p-5 flex" style={{ border: '1px solid #ccc' }} >
      <div className='flex-none w-1/3'>
        <div className="flex-none">
          <div className="flex justify-center items-center ">
            <Image className='w-1/3 m-2 mt-5'
              src={session.user.image}
              height={120}
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
                Email: {session.user.email}
              <br />
              Phone: {session.user.iat}
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
                    value={editedData.iat}
                    onChange={handleInputChange}
                    name="iat"
                  />
                ) : (
                  session.user.iat
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
              />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Do you want to reset your password?</Table.Td>
              <Table.Td>
                <Button className="bg-yellow-200 text-gray-800">Reset Password</Button>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
          </div>
          </div>
     
  )
}