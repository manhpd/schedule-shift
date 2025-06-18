import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './schedule.css';
import ScheduleSetter from './schedule-setter/schedule-setter';

interface Employee {
  id: number;
  name: string;
  avatar: string;
  position: string;
}

interface Shift {
  id: number;
  employeeId: number;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'morning' | 'afternoon' | 'night' | 'off';
  status: 'confirmed' | 'pending' | 'rejected';
  position: string;
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    position: "Senior Developer"
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=5",
    position: "Project Manager"
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    position: "UI/UX Designer"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    avatar: "https://i.pravatar.cc/150?img=4",
    position: "Backend Developer"
  },
  {
    id: 5,
    name: "David Brown",
    avatar: "https://i.pravatar.cc/150?img=6",
    position: "QA Engineer"
  }
];

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

const getInitials = (text: string): string => {
  return text
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

const generateMockShifts = (startDate: Date): Shift[] => {
  const shifts: Shift[] = [];
  const shiftTypes: ('morning' | 'afternoon' | 'night' | 'off')[] = ['morning', 'afternoon', 'night', 'off'];
  const statuses: ('confirmed' | 'pending' | 'rejected')[] = ['confirmed', 'pending', 'rejected'];

  mockEmployees.forEach(employee => {
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      const numShifts = Math.floor(Math.random() * 3) + 1;
      
      for (let j = 0; j < numShifts; j++) {
        const type = shiftTypes[Math.floor(Math.random() * shiftTypes.length)];
        let startTime, endTime;

        switch(type) {
          case 'morning':
            startTime = '08:00';
            endTime = '16:00';
            break;
          case 'afternoon':
            startTime = '16:00';
            endTime = '24:00';
            break;
          case 'night':
            startTime = '00:00';
            endTime = '08:00';
            break;
          default:
            startTime = '00:00';
            endTime = '00:00';
        }

        shifts.push({
          id: Math.random(),
          employeeId: employee.id,
          date: date,
          startTime,
          endTime,
          type,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          position: employee.position
        });
      }
    }
  });

  return shifts;
};

const Schedule: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{employeeId: number, date: Date} | null>(null);

  useEffect(() => {
    if (startDate) {
      setShifts(generateMockShifts(startDate));
    }
  }, [startDate]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start] = dates;
    if (start) {
      setStartDate(start);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      setEndDate(end);
    }
  };

  const filterMondays = (date: Date) => {
    return date.getDay() === 1;
  };

  const getWeekDays = () => {
    if (!startDate) return [];
    const days = [];
    const currentDate = new Date(startDate);
    for (let i = 0; i < 7; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getShiftsForEmployee = (employeeId: number, date: Date) => {
    return shifts.filter(shift => 
      shift.employeeId === employeeId && 
      shift.date.toDateString() === date.toDateString()
    );
  };

  const getShiftClass = (shift: Shift) => {
    return `shift-item ${shift.status}`;
  };

  const handleAddShift = (employeeId: number, date: Date) => {
    setSelectedCell({ employeeId, date });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCell(null);
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h1>Schedule</h1>
        <div className="week-picker">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Monday"
            className="date-picker-input"
            filterDate={filterMondays}
            minDate={new Date()}
          />
        </div>
      </div>
      <div className="schedule-content">
        <h2 className='text-gray-500'>{startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}</h2>
        <div className="schedule-table">
          <table>
            <thead>
              <tr>
                <th className="employee-column">Employee</th>
                {getWeekDays().map((date, index) => (
                  <th key={index}>{formatDate(date)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="employee-cell">
                    <div className="employee-info">
                      <img src={employee.avatar} alt={employee.name} className="employee-avatar" />
                      <div className="employee-details">
                        <span className="employee-name">{employee.name}</span>
                        <span className="employee-position">{employee.position}</span>
                      </div>
                    </div>
                  </td>
                  {getWeekDays().map((date, index) => {
                    const dayShifts = getShiftsForEmployee(employee.id, date);
                    return (
                      <td key={index} className="schedule-cell">
                        {dayShifts.length > 0 ? (
                          <div className="shifts-container">
                            {dayShifts.map(shift => (
                              <div key={shift.id} className={getShiftClass(shift)}>
                                <div className="shift-time">
                                  {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                                </div>
                                <div className="shift-position" title={shift.position}>
                                  {getInitials(shift.position)}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="no-shifts">No shifts</div>
                        )}
                        <button 
                          className="add-shift-button"
                          onClick={() => handleAddShift(employee.id, date)}
                          title="Add shift"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedCell && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Shift</h3>
              <button className="close-button" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <ScheduleSetter 
                employeeId={selectedCell.employeeId}
                date={selectedCell.date}
                onClose={handleCloseModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule; 