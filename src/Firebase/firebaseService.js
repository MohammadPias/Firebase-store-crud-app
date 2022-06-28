import { db } from "./firebase.config";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc
} from "firebase/firestore";


const courseCollection = collection(db, 'courses');

class CourseService {

    addCourse = (newCourse) => {
        return addDoc(courseCollection, newCourse)
    };

    updateCourse = (id, updateCourse) => {
        const courseDoc = doc(db, 'courses', id)
        return updateDoc(courseDoc, updateCourse)
    };
    deleteCourse = (id) => {
        const courseDoc = doc(db, 'courses', id)
        return deleteDoc(courseDoc)
    };
    getAllCourses = () => {
        return getDocs(courseCollection)
    };
    getCourse = (id) => {
        const courseDoc = doc(db, 'courses')
        return getDoc(courseDoc)
    }
}

export default new CourseService();