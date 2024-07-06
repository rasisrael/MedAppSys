import React, { useState } from 'react';
import { AppModel } from '../../models/AppModel';
import { Button, Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
interface AppRowItemProps {
 appointment: AppModel;
 deleteApp: (id: number) => void;//changed
 updateApp: (id: number, updatedApp: Partial<AppModel>) => void;
}
const AppRowItem: React.FC<AppRowItemProps> = ({ appointment, deleteApp, updateApp }) => {
    const { id, rowDescription, rowDoctor, rowDate, rowTime, rowPatient } = appointment;
    // Validate date and time
    const isValidDate = (d: Date) => !isNaN(d.getTime());
    const date = isValidDate(new Date(rowDate)) ? new Date(rowDate) : new Date();
    const time = isValidDate(new Date(`1970-01-01T${rowTime}:00`)) ? new Date(`1970-01-01T${rowTime}:00`) : new Date();
    const [show, setShow] = useState(false);
    const [description, setDescription] = useState(rowDescription);
    const [doctor, setDoctor] = useState(rowDoctor);
    const [datePicker, setDatePicker] = useState<Date | null>(date);
    const [timePicker, setTimePicker] = useState<Date | null>(time);
    const [patient, setPatient] = useState(rowPatient);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log('Opening modal for appointment:', id);
        setShow(true);
    };
    const handleSave = () => {
        console.log('Saving changes for appointment:', id);
        if (description && doctor && datePicker && timePicker && patient) {
            const formattedDate = datePicker.toISOString().split('T')[0];
            const formattedTime = timePicker.toTimeString().split(' ')[0];
            updateApp(id, {
                rowDescription: description,
                rowDoctor: doctor,
                rowDate: formattedDate,
                rowTime: formattedTime,
                rowPatient: patient,
            });
            handleClose();
        }
    };
    return (
 <>
 <tr>
 <th scope="row">{id}</th>
 <td>{rowDescription}</td>
 <td>{rowDoctor}</td>
 <td>{rowPatient}</td>
 <td>{date.toLocaleDateString()}</td>
 <td>{rowTime}</td>
 <td>
 <Button variant="danger" onClick={() => deleteApp(id)}>Delete</Button>
 <Button variant="primary" onClick={handleShow}>Edit</Button>
 </td>
 </tr>
 <Modal show={show} onHide={handleClose}>
 <Modal.Header closeButton>
 <Modal.Title>Edit Appointment</Modal.Title>
 </Modal.Header>
 <Modal.Body>
 <Form>
 <Form.Group controlId="formDescription">
 <Form.Label>Description</Form.Label>
 <Form.Control
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
 </Form.Group>
 <Form.Group controlId="formDoctor">
 <Form.Label>Doctor</Form.Label>
 <Form.Control
                                type="text"
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                            />
 </Form.Group>
 <Form.Group controlId="formDate">
 <Form.Label>Date</Form.Label>
 <DatePicker
                                selected={datePicker}
                                onChange={(date: Date | null) => setDatePicker(date)}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                            />
 </Form.Group>
 <Form.Group controlId="formTime">
 <Form.Label>Time</Form.Label>
 <DatePicker
                                selected={timePicker}
                                onChange={(time: Date | null) => setTimePicker(time)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                dateFormat="HH:mm"
                                className="form-control"
                            />
 </Form.Group>
 <Form.Group controlId="formPatient">
 <Form.Label>Patient</Form.Label>
 <Form.Control
                                type="text"
                                value={patient}
                                onChange={(e) => setPatient(e.target.value)}
                            />
 </Form.Group>
 </Form>
 </Modal.Body>
 <Modal.Footer>
 <Button variant="secondary" onClick={handleClose}>Close</Button>
 <Button variant="primary" onClick={handleSave}>Save changes</Button>
 </Modal.Footer>
 </Modal>
 </>
    );
 };
export default AppRowItem;
