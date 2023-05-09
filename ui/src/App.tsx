import { Routes, Route, Navigate } from 'react-router-dom'
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
import { Layout } from './structure/layout/Layout';
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
import AdminLayout from './structure/layout/AdminLayout';
import { AccountPermissionEnum } from './model/enum/accPermissionEnum';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' element={<ProtectedRoutes roleRequired={AccountPermissionEnum.User} />}> */}
          <Route path="/" element={<Layout></Layout>}>
            {/* <Route path="/" element={<IntroPage></IntroPage>}> */}
            <Route path="/" element={<Navigate replace to='trang-chu' />}></Route>
            <Route path="trang-chu" element={<LandingPage></LandingPage>}></Route>
            <Route path="ve-chung-toi" element={<AboutUsPage></AboutUsPage>}></Route>
            <Route path="dich-vu" element={<ServicePage></ServicePage>}></Route>
            <Route path="doi-ngu" element={<DoctorPage></DoctorPage>}></Route>
            <Route path="lien-he" element={<ContactPage></ContactPage>}></Route>
          {/* </Route> */}
          <Route path='/quan-ly' element={<ProtectedRoutes roleRequired={AccountPermissionEnum.User} />}>
            <Route path="/quan-ly" element={<ManagementPage></ManagementPage>}>
              <Route
                path="/quan-ly/ho-so"
                element={<UserInfo></UserInfo>}
              ></Route>
              <Route
                path="/quan-ly/danh-sach-lich-kham"
                element={<ListAppointment></ListAppointment>}
              ></Route>
              <Route path='/quan-ly/dat-lich-kham' element={<ProtectedRoutes roleRequired={AccountPermissionEnum.User} />}>
                <Route
                  path="/quan-ly/dat-lich-kham"
                  element={<BookingAppointment></BookingAppointment>}
                ></Route>
              </Route>
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
          </Route>
          <Route path='/admin' element={<ProtectedRoutes roleRequired={AccountPermissionEnum.Admin} />}>
            <Route path="/admin" element={<AdminLayout></AdminLayout>}></Route>
          </Route>
            
        {/* </Route> */}
        <Route path="/dang-nhap" element={<Login></Login>}></Route>
        {/* <Route path="*" element={<Login></Login>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
