import { initData, useSignal, viewport } from '@telegram-apps/sdk-react';
import {
  Avatar,
  Button,
  FixedLayout,
  Input,
  List,
  Section,
  Title,
} from '@telegram-apps/telegram-ui';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateProviderMutation } from '../../../api/providersApi';
import { useNavigate } from 'react-router';

// Создаем тип на основе схемы валидации
type ProviderFormData = yup.InferType<typeof providerSchema>;

const providerSchema = yup.object({
  name: yup.string().required().min(3).max(64),
  username: yup.string().required(),
  phone_number: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Phone number is not valid'),
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

  const onSubmit = async (data: ProviderFormData) => {
    const provider = await createProvider({
      ...data,
      id: userData!.id!,
      picture_url: userData?.photo_url,
    }).unwrap();

    if (provider) {
      navigate('/');
    }
  };

  return (
    <List>
      <Title style={{ textAlign: 'center' }}>Регистрация профиля</Title>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '16px 0',
        }}
      >
        <Avatar size={96} src={userData?.photo_url} />
      </div>

      <Section
        style={{ marginBottom: `${safeAreaBottom + 48}}px` }}
        header={'Форма регистрации'}
        footer={
          'Данные профиля будут доступны клиентам. Их можно будет изменить в последствии.'
        }
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
