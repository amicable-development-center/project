export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-case": [2, "always", "lower-case"],

    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"]
    ],

    "subject-full-stop": [2, "never", "."],

    "type-enum": [
      2,
      "always",
      [
        "feat", // 새로운 기능
        "fix", // 버그 수정
        "docs", // 문서 변경
        "style", // 코드 포매팅, 세미콜론 누락 등
        "refactor", // 코드 리팩토링
        "perf", // 성능 개선
        "test", // 테스트 추가/수정
        "chore", // 빌드 업무, 패키지 매니저 설정 등
        "ci", // CI 설정 변경
        "build", // 빌드 시스템 변경
        "revert" // 이전 커밋 되돌리기
      ]
    ],

    "subject-max-length": [2, "always", 50],

    "header-max-length": [2, "always", 72]
  }
};
