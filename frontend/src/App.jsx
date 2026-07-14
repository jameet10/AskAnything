import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'

import Home from "./Components/Home";
import Layout from "./Components/Layout";
import Profile from "./Components/Profile";
import Categories from "./Components/Categories";
import Search from "./Components/Search";
import Login from "./Components/Login";
import Questions from "./Components/Questions";
import QuestionDetails from "./Components/QuestionDetails";
function App() {
  return (
    <>
     <Layout>
    <Routes>
               <Route path="/" element={<Login/>}> </Route>
               <Route path="/home" element={ <Home ></Home>}> </Route>
                <Route path="/profile" element={ <Profile></Profile>}> </Route>
                <Route path="/categories/:id" element={ <Categories></Categories>}> </Route>
               <Route path="/search/:query" element={ <Search></Search>}> </Route>  
               <Route path="/questions" element={ <Questions></Questions>}> </Route>  
               <Route path="/question/:id" element={<QuestionDetails />} />
    </Routes>
    </Layout>
    </>
  )
}

export default App;
