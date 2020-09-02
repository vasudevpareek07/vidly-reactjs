import http from "./httpService";
import { baseUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = baseUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email,
    password,
  });
  this.storeToken(jwt);
}

function storeToken(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

function logout() {
  localStorage.removeItem(tokenKey);
}

export default {
  login,
  storeToken,
  getJwt,
  getCurrentUser,
  logout,
};
