import * as eilog from 'loglevel';
import { loglevelServerSend } from './loglevel-serverSend';

loglevelServerSend(eilog);

export { eilog}

/* const oriOnErr = window.onerror
window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.log("错误信息：", msg);
  console.log("出错文件：", url);
  console.log("出错行号：", lineNo);
  console.log("出错列号：", columnNo);
  console.log("错误详情：", error);
} */
