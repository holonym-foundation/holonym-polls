export type Poll = {
  id: number;
  caption: string;
  opt1?: string;
  opt2?: string;
  opt3?: string;
  opt4?: string;
  opt1Votes?: number;
  opt2Votes?: number;
  opt3Votes?: number;
  opt4Votes?: number;
};
