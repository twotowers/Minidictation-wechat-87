import HOME from '../pages/home.jsx';
import CREATEASSIGNMENT from '../pages/createAssignment.jsx';
import REPORTS from '../pages/reports.jsx';
import PARENTHOME from '../pages/parentHome.jsx';
import DICTATION from '../pages/dictation.jsx';
import REVIEW from '../pages/review.jsx';
import TEACHERHOME from '../pages/teacherHome.jsx';
export const routers = [{
  id: "home",
  component: HOME
}, {
  id: "createAssignment",
  component: CREATEASSIGNMENT
}, {
  id: "reports",
  component: REPORTS
}, {
  id: "parentHome",
  component: PARENTHOME
}, {
  id: "dictation",
  component: DICTATION
}, {
  id: "review",
  component: REVIEW
}, {
  id: "teacherHome",
  component: TEACHERHOME
}]