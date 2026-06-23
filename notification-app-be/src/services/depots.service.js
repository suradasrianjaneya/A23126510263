import { Log } from "../logging-middleware/Log.js";

const API_URL = "http://4.224.186.213/evaluation-service/depots";

export async function fetchDepots() {
  try {
    await Log(
      "backend",
      "info",
      "depot-service",
      "Fetching depots from evaluation service"
    );

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    await Log(
      "backend",
      "info",
      "depot-service",
      "Depots fetched successfully"
    );

    return data;
  } catch (error) {
    await Log(
      "backend",
      "error",
      "depot-service",
      error.message
    );

    throw error;
  }
}