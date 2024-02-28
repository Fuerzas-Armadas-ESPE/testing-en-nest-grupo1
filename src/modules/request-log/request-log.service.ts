import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { RequestLogDocument } from './request-log.shema';

@Injectable()
export class RequestLogService {
  constructor(
    @InjectModel('RequestLog')
    private readonly requestLogModel: Model<RequestLogDocument>,
  ) {}

  async createLog(logData: any): Promise<void> {
    const createdLog = new this.requestLogModel(logData);
    await createdLog.save();
  }
}
