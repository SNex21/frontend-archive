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
  const { data } = await apiClient.post<any>(`${API_ENDPOINTS.SESSION}`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Маппинг данных из API в модель Session
  return mapSession(data);
};

const mapSession = (apiData: any): Session => {
  return {
    id: apiData.id,
    isHard: apiData.isHard,
    isWorkOnMistakes: apiData.isWorkOnMistakes,

    topic: apiData.topic,
    amount: apiData.amount,
    challenges: apiData.challenges.map(mapChallenge),
  };
};

const mapChallenge = (apiChallenge: any): Challenge => {
  return {
    id: String(apiChallenge.id),
    type: mapChallengeType(apiChallenge.type),
    prompt: apiChallenge.prompt,
    displayTokens: apiChallenge.tokens?.map(mapDisplayToken),
    choices: apiChallenge.answers?.map(mapChoice),
    isHard: apiChallenge.is_hard,
    isWorkOnMistakes: apiChallenge.is_work_on_mistakes,
    explanation: apiChallenge.comment,
  };
};

const mapChallengeType = (type: string): ChallengeType => {
  switch (type) {
    case "string":
      return "gapFill";
    default:
      throw new Error(`Unknown challenge type: ${type}`);
  }
};

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
