import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './player.reducer';

export const PlayerDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const playerEntity = useAppSelector(state => state.player.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="playerDetailsHeading">
          <Translate contentKey="sampleLabInternetApp.player.detail.title">Player</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{playerEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="sampleLabInternetApp.player.name">Name</Translate>
            </span>
          </dt>
          <dd>{playerEntity.name}</dd>
          <dt>
            <span id="birthDate">
              <Translate contentKey="sampleLabInternetApp.player.birthDate">Birth Date</Translate>
            </span>
          </dt>
          <dd>
            {playerEntity.birthDate ? <TextFormat value={playerEntity.birthDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="height">
              <Translate contentKey="sampleLabInternetApp.player.height">Height</Translate>
            </span>
          </dt>
          <dd>{playerEntity.height}</dd>
          <dt>
            <span id="weight">
              <Translate contentKey="sampleLabInternetApp.player.weight">Weight</Translate>
            </span>
          </dt>
          <dd>{playerEntity.weight}</dd>
          <dt>
            <span id="baskets">
              <Translate contentKey="sampleLabInternetApp.player.baskets">Baskets</Translate>
            </span>
          </dt>
          <dd>{playerEntity.baskets}</dd>
          <dt>
            <span id="assists">
              <Translate contentKey="sampleLabInternetApp.player.assists">Assists</Translate>
            </span>
          </dt>
          <dd>{playerEntity.assists}</dd>
          <dt>
            <Translate contentKey="sampleLabInternetApp.player.team">Team</Translate>
          </dt>
          <dd>{playerEntity.team ? playerEntity.team.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/player" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/player/${playerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PlayerDetail;
