import { useState } from 'react';
import './App.css';
import AddCourse from './Components/AddCourse';
import AllCourses from './Components/AllCourses';

function App() {
  const [courses, setCourses] = useState([]);
  return (
    <div className='w-1/2 mx-auto'>
      <h1 className='text-center text-2xl font-bold text-gray-600'>Add Your Course</h1>
      <div>
        <AddCourse courses={courses} setCourses={setCourses} />
      </div>
      <div className='mt-8'>
        <AllCourses courses={courses} setCourses={setCourses} />
      </div>
    </div>
  );
}

export default App;
