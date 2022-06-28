import { async } from '@firebase/util';
import React, { useState } from 'react';
import CourseService from '../Firebase/firebaseServicve'

const AddCourse = () => {
    const [formData, setFormData] = useState({
        title: null,
        instructor: null,
        status: null,
    });
    const [message, setMessage] = useState({
        error: false,
        body: '',
    })
    console.log(formData);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData?.title === null || formData?.instructor === null || formData?.status === null) {
            // alert('All form required.');
            setMessage({
                error: true,
                body: 'All fields are required.'
            })
        }
        else {
            try {
                CourseService.addCourse(formData)
                setMessage({
                    error: false,
                    body: 'Course added successfully.'
                })
            }
            catch (error) {

            }
        }
    }
    return (
        <div className='mt-5'>
            <form onSubmit={handleSubmit} className='mx-auto w-2/3 p-5 shadow-md rounded-md'>
                <div>
                    {
                        message.error ?
                            <div className='bg-amber-50 py-1.5'>
                                <h3 className="text-center font-medium text-sm text-red-500">{message.body}</h3>
                            </div>
                            :
                            <div className='bg-green-50 py-1.5'>
                                <h3 className=" text-center font-medium text-sm text-green-500">{message.body}</h3>
                            </div>
                    }
                </div>
                <div className='mt-3'>
                    <label className='text-gray-600 text-sm font-medium' htmlFor="title">Add Course Title :</label>
                    <br />
                    <input
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        defaultValue={formData?.title}
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
                        defaultValue={formData?.instructor}
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
                <button className='btn btn-primary focus:ring-4 ring-cyan-500 ring-offset-1 mt-5' type='submit'>Add Course</button>
            </form>
        </div>
    );
};

export default AddCourse;