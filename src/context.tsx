import Pusher from 'pusher-js';
import React from 'react';
import { Data, ResponseObject, Tokens } from './type';

interface AppContextProps {
  children: React.ReactNode;
}

interface AppContextState {
  data: Data[];
}

const Context = React.createContext<AppContextState>({} as AppContextState);

const AppContext: React.FC<AppContextProps> = ({ children }) => {
  const [data, setData] = React.useState<Data[]>([]);
  React.useEffect(() => {
    bootstrap();
    return () => {
      const event = new Event('unsubscribeFromPusher');
      window.dispatchEvent(event);
    };
  }, []);

  const bootstrap = () => {
    fetch('https://api.chatapp.online/v1/tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: process.env.REACT_APP_EMAIL,
        password: process.env.REACT_APP_PASSWORD,
        appId: process.env.REACT_APP_APP_ID,
      }),
    })
      .then(response => response.json())
      .then((tokens: Tokens) => {
        if (!tokens.success) {
          const err: any = tokens;
          throw new Error(err.error.message);
        }

        const pusher = new Pusher('ChatsAppApiProdKey', {
          wsHost: 'api.chatapp.online',
          wssPort: 6001,
          disableStats: true,
          authEndpoint: 'https://api.chatapp.online/broadcasting/auth',
          auth: {
            headers: {
              Authorization: tokens.data.accessToken,
            },
          },
          enabledTransports: ['ws'],
          forceTLS: true,
        });

        window.addEventListener('unsubscribeFromPusher', () => {
          pusher.unsubscribe('private-v1.licenses.20519.messengers.telegram');
        });

        const telegram = pusher.subscribe(
          'private-v1.licenses.20519.messengers.telegram'
        );

        telegram.bind('message', ({ payload }: ResponseObject) => {
          setData(prevData => [payload.data[0], ...prevData]);
        });
      })
      .catch(err => console.log(err.message));
  };

  return <Context.Provider value={{ data }}>{children}</Context.Provider>;
};

export default AppContext;

export const useAppContext = () => React.useContext(Context);
