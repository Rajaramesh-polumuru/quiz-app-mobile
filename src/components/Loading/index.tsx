import { styled } from "styled-components";

export const LoadingMaskWrapper = styled.div<{ isLoading: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ isLoading }) => (isLoading ? 0.5 : 1)};
  height: 100vh;
  width: 100vw;
  overflow: auto;
`;

export const LoadingMessageWrapper = styled.div`
  color: #000;
  position: fixed;
  top: 50%;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  width: 100vw;
  height: 100vh;
  gap: 20px;
`;

const LoadingMask = ({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading ? (
        <LoadingMessageWrapper>Loading...</LoadingMessageWrapper>
      ) : (
        <LoadingMaskWrapper isLoading={isLoading}>
          {children}
        </LoadingMaskWrapper>
      )}
    </>
  );
};

export default LoadingMask;
