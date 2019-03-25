import * as log from 'loglevel';
import { Logger} from 'loglevel';
import { loglevelServerSend } from './loglevel-serverSend';

loglevelServerSend(log, {url: "/wado/log"});
const newLog = ext()


export const eilog = newLog;



/* const oriOnErr = window.onerror
window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.log("错误信息：", msg);
  console.log("出错文件：", url);
  console.log("出错行号：", lineNo);
  console.log("出错列号：", columnNo);
  console.log("错误详情：", error);
} */
interface Loggers{
  [index: string]: Logger
}

let _loggers: Loggers = {};
var names:RegExp[] = [];

function ext() {
  const ori = log.getLogger
  const newLog = { ...log }
  newLog.getLogger = name => {
    const logger = ori(name)
    _loggers[name]=logger
    return logger;
  }
  return newLog;
}

const eidebug = {
  enable(namespaces) {
    var split = (namespaces || '').split(/[\s,]+/);
    var len = split.length;

    for (var i = 0; i < len; i++) {
      if (!split[i]) continue; // ignore empty strings
      namespaces = split[i].replace(/\*/g, '.*?');
  /*     if (namespaces[0] === '-') {
        skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
      } */
      names.push(new RegExp('^' + namespaces + '$'));
    }

    for(var k in _loggers) {
      var logger = _loggers[k];
      if (enabled(k)) {
        logger.setLevel(logger.levels.DEBUG);
      }
/*       else {
        logger.setLevel(logger.levels.INFO);
      } */
    }
  }
}
declare const window: any;
window.eidubug = eidebug

function enabled(name) {

  var i, len;
/*   for (i = 0, len = skips.length; i < len; i++) {
    if (skips[i].test(name)) {
      return false;
    }
  } */
  for (i = 0, len = names.length; i < len; i++) {
    if (names[i].test(name)) {
      return true;
    }
  }
  return false;
}
