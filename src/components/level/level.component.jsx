import React from 'react';
import { connect } from 'react-redux';

import './level.styles.scss';

function Level(props) {
  const { user } = props;
  console.log(user);
  return (
    <div className='level'>
      <div className='text'>
        Level {user.currentUser ? user.currentUser.level : null}
      </div>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(Level);
