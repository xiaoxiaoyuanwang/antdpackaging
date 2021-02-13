var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect } from 'react';
import { ConfigProvider, DatePicker, Input, Row, Col, Select, Tooltip as TooltipAnt, } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import zhCN from 'antd/lib/locale/zh_CN';
import { checkTypeBackArray, checkTypeBackString } from '../utils/commonUtils';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import classNames from 'classnames';
var RangePicker = DatePicker.RangePicker;
var dateFormat = 'YYYY-MM-DD';
/**
 * 页面中最常用的的元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { FormComponent } from 'antdpackaging'
 * ~~~
 */
export var FormComponent = function (props) {
    var className = props.className, style = props.style, sourceList = props.sourceList, children = props.children, callBcak = props.callBcak, restProps = __rest(props, ["className", "style", "sourceList", "children", "callBcak"]);
    var _a = useState({}), currentObj = _a[0], setObj = _a[1];
    var _b = useState(), currentDt = _b[0], setDt = _b[1];
    useEffect(function () {
        init(sourceList);
    }, []);
    useEffect(function () {
        if (callBcak) {
            callBcak(currentObj, currentDt);
        }
    }, [currentObj]);
    function changeFun(e, obj, opt) {
        var val;
        if (obj.type == 'time') {
            val = moment(e).format(obj.dateFormat || dateFormat) == 'Invalid date' ? '' : moment(e).format(obj.dateFormat || dateFormat);
        }
        else if (obj.type == 'timeRange') {
            try {
                if (e && e.length > 0) {
                    var arg0 = e[0];
                    var arg1 = e[1];
                    val = [
                        moment(arg0).format(obj.dateFormat || dateFormat) == 'Invalid date' ? '' : moment(arg0).format(obj.dateFormat || dateFormat),
                        moment(arg1).format(obj.dateFormat || dateFormat) == 'Invalid date' ? '' : moment(arg1).format(obj.dateFormat || dateFormat),
                    ];
                }
                else {
                    val = [];
                }
            }
            catch (error) {
                val = [];
            }
        }
        else {
            val = e && e.target ? e.target.value : e;
        }
        var obj2 = JSON.parse(JSON.stringify(currentObj));
        obj2[obj.key] = val;
        setDt(obj);
        setObj(obj2);
    }
    // 单选或多选选中
    function styleStatus(value, obj) {
        var obj2 = JSON.parse(JSON.stringify(currentObj));
        if (obj.type == 'statusMultiple') {
            var oldMultiple = JSON.parse(JSON.stringify(currentObj[obj.key]));
            if (!value) {
                oldMultiple = [];
            }
            else {
                oldMultiple = checkTypeBackArray(oldMultiple);
                oldMultiple = oldMultiple.filter(function (item) { return item != -1; });
            }
            if (oldMultiple.indexOf(value) > -1) {
                oldMultiple = oldMultiple.filter(function (item) { return item != value; });
            }
            else {
                oldMultiple.push(value);
            }
            obj2[obj.key] = checkTypeBackString(oldMultiple);
        }
        else {
            obj2[obj.key] = value;
        }
        setDt(obj);
        setObj(obj2);
    }
    // 初始化渲染
    function init(data) {
        if (!data) {
            return;
        }
        var obj = JSON.parse(JSON.stringify(currentObj));
        data.map(function (itemOne) {
            itemOne.map(function (itemSec) {
                if (itemSec.type != 'text' && itemSec.type != 'buttons') {
                    obj[itemSec.key] = itemSec.value;
                }
            });
        });
        setObj(obj);
    }
    var initHtml = function (data) {
        if (!data) {
            return;
        }
        var classesRow = classNames('antdpackaging_row', className);
        return data.map(function (itemOne, indexOne) {
            return (React.createElement(Row, { key: indexOne, className: classesRow }, itemOne.map(function (itemSec, indexSec) {
                var classesCol = classNames('antdpackaging_col', itemSec.colClassName);
                var classesLabel = classNames('antdpackaging_label', itemSec.labelClassName);
                var classesStatus = classNames('antdpackaging_status', itemSec.labelClassName);
                if (itemSec.type == 'buttons') {
                    return (React.createElement(Col, { md: itemSec.md || 8, sm: 24, key: indexSec, className: classesCol, style: __assign({}, itemSec.colStyle) }, itemSec.key));
                }
                if (itemSec.type == 'status' || itemSec.type == 'statusMultiple') {
                    return (React.createElement(Col, { md: itemSec.md || 24, sm: 24, key: indexSec, className: classesCol, style: __assign({}, itemSec.colStyle) },
                        React.createElement("div", { className: 'antdpackaging_status_wrapper', style: __assign({}, itemSec.styleWrapper) },
                            React.createElement("div", { className: classesStatus, style: __assign({}, itemSec.labelStyle) },
                                itemSec.must ?
                                    React.createElement("span", { style: { color: 'red' } }, "*")
                                    : null,
                                itemSec.label),
                            React.createElement("div", { style: { flex: 1, textAlign: 'left' } }, itemSec.options &&
                                itemSec.options.map(function (itemOption, indexOption) {
                                    var classesStatusItem = classNames('antdpackaging_status_item unSelButton', itemSec.statusItemClassName, {
                                        "selButton": checkTypeBackArray(currentObj[itemSec.key]).indexOf((itemOption.key).toString()) > -1 ||
                                            (checkTypeBackArray(currentObj[itemSec.key]).length == 0 && itemOption.key == '')
                                    });
                                    return (React.createElement("div", { onClick: function () {
                                            styleStatus(itemOption.key, itemSec);
                                        }, key: indexOption, className: classesStatusItem }, itemOption.value));
                                })))));
                }
                return (React.createElement(Col, { md: itemSec.md || 8, sm: 24, key: indexSec, className: classesCol, style: __assign({}, itemSec.colStyle) },
                    React.createElement("div", null,
                        React.createElement("div", { style: { display: 'flex', } },
                            React.createElement("div", { className: classesLabel, style: __assign({}, itemSec.labelStyle) },
                                itemSec.must ?
                                    React.createElement("span", { style: { color: 'red' } }, "*")
                                    : null,
                                itemSec.label,
                                itemSec.hint ? (React.createElement(TooltipAnt, { placement: "top", title: function () { return React.createElement("div", null, itemSec.hintText); } },
                                    React.createElement(QuestionCircleOutlined, { className: 'antdpackaging_hint' }))) : null,
                                "\uFF1A"),
                            React.createElement("div", { style: { flex: 1 } },
                                itemSec.type == 'text' ? itemSec.key : null,
                                itemSec.type == 'input' ? (React.createElement(Input, { size: restProps.size, allowClear: itemSec.allowClear, maxLength: itemSec.maxLength, disabled: itemSec.disabled, placeholder: "\u8BF7\u8F93\u5165", value: itemSec.value, onChange: function (e) {
                                        changeFun(e, itemSec);
                                    } })) : null,
                                itemSec.type == 'select' && !itemSec.showSearch ? (React.createElement(Select, { size: restProps.size, mode: itemSec.mode, allowClear: itemSec.allowClear, getPopupContainer: function (triggerNode) { return triggerNode.parentNode; }, style: { width: '100%' }, placeholder: itemSec.placeholder || '请选择', value: itemSec.value, onChange: function (e, opt) {
                                        changeFun(e, itemSec, opt);
                                    } }, itemSec.options &&
                                    itemSec.options.map(function (itemOption, indexOption) {
                                        return (React.createElement(Select.Option, { items: itemOption, value: itemSec.optionsObj && itemSec.optionsObj.key
                                                ? itemOption[itemSec.optionsObj.key] + "," + itemOption[itemSec.optionsObj.value]
                                                : itemOption.key + "," + itemOption.value, key: itemSec.optionsObj && itemSec.optionsObj.key
                                                ? itemOption[itemSec.optionsObj.key]
                                                : itemOption.key }, itemSec.optionsObj && itemSec.optionsObj.value
                                            ? itemOption[itemSec.optionsObj.value]
                                            : itemOption.value));
                                    }))) : null,
                                itemSec.type == 'select' && itemSec.showSearch ? (React.createElement(Select, { size: restProps.size, mode: itemSec.mode, allowClear: itemSec.allowClear, getPopupContainer: function (triggerNode) { return triggerNode.parentNode; }, style: { width: '100%' }, placeholder: itemSec.placeholder || '请选择', showSearch: itemSec.showSearch ? itemSec.showSearch : undefined, value: itemSec.value, onSearch: function (e) { return (itemSec.showSearch && itemSec.onSearch ? itemSec.onSearch(e) : undefined); }, onChange: function (e, opt) {
                                        changeFun(e, itemSec, opt);
                                    } }, itemSec.options &&
                                    itemSec.options.map(function (itemOption, indexOption) {
                                        return (React.createElement(Select.Option, { items: itemOption, value: itemSec.optionsObj && itemSec.optionsObj.key
                                                ? itemOption[itemSec.optionsObj.key] + "," + itemOption[itemSec.optionsObj.value]
                                                : itemOption.key + "," + itemOption.value, key: itemSec.optionsObj && itemSec.optionsObj.key
                                                ? itemOption[itemSec.optionsObj.key]
                                                : itemOption.key }, itemSec.optionsObj && itemSec.optionsObj.value
                                            ? itemOption[itemSec.optionsObj.value]
                                            : itemOption.value));
                                    }))) : null,
                                itemSec.type == 'time' ? (React.createElement(DatePicker, { size: restProps.size, disabledDate: function (e) { return itemSec.disabledDate ? itemSec.disabledDate(e) : null; }, value: itemSec.value ? moment(itemSec.value, itemSec.dateFormat || dateFormat) : undefined, onChange: function (e) {
                                        changeFun(e, itemSec);
                                    }, disabled: itemSec.disabled, style: { width: '100%' }, placeholder: "\u8BF7\u9009\u62E9\u65E5\u671F" })) : null,
                                itemSec.type == 'timeRange' ? (React.createElement(RangePicker, { disabledDate: function (e) { return itemSec.disabledDate ? itemSec.disabledDate(e) : null; }, disabledTime: function (_, type) { return itemSec.disabledTime ? itemSec.disabledTime(_, type) : null; }, value: itemSec.value && itemSec.value.length > 0
                                        ? [
                                            moment(itemSec.value[0], itemSec.dateFormat || dateFormat),
                                            moment(itemSec.value[1], itemSec.dateFormat || dateFormat)
                                        ]
                                        : null, onChange: function (e) {
                                        changeFun(e, itemSec);
                                    }, disabled: itemSec.disabled, showTime: itemSec.showTime, style: { width: '100%' } })) : null)))));
            })));
        });
    };
    return (React.createElement(ConfigProvider, { locale: zhCN }, initHtml(sourceList)));
};
FormComponent.defaultProps = {
    size: 'middle'
};
export default FormComponent;
