/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import AppNagivator from "./components/AppNagivator";
import { LoginProvider } from "./components/LoginContext";




function App() {

  console.log('hiiiiiiiiii');

  return (
    <LoginProvider>
     <AppNagivator/>
     </LoginProvider>
      
    
  );
}
export default App;
