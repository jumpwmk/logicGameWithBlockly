import React from 'react';
import { connect } from 'react-redux';

import {
  placePlatformTile,
  placeWall,
  placeEndPortal,
  placeFloatingObj,
  placePlatformTileOverlay
} from '../../utils/generateMap';

import { MAP_W, MAP_H } from '../../config/constants';

import './map.styles.scss';

function MapTile(props) {
  if (!props.tile) return null;
  const { className, ...tile } = placePlatformTile(
    props.index_i,
    props.index_j
  );
  return (
    <div
      id={props.index_i * MAP_W + props.index_j}
      style={{
        position: 'absolute',
        top: tile.top,
        left: tile.left,
        width: tile.width,
        height: tile.height
      }}
      className={className}
    />
  );
}

function MapTileOverlay(props) {
  if (!props.tile) return null;
  const { className, ...tile } = placePlatformTileOverlay({
    x: props.index_i,
    y: props.index_j,
    type: props.tile.overlaytype
  });
  return (
    <div
      id={props.index_i * MAP_W + props.index_j}
      style={{
        position: 'absolute',
        top: tile.top,
        left: tile.left,
        width: tile.width,
        height: tile.height
      }}
      className={className}
    />
  );
}

function MapWall(props) {
  if (props.wall === null || props.wall === undefined) return null;
  const { className, ...wall } = placeWall(props.index_i, props.index_j);
  return (
    <React.Fragment>
      {props.wall.yf !== undefined ? (
        <div
          id={props.index_i * MAP_W + props.index_j}
          style={{
            position: 'absolute',
            top: wall.top,
            left: wall.left,
            width: wall.width,
            height: wall.height
          }}
          className='platformwall-yf-1'
        />
      ) : null}
      {props.wall.yb !== undefined ? (
        <div
          id={props.index_i * MAP_W + props.index_j}
          style={{
            position: 'absolute',
            top: wall.top,
            left: wall.left,
            width: wall.width,
            height: wall.height
          }}
          className='platformwall-yb-1'
        />
      ) : null}
      {props.wall.xf !== undefined ? (
        <div
          id={props.index_i * MAP_W + props.index_j}
          style={{
            position: 'absolute',
            top: wall.top,
            left: wall.left,
            width: wall.width,
            height: wall.height
          }}
          className='platformwall-xf-1'
        />
      ) : null}
      {props.wall.xb !== undefined ? (
        <div
          id={props.index_i * MAP_W + props.index_j}
          style={{
            position: 'absolute',
            top: wall.top,
            left: wall.left,
            width: wall.width,
            height: wall.height
          }}
          className='platformwall-xb-1'
        />
      ) : null}
    </React.Fragment>
  );
}

function MapFloatingObj(props) {
  if (!props.obj) return null;
  if (!props.obj.visible) return null;
  const { className, ...obj } = placeFloatingObj(
    props.index_i,
    props.index_j,
    props.obj.objtype,
    props.obj.objvari,
    props.position
  );
  return (
    <div
      id={props.index_i * MAP_W + props.index_j}
      style={{
        position: 'absolute',
        top: obj.top,
        left: obj.left,
        width: obj.width,
        height: obj.height
      }}
      className={className}
    />
  );
}

function MapEndPortal({ x, y }) {
  const { className, ...tile } = placeEndPortal(x, y);
  return (
    <div
      id={x * MAP_W + y}
      style={{
        position: 'absolute',
        top: tile.top,
        left: tile.left,
        width: tile.width,
        height: tile.height
      }}
      className={className}
    />
  );
}

function Map(props) {
  const { map, player } = props;

  return (
    <div className='map'>
      {map.platform.map((row, index_i) =>
        row.map((tile, index_j) => (
          <MapTile tile={tile} index_i={index_i} index_j={index_j} />
        ))
      )}
      {map.tileoverlay.map((row, index_i) =>
        row.map((tile, index_j) => (
          <MapTileOverlay tile={tile} index_i={index_i} index_j={index_j} />
        ))
      )}
      {map.wall.map((row, index_i) =>
        row.map((wall, index_j) => (
          <MapWall wall={wall} index_i={index_i} index_j={index_j} />
        ))
      )}
      {map.floatingobj.map((row, index_i) =>
        row.map((obj, index_j) => (
          <MapFloatingObj
            obj={obj}
            index_i={index_i}
            index_j={index_j}
            position={player.position}
          />
        ))
      )}
      {MapEndPortal(map.end)}
    </div>
  );
}

const mapStateToProps = ({ map, player }) => {
  return { map, player };
};

export default connect(mapStateToProps)(Map);
