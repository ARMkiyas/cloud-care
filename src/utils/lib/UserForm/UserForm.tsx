import React, { useState } from 'react';
import { IconAt, IconLock,IconChevronDown } from '@tabler/icons-react';
import {
  Button,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Input
} from '@mantine/core';
import { useForm } from '@mantine/form';

export interface AuthenticationFormProps {
  noShadow?: boolean;
  noPadding?: boolean;
  noSubmit?: boolean;
  style?: React.CSSProperties;
}

export function UserForm({
  noShadow,
  noPadding,
  noSubmit,
  style,
}: AuthenticationFormProps) {
  const [formType, setFormType] = useState<'register' | 'login'>('register');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleFormType = () => {
    setFormType((current) => (current === 'register' ? 'login' : 'register'));
    setError(null);
  };

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsOfService: true,
    },
  });

  const handleSubmit = () => {
    setLoading(true);
    setError(null);
    
  };

  return (
    <Paper
      p={noPadding ? 0 : 'lg'}
      shadow={noShadow ? 'none' : 'sm'}
      style={{
        ...style,
        position: 'relative',
        backgroundColor: 'var(--mantine-color-body)',
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={loading} />
          <Group grow>
            <TextInput
              data-autofocus
              required
              placeholder="Your first name"
              label="First name"
              {...form.getInputProps('firstName')}
            />

            <TextInput
              required
              placeholder="Your last name"
              label="Last name"
              {...form.getInputProps('lastName')}
            />
          </Group>
        

        <TextInput
          mt="md"
          required
          placeholder="Your email"
          label="Email"
          leftSection={<IconAt size={16} stroke={1.5} />}
          {...form.getInputProps('email')}
        />

      <Group grow>
        <Input.Wrapper label="Gender" className='mt-5' required>
        <Input
        component="select"
        rightSection={<IconChevronDown size={14} stroke={1.5} />}
        pointer
        mt="md"
      >
        <option value="1">Male</option>
        <option value="2">Female</option>
      </Input></Input.Wrapper>
      <Input.Wrapper label="Role" className='mt-5' required>
        <Input
        component="select"
        rightSection={<IconChevronDown size={14} stroke={1.5} />}
        pointer
        mt="md"
      >
        <option value="1">doctor</option>
        <option value="2">nurse</option>
        <option value="3">other staff</option>
      </Input></Input.Wrapper>
      <Input.Wrapper label="Status" className='mt-5' required>
        <Input
        component="select"
        rightSection={<IconChevronDown size={14} stroke={1.5} />}
        pointer
        mt="md"
      >
        <option value="1">Active</option>
        <option value="2">Disable</option>
      </Input></Input.Wrapper>
      </Group>

        <PasswordInput
          mt="md"
          required
          placeholder="Password"
          label="Password"
          leftSection={<IconLock size={16} stroke={1.5} />}
          {...form.getInputProps('password')}
        />

        {formType === 'register' && (
          <PasswordInput
            mt="md"
            required
            label="Confirm Password"
            placeholder="Confirm password"
            leftSection={<IconLock size={16} stroke={1.5} />}
            {...form.getInputProps('confirmPassword')}
          />
        )}

        {/*formType === 'register' && (
          <Checkbox
            mt="xl"
            label="I agree to sell my soul and privacy to this corporation"
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />
        )*/}

        {error && (
          <Text c="red" size="sm" mt="sm">
            {error}
          </Text>
        )}

          <Group justify="space-between" mt="xl">

            <Button color="blue" type="submit">
              Save
            </Button>
          </Group>
        
      </form>
    </Paper>
  );
}