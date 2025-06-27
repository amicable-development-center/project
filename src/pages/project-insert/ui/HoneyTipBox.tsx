import { Box, styled, alpha } from "@mui/material";
import type { JSX } from "react";

const HoneyTipBox = (): JSX.Element => {
  return (
    <TipContainer>
      {/* 헤더 섹션 */}
      <TipHeader>
        <HeaderIcon>💡</HeaderIcon>
        <HeaderTitle>꿀팁 모음집</HeaderTitle>
      </TipHeader>

      {/* 팁 그리드 */}
      <TipGrid>
        <TipCard>
          <CardIcon>🎯</CardIcon>
          <CardContent>
            <CardTitle>구체적인 계획을 세우세요</CardTitle>
            <CardSubtext>
              일정과 역할이 명확할수록 좋은 팀원을 만날 수 있어요
            </CardSubtext>
          </CardContent>
        </TipCard>

        <TipCard>
          <CardIcon>🤝</CardIcon>
          <CardContent>
            <CardTitle>초보자도 환영해요</CardTitle>
            <CardSubtext>경험보다 열정이 더 중요할 때가 많아요</CardSubtext>
          </CardContent>
        </TipCard>

        <TipCard>
          <CardIcon>💬</CardIcon>
          <CardContent>
            <CardTitle>소통 방식 미리 정하기</CardTitle>
            <CardSubtext>언제, 어떻게 만날지 미리 정해두면 좋아요</CardSubtext>
          </CardContent>
        </TipCard>

        <TipCard>
          <CardIcon>🎉</CardIcon>
          <CardContent>
            <CardTitle>재미있게 표현하기</CardTitle>
            <CardSubtext>
              딱딱한 설명보다 재미있는 설명이 더 매력적이에요
            </CardSubtext>
          </CardContent>
        </TipCard>
      </TipGrid>
    </TipContainer>
  );
};

export default HoneyTipBox;

// 메인 컨테이너 - 폼과 통일감 있는 디자인
const TipContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: "#fffbe6",
  border: "1px solid #e0e0e0",
  borderRadius: "12px",
  padding: theme.spacing(2),

  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
}));

// 헤더 섹션 - 간결하고 명확한 스타일
const TipHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: `1px solid ${alpha("#000", 0.08)}`,
}));

// 헤더 아이콘
const HeaderIcon = styled(Box)(() => ({
  fontSize: "20px",
  fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"',
}));

// 헤더 타이틀
const HeaderTitle = styled(Box)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: "#333",
  letterSpacing: "-0.02em",

  [theme.breakpoints.up("sm")]: {
    fontSize: "19px",
  },
}));

// 팁 그리드 - 폼과 동일한 간격
const TipGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(2),

  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(2),
  },
}));

// 개별 팁 카드 - 폼 요소와 유사한 스타일
const TipCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  padding: theme.spacing(2),
  backgroundColor: "#fff",
  border: "1px solid #e8e8e8",
  borderRadius: "8px",

  // 서브틀한 그림자로 깊이감
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",

  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
}));

// 카드 아이콘 - 심플하고 깔끔한 스타일
const CardIcon = styled(Box)(() => ({
  fontSize: "28px",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",

  // 이모지 최적화
  fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"',
}));

// 카드 컨텐츠
const CardContent = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
}));

// 카드 타이틀 - 폼 레이블과 유사한 스타일
const CardTitle = styled(Box)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: 600,
  color: "#333",
  marginBottom: theme.spacing(0.5),
  lineHeight: 1.4,
  letterSpacing: "-0.01em",

  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
  },
}));

// 카드 서브텍스트 - 폼 헬퍼 텍스트와 유사한 스타일
const CardSubtext = styled(Box)(() => ({
  fontSize: "14px",
  color: "#666",
  lineHeight: 1.5,
  letterSpacing: "-0.005em",
}));
