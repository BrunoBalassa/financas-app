import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css'
import Rotas from './routes'
import Navbar from '../components/navbar'
import 'toastr/build/toastr.min.js'
import '../custom.css'
import 'toastr/build/toastr.css'

class App extends React.Component {
  render(){
    return (
    <>
      <Navbar/>
      <div className='container'>
         <Rotas/>
       </div>
    </>  
    )
  }
  
    
}

export default App;