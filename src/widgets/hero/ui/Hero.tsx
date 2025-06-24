import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  styled,
  Typography,
  type ButtonProps,
} from "@mui/material";
import type { JSX } from "react";
import { Link } from "react-router-dom";

const Hero = (): JSX.Element => {
  return (
    <>
      <HeroTitle variant="subtitle1">
        함께 만들어가는{" "}
        <HeroTitleHighlight>사이드 프로젝트 🚀</HeroTitleHighlight>
      </HeroTitle>
      <HeroDescription variant="body1">
        아이디어는 있지만 팀이 없나요? <br />
        프로젝트 잼에서 함께할 동료를 찾아보세요!
      </HeroDescription>
      <HeroMessage variant="body1">
        혼자서는 힘들어도 함께라면 뭐든 할 수 있어요 ✨
      </HeroMessage>
      <HeroButtonContainer>
        <HeroButtonLink to="/project">
          <HeroButton variant="contained" color="primary">
            <SearchIcon />
            프로젝트 찾기
          </HeroButton>
        </HeroButtonLink>
        <HeroButtonLink to="/project/insert">
          <HeroButton variant="contained" color="inherit">
            <AddIcon />
            프로젝트 등록
          </HeroButton>
        </HeroButtonLink>
      </HeroButtonContainer>
    </>
  );
};

export default Hero;

const HeroTitle = styled(Typography)(() => ({
  textAlign: "center",
  marginBottom: "2.4rem",
}));

const HeroTitleHighlight = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle1,
  color: theme.palette.primary.main,
}));

const HeroDescription = styled(Typography)(() => ({
  textAlign: "center",
  marginBottom: "1.6rem",
}));

const HeroMessage = styled(Typography)(() => ({
  textAlign: "center",
  marginBottom: "3.2rem",
}));

const HeroButtonContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  gap: "1.6rem",
}));

const HeroButton = styled(Button)<ButtonProps>(() => ({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
}));

const HeroButtonLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "inherit",
}));
