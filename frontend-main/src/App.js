import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from './Admin/components/AdminHome';
import OwnerHome from './Owner/components/OwnerHome';
import Customer from './Customer/components/CustomerHome';
import Login from './Login';
import Register from './Register';

// Admin import //

import Dashboardpage from '../src/Admin/Pages/Dashboard';
import Managehotel from '../src/Admin/Pages/Managehotel';
import Addfacility from '../src/Admin/Pages/Addfacility';
import Managecustomer from '../src/Admin/Pages/Managecustomer';
import Feedback from '../src/Admin/Pages/Feedback';
import Sendmessage from '../src/Admin/Pages/Sendmessage';
import OwnerCreate from './Admin/Operations/owneroperations/OwnerCreate';
import OwnerDetail from './Admin/Operations/owneroperations/OwnerDetail';
import OwnerEdit from './Admin/Operations/owneroperations/OwnerEdit';
import CustomerCreate from './Admin/Operations/customeroperations/CustomerCreate';
import CustomerDetail from './Admin/Operations/customeroperations/CustomerDetail';
import CustomerEdit from './Admin/Operations/customeroperations/CustomerEdit';
import EditFacility from './Admin/Operations/facilityoperations/EditFacility';
import CreateFacility from './Admin/Operations/facilityoperations/CreateFacility';

// owner import //

import Ownerdashboard from '../src/Owner/Pages/Dashboard';
import Addroom from './Owner/Pages/Addroom';
import ViewBooking from './Owner/Pages/ViewBooking'
import ViewFeedback from './Owner/Pages/ViewFeedback';
import Viewmessage from './Owner/Pages/Viewmessage';
import AddHotel from './Owner/Pages/AddHotel';
import CreateHotel from './Owner/Operations/hoteloperation/CreateHotel';
import EditHotel from './Owner/Operations/hoteloperation/EditHotel';
import CreateRoom from './Owner/Operations/roomoperation/CreateRoom';
import EditRoom from './Owner/Operations/roomoperation/EditRoom';
import DetailHotel from './Owner/Operations/hoteloperation/DetailHotel';


// customer import //

import CustomerDashboard from './Customer/Pages/CustomerDashboard';
import BookRoom from './Customer/Pages/BookRoom';
import PricingRoom from './Customer/Pages/PricingRoom';
import Profile from './Customer/Pages/Profile';
import CumFeedback from './Customer/Pages/CumFeedback';
import Bookings from './Customer/Pages/Bookings';

import { ToastContainer } from 'react-toastify';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored'></ToastContainer>
      <BrowserRouter>
        <Routes>

          {/* Admin entire paths */}

          <Route path='/' element={<AdminHome />}>

            <Route path="/dashboard" element={<Dashboardpage />} />

            {/* Owner Paths */}

            <Route path="/managehotel" element={<Managehotel />} />
            <Route path="/ownercreate" element={<OwnerCreate />} />
            <Route path="/owneredit/:id" element={<OwnerEdit />} />
            <Route path="/ownerdetail/:id" element={<OwnerDetail />} />


            {/* Manage Facility Paths */}

            <Route path="/addfacility" element={<Addfacility />} />
            <Route path="/facilitycreate" element={<CreateFacility />} />
            <Route path="/facilityedit/:id" element={<EditFacility />} />


            {/* Manage Customer Path */}

            <Route path="/managecustomer" element={<Managecustomer />} />
            <Route path="/customercreate" element={<CustomerCreate />} />
            <Route path="/customeredit/:id" element={<CustomerEdit />} />
            <Route path="/Customerdetail/:id" element={<CustomerDetail />} />


            <Route path="/feedback" element={<Feedback />} />
            <Route path="/sendmessage" element={<Sendmessage />} />

          </Route>


          {/* Owner entire Path */}

          <Route path='/owner' element={<OwnerHome />}>

            <Route path="dashboard" element={<Ownerdashboard />} />

            <Route path="addhotel" element={<AddHotel />} />
            <Route path="createhotel" element={<CreateHotel />} />
            <Route path="edithotel/:id" element={<EditHotel />} />
            <Route path="ownerdetail/:id" element={<DetailHotel />} />


            <Route path="addroom" element={<Addroom />} />
            <Route path="createroom" element={<CreateRoom />} />
            <Route path="editroom/:id" element={<EditRoom />} />



            <Route path="viewbooking" element={<ViewBooking />} />
            <Route path="viewfeedback" element={<ViewFeedback/>} />
            <Route path="viewmessage" element={<Viewmessage />} />

          </Route>

          {/* Customer  entire Paths */}

          <Route path='/customer' element={<Customer />}>
             <Route path='' element={<CustomerDashboard />}/>
             <Route path="bookroom/:owner" element={<BookRoom />} />
             <Route path="priceroom/:uid" element={<PricingRoom />} />
             <Route path='profile' element={<Profile />}/>
             <Route path='bookings' element={<Bookings />}/>
             <Route path='feedback/:id' element={<CumFeedback/>}/>

          </Route>


          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
