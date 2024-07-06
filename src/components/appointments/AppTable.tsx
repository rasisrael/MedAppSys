import AppRowItem from './AppRowItem';
import Table from 'react-bootstrap/Table';
import { AppModel } from '../../models/AppModel';
import React from 'react';

interface AppTableProps {
    appointments: AppModel[];
    deleteApp: (rowNumber: number) => void;
}

const AppTable: React.FC<AppTableProps> = ({ appointments, deleteApp }) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th scope="col">Appointment number:</th>
                <th scope="col">Description</th>
                <th scope="col">Doctor</th>
                <th scope="col">Patient</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
            </tr>
            </thead>
            <tbody>
            {appointments.map(appointment => (
                <AppRowItem
                    key={appointment.rowNumber}
                    appointment={appointment}
                    deleteApp={deleteApp}
                />
            ))}
            </tbody>
        </Table>
    );
};

export default AppTable;
