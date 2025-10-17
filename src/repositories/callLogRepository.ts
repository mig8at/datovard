import { CallLog } from '../types/store';

export class CallLogRepository {
  private logs: CallLog[] = [];
  private counter = 0;

  log(data: Omit<CallLog, 'id'>): void {
    const log: CallLog = {
      id: `call-${++this.counter}`,
      ...data,
    };
    this.logs.push(log);
  }

  getLogs(): CallLog[] {
    return this.logs;
  }

  getLogsByStoreId(storeId: string): CallLog[] {
    return this.logs.filter((log) => log.selectedStoreId === storeId);
  }

  getLogsByDateRange(startDate: Date, endDate: Date): CallLog[] {
    return this.logs.filter(
      (log) => log.timestamp >= startDate && log.timestamp <= endDate
    );
  }

  clearLogs(): void {
    this.logs = [];
  }
}
