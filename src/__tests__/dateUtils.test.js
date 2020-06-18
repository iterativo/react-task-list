import {formatDate} from "../dateUtils";

it('formats a date to YYYY-mm-dd', function () {
    const date = new Date('1/2/20');
    expect(formatDate(date)).toEqual('2020-01-02');
});
