import "./App.css";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AuthFormContainer from "./components/AuthFormContainer";

function App() {
  return (
    <div className="">
      <AuthFormContainer />
      <div>
        {/* <Routes>
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/register" element={<SignupForm />} />
        </Routes> */}
        {/* <AdminDashboard /> */}
      </div>
    </div>
  );
}

export default App;
