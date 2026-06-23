import { fetchDepots } from "../services/depots.service.js";

export async function getDepots(req, res, next) {
    try {
        const depots = await fetchDepots();

        res.status(200).json({
            success: true,
            data: depots,
        });
    } catch (error) {
        next(error);
    }
}