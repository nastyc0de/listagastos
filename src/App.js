import {Helmet} from 'react-helmet';
import ExpensesForm from './components/ExpensesForm';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Helmet>
          <title>Agregar Gasto</title>
      </Helmet>
      <Navbar/>
      <ExpensesForm/>
    </>
  );
}

export default App;
