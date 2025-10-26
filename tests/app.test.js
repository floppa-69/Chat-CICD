import { render } from '@testing-library/react';
import App from './App';
import { UserProvider } from './context/UserContext';

test('App renders without crashing', () => {
  render(
    <UserProvider>
      <App />
    </UserProvider>
  );
});
