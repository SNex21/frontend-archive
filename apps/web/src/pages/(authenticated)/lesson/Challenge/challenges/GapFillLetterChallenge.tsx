import React from "react";
import { ChallengeScreenProps, ChallengeState } from "@/pages/(authenticated)/lesson/Challenge/Challenge.tsx";
import { ChallengeSubmit } from "@/pages/(authenticated)/lesson/Challenge/layout/ChallengeSubmit.tsx";
import { ChallengeHeading } from "@/pages/(authenticated)/lesson/Challenge/layout/ChallengeHeading.tsx";
import { Choice } from "@/models/Session.ts";
import { ChallengeMain } from "@/pages/(authenticated)/lesson/Challenge/layout/ChallengeMain.tsx";
import { useHapticFeedback } from "@/lib/twa/hooks";
import { GapFillLetterTokens } from "@/pages/(authenticated)/lesson/Challenge/shared/Tokens/GapFillLetterTokens.tsx";
import { ChoicesLetter } from "@/pages/(authenticated)/lesson/Challenge/shared/Choices/ChoicesLetter.tsx";

const GapFillLetterChallenge: React.FC<ChallengeScreenProps> = ({ challenge, updateStats, next }) => {
  const [_, notification] = useHapticFeedback();
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
    return <>{challenge.displayTokens?.map((token) => token.text)}</>;
  }, [challenge.displayTokens]);

  return (
    <>
      <ChallengeHeading challenge={challenge}>Заполни пропуск</ChallengeHeading>
      <ChallengeMain>
        <h3>привет привет</h3>
        <GapFillLetterTokens
          attempt={challenge.attempt}
          challengeId={challenge.id}
          currentChoice={choice}
          displayTokens={challenge.displayTokens}
          setChoice={setChoice}
          state={state}
        />
        <ChoicesLetter
          attempt={challenge.attempt}
          challengeId={challenge.id}
          choices={challenge.choices}
          currentChoice={choice}
          setChoice={setChoice}
          state={state}
        />
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

export { GapFillLetterChallenge };
