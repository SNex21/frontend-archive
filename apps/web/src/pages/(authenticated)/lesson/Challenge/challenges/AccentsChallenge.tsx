import React, { ReactNode } from "react";
import { ChallengeScreenProps, ChallengeState } from "@/pages/(authenticated)/lesson/Challenge/Challenge.tsx";
import { ChallengeSubmit } from "@/pages/(authenticated)/lesson/Challenge/layout/ChallengeSubmit.tsx";
import { ChallengeHeading } from "@/pages/(authenticated)/lesson/Challenge/layout/ChallengeHeading.tsx";
import { Choice } from "@/models/Session.ts";
import { ChallengeMain } from "@/pages/(authenticated)/lesson/Challenge/layout/ChallengeMain.tsx";
import { useHapticFeedback } from "@/lib/twa/hooks";
import { ChoicesAccent } from "@/pages/(authenticated)/lesson/Challenge/shared/Choices/ChoicesAccent.tsx";

const AccentsChallenge: React.FC<ChallengeScreenProps> = ({ challenge, updateStats, next }) => {
  const [, notification] = useHapticFeedback();
  const [choice, setChoice] = React.useState<Choice | null>(null);
  const [state, setState] = React.useState<ChallengeState>({ submitted: false, wrong: false });

  function onSubmit() {
    if (!choice) {
      return;
    }

    setState({
      submitted: true,
      wrong: !choice.isCorrect,
    });

    updateStats(choice.isCorrect);

    notification(choice.isCorrect ? "success" : "error");
  }

  const correctChoice = React.useMemo(() => {
    return (
      <>
        {challenge.choices?.map((choice) => {
          if (choice.isCorrect) {
            return `${choice.text}\u0301`;
          }

          return choice.text;
        })}
      </>
    );
  }, [challenge.choices]);
  const prompt = challenge.prompt ?? '';
  return (
    <>
      <ChallengeHeading challenge={challenge}>Выбери букву под ударением</ChallengeHeading>
      <ChallengeMain>
      {formatPrompt(
        prompt,
        <ChoicesAccent choices={challenge.choices} currentChoice={choice} setChoice={setChoice} state={state} />,
      )}
        </ChallengeMain>
      <ChallengeSubmit
        onSubmit={onSubmit}
        challenge={challenge}
        next={next}
        disabled={!choice}
        state={state}
        correctText={correctChoice}
        explanation={challenge.explanation}
      />
    </>
  );
};

function formatPrompt(prompt: string, GapFillComponent: ReactNode): ReactNode {
  // Разбиваем строку по маркеру {task_text}
  const parts = prompt.split('{task_text}');

  // Возвращаем отформатированный JSX
  return (
    <>
      <h3>{parts[0] && <span>{parts[0].trim()}</span>}</h3>
      {GapFillComponent}
      <h3>{parts[1] && <span>{parts[1].trim()}</span>}</h3>
    </>
  );
}

export { AccentsChallenge };
