import * as moment from 'moment';
import { SummaryModel } from './shared.models';

export class _ {

    static isValidDate(value: Date) {
        if (value) {
            return moment(value).isValid();
        }
        return false;
    }

    static formatDate(value: Date) {
        if (this.isValidDate(value)) {
            return moment(value).format('MM/DD/YYYY');
        }
        return null;
    }

    static formatDateTime(value: Date) {
        if (this.isValidDate(value)) {
            return moment(value).format('MM/DD/YYYY HH:mm:ss');
        }
        return null;
    }

    static translateLocaleDateToUTCDate(value: Date) {
        if (this.isValidDate(value)) {
            // TODO: not sure if the toDate() will put it back in local time
            return moment.utc(value).subtract(moment(value).utcOffset(), 'minutes').toDate();
        }
        return null;
    }

    static summarizeValues<T extends SummaryModel>(ctor: {new (): T}, data: T[], summaryKey: (value: T) => string, summarizeFunction: (summaryRow: T, sourceRows: T[]) => void ) {
        if (!data || data.length === 0) {
            return [];
        }

        const summaryKeys = new Set();
        const summarySets: {[key: string]: T[]} = {};
        for (let index = 0; index < data.length; index++) {
            const key = summaryKey(data[index]);

            if (summaryKeys.has(key)) {
                summarySets[key].push(data[index]);
                continue;
            }
            summaryKeys.add(key);
            summarySets[key] = [data[index]];
        }

        return Array.from(summaryKeys).map(key => {
            const summaryRow = new ctor();
            summaryRow.setValuesFromSummaryKey(key);
            summarizeFunction(summaryRow, summarySets[key]);
            return summaryRow;
        });
    }
}
