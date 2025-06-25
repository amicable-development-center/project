import type { CSSObject } from "@emotion/react";
import { Box, Button, Typography, Container } from "@mui/material";
import type { ContainerProps } from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, type FormEvent } from "react";
import type { JSX } from "react";

import useProjectInsert from "@features/projects/hook/useProjectInsert";

import ProjectCategoryCard from "@entities/projects/ui/project-insert/ProjectCategoryCard";
import ProjectDeadlineCard from "@entities/projects/ui/project-insert/ProjectDeadlineCard";
import ProjectOneLineCard from "@entities/projects/ui/project-insert/ProjectOneLineCard";
import ProjectSimpleDescCard from "@entities/projects/ui/project-insert/ProjectSimpleDescCard";
import ProjectTitleCard from "@entities/projects/ui/project-insert/ProjectTitleCard";

const steps = [
  { id: 1, title: "기본 정보" },
  { id: 2, title: "팀 구성" },
  { id: 3, title: "프로젝트 계획" },
  { id: 4, title: "모집 조건" },
];

const initialForm = {
  title: "",
  subtitle: "",
  category: "",
  description: "",
  deadline: "",
};

const PRIMARY = "#2563EB";
const PRIMARY_DARK = "#1d4ed8";

const ProjectInsertPage = (): JSX.Element => {
  const { submit } = useProjectInsert();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (e: any): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (): void => setCurrentStep((prev) => prev + 1);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    submit();
    alert("프로젝트 등록!");
  };

  return (
    <MainContainer
      sx={{
        px: { xs: 1, sm: 2, md: 3 },
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      {/* 상단 타이틀/설명 */}
      <Box maxWidth={700} mx="auto" pb={2} textAlign="center">
        <Typography variant="h3" fontWeight={800} mb={1} color="#222">
          같이 할 사람 구해요! 🚀
        </Typography>
        <Typography variant="h6" color="#555" mb={0.5}>
          멋진 아이디어가 있다면 팀원을 모집해보세요
        </Typography>
        <Typography fontSize={15} color="#888">
          혼자서는 힘들어도 함께라면 뭐든 할 수 있어요!
        </Typography>
      </Box>

      {/* 스텝바 */}
      <Box display="flex" justifyContent="center" gap={4} mb={5}>
        {steps.map((step, idx) => (
          <Box key={step.id} display="flex" alignItems="center">
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: currentStep === step.id ? PRIMARY : "#e0e7ef",
                color: currentStep === step.id ? "#fff" : "#888",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 18,
                border: `2px solid ${currentStep === step.id ? PRIMARY : "#e0e7ef"}`,
              }}
            >
              {step.id}
            </Box>
            <Typography
              sx={{
                ml: 1,
                mr: 1,
                fontWeight: currentStep === step.id ? 700 : 500,
                color: currentStep === step.id ? PRIMARY : "#888",
                fontSize: 16,
              }}
            >
              {step.title}
            </Typography>
            {idx < steps.length - 1 && (
              <Box color="#bbb" fontSize={22}>
                →
              </Box>
            )}
          </Box>
        ))}
      </Box>

      <Box component="form" onSubmit={handleSubmit} maxWidth={1500} mx="auto">
        {/* 1단계: 기본 정보 */}
        {currentStep === 1 && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMdDown ? "1fr" : "1fr 1fr",
                gap: theme.spacing(isSmDown ? 2 : 4),
                marginBottom: 0,
              }}
            >
              <ProjectTitleCard
                value={form.title}
                onChange={handleChange}
                large
                style={{ gridColumn: "span 1" }}
              />
              <ProjectOneLineCard
                value={form.subtitle}
                onChange={handleChange}
                large
                style={{ gridColumn: "span 1" }}
              />
              <ProjectCategoryCard
                value={form.category}
                onChange={handleChange}
                large
                style={{ gridColumn: "span 1" }}
              />
              <ProjectDeadlineCard
                value={form.deadline}
                onChange={handleChange}
                large
                style={{ gridColumn: "span 1" }}
              />
              <ProjectSimpleDescCard
                value={form.description}
                onChange={handleChange}
                large
                style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
              />
            </div>
          </>
        )}

        {/* 네비게이션 버튼 */}
        <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
          <Button
            variant="outlined"
            sx={{
              color: PRIMARY,
              borderColor: PRIMARY,
              fontWeight: 700,
              px: 3,
            }}
          >
            임시 저장
          </Button>
          {currentStep < steps.length ? (
            <Button
              variant="contained"
              sx={{
                background: PRIMARY,
                fontWeight: 700,
                px: 4,
                "&:hover": { background: PRIMARY_DARK },
              }}
              onClick={handleNext}
              disabled={
                !(
                  form.title &&
                  form.subtitle &&
                  form.category &&
                  form.description &&
                  form.deadline
                )
              }
            >
              다음 단계 →
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: PRIMARY,
                fontWeight: 700,
                px: 4,
                "&:hover": { background: PRIMARY_DARK },
              }}
            >
              프로젝트 등록하기
            </Button>
          )}
        </Box>
      </Box>

      {/* 꿀팁 모음집 */}
      <Box
        maxWidth={1500}
        mx="auto"
        mt={6}
        bgcolor="#fffbe6"
        border="1.5px solid #ffe6a0"
        borderRadius={1}
        p={3}
        px={{ xs: 1, sm: 2, md: 3 }}
      >
        <Typography
          fontWeight={700}
          fontSize={22}
          mb={3}
          display="flex"
          alignItems="center"
          gap={1}
        >
          <span role="img" aria-label="lightbulb">
            💡
          </span>{" "}
          꿀팁 모음집
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={4}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Box flex={1} minWidth={220}>
            <Typography
              fontWeight={700}
              fontSize={18}
              mb={0.5}
              color="#222"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <span role="img" aria-label="target">
                🎯
              </span>{" "}
              구체적인 계획을 세우세요
            </Typography>
            <Typography fontSize={16} color="#555" mb={2}>
              일정과 역할이 명확할수록 좋은 팀원을 만날 수 있어요
            </Typography>
            <Typography
              fontWeight={700}
              fontSize={18}
              mb={0.5}
              color="#222"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <span role="img" aria-label="handshake">
                🤝
              </span>{" "}
              초보자도 환영해요
            </Typography>
            <Typography fontSize={16} color="#555">
              경험보다 열정이 더 중요할 때가 많아요
            </Typography>
          </Box>
          <Box flex={1} minWidth={220}>
            <Typography
              fontWeight={700}
              fontSize={18}
              mb={0.5}
              color="#222"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <span role="img" aria-label="chat">
                💬
              </span>{" "}
              소통 방식 미리 정하기
            </Typography>
            <Typography fontSize={16} color="#555" mb={2}>
              언제, 어떻게 만날지 미리 정해두면 좋아요
            </Typography>
            <Typography
              fontWeight={700}
              fontSize={18}
              mb={0.5}
              color="#222"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <span role="img" aria-label="party">
                🎉
              </span>{" "}
              재미있게 표현하기
            </Typography>
            <Typography fontSize={16} color="#555">
              딱딱한 설명보다 재미있는 설명이 더 매력적이에요
            </Typography>
          </Box>
        </Box>
      </Box>
    </MainContainer>
  );
};

export default ProjectInsertPage;

const MainContainer = styled(Container)<ContainerProps>(
  ({ theme }: { theme: Theme }): CSSObject => ({
    flexGrow: 1,
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  })
);
