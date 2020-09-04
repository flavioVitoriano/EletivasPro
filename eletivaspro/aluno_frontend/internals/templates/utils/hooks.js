import { useCallback } from 'react';
import {
  shallowEqual,
  useDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';

export const useAction = action => {
  const dispatch = useDispatch();
  return useCallback(prop => dispatch(action(prop)), [action, dispatch]);
};

export const useSelector = selector => useReduxSelector(selector, shallowEqual);
