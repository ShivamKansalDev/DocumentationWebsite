import { Question, Subheading, Topic } from "../types/components";

const data: Topic[] = [
    {
        type: "ReactJS",
        link: "reactjs",
        subheadings: [
            {
                topic: "React Introduction",
                subLink: "react-introduction",
                questions: [
                    {
                        question: "Your First Component",
                        answer: "answer"
                    },
                    {
                        question: "Importing and Exporting Components",
                        answer: "answer"
                    },
                    {
                        question: "Writing Markup with JSX",
                        answer: "answer"
                    },
                ] as Question[],
            },
            {
                topic: "React Basics",
                subLink: "react-basics",
                questions: [
                    {
                        question: "Question 1",
                        answer: "answer"
                    },
                    {
                        question: "Question 2",
                        answer: "answer"
                    },
                ] as Question[],
            },
        ] as Subheading[],
    },
    {
        type: "ReactNative",
        link: "react-native",
        subheadings: [
            {
                topic: "Stripe Integration",
                subLink: "stripe-integration",
                questions: [
                    {
                        question: "how to ?",
                        answer: "answer"
                    },
                    {
                        question: "how to ?",
                        answer: "answer"
                    },
                ] as Question[],
            },
            {
                topic: "Webhook",
                subLink: "webhook",
                questions: [
                    {
                        question: "how to ?",
                        answer: "answer"
                    },
                    {
                        question: "how to ?",
                        answer: "answer"
                    },
                ] as Question[],
            },
        ] as Subheading[],
    },
    {
        type: "Node",
        link: 'node',
        subheadings: [
            {
                topic: "Stripe Integration",
                subLink: "stripe-integration",
                questions: [
                    {
                        question: "how to ?",
                        answer: "answer"
                    }
                ] as Question[],
            }
        ]
    },
]

export default data;