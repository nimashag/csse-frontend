import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import './App.css'
import LoginSignup from './pages/PatientLogin'
import Dashboard from './pages/PatientDashboard'
import AdminLogin from './pages/AdminLogins'
import ManageHospitals from "./pages/ministry_pages/hospitals/ManageHospitals.tsx";
import AddHospital from './pages/ministry_pages/hospitals/AddHospital.tsx'
import UpdateHospital from './pages/ministry_pages/hospitals/UpdateHospital.tsx'
import ManageDoctors from "./pages/ministry_pages/doctors/ManageDoctors.tsx";
import AddDoctor from './pages/ministry_pages/doctors/AddDoctor.tsx'
import UpdateDoctor from './pages/ministry_pages/doctors/UpdateDoctor.tsx';
import LabManage from './pages/lab_tech_pages/LabManage'
import AssignedHospital from './pages/doctor_pages/AssignedHospital'
import RoomAllocation from './pages/doctor_pages/RoomAllocation'
import PatientAppointment from './pages/doctor_pages/PatientAppointment'
import DocDashboard from './pages/doctor_pages/DocDashboard'
import HMDashboard from './pages/healthcare_manager_pages/HMDashboard.tsx'
import AllWard from './pages/healthcare_manager_pages/AllWard.tsx'
import AllLabTech from './pages/healthcare_manager_pages/AllLabTech.tsx'
import AllReceptionist from './pages/healthcare_manager_pages/AllReceptionist.tsx'
import AllWardRooms from './pages/healthcare_manager_pages/AllWardRooms.tsx'
import AllLabRooms from './pages/healthcare_manager_pages/AllLabRooms.tsx'
import ManageOperations from './pages/healthcare_manager_pages/ManageOperations.tsx'
import WHDashboard from './pages/wardhead_pages/WHDashboard.tsx'
import WHManagePatients from './pages/wardhead_pages/WHManagePatients.tsx'
import RecepDashboard from './pages/receptionist_pages/RecepDashboard.tsx'
import LabTechDashboard from './components/labs/LabTechDashboard.tsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginSignup />} ></Route>
        <Route path='/dashboard' element={<Dashboard />} ></Route>
        <Route path='/admin-login' element={<AdminLogin />} />

        {/* Ministry Routes - hospitals */}
        <Route path='/manage-hospitals' element={<ManageHospitals />} />
        <Route path='/add-hospital' element={<AddHospital />} />
        <Route path="/update-hospital/:id" element={<UpdateHospital />} />
        {/* Ministry Routes - doctors */}
        <Route path='/manage-doctors' element={<ManageDoctors />} />
        <Route path='/add-doctor' element={<AddDoctor />} />
        <Route path="/update-doctor/:id" element={<UpdateDoctor />} />

        {/* Lab Tech Routes */}
        <Route path='/lab-manage' element={<LabManage />} />

        {/* Doctor Routes */}
        <Route path='/doc-dashboard' element={<DocDashboard />} />
        <Route path='/asigned-hos' element={<AssignedHospital />} />
        <Route path='/room-allocation' element={<RoomAllocation />} />
        <Route path='/patient-appointment' element={<PatientAppointment />} />

        {/* Healthcare Manager Routes */}
        <Route path='/hcm-dashboard' element={<HMDashboard />} />
        <Route path='/all-wardinfo' element={<AllWard />} />
        <Route path='/add-labinfo' element={<AllLabTech />} />
        <Route path='/all-receptionistinfo' element={<AllReceptionist />} />
        <Route path='/all-wardroomsinfo' element={<AllWardRooms />} />
        <Route path='/all-labroomsinfo' element={<AllLabRooms />} />
        <Route path='/all-operations' element={<ManageOperations />} />

        {/* Ward Head Routes */}
        <Route path='/wh-dashboard' element={<WHDashboard />} />
        <Route path='/wh-mpatients' element={<WHManagePatients/>} />

        {/* Ward Head Routes */}
        
        <Route path='/recep-dashboard' element={<RecepDashboard />} />
        <Route path='/lab-dashboard' element={<LabTechDashboard />} />
        

      </Routes>
    </Router>
  )
}

export default App
