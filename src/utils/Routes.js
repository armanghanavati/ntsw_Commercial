import Login from '../layouts/Login'

const Routes = [

  {
    path: "/",
    name: "login",
    component: Login,
    layout: "Login"
  },
  {
    path: "/index.aspx",
    name: "home",
    component: Login,
    layout: "Login"
  },
  {
    path: "/Login.aspx",
    name: "3",
    component: Login,
    layout: "Login"
  },

]

export default Routes
