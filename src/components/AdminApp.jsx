import React, { Component, PropTypes } from 'react';
import Todos from './Todos/Todos';
import AdminMainLayout from '../layouts/MainLayout/AdminMainLayout.jsx';
/*后台管理首页*/
const AdminApp = ({children}) => {
  // <Todos location={location} />
  return (
    <AdminMainLayout>
      {children}
    </AdminMainLayout>
  );
};

AdminApp.propTypes = {
};

export default AdminApp;
