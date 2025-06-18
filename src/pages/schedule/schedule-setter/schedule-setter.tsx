import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import './schedule-setter.css';

interface ScheduleSetterProps {
  employeeId: number;
  date: Date;
  onClose: () => void;
}

interface ShiftForm {
  startTime: string;
  endTime: string;
  position: string;
  status: 'confirmed' | 'pending' | 'rejected';
}

const positions = [
  'Cashier',
  'Sales Associate',
  'Store Manager',
  'Inventory Specialist',
  'Customer Service Representative'
];

const ScheduleSetter: React.FC<ScheduleSetterProps> = ({ employeeId, date, onClose }) => {
  const [form, setForm] = useState<ShiftForm>({
    startTime: '09:00',
    endTime: '17:00',
    position: positions[0],
    status: 'pending'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call to save shift
    console.log('New shift:', {
      employeeId,
      date,
      ...form
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="schedule-setter-form">
      <div className="form-group">
        <label>Date</label>
        <DatePicker
          selected={date}
          onChange={() => {}}
          dateFormat="dd/MM/yyyy"
          disabled
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Start Time</label>
        <TimePicker
          onChange={(time: string | null) => setForm(prev => ({ ...prev, startTime: time || '09:00' }))}
          value={form.startTime}
          disableClock
          format="HH:mm"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>End Time</label>
        <TimePicker
          onChange={(time: string | null) => setForm(prev => ({ ...prev, endTime: time || '17:00' }))}
          value={form.endTime}
          disableClock
          format="HH:mm"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Position</label>
        <select
          value={form.position}
          onChange={(e) => setForm(prev => ({ ...prev, position: e.target.value }))}
          className="form-control"
        >
          {positions.map(position => (
            <option key={position} value={position}>{position}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value as ShiftForm['status'] }))}
          className="form-control"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Add Shift
        </button>
      </div>
    </form>
  );
};

export default ScheduleSetter;