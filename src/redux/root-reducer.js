import { combineReducers } from 'redux';

import player from './player-reducer';
import map from './map-reducer';
import world from './world-reducer';
import user from './user-reducer';
import blocks from './blocks-reducer';
import modals from './modals-reducer';
import debug from './debug-reducer';

const rootReducer = combineReducers({
  player,
  map,
  world,
  user,
  blocks,
  modals,
  debug,
});

export default rootReducer;
