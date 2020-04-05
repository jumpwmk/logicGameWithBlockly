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

// for inf
Blockly.Blocks['while_inf'] = {
  init: function() {
    this.appendDummyInput().appendField('while true');
    this.appendStatementInput('inner_loop')
      .setCheck(null)
      .appendField('ทำ');
    this.setPreviousStatement(true, null);
    this.setColour(120);
    this.setTooltip('for inf');
    this.setHelpUrl(
      'https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#hq4zhn'
    );
  }
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

// collect
Blockly.Blocks['collect'] = {
  init: function() {
    this.appendDummyInput().appendField('เก็บของ');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl(
      'https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#odz7qx'
    );
  }
};

// if_tile
Blockly.Blocks['if_tile'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('กรณีอยู่บนแผ่น')
      .appendField(
        new Blockly.FieldDropdown([
          ['สีเขียว', 'green'],
          ['สีเหลือง', 'yellow'],
          ['สีดำ', 'black']
        ]),
        'color'
      );
    this.appendStatementInput('if_commands').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip('');
    this.setHelpUrl(
      'https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#89if4f'
    );
  }
};

// if_else_tile
Blockly.Blocks['if_else_tile'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('กรณีอยู่บนแผ่น')
      .appendField(
        new Blockly.FieldDropdown([
          ['สีเขียว', 'green'],
          ['สีเหลือง', 'yellow'],
          ['สีดำ', 'black']
        ]),
        'color'
      );
    this.appendStatementInput('if_commands').setCheck(null);
    this.appendDummyInput().appendField('กรณีอื่น ๆ');
    this.appendStatementInput('else_commands').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip(
      'https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3urwxk'
    );
    this.setHelpUrl('');
  }
};

//if_path
Blockly.Blocks['if_path'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('กรณีมีทางไป')
      .appendField(
        new Blockly.FieldDropdown([
          ['ทางซ้าย', 'left'],
          ['ทางขวา', 'right'],
          ['ข้างหน้า', 'ahead']
        ]),
        'path'
      );
    this.appendStatementInput('if_commands').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip(
      'https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#6eibf3'
    );
    this.setHelpUrl('');
  }
};

// if_else_path
Blockly.Blocks['if_else_path'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('กรณีมีทางไป')
      .appendField(
        new Blockly.FieldDropdown([
          ['ทางซ้าย', 'left'],
          ['ทางขวา', 'right'],
          ['ข้างหน้า', 'ahead']
        ]),
        'path'
      );
    this.appendStatementInput('if_commands').setCheck(null);
    this.appendDummyInput().appendField('กรณีอื่น ๆ');
    this.appendStatementInput('else_commands').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip(
      'https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#23sb82'
    );
    this.setHelpUrl('');
  }
};
