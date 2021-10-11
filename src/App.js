import {Helmet} from 'react-helmet';
import ExpensesForm from './components/ExpensesForm';
import Navbar from './components/Navbar';
import TotalExpenses from './components/TotalExpenses';

const App = () => {
  return (
    <>
      <Helmet>
          <title>Agregar Gasto</title>
      </Helmet>
      <Navbar/>
      <ExpensesForm/>
      <TotalExpenses/>
    </>
  );
}

export default App;
