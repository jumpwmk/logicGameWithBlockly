import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { store } from '../../redux/store';
import { fetchData } from '../../utils/fetchData';
import { updateUser } from '../../utils/updateUser';
import { generateCodeFromCode } from '../../utils/generateCode';

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
  };

  render() {
    const { modals } = this.props;

    let code = generateCodeFromCode(modals.code);

    return (
      <Modal
        isOpen={modals.congrats}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='header-modal'></div>
        {modals.res === 'SUCCESS' ? (
          <h1 className='congrats-text'>เย่~!</h1>
        ) : modals.res === 'FAILURE' ? (
          <h1 className='congrats-text'>FAILURE</h1>
        ) : modals.res === 'FAIL_MOVE' ? (
          <h1 className='congrats-text'>FAIL_MOVE</h1>
        ) : modals.res === 'FAIL_COLLECT' ? (
          <h1 className='congrats-text'>FAIL_COLLECT</h1>
        ) : modals.res === 'TIMEOUT' ? (
          <h1 className='congrats-text'>TIMEOUT</h1>
        ) : null}
        <pre className='next-state'>{code}</pre>
        {modals.res === 'SUCCESS' ? (
          <h4 className='next-state'>พร้อมหรือยังกับด่านถัดไป?</h4>
        ) : (
          <h4 className='next-state'>ลองอีกครั้งนะ</h4>
        )}
        <div className='btn-pane'>
          {modals.res === 'SUCCESS' ? (
            <button className='btn ok' onClick={this.changeMap}>
              ตกลง
            </button>
          ) : null}
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
