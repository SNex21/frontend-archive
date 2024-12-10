import { Answer } from "@/models/Session.ts";
import React from "react";
import cn from "classnames";

import styles from "./answersBig.module.scss";
import { Haptic } from "@/lib/twa/components/Haptic.tsx";
import { ChallengeState } from "@/pages/(authenticated)/lesson/Challenge/Challenge.tsx";

interface answersBigProps {
  answers?: Answer[];

  currentAnswer: Answer | null;
  setAnswer: React.Dispatch<React.SetStateAction<Answer | null>>;

  state?: ChallengeState;
}

interface AnswerBigProps {
  text: string;
  isSelected: boolean;
  isRight?: boolean;
  onSelect?: () => void;
  state?: ChallengeState;
}

const answersBig: React.FC<answersBigProps> = ({ answers, currentAnswer, setAnswer, state }) => {
  if (!answers) {
    return null;
  }

  return (
    <div className={cn(styles.answers)}>
      {answers.map((Answer) => (
        <AnswerBig
          key={Answer.text}
          text={Answer.text}
          isSelected={currentAnswer === Answer}
          onSelect={!state?.submitted ? () => setAnswer(Answer) : undefined}
          state={state}
          isRight={Answer === currentAnswer && state?.submitted && !state?.wrong}
        />
      ))}
    </div>
  );
};

const AnswerBig: React.FC<AnswerBigProps> = ({ text, isSelected, isRight, state, onSelect }) => {
  return (
    <Haptic type={"impact"} value={"medium"} disabled={state?.submitted} asChild>
      <div
        role={"radio"}
        onClick={onSelect}
        className={cn(styles.Answer, {
          [styles["Answer_not-submitted"]!]: !state?.submitted,
          [styles.Answer_selected!]: isSelected,
          [styles.Answer_right!]: isRight,
        })}
      >
        <span className={styles.Answer__text}>{text}</span>
      </div>
    </Haptic>
  );
};

export { answersBig, AnswerBig };
