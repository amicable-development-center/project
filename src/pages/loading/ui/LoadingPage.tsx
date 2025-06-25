import { Box, Typography } from "@mui/material";
import { motion } from "motion/react";
import type { JSX } from "react";

interface LoadingPageProps {
  title?: string;
  subtitle?: string;
  message?: string;
}

const LoadingPage = ({
  title = "노나 프로젝트",
  subtitle = "최고의 개발 팀을 만나보세요",
  message = "페이지로 이동 중입니다...",
}: LoadingPageProps): JSX.Element => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)",
        overflow: "hidden",
      }}
    >
      {/* 배경 파티클 효과 */}
      {Array.from({ length: 30 }).map((_, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        {/* 메인 로고 영역 */}
        <motion.div
          style={{
            width: 100,
            height: 100,
            background: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "2.5rem",
            }}
          >
            N
          </Typography>
        </motion.div>

        {/* 메인 타이틀 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: 700,
              textAlign: "center",
              mb: 1,
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            {title}
          </Typography>
        </motion.div>

        {/* 서브타이틀 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: 400,
              textAlign: "center",
              mb: 4,
              textShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            {subtitle}
          </Typography>
        </motion.div>

        {/* 로딩 메시지 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              textAlign: "center",
              fontSize: "1.1rem",
              mb: 4,
            }}
          >
            {message}
          </Typography>
        </motion.div>

        {/* 무한 반복 로딩 닷들 */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              style={{
                width: 12,
                height: 12,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRadius: "50%",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </Box>

        {/* 펄스 링 효과 */}
        <motion.div
          style={{
            position: "absolute",
            width: 150,
            height: 150,
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.05, 0.2],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>
    </Box>
  );
};

export default LoadingPage;
