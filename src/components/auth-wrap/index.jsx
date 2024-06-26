import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import AuthService from '../../services/auth';

// 一个简单的鉴权操作
export const AuthWrapComponent = ({ children }) => {
  const user = AuthService.getCurrentUser();
  return (
    <>
      {/* 注意一定要replace ,导航到404空白页 或者 401无权 */}
      {user ? children : <Navigate to="/login" replace />}
    </>
  );
};

AuthWrapComponent.propTypes = {
  children: PropTypes.node.isRequired,
};