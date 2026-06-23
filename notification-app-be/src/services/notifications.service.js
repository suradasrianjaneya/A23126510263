import { Log } from "../logging-middleware/Log.js";

const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

export async function fetchNotifications() {
  try {
    await Log(
      "backend",
      "info",
      "notification-service",
      "Fetching notifications"
    );

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    await Log(
      "backend",
      "info",
      "notification-service",
      "Notifications fetched successfully"
    );

    return data;
  } catch (error) {
    await Log(
      "backend",
      "error",
      "notification-service",
      error.message
    );

    throw error;
  }
}