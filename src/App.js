import React, { useState } from 'react';
import Navbar from './Components/Navigation/Navbar/Navbar';
import SideDrawer from './Components/Navigation/SideDrawer/SideDrawer';
import SongList from './Containers/SongList/SongList';
import Modal from './Components/UI/Modal/Modal';
import Button from './Components/UI/Button/Button';


const App = (props) => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [error, setError] = useState(false);

  const sideDrawerToggleHandler = () => {
    setToggleDrawer((toggleDrawer) => !toggleDrawer);
  };

  const sideDrawerClosedHandler = () => {
    setToggleDrawer(false);
  };

 //useCallback prevents the unnecessary rerender of SongList 
  const handleError = useCallback(()=>{
    setError(true)
  },[])

  const errorMessage = (
    <div>
      <h1>
        There has been a problem with the server connection. Please try
        reloading the page or perform a new search.
      </h1>
      <Button btnType="Primary" clicked={() => window.location.reload(false)}>
        Reload Page
      </Button>
    </div>
  );

  return (
    <div className="App">
      <Modal
        show={error}
        modalClosed={() => props.onErrorMessageClosed()}
      >
        {errorMessage}
      </Modal>
      <Navbar toggleDrawer={sideDrawerToggleHandler} />
      <SideDrawer open={toggleDrawer} closed={sideDrawerClosedHandler} />
      <SongList handleError={handleError}/>
    </div>
  );
};

export default App
