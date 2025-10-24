import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import { UserProvider, useUser } from "./context/UserContext";

function AppContent() {
  const { user } = useUser();
  return (
    <div className="App">
      <NavBar/>
      {user ? <ChatBox/> : <Welcome/>}
    </div>
  );
}
function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
export default App;