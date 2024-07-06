import './home.css';
import AppTable from '../appointments/AppTable';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import NewAppForm from '../appointments/NewAppForm';
import { AppModel } from '../../models/AppModel';
import React from 'react';

const Home: React.FC = () => {
    const [showAppForm, setShowAppForm] = useState(false);
    const [appointments, setAppointments] = useState<AppModel[]>([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:3000/appointments');
            const data: AppModel[] = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const addAppointment = async (description: string, doctor: string, date: string, time: string, patient: string) => {
        try {
            const response = await fetch('http://localhost:3000/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rowDescription: description,
                    rowDoctor: doctor,
                    rowDate: date,
                    rowTime: time,
                    rowPatient: patient,
                }),
            });
            const newAppointment: AppModel = await response.json();
            setAppointments(appointments => [...appointments, newAppointment]);
        } catch (error) {
            console.error('Error adding appointment:', error);
        }
    };

    const deleteApp = async (deleteAppRowNumber: number) => {
        try {
            await fetch(`http://localhost:3000/appointments/${deleteAppRowNumber}`, {
                method: 'DELETE',
            });
            setAppointments(appointments.filter(appointment => appointment.rowNumber !== deleteAppRowNumber));
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    return (
        <div>
            <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                <div className="container-fluid py-5">
                    <AppTable appointments={appointments} deleteApp={deleteApp} />
                    <Button variant="primary" onClick={() => setShowAppForm(!showAppForm)}>
                        {showAppForm ? 'Close New Appointment Form' : 'Open New Appointment Form'}
                    </Button>
                    {showAppForm && <NewAppForm addApp={addAppointment} />}
                </div>
            </div>
        </div>
    );
};

export default Home;
