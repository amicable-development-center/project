import { Box, Typography, Divider, alpha, styled } from "@mui/material";
import { memo } from "react";
import type { JSX } from "react";

// 메모이제이션된 텍스트 컴포넌트들
export const MemoizedTitleSection = memo(
  ({ isMobile }: { isMobile: boolean }): JSX.Element => (
    <TitleArea>
      <TextContainer>
        <MainTitle variant={isMobile ? "h5" : "h4"}>프로젝트 찾기</MainTitle>
        <SubTitle variant="body1">
          원하는 조건으로 프로젝트를 검색하고 필터링하세요
        </SubTitle>
      </TextContainer>
    </TitleArea>
  )
);

export const MemoizedSectionHeader = memo(
  (): JSX.Element => (
    <SectionHeader>
      <SectionTitle variant="h6">상세 필터</SectionTitle>
      <SectionDivider />
    </SectionHeader>
  )
);

// Styled Components
const TitleArea = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const TextContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: theme.palette.text.primary,
  letterSpacing: "-0.02em",
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(3),
  gap: theme.spacing(2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  flexShrink: 0,
}));

const SectionDivider = styled(Divider)(({ theme }) => ({
  flex: 1,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
}));
