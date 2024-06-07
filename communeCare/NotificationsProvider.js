import { useEffect } from 'react'
import { getOrRegisterPushToken, initNotificationsListen } from './App'



export const NotificationsProvider = () => {
    

    useEffect(() => {
        
            (async () => {
                console.log("gbhnjkl;")
                //если в ответ от has_token false, то делаем запрос к владу для записи токена
                try {
                    const token = await getOrRegisterPushToken()
                console.log(token);
                if (!token) {
                    console.log("Ошибка генерации push-токена");
                    return
                }
                initNotificationsListen()
                } catch (error) {
                    console.log(error)
                }
                
            })()
        }
    ,[])

    return <></>
}