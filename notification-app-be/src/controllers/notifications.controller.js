import { fetchNotifications } from "../services/notifications.service.js";

export async function getNotifications(req, res) {
  try {
    const data = await fetchNotifications();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
}