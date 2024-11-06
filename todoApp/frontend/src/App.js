import React from 'react';
import Account from './components/Account/Register.js';
import Tasks from './components/Tasks/TaskForm.js';
import Notifications from './components/Notifications/NotificationSettings.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the React App</h1>
      </header>
      <main>
        <Account />
        <Tasks />
        <Notifications />
      </main>
      <footer>
        <p>&copy; 2023 React App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
