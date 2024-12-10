import { Answer } from "@/models/Session.ts";
import React from "react";
import cn from "classnames";

import styles from "./answersLetter.module.scss";
import { Haptic } from "@/lib/twa/components/Haptic.tsx";
import { motion } from "framer-motion";
import { ChallengeState } from "@/pages/(authenticated)/lesson/Challenge/Challenge.tsx";

interface answersLetterProps {
  attempt?: number;
  challengeId: string;
  answers?: Answer[];

  currentAnswer: Answer | null;
  setAnswer: React.Dispatch<React.SetStateAction<Answer | null>>;

  state?: ChallengeState;
}

interface AnswerLetterProps {
  challengeId: string;
  attempt?: number;
  text: string;
  onSelect?: () => void;
  state?: ChallengeState;
}

const answersLetter: React.FC<answersLetterProps> = ({
  challengeId,
  attempt,
  answers,
  currentAnswer,
  setAnswer,
  state,
}) => {
  if (!answers) {
    return null;
  }

  return (
    <div className={styles.answers}>
      {answers.map((Answer) => (
        <div className={styles["Answer-wrapper"]}>
          {currentAnswer !== Answer && (
            <AnswerLetter
              key={Answer.text}
              challengeId={challengeId}
              text={Answer.text}
              onSelect={() => (currentAnswer ? undefined : setAnswer(Answer))}
              state={state}
              attempt={attempt}
            />
          )}
          <div className={styles.Answer__skeleton} />
        </div>
      ))}
    </div>
  );
};

const AnswerLetter: React.FC<AnswerLetterProps> = ({ text, challengeId, onSelect, state, attempt = 0 }) => {
  return (
    <Haptic type={"impact"} value={"medium"} disabled={state?.submitted} asChild>
      <motion.div
        role={"radio"}
        onClick={onSelect}
        className={cn(styles.Answer, { [styles["Answer_not-submitted"]!]: !state?.submitted })}
        layoutId={`AnswerLetter-${challengeId}-${text}-${attempt}`}
        transition={{ duration: 0.2 }}
      >
        <span className={styles.Answer__text}>{text}</span>
      </motion.div>
    </Haptic>
  );
};

export { answersLetter, AnswerLetter };
