import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import './App.css'
import LoginSignup from './pages/PatientLogin'
import Dashboard from './pages/PatientDashboard'
import AdminLogin from './pages/AdminLogins'
import AddHospital from './pages/ministry_pages/AddHospital.tsx'
import AddDoctor from './pages/ministry_pages/AddDoctor.tsx'
import LabManage from './pages/lab_tech_pages/LabManage'
import AssignedHospital from './pages/doctor_pages/AssignedHospital'
import RoomAllocation from './pages/doctor_pages/RoomAllocation'
import PatientAppointment from './pages/doctor_pages/PatientAppointment'
import DocDashboard from './pages/doctor_pages/DocDashboard'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginSignup />} ></Route>
        <Route path='/dashboard' element={<Dashboard />} ></Route>
        <Route path='/admin-login' element={<AdminLogin />} />

        {/* Ministry Routes */}
        <Route path='/add-hospital' element={<AddHospital />} />
        <Route path='/add-doctor' element={<AddDoctor />} />

        {/* Lab Tech Routes */}
        <Route path='/lab-manage' element={<LabManage />} />

        {/* Doctor Routes */}
        <Route path='/doc-dashboard' element={<DocDashboard />} />
        <Route path='/asigned-hos' element={<AssignedHospital />} />
        <Route path='/room-allocation' element={<RoomAllocation />} />
        <Route path='/patient-appointment' element={<PatientAppointment />} />

      </Routes>
    </Router>
  )
}

export default App
