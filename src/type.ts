export interface ResponseObject {
  payload: {
    data: Data[];
  };
}

export type Data = {
  id: number;
  fromApi: boolean;
  fromMe: boolean;
  side: string;
  time: Date;
  isForwarded: boolean;
  type: string;
  message: {
    text: string;
    caption: string;
    file: {
      link: string;
      name: string;
      contentType: string;
    };
  };
  fromUser: {
    id: string;
    username: string;
    name: string;
    phone: string | null;
  };
  chat: {
    id: string;
    hash: string;
    type: string;
    phone: string | null;
    username: string;
    name: string;
    image: string | null;
    imageId: string | null;
  };
};

export type Tokens = {
  success: boolean;
  data: {
    cabinetUserId: number;
    accessToken: string;
    accessTokenEndTime: Date;
    refreshToken: string;
    refreshTokenEndTime: Date;
  };
};
