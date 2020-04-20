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
 * @fileoverview Blockly React Component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from 'react';

import './blocklyComponent.css';

import { connect } from 'react-redux';
import Blockly from 'blockly/core';
import locale from 'blockly/msg/th';
import 'blockly/blocks';

import { store } from '../../redux/store';

Blockly.setLocale(locale);

class BlocklyComponent extends React.Component {
  componentDidMount() {
    const { children, ...rest } = this.props;
    this.primaryWorkspace = Blockly.inject(this.blocklyDiv, {
      toolbox: this.toolbox,
      ...rest,
    });

    store.dispatch({
      type: 'CHANGE_WORKSPACE',
      payload: { workspace: this.primaryWorkspace },
    });
  }

  componentDidUpdate() {
    const { children, ...rest } = this.props;

    this.primaryWorkspace.dispose();

    this.primaryWorkspace = Blockly.inject(this.blocklyDiv, {
      toolbox: this.toolbox,
      ...rest,
    });

    var xml = Blockly.Xml.textToDom(
      '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="begin" id="begin" x="40" y="40"></block></xml>'
    );
    Blockly.Xml.domToWorkspace(xml, this.primaryWorkspace);

    store.dispatch({
      type: 'CHANGE_WORKSPACE',
      payload: { workspace: this.primaryWorkspace },
    });

    this.primaryWorkspace.addChangeListener((e) => {
      const { maxBlocks } = this.props;
      let remainBlocks = this.primaryWorkspace.remainingCapacity();

      store.dispatch({
        type: 'CHANGE_CNT_BLOCKS',
        payload: { cntBlocks: maxBlocks - remainBlocks },
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (store.getState().blocks.status) {
      store.dispatch({
        type: 'CHANGE_STATUS_BLOCKS',
        payload: { status: false },
      });
      return true;
    }
    if (this.props.children) {
      if (nextProps.children.length !== this.props.children.length) return true;
    }
    if (this.props.maxBlocks) {
      if (nextProps.maxBlocks !== this.props.maxBlocks) return true;
    }

    if (this.props.children && nextProps.children) {
      let tmp = {};
      let chk = false;
      for (let i = 0; i < this.props.children.length; i++) {
        tmp[this.props.children[i].props.type] = true;
      }
      for (let i = 0; i < nextProps.children.length; i++) {
        if (!(nextProps.children[0].props.type in tmp)) {
          chk = true;
        }
      }
      if (chk) return true;
    }

    return false;
  }

  get workspace() {
    return this.primaryWorkspace;
  }

  setXml(xml) {
    Blockly.Xml.domToWorkspace(
      Blockly.Xml.textToDom(xml),
      this.primaryWorkspace
    );
  }

  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <div ref={(e) => (this.blocklyDiv = e)} id='blocklyDiv' />
        <xml
          xmlns='https://developers.google.com/blockly/xml'
          is='blockly'
          style={{ display: 'none' }}
          ref={(toolbox) => {
            this.toolbox = toolbox;
          }}
        >
          {children}
        </xml>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = ({ blocks }) => {
//   return { blocks };
// };

// export default connect(mapStateToProps)(BlocklyComponent);

export default BlocklyComponent;
