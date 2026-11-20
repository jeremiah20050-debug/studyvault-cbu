import {
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Subscription from "./pages/Subscription";

import IS110Materials from "./pages/IS110Materials";
import Schools from "./pages/Schools";
import Programs from "./pages/Programs";
import Courses from "./pages/Courses";
import Materials from "./pages/Materials";

import IS110Intake from "./pages/IS110Intake";
import IS110Tests from "./pages/IS110Tests";
import IS110Tests2018 from "./pages/IS110Tests2018";
import IS110Videos from "./pages/IS110Videos";
import IS110Notes from "./pages/IS110Notes";
import IS110OtherMaterials from "./pages/IS110OtherMaterials";
import IS110Exams from "./pages/IS110Exams";
import IS110Exams2018 from "./pages/IS110Exams2018";

import IS130Materials from "./pages/IS130Materials";
import IS130Notes from "./pages/IS130Notes";
import IS130Videos from "./pages/IS130Videos";
import IS130OtherMaterials from "./pages/IS130OtherMaterials";
import IS130Tests from "./pages/IS130Tests";
import IS130TestsIntake from "./pages/IS130TestsIntake";
import IS130Exams from "./pages/IS130Exams";
import IS130ExamsIntake from "./pages/IS130ExamsIntake";

import CourseMaterials from "./pages/CourseMaterials";
import CourseMaterialContent from "./pages/CourseMaterialContent";

import Login from "./pages/Login";
import Payments from "./pages/Payments";

import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Help from "./pages/Help";
import AccountInformation from "./pages/AccountInformation";
import Settings from "./pages/Settings";

import "./App.css";


// =====================================
// PROTECTED ROUTE
// =====================================

function ProtectedRoute({ children }) {

  const loggedInUser = JSON.parse(
    sessionStorage.getItem("studyvaultLoggedIn") || "null"
  );

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  const users = JSON.parse(
    localStorage.getItem("studyvaultUsers") || "[]"
  );

  const currentUser = users.find(
    (user) => user.studentId === loggedInUser.studentId
  );

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const now = Date.now();

  // CHECK 3-DAY FREE TRIAL

  const trialActive =
    currentUser.trialUsed === true &&
    currentUser.trialStart &&
    now <
      new Date(currentUser.trialStart).getTime() +
        3 * 24 * 60 * 60 * 1000;


  // CHECK PAID SUBSCRIPTION

  const subscriptionActive =
    currentUser.subscriptionStatus === "active" &&
    currentUser.subscriptionEndDate &&
    now < Number(currentUser.subscriptionEndDate);


  // ALLOW ACCESS

  if (trialActive || subscriptionActive) {
    return children;
  }


  // TRIAL EXPIRED OR NO SUBSCRIPTION

  return <Navigate to="/payments" replace />;
}


// =====================================
// MAIN APP
// =====================================

function App() {

  const navigate = useNavigate();

  // =====================================
  // SESSION TIMEOUT
  // =====================================

  useEffect(() => {

    const checkSession = () => {

      const loggedInUser =
        sessionStorage.getItem("studyvaultLoggedIn");

      const loginTime =
        sessionStorage.getItem("studyvaultLoginTime");

      if (!loggedInUser || !loginTime) {
        return;
      }

      const oneHour = 60 * 60 * 1000;

      const currentTime = Date.now();

      if (currentTime - Number(loginTime) >= oneHour) {

        sessionStorage.removeItem("studyvaultLoggedIn");

        sessionStorage.removeItem("studyvaultLoginTime");

        navigate("/login");

      }

    };

    checkSession();

    const sessionTimer = setInterval(
      checkSession,
      60 * 1000
    );

    return () => clearInterval(sessionTimer);

  }, [navigate]);


  // =====================================
  // ROUTES
  // =====================================

  return (

    <Routes>


      {/* =========================
          SCHOOLS
      ========================= */}

      <Route
        path="/schools"
        element={<Schools />}
      />


      {/* =========================
          PROGRAMS
      ========================= */}

      <Route
        path="/programs"
        element={<Programs />}
      />
      <Route
          path="/subscription"
          element={
            <>
              <Navbar />
              <Subscription />
            </>
          }
        />

      {/* =========================
          COURSES
      ========================= */}

      <Route
        path="/courses"
        element={<Courses />}
      />


      {/* =========================
          ALL MATERIALS
      ========================= */}

      <Route
        path="/materials"
        element={<Materials />}
      />


      {/* =========================
          IS110
      ========================= */}

      <Route
        path="/materials/is110"
        element={<IS110Materials />}
      />


      <Route
        path="/materials/is110/2018-2019"
        element={
          <ProtectedRoute>
            <IS110Intake />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is110/tests"
        element={
          <ProtectedRoute>
            <IS110Tests />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is110/tests/2018-2019"
        element={
          <ProtectedRoute>
            <IS110Tests2018 />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is110/notes"
        element={
          <ProtectedRoute>
            <IS110Notes />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is110/videos"
        element={
          <ProtectedRoute>
            <IS110Videos />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is110/other"
        element={
          <ProtectedRoute>
            <IS110OtherMaterials />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is110/exams"
        element={
          <ProtectedRoute>
            <IS110Exams />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is110/exams/:intake"
        element={
          <ProtectedRoute>
            <IS110Exams2018 />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is110/tests/:intake"
        element={
          <ProtectedRoute>
            <IS110Tests2018 />
          </ProtectedRoute>
        }
      />


      {/* =========================
          IS130
      ========================= */}

      <Route
        path="/materials/is130"
        element={<CourseMaterials />}
      />


      <Route
        path="/materials/is130/notes"
        element={
          <ProtectedRoute>
            <IS130Notes />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is130/videos"
        element={
          <ProtectedRoute>
            <IS130Videos />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is130/other"
        element={
          <ProtectedRoute>
            <IS130OtherMaterials />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is130/tests"
        element={
          <ProtectedRoute>
            <IS130Tests />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is130/tests/:intake"
        element={
          <ProtectedRoute>
            <IS130TestsIntake />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is130/exams"
        element={
          <ProtectedRoute>
            <IS130Exams />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is130/exams/:intake"
        element={
          <ProtectedRoute>
            <IS130ExamsIntake />
          </ProtectedRoute>
        }
      />


      {/* =========================
          OTHER COURSE MATERIALS
      ========================= */}

      <Route
        path="/materials/bit140/:type"
        element={
          <ProtectedRoute>
            <CourseMaterialContent />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/bit250/:type"
        element={
          <ProtectedRoute>
            <CourseMaterialContent />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is212/:type"
        element={
          <ProtectedRoute>
            <CourseMaterialContent />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is230/:type"
        element={
          <ProtectedRoute>
            <CourseMaterialContent />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/is260/:type"
        element={
          <ProtectedRoute>
            <CourseMaterialContent />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/bs224/:type"
        element={
          <ProtectedRoute>
            <CourseMaterialContent />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/bs140/:type"
        element={
          <ProtectedRoute>
            <CourseMaterialContent />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/bs153/:type"
        element={
          <ProtectedRoute>
            <CourseMaterialContent />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/bs151/:type"
        element={
          <ProtectedRoute>
            <CourseMaterialContent />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/bs120/:type"
        element={
          <ProtectedRoute>
            <CourseMaterialContent />
          </ProtectedRoute>
        }
      />


      {/* =========================
          GENERAL COURSE ROUTES
      ========================= */}

      <Route
        path="/materials/:courseCode"
        element={<CourseMaterials />}
      />


      <Route
        path="/materials/:courseCode/:type"
        element={
          <ProtectedRoute>
            <CourseMaterialContent />
          </ProtectedRoute>
        }
      />


      <Route
        path="/materials/:courseCode/:type/:intake"
        element={
          <ProtectedRoute>
            <CourseMaterialContent />
          </ProtectedRoute>
        }
      />


      {/* =========================
          REGISTER
      ========================= */}

      <Route
        path="/register"
        element={<Register />}
      />


      {/* =========================
          LOGIN
      ========================= */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* =========================
          FORGOT PASSWORD
      ========================= */}

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />


      {/* =========================
          HELP
      ========================= */}

      <Route
        path="/help"
        element={
          <>
            <Navbar />
            <Help />
          </>
        }
      />


      {/* =========================
          ACCOUNT INFORMATION
      ========================= */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <AccountInformation />
            </>
          </ProtectedRoute>
        }
      />


      {/* =========================
          SETTINGS
      ========================= */}

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Settings />
            </>
          </ProtectedRoute>
        }
      />


      {/* =========================
          PAYMENTS
          NOT PROTECTED
      ========================= */}

      <Route
        path="/payments"
        element={
          <>
            <Navbar />
            <Payments />
          </>
        }
      />


      {/* =========================
          HOME PAGE
      ========================= */}

      <Route
        path="*"
        element={

          <div className="website">

            <Navbar />


            {/* HERO SECTION */}

            <section className="hero">

              <div className="hero-content">

                <p className="hero-small-text">
                  THE best website for studying
                </p>

                <h1>
                  STUDY<span>VAULT</span>
                </h1>

                <p className="hero-description">
                  Access quality study materials, past papers
                  and resources anytime, anywhere.
                </p>

                <button
                  className="explore-button"
                  onClick={() =>
                    window.location.href = "/schools"
                  }
                >
                  Explore Materials →
                </button>

              </div>


              <div className="hero-student">

                <img
                  src="/A_young_woman_with_glasses_and_a_ponytail_is_holding_a_stack_of_books-removebg-preview.png"
                  alt="Student holding books"
                />

              </div>

            </section>


            {/* FEATURE CARDS */}

            <section className="features">

              <div className="feature-card">

                <h2>Study Materials</h2>

                <p>
                  Get lecture notes, past papers and more.
                </p>

              </div>


              <div className="feature-card">

                <h2>All Schools</h2>

                <p>
                  Explore CBU schools in one place.
                </p>

              </div>


              <div className="feature-card">

                <h2>Online Courses</h2>

                <p>
                  Learn at your own pace.
                </p>

              </div>


              <div className="feature-card">

                <h2>Affordable Access</h2>

                <p>
                  Only K50 for premium content.
                </p>

              </div>

            </section>


            {/* POPULAR STUDY MATERIALS */}

<section className="popular-materials">

  <div className="section-heading">

    <p>EXPLORE OUR RESOURCES</p>

    <h2>
      Popular Study Materials
    </h2>

    <span>
      Find the study resources you need to prepare,
      learn and succeed.
    </span>

  </div>


  <div className="material-grid">

    <div className="material-card">

      <h3>Lecture Notes</h3>

      <p>
        Access course notes and learning materials.
      </p>

      <a
        href="/schools?resource=materials"
        className="material-button"
      >
        View Materials →
      </a>

    </div>


    <div className="material-card">

      <h3>Past Papers</h3>

      <p>
        Practice with previous examination papers.
      </p>

      <a
        href="/schools?resource=past-papers"
        className="material-button"
      >
        View Past Papers →
      </a>

    </div>


    <div className="material-card">

      <h3>Exam Papers</h3>

      <p>
        Prepare yourself with available exam resources.
      </p>

      <a
        href="/schools?resource=exam-papers"
        className="material-button"
      >
        View Exam Papers →
      </a>

    </div>

  </div>

</section>


            {/* WHY STUDYVAULT */}

            <section className="why-studyvault">

              <div className="why-content">

                <p className="section-label">
                  WHY STUDYVAULT?
                </p>

                <h2>
                  Everything you need to study smarter.
                </h2>

                <p className="why-description">
                  StudyVault brings your academic resources together
                  in one convenient place, helping you spend less time
                  searching and more time learning.
                </p>


                <div className="why-features">

                  <div>

                    <h3>01</h3>

                    <h4>Easy Access</h4>

                    <p>
                      Find your study materials quickly and easily.
                    </p>

                  </div>


                  <div>

                    <h3>02</h3>

                    <h4>Quality Resources</h4>

                    <p>
                      Access useful academic materials for your courses.
                    </p>

                  </div>


                  <div>

                    <h3>03</h3>

                    <h4>Study Anywhere</h4>

                    <p>
                      Access your resources whenever and wherever
                      you need them.
                    </p>

                  </div>

                </div>

              </div>

            </section>


            {/* FOOTER */}

            <footer className="footer">

              <div className="footer-content">

                <div>

                  <h2>
                    StudyVault CBU
                  </h2>

                  <p>
                    Your platform for quality academic study materials.
                  </p>

                </div>


                <div className="footer-links">

                  <a href="/">
                    Home
                  </a>

                  <a href="/schools">
                    Schools
                  </a>

                  <a href="/courses">
                    Courses
                  </a>

                  <a href="/materials">
                    Materials
                  </a>

                </div>

              </div>


              <div className="footer-bottom">

                © 2026 StudyVault CBU. All rights reserved.

              </div>

            </footer>

          </div>

        }
      />

    </Routes>

  );
}

export default App;