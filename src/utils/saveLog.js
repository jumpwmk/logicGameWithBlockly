import axios from 'axios';

import { store } from '../redux/store';
import { withBackendUrl } from './withBackendUrl';

async function fetchData(data) {
  const path = '/logs/save-log';
  await axios
    .post(withBackendUrl(path), data)
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
      return;
    });
}

export function saveLog({ code, type, ...otherprops }) {
  let uid = store.getState().user.currentUser.id;
  let maps = store.getState().map.tiles;
  const timestamp = new Date();
  const data = { uid, maps, type, code, timestamp, ...otherprops };
  fetchData(data);
}
