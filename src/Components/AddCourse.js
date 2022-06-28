import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import CourseService from '../Firebase/firebaseService'

const AddCourse = ({ courses, setCourses, formData, setFormData, id }) => {

    const [message, setMessage] = useState({
        error: false,
        body: '',
    })

    const fetchCourses = async () => {
        const allCourses = await CourseService.getAllCourses();
        setCourses(allCourses?.docs?.map(item => ({ ...item.data(), id: item.id })))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData?.title === '' || formData?.instructor === '' || formData?.status === '') {
            // alert('All form required.');
            setMessage({
                error: true,
                body: 'All fields are required.'
            })
            fetchCourses();
        }
        else {
            try {
                if (id) {
                    CourseService.updateCourse(id, formData);
                    setMessage({
                        error: false,
                        body: 'Course updated successfully.'
                    })
                }
                else {
                    CourseService.addCourse(formData)
                    setMessage({
                        error: false,
                        body: 'Course added successfully.'
                    })
                    fetchCourses()
                    setFormData({
                        title: '',
                        instructor: '',
                        status: '',
                    })
                }
            }
            catch (error) {

            }
        }
    }
    console.log(id)
    return (
        <div className='mt-5'>
            <form onSubmit={handleSubmit} className='mx-auto w-2/3 p-5 shadow-md rounded-md'>
                <div>
                    {
                        message.body !== '' &&
                        <div className={message.error ? 'bg-amber-50 py-2' : 'bg-green-50 py-2'}>
                            <h3 className={`text-center font-medium text-sm ${message.error ? 'text-red-500' : 'text-green-500'}`}>{message.body}</h3>
                        </div>
                    }
                </div>
                <div className='mt-3'>
                    <label className='text-gray-600 text-sm font-medium' htmlFor="title">Add Course Title :</label>
                    <br />
                    <input
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        value={formData?.title}
                        className='w-full py-1 focus:outline-8 outline-offset-2 outline-cyan-200 rounded-sm px-5 text-gray-500'
                        type="text"
                        id='title'
                        name='title' />
                </div>
                <div className='mt-3'>
                    <label className='text-gray-600 text-sm font-medium' htmlFor="instructor">Instructor :</label>
                    <br />
                    <input
                        onChange={e => setFormData({ ...formData, instructor: e.target.value })}
                        value={formData?.instructor}
                        className='w-full py-1 focus:outline-8 outline-offset-2 outline-cyan-200 rounded-sm px-5 text-gray-500'
                        type="text"
                        id='instructor'
                        name='instructor' />
                </div>
                <div className='mt-3'>
                    <label className='text-gray-600 text-sm font-medium' htmlFor="available">Available : </label>
                    <input
                        checked={formData?.status === 'available' && 'checked'}
                        onChange={e => setFormData({ ...formData, status: e.target.name })}
                        type="radio"
                        name="available"
                        id="available"
                        className='mr-3' />
                    <label className='text-gray-600 text-sm font-medium' htmlFor="unavailable">Unavailable : </label>
                    <input
                        checked={formData?.status === 'unavailable' && 'checked'}
                        onChange={e => setFormData({ ...formData, status: e.target.name })}
                        type="radio"
                        name="unavailable"
                        id="unavailable" />
                </div>
                <button className='btn btn-primary focus:ring-4 ring-cyan-500 ring-offset-1 mt-5' type='submit'>{id !== null ? 'Update Course' : 'Add Course'}</button>
            </form>
        </div>
    );
};

export default AddCourse;