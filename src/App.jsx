import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Authlayout from './Modules/Athentication/Authlayout'
import NotFound from './Modules/Shared/NotFound/NotFound'
import RecipesList from './Modules/Dashboard/RecipesList/RecipesList'
import FavoritesList from './Modules/Dashboard/FavoritesList/FavoritesList'
import Categorieslist from './Modules/Dashboard/CategoriesList/CategoriesList'
import UsersList from './Modules/Dashboard/UsersList/UsersList'
import MasterLayout from './Modules/Dashboard/MasterLayout'
import Login from './Modules/Athentication/Login/Login'
import Register from './Modules/Athentication/Register/Register'
import ResetPass from './Modules/Athentication/ResetPass/ResetPass'
import VerifyEmail from './Modules/Athentication/VerifyEmail/VerifyEmail'
import ForgetPass from './Modules/Athentication/ForgetPass/ForgetPass'
import AddRecipe from './Modules/Dashboard/AddRecipe/AddRecipe'
import Home from './Modules/Dashboard/Home/Home'
import ProtectedRoute from './Modules/Shared/Prtected/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import { ContextFounder } from './contexts/UserConrtrxt'
import OnlyUsersRoute from './Modules/Shared/Prtected/OnlyUsersRoute'
import OnlyAdminsRoute from './Modules/Shared/Prtected/OnlyAdminsRoute'

function App() {
  const routes = createBrowserRouter([
    {path:'/', element:<Authlayout/>, errorElement:<NotFound/>,children:[
      {index:true, element:<Login/>},
      {path:'/login', element:<Login/>},
      {path:'/register', element:<Register/>},
      {path:'/forget-password', element:<ForgetPass/>},
      {path:'/reset-password', element:<ResetPass/>},
      {path:'/verify-email', element:<VerifyEmail/>},
    ]},
    {
      path:'/dashboard',
      element:<ProtectedRoute><MasterLayout/></ProtectedRoute>,
      errorElement:<NotFound/>,
      children:[
        {index:true, element:<Home/>},
        {path:'recipes', element:<RecipesList/>},
        {path:'add-recipe', element:<OnlyAdminsRoute><AddRecipe/></OnlyAdminsRoute>},
        {path:'Favorites', element:<OnlyUsersRoute><FavoritesList/></OnlyUsersRoute>},
        {path:'categories', element:<OnlyAdminsRoute><Categorieslist/></OnlyAdminsRoute>},
        {path:'users', element:<OnlyAdminsRoute><UsersList/></OnlyAdminsRoute>},
      ]
    }
    
    ])
     
  return (
   <> <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
s
/>
    <RouterProvider router={routes}></RouterProvider> </> )
}

export default App
