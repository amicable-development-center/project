// 경력값(string 또는 number)을 한글 라벨로 변환하는 유틸 함수
export function getExperienceLabel(exp: string | number): string {
  switch (exp) {
    case "junior":
    case 0:
      return "주니어 (3년 이하) 🌱";
    case "mid":
    case 1:
      return "미들 (3년 이상 10년 이하) 🌿";
    case "senior":
    case 2:
      return "시니어 (10년 이상) 🌳";
    default:
      return String(exp);
  }
}
