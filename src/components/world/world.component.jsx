import React from 'react';
import { connect } from 'react-redux';

import Map from '../map/map.component';
import Player from '../player/player.component';
import Goal from '../goal/goal.component';
import Level from '../level/level.component';

import { tiles } from '../../config/tiles';
import { store } from '../../redux/store';

import './world.styles.scss';

function World(props) {
  // const { world } = props;
  // set map tiles for current map
  store.dispatch({
    type: 'ADD_TILES',
    payload: { ...tiles }
  });

  return (
    <div className='world'>
      <Map />
      <Player />
      <Goal />
      <Level />
    </div>
  );
}

const mapStateToProps = ({ world }) => {
  return { world };
};

export default connect(mapStateToProps)(World);
