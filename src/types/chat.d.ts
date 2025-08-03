type Message = {
  id: number;
  text: string;
  sender: string;
  time: string;
};

type Friend = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  avatar: string;
};

type Messages = {
  [key: number]: Message[];
};

export type { Message, Friend, Messages };
