import { ErrorHandler, Injectable } from '@angular/core';
import { eilog } from './log-conf';

const logger = eilog.getLogger("global-error")

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

  handleError(error) {
    // console.log('Hio')
    super.handleError(error)

    if(error instanceof Error)
      logger.error(error.stack)
    else
      logger.error(error)

    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    // throw error;
  }

  _findContext(error: any): any {
    if (error) {
      return getDebugContext(error) ? getDebugContext(error) :
                                      this._findContext(getOriginalError(error));
    }

    return null;
  }

  /** @internal */
  _findOriginalError(error: Error): any {
    let e = getOriginalError(error);
    while (e && getOriginalError(e)) {
      e = getOriginalError(e);
    }

    return e;
  }

}

function getOriginalError(error: Error): any {
  return (error as any)['ngOriginalError'];
}
function getDebugContext(error: Error): any {
  return (error as any)['ngDebugContext'];
}
