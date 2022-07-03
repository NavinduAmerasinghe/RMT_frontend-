import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "./component/Auth/SignUp/index";
import Login from "./component/Auth/Login/index.jsx";
import AdminPage from "./component/Admin/AdminPage/AdminPage";
import AdminHomePage from "./component/Admin/AdminPage/AdminHomePage";
// import Sidebar from "./component/Admin/sidebar/sidebar";
import Upload from "./component/Admin/pages/Upload";
import Home from "./component/Admin/pages/Home";
import SupervisorDetails from "./component/Admin/SupervisorDB/SupervisorDetails";
import CoSupervisorDetails from "./component/Admin/CoSupervisorDB/CoSupervisorDetails";
import StudentDetails from "./component/Admin/StudentDB/StudentDetails";
import PanelMemberDetails from "./component/Admin/PanelMemberDB/PanelMember";
import ViewRoles from "./component/Admin/viewRole/viewRole";
import SupervisorDetailsUpdate from "./component/Admin/SupervisorDB/SupervisorDetailsUpdate";
import CoSupervisorDetailsUpdate from "./component/Admin/CoSupervisorDB/cosupervisorDetailsUpdate";
import PanelMemberUpdate from "./component/Admin/PanelMemberDB/PanelMemberDetailsUpdate";
import StudentDetailsUpdate from "./component/Admin/StudentDB/StudentDetailsUpdate";
import Updategroup from "./component/Student/updategroup";
import Docsubmit from "./component/Student/docsubmit";
import Findtopic from "./component/Student/findtopic";
import StudentDetailsTable from "./component/Student/viewgroup";
import Create from "./component/Student/creategroup";
import Dashboard from "./component/Student/dashboard";
import PanelMember from "./component/panel_member/feedback";
import Presentation from "./component/panel_member/Presentation";
import PanelDash from "./component/panel_member/PanelDash";
import Mail from "./component/panel_member/Mail";
import ViewPresentationMarks from "./component/panel_member/viewPresentationMarks";
import AddDocumentMarks from "./component/supervisor/documentEvaluation";
import DisplayDocumentMarks from "./component/supervisor/displayDocMraks";
import DocEvaluationUpdate from "./component/supervisor/updateDocMarks";
import DocStdEvaluationUpdate from "./component/supervisor/displayStdDocMarks";
import AllocatePanelMembers from "./component/Admin/AllocatePanelMembers";
import "./App.css";

import AppRouter from "../src/component/Admin/FileUpload/AppRouter";
import Header from "../src/component/Admin/FileUpload/Header";
import FilesList from "../src/component/Admin/FileUpload/FilesList";

function App() {
  const user = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<Login />} />
        <Route path="/adminPage" exact element={<AdminPage />} />
        <Route path="/adminHomePage" exact element={<AdminHomePage />} />
        {/* <Route path="/sidebar" exact element={<Sidebar />} /> */}
        {/* <Route path="/upload" exact element={<Upload />} /> */}
        {/* <Route path="/" exact element={<Home />} /> */}
        <Route
          path="/supervisorDetails"
          exact
          element={<SupervisorDetails />}
        />
        <Route
          path="/co-supervisorDetails"
          exact
          element={<CoSupervisorDetails />}
        />
        <Route path="/studentDetails" exact element={<StudentDetails />} />
        <Route
          path="/panelMemberDetails"
          exact
          element={<PanelMemberDetails />}
        />
        <Route path="/viewUserRoles" exact element={<ViewRoles />} />
        <Route
          path="/supervisorDetailsUpdate/:id"
          exact
          element={<SupervisorDetailsUpdate />}
        />
        <Route
          path="/cosupervisorDetailsUpdate/:id"
          exact
          element={<CoSupervisorDetailsUpdate />}
        />
        <Route
          path="/panelMemberDetailsUpdate/:id"
          exact
          element={<PanelMemberUpdate />}
        />
        <Route
          path="/studentDetailsUpdate/:id"
          exact
          element={<StudentDetailsUpdate />}
        />

        <Route path="/uploadDocuments" exact element={<AppRouter />} />
        <Route path="/documentlist" exact element={<FilesList />} />

        <Route path="/update/:id" exact element={<Updategroup />} />
        <Route path="/doc" exact element={<Docsubmit />} />
        <Route path="/find" exact element={<Findtopic />} />
        <Route path="/create" exact element={<Create />} />
        <Route path="/view" exact element={<StudentDetailsTable />} />
        {<Route path="/dashboard" exact element={<Dashboard />} />}

        <Route path="/panelFeedback" exact element={<PanelMember />} />
        <Route path="/presentation" exact element={<Presentation />} />
        <Route path="/panelDash" exact element={<PanelDash />} />
        <Route path="/mail" exact element={<Mail />} />
        <Route
          path="/viewpresentationmarks"
          exact
          element={<ViewPresentationMarks />}
        />
        <Route path="/add" exact element={<AddDocumentMarks />} />
        <Route
          path="/displayDocMarks"
          exact
          element={<DisplayDocumentMarks />}
        />
        <Route
          path="/updateDocMarks/:id"
          exact
          element={<DocEvaluationUpdate />}
        />
        <Route
          path="/dispalyStdDocMarks"
          exact
          element={<DocStdEvaluationUpdate />}
        />
        <Route
          path="/allocatePanelMembers"
          exact
          element={<AllocatePanelMembers />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
