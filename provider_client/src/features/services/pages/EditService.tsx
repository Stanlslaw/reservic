import { initData, useSignal, viewport } from '@telegram-apps/sdk-react';
import { useNavigate, useParams } from 'react-router';
import {
  Button,
  FixedLayout,
  List,
  Section,
  Image,
  Title,
  FileInput,
  Input,
  Select,
  Slider,
  Caption,
  Multiselect,
  Textarea,
} from 'tmaui';
import {
  useDeleteServiceMutation,
  useGetServiceQuery,
  useUpdateServiceMutation,
} from '../../../api/servicesApi';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatMinutes } from '../../../utils/format';
import DefaultServiceImage from '../../../assets/default_service.jpg';
import { useEffect, useState } from 'react';

type UpdateServiceFormData = yup.InferType<typeof serviceSchema>;

const DAYS = [
  { value: 1, label: 'Понедельник' },
  { value: 2, label: 'Вторник' },
  { value: 3, label: 'Среда' },
  { value: 4, label: 'Четверг' },
  { value: 5, label: 'Пятница' },
  { value: 6, label: 'Суббота' },
  { value: 7, label: 'Воскересенье' },
];

const serviceSchema = yup.object({
  title: yup.string().required().min(3).max(64),
  providerId: yup.number().required(),
  duration: yup.number().required(),
  start_time: yup.number().min(0).max(1440).required(),
  end_time: yup.number().min(0).max(1440).required(),
  category: yup.string().min(5).max(255).required(),
  days_of_week: yup.array().of(yup.number().min(1).max(7)).required(),
  description: yup.string().required(),
  price: yup.number().required(),
  status: yup.string().oneOf(['active', 'deleted', 'stopped']).required(),
});

export const EditService = () => {
  const safeAreaBottom = useSignal(viewport.safeAreaInsetBottom);
  const navigate = useNavigate();
  const user = useSignal(initData.user);
  const { serviceId } = useParams();
  const [deleteService, deleteState] = useDeleteServiceMutation();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { data: service } = useGetServiceQuery({ serviceId: +serviceId! });
  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset, // Добавляем reset из useForm
  } = useForm({
    resolver: yupResolver(serviceSchema),
    defaultValues: {
      days_of_week: [0],
    },
  });

  // Эффект для установки значений формы при загрузке сервиса
  useEffect(() => {
    if (service) {
      reset({
        title: service.title,
        status: service.status,
        providerId: user!.id!,
        duration: service.duration,
        description: service.description,
        price: service.price,
        category: service.category,
        start_time: service.start_time,
        end_time: service.end_time,
        days_of_week: [
          { value: 1, label: 'Понедельник' },
          { value: 2, label: 'Вторник' },
          { value: 3, label: 'Среда' },
          { value: 4, label: 'Четверг' },
          { value: 5, label: 'Пятница' },
        ].map(item => item.value), // Предполагается, что days_of_week уже в правильном формате
      });
    }
  }, [service, reset, user]);

  const duration = watch('duration');
  const start_time = watch('start_time');
  const end_time = watch('end_time');
  const days_of_week = watch('days_of_week');

  const onSubmit = async (data: UpdateServiceFormData) => {
    const formData = new FormData();

    formData.append('serviceData', JSON.stringify(data));

    if (selectedImage) {
      formData.append('photo', selectedImage);
    }

    console.log(formData.keys());

    const service = await updateService(formData).unwrap();

    if (service) {
      navigate('/');
    }
  };

  const handleDeleteService = async () => {
    if (!user?.id || !serviceId) {
      console.error('Нет данных для удаления');
      return;
    }

    try {
      await deleteService({
        providerId: user.id,
        id: Number(serviceId),
      }).unwrap();

      navigate('/services');
    } catch (err) {
      console.error('Ошибка при удалении:', err);
    }
  };

  return (
    <List>
      <Title style={{ textAlign: 'center' }}>Создание услуги</Title>
      <Section
        style={{ paddingBottom: `${safeAreaBottom + 96}px` }}
        header={'Форма создания услуги'}
        footer={
          'Даные сервиса будут демонстрироваться пользователю. Их можно будет изменить позже.'
        }
      >
        <Section header={'Обложка услуги'}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '12px',
            }}
          >
            <Image
              size={96}
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : service?.photo_url
                    ? 'https://api.reservic.ru/' + service.photo_url
                    : DefaultServiceImage
              }
            />
          </div>
          <FileInput
            label="Загрузить обложку"
            accept=".jpg,.jpeg,.png,.webp"
            multiple={false}
            onChange={e => {
              const file = e.currentTarget.files?.[0];
              if (file) {
                setSelectedImage(file);
              }
            }}
          />
        </Section>
        <Input
          header="Название услуги"
          style={{ flexGrow: 1 }}
          placeholder="Мужская стрижка"
          {...register('title')}
          status={errors.title ? 'error' : 'default'}
        />

        <Select
          header={'Категория'}
          {...register('category')}
          defaultValue={''}
          status={errors.category ? 'error' : 'default'}
        >
          <option value="" disabled hidden>
            Выберите категорию
          </option>
          <option value="beauty">Красота</option>
          <option value="health">Здоровье</option>
          <option value="repair">Ремонт</option>
          <option value="cars">Автомобили</option>
        </Select>

        <Section header="Период оказания услуги">
          <Slider
            before={<Caption>{'Начало: ' + formatMinutes(start_time)}</Caption>}
            after={<Caption>{'Конец: ' + formatMinutes(end_time)}</Caption>}
            value={[start_time, end_time]}
            min={0}
            max={1440}
            step={30}
            multiple
            onChange={value => {
              const [start, end] = value;
              setValue('start_time', start);
              setValue('end_time', end);
            }}
          />
        </Section>

        <Section header={`Длительность услуги: ${duration} минут`}>
          <Slider
            before={<Caption>15 минут</Caption>}
            after={<Caption>240 минут</Caption>}
            value={duration}
            min={15}
            max={240}
            step={15}
            onChange={value => setValue('duration', value)}
          />
        </Section>

        {/* <Multiselect
          value={days_of_week.map(
            item => DAYS.find(day => day.value === item)!,
          )}
          options={DAYS}
          onChange={options => {
            const days: number[] = options.map(opt => Number(opt.value));
            setValue('days_of_week', days);
          }}
        /> */}
        <Textarea
          placeholder="Описание услуги"
          {...register('description')}
          status={errors.description ? 'error' : 'default'}
        />
        <Input
          type="number"
          placeholder="Цена"
          status={errors.price ? 'error' : 'default'}
          {...register('price')}
          after={<Caption>BYN</Caption>}
        />
      </Section>

      <FixedLayout
        vertical="bottom"
        style={{
          padding: '16px',

          paddingBottom: `${safeAreaBottom + 8}px`,
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            size="l"
            stretched
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
          >
            Сохранить
          </Button>
          <Button
            size="l"
            mode="gray"
            stretched
            onClick={handleDeleteService}
            loading={deleteState.isLoading}
          >
            Удалить
          </Button>
        </div>
      </FixedLayout>
    </List>
  );
};
