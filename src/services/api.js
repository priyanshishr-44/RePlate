const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8080/api"
).replace(/\/$/, "");

export async function apiRequest(path, options = {}) {
  const token =
    localStorage.getItem("replate_token") ||
    sessionStorage.getItem("replate_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`,
    {
      ...options,
      headers,
      body:
        options.body && typeof options.body !== "string"
          ? JSON.stringify(options.body)
          : options.body
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong. Please try again."
    );
  }

  return data;
}

export function saveSession(data, remember = true) {
  const storage = remember ? localStorage : sessionStorage;

  localStorage.removeItem("replate_token");
  localStorage.removeItem("replate_user");
  sessionStorage.removeItem("replate_token");
  sessionStorage.removeItem("replate_user");

  storage.setItem("replate_token", data.token);
  storage.setItem("replate_user", JSON.stringify(data.user));
}

export function clearSession() {
  localStorage.removeItem("replate_token");
  localStorage.removeItem("replate_user");
  sessionStorage.removeItem("replate_token");
  sessionStorage.removeItem("replate_user");
}