import React from 'react';
import { connect } from 'react-redux';

import handleMovement from '../../utils/movement';

import { placePlayer } from '../../utils/generateMap';
import { MAP_W, MAP_H } from '../../config/constants';

import './player.styles.scss';

function Player(props) {
  const { player } = props;

  const { className, ...tile } = placePlayer(
    player.position[0],
    player.position[1],
    player.facing
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: tile.top,
        left: tile.left,
        width: tile.width,
        height: tile.height,
        zIndex: 4 * (player.position[0] * MAP_W + player.position[1]) + 2,
      }}
      className={className}
    />
  );
}

const mapStateToProps = ({ player }) => {
  return { player };
};

export default connect(mapStateToProps)(handleMovement(Player));
