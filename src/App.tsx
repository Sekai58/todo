import './App.css';
import Navbar from './components/Navbar';
import Todo from './components/Todo/index';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Todo />
    </div>
  );
}

export default App;
