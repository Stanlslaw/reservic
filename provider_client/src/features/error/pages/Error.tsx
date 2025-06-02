import { backButton } from '@telegram-apps/sdk-react';
import { useEffect } from 'react';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';

export const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const goMain = () => navigate('/');

  useEffect(() => {
    backButton.show();

    const offClick = backButton.onClick(() => navigate(-1));

    return () => {
      backButton.hide();
      offClick();
    };
  }, []);

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <div>
          {error.status} {error.statusText}
        </div>
        <div>{error.data}</div>
        <div onClick={goMain}>Вернуться на главную</div>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <div>
          {error.name} {error.message}
        </div>
        <div>{error.stack}</div>
        <div onClick={goMain}>Вернуться на главную</div>
      </div>
    );
  }
  return (
    <div>
      <div>Неизвесная ошибка</div>
      <div onClick={goMain}>Вернуться на главную</div>
    </div>
  );
};
