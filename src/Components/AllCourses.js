import React, { useEffect, useState } from 'react';
import CourseService from '../Firebase/firebaseService'

const AllCourses = ({ courses, setCourses, formData, setFormData, setId }) => {

    const fetchCourses = async () => {
        const allCourses = await CourseService.getAllCourses();
        setCourses(allCourses?.docs?.map(item => ({ ...item.data(), id: item.id })))
    };
    useEffect(() => {
        fetchCourses();
    }, [])

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure you want to delete?');
        if (proceed) {
            CourseService.deleteCourse(id)
            fetchCourses();
        }

    };
    const handleEdit = async (id) => {
        const currCourse = await CourseService.getCourse(id);
        const course = currCourse.data()
        setId(id)
        if (course) {
            setFormData({
                title: course?.title,
                instructor: course?.instructor,
                status: course?.status,
            })
        }
    }
    return (
        <div>
            {
                courses?.length !== 0 &&
                [...courses]?.reverse()?.map((item, index) =>
                    <div
                        key={index}
                        className='p-5 rounded-md shadow-md mt-5'
                    >
                        <div className='grid grid-cols-4 gap-3'>
                            {/* <h3 className='text-sm font-medium text-gray-500'>{index + 1}. </h3> */}
                            <h3 className='text-sm font-medium text-gray-500'>Title : <span className='font-bold'>{item?.title}</span></h3>
                            <h3 className='text-sm font-medium text-gray-500'>Instructor : <span className='font-bold'>{item?.instructor}</span></h3>
                            <h3 className='text-sm font-medium text-gray-500'>Status : <span className='font-bold'>{item?.status}</span></h3>
                            <div className=''>
                                <button onClick={() => handleEdit(item?.id)} className='btn btn-edit mr-5 px-3 py-1 rounded-full text-sm'>Edit</button>
                                <button onClick={() => handleDelete(item?.id)} className='btn btn-delete px-3 py-1 rounded-full text-sm'>Delete</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default AllCourses;