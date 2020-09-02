import http from "./httpService";
import { baseUrl } from "../config.json";

export function getGenres() {
  return http.get(baseUrl + "/genres");
}
