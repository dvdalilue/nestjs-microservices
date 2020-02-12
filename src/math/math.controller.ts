import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MATH_SERVICE } from './math.constants';

@Controller()
export class MathController {
  constructor(@Inject(MATH_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  execute(): Observable<boolean> {
    const pattern = { cmd: 'method' };
    return this.client.send<boolean>(pattern, "data");
  }

  @MessagePattern({ cmd: 'method' })
  method(data: string): Observable<boolean> {
    const obs = throwError(data);

    return obs.pipe(catchError((err) => {
      return of(false);
    }));
  }
}
