import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "font-awesome/css/font-awesome.min.css";
import "./css/style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Layout from "./Layout/Layout";
import LogIn from "./pages/Login";
import SignUp from "./pages/Signup";
import NotFound from "./pages/NotFound";
import UserSearch from "./pages/UserSearch";
// user imports
import Home from "./pages/Home";
import UserProfile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import AskQuestion from "./pages/AskQuestion";
import SingleQuestion from "./pages/SingleQuestion";
import StudyMaterials from "./pages/StudyMaterials";
import SearchResults from "./pages/SearchResults";
import StudyChapters from "./pages/StudyChapters";
// admin imports
import PostStudyMaterials from "./pages/admin/PostStudyMaterials";
import AdminDash from "./pages/admin/AdminDash";
import Quiz from "./pages/admin/Quiz";
import AddTopics from "./pages/admin/AddTopics";
import TagSearch from "./pages/TagSearch";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            {/* User Routes */}
            <Route path="/" component={Home} exact />
            <Route path="/login" component={LogIn} exact />
            <Route path="/signup" component={SignUp} exact />
            <Route path="/profile" component={UserProfile} exact />
            <Route path="/ask-question" component={AskQuestion} exact />
            <Route path="/user-search" component={UserSearch} exact />
            <Route path="/questions/:id" component={SingleQuestion} exact />
            <Route path="/profile/update" component={UpdateProfile} exact />
            <Route path="/study-materials" component={StudyMaterials} exact />
            <Route
              path="/study-materials/:subname"
              component={StudyChapters}
              exact
            />
            <Route
              path="/search-results/:title"
              component={SearchResults}
              exact
            />
            {/* <Route path="*" component={NotFound} /> */}
            {/* Admin Routes */}
            <Route path="/admin" component={AdminDash} exact />
            <Route
              path="/admin/studymaterials"
              component={PostStudyMaterials}
              exact
            />
            <Route path="/admin/quiz" component={Quiz} exact />
            <Route path="/admin/:subname" component={AddTopics} exact />
            <Route path="/tag-search" component={TagSearch} exact />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
