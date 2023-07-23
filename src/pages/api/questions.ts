import { NextApiRequest, NextApiResponse } from "next";

export interface QuestionData {
    id: number;
    questionText: string;
    options: OptionData[];
}

export interface OptionData {
    id: number;
    optionText: string;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<QuestionData[]>
) {
    const questions: QuestionData[] = [
        {
            id: 1,
            questionText: "What is the capital of Canada?",
            options: [
                { id: 1, optionText: "Toronto" },
                { id: 2, optionText: "Ottawa" },
                { id: 3, optionText: "Montreal" },
                { id: 4, optionText: "Vancouver" },
            ],
        },
        {
            id: 2,
            questionText: "Who painted the Mona Lisa?",
            options: [
                { id: 1, optionText: "Vincent van Gogh" },
                { id: 2, optionText: "Pablo Picasso" },
                { id: 3, optionText: "Leonardo da Vinci" },
                { id: 4, optionText: "Michelangelo" },
            ],
        },
        {
            id: 3,
            questionText: "What is the chemical symbol for water?",
            options: [
                { id: 1, optionText: "O2" },
                { id: 2, optionText: "H2O" },
                { id: 3, optionText: "CO2" },
                { id: 4, optionText: "N2" },
            ],
        },
        {
            id: 4,
            questionText: "Which planet is known as the 'Red Planet'?",
            options: [
                { id: 1, optionText: "Venus" },
                { id: 2, optionText: "Mars" },
                { id: 3, optionText: "Jupiter" },
                { id: 4, optionText: "Saturn" },
            ],
        },
        {
            id: 5,
            questionText:
                "Which programming language is used for building web applications?",
            options: [
                { id: 1, optionText: "Python" },
                { id: 2, optionText: "Java" },
                { id: 3, optionText: "JavaScript" },
                { id: 4, optionText: "C++" },
            ],
        },
    ];

    res.status(200).json(questions);
}
