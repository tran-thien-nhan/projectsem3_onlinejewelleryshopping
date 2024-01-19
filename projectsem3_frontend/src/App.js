import "./App.css";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AuthFormContainer from "./components/AuthFormContainer";
import Index from "./components/User/Index";

function App() {
  return (
    <div className="">
      {/* <AuthFormContainer />
      <div>
        <Routes>
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/register" element={<SignupForm />} />
        </Routes>
        <AdminDashboard />
      </div> */}

      <Index />
    </div>
  );
}

export default App;
