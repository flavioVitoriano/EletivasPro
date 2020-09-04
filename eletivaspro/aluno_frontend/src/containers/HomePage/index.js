/**
 *
 * HomePage
 *
 */

import { Button, Select, Title } from 'components';
import { logoutUser } from 'containers/App/actions';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useAction, useSelector } from 'utils/hooks';
import { locales, messages } from 'utils/locale';

import { addCounter, getUser, subtractCounter } from './actions';
import { makeSelectCounter } from './selectors';

const HomePage = () => {
  const { formatMessage } = useIntl();
  const counter = useSelector(makeSelectCounter());
  const locale = useSelector(makeSelectLocale());
  const addCounterCallback = useAction(addCounter);
  const subtractCounterCallback = useAction(subtractCounter);
  const changeLocaleCallback = useAction(changeLocale);
  const getPlaceholderUserCallback = useAction(getUser);
  const logoutUserCallback = useAction(logoutUser);

  useEffect(() => {
    getPlaceholderUserCallback(counter);
  }, [getPlaceholderUserCallback, counter]);

  return (
    <>
      <Title text={formatMessage({ id: 'containers.homePage.header' })} />
      <Button onClick={addCounterCallback}>+</Button>
      {counter}
      <Button onClick={subtractCounterCallback}>-</Button>
      <Select
        value={locale}
        options={locales}
        messages={messages}
        onSelect={changeLocaleCallback}
      />
      <Button onClick={logoutUserCallback}>
        {formatMessage({ id: 'containers.homePage.logout' })}
      </Button>
    </>
  );
};

export default HomePage;
