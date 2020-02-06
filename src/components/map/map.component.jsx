import React from 'react';
import { connect } from 'react-redux';

import { SPRITE_SIZE } from '../../config/constants';
import { FINAL } from '../../config/tile';

import './map.styles.scss';

function getTileSprite(type) {
  type = type & 15;
  switch (type) {
    case 0:
      return 'zero';
    case 1:
      return 'u';
    case 2:
      return 'r';
    case 3:
      return 'ur';
    case 4:
      return 'd';
    case 5:
      return 'ud';
    case 6:
      return 'rd';
    case 7:
      return 'urd';
    case 8:
      return 'l';
    case 9:
      return 'ul';
    case 10:
      return 'rl';
    case 11:
      return 'url';
    case 12:
      return 'dl';
    case 13:
      return 'udl';
    case 14:
      return 'rdl';
    case 15:
      return 'urdl';
    default:
  }
}

function getTileFinal(type) {
  if (type & FINAL) {
    return true;
  }
  return false;
}

function MapTile(props) {
  if (getTileFinal(props.tile)) {
    return <div className={`tile ${getTileSprite(props.tile)} final`} />;
  } else {
    return <div className={`tile ${getTileSprite(props.tile)}`} />;
  }
}

function MapRow(props) {
  return (
    <div
      className='row'
      style={{
        height: SPRITE_SIZE
      }}
    >
      {props.tiles.map(tile => (
        <MapTile tile={tile} />
      ))}
    </div>
  );
}

function Map(props) {
  const { map } = props;

  return (
    <div style={{ width: '520px', height: '520px', border: '4px solid #000' }}>
      {map.tiles.map(row => (
        <MapRow tiles={row} />
      ))}
    </div>
  );
}

const mapStateToProps = ({ map }) => {
  return { map };
};

export default connect(mapStateToProps)(Map);
