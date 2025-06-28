/**
 * 브라우저에서 HMR 성능을 측정하는 유틸리티
 * 개발자 도구 콘솔에서 사용
 */

class HMRPerformanceMonitor {
  private startTime: number = 0;
  private updateCount: number = 0;
  private totalTime: number = 0;

  constructor() {
    this.init();
  }

  private init(): void {
    if (typeof window !== "undefined" && import.meta.hot) {
      // HMR 업데이트 시작 감지
      import.meta.hot.on("vite:beforeUpdate", () => {
        this.startTime = performance.now();
        console.log("🔥 HMR 업데이트 시작...");
      });

      // HMR 업데이트 완료 감지
      import.meta.hot.on("vite:afterUpdate", () => {
        if (this.startTime) {
          const duration = performance.now() - this.startTime;
          this.updateCount++;
          this.totalTime += duration;

          console.log(`✅ HMR 업데이트 완료: ${duration.toFixed(2)}ms`);
          console.log(
            `📊 평균 시간: ${(this.totalTime / this.updateCount).toFixed(2)}ms`
          );
          console.log(`🔢 총 업데이트 횟수: ${this.updateCount}`);
        }
      });

      // 에러 감지
      import.meta.hot.on("vite:error", (error) => {
        console.error("❌ HMR 에러:", error);
      });
    }
  }

  // 통계 리셋
  reset(): void {
    this.updateCount = 0;
    this.totalTime = 0;
    console.log("📈 HMR 통계가 리셋되었습니다.");
  }

  // 현재 통계 출력
  getStats(): void {
    if (this.updateCount === 0) {
      console.log("📊 아직 HMR 업데이트가 없습니다.");
      return;
    }

    console.log("📊 HMR 성능 통계:");
    console.log(`   총 업데이트 횟수: ${this.updateCount}`);
    console.log(`   총 시간: ${this.totalTime.toFixed(2)}ms`);
    console.log(
      `   평균 시간: ${(this.totalTime / this.updateCount).toFixed(2)}ms`
    );
  }
}

// 전역 객체로 등록 (개발 환경에서만)
if (typeof window !== "undefined" && import.meta.env.DEV) {
  (window as any).hmrMonitor = new HMRPerformanceMonitor();
}

export default HMRPerformanceMonitor;
