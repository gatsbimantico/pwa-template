import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CounterApp from '../../../containers/CounterApp';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <ul>
          <li>
            <Link to="/">{t('hello')}</Link>
          </li>
          <li>
            <Link to="./about">About</Link>
          </li>
        </ul>
      </div>
      <h1>Home</h1>
      <CounterApp />
    </div>
  );
};

export default Home;
