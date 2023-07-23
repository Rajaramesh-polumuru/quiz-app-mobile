import DonutChart from "@/components/ResultChart";
import Layout from "@/components/Layout";

import { styled } from "styled-components";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px;
  gap: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
`;
const ContentWrapper = styled.div<{
  type?: string;
}>`
  color: #000;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  background-color: ${({ type }) =>
    type === "success" ? "#E6F7EC" : "#FCE8E8"};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  border-radius: 10px;
  width: calc(100% - 40px);
  height: fit-content;
  gap: 20px;
`;

const Circle = styled.div<{ type: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ type }) => (type === "success" ? "#44B77B" : "#FF3B3F")};
`;
const StartAgain = styled.button`
  border-radius: 80px;
  background: #ff3b3f;
  max-width: inherit;
  width: 100%;
  color: #fff;
  font-family: "Nunito", sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 900;
  line-height: 67px;
  border: none;
  padding: 0 20px;
  cursor: pointer;
  align-items: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

const TitleWrapper = styled.h1`
  font-size: 40px;
  font-style: normal;
  font-weight: 900;
  line-height: 67px;
  text-align: center;
  color: #000;
  width: 100%;
  height: fit-content;
  margin: 0;
`;

const ResultPage: React.FC = () => {
  const router = useRouter();
  const { correctAnswers, wrongAnswers, totalQuestions, redirect } =
    router.query;

  useEffect(() => {
    if (redirect !== "quiz") {
      router.push("/");
    }
  }, [router, redirect]);
  const handleStartAgain = () => {
    router.push({
      pathname: "/quiz",
      query: { redirect: "result" },
    });
  };
  return (
    <Layout title="Result" description="Result" type="Question">
      <ResultWrapper>
        <TitleWrapper>Your Result</TitleWrapper>
        <DonutChart
          total={Number(totalQuestions)}
          score={Number(correctAnswers)}
        />
        <ContentWrapper type="success">
          <Circle type="success" />
          {`${correctAnswers} Correct`}
        </ContentWrapper>
        <ContentWrapper>
          <Circle type="fail" />
          {`${wrongAnswers} Incorrect`}
        </ContentWrapper>
        <StartAgain onClick={handleStartAgain}>Start Again</StartAgain>
      </ResultWrapper>
    </Layout>
  );
};

export default ResultPage;
