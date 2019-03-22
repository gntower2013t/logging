import { Component } from '@angular/core';
import * as log from 'loglevel';
import { loglevelServerSend } from './loglevel-serverSend';

loglevelServerSend(log);
const Logger = log.getLogger("app-comp")

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'app';

  ngOnInit(): void {
    Logger.setLevel("debug")
    Logger.info("ultra-compatible", {a:"aaa"});
  }

  doLog() {
    // log.setLevel("WARN")
    // Logger.setLevel("WARN")
    // Logger.info("button log")
    Logger.info(new Error().stack)


  }
}
