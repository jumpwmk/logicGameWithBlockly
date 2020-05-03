export function generateCodeFromObj(obj) {
  let { indent } = obj;
  let commands = { ...obj.commands };
  let COMMANDS = [
    'moveForward()\r\n',
    'turnRight()\r\n',
    'turnLeft()\r\n',
    'dontHave()\r\n',
    'collectGem()\r\n',
  ];
  let str = '';
  if (commands.type === 'basic') {
    commands = commands.commands;
    for (let i = 0; i < commands.length; i++) {
      if (commands[i] instanceof Object) {
        str += generateCodeFromObj({
          commands: commands[i],
          indent: indent,
        });
      } else {
        for (let j = 0; j < indent; j++) {
          str += '  ';
        }
        str += COMMANDS[commands[i]];
      }
    }
  } else if (commands.type === 'for') {
    let { iteration } = commands;
    commands.type = 'basic';
    for (let i = 0; i < indent; i++) {
      str += '  ';
    }
    str += 'for i in range( ' + iteration + ' ):\n';
    str += generateCodeFromObj({
      commands,
      indent: indent + 1,
    });
  } else if (commands.type === 'if') {
    let { condition } = commands;
    commands.type = 'basic';
    for (let i = 0; i < indent; i++) {
      str += '  ';
    }
    str += 'if( ' + condition + ' ):\n';
    str += generateCodeFromObj({
      commands,
      indent: indent + 1,
    });
  } else if (commands.type === 'if_else' || commands.type === 'nested_if') {
    let { condition, commands_else } = commands;
    commands = { ...commands };
    commands.type = 'basic';
    for (let i = 0; i < indent; i++) {
      str += '  ';
    }
    str += 'if( ' + condition + ' ):\n';
    str += generateCodeFromObj({
      commands,
      indent: indent + 1,
    });
    commands.commands = commands_else;
    for (let i = 0; i < indent; i++) {
      str += '  ';
    }
    str += 'else:\n';
    str += generateCodeFromObj({
      commands,
      indent: indent + 1,
    });
  } else {
    console.log('there is a bug in generating code');
  }
  return str;
}

export function generateCodeFromCode(code) {
  if (code === undefined || code === null) return '';
  let str = '';
  let lines = code.trim().split('\n');
  let indent = 0;
  for (let i = 1; i < lines.length; i++) {
    let line = lines[i].trim().split(' ');
    if (line[1] === 'begin') indent++;
    else if (line[1] === 'end') indent--;
    else {
      for (let j = 0; j < indent; j++) str += '  ';
      if (line[1] === 'for') {
        if (line[2] === '1000') {
          str += 'while(true):\r\n';
        } else {
          str += 'for(' + line[2] + ' ):\r\n';
        }
      } else if (line[1] === 'if_tile') {
        str += 'if( on ' + line[2] + ' tile):\r\n';
      } else if (line[1] === 'if_path') {
        str += 'if( ' + line[2] + ' ):\r\n';
      } else {
        str += line[1] + '()\r\n';
      }
    }
  }
  return str;
}
