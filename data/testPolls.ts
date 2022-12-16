import type { Poll } from "../types/base";

const testPolls: Poll[] = [
  {
    id: 0,
    caption: "2024 US Presidential Election",
    opt1: "Donald Trump",
    opt2: "Joe Biden",
    opt3: "Kanye West",
    opt4: "Mike Pence",
  },
  {
    id: 1,
    caption: "Uniswap proposal #n",
  },
  {
    id: 2,
    caption: "Is Aristotle better than Plato?",
    opt1: "Yes",
    opt2: "No",
    opt3: "Sometimes",
    opt4: "I don't know",
  },
  // {
  //   id: 3,
  //   caption: "Is SBF insane?",
  //   opt1: "Yes",
  //   opt2: "No",
  //   opt3: "Sometimes",
  //   opt4: "I don't know",
  // },
  {
    id: 3,
    caption: "Short caption",
    // caption:
    //   "This poll title is just wayyyy too long, since we are testing that kind of thing",
    opt1: "This option is also wayyy too ",
    opt2: "No",
    opt3: "Sometimes",
    opt4: "I don't know",
  },
];

export default testPolls;
