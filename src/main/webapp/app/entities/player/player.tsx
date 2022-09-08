import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPlayer } from 'app/shared/model/player.model';
import { getEntities } from './player.reducer';

export const Player = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const playerList = useAppSelector(state => state.player.entities);
  const loading = useAppSelector(state => state.player.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="player-heading" data-cy="PlayerHeading">
        <Translate contentKey="sampleLabInternetApp.player.home.title">Players</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="sampleLabInternetApp.player.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/player/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="sampleLabInternetApp.player.home.createLabel">Create new Player</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {playerList && playerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="sampleLabInternetApp.player.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sampleLabInternetApp.player.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="sampleLabInternetApp.player.birthDate">Birth Date</Translate>
                </th>
                <th>
                  <Translate contentKey="sampleLabInternetApp.player.height">Height</Translate>
                </th>
                <th>
                  <Translate contentKey="sampleLabInternetApp.player.weight">Weight</Translate>
                </th>
                <th>
                  <Translate contentKey="sampleLabInternetApp.player.baskets">Baskets</Translate>
                </th>
                <th>
                  <Translate contentKey="sampleLabInternetApp.player.assists">Assists</Translate>
                </th>
                <th>
                  <Translate contentKey="sampleLabInternetApp.player.team">Team</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {playerList.map((player, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/player/${player.id}`} color="link" size="sm">
                      {player.id}
                    </Button>
                  </td>
                  <td>{player.name}</td>
                  <td>{player.birthDate ? <TextFormat type="date" value={player.birthDate} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{player.height}</td>
                  <td>{player.weight}</td>
                  <td>{player.baskets}</td>
                  <td>{player.assists}</td>
                  <td>{player.team ? <Link to={`/team/${player.team.id}`}>{player.team.name}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/player/${player.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/player/${player.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/player/${player.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="sampleLabInternetApp.player.home.notFound">No Players found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Player;
