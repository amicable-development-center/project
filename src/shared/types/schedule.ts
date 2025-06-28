export interface ProjectSchedule {
  stageName: string;
  period: NewSchedulePeriod;
  description: string;
}

// 전체 프로젝트 기간
export enum ExpectedPeriod {
  oneMonth = "1개월 이내(빠르게)",
  twoMonths = "2개월(적당히)",
  threeMonths = "3개월(여유롭게)",
  fourMonths = "4개월",
  sixMonths = "6개월(장기프로젝트)",
  moreThanSixMonths = "6개월 이상(대장정)",
}

// 항목별 단계 기간
export enum NewSchedulePeriod {
  oneWeek = "1주",
  twoWeeks = "2주",
  threeWeeks = "3주",
  fourWeeks = "4주",
  twoMonths = "2개월",
  threeMonths = "3개월",
  lessThanSixMonths = "6개월 미만",
  moreThanSixMonths = "6개월 이상",
}
