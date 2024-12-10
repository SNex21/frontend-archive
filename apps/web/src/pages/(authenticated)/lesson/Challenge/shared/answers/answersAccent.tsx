import React from "react";
import { Answer } from "@/models/Session.ts";
import { ChallengeState } from "@/pages/(authenticated)/lesson/Challenge/Challenge.tsx";
import styles from "./answersAccent.module.scss";
import cn from "classnames";
import { Haptic } from "@/lib/twa/components/Haptic.tsx";

interface answersAccentProps {
  answers?: Answer[];

  currentAnswer: Answer | null;
  setAnswer: React.Dispatch<React.SetStateAction<Answer | null>>;

  state?: ChallengeState;
}

interface AnswerAccentProps {
  Answer?: Answer;

  onSelect?: () => void;

  isSelected?: boolean;
  state?: ChallengeState;
}

const answersAccent: React.FC<answersAccentProps> = ({ answers, currentAnswer, setAnswer, state }) => {
  if (!answers) {
    return null;
  }

  return (
    <div className={styles.answers}>
      {answers.map((Answer, i) => (
        <AnswerAccent
          key={`${Answer.text}-${i}`}
          Answer={Answer}
          onSelect={!state?.submitted ? () => setAnswer(Answer) : undefined}
          isSelected={Answer === currentAnswer}
          state={state}
        />
      ))}
    </div>
  );
};

const AnswerAccent: React.FC<AnswerAccentProps> = ({ Answer, onSelect, state, isSelected }) => {
  return (
    <Haptic type={"impact"} value={"medium"} disabled={state?.submitted} asChild>
      <div
        className={cn(styles.Answer, {
          [styles["Answer_not-submitted"]!]: !state?.submitted,
          [styles.Answer_selected!]: isSelected,
          [styles.Answer_right!]: isSelected && state?.submitted && !state?.wrong,
        })}
        role="radio"
        onClick={onSelect}
      >
        <span className={styles.Answer__text}>{Answer?.text}</span>
        {isSelected && (
          <div className={styles.Answer__accent}>
            <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 0L3.05825 11H0L2.32767 0H7Z" />
            </svg>
          </div>
        )}
      </div>
    </Haptic>
  );
};

export { answersAccent, AnswerAccent };
