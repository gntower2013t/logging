import { ErrorHandler, Injectable } from '@angular/core';
import { eilog } from './log-conf';

const logger = eilog.getLogger("global-error")

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

  handleError(error) {
    // console.log('Hio')
    super.handleError(error)
    logger.error(error)

    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    // throw error;
  }

}
