const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export const createHabit = async (title, targetPerWeek) => {
  const res = await fetch(`${BASE_URL}/api/habits/create`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ title, targetPerWeek }),
  });
  if (!res.ok) throw new Error("Failed to create habit");
  return res.json();
};

export const getHabits = async () => {
  const res = await fetch(`${BASE_URL}/api/habits`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch habits");
  return res.json();
};

export const checkin = async (habitId) => {
  const res = await fetch(`${BASE_URL}/api/habits/checkin`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ habitId }),
  });
  if (!res.ok) throw new Error("Failed to check in");
  return res.json();
};

export const getFeed = async () => {
  const res = await fetch(`${BASE_URL}/api/habits/feed`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch feed");
  return res.json();
};

export const deleteHabit = async (habitId) => {
  const res = await fetch(`${BASE_URL}/api/habits/delete`, {
    method: "DELETE",
    headers: authHeaders(),
    body: JSON.stringify({ habitId }),
  });
  if (!res.ok) throw new Error("Failed to delete habit");
  return res.json();
};

export const getInsights = async () => {
  const res = await fetch(`${BASE_URL}/api/habits/insights`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch insights");
  return res.json();
};

export const login = async (userName, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password }),
  });
  return res.json();
};

export const signup = async (userName, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password }),
  });
  return res.json();
};

export const deleteAccount = async () => {
  const res = await fetch(`${BASE_URL}/api/auth/delete`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete account");
  return res.json();
};