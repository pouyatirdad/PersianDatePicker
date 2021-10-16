
$(function () {
    $(".ReserveDatePickerItemsLeft").datepickerFa();
});

var today;
var year;
var month;
var day;

$.fn.datepickerFa = function (y = 0, m = 0) {
    today = new moment(); // tarikh miladi
    year = today.jYear(); //13xx 14xx
    month = today.jMonth(); //0-11
    day = today.jDate(); //1-31 

    if (y !== 0) {
        year = y;
    }

    if (m !== 0) {
        month = m; //0-11
    }

    var tempMonth = month + 1; //1-12
    var firstDay = moment("" + year + "/" + tempMonth + "/1", "jYYYY/jM/jD");
    firstDay = firstDay.day(); // 0-6
    var jFirstDay = jalali_day_number(firstDay);
    var daysInMonth = moment.jDaysInMonth(year, month);


    var mos = [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند"
    ];
    var days = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];


    this.each(function () {
        var randnum = Math.floor((Math.random() * 999999) + 1);
        var table = '<div class="ReserveDatePickerItemsLeftUpper">'
            +
            '<span class="fas fa-angle-right" id="prev-y' + randnum + '" onclick="nextMonth(this)"> </span>'
            +
            '<h6 id="month-title' + randnum + '"> مهر </h6>'
            +
            '<span class="fas fa-angle-left" id="next-y' + randnum + '" onclick="preMonth(this)"> </span>'
            +
            '</div>'
            +
            '<div class="ReserveDatePickerItemsLeftDatas" id="dt-table' + randnum + '">'
            +
            '</div>'



        $(this).empty();
        $(this).append(table);
        $("#month-title" + randnum).html(mos[month]);
        $("#year-title" + randnum).html(ep(year));
        $("#dt-table" + randnum).empty();
        var dayCount = 0;
        for (let j = 0; j < 6; j++) {
            for (let wd = 0; wd < 7; wd++) {
                if ((jFirstDay <= wd || dayCount >= 1) && dayCount < daysInMonth) {
                    dayCount++;
                    $("#dt-table" + randnum).append(
                        '<div class="ReserveDatePickerItemsLeftData" id="dt-days-num-'
                        +
                        dayCount
                        +
                        "-mth-"
                        +
                        (month + 1)
                        +
                        '">'
                        +
                        '<div class="DPILDNum">'
                        +
                        '<h6>' + ep(dayCount) + '</h6>'
                        +
                        '</div>'
                        +
                        '<div class="DPILText">'
                        +
                        '<h6>' + days[wd] + '</h6>'
                        +
                        '</div>'
                        +
                        '</div>'
                    );
                    if (month == today.jMonth()) {
                        if (day > dayCount) {
                            $(".ReserveDatePickerItemsLeftData[id^='dt-days-num-" + dayCount + "']").addClass("CLSORSVD");
                        } else {
                            $(".ReserveDatePickerItemsLeftData[id^='dt-days-num-" + dayCount + "']").addClass("OpenDay");
                        }
                    } else if (month > today.jMonth()) {
                        $(".ReserveDatePickerItemsLeftData[id^='dt-days-num-" + dayCount + "']").addClass("OpenDay");
                    }
                    else {
                        $(".ReserveDatePickerItemsLeftData[id^='dt-days-num-" + dayCount + "']").addClass("CLSORSVD");
                    }
                }
            }
        }

        if (month == today.jMonth() && year == today.jYear())
            $(".ReserveDatePickerItemsLeftData[id^='dt-days-num-" + day + "']").addClass("Today");
    });
};


function jalali_day_number(input) {
    switch (input) {
        case 0:
            return 1;
            break;
        case 1:
            return 2;
            break;
        case 2:
            return 3;
            break;
        case 3:
            return 5;
            break;
        case 4:
            return 5;
            break;
        case 5:
            return 6;
            break;
        case 6:
            return 0;
            break;
    }
}

function persianToEnglish(value) {
    var newValue = "";
    for (var i = 0; i < value.length; i++) {
        var ch = value.charCodeAt(i);
        if (ch >= 1776 && ch <= 1785) {
            // For Persian digits.
            var newChar = ch - 1728;
            newValue = newValue + String.fromCharCode(newChar);
        } else if (ch >= 1632 && ch <= 1641) {
            // For Arabic & Unix digits.
            var newChar = ch - 1584;
            newValue = newValue + String.fromCharCode(newChar);
        } else newValue = newValue + String.fromCharCode(ch);
    }
    return newValue;
}

function ep(en) {
    var pn = "";
    en = en.toString();
    for (var i = 0; i < en.length; i++) {
        switch (en.charAt(i)) {
            case "0":
                pn = pn + "۰";
                break;
            case "1":
                pn = pn + "۱";
                break;
            case "2":
                pn = pn + "۲";
                break;
            case "3":
                pn = pn + "۳";
                break;
            case "4":
                pn = pn + "۴";
                break;
            case "5":
                pn = pn + "۵";
                break;
            case "6":
                pn = pn + "۶";
                break;
            case "7":
                pn = pn + "۷";
                break;
            case "8":
                pn = pn + "۸";
                break;
            case "9":
                pn = pn + "۹";
                break;
            case ",":
                pn = pn + "٫";
                break;
            case ".":
                pn = pn + "/";
                break;
            default:
                pn = pn + en.charAt(i);
                break;
        }
    }
    return pn;
}

// function getVal(e) {
//     alert(year + "/" + (month + 1) + "/" + $(e).find('.DPILDNum h6').text());
//     // console.log($(e).find('.DPILDNum h6').text());
// }

function nextMonth(e) {
    if (month == 11) {
        month = 0;
        year++;
    } else {
        month++;
    }
    $(e).parent().parent().datepickerFa(year, month);
}

function preMonth(e) {
    if (month == 0) {
        month = 11;
        year--;
    } else {
        month--;
    }
    $(e).parent().parent().datepickerFa(year, month);
}