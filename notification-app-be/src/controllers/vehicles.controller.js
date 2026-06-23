import { fetchVehicles } from "../services/vehicles.service.js";

export async function getVehicles(req, res, next) {
    try {
        const vehicles = await fetchVehicles();

        res.status(200).json({
            success: true,
            data: vehicles,
        });
    } catch (error) {
        next(error);
    }
}