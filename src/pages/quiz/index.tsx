import Layout from "@/components/Layout";
import Chart from "@/components/ProgressChart";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { QuestionData } from "../api/questions";
import Image from "next/image";
import nextArrowIcon from "@/assets/next-arrow.svg";
import checkFilledIcon from "@/assets/check-filled.svg";
import { useRouter } from "next/router";
import LoadingMask from "@/components/Loading";

const ContentWrapper = styled.div`
  width: calc(100% - 40px);
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 40px;
`;
const ChartWrapper = styled.div`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  position: absolute;
  top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuestionWrapper = styled.div`
  color: #000;
  font-family: Nunito;
  font-size: 32px;
  font-style: normal;
  font-weight: 900;
  line-height: 56px;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  gap: 10px;
  padding: 20px;
  align-items: center;
  overflow: auto;
`;

const OptionButton = styled.button<{
  selected?: boolean;
}>`
  border: none;
  background: ${({ selected }) => (selected ? "#fff" : "#f3f4fa")};
  border: ${({ selected }) => (selected ? "2px solid #44B77B " : "none")};
  width: calc(100% - 40px);
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
  gap: 10px;
  color: #000;
  font-family: Nunito;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 45px;
`;

const Circle = styled.div<{ selected?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ selected }) => (selected ? "#44B77B" : "#f3f4fa")};
  border: ${({ selected }) =>
    selected ? "2px solid #DFE0E6 " : "2px solid #DFE0E6;"};
`;

const NextButton = styled.button`
  border-radius: 80px;
  background: #ff3b3f;
  max-width: inherit;
  width: calc(100% - 40px);
  color: #fff;
  font-family: "Nunito", sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 900;
  line-height: 67px;
  border: none;
  padding: 0 20px;
  margin: 0 20px;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 48px;
  align-items: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

export interface Answer {
  questionId: number;
  selectedOptionId: number;
}

const QuizPage = () => {
  const [question, setQuestion] = useState<QuestionData>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);

  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleOptionClick = (id: number) => {
    setSelectedOption(id);
  };

  const router = useRouter();
  const { redirect } = router.query;

  const submitAnswers = async (submittedAnswers: Answer[]) => {
    try {
      setIsLoading(true);
      const quizData = {
        submittedAnswers,
      };
      const response = await axios.post("/api/submit", quizData);
      const data = await response.data;
      const { correctAnswers, wrongAnswers } = data;
      router.push({
        pathname: "/result",
        query: {
          correctAnswers,
          wrongAnswers,
          totalQuestions: questions.length,
          redirect: "quiz",
        },
      });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const handleNextClick = () => {
    if (selectedOption === undefined) {
      return;
    }
    if (question?.id) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = {
        questionId: question?.id,
        selectedOptionId: selectedOption,
      };
      if (isLastQuestion) {
        submitAnswers(newAnswers);
      }
      setAnswers(newAnswers);
    }
    setCurrentQuestion(currentQuestion + 1);
    setQuestion(questions[currentQuestion + 1]);
    setSelectedOption(undefined);
  };
  const getQuestions = async () => {
    const response = await axios.get("/api/questions");
    const data = await response.data;
    console.log(data);
    setQuestions(data);
    setQuestion(data[0]);
  };

  useEffect(() => {
    if (redirect !== "index" && redirect !== "result") {
      router.push({
        pathname: "/",
      });
    }
    setIsLoading(false);
    getQuestions();
  }, [redirect, router]);

  return (
    <LoadingMask isLoading={isLoading}>
      <Layout title="Quiz" description="Quiz page" type={"Question"}>
        <ContentWrapper>
          <ChartWrapper>
            <Chart total={questions?.length} completed={currentQuestion} />
          </ChartWrapper>
          <QuestionWrapper key={question?.id}>
            {question?.questionText}
          </QuestionWrapper>
          <OptionsWrapper>
            {question?.options?.map((option, index) => (
              <OptionButton
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                selected={option.id === selectedOption}
              >
                {option.id === selectedOption ? (
                  <Image
                    src={checkFilledIcon}
                    width={24}
                    height={24}
                    alt="check-filled"
                  />
                ) : (
                  <Circle selected={option.id === selectedOption}></Circle>
                )}
                {option.optionText}
              </OptionButton>
            ))}
          </OptionsWrapper>
          <NextButton onClick={() => handleNextClick()}>
            {isLastQuestion ? "Submit" : "Next"}
            <Image
              src={nextArrowIcon}
              width={24}
              height={24}
              alt="next-arrow"
            />
          </NextButton>
        </ContentWrapper>
      </Layout>
    </LoadingMask>
  );
};

export default QuizPage;
