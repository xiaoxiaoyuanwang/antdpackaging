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
import { ConfigProvider, DatePicker, Input, Row, Col, Select, Checkbox, Radio, Tooltip as TooltipAnt, } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import moment from 'moment';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import { checkTypeBackArray } from '../../utils/utils';
moment.locale('zh-cn');
var RangePicker = DatePicker.RangePicker;
var dateFormatBase = 'YYYY-MM-DD';
/**
 * 页面中最常用的的元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { FormComponent } from 'antdpackaging'
 * ~~~
 */
export var FormComponent = function (props) {
    var className = props.className, style = props.style, sourceList = props.sourceList, children = props.children, size = props.size, callBcak = props.callBcak, restProps = __rest(props, ["className", "style", "sourceList", "children", "size", "callBcak"]);
    var _a = useState({}), currentObj = _a[0], setObj = _a[1];
    // const [currentDt, setDt] = useState<any>()
    useEffect(function () {
        init(sourceList);
    }, []);
    // useEffect(() => {
    //   if (callBcak) {
    //     callBcak(currentObj, currentDt);
    //   }
    // }, [currentObj]);
    // 回调函数
    function back(obj, item) {
        if (callBcak) {
            callBcak(obj, item);
        }
    }
    function changeFun(e, obj, opt) {
        var val;
        if (obj.type === 'time') {
            val = moment(e).format(obj.dateFormat || dateFormatBase) === 'Invalid date' ? '' : moment(e).format(obj.dateFormat || dateFormatBase);
        }
        else if (obj.type === 'timeRange') {
            try {
                if (e && e.length > 0) {
                    var arg0 = e[0];
                    var arg1 = e[1];
                    val = [
                        moment(arg0).format(obj.dateFormat || dateFormatBase) === 'Invalid date' ? '' : moment(arg0).format(obj.dateFormat || dateFormatBase),
                        moment(arg1).format(obj.dateFormat || dateFormatBase) === 'Invalid date' ? '' : moment(arg1).format(obj.dateFormat || dateFormatBase),
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
        var currentObjNew = JSON.parse(JSON.stringify(currentObj));
        currentObjNew[obj.key || obj.name] = val;
        back(currentObjNew, obj);
        setObj(currentObjNew);
    }
    // 单选或多选选中
    function styleStatus(value, obj) {
        var currentObjNew = JSON.parse(JSON.stringify(currentObj));
        if (obj.type === 'statusMultiple') {
            var oldMultiple = currentObj[obj.key || obj.name] ? JSON.parse(JSON.stringify(currentObj[obj.key || obj.name])) : '';
            if (!value) {
                oldMultiple = [];
            }
            else {
                oldMultiple = checkTypeBackArray(oldMultiple);
                oldMultiple = oldMultiple.filter(function (item) { return item !== -1; });
            }
            if (oldMultiple.indexOf(value) > -1) {
                oldMultiple = oldMultiple.filter(function (item) { return item !== value; });
            }
            else {
                oldMultiple.push(value);
            }
            currentObjNew[obj.key || obj.name] = checkTypeBackArray(oldMultiple);
        }
        else {
            currentObjNew[obj.key || obj.name] = value;
        }
        back(currentObjNew, obj);
        setObj(currentObjNew);
    }
    // 初始化渲染
    function init(data) {
        if (!data) {
            return;
        }
        var obj = JSON.parse(JSON.stringify(currentObj));
        data.forEach(function (itemOne) {
            itemOne.forEach(function (itemSec) {
                if (itemSec.type !== 'text' && itemSec.type !== 'buttons') {
                    obj[itemSec.key || itemSec.name] = itemSec.value;
                }
            });
        });
        setObj(obj);
    }
    var initHtml = function (data) {
        if (!data) {
            return;
        }
        var classesRow = classNames('antdpackaging_row');
        return data.map(function (itemOne, indexOne) {
            return (React.createElement(Row, { key: indexOne, className: classesRow }, itemOne.map(function (itemSec, indexSec) {
                var _a, _b;
                var optionsObj = itemSec.optionsObj, value = itemSec.value, type = itemSec.type, label = itemSec.label, must = itemSec.must, name = itemSec.name, key = itemSec.key, options = itemSec.options, colStyle = itemSec.colStyle, labelStyle = itemSec.labelStyle, styleWrapper = itemSec.styleWrapper, colClassName = itemSec.colClassName, labelClassName = itemSec.labelClassName, formClassName = itemSec.formClassName, md = itemSec.md, hint = itemSec.hint, hintText = itemSec.hintText, 
                // disabledDate,
                dateFormat = itemSec.dateFormat, 
                // disabledTime,
                itemSecProps = __rest(itemSec, ["optionsObj", "value", "type", "label", "must", "name", "key", "options", "colStyle", "labelStyle", "styleWrapper", "colClassName", "labelClassName", "formClassName", "md", "hint", "hintText", "dateFormat"]);
                var classesCol = classNames('antdpackaging_col', colClassName);
                var classesLabel = classNames('antdpackaging_label', labelClassName, (_a = {},
                    _a["antdpackaging_size_" + size] = size,
                    _a));
                var classesStatus = classNames('antdpackaging_status', labelClassName, (_b = {},
                    _b["antdpackaging_status_" + size] = size,
                    _b));
                var classesForm = classNames(formClassName);
                if (type === 'buttons') {
                    return (React.createElement(Col, { md: md || 8, sm: 24, key: indexSec, className: classesCol, style: __assign({}, colStyle) }, key || name));
                }
                if (type === 'status' || type === 'statusMultiple') {
                    return (React.createElement(Col, { md: md || 24, sm: 24, key: indexSec, className: classNames('antdpackaging_status_col', classesCol), style: __assign({}, colStyle) },
                        React.createElement("div", { className: 'antdpackaging_status_wrapper', style: __assign({}, styleWrapper) },
                            React.createElement("div", { className: classesStatus, style: __assign({}, labelStyle) },
                                must ?
                                    React.createElement("span", { style: { color: 'red' } }, "*")
                                    : null,
                                label),
                            React.createElement("div", { style: { flex: 1, textAlign: 'left' } }, options &&
                                options.map(function (itemOption, indexOption) {
                                    var _a;
                                    var keyres = optionsObj && optionsObj.value
                                        ? itemOption[optionsObj.value]
                                        : itemOption.value;
                                    var valres = optionsObj && optionsObj.label
                                        ? itemOption[optionsObj.label]
                                        : itemOption.label;
                                    var classesStatusItem = classNames('antdpackaging_status_item unSelButton', itemSec.formClassName, (_a = {},
                                        _a["antdpackaging_status_item_" + size] = size,
                                        _a["selButton"] = checkTypeBackArray(currentObj[key || name]).indexOf((keyres).toString()) > -1 ||
                                            (checkTypeBackArray(currentObj[key || name]).length === 0 && keyres === ''),
                                        _a));
                                    return (React.createElement("div", { onClick: function () {
                                            styleStatus(keyres, itemSec);
                                        }, key: indexOption, className: classesStatusItem }, valres));
                                })))));
                }
                return (React.createElement(Col, { md: md || 8, sm: 24, key: indexSec, className: classesCol, style: __assign({}, colStyle) },
                    React.createElement("div", null,
                        React.createElement("div", { style: { display: 'flex', } },
                            React.createElement("div", { className: classesLabel, style: __assign({}, labelStyle) },
                                must ?
                                    React.createElement("span", { style: { color: 'red' } }, "*")
                                    : null,
                                label,
                                hint ? (React.createElement(TooltipAnt, { placement: "top", title: function () { return React.createElement("div", null, hintText); } },
                                    React.createElement(QuestionCircleOutlined, { className: 'antdpackaging_hint' }))) : null,
                                "\uFF1A"),
                            React.createElement("div", { className: "antdpackaging_form_wrapper" },
                                type === 'text' ? (key || name) : null,
                                type === 'input' ? (React.createElement(Input, __assign({ className: classesForm, size: size, placeholder: "\u8BF7\u8F93\u5165" }, itemSecProps, { onChange: function (e) {
                                        changeFun(e, itemSec);
                                    } }))) : null,
                                type === 'select' ? (React.createElement(Select, __assign({ className: classesForm, size: size, getPopupContainer: function (triggerNode) { return triggerNode.parentNode; }, style: { width: '100%' }, placeholder: '请选择' }, itemSecProps, { value: (value), onChange: function (e, opt) {
                                        changeFun(e, itemSec, opt);
                                    } }), options &&
                                    options.map(function (itemOption, indexOption) {
                                        return (React.createElement(Select.Option, __assign({}, itemOption, { items: itemOption, value: optionsObj && optionsObj.value
                                                ? "" + itemOption[optionsObj.value]
                                                : "" + itemOption.value, key: optionsObj && optionsObj.value
                                                ? itemOption[optionsObj.value]
                                                : itemOption.value }), optionsObj && optionsObj.label
                                            ? itemOption[optionsObj.label]
                                            : itemOption.label));
                                    }))) : null,
                                type === 'time' ? (React.createElement(DatePicker, __assign({ style: { width: '100%' }, className: classesForm, size: size, placeholder: "\u8BF7\u9009\u62E9\u65E5\u671F" }, itemSecProps, { value: value ? moment(value, dateFormat || dateFormatBase) : undefined, onChange: function (e) {
                                        changeFun(e, itemSec);
                                    } }))) : null,
                                type === 'timeRange' ? (React.createElement(RangePicker, __assign({ style: { width: '100%' }, className: classesForm }, itemSecProps, { value: value && value.length > 0
                                        ? [
                                            moment(value[0], dateFormat || dateFormatBase),
                                            moment(value[1], dateFormat || dateFormatBase)
                                        ]
                                        : null, onChange: function (e) {
                                        changeFun(e, itemSec);
                                    } }))) : null,
                                type === 'checkbox' ? (React.createElement(Checkbox.Group, __assign({ style: { width: '100%', textAlign: "left" }, className: classesForm }, itemSecProps, { value: checkTypeBackArray(value), onChange: function (e) {
                                        changeFun(e, itemSec);
                                    } }), options &&
                                    options.map(function (itemOption, indexOption) {
                                        return (React.createElement(Checkbox, __assign({}, itemOption, { value: optionsObj && optionsObj.value
                                                ? "" + itemOption[optionsObj.value]
                                                : "" + itemOption.value, key: optionsObj && optionsObj.value
                                                ? itemOption[optionsObj.value]
                                                : itemOption.value }), optionsObj && optionsObj.label
                                            ? itemOption[optionsObj.label]
                                            : itemOption.label));
                                    }))) : null,
                                type === 'radio' ? (React.createElement(Radio.Group, __assign({ style: { width: '100%', textAlign: "left" }, className: classesForm }, itemSecProps, { onChange: function (e) {
                                        changeFun(e, itemSec);
                                    }, value: value }), options &&
                                    options.map(function (itemOption, indexOption) {
                                        return (React.createElement(Radio, __assign({}, itemOption, { value: optionsObj && optionsObj.value
                                                ? "" + itemOption[optionsObj.value]
                                                : "" + itemOption.value, key: optionsObj && optionsObj.value
                                                ? itemOption[optionsObj.value]
                                                : itemOption.value }), optionsObj && optionsObj.label
                                            ? itemOption[optionsObj.label]
                                            : itemOption.label));
                                    }))) : null)))));
            })));
        });
    };
    var classes = classNames('form_components', className);
    return (React.createElement(ConfigProvider, { locale: zhCN },
        React.createElement("div", { className: classes }, initHtml(sourceList))));
};
FormComponent.defaultProps = {
    size: 'middle'
};
export default FormComponent;
