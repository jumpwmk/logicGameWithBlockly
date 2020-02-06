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
 * @fileoverview Define generation methods for custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on generating code:
// https://developers.google.com/blockly/guides/create-custom-blocks/generating-code

import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['go_ahead'] = function(block) {
  // TODO: Assemble JavaScript into code letiable.
  console.log(block);
  let code = block.id + ' moveForward' + '\n';
  return code;
};

Blockly.JavaScript['turn_right'] = function(block) {
  // TODO: Assemble JavaScript into code letiable.
  let code = block.id + ' turnRight' + '\n';
  return code;
};

Blockly.JavaScript['turn_left'] = function(block) {
  // TODO: Assemble JavaScript into code letiable.
  let code = block.id + ' turnLeft' + '\n';
  return code;
};

Blockly.JavaScript['number'] = function(block) {
  let number_number = block.getFieldValue('number');
  // TODO: Assemble JavaScript into code letiable.
  let code = number_number;
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.JavaScript['for'] = function(block) {
  let number_loop = block.getFieldValue('loop');
  let statements_inner_for = Blockly.JavaScript.statementToCode(
    block,
    'inner for'
  );
  // TODO: Assemble JavaScript into code letiable.
  let code =
    block.id +
    ' for ' +
    number_loop +
    '\n' +
    block.id +
    ' begin\n' +
    statements_inner_for +
    block.id +
    ' end\n';
  return code;
};
