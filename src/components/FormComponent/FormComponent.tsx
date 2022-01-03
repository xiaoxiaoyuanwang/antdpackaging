import React, { useImperativeHandle } from 'react'
import {
  ConfigProvider,
  DatePicker,
  Input,
  Select,
  Checkbox,
  Radio,
  Form
} from 'antd';
import moment from 'moment'
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { RangePicker } = DatePicker;
/**
 * 页面中最常用的的元素，适合于完成特定的交互
 * ### 引用方法
 * 
 * ~~~js
 * import { FormComponent } from 'antdpackaging'
 * ~~~
 */
const FormComponent = React.forwardRef((props: any, ref) => {
  const {
    sourceList,
    ...formProps
  } = props
  const [form] = Form.useForm();
  
  // 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用
  useImperativeHandle(ref, () => ({
    // changeVal 就是暴露给父组件的方法
    form: form,
  }))
  // 选择表单类型
  const initItems = (itemProps: any) => {
    const {
      optionsObj,
      type,
      name,
      options,
      ...itemSecProps
    } = itemProps
    let strDom = null
    switch (type) {
      case 'text':
        strDom = name;
        break;

      case 'input':
        strDom = <Input
          placeholder="请输入"
          {...itemSecProps}
        />;
        break;
      case 'select':
        strDom = <Select
          getPopupContainer={triggerNode => triggerNode.parentNode}
          placeholder={'请选择'}
          {...itemSecProps}
        >
          {options &&
            options.map((itemOption: any, indexOption: number) => {
              return (
                <Select.Option
                  {...itemOption}
                  items={itemOption}
                  key={
                    optionsObj && optionsObj.value
                      ? itemOption[optionsObj.value]
                      : itemOption.value
                  }
                >
                  {optionsObj && optionsObj.label
                    ? itemOption[optionsObj.label]
                    : itemOption.label}
                </Select.Option>
              );
            })}
        </Select>;
        break;
      case 'time':
        strDom = <DatePicker
          style={{ width: '100%' }}
          placeholder="请选择日期"
          {...itemSecProps}
        />;
        break;
      case 'timeRange':
        strDom = <RangePicker
          style={{ width: '100%' }}
          {...itemSecProps}
        />;
        break;
      case 'checkbox':
        strDom = <Checkbox.Group
          {...itemSecProps}
        >
          {options &&
            options.map((itemOption: any, indexOption: number) => {
              return (
                <Checkbox
                  {...itemOption}
                  key={
                    optionsObj && optionsObj.value
                      ? itemOption[optionsObj.value]
                      : itemOption.value
                  }
                >
                  {optionsObj && optionsObj.label
                    ? itemOption[optionsObj.label]
                    : itemOption.label}
                </Checkbox>
              );
            })}
        </Checkbox.Group>;
        break;
      case 'radio':
        strDom = <Radio.Group
          {...itemSecProps}
        >
          {options &&
            options.map((itemOption: any, indexOption: number) => {
              return (
                <Radio
                  {...itemOption}
                  key={
                    optionsObj && optionsObj.value
                      ? itemOption[optionsObj.value]
                      : itemOption.value
                  }
                >
                  {optionsObj && optionsObj.label
                    ? itemOption[optionsObj.label]
                    : itemOption.label}
                </Radio>
              );
            })}
        </Radio.Group>;
        break;
      default:
        strDom = null;
        break;
    }
    return strDom;
  }
  const initHtml = (data: object[]) => {
    if (!data) {
      return;
    }
    return data.map((itemOne: any, indexOne: number) => {
      const {
        formitemprops,
        ...itemProps
      } = itemOne
      return <Form.Item
        key={indexOne}
        {...formitemprops}
      >
        {initItems({ ...itemProps })}
      </Form.Item>

    });
  }
  return (
    <ConfigProvider locale={zhCN}>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        {...formProps}
      >
        {initHtml(sourceList)}
      </Form>
    </ConfigProvider>
  )
})
export default FormComponent;
