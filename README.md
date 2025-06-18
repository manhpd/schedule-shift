# Employee Schedule Management System

A React TypeScript application for managing employee schedules with a modern and intuitive interface. The system allows managers to view and manage employee shifts in a weekly calendar format.

## Features

- Weekly schedule view with date range selection
- Employee shift management with visual indicators
- Add new shifts with detailed information
- Color-coded shift status (confirmed, pending, rejected)
- Position-based shift assignment
- Responsive design with modern UI

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Project Structure

```
src/
├── pages/
│   └── schedule/
│       ├── schedule.tsx         # Main schedule component
│       ├── schedule.css         # Schedule styles
│       └── schedule-setter/     # Shift creation component
│           ├── schedule-setter.tsx
│           └── schedule-setter.css
```

## Technologies Used

- React
- TypeScript
- React DatePicker
- React TimePicker
- CSS3 with Flexbox

## Development

The project uses Create React App with TypeScript template. To start development:

1. Make sure all dependencies are installed
2. Run `npm start` for development server
3. Run `npm test` for running tests
4. Run `npm run build` for production build

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
