import Head from "next/head";
import Image from "next/image";
import { FC } from "react";
import styled from "styled-components";
import quizBackground from "@/assets/quiz-background.svg";

const BodyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  height: 100vh;
  width: 100vw;
  overflow: auto;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(
    180deg,
    rgba(175, 156, 243, 0) 5.73%,
    #af9cf3 100%
  );
  background-blend-mode: multiply;
  overflow: auto;
  max-width: 750px;
  max-height: 1624px;
  width: 100%;
  height: 100%;
  padding: 20px;
`;
export interface LayoutProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  type?: string;
}

const QuestionBackgroundWrapper = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  align-items: center;
  background: #af9cf3;
  background-blend-mode: multiply;
  max-width: 750px;
  max-height: 1624px;
  height: 100%;
  width: 100%;
`;

const QuestionOverlayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: inherit;
  width: 100%;
  border-radius: 60px 60px 0px 0px;
  background: #fff;
`;
const BGWrapper = styled.div`
  width: 100%;
  height: 150px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const Layout: FC<LayoutProps> = ({ title, description, children, type }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BodyWrapper>
        {type == "Question" ? (
          <QuestionBackgroundWrapper>
            <BGWrapper>
              <Image
                src={quizBackground}
                alt="Quiz background"
                objectFit="cover"
              />
            </BGWrapper>
            <QuestionOverlayWrapper>{children}</QuestionOverlayWrapper>
          </QuestionBackgroundWrapper>
        ) : (
          <MainWrapper>{children}</MainWrapper>
        )}
      </BodyWrapper>
    </>
  );
};

export default Layout;
