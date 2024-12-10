import { GetTasksTopicsRes, GetTasksReq, GetTasksRes, CompleteSessionReq } from "@/services/api/tasks/types.ts";
import { apiClient } from "@/services/api/client.ts";
import { API_ENDPOINTS } from "@/services/api/endpoints.ts";
import { Session, Challenge, ChallengeType, Choice, DisplayToken} from "@/models/Session.ts";



export const getTasksTopics = async ({ token }: { token: string }): Promise<GetTasksTopicsRes> => {
  const { data } = await apiClient.get<GetTasksTopicsRes>(`${API_ENDPOINTS.GET_TOPICS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getTasks = async ({ token, ...params }: GetTasksReq): Promise<GetTasksRes> => {
  const { data } = await apiClient.post<any>(`${API_ENDPOINTS.SESSION}`, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Маппинг данных из API в модель Session
  return mapSession(data);
};

const mapSession = (apiData: any): Session => {
  const session = {} as Session

  session.id = apiData.id
  session.isHard = apiData.is_hard
  session.isWorkOnMistakes = apiData.is_work_on_mistakes
  session.topic = apiData.topic
  session.amount = apiData.amount
  session.challenges = apiData.challenges.map(mapChallenge)
  return session;
};

const mapChallenge = (apiChallenge: any): Challenge => {
  const challenge = {} as Challenge

  challenge.id = apiChallenge.id
  challenge.type = apiChallenge.slug
  challenge.prompt = apiChallenge.prompt
  challenge.displayTokens = apiChallenge.tokens?.map(mapDisplayToken)
  challenge.choices = apiChallenge.answers?.map(mapChoice)
  challenge.isHard = apiChallenge.is_hard
  challenge.isWorkOnMistakes = apiChallenge.is_work_on_mistakes
  challenge.explanation = apiChallenge.comment
  return challenge;
};

// const mapChallengeType = (type: string): ChallengeType => {
//   const challenge_type = {} as ChallengeType

//   challenge_type.
//   // switch (type) {
//   //   case "string":
//   //     return "gapFill";
//   //   default:
//   //     throw new Error(`Unknown challenge type: ${type}`);
//   // }
// };

const mapDisplayToken = (apiToken: any): DisplayToken => {
  return {
    text: apiToken.text,
    isBlank: apiToken.isBlank,
  };
};

const mapChoice = (apiChoice: any): Choice => {
  return {
    text: apiChoice.text,
    isCorrect: apiChoice.isCorrect,
  };
};

export const completeSession = async ({ token, ...body }: CompleteSessionReq) => {
  const { data } = await apiClient.delete(`${API_ENDPOINTS.SESSION}`, {
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
