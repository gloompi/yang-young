import React, { FC, useEffect } from 'react';
import { when } from 'mobx';
import { useTranslation } from 'react-i18next';

import useStore from 'hooks/use-store';

const CommonWrapper: FC = ({ children }) => {
  const { appStore, init } = useStore();
  const { i18n } = useTranslation('common');

  const initialize = async () => {
    await when(() => Boolean(i18n.language));
    appStore.setLang(i18n.language);
    init();
  };

  useEffect(() => {
    initialize();
  }, []);

  return <>{children}</>;
};

export default CommonWrapper;
