import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { store } from '../../redux/store';
import { fetchData } from '../../utils/fetchData';
import { generateCodeFromObj } from '../../utils/generateCode';

import './showSolution.styles.scss';

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
    height: '500px',
    'border-radius': '10px',
  },
};

class ShowSolution extends React.Component {
  changeMap = async () => {
    console.log(this.props.blocks);
    const { blocks } = this.props;

    store.dispatch({
      type: 'CHANGE_CONFIG_MODAL',
      payload: { solution: false },
    });

    await fetchData();
    blocks.workspace.clear();
  };

  render() {
    const { modals } = this.props;
    const str = generateCodeFromObj({
      commands: store.getState().blocks.commands,
      indent: 0,
    });
    return (
      <Modal
        isOpen={modals.solution}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='header-modal'></div>
        <h1 className='congrats-text'>เฉลย</h1>
        <pre className='next-state'>{str}</pre>
        <div className='btn-pane'>
          <button className='btn ok' onClick={this.changeMap}>
            ตกลง
          </button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({ modals, blocks, user }) => {
  return { modals, blocks, user };
};

export default connect(mapStateToProps)(ShowSolution);
