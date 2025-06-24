export interface ProjectSchedule {
  stageName: string;
  period: ExpectedPeriod;
  description: string;
}

export enum ExpectedPeriod {
  oneMonth = "1개월 이내(빠르게)",
  twoMonths = "2개월(적당히)",
  threeMonths = "3개월(여유롭게)",
  fourMonths = "4개월",
  sixMonths = "6개월(장기프로젝트)",
  moreThanSixMonths = "6개월 이상(대장정)",
}
