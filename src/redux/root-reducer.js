import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import player from './player-reducer';
import map from './map-reducer';
import world from './world-reducer';
import user from './user-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['player', 'map', 'world']
};

const rootReducer = combineReducers({
  player,
  map,
  world,
  user
});

export default persistReducer(persistConfig, rootReducer);
