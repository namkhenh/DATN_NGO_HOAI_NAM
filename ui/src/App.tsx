import Layout from './structure/layout/Layout';
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingPage/LandingPage';
import ManagementPage from "./pages/managementPage/ManagementPage";
import UserInfo from './pages/userInfo/UserInfo';
import ListAppointment from "./pages/listAppointment/ListAppointment";
import BookingAppointment from "./pages/bookingAppointment/BookingAppointment"
import AboutUsPage from './pages/aboutUsPage/AboutUsPage';
import ServicePage from './pages/servicePage/ServicePage';
import DoctorPage from './pages/doctorPage/DoctorPage';
import ContactPage from './pages/contactPage/ContactPage';
import Login from './structure/login/Login';
import MyHealthPage from './pages/myHealthPage/MyHealthPage';
import ChangePassword from './pages/changePassword/ChangePassword';
import DisableAccountPage from './pages/disableAccountPage/DisableAccountPage';
import HelperPage from './pages/helperPage/HelperPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          {/* <Route path="/" element={<IntroPage></IntroPage>}> */}
            <Route path="/" element={<LandingPage></LandingPage>}></Route>
            <Route path="/ve-chung-toi" element={<AboutUsPage></AboutUsPage>}></Route>
            <Route path="/dich-vu" element={<ServicePage></ServicePage>}></Route>
            <Route path="/doi-ngu" element={<DoctorPage></DoctorPage>}></Route>
            <Route path="/lien-he" element={<ContactPage></ContactPage>}></Route>
          {/* </Route> */}
          <Route path="/quan-ly" element={<ManagementPage></ManagementPage>}>
            <Route
              path="/quan-ly/ho-so"
              element={<UserInfo></UserInfo>}
            ></Route>
            <Route
              path="/quan-ly/danh-sach-lich-kham"
              element={<ListAppointment></ListAppointment>}
            ></Route>
            <Route
              path="/quan-ly/dat-lich-kham"
              element={<BookingAppointment></BookingAppointment>}
            ></Route>
            <Route
              path="/quan-ly/suc-khoe"
              element={<MyHealthPage></MyHealthPage>}
            ></Route>
            <Route
              path="/quan-ly/mat-khau"
              element={<ChangePassword></ChangePassword>}
            ></Route>
            <Route
              path="/quan-ly/vo-hieu-hoa"
              element={<DisableAccountPage></DisableAccountPage>}
            ></Route>
            <Route
              path="/quan-ly/tro-giup"
              element={<HelperPage></HelperPage>}
            ></Route>
          </Route>
        </Route>
        <Route path="/dang-nhap" element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
