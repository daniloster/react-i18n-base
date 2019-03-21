import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from './Logo';

const TopMenuLayout = styled.div``;

export default function TopMenu({ children }) {
  return (
    <TopMenuLayout>
      <Logo alt={children}>react-i18n-base</Logo>
    </TopMenuLayout>
  );
}

TopMenu.propTypes = {
  children: PropTypes.node.isRequired,
};
