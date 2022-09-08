import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITeam } from 'app/shared/model/team.model';
import { getEntities as getTeams } from 'app/entities/team/team.reducer';
import { IPlayer } from 'app/shared/model/player.model';
import { getEntity, updateEntity, createEntity, reset } from './player.reducer';

export const PlayerUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const teams = useAppSelector(state => state.team.entities);
  const playerEntity = useAppSelector(state => state.player.entity);
  const loading = useAppSelector(state => state.player.loading);
  const updating = useAppSelector(state => state.player.updating);
  const updateSuccess = useAppSelector(state => state.player.updateSuccess);

  const handleClose = () => {
    navigate('/player');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTeams({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...playerEntity,
      ...values,
      team: teams.find(it => it.id.toString() === values.team.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...playerEntity,
          team: playerEntity?.team?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sampleLabInternetApp.player.home.createOrEditLabel" data-cy="PlayerCreateUpdateHeading">
            <Translate contentKey="sampleLabInternetApp.player.home.createOrEditLabel">Create or edit a Player</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="player-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('sampleLabInternetApp.player.name')}
                id="player-name"
                name="name"
                data-cy="name"
                type="text"
              />
              <ValidatedField
                label={translate('sampleLabInternetApp.player.birthDate')}
                id="player-birthDate"
                name="birthDate"
                data-cy="birthDate"
                type="date"
              />
              <ValidatedField
                label={translate('sampleLabInternetApp.player.height')}
                id="player-height"
                name="height"
                data-cy="height"
                type="text"
              />
              <ValidatedField
                label={translate('sampleLabInternetApp.player.weight')}
                id="player-weight"
                name="weight"
                data-cy="weight"
                type="text"
              />
              <ValidatedField
                label={translate('sampleLabInternetApp.player.baskets')}
                id="player-baskets"
                name="baskets"
                data-cy="baskets"
                type="text"
              />
              <ValidatedField
                label={translate('sampleLabInternetApp.player.assists')}
                id="player-assists"
                name="assists"
                data-cy="assists"
                type="text"
              />
              <ValidatedField
                id="player-team"
                name="team"
                data-cy="team"
                label={translate('sampleLabInternetApp.player.team')}
                type="select"
              >
                <option value="" key="0" />
                {teams
                  ? teams.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/player" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PlayerUpdate;
