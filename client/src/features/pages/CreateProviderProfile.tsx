import { initData, useSignal, viewport } from '@telegram-apps/sdk-react';
import { Button, FixedLayout, Input, List, Section, Title } from 'tmaui';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateProviderMutation } from '../../../api/providersApi';
import { useNavigate } from 'react-router';
import { isValidPhoneNumber } from 'libphonenumber-js';

type CreateProviderFormData = yup.InferType<typeof providerSchema>;

const providerSchema = yup.object({
  name: yup.string().required().min(3).max(64),
  username: yup.string().required(),
  phone_number: yup
    .string()
    .required()
    .test('is-valid-phone', 'Неверный номер телефона', value =>
      value ? isValidPhoneNumber(value) : false,
    ),
  address: yup.string().min(5).max(25),
  description: yup.string().min(5).max(255),
});

export const CreateProviderProfile = () => {
  const userData = useSignal(initData.user);
  const safeAreaBottom = useSignal(viewport.safeAreaInsetBottom);
  const navigate = useNavigate();

  const [createProvider, { isLoading }] = useCreateProviderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(providerSchema),
    defaultValues: {
      username: (userData?.username ?? '').padStart(1, '@'),
    },
  });

  const onSubmit = async (data: CreateProviderFormData) => {
    const provider = await createProvider({
      ...data,
      id: userData!.id!,
      picture_url: userData?.photo_url,
    }).unwrap();

    console.log(provider);

    if (provider) {
      navigate('/');
    }
  };

  return (
    <List>
      <Title>Регистрация провайдера</Title>

      <Section
        style={{ marginBottom: `${safeAreaBottom + 48}}px` }}
        header={'Форма регистрации провайдера'}
      >
        <Input
          placeholder="Отображаемое имя"
          {...register('name')}
          status={errors.name ? 'error' : 'default'}
        />
        <Input
          placeholder="Адрес аккаунта"
          {...register('username')}
          status={errors.username ? 'error' : 'default'}
          disabled
        />
        <Input
          placeholder="Номер телефона"
          {...register('phone_number')}
          status={errors.phone_number ? 'error' : 'default'}
        />
        <Input
          placeholder="Адрес"
          status={errors.address ? 'error' : 'default'}
          {...register('address')}
        />
        <Input
          placeholder="Описание"
          status={errors.description ? 'error' : 'default'}
          {...register('description')}
        />
      </Section>

      <FixedLayout
        vertical="bottom"
        style={{ padding: '16px', paddingBottom: `${safeAreaBottom + 8}px` }}
      >
        <Button
          size="l"
          loading={isLoading}
          disabled={isLoading}
          stretched
          onClick={handleSubmit(onSubmit)}
        >
          Зарегистрировать
        </Button>
      </FixedLayout>
    </List>
  );
};
