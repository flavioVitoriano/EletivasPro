/**
 *
 * SignInPage
 *
 */

import { Spin } from 'antd';
import { Title } from 'components';
import { ErrorMessage, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Col, FormGroup, Label, Row } from 'reactstrap';
import { useAction, useSelector } from 'utils/hooks';
import * as Yup from 'yup';

import { signInUser } from './actions';
import { makeSelectLoading } from './selectors';

const initialState = {
  username: 'admin',
  password: 'password',
};

const SignInSchema = Yup.object().shape({
  username: Yup.string().required('Usuário é necessário'),
  password: Yup.string().required('Senha é necessário'),
});

const SignInPage = () => {
  const { formatMessage } = useIntl();
  const loading = useSelector(makeSelectLoading());

  const submit = useAction(values => signInUser(values));

  const signInUserCallback = (values, { setSubmitting }) => {
    submit(values);
    setSubmitting(false);
  };

  return (
    <Formik
      onSubmit={signInUserCallback}
      initialValues={initialState}
      validationSchema={SignInSchema}
      validateOnChange
    >
      {({ values, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Title text={formatMessage({ id: 'containers.signInPage.header' })} />
          <Row form className="justify-content-md-center">
            <Col md={4}>
              <FormGroup>
                <Label>
                  <FormattedMessage id="containers.signInPage.username" />:
                </Label>
                <input
                  name="username"
                  type="username"
                  autoComplete="user-username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                />
                <ErrorMessage name="username" />
              </FormGroup>
            </Col>
          </Row>
          <Row form className="justify-content-md-center">
            <Col md={4}>
              <FormGroup>
                <Label>
                  <FormattedMessage id="containers.signInPage.password" />:
                </Label>
                <input
                  name="password"
                  type="password"
                  autoComplete="user-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                />
                <ErrorMessage name="password" />
              </FormGroup>
            </Col>
          </Row>
          <Row form className="justify-content-md-center">
            <Col md={4}>
              <FormGroup>
                <Button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || loading}
                >
                  {formatMessage({ id: 'containers.signInPage.submit' })}
                  {loading && <Spin className="text-white" />}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

SignInPage.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
};

export default SignInPage;
