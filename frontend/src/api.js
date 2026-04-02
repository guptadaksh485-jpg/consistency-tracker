const BASE_URL = "http://localhost:5000/api/habits";

export const createHabit = async (data) => {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getHabits = async (userId) => {
  const res = await fetch(`${BASE_URL}?userId=${userId}`);
  return res.json();
};

export const checkin = async (habitId) => {
  const res = await fetch(`${BASE_URL}/checkin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ habitId })
  });
  return res.json();
};

export const getFeed = async (userId) => {
  const res = await fetch(`${BASE_URL}/feed?userId=${userId}`);
  return res.json();
};