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
import { ReactComponent as Play } from '../../images/play.svg';
import { ReactComponent as Reset } from '../../images/reset.svg';

import firebase from 'firebase/app';

import animate from '../../utils/animate';
import animateOneAction from '../../utils/animateOneAction';
import { store } from '../../redux/store';
import { saveLog } from '../../utils/saveLog';
import { fetchData } from '../../utils/fetchData';
import Congrats from '../../components/congrats/congrats.component';
import ShowSolution from '../../components/showSolution/showSolution.component';
import { MAP_W, MAP_H } from '../../config/constants';
import parsingMovement from '../../utils/parsingMovement';
import { Redirect } from 'react-router-dom';

import './homepage.styles.scss';

class Homepage extends React.Component {
  componentDidMount() {
    if (this.simpleWorkspace) {
      this.simpleWorkspace.workspace.addChangeListener((e) => {
        const { blocks } = this.props;
        let remainBlocks = this.simpleWorkspace.workspace.remainingCapacity();
        store.dispatch({
          type: 'CHANGE_CNT_BLOCKS',
          payload: { cntBlocks: blocks.maxBlocks - remainBlocks },
        });
        store.dispatch({
          type: 'CHANGE_WORKSPACE',
          payload: { workspace: this.simpleWorkspace.workspace },
        });
      });
    }
  }

  changeMap = async () => {
    let code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    await saveLog({ code, type: 'change map' });

    this.simpleWorkspace.workspace.clear();

    await fetchData();

    store.dispatch({
      type: 'INIT_DEBUG',
      payload: { status: false, commands: [], blocks: [], res: false, idx: 0 },
    });
  };

  showSolution = async () => {
    let code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    saveLog({ code, type: 'show solution' });

    store.dispatch({
      type: 'INIT_DEBUG',
      payload: { status: false, commands: [], blocks: [], res: false, idx: 0 },
    });

    store.dispatch({
      type: 'CHANGE_CONFIG_MODAL',
      payload: { solution: true },
    });
  };

  generateCode = async () => {
    let code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    store.dispatch({
      type: 'CHANGE_STATE',
      payload: { state: false },
    });
    const res = await animate(code, this.simpleWorkspace.workspace);
    saveLog({ code, type: 'run', res });
    console.log(res);
    store.dispatch({
      type: 'CHANGE_CONFIG_MODAL',
      payload: { congrats: true, res: res, code: code },
    });
  };

  cancelCode = () => {
    let code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    let player = store.getState().player;
    this.simpleWorkspace.workspace.highlightBlock(null);

    store.dispatch({
      type: 'CHANGE_STATE',
      payload: { state: true },
    });

    store.dispatch({
      type: 'INIT_DEBUG',
      payload: { status: false, commands: [], blocks: [], res: false, idx: 0 },
    });

    store.dispatch({
      type: 'INIT_PLAYER',
      payload: { position: player.beginPosition, facing: player.beginFacing },
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
        floatingobj: floatingobj,
      },
    });

    store.dispatch({
      type: 'COLLECT_GEMS',
      payload: {
        cntGems: 0,
      },
    });

    saveLog({ code, type: 'run', res: 'INTERCEPTION' });
  };

  debug = async () => {
    let code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    const { commands, blocks, res } = await parsingMovement(code);
    saveLog({ code, type: 'debug', res });
    let idx = 0;
    const command = commands[idx];
    const block = blocks[idx];

    animateOneAction({
      command,
      block,
      workspace: this.simpleWorkspace.workspace,
    });

    if (commands.length === 1) {
      store.dispatch({
        type: 'CHANGE_CONFIG_MODAL',
        payload: { congrats: true, res: res, code: code },
      });
      store.dispatch({
        type: 'INIT_DEBUG',
        payload: {
          status: false,
          commands: [],
          blocks: [],
          res: false,
          idx: 0,
        },
      });
    } else {
      store.dispatch({
        type: 'INIT_DEBUG',
        payload: { status: true, commands, blocks, res, idx: 1 },
      });
    }
  };

  nextAction = async () => {
    const { debug } = this.props;
    const { commands, blocks, res, idx } = debug;

    const command = commands[idx];
    const block = blocks[idx];

    animateOneAction({
      command,
      block,
      workspace: this.simpleWorkspace.workspace,
    });

    if (commands.length === idx + 2) {
      let code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
      store.dispatch({
        type: 'CHANGE_CONFIG_MODAL',
        payload: { congrats: true, res: res, code: code },
      });
    } else if (commands.length === idx + 2) {
    }
    store.dispatch({
      type: 'CHANGE_IDX_DEBUG',
      payload: { idx: debug.idx + 1 },
    });
  };

  render() {
    const { blocks, debug } = this.props;
    if (firebase.auth().currentUser === null) {
      return <Redirect to={'/'} />;
    }
    return (
      <div className='HomePage'>
        <div className='Game'>
          <div className='LeftPane'>
            <World />
            <div className='ConvertBtnPane'>
              {debug.status ? (
                <button className='NextBtn' onClick={this.nextAction}>
                  <div>NEXT</div>
                  <Play className='Play' />
                </button>
              ) : null}
              {blocks.state && !debug.status ? (
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
              {blocks.state && !debug.status ? (
                <button className='ChangeMapBtn' onClick={this.changeMap}>
                  <div>CHANGE MAP</div>
                </button>
              ) : null}
              {blocks.state && !debug.status ? (
                <button className='ShowSolutionBtn' onClick={this.showSolution}>
                  <div>SOLUTION</div>
                </button>
              ) : null}
              {blocks.state && !debug.status ? (
                <button className='DebugBtn' onClick={this.debug}>
                  <div>DEBUG</div>
                </button>
              ) : null}
            </div>
          </div>
          <div className='RightPane'>
            <BlocklyComponent
              ref={(e) => (this.simpleWorkspace = e)}
              readOnly={false}
              move={{
                scrollbars: false,
                drag: true,
                wheel: true,
              }}
              zoom={{
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2,
              }}
              trashcan={true}
              grid={{ spacing: 30, length: 3, colour: '#ccc', snap: true }}
              maxBlocks={blocks.maxBlocks}
            >
              {blocks.command_blocks
                ? blocks.command_blocks.map((command) => (
                    <Block type={command} id={command} />
                  ))
                : null}
            </BlocklyComponent>
          </div>
        </div>
        <Congrats />
        <ShowSolution />
      </div>
    );
  }
}

const mapStateToProps = ({ blocks, debug }) => {
  return { blocks, debug };
};

export default connect(mapStateToProps)(Homepage);
