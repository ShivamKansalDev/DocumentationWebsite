export interface TopicModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  add?: boolean;
  edit?: boolean;
}

export interface MainContextProps {
  types: Type[];
  titles: Title[];
  questions: Question[];
  setTypes: React.Dispatch<React.SetStateAction<Type[]>>;
  setTitles: React.Dispatch<React.SetStateAction<Title[]>>;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

export interface MainContextProviderProps {
  children: ReactNode;
}

export interface SidebarProps {
  sidebarWidth: string;
}

export interface PageProps {
  pageTitle?: Title | null;
  questions?: Question[] | null;
}

export interface Question {
  _id: string;
  typeId: string;
  titleId: string;
  question: string;
  answer: string;
  quesLink: string;
  attachments: [string];
}

export interface Title {
  _id: string;
  title: string;
  titleLink: string;
  typeId: string;
}

export interface Type {
  _id: string;
  typeName: string;
  typeLink: string;
}

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  password: string;
  accessToken: string;
}

export interface DisplayContentProps {
  content: string;
}

export interface AuthInstance {
  signIn: () => void;
  signOut: () => void;
}
