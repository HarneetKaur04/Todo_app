import './App.css';
import TodosContainer from './components/TodosContainer';

function App() {
  return (
    <div className="container">
    <div className="header">
      <h1>Todo List</h1>
    </div>
    <TodosContainer />
  </div>
  );
}

export default App;
