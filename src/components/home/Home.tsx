import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AppTable from '../appointments/AppTable';
import NewAppForm from '../appointments/NewAppForm';
import { AppModel } from '../../models/AppModel';
import './home.css';
import NotificationList from '../Notification';

interface HomeProps {
    showAppForm: boolean;
    setShowAppForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({ showAppForm, setShowAppForm }) => {
    const [appointments, setAppointments] = useState<AppModel[]>([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/appointments', {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: AppModel[] = await response.json();
            setAppointments(data);
            // notifyUser("Fetched all appointments successfully");
        } catch (error) {
            console.error('Error fetching appointments:', error);
            // notifyUser("Error fetching appointments");
        }
    };

    const addAppointment = async (description: string, doctor: string, date: string, time: string, patient: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/appointments', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
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
            setAppointments((appointments) => [...appointments, newAppointment]);
            // notifyUser("Appointment added successfully");
        } catch (error) {
            console.error('Error adding appointment:', error);
            // notifyUser("error adding appointment");
        }
    };

    const deleteApp = async (deleteAppRowId: number) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:3000/appointments/${deleteAppRowId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAppointments(appointments.filter((appointment) => appointment.id !== deleteAppRowId));
            // notifyUser("Appointment Deleted successfully")
        } catch (error) {
            console.error('Error deleting appointment:', error);
            // notifyUser("Error Deleting...")
        }
    };

    const updateApp = async (id: number, updatedApp: Partial<AppModel>) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/appointments/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedApp),
            });
            const updatedAppointment: AppModel = await response.json();
            setAppointments(appointments.map((app) => (app.id === id ? updatedAppointment : app)));
            // notifyUser("Appointment  updated successfully")
        } catch (error) {
            console.error('Error updating appointment:', error);
            // notifyUser("Appointment  could not be updated")
        }
    };

    return (
        <div>
            <NotificationList />
            <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                <div className="container-fluid py-5">
                    <AppTable appointments={appointments} deleteApp={deleteApp} updateApp={updateApp} />
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
