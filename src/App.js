// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import NotFound from "./Components/NotFound";
import Content from "./Components/Content";
import CreateQuestion from "./Components/CreateQuestion";
import UpdateQuestion from "./Components/UpdateQuestion";
// import AllSubjects from "./Components/AllSubjects";
import AllChapters from "./Components/AllChapters";
import LoginComponent from "./Components/LoginComponent";
import RegistrationComponent from "./Components/RegistrationComponent";
import DashboardComponent from "./Components/DashboardComponent";
import AuthenticatedRoute from "./Components/authentication/AuthenticatedRoute";
// import { Redirect } from "react-router-dom";
import { useEffect } from "react";
// import { getToken } from "./Components/authentication/AuthComponent";
// import UnAuthenticatedRoute from "./Components/authentication/UnAuthenticatedRoute";
import UnAuthenticatedComponent from "./Components/authentication/UnAuthenticatedComponent";
import LandingComponent from "./Components/LandingComponent";
import ForgotPasswordSendEmail from "./Components/ForgotPasswordSendEmail";
import ResetPasswordComponent from "./Components/ResetPasswordComponent";
import ChangePasssword from "./Components/ChangePasssword";
import MyQuestionsSubjects from "./Components/loggedin/myquestions/MyQuestionsSubjects";
import MyQuestionsTopics from "./Components/loggedin/myquestions/MyQuestionsTopics";
import MyQuestionsLists from "./Components/loggedin/myquestions/MyQuestionsLists";
import QuestionBankSubjects from "./Components/loggedout/QuestionBankSubjects";
import QuestionBankTopics from "./Components/loggedout/QuestionBankTopics";
import QuestionBankQuestionList from "./Components/loggedout/QuestionBankQuestionList";
import Settings from "./Components/Settings";
import AccountActivationComponent from "./Components/AccountActivationComponent";
export const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // if (getToken()) {
    //   setIsAuthenticated(true);
    // }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router initialEntries={["/"]}>
        <div className="App">
          <header className="App-header">
            <Navbar />
          </header>
          <div className="App-content">
            <Switch>
              <Route exact path="/">
                <UnAuthenticatedComponent component={LandingComponent} />
              </Route>
              {/* Static URLS */}
              {/* <Route exact path="/questionbank">
                <UnAuthenticatedComponent component={QuestionBankSubjects} />
              </Route>
              <Route exact path="/questionbank/:subject">
                <UnAuthenticatedComponent component={QuestionBankTopics} />
              </Route>
              <Route exact path="/questionbank/:subject/:topic">
                <UnAuthenticatedComponent
                  component={QuestionBankQuestionList}
                />
              </Route> */}
              {/* Routes Below are added for logged in users */}
              <Route exact path="/questionbank">
                <QuestionBankSubjects />
              </Route>
              <Route exact path="/questionbank/:subject">
                <QuestionBankTopics />
              </Route>
              <Route exact path="/questionbank/:subject/:topic">
                <QuestionBankQuestionList />
              </Route>
              {/* <Route exact path="/login">
                {!isAuthenticated ? (
                  <LoginComponent />
                ) : (
                  <Redirect to="/dashboard" />
                )}
              </Route> */}
              <Route exact path="/registration">
                <UnAuthenticatedComponent component={RegistrationComponent} />
              </Route>
              <Route exact path="/login">
                <UnAuthenticatedComponent component={LoginComponent} />
              </Route>
              <Route exact path="/forgotpassword">
                <UnAuthenticatedComponent component={ForgotPasswordSendEmail} />
              </Route>
              <Route exact path="/resetpassword/:resettoken">
                <UnAuthenticatedComponent component={ResetPasswordComponent} />
              </Route>
              <Route exact path="/user/activate/:activationtoken">
                <UnAuthenticatedComponent component={AccountActivationComponent} />
              </Route>
              {/* <Route exact path="/dashboard" component={DashboardComponent} /> */}
              {/* <Route exact path="/dashboard">
                <DashboardComponent />
              </Route> */}
              <AuthenticatedRoute
                exact
                path="/dashboard"
                component={DashboardComponent}
              />
              <AuthenticatedRoute
                exact
                path="/changepassword"
                component={ChangePasssword}
              />
              <AuthenticatedRoute exact path="/settings" component={Settings} />
              <AuthenticatedRoute
                exact
                path="/createquestion"
                component={CreateQuestion}
              />
              <AuthenticatedRoute
                exact
                path="/updatequestion/:id"
                component={UpdateQuestion}
              />
              <AuthenticatedRoute
                exact
                path="/myquestions"
                component={MyQuestionsSubjects}
              />
              <AuthenticatedRoute
                exact
                path="/myquestions/:subject"
                component={MyQuestionsTopics}
              />
              <AuthenticatedRoute
                exact
                path="/myquestions/:subject/:chapter"
                component={MyQuestionsLists}
              />
              <Route exact path="/404">
                <NotFound />
              </Route>
              <Route exact path="/notfound">
                <NotFound />
              </Route>
              {/* Dynamic URLS */}
              <Route exact path="/:subject">
                <AllChapters />
              </Route>
              <Route exact path="/:subject/:chapter">
                <Content />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
          <div className="App-footer">
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
