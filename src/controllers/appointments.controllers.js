/*
import AppointmentModel from '../models/appointment.model.js';

export const createAppointment = async (req, res) => {
    const appointment = req.body;
    try {
        //console.log(req.user.id)
        const appointmentFormatted = {...appointment, user_id: req.user.id};
        const id = await AppointmentModel.createAppointment(appointmentFormatted);
        res.status(201).json({ id });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const getAllAppointments = async (req, res) => {
    try {
        console.log(req.user.id)
        const rows = await AppointmentModel.getAllAppointments(req.user.id);
        //console.log(rows)
        res.json(rows);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const getAppointmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const row = await AppointmentModel.getAppointmentById(id);
        if (!row) return res.status(404).json({ error: "Appointment not found" });
        res.json(row);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const appointment = req.body;
    try {
        const changes = await AppointmentModel.updateAppointment(id, {...appointment, user_id: req.user.id});
        if (changes === 0) return res.status(404).json({ error: "Appointment not found" });
        res.json({ message: "Appointment updated successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const changes = await AppointmentModel.deleteAppointment(id);
        if (changes === 0) return res.status(404).json({ error: "Appointment not found" });
        res.json({ message: "Appointment deleted successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
*/