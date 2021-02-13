import moment from 'moment';
// 判断数据为字符串还是数字，并转换成数组
export function checkTypeBackArray(value, type) {
    if (value) {
        if (typeof (value) == 'string' || typeof (value) == 'number') {
            var bcValue = value.toString().split(type || ',');
            return bcValue;
        }
        else if (Object.prototype.toString.call(value) == '[object Array]') {
            return value;
        }
    }
    else {
        return [];
    }
}
// 判断数据为数组，并转换成字符串
export function checkTypeBackString(value, type) {
    if (value) {
        if (typeof (value) == 'string' || typeof (value) == 'number') {
            return value;
        }
        else if (Object.prototype.toString.call(value) == '[object Array]') {
            var bcValue = value.join(type || ',');
            return bcValue;
        }
    }
    else {
        return '';
    }
}
// 禁止开始日期选择
export function disabledStartDt(e, startDt, endDt, disBeforeToday, dtFormatType) {
    var dtFormat = dtFormatType || 'YYYY-MM-DD';
    e = moment(e).format(dtFormat);
    if (e && typeof (e) == 'string') {
        e = moment(e, dtFormat);
    }
    if (startDt && typeof (startDt) == 'string') {
        startDt = moment(startDt, dtFormat);
    }
    if (endDt && typeof (endDt) == 'string') {
        endDt = moment(endDt, dtFormat);
    }
    if (e && endDt) {
        if (disBeforeToday) {
            return e < moment().startOf('day') || e.valueOf() > endDt.valueOf();
        }
        return e.valueOf() > endDt.valueOf();
    }
    else if (e && disBeforeToday) {
        return e < moment().startOf('day');
    }
    return false;
}
// 禁止结束日期选择
export function disabledEndDt(e, startDt, endDt, disBeforeToday, dtFormatType) {
    var dtFormat = dtFormatType || 'YYYY-MM-DD';
    e = moment(e).format(dtFormat);
    if (e && typeof (e) == 'string') {
        e = moment(e, dtFormat);
    }
    if (startDt && typeof (startDt) == 'string') {
        startDt = moment(startDt, dtFormat);
    }
    if (endDt && typeof (endDt) == 'string') {
        endDt = moment(endDt, dtFormat);
    }
    if (e && startDt && endDt) {
        var res = startDt.valueOf() > endDt.valueOf() ? endDt.valueOf() : startDt.valueOf();
        if (disBeforeToday) {
            return e < moment().startOf('day') || e.valueOf() > res.valueOf();
        }
        return e.valueOf() < res.valueOf();
    }
    else if (e && startDt) {
        if (disBeforeToday) {
            return e < moment().startOf('day') || e.valueOf() < startDt.valueOf();
        }
        return e.valueOf() < startDt.valueOf();
    }
    else if (e && disBeforeToday) {
        return e < moment().startOf('day');
    }
    return false;
}
