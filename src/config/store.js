import { createStore, combineReducers } from 'redux';

import player from '../components/player/reducer';
import map from '../components/map/reducer';
import world from '../components/world/reducer';

const rootReducer = combineReducers({
  player,
  map,
  world
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
