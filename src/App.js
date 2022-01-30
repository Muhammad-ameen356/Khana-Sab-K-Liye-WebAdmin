import logo from './logo.svg';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux'
import { decrease, increase } from './store/Reducers/counterReducer';
import MenuNavbar from './components/Navbar/MenuNavbar'
import Login from "./screens/Login/LoginScreen"
import AdminScreen from './screens/AdminScreen/AdminScreen'
import Approutes from './Routes/Approutes';

function App() {
  const { value } = useSelector(state => state.counter);
  const dispatch = useDispatch()


  return (
    <span className="">
      <Approutes />
      {/* <AdminScreen /> */}
      {/* <h1>{value}</h1>
      <button className={"btn btn-primary m-2"} onClick={() => dispatch(increase(15))}>++</button>
      <button className={"btn btn-primary"} onClick={() => dispatch(decrease())} >--</button> */}
    </span>
  );
}

export default App;
