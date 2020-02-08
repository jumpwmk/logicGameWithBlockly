/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Main React component that includes the Blockly component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from 'react';

import BlocklyComponent, { Block } from '../../Blockly';

import BlocklyJS from 'blockly/javascript';
// import Blockly from 'blockly/blockly';

import '../../blocks/customblocks';
import '../../generator/generator';

import World from '../../components/world/world.component';
import { ReactComponent as Play } from '../../images/play.svg';

import animate from '../../utils/animate';

/// test modal
import Modal from 'react-modal';

import './homepage.styles.scss';

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
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement(document.getElementById('root'));

///

class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  generateCode = () => {
    let code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    animate(code, this.simpleWorkspace.workspace);
  };

  render() {
    // Blockly.inject({ maxBlocks: 5, trashcan: true });
    return (
      <div className='HomePage'>
        <div className='Game'>
          <div className='LeftPane'>
            <World />
            <div className='ConvertBtnPane'>
              <button className='ConvertBtn' onClick={this.generateCode}>
                <div>RUN</div>
                <Play className='Play' />
              </button>
            </div>
          </div>
          <div className='RightPane'>
            <BlocklyComponent
              ref={e => (this.simpleWorkspace = e)}
              readOnly={false}
              move={{
                scrollbars: false,
                drag: true,
                wheel: true
              }}
            >
              <Block type='go_ahead' />
              <Block type='turn_right' />
              <Block type='turn_left' />
              <Block type='for' />
              <Block type='while_inf' />
            </BlocklyComponent>
          </div>
        </div>
        <div>
          <button onClick={this.openModal}>Open Modal</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel='Example Modal'
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>
            <button onClick={this.closeModal}>close</button>
            <div>I am a modal</div>
            <form>
              <input />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Homepage;
