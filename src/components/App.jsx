import React, { Component, PropTypes } from 'react';
import Todos from './Todos/Todos';
import MainLayout from '../layouts/MainLayout/MainLayout';

/*前台首页*/
const App = ({children}) => {
  // <Todos location={location} />
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
};

App.propTypes = {
};

export default App;
