import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import styled from "styled-components";

export const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  max-width: 450px;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
`;

export const QuizWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 432px;
  max-height: 396px;
  filter: drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.1));
`;
export const StartButton = styled.button`
  border-radius: 80px;
  background: #ff3b3f;
  max-width: 630px;
  max-height: 120px;
  width: 100%;
  color: #fff;
  font-family: "Nunito", sans-serif;
  font-size: 2rem;
  font-style: normal;
  font-weight: 900;
  line-height: 67px;
  border: none;
  cursor: pointer;
  padding: 20px 80px;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

export default function Home() {
  const router = useRouter();
  const onStartClick = () => {
    router.push({
      pathname: "/quiz",
      query: { redirect: "index" },
    });
    console.log("Start button clicked!");
  };

  return (
    <>
      <Layout title="Quiz App" description="Quiz App">
        <MainTitle>Quiz App</MainTitle>
        <QuizWrapper>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50%"
            height="396"
            viewBox="0 0 432 396"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M216 396C335.294 396 432 307.352 432 198C432 88.6476 335.294 0 216 0C96.7065 0 0 88.6476 0 198C0 307.352 96.7065 396 216 396Z"
              fill="white"
            />
            <text>
              <tspan
                x="50%"
                y="50%"
                text-anchor="middle"
                alignment-baseline="middle"
                font-family="Poppins, sans-serif"
                font-size="5rem"
                font-style="normal"
                font-weight="900"
                fill="#ff3b3f"
              >
                Quiz
              </tspan>
            </text>
          </svg>
        </QuizWrapper>
        <StartButton onClick={onStartClick}>Start</StartButton>
      </Layout>
    </>
  );
}
