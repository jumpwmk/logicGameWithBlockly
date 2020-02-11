import axios from 'axios';

import { withBackendUrl } from './withBackendUrl';
import { store } from '../redux/store';

export async function fetchData() {
  const path = '/maps/get-map';
  const data = {};
  console.log(withBackendUrl(path));
  await axios
    .post(withBackendUrl(path), data)
    .then(response => {
      const { tiles, player, blocks } = response.data;
      store.dispatch({
        type: 'ADD_TILES',
        payload: { ...tiles }
      });
      store.dispatch({
        type: 'INIT_PLAYER',
        payload: { ...player }
      });
      store.dispatch({
        type: 'INIT_BLOCKS',
        payload: { state: true, ...blocks }
      });
    })
    .catch(function(error) {
      console.log(error);
      return;
    });
  console.log(store.getState().blocks);
}
