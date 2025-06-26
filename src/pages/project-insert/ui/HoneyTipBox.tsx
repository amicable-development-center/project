import { Box, styled } from "@mui/material";
import type { JSX } from "react";

import TextWithEmoji from "@shared/ui/project-insert/TextWithEmoji";

// Typography에 fontSize={number}은 적용되지 않으므로 삭제하엿습니다.
// 스타일이 반복되어 사용되고 있기에 공통 컴포넌트로 만들어 재사용하였습니다.

const HoneyTipBox = (): JSX.Element => {
  return (
    <TipBox>
      <TextWithEmoji
        emoji="💡"
        emoji_label="lightbulb"
        mainText="꿀팁 모음집"
      />

      <Box
        display="flex"
        flexWrap="wrap"
        gap={4}
        mt={3}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Box flex={1}>
          <TextWithEmoji
            emoji="🎯"
            emoji_label="dart"
            mainText="구체적인 계획을 세우세요"
            subText="일정과 역할이 명확할수록 좋은 팀원을 만날 수 있어요"
          />
          <TextWithEmoji
            emoji="🤝"
            emoji_label="handshake"
            mainText="초보자도 환영해요"
            subText="경험보다 열정이 더 중요할 때가 많아요"
          />
        </Box>
        <Box flex={1}>
          <TextWithEmoji
            emoji="💬"
            emoji_label="chat"
            mainText="소통 방식 미리 정하기"
            subText="언제, 어떻게 만날지 미리 정해두면 좋아요"
          />
          <TextWithEmoji
            emoji="🎉"
            emoji_label="fun"
            mainText="재미있게 표현하기"
            subText="딱딱한 설명보다 재미있는 설명이 더 매력적이에요"
          />
        </Box>
      </Box>
    </TipBox>
  );
};

export default HoneyTipBox;

// 해당 Box는 부모의 MainContainer 밖으로 넘어가지 않으므로 MaxWidth, marginX 설정을 제거하였습니다.
const TipBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6), // default spacing이 8px ... 라고 하네요
  backgroundColor: "#fffbe6",
  border: "1.5px solid #ffe6a0",
  borderRadius: theme.spacing(1),
  padding: theme.spacing(3),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));
