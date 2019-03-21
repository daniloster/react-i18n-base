import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LogoLayout = styled.div`
  background-image: url(none);
`;

export default function Logo({ children }) {
  return <LogoLayout>{children}</LogoLayout>;
}

Logo.propTypes = {
  children: PropTypes.node.isRequired,
};
