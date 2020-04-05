import axios from 'axios';

import { withBackendUrl } from './withBackendUrl';

async function fetchData(data) {
  const path = '/logs/update-user';
  console.log(withBackendUrl(path));
  await axios
    .post(withBackendUrl(path), data)
    .then(response => {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
      return;
    });
}

export function updateUser({ user }) {
  const data = { user };
  fetchData(data);
}
