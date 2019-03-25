import { Component, NgZone } from '@angular/core';
import { eilog } from './log-conf';

const Logger = eilog.getLogger("app-comp")
const AppErr = eilog.getLogger("ngZone-err")


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'app';

  constructor(zone: NgZone) {
    zone.onError.subscribe(e => {
      // console.log("xxxxxxxxxxxxxxxxx");
      // console.log(e);
      // AppErr.error(e)
    });

/*     setTimeout(() => {
      throw new Error();
    }, 5000); */

/*     setTimeout(() => {
      Promise.reject('unhandled');
    }, 1000); */
  }

  ngOnInit(): void {
    // Logger.setLevel("debug")
    Logger.info("ultra-compatible", {a:"aaa"});
  }

  doLog() {
    // log.setLevel("WARN")
    // Logger.setLevel("WARN")
    Logger.debug("button debug")


  }

  doError() {
    // Logger.info(new Error().stack)
    throw new Error("aaa")
/*     setTimeout(() => {
      throw new Error("do log button");
    }, 1000);
 */
  }
}
