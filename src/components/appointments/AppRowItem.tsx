import React from 'react';
import { AppModel } from '../../models/AppModel';

interface AppRowItemProps {
    appointment: AppModel;
    deleteApp: (id: number) => void;
}

const AppRowItem: React.FC<AppRowItemProps> = ({ appointment, deleteApp }) => {
    const handleDelete = () => {
        console.log('Attempting to delete appointment with id:', appointment.id);
        deleteApp(appointment.id);
    };

    return (
        <tr>
            <td>{appointment.id}</td>
            <td>{appointment.rowDescription}</td>
            <td>{appointment.rowDoctor}</td>
            <td>{appointment.rowPatient}</td>
            <td>{appointment.rowDate}</td>
            <td>{appointment.rowTime}</td>
            <td>
                <button onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );
};

export default AppRowItem;
