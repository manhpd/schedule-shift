import React from 'react';

import './shift.css';

export interface Shift {
    id: number;
    employeeId: number;
    date: Date;
    startTime: string;
    endTime: string;
    type: 'morning' | 'afternoon' | 'night' | 'off';
    status: 'confirmed' | 'pending' | 'rejected';
    position: string;
  }
  

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

const getShiftClass = (shift: Shift) => {
    return `shift-item ${shift.status}`;
};

const getInitials = (text: string): string => {
    return text
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
};

const ShiftComponent: React.FC<Shift> = (props) => {
    const shift = props;
    return (
        <div className="shifts-container">
                <div key={shift.id} className={getShiftClass(shift)}>
                <div className="shift-time">
                    {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                </div>
                <div className="shift-position" title={shift.position}>
                    {getInitials(shift.position)}
                </div>
                </div>
        </div>
  );
};

export default ShiftComponent;