import styled from "styled-components";

interface ProgressChartProps {
  total: number;
  completed: number;
}

const ProgressChartContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const CircleBackground = styled.circle<{ stroke?: string }>`
  fill: #fff;
  stroke: ${({ stroke }) => (stroke ? stroke : "#fff")};
  stroke-width: 8;
`;

const CircleProgress = styled.circle<{
  total: number;
  completed: number;
  radius: number;
}>`
  fill: none;
  stroke: #44b77b;
  stroke-width: 8;
  stroke-linecap: round;
  transform-origin: 50% 50%;
  transform: rotate(-90deg);
  stroke-dasharray: ${({ radius }) => 2 * Math.PI * radius};
  stroke-dashoffset: ${({ total, completed, radius }) => {
    const progress = (completed / total) * (2 * Math.PI * radius);
    return 2 * Math.PI * radius - progress;
  }};
  transition: stroke-dashoffset 0.5s ease-in-out;
`;
const ProgressText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: bold;
`;

const CompletedWrapper = styled.span`
  color: #000;
  text-align: center;
  font-size: 56px;
  font-style: italic;
  font-weight: 900;
`;

const TotalWrapper = styled.span`
  color: #aeaeae;
  text-align: center;

  font-style: italic;
`;

const ProgressChart: React.FC<ProgressChartProps> = ({ total, completed }) => {
  const radius = 40;

  return (
    <ProgressChartContainer>
      <svg width="100%" height="100%" viewBox="0 0 120 120">
        <CircleBackground cx="60" cy="60" r={radius + 8} />{" "}
        <CircleBackground cx="60" cy="60" r={radius} stroke="#F3F4FA" />
        <CircleProgress
          cx="60"
          cy="60"
          r={radius}
          total={total}
          completed={completed}
          radius={radius}
        />
      </svg>
      <ProgressText>
        <CompletedWrapper>{completed}</CompletedWrapper>
        <TotalWrapper>/{total}</TotalWrapper>
      </ProgressText>
    </ProgressChartContainer>
  );
};

export default ProgressChart;
