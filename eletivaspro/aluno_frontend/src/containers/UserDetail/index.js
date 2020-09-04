/**
 *
 * UserDetail
 *
 */

import { makeSelectError, makeSelectUser } from 'containers/HomePage/selectors';
import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'utils/hooks';

const UserDetail = () => {
  const user = useSelector(makeSelectUser());
  const error = useSelector(makeSelectError());
  return user && user.name && user.email ? (
    <>
      <p>
        <FormattedMessage id="containers.userDetail.name" />: {user.name}
      </p>
      <p>
        <FormattedMessage id="containers.userDetail.email" />: {user.email}
      </p>
    </>
  ) : (
    <p>{error}</p>
  );
};

export default memo(UserDetail);
