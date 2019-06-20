import { Dashboard, Person } from '@material-ui/icons';
import DashboardPage from '../views/Dashboard/Dashboard';

import Formation from '../views/Formation/Formation';
import Project from '../views/Projects/Projects';
import Skill from '../views/Skill/Skill';
import Certifications from '../views/Certifications/Certifications';
import Objectifs from '../views/Objectifs/Objectifs';
import Calendar from '../views/Calendar/Data';
import Profile from '../views/UserProfile/UserProfile';
export type Route = typeof dashboardRoutes[0];
const dashboardRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: '/formation',
    sidebarName: 'Formation',
    navbarName: 'Formation',
    icon: Person,
    component: Formation
  },
  {
    path: '/projects',
    sidebarName: 'Projects',
    navbarName: 'Projects',
    icon: Person,
    component: Project
  },
  {
    path: '/skills',
    sidebarName: 'Skills',
    navbarName: 'Skills',
    icon: Person,
    component: Skill
  },
  {
    path: '/certifications',
    sidebarName: 'Certifications',
    navbarName: 'Certifications',
    icon: Person,
    component: Certifications
  },
  {
    path: '/objectifs',
    sidebarName: 'Objectifs',
    navbarName: 'Objectifs',
    icon: Person,
    component: Objectifs
  },
  {
    path: '/Calendar',
    sidebarName: 'Calendar',
    navbarName: 'Calendar',
    icon: Person,
    component: Calendar
  },
  {
    path: '/user',

    component: Profile
  },
  {
    path: '/',
    navbarName: 'Redirect',
    redirect: true,
    to: '/dashboard'
  }
];

export default dashboardRoutes;
