import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  public log(message: string) {
    const timeString = new Date().toLocaleTimeString();
    console.log(`[${timeString}] ${message}`);
  }
}
