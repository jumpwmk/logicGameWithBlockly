import React from 'react';
import { connect } from 'react-redux';

import './max-blocks.styles.scss';

function MaxBlocks(props) {
  const { blocks } = props;
  // set map tiles for current map
  return (
    <div className='maxBlocks'>
      <div className='text'>5 / {blocks.maxBlocks} คำสั่ง</div>
    </div>
  );
}

const mapStateToProps = ({ blocks }) => {
  return { blocks };
};

export default connect(mapStateToProps)(MaxBlocks);
