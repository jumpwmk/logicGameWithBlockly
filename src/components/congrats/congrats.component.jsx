import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { store } from '../../redux/store';
import { fetchData } from '../../utils/fetchData';
import { updateUser } from '../../utils/updateUser';

import './congrats.styles.scss';
import blocksReducer from '../../redux/blocks-reducer';

Modal.setAppElement(document.getElementById('root'));

const customStyles = {
  overlay: {
    position: 'fixed',
    zIndex: 10000
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
    'border-radius': '10px'
  }
};

class Congrats extends React.Component {
  closeModal() {
    store.dispatch({
      type: 'CHANGE_CONFIG_MODAL',
      payload: { modalIsOpen: false }
    });
  }

  changeMap = () => {
    console.log(this.props.blocks);
    const { user, blocks } = this.props;

    store.dispatch({
      type: 'CHANGE_CONFIG_MODAL',
      payload: { modalIsOpen: false }
    });

    user.currentUser.level = user.currentUser.level + 1;

    store.dispatch({
      type: 'SET_CURRENT_USER',
      payload: { ...user.currentUser }
    });

    updateUser({ user: user.currentUser });

    blocks.workspace.clear();
    fetchData();
  };

  render() {
    const { congrats } = this.props;
    return (
      <Modal
        isOpen={congrats.modalIsOpen}
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

const mapStateToProps = ({ congrats, blocks, user }) => {
  return { congrats, blocks, user };
};

export default connect(mapStateToProps)(Congrats);
