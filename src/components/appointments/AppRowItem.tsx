import React from 'react';
import { AppModel } from '../../models/AppModel';
import {Button} from "react-bootstrap";

interface AppRowItemProps {
    appointment: AppModel;
    deleteApp: (rowNumber: number) => void;
}

const AppRowItem: React.FC<AppRowItemProps> = ({ appointment, deleteApp }) => {
    const { rowNumber, rowDescription, rowDoctor, rowDate, rowTime, rowPatient } = appointment; // Include the new field
    const date = new Date(rowDate);

    return (
        <tr>
            <th scope="row">{rowNumber}</th>
            <td>{rowDescription}</td>
            <td>{rowDoctor}</td>
            <td>{rowPatient}</td>
            <td>{date.toLocaleDateString()}</td>
            <td>{rowTime}</td>
            <td>
                <Button variant="danger" onClick={() => deleteApp(rowNumber)}>Delete</Button>
            </td>
        </tr>
    );
};

export default AppRowItem;
