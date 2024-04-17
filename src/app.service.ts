import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private task: any,
  ) {}
  getHello(): string {
    console.log(this.task);

    return this.apiKey;
  }
}
