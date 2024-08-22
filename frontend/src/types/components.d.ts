export interface TopicModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface SampleModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface SidebarProps {
    sidebarWidth: string;
}

export interface PageProps {
    pageDetails?: Subheading | null;
}

export interface Question {
    question: string;
    answer: string;
    imagePath: string;
}

export interface Subheading {
    topic: string;
    subLink: string;
    questions: Question[];
}

export interface Topic {
    type: string;
    link: string;
    subheadings: Subheading[];
}