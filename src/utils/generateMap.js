import {
  STEP_X,
  STEP_Y,
  MAP_W,
  PLATFORM_WALL_H,
  TILE_W,
  TILE_H,
  PLAYER_H,
  PLAYER_W,
  FLOATING_OBJ_H
} from '../config/constants';

export function calcTilePos(x, y) {
  let top = 50 + x * STEP_Y + y * STEP_Y;
  let left = 7 + (MAP_W - x - 1) * STEP_X + y * STEP_X;
  return { top: top, left: left };
}

export function placePlatformTile(x, y) {
  const img = (x + y) % 2 ? 'tile1' : 'tile2';
  const pos = calcTilePos(x, y);
  let tile = {
    top: pos.top + 'px',
    left: pos.left + 'px',
    width: TILE_W + 'px',
    height: TILE_H + 'px',
    position: 'absolute',
    className: img
  };
  return tile;
}

export function placePlatformTileOverlay(obj) {
  const { x, y, type } = obj;
  const img = 'tileoverlay-' + type;
  const pos = calcTilePos(x, y);
  let tile = {
    top: pos.top + 'px',
    left: pos.left + 'px',
    width: TILE_W + 'px',
    height: TILE_H + 'px',
    position: 'absolute',
    className: img
  };
  return tile;
}

export function placeWall(x, y) {
  let pos = calcTilePos(x, y);
  let top = pos.top - (PLATFORM_WALL_H - TILE_H) + 'px';
  let left = pos.left + 'px';
  let wall = {
    top: top,
    left: left,
    width: TILE_W + 'px',
    height: PLATFORM_WALL_H + 'px'
  };
  return wall;
}

export function placeEndPortal(x, y) {
  let src = 'endportal';
  let pos = calcTilePos(x, y);
  let top = pos.top + 'px';
  let left = pos.left + 'px';
  let tile = {
    top: top,
    left: left,
    width: TILE_W + 'px',
    height: TILE_H + 'px',
    className: src
  };
  return tile;
}

export function placePlayer(x, y, facing, map) {
  let src = 'player-' + facing;
  let pos = calcTilePos(x, y);
  let top = pos.top - (PLAYER_H - TILE_H) - TILE_H / 4 + 'px';
  let left = 5 + pos.left + (TILE_W - PLAYER_W) / 2 + 'px';
  let player = {
    top: top,
    left: left,
    width: PLAYER_W + 'px',
    height: PLAYER_H + 'px',
    className: src
  };
  return player;
}

export function placeFloatingObj(x, y, objtype, objvari, position) {
  let src = 'floatingobj-' + objtype + '-' + objvari;
  let pos = calcTilePos(x, y);
  let top;
  if (position[0] === x && position[1] === y) {
    top = pos.top - (FLOATING_OBJ_H - TILE_H) - 40 + 'px';
  } else {
    top = pos.top - (FLOATING_OBJ_H - TILE_H) + 'px';
  }
  let left = pos.left + 'px';
  let obj_ret = {
    top: top,
    left: left,
    width: TILE_W + 'px',
    height: FLOATING_OBJ_H + 'px',
    className: src + ' with-player'
  };
  return obj_ret;
}
