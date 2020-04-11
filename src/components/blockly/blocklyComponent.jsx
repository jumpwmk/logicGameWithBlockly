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

import { store } from '../../redux/store';

import Blockly from 'blockly/core';
import locale from 'blockly/msg/th';
import 'blockly/blocks';

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

    this.primaryWorkspace.addChangeListener((e) => {
      const { maxBlocks } = this.props;
      let remainBlocks = this.primaryWorkspace.remainingCapacity();

      store.dispatch({
        type: 'CHANGE_CNT_BLOCKS',
        payload: { cntBlocks: maxBlocks - remainBlocks },
      });
    });

    store.dispatch({
      type: 'CHANGE_WORKSPACE',
      payload: { workspace: this.primaryWorkspace },
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    console.log(this.props);
    if (this.props.children) {
      return nextProps.children.length !== this.props.children.length;
    }
    if (this.props.maxBlocks) {
      return nextProps.maxBlocks !== this.props.maxBlocks;
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

export default BlocklyComponent;
