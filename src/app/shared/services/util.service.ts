import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
    constructor() { }

    public isEmptyObject(obj) {
        for (let key in obj) {
            return false;
        };
        return true
    };

    public isEmptyArray(arr) {
        return (arr == undefined || arr == null || arr.length == 0);
    }

    public isEmptyStr(str, length?) {
        if (str == undefined || str == null || str == '') {
            return true;
        }
        else {
            if (Number(length)) {
                if (str.length < length) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
    }

    public setLocalStorage(key: string, value: any) {
        localStorage.setItem(key, value);
    }

    public getLocalStorage(key: string) {
        return localStorage.getItem(key);
    }

    public removeLocalStorage(key: string) {
        localStorage.removeItem(key);
    }

    public setSessionStorage(key: string, value: any) {
        sessionStorage.setItem(key, value);
    }

    public getSessionStorage(key: string) {
        return sessionStorage.getItem(key);
    }

    public removeSessionStorage(key: string) {
        sessionStorage.removeItem(key);
    }

    public isAdmin() {
        var userflag = this.getSessionStorage('userflag');
        if (userflag == '0') {
            return true;
        } else {
            return false;
        }
    }

    public isManager() {
        var userflag = this.getSessionStorage('userflag');
        if (userflag == '1') {
            return true;
        } else {
            return false;
        }
    }

    public isAccoutant() {
        var userflag = this.getSessionStorage('userflag');
        if (userflag == '2') {
            return true;
        } else {
            return false;
        }
    }

    public isOperater() {
        var userflag = this.getSessionStorage('userflag');
        if (userflag == '3') {
            return true;
        } else {
            return false;
        }
    }

    public isSales() {
        var userflag = this.getSessionStorage('userflag');
        if (userflag == '4') {
            return true;
        } else {
            return false;
        }
    }

    public validatorQuire(str) {
        var require = /^$/g;
        if (str == null || str.length == 0 || require.test(JSON.stringify(str))) {
            return false;
        } else {
            return true;
        }
    }

    public validatorMoney(str) {
        var money = /(^[1-9]([0-9]+)?(\.[0-9]{1,4})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,6}?$)/g;
        if (!money.test(str)) {
            return false;
        } else {
            return true;
        }
    }

    public validatorNum(str) {
        var num = /^[0-9]+$/g;
        if (!num.test(str)) {
            return false;
        } else {
            return true;
        }
    }

    public validatorPhone(str) {
        var phone = /^1[0-9]{10}$/;
        if (!phone.test(str)) {
            return false;
        } else {
            return true;
        }
    }

    public validatorDate(str) {
        var date1 = /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/g;//yyyy-mm-dd hh:mm:ss
        var date2 = /^(\d{4})\-(\d{2})\-(\d{2})$/;//yyyy-mm-dd
        if (!date1.test(str) && !date2.test(str)) {
            return false;
        } else {
            return true;
        }
    }

    public validatorIdnum(str) {
        var idnum = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/g;
        var idnum2 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/g;
        if (!idnum.test(str) && !idnum2.test(str)) {
            return false;
        } else {
            return true;
        }
    }

    public validatorCardNum(str) {
        var cardNum1 = /^\d{16}$/;
        var cardNum2 = /^\d{19}$/;
        if (!cardNum1.test(str) && !cardNum2.test(str)) {
            return false;
        } else {
            return true;
        }
    }

    public type(obj) {
        var toString = Object.prototype.toString;
        var map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
        };
        return map[toString.call(obj)];
    }

    public deepClone(data) {
        var t = this.type(data), o, i, ni;

        if (t === 'array') {
            o = [];
        } else if (t === 'object') {
            o = {};
        } else {
            return data;
        }

        if (t === 'array') {
            for (i = 0, ni = data.length; i < ni; i++) {
                o.push(this.deepClone(data[i]));
            }
            return o;
        } else if (t === 'object') {
            for (i in data) {
                o[i] = this.deepClone(data[i]);
            }
            return o;
        }
    }

    public DateToString(date, fmt) {
        if (this.type(date) == 'date') {
            var o = {
                "M+": date.getMonth() + 1, //月份 
                "d+": date.getDate(), //日 
                "h+": date.getHours(), //小时 
                "m+": date.getMinutes(), //分 
                "s+": date.getSeconds(), //秒 
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
                "S": date.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        } else {
            return '';
        }
    }

    public addDate(date, part, value) {
        value *= 1;
        if (isNaN(value)) {
            value = 0;
        }
        switch (part) {
            case "y":
                date.setFullYear(date.getFullYear() + value);
                break;
            case "m":
                date.setMonth(date.getMonth() + value);
                break;
            case "d":
                date.setDate(date.getDate() + value);
                break;
            case "h":
                date.setHours(date.getHours() + value);
                break;
            case "n":
                date.setMinutes(date.getMinutes() + value);
                break;
            case "s":
                date.setSeconds(date.getSeconds() + value);
                break;
            default:
        }
        return date;
    }

    datedifference(sDate1, sDate2) {
        var dateSpan,
            tempDate,
            iDays;
        sDate1 = sDate1.getTime();
        sDate2 = sDate2.getTime();
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
    };

    compareDate(d1, d2) {
        if (d1 == null && d2 == null) {
            return 0;
        } else if (d1 == null) {
            return 1;
        } else if (d2 == null) {
            return -1;
        } else {
            var startTime = new Date(Date.parse(d1));
            var endTime = new Date(Date.parse(d2));
            if (startTime == endTime) {
                return 0
            } else if (startTime > endTime) {
                return 1;
            } else {
                return -1;
            }
        }
    }
}