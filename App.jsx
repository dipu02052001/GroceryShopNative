import AppNagivator from './components/AppNagivator';
import {LoginProvider} from './components/LoginContext';
import { Provider } from 'react-native-paper';

function App() {
  return (
    <Provider>
      <LoginProvider>
        <AppNagivator />
      </LoginProvider>
    </Provider>
  );
}

export default App;
