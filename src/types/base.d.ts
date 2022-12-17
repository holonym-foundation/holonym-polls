export type AddressToVote = {
  // map of user address to their vote, as an option number
  [address: string]: 1 | 2 | 3 | 4;
};

export type Poll = {
  id: string;
  caption: string;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
  opt1Total: number;
  opt2Total: number;
  opt3Total: number;
  opt4Total: number;
  votes: AddressToVote;
};
