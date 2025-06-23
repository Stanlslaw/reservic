import {
  Avatar,
  Button,
  ButtonCell,
  Cell,
  FixedLayout,
  Image,
  List,
  Modal,
  NavigationCell,
  Section,
  Tappable,
  Textarea,
  Title,
} from 'tmaui';
import { useNavigate, useParams } from 'react-router';
import { ServiceDto } from '../../api/api';
import { initData, popup, useSignal, viewport } from '@telegram-apps/sdk-react';
import { formatMinutes } from '../../utils/format';
import { IoMdPaper } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import Rating from '@mui/material/Rating';
import { useGetServiceQuery } from '../../api/servicesApi';
import {
  useAddUserFavoriteMutation,
  useDeleteUserFavoriteMutation,
  useGetUserFavoritesQuery,
} from '../../api/favoritesApi';
import { useCreateServiceReviewMutation } from '../../api/reviewsApi';

export const Service = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const user = useSignal(initData.user);
  const { data: favorites } = useGetUserFavoritesQuery(
    { userId: user!.id },
    { skip: !user?.id },
  );

  const { data: service, refetch: refetchService } = useGetServiceQuery(
    { serviceId: +serviceId! },
    { skip: serviceId === undefined },
  );

  const [review, setReview] = useState<{ value: number; text: string }>({
    value: 5,
    text: '',
  });
  const [deleteFavorite] = useDeleteUserFavoriteMutation();
  const [addFavorite] = useAddUserFavoriteMutation();

  const [createReview] = useCreateServiceReviewMutation();

  const safeAreaBottom = useSignal(viewport.safeAreaInsetBottom);
  const [isReviewModalOpened, setIsReviewModalOpened] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favorites && service) {
      const isFav = favorites?.find(fav => fav.service.id === service.id);
      if (isFav) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [favorites, service]);

  const handleCreateBooking = () => {
    navigate(`/createbooking/${serviceId}`);
  };

  const handleGoToProvider = () => {
    navigate(`/provider/${service?.provider.id}`);
  };

  const handleFavorite = async () => {
    if (isFavorite) {
      await deleteFromFavorites();
    } else {
      await addToFavorites();
    }
  };

  const addToFavorites = async () => {
    if (service && user) {
      await addFavorite({ serviceId: service.id, userId: user.id }).unwrap();
    }
  };

  const deleteFromFavorites = async () => {
    if (service && user && favorites) {
      const fav = favorites?.find(fav => fav.service.id === service.id);

      if (fav) {
        await deleteFavorite({ id: fav?.id }).unwrap();
      }
    }
  };

  const handlePlaceServiceReview = async () => {
    await createReview({
      ...review,
      userId: +user!.id,
      serviceId: +service!.id,
    }).unwrap();
    await refetchService();
    const buttonId = popup.show({
      title: 'Отзыв',
      message: 'Отзыв успешно оставлен',
      buttons: [
        {
          id: 'close',
          type: 'close',
        },
      ],
    });
    if ((await buttonId) === 'close') {
      setIsReviewModalOpened(false);
    }
  };

  return (
    <List>
      <Title>Страница услуги</Title>
      <Section header={'Информация об услуге'}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            margin: '12px 0',
          }}
        >
          <Tappable
            style={{ position: 'absolute', right: '12px', top: '12px' }}
          >
            {isFavorite ? (
              <IoHeart size={24} onClick={handleFavorite} />
            ) : (
              <IoHeartOutline size={24} onClick={handleFavorite} />
            )}
          </Tappable>
          <Image
            src={'https://api.reservic.ru/' + service?.photo_url}
            size={96}
            style={{ userSelect: 'none', marginTop: '12px' }}
          />
        </div>
        <Cell subtitle="Название">{service?.title}</Cell>
        <Cell subtitle="Категория">{'Красота'}</Cell>
        <Cell subtitle="Цена">{service?.price + ' BYN'}</Cell>
        <Cell subtitle="Описание">{service?.description}</Cell>
        <Cell subtitle="Длительность">{service?.duration + ' мин'}</Cell>
        <Cell subtitle="Доступность">
          {`${formatMinutes(service?.start_time || 0)}-${formatMinutes(service?.end_time || 0)}`}
        </Cell>
        <NavigationCell onClick={handleGoToProvider}>
          Перейти к провайдеру
        </NavigationCell>
      </Section>

      <Section
        header={'Отзывы'}
        style={{ marginBottom: `${safeAreaBottom + 120}px` }}
      >
        <ButtonCell
          onClick={() => setIsReviewModalOpened(true)}
          before={<IoMdPaper size={24} />}
        >
          Написать отзыв
        </ButtonCell>
        {service?.reviews.map(review => {
          return (
            <Cell
              before={<Avatar size={48} src={review.user.photo_url} />}
              subhead={review.user.first_name}
              subtitle={<Rating value={review.value} disabled />}
              description={review.text}
            />
          );
        })}
      </Section>
      <FixedLayout
        vertical="bottom"
        style={{ padding: '16px', paddingBottom: `${safeAreaBottom + 8}px` }}
      >
        <Button size="l" stretched onClick={handleCreateBooking}>
          Создать бронь
        </Button>
      </FixedLayout>
      <Modal
        open={isReviewModalOpened}
        onOpenChange={setIsReviewModalOpened}
        header={<Modal.Header>Создание отзыва</Modal.Header>}
      >
        <List
          style={{
            overflow: 'visible',
            paddingBottom: `${safeAreaBottom}px`,
          }}
        >
          <Cell subhead={'Ваша оценка'}>
            <Rating
              style={{
                zIndex: 1000,
                position: 'relative',
                touchAction: 'manipulation',
              }}
              value={review.value}
              onChange={(e, v) => setReview({ ...review, value: v! })}
            />
          </Cell>
          <Textarea
            placeholder="Оставьте свой отзыв"
            onChange={e => setReview({ ...review, text: e.target.value })}
          ></Textarea>
          <Button size="l" stretched onClick={handlePlaceServiceReview}>
            Отправить отзыв
          </Button>
        </List>
      </Modal>
    </List>
  );
};
