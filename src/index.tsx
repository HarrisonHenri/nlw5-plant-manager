import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import Routes from './routes';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Routes />;
};

export default App;
