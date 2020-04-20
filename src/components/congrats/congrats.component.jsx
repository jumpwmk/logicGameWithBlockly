import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Blockly from 'blockly/core';

import { store } from '../../redux/store';
import { fetchData } from '../../utils/fetchData';
import { updateUser } from '../../utils/updateUser';

import './congrats.styles.scss';

Modal.setAppElement(document.getElementById('root'));

const customStyles = {
  overlay: {
    position: 'fixed',
    zIndex: 10000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '180px',
    'border-radius': '10px',
  },
};

class Congrats extends React.Component {
  closeModal() {
    store.dispatch({
      type: 'CHANGE_CONFIG_MODAL',
      payload: { congrats: false },
    });
  }

  changeMap = async () => {
    const { user } = this.props;

    store.dispatch({
      type: 'CHANGE_CONFIG_MODAL',
      payload: { congrats: false },
    });

    store.dispatch({
      type: 'INIT_DEBUG',
      payload: { status: false, commands: [], blocks: [], res: false, idx: 0 },
    });

    user.currentUser.level = user.currentUser.level + 1;

    store.dispatch({
      type: 'SET_CURRENT_USER',
      payload: { ...user.currentUser },
    });

    updateUser({ user: user.currentUser });

    await fetchData();
  };

  render() {
    const { modals } = this.props;
    return (
      <Modal
        isOpen={modals.congrats}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='header-modal'></div>
        <h1 className='congrats-text'>เย่~!</h1>
        <h4 className='next-state'>พร้อมหรือยังกับด่านถัดไป?</h4>
        <div className='btn-pane'>
          <button className='btn ok' onClick={this.changeMap}>
            ตกลง
          </button>
          <button className='btn cancel' onClick={this.closeModal}>
            ยกเลิก
          </button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({ modals, blocks, user }) => {
  return { modals, blocks, user };
};

export default connect(mapStateToProps)(Congrats);
