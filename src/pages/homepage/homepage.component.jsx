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
import { connect } from 'react-redux';

import BlocklyComponent, { Block } from '../../components/blockly';

import BlocklyJS from 'blockly/javascript';

import '../../components/custom-blocks/custom-blocks';
import '../../components/custom-blocks/generator';

import World from '../../components/world/world.component';
// import BlocklyWorkspace from '../../components/blockly-workspace/blockly-workspace.component';
import { ReactComponent as Play } from '../../images/play.svg';
import { ReactComponent as Reset } from '../../images/reset.svg';

import animate from '../../utils/animate';
import { store } from '../../redux/store';
import { saveLog } from '../../utils/saveLog';
import { fetchData } from '../../utils/fetchData';
import Congrats from '../../components/congrats/congrats.component';
import { MAP_W, MAP_H } from '../../config/constants';

import './homepage.styles.scss';

class Homepage extends React.Component {
  componentDidMount() {
    this.simpleWorkspace.workspace.addChangeListener(e => {
      const { blocks } = this.props;
      let remainBlocks = this.simpleWorkspace.workspace.remainingCapacity();
      store.dispatch({
        type: 'CHANGE_CNT_BLOCKS',
        payload: { cntBlocks: blocks.maxBlocks - remainBlocks }
      });
      store.dispatch({
        type: 'CHANGE_WORKSPACE',
        payload: { workspace: this.simpleWorkspace.workspace }
      });
    });
  }

  changeMap = () => {
    let code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    this.simpleWorkspace.workspace.clear();
    saveLog({ code, type: 'change map' });
    fetchData();
  };

  generateCode = async () => {
    let code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    store.dispatch({
      type: 'CHANGE_STATE',
      payload: { state: false }
    });
    console.log('testtest');
    console.log(this.simpleWorkspace.workspace.remainingCapacity());
    const res = await animate(code, this.simpleWorkspace.workspace);
    // console.log(store.getState().blocks);
    saveLog({ code, type: 'run', res });
    if (res === 'SUCCESS') {
      store.dispatch({
        type: 'CHANGE_CONFIG_MODAL',
        payload: { modalIsOpen: true }
      });
    }
  };

  cancelCode = () => {
    let code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    let player = store.getState().player;
    this.simpleWorkspace.workspace.highlightBlock(null);

    store.dispatch({
      type: 'CHANGE_STATE',
      payload: { state: true }
    });

    store.dispatch({
      type: 'INIT_PLAYER',
      payload: { position: player.beginPosition, facing: player.beginFacing }
    });

    const { floatingobj } = store.getState().map;
    for (let i = 0; i < MAP_W; i++) {
      for (let j = 0; j < MAP_H; j++) {
        if (floatingobj[i][j] !== null) {
          floatingobj[i][j].visible = true;
        }
      }
    }

    store.dispatch({
      type: 'CHANGE_FLOATING_OBJ',
      payload: {
        floatingobj: floatingobj
      }
    });

    store.dispatch({
      type: 'COLLECT_GEMS',
      payload: {
        cntGems: 0
      }
    });

    saveLog({ code, type: 'run', res: 'INTERCEPTION' });
  };

  render() {
    const { blocks } = this.props;
    return (
      <div className='HomePage'>
        <div className='Game'>
          <div className='LeftPane'>
            <World />
            <div className='ConvertBtnPane'>
              {blocks.state ? (
                <button className='RunBtn' onClick={this.generateCode}>
                  <div>RUN PROGRAM</div>
                  <Play className='Play' />
                </button>
              ) : (
                <button className='CancelBtn' onClick={this.cancelCode}>
                  <div>RESET</div>
                  <Reset className='Reset' />
                </button>
              )}
              <button className='ChangeMapBtn' onClick={this.changeMap}>
                <div>CHANGE MAP</div>
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
              zoom={{
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
              }}
              trashcan={true}
              grid={{ spacing: 30, length: 3, colour: '#ccc', snap: true }}
              maxBlocks={blocks.maxBlocks}
            >
              <Block type='go_ahead' />
              <Block type='turn_right' />
              <Block type='turn_left' />
              <Block type='collect' />
              <Block type='for' />
              <Block type='while_inf' />
            </BlocklyComponent>
          </div>
        </div>
        <Congrats />
      </div>
    );
  }
}

const mapStateToProps = ({ blocks }) => {
  return { blocks };
};

export default connect(mapStateToProps)(Homepage);
