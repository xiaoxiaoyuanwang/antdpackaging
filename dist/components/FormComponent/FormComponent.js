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
import React, { useImperativeHandle } from 'react';
import { ConfigProvider, DatePicker, Input, Select, Checkbox, Radio, Form } from 'antd';
import moment from 'moment';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
var RangePicker = DatePicker.RangePicker;
/**
 * 页面中最常用的的元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { FormComponent } from 'antdpackaging'
 * ~~~
 */
var FormComponent = React.forwardRef(function (props, ref) {
    var sourceList = props.sourceList, formProps = __rest(props, ["sourceList"]);
    var form = Form.useForm()[0];
    // 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用
    useImperativeHandle(ref, function () { return ({
        // changeVal 就是暴露给父组件的方法
        form: form,
    }); });
    // 选择表单类型
    var initItems = function (itemProps) {
        var optionsObj = itemProps.optionsObj, type = itemProps.type, name = itemProps.name, options = itemProps.options, itemSecProps = __rest(itemProps, ["optionsObj", "type", "name", "options"]);
        var strDom = null;
        switch (type) {
            case 'text':
                strDom = name;
                break;
            case 'input':
                strDom = React.createElement(Input, __assign({ placeholder: "\u8BF7\u8F93\u5165" }, itemSecProps));
                break;
            case 'select':
                strDom = React.createElement(Select, __assign({ getPopupContainer: function (triggerNode) { return triggerNode.parentNode; }, placeholder: '请选择' }, itemSecProps), options &&
                    options.map(function (itemOption, indexOption) {
                        return (React.createElement(Select.Option, __assign({}, itemOption, { items: itemOption, key: optionsObj && optionsObj.value
                                ? itemOption[optionsObj.value]
                                : itemOption.value }), optionsObj && optionsObj.label
                            ? itemOption[optionsObj.label]
                            : itemOption.label));
                    }));
                break;
            case 'time':
                strDom = React.createElement(DatePicker, __assign({ style: { width: '100%' }, placeholder: "\u8BF7\u9009\u62E9\u65E5\u671F" }, itemSecProps));
                break;
            case 'timeRange':
                strDom = React.createElement(RangePicker, __assign({ style: { width: '100%' } }, itemSecProps));
                break;
            case 'checkbox':
                strDom = React.createElement(Checkbox.Group, __assign({}, itemSecProps), options &&
                    options.map(function (itemOption, indexOption) {
                        return (React.createElement(Checkbox, __assign({}, itemOption, { key: optionsObj && optionsObj.value
                                ? itemOption[optionsObj.value]
                                : itemOption.value }), optionsObj && optionsObj.label
                            ? itemOption[optionsObj.label]
                            : itemOption.label));
                    }));
                break;
            case 'radio':
                strDom = React.createElement(Radio.Group, __assign({}, itemSecProps), options &&
                    options.map(function (itemOption, indexOption) {
                        return (React.createElement(Radio, __assign({}, itemOption, { key: optionsObj && optionsObj.value
                                ? itemOption[optionsObj.value]
                                : itemOption.value }), optionsObj && optionsObj.label
                            ? itemOption[optionsObj.label]
                            : itemOption.label));
                    }));
                break;
            default:
                strDom = null;
                break;
        }
        return strDom;
    };
    var initHtml = function (data) {
        if (!data) {
            return;
        }
        return data.map(function (itemOne, indexOne) {
            var formitemprops = itemOne.formitemprops, itemProps = __rest(itemOne, ["formitemprops"]);
            return React.createElement(Form.Item, __assign({ key: indexOne }, formitemprops), initItems(__assign({}, itemProps)));
        });
    };
    return (React.createElement(ConfigProvider, { locale: zhCN },
        React.createElement(Form, __assign({ form: form, labelCol: { span: 8 }, wrapperCol: { span: 16 }, autoComplete: "off" }, formProps), initHtml(sourceList))));
});
export default FormComponent;
