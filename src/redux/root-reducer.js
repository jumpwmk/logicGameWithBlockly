import { combineReducers } from 'redux';

import player from './player-reducer';
import map from './map-reducer';
import world from './world-reducer';
import user from './user-reducer';

const rootReducer = combineReducers({
  player,
  map,
  world,
  user
});

export default rootReducer;