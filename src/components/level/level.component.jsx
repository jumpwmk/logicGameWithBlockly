import React from 'react';
import { connect } from 'react-redux';

import './level.styles.scss';

function Level(props) {
  const { blocks } = props;
  return (
    <div className='level'>
      <div className='text'>Level 2</div>
    </div>
  );
}

const mapStateToProps = ({ blocks }) => {
  return { blocks };
};

export default connect(mapStateToProps)(Level);
