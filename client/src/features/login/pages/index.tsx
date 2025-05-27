import {LoginButton, TelegramAuthData} from "@telegram-auth/react";
import {useNavigate} from "react-router";
import style from './style.module.css'

export const LoginPage = () => {
    const navigate = useNavigate()

   const onTelegramAuthSuccess = (data: TelegramAuthData)=>{
       window.sessionStorage.setItem('initData', JSON.stringify(data))
       navigate("/");
   }

    return <div className={style.container}>
        <LoginButton showAvatar={false} cornerRadius={0} requestAccess={'write'} buttonSize={'large'} botUsername={'reservic_bot'} onAuthCallback={onTelegramAuthSuccess}/>
    </div>
}