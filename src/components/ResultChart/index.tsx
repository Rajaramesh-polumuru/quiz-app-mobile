import Image from "next/image";
import { styled } from "styled-components";
import resultChartBg from "@/assets/result-chart-background.svg";
import resultChartFg from "@/assets/result-chart-foreground.svg";
import meterPin from "@/assets/meter-pin.svg";
import { FC } from "react";

export const ChartContainer = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
`;

export const MeterPin = styled.polygon`
  fill: #007bff; /* Set the desired fill color */
  transition: fill 0.5s ease-in-out;
  transform: rotate(90deg);
  transform-origin: "250 250";
`;

export const GradientCircle = styled.circle<{
  radius: number;
}>`
  transition: stroke-dashoffset 0.5s ease-in-out;
  transform: rotate(264deg);
  transform-origin: center;
`;

export const ImageOverlay = styled.div<{
  rotateAngle?: string;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  transform: rotate(
    ${(props) => (props.rotateAngle ? props.rotateAngle : "0deg")}
  );
`;

export const ScoreWrapper = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ScoreText = styled.span`
  font-size: 28px;
  font-weight: bold;
`;

export interface DonutChartProps {
  total: number;
  score: number;
}
const DonutChart: FC<DonutChartProps> = ({ total, score }) => {
  const scoreFraction = score / total;
  const totalAngle = 180;
  const rotationAngle = 270 + scoreFraction * totalAngle;
  return (
    <ChartContainer>
      <ImageOverlay>
        <Image
          src={resultChartBg}
          alt="result-chart-background"
          width={300}
          height={300}
          objectFit="contain"
        />
      </ImageOverlay>

      <ImageOverlay rotateAngle={`${rotationAngle}deg`}>
        <Image
          src={meterPin}
          alt="meter-pin"
          width={300}
          height={300}
          objectFit="contain"
        />
      </ImageOverlay>

      <ImageOverlay>
        <Image
          src={resultChartFg}
          alt="result-chart-foreground"
          width={300}
          height={300}
          objectFit="contain"
        />
      </ImageOverlay>

      <ImageOverlay>
        <ScoreWrapper>
          <ScoreText>{`${(score / total) * 100}%`}</ScoreText>
        </ScoreWrapper>
      </ImageOverlay>
    </ChartContainer>
  );
};

export default DonutChart;
