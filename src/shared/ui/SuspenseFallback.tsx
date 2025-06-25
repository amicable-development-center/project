import { Box, Typography, styled } from "@mui/material";
import { motion, AnimatePresence } from "motion/react";
import { type JSX } from "react";

interface SuspenseFallbackProps {
  message?: string;
}

const SuspenseFallback = ({
  message = "페이지를 불러오는 중...",
}: SuspenseFallbackProps): JSX.Element => {
  return (
    <AnimatePresence>
      <OverlayContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <ContentContainer
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* 로딩 도트 애니메이션 */}
          <DotsContainer>
            {[0, 1, 2].map((index) => (
              <LoadingDot
                key={index}
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: index * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </DotsContainer>

          {/* 메시지 텍스트 */}
          <MessageText
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.2 }}
            variant="body1"
          >
            {message}
          </MessageText>

          {/* 배경 파동 효과 - 단순화 */}
          <WaveContainer>
            <Wave
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.05, 0.2],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </WaveContainer>
        </ContentContainer>
      </OverlayContainer>
    </AnimatePresence>
  );
};

export default SuspenseFallback;

// motion.create()를 사용한 컴포넌트들
const MotionDiv = motion.create("div");
const MotionTypography = motion.create(Typography);

const OverlayContainer = styled(MotionDiv)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
}));

const ContentContainer = styled(MotionDiv)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: theme.spacing(2),
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  position: "relative",
  overflow: "hidden",
  maxWidth: "300px",
}));

const DotsContainer = styled(Box)(() => ({
  display: "flex",
  gap: "6px",
  alignItems: "center",
}));

const LoadingDot = styled(MotionDiv)(({ theme }) => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 0 15px ${theme.palette.primary.main}40`,
}));

const MessageText = styled(MotionTypography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  textAlign: "center",
  userSelect: "none",
  fontSize: "1rem",
}));

const WaveContainer = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
  zIndex: -1,
}));

const Wave = styled(MotionDiv)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  border: `2px solid ${theme.palette.primary.main}`,
  backgroundColor: "transparent",
}));
