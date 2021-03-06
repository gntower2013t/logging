import { Logger, levels, LogLevel } from 'loglevel';

interface ServerOption {
  url: string;
  // callOriginal?:boolean;
  prefix?: string;
  level?: number;
}

/**
 * @description
 * Extend loglevel with new plugin which will send log information to the log-sever
 *
 * @param {object} logger loglevel instance to be extended
 * @param {object} options
 * @param {string} [options.url='http://localhost:8000/main/log'] Server url which would be used as a log server
 * @param {string|Function} [options.prefix=null] Prefix for all log messages. Either string or function wich should return string and accept log severity and message as parameters
 * @param {Bool} [options.callOriginal=false] If set to true - original loglevel method for logging would be called
 * @example
 * loglevelServerSend(log,{url:'https://example.com/app/log',prefix: function(logSev,message) {
 *     return '[' + new Date().toISOString() + '] ' + logSev + ': ' + message + '\n'
 * }})
 */

const defaultOption = {
  // callOriginal: false,
  level:levels.WARN
}
export const loglevelServerSend = function (logger: Logger, options: ServerOption) {
    if (!logger || !logger.methodFactory)
        throw new Error('loglevel instance has to be specified in order to be extended')

  options = { ...defaultOption, ...options }

    var _logger          = logger,
        _url             = options && options.url || '/wado/log',
        // _callOriginal    = options && options.callOriginal || false,
        _prefix          = options && options.prefix,
        _originalFactory = _logger.methodFactory,
        _sendQueue       = [],
        _isSending       = false

    _logger.methodFactory = function (methodName, logLevel, loggerName) {
      var rawMethod = _originalFactory(methodName, logLevel, loggerName)

      function processMsg(msgs: any[]): string{
        return msgs.map(msg => typeof msg === 'string' ? msg : JSON.stringify(msg))
          .reduce((acc,curr)=>acc+' '+curr)
      }

      return function (...msgs: any[]) {
        // if (_callOriginal)
          // rawMethod(msgs)

        if (logLevel < options.level) {
          rawMethod(msgs)
          return;
        }

        let message = processMsg(msgs);
            // if (typeof _prefix === 'string')
        if(_prefix)
                message = _prefix + message
            // else if (typeof _prefix === 'function')
            //   message = _prefix(methodName, message)
            // else
              message = message.replace(/\n/g, "\\n")
              message = message.replace(/[\[<]/g, "(")
              message = message.replace(/[\]>]/g, ")")
              message =  encodeURIComponent(message)
              message = `name=eiweb.${loggerName}&level=error&message=${message}`



            _sendQueue.push(message)
            _sendNextMessage()
        }
    }

  _logger.setLevel(_logger.levels.WARN)



    var _sendNextMessage = function(){
        if (!_sendQueue.length || _isSending)
            return

        _isSending = true

        var msg = _sendQueue.shift(),
            req = new XMLHttpRequest()

        req.open("POST", _url, true)
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        req.onreadystatechange = function() {
            if(req.readyState == 4)
            {
                _isSending = false
                setTimeout(_sendNextMessage, 0)
            }
        }
        req.send(msg)
    }
}
