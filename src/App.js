import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddToDoItem from "./Components/AddToDoItem";
import ToDoViewer from "./Components/ToDoViewer";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact key='/' path={'/'} element={<AddToDoItem/>} />
        <Route exact key='/todoviewer' path={'/todoviewer'} element={<ToDoViewer/>} />
      </Routes>
    </Router>
  );
}

export default App;
