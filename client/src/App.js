import React from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import './style/style.css'; // regular CSS -> className='app'
// import styles from './style/App.module.css'; // module CSS -> className={styles.App} (AKA styled components)
// import * as api from './api';
// ^ ^ ^ un-comment this to import api endpoints

function App() {
  // const [data, setData] = React.useState([]);
  // React.useEffect(() => {
  //   api
  //     .getSomething() // replace this with your endpoint
  //     .then((response) => console.log(`✅ ${response.status} ${response.statusText}`, setData(response.data)))
  //     .catch((error) => console.log(`❌ ${error}`));
  // }, []);
  //
  // ^ ^ ^ example using the api endpoint

  return (
    <div
    // className={styles.App}
    >
      <Header />
      <Sidebar />
    </div>
  );
}

export default App;
