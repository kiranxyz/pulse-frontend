import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_PULSE_BACKEND_API_URL,
  fetchOptions: {
    credentials: "include",
  },
});
export const { useSession } = authClient;
