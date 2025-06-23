import { initData, useSignal, viewport } from '@telegram-apps/sdk-react';
import {
  Button,
  Caption,
  FixedLayout,
  Input,
  List,
  Multiselect,
  Section,
  Select,
  Slider,
  Image,
  Textarea,
  Title,
  FileInput,
} from 'tmaui';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useCreateServiceMutation } from '../../../api/servicesApi';
import { formatMinutes } from '../../../utils/format';
import DefaultServiceImage from '../../../assets/default_service.jpg';
import { useState } from 'react';

type CreateServiceFormData = yup.InferType<typeof serviceSchema>;

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

export const CreateService = () => {
  const userData = useSignal(initData.user);
  const safeAreaBottom = useSignal(viewport.safeAreaInsetBottom);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const [createService, { isLoading }] = useCreateServiceMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(serviceSchema),
    defaultValues: {
      status: 'stopped',
      providerId: userData!.id!,
      duration: 15,
      start_time: 480,
      end_time: 1020,
      days_of_week: [
        { value: 1, label: 'Понедельник' },
        { value: 2, label: 'Вторник' },
        { value: 3, label: 'Среда' },
        { value: 4, label: 'Четверг' },
        { value: 5, label: 'Пятница' },
      ].map(item => item.value),
    },
  });

  const duration = watch('duration');
  const start_time = watch('start_time');
  const end_time = watch('end_time');
  const days_of_week = watch('days_of_week');

  const onSubmit = async (data: CreateServiceFormData) => {
    const formData = new FormData();

    console.log(data);

    formData.append('serviceData', JSON.stringify(data));

    if (selectedImage) {
      formData.append('photo', selectedImage);
    }

    const service = await createService(formData).unwrap();

    if (service) {
      navigate('/');
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

        <Multiselect
          value={days_of_week.map(
            item => DAYS.find(day => day.value === item)!,
          )}
          options={DAYS}
          onChange={options => {
            const days: number[] = options.map(opt => Number(opt.value));
            setValue('days_of_week', days);
          }}
        />
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
        style={{ padding: '16px', paddingBottom: `${safeAreaBottom + 8}px` }}
      >
        <Button
          size="l"
          loading={isLoading}
          disabled={false}
          stretched
          onClick={handleSubmit(onSubmit)}
        >
          Создать услугу
        </Button>
      </FixedLayout>
    </List>
  );
};
