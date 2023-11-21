import { userData } from "../data/data"

export const fetchCurrentUser = () => {
  return Promise.resolve(userData);
}