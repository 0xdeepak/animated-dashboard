import { competitorsData, projectData, projectVisitsData, shareOfVoiceData, totalSharesData } from "../data/data";

export const fetchProjectData = () => {
  return Promise.resolve(projectData);
};

export const fetchSixMonthsProjectVisitsData = () => {
  return Promise.resolve(projectVisitsData["six-months"]);
};

export const fetchFullYearProjectVisitsData = () => {
  return Promise.resolve(projectVisitsData["year"]);
};

export const fetchShareOfVoiceData = () => {
  return Promise.resolve(shareOfVoiceData);
}

export const fetchTotalSharesData = () => {
  return Promise.resolve(totalSharesData);
}

export const fetchCompetitorsData = () => {
  return Promise.resolve(competitorsData);
}