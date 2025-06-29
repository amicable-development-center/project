import {
  Box,
  Divider,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import type { JSX } from "react";

import DevelopersDropdown from "@shared/ui/DevelopersDropdown";
import LogoBox from "@shared/ui/LogoBox";
import NavigateButton from "@shared/ui/NavigateButton";

const Footer = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection>
          <Box sx={isMobile ? { marginLeft: -4 } : undefined}>
            <LogoBox size={isMobile ? "large" : "medium"} disableHover={true} />
          </Box>
          <InfoSection>
            <VisionText
              variant="body2"
              sx={
                isMobile
                  ? {
                      whiteSpace: "pre-line",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "block",
                      textAlign: "center",
                    }
                  : undefined
              }
            >
              {isMobile ? (
                <>
                  <b>함께 성장하는 개발자{"\n"}프로젝트 잼에서 시작하세요!!</b>
                </>
              ) : (
                <>
                  <b>
                    모든 개발자가 자신의 전문성을 바탕으로 함께 성장할 수 있는
                    협업의 문을 엽니다.
                  </b>
                  <Box component="span" display="block" mt={1}>
                    프로잭트 잼은 단순한 프로젝트 매칭을 넘어,
                  </Box>
                  <Box component="span" display="block" mt={0.5}>
                    다양한 개발 직군이 서로의 강점을 살려 함께 성장하는 생태계를
                    만들어갑니다.
                  </Box>
                  <Box component="span" display="block" mt={1}>
                    <b>
                      함께 성장하는 개발자 커뮤니티, 프로젝트 잼에서 시작하세요!
                      🚀
                    </b>
                  </Box>
                </>
              )}
            </VisionText>
          </InfoSection>
        </LogoSection>

        <NavSection>
          <NavigateButton
            to="/project"
            sx={{
              color: "#888",
              borderRadius: 0,
              background: "none",
              boxShadow: "none",
              minWidth: 0,
              padding: "0.75rem 1.5rem",
              fontWeight: 600,
              fontSize: "1rem",
              "&:hover": {
                background: "none",
                color: "#2563eb",
                boxShadow: "inset 0 -2px 0 #2563eb",
              },
            }}
          >
            프로젝트 찾기
          </NavigateButton>
          <NavigateButton
            to="/project/insert"
            sx={{
              color: "#888",
              borderRadius: 0,
              background: "none",
              boxShadow: "none",
              minWidth: 0,
              padding: "0.75rem 1.5rem",
              fontWeight: 600,
              fontSize: "1rem",
              "&:hover": {
                background: "none",
                color: "#2563eb",
                boxShadow: "inset 0 -2px 0 #2563eb",
              },
            }}
          >
            프로젝트 등록
          </NavigateButton>
        </NavSection>

        {/* 디벨로퍼즈 드롭다운 메뉴 */}
        <DevelopersSection>
          <DevelopersDropdown />
        </DevelopersSection>
      </FooterContent>

      <Box sx={{ maxWidth: 1280, margin: "3rem auto", width: "100%" }}>
        <Divider sx={{ color: "#e0e0e0" }} />
      </Box>

      <Copyright>© 2025 프로젝트잼. All rights reserved</Copyright>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled(Box)({
  width: "100%",
  background: "#fff",
  padding: "2rem 0 1rem 0",
  marginTop: "auto",
  boxShadow: " 0 -6px 12px -8px rgba(0,0,0,0.08)", // top 이너+아웃터 그림자
});

const FooterContent = styled(Box)(({ theme }) => ({
  height: "100%",
  maxWidth: 1280,
  margin: "0 auto",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
  },
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 8,
  height: "100%",
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
    alignSelf: "center",
  },
}));

const InfoSection = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 200,
  marginLeft: 16,
  marginTop: 52,
  [theme.breakpoints.down("md")]: {
    marginTop: 0,
    marginLeft: 0,
    textAlign: "center",
  },
}));

const NavSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 16,
  marginTop: 16,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 8,
  },
}));

const DevelopersSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 16,
  alignSelf: "flex-start",

  [theme.breakpoints.down("md")]: {
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
}));

const Copyright = styled(Typography)({
  textAlign: "center",
  color: "#bbb",
  fontSize: 13,
  marginTop: 16,
});

const VisionText = styled(Typography)({
  marginTop: 16,
  fontSize: 14,
  color: "#666",
});
