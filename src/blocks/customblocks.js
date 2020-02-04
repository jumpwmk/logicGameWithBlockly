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
 * @fileoverview Define custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on defining blocks:
// https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks

import * as Blockly from 'blockly/core';

// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BlocklyReactField';
import '../fields/DateField';

var testReactField = {
  type: 'test_react_field',
  message0: 'custom field %1',
  args0: [
    {
      type: 'field_react_component',
      name: 'FIELD',
      text: 'Click me'
    }
  ],
  previousStatement: null,
  nextStatement: null
};

Blockly.Blocks['test_react_field'] = {
  init: function() {
    this.jsonInit(testReactField);
    this.setStyle('loop_blocks');
  }
};

var reactDateField = {
  type: 'test_react_date_field',
  message0: 'date field %1',
  args0: [
    {
      type: 'field_react_date',
      name: 'DATE',
      date: '01/01/2020'
    }
  ],
  previousStatement: null,
  nextStatement: null
};

Blockly.Blocks['test_react_date_field'] = {
  init: function() {
    this.jsonInit(reactDateField);
    this.setStyle('loop_blocks');
  }
};

// go ahead

Blockly.Blocks['go_ahead'] = {
  init: function() {
    this.appendDummyInput().appendField('ตรงไป');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl(
      'https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#c477mo'
    );
  }
};

Blockly.JavaScript['go_ahead'] = function(block) {
  // TODO: Assemble JavaScript into code letiable.
  let code = "moveForward('block_id_" + block.id + "');\n";
  return code;
};

// for loop
Blockly.Blocks['for'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('วน')
      .appendField(new Blockly.FieldNumber(0), 'loop')
      .appendField('ครั้ง');
    this.appendStatementInput('inner for')
      .setCheck(null)
      .appendField('ทำ');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl(
      'https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#8u6byt'
    );
  }
};

Blockly.JavaScript['for'] = function(block) {
  let number_loop = block.getFieldValue('loop');
  let statements_inner_for = Blockly.JavaScript.statementToCode(
    block,
    'inner for'
  );
  // TODO: Assemble JavaScript into code letiable.
  let code = 'for i in range' + number_loop + ':\n' + statements_inner_for;
  return code;
};

// number
Blockly.Blocks['number'] = {
  init: function() {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldNumber(0, 0, 100), 'number');
    this.setOutput(true, 'Number');
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl(
      'https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#wdgtsd'
    );
  }
};

Blockly.JavaScript['number'] = function(block) {
  let number_number = block.getFieldValue('number');
  // TODO: Assemble JavaScript into code letiable.
  let code = number_number;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

// turn right
Blockly.Blocks['turn_right'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('หมุนขวา')
      .appendField(
        new Blockly.FieldImage(
          'https://img.icons8.com/android/24/000000/rotate-right.png',
          15,
          15,
          { alt: 'right', flipRtl: 'FALSE' }
        )
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl(
      'https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#f2on25'
    );
  }
};

Blockly.JavaScript['turn_right'] = function(block) {
  // TODO: Assemble JavaScript into code letiable.
  let code = 'turnRight();\n';
  return code;
};

// turn left
Blockly.Blocks['turn_left'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('หมุนซ้าย')
      .appendField(
        new Blockly.FieldImage(
          'https://img.icons8.com/android/24/000000/rotate-left.png',
          15,
          15,
          { alt: 'left', flipRtl: 'FALSE' }
        )
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl(
      'https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#y2b6c5'
    );
  }
};

Blockly.JavaScript['turn_left'] = function(block) {
  // TODO: Assemble JavaScript into code letiable.
  let code = 'turnLeft();\n';
  return code;
};
