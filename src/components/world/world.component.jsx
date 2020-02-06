import React from 'react';
import { connect } from 'react-redux';

import Map from '../map/map.component';
import Player from '../player/player.component';

import { tiles } from '../../config/tiles';
import store from '../../config/store';

function World(props) {
  // const { world } = props;
  // set map tiles for current map
  store.dispatch({
    type: 'ADD_TILES',
    payload: { tiles }
  });

  return (
    <div
      style={{
        width: '520px',
        height: '520px',
        margin: '0px 50px 30px 50px',
        position: 'relative'
      }}
    >
      <Map />
      <Player />
    </div>
  );
}

const mapStateToProps = ({ world }) => {
  return { world };
};

export default connect(mapStateToProps)(World);
