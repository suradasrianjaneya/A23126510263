import { Log } from "../logging-middleware/Log.js";

const API_URL =
  "http://4.224.186.213/evaluation-service/vehicles";

export async function fetchVehicles() {
  try {
    await Log(
      "backend",
      "info",
      "vehicle-service",
      "Fetching vehicles from evaluation service"
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
      "vehicle-service",
      "Vehicles fetched successfully"
    );

    return data;
  } catch (error) {
    await Log(
      "backend",
      "error",
      "vehicle-service",
      error.message
    );

    throw error;
  }
}