import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as Gem } from '../../images/floatingobj-gem-1.svg';
import { ReactComponent as EndPortal } from '../../images/endportal.svg';

import './goal.styles.scss';

function Gems(props) {
  const { blocks } = props;
  if (blocks.maxGems === 0) {
    return null;
  } else if (blocks.cntGems === blocks.maxGems) {
    return (
      <div className='text complete'>
        เก็บเพชรแดง {blocks.cntGems} / {blocks.maxGems}
      </div>
    );
  } else {
    return (
      <div className='text'>
        เก็บเพชรแดง {blocks.cntGems} / {blocks.maxGems}
      </div>
    );
  }
}

function MaxBlocks(props) {
  const { blocks } = props;
  if (true) {
    return (
      <div className='text complete'>
        {blocks.cntBlocks - 1} / {blocks.maxBlocks - 1} บล็อก
      </div>
    );
  } else {
    return <div className='text'>0 / {blocks.maxBlocks} บล็อก</div>;
  }
}

function Goal(props) {
  const { blocks } = props;
  return (
    <div className='goal'>
      <div className='text-header'>เป้าหมาย</div>
      <Gems blocks={blocks} />
      <MaxBlocks blocks={blocks} />
    </div>
  );
}

const mapStateToProps = ({ blocks }) => {
  return { blocks };
};

export default connect(mapStateToProps)(Goal);
