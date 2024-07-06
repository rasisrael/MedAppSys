import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';

interface NewAppFormProps {
    addApp: (description: string, assigned: string, date: string, time: string, patient: string) => void;
}

const NewAppForm: React.FC<NewAppFormProps> = ({ addApp }) => {
    const [description, setDescription] = useState('');
    const [assigned, setAssigned] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);
    const [patient, setPatient] = useState(''); // New state

    const submitApp = () => {
        if (description !== '' && assigned !== '' && date !== null && time !== null && patient !== '') {
            const formattedDate = date.toISOString().split('T')[0];
            const formattedTime = time.toTimeString().split(' ')[0];
            addApp(description, assigned, formattedDate, formattedTime, patient);
            setDescription('');
            setAssigned('');
            setDate(null);
            setTime(null);
            setPatient('');
        }
    };

    return (
        <Form className="mt-5">
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group controlId="formProvider">
                        <Form.Label>Doctor</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            onChange={(e) => setAssigned(e.target.value)}
                            value={assigned}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <DatePicker
   selected={date}
   onChange={(date: Date | null) => setDate(date)}
   dateFormat="yyyy-MM-dd"
   className="form-control"
   placeholderText="Select date"
   wrapperClassName="date-picker-wrapper"
   minDate={new Date()}
/>
                        </div>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formTime">
                        <Form.Label>Time</Form.Label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <DatePicker
   selected={time}
   onChange={(time: Date | null) => setTime(time)}
   showTimeSelect
   showTimeSelectOnly
   timeIntervals={15}
   timeCaption="Time"
   dateFormat="HH:mm"
   className="form-control"
   placeholderText="Select time"
/>
                        </div>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formPatient">
                        <Form.Label>Patient</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            onChange={(e) => setPatient(e.target.value)}
                            value={patient}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
            </Form.Group>
            <Button variant="primary" className="mt-3" onClick={submitApp}>
                New Appointment
            </Button>
        </Form>
    );
};

export default NewAppForm;
