import { client as Http } from './http';

export const mentoringEvaluation = (body, config) => Http.put(`/mentoria/evaluate/${config.param}`, body, config.headers);
export const pendingMentorings = (headers) => Http.get('/pendingMentorings', headers);
