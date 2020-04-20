export function generateCodeFromObj(obj) {
  let { commands, indent } = obj;
  commands = { ...commands };
  let COMMANDS = [
    'moveForward();\r\n',
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
    let { condition, condition_else } = commands;
    commands.type = 'basic';
    for (let i = 0; i < indent; i++) {
      str += '  ';
    }
    str += 'if( ' + condition + ' ):\n';
    str += generateCodeFromObj({
      commands,
      indent: indent + 1,
    });
    commands.commands = condition_else;
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
