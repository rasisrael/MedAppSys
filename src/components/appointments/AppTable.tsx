import AppRowItem from './AppRowItem';
import Table from 'react-bootstrap/Table';
import { AppModel } from '../../models/AppModel';
import React from 'react';
interface AppTableProps {
 appointments: AppModel[];
 deleteApp: (id: number) => void;
 updateApp: (id: number, updatedApp: Partial<AppModel>) => void;
}
const AppTable: React.FC<AppTableProps> = ({ appointments, deleteApp, updateApp }) => {
 return (
<Table striped bordered hover>
<thead>
<tr>
<th scope="col">Appointment ID:</th>
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
           key={appointment.id}
           appointment={appointment}
           deleteApp={deleteApp}
           updateApp={updateApp}
         />
       ))}
</tbody>
</Table>
 );
};
export default AppTable;
