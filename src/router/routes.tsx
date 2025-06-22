import { FC } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
  Navigate
} from 'react-router-dom'
import ManegePage from '../pages/ManegePage/ManegePage'
import AuthPage from '../pages/AuthPages/AuthPage/AuthPage'
import SignUpPage from '../pages/AuthPages/SignUpPage/SignUpPage'
import SignInPage from '../pages/AuthPages/SignInPage/SignInPage'
import GradesPage from '../pages/GradesPages/GradesPage/GradesPage'
import TeachersPage from '../pages/TeachersPages/TeachersPage/TeachersPage'
import SubjectsPage from '../pages/SubjectsPages/SubjectsPage/SubjectsPage'
import StudentsPage from '../pages/StudentsPages/StudentsPage/StudentsPage'
import AllGradesPage from '../pages/GradesPages/AllGradesPage/AllGradesPage'
import OneGradePage from '../pages/GradesPages/OneGradePage/OneGradePage'
import AddGradePage from '../pages/GradesPages/AddGradePage/AddGradePage'
import AllStudentsPage from '../pages/StudentsPages/AllStudentsPage/AllStudentsPage'
import AddStudentPage from '../pages/StudentsPages/AddStudentPage/AddStudentPage'
import OneStudentPage from '../pages/StudentsPages/OneStudentPage/OneStudentPage'
import AllSubjectsPage from '../pages/SubjectsPages/AllSubjectsPage/AllSubjectsPage'
import AddSubjectPage from '../pages/SubjectsPages/AddSubjectPage/AddSubjectPage'
import OneSubjectPage from '../pages/SubjectsPages/OneSubjectPage/OneSubjectPage'
import AllTeachersPage from '../pages/TeachersPages/AllTeachersPage/AllTeachersPage'
import AddTeacherPage from '../pages/TeachersPages/AddTeacherPage/AddTeacherPage'
import OneTeacherPage from '../pages/TeachersPages/OneTeacherPage/OneTeacherPage'

interface RoutesProps {
  isAuthenticated: boolean
}

const getRoutes = (isAuthenticated: boolean): RouteObject[] => {
  if (isAuthenticated) {
    return [
      {
        path: '/',
        element: <ManegePage />
      },
      {
        path: '/Grades',
        element: <GradesPage />
      },
      {
        path: '/Grades/all-grades',
        element: <AllGradesPage />
      },
      {
        path: '/Grades/add-grade',
        element: <AddGradePage />
      },
      {
        path: '/Grades/one-grade/:gradeId',
        element: <OneGradePage />
      },
      {
        path: '/Students',
        element: <StudentsPage />
      },
      {
        path: '/Students/all-students',
        element: <AllStudentsPage />
      },
      {
        path: '/Students/add-student',
        element: <AddStudentPage />
      },
      {
        path: '/Students/one-student/:studentId',
        element: <OneStudentPage />
      },
      {
        path: '/Subjects',
        element: <SubjectsPage />
      },
      {
        path: '/Subjects/all-subjects',
        element: <AllSubjectsPage />
      },
      {
        path: '/Subjects/add-subject',
        element: <AddSubjectPage />
      },
      {
        path: '/Subjects/one-subject/:subjectId',
        element: <OneSubjectPage />
      },
      {
        path: '/Teachers',
        element: <TeachersPage />
      },
      {
        path: '/Teachers/all-teachers',
        element: <AllTeachersPage />
      },
      {
        path: '/Teachers/add-teacher',
        element: <AddTeacherPage />
      },
      {
        path: '/Teachers/one-teacher/:teacherId',
        element: <OneTeacherPage />
      },
      {
        path: '*',
        element: <Navigate replace to='/' />
      }
    ]
  } else {
    return [
      {
        path: '/',
        element: <AuthPage />
      },
      {
        path: '/Sign-up',
        element: <SignUpPage />
      },
      {
        path: '/Sign-in',
        element: <SignInPage />
      },
      {
        path: '*',
        element: <Navigate replace to='/' />
      }
    ]
  }
}

const RoutesComponent: FC<RoutesProps> = ({ isAuthenticated }) => {
  const router = createBrowserRouter(getRoutes(isAuthenticated))

  return <RouterProvider router={router} />
}

export default RoutesComponent
