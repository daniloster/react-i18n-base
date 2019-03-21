import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Markdown from 'rsg-components/Markdown';
import TopMenu from '../components/TopMenu';
import Sidebar from './Sidebar';
import Content from './Content';

import i18nContextProvider from '../components/i18nContextProvider';

const WrapperLayout = styled.div`
  display: block;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
`;

const { useState } = React;

export default function StyleGuideRenderer(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const onToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const { title, homepageUrl, children, toc } = props;

  return (
    <i18nContextProvider>
      <WrapperLayout>
        <TopMenu>{title}</TopMenu>
        <Sidebar isOpen={isSidebarOpen} onClick={onToggleSidebar} width="300px">
          {toc}
        </Sidebar>
        <Content>
          {children}
          <footer>
            <nav>
              <a href="https://github.com/styleguidist/react-styleguidist/tree/master/docs">Docs</a>
              <a href="https://github.com/styleguidist/react-styleguidist">GitHub</a>
              <a href="https://gitter.im/styleguidist/styleguidist">Gitter</a>
            </nav>
            <Markdown text={`Generated with [React Styleguidist](${homepageUrl}) ❤️`} />
          </footer>
        </Content>
      </WrapperLayout>
    </i18nContextProvider>
  );
}

StyleGuideRenderer.propTypes = {
  title: PropTypes.string.isRequired,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toc: PropTypes.node,
};

StyleGuideRenderer.defaultProps = {
  toc: null,
};
