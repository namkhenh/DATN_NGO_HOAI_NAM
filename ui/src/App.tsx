import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/userPageContainer/landingPage/LandingPage";
import ManagementPage from "./pages/userPageContainer/managementPage/ManagementPage";
import UserInfo from "./pages/userPageContainer/userInfo/UserInfo";
import ListAppointment from "./pages/userPageContainer/listAppointment/ListAppointment";
import BookingAppointment from "./pages/userPageContainer/bookingAppointment/BookingAppointment";
import AboutUsPage from "./pages/userPageContainer/aboutUsPage/AboutUsPage";
import ServicePage from "./pages/userPageContainer/servicePage/ServicePage";
import DoctorPage from "./pages/userPageContainer/doctorPage/DoctorPage";
import ContactPage from "./pages/userPageContainer/contactPage/ContactPage";
import Login from "./structure/login/Login";
import MyHealthPage from "./pages/userPageContainer/myHealthPage/MyHealthPage";
import ChangePassword from "./pages/userPageContainer/changePassword/ChangePassword";
import DisableAccountPage from "./pages/userPageContainer/disableAccountPage/DisableAccountPage";
import HelperPage from "./pages/userPageContainer/helperPage/HelperPage";
import { Layout } from "./structure/layout/Layout";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import AdminLayout from "./structure/layout/AdminLayout";
import { AccountPermissionEnum } from "./model/enum/accPermissionEnum";
import PatientListPage from "./pages/adminPageContainer/patientListPage/PatientListPage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' element={<ProtectedRoutes roleRequired={AccountPermissionEnum.User} />}> */}
        <Route path="/" element={<Layout></Layout>}>
          {/* <Route path="/" element={<IntroPage></IntroPage>}> */}
          <Route path="/" element={<Navigate replace to="trang-chu" />}></Route>
          <Route path="trang-chu" element={<LandingPage></LandingPage>}></Route>
          <Route
            path="ve-chung-toi"
            element={<AboutUsPage></AboutUsPage>}
          ></Route>
          <Route path="dich-vu" element={<ServicePage></ServicePage>}></Route>
          <Route path="doi-ngu" element={<DoctorPage></DoctorPage>}></Route>
          <Route path="lien-he" element={<ContactPage></ContactPage>}></Route>
          {/* </Route> */}
          <Route
            path="/quan-ly"
            element={
              <ProtectedRoutes roleRequired={AccountPermissionEnum.User} />
            }
          >
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
                element={
                  <ProtectedRoutes roleRequired={AccountPermissionEnum.User} />
                }
              >
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
        <Route
          path="/admin"
          element={
            <ProtectedRoutes roleRequired={AccountPermissionEnum.Admin} />
          }
        >
          <Route path="/admin" element={<AdminLayout></AdminLayout>}>
            <Route path="/admin/dashboard" element={<div>Dash</div>}></Route>
            <Route path="/admin/tiep-nhan" element={<PatientListPage/>}></Route>
          </Route>
        </Route>

        {/* </Route> */}
        <Route path="/dang-nhap" element={<Login></Login>}></Route>
        {/* <Route path="*" element={<Login></Login>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
