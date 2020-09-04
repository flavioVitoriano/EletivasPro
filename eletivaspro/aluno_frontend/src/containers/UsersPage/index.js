/**
 *
 * UsersPage
 *
 */

import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from 'reactstrap';
import { useAction, useSelector } from 'utils/hooks';

import { paths } from '../RoutesProvider/routes';
import { deleteUserRequest, getUsersRequest } from './actions';
import { makeSelectUsers } from './selectors';

const UsersPage = () => {
  let users = useSelector(makeSelectUsers());
  const getUsers = useAction(getUsersRequest);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const deleteUser = useAction(id => deleteUserRequest(id));

  useEffect(() => {
    if (isEmpty(users)) getUsers();
  }, [getUsers, users]);

  const toggleDeleteModal = id => {
    setSelectedUser(id);
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const deleteUserCallback = id => {
    deleteUser(id);
    users = filter(users, ({ userId }) => userId !== id);
    toggleDeleteModal(null);
  };

  return (
    <div>
      <Modal isOpen={isDeleteModalOpen} toggle={() => toggleDeleteModal(null)}>
        <ModalHeader>
          Certeza que deseja deletar o usuário {selectedUser}
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col>
              <Button
                color="primary"
                onClick={() => deleteUserCallback(selectedUser)}
              >
                Sim
              </Button>
            </Col>
            <Col>
              <Button color="primary" onClick={() => toggleDeleteModal(null)}>
                Não
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <Row className="mt-2 mb-2">
        <Col>
          <FormattedMessage id="containers.usersFormPage.header" />
        </Col>
        <Col className="text-right">
          <Link to={paths.usersFormPage}>
            <FormattedMessage id="components.buttons.newItem" />
          </Link>
        </Col>
      </Row>

      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <FormattedMessage id="containers.usersPage.name" />
            </th>
            <th>
              <FormattedMessage id="containers.usersPage.groups" />
            </th>
            <th>
              <FormattedMessage id="containers.usersPage.rules" />
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {map(users, user => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.username}</td>
                <td>{map(user.groups, ({ name }) => name).join(', ')}</td>
              <td></td>
              <td>
                <Link to={`${paths.usersPage}/${user.id}`}>Editar</Link>
              </td>
              <td>
                <Button
                  color="danger"
                  onClick={() => toggleDeleteModal(user.id)}
                >
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

UsersPage.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
};

export default memo(UsersPage);
