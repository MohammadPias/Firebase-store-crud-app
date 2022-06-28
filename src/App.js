import './App.css';
import AddCourse from './Components/AddCourse';

function App() {
  return (
    <div className='w-1/2 mx-auto'>
      <h1 className='text-center text-2xl font-bold text-gray-600'>Add Your Course</h1>
      <div>
        <AddCourse />
      </div>
    </div>
  );
}

export default App;
