import React, { FC, useState, useEffect, useImperativeHandle, useRef } from 'react'
import {
  ConfigProvider,
  DatePicker,
  Input,
  Row,
  Col,
  Select,
  Checkbox,
  Radio,
  Tooltip as TooltipAnt,
} from 'antd';
import {
  QuestionCircleOutlined
} from '@ant-design/icons';
import classNames from 'classnames'
import moment from 'moment'
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import { checkTypeBackArray } from '../../utils/utils'
import { FormComponentItemProps } from './FormComponentItem'
moment.locale('zh-cn');
const { RangePicker } = DatePicker;
const dateFormatBase = 'YYYY-MM-DD'

export type SizeType = 'small' | 'middle' | 'large' | undefined;
export type DataSourceType<T = {}> = T & FormComponentItemProps
export interface BaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
  /**设置 数据源 */
  sourceList: object[],
  /**设置 容器的className */
  className?: string;
  /**设置 每行的style */
  style?: React.CSSProperties;
  /**设置 回调函数,参数一为当前表单的数据,参数二为当前行的传入数据 */
  callBcak?: (backData: any, item?: any) => void;
  /**设置 每一行表单的大小 */
  size?: 'small' | 'middle' | 'large' | undefined;
  cRef?: any;
  /**设置是否需要表单校验 */
  checkForm?: boolean;
}
/**
 * 页面中最常用的的元素，适合于完成特定的交互
 * ### 引用方法
 * 
 * ~~~js
 * import { FormComponent } from 'antdpackaging'
 * ~~~
 */
export const FormComponent: FC<BaseProps> = (props) => {
  const {
    className,
    style,
    sourceList,
    children,
    size,
    cRef,
    checkForm,
    callBcak,
    ...restProps
  } = props
  const [currentObj, setObj] = useState({});
  const [currentObjTip, setObjTip] = useState({});
  let currentItem = useRef({})
  useEffect(() => {
    init(sourceList);
  }, []);
  // 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用
  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    getInfo: () => {
      checkRequired()
      let errorTip: string = ''
      for (const key in currentObjTip) {
        if (Object.prototype.hasOwnProperty.call(currentObjTip, key)) {
          const element = currentObjTip[key];
          if (element.error) {
            errorTip = element.message
          }
        }
      }
      return { data: currentObj, error: errorTip, currentItem: {} }
    }
  }))
  // 校验数据
  function checkRequired() {
    if (!sourceList) {
      return;
    }
    const currentObjTips = JSON.parse(JSON.stringify(currentObjTip))
    sourceList.forEach((itemOne: any) => {
      itemOne.forEach((itemSec: any) => {
        if (checkForm || itemSec.checkFormItem) {
          const tip = {
            error: false,
            message: ''
          }
          const element = itemSec.key || itemSec.name
          let requiredBack = requiredItem(itemSec)
          if (itemSec.pattern) {
            if (!(itemSec.pattern).test(currentObj[element])) {
              tip.error = true
              tip.message = itemSec.patternmsg || itemSec.message || `请填写正确格式的${itemSec.label}`
            } else {
              tip.error = requiredBack.error
              tip.message = requiredBack.message
            }
          } else {
            tip.error = requiredBack.error
            tip.message = requiredBack.message
          }
          currentObjTips[element] = tip
          setObjTip(currentObjTips)
        }
      });
    });
  }
  function requiredItem(item: any) {
    const element = item.key || item.name
    let ItemObj = {
      error: false,
      message: ''
    }
    if (item.must) {
      if (currentObj[element] === '' ||
        currentObj[element] === null ||
        currentObj[element] === undefined ||
        JSON.stringify(currentObj[element]) === '[]' ||
        JSON.stringify(currentObj[element]) === '{}'
      ) {
        ItemObj.error = true
        ItemObj.message = item.message || `请填写${item.label}`
      } else {
        ItemObj.error = false
        ItemObj.message = ''
      }
    }
    return ItemObj
  }
  useEffect(() => {
    // 校验
    checkRequired()
    if (callBcak) {
      back()
    }
  }, [currentObj]);
  // 回调函数
  function back() {
    checkRequired()
    let errorTip: string = ''
    for (const key in currentObjTip) {
      if (Object.prototype.hasOwnProperty.call(currentObjTip, key)) {
        const element = currentObjTip[key];
        if (element.error) {
          errorTip = element.message
        }
      }
    }
    if (callBcak) {
      callBcak({ data: currentObj, error: errorTip, currentItem: currentItem.current })
    }
  }
  function changeFun(e: any, obj: any, opt?: any) {
    let val: any;
    if (obj.type === 'time') {
      val = moment(e).format(obj.dateFormat || dateFormatBase) === 'Invalid date' ? '' : moment(e).format(obj.dateFormat || dateFormatBase);
    } else if (obj.type === 'timeRange') {
      try {
        if (e && e.length > 0) {
          let arg0 = e[0];
          let arg1 = e[1];
          val = [
            moment(arg0).format(obj.dateFormat || dateFormatBase) === 'Invalid date' ? '' : moment(arg0).format(obj.dateFormat || dateFormatBase),
            moment(arg1).format(obj.dateFormat || dateFormatBase) === 'Invalid date' ? '' : moment(arg1).format(obj.dateFormat || dateFormatBase),
          ];
        } else {
          val = [];
        }
      } catch (error) {
        val = []
      }
    } else {
      val = e && e.target ? e.target.value : e;
    }
    let currentObjNew = JSON.parse(JSON.stringify(currentObj))
    currentObjNew[obj.key || obj.name] = val
    obj.value = val
    currentItem.current = obj
    setObj(currentObjNew)
  }
  // 单选或多选选中
  function styleStatus(value: string | number, obj: any) {
    let currentObjNew = JSON.parse(JSON.stringify(currentObj))

    if (obj.type === 'statusMultiple') {
      let oldMultiple = currentObj[obj.key || obj.name] ? JSON.parse(JSON.stringify(currentObj[obj.key || obj.name])) : '';
      if (!value) {
        oldMultiple = [];
      } else {
        oldMultiple = checkTypeBackArray(oldMultiple);
        oldMultiple = oldMultiple.filter((item: string | number) => item !== -1);
      }
      if (oldMultiple.indexOf(value) > -1) {
        oldMultiple = oldMultiple.filter((item: string | number) => item !== value);
      } else {
        oldMultiple.push(value);
      }
      oldMultiple = oldMultiple.filter((item: string | number) => item != '')
      currentObjNew[obj.key || obj.name] = checkTypeBackArray(oldMultiple)
    } else {
      currentObjNew[obj.key || obj.name] = value
    }
    obj.value = value
    currentItem.current = obj
    // back(currentObjNew, obj)
    setObj(currentObjNew);
  }
  // 初始化渲染
  function init(data: object[]) {
    if (!data) {
      return;
    }
    let obj = JSON.parse(JSON.stringify(currentObj))
    data.forEach((itemOne: any) => {
      itemOne.forEach((itemSec: any) => {
        if (itemSec.type !== 'text' && itemSec.type !== 'buttons') {
          obj[itemSec.key || itemSec.name] = itemSec.value
        }
      });
    });
    setObj(obj)
  }
  const initHtml = (data: object[]) => {
    if (!data) {
      return;
    }
    const classesRow = classNames('antdpackaging_row')
    return data.map((itemOne: any, indexOne: number) => {
      return (
        <Row key={indexOne} className={classesRow}>
          {itemOne.map((itemSec: any, indexSec: number) => {
            const {
              optionsObj,
              value,
              type,
              label,
              must,
              name,
              key,
              options,
              colStyle,
              labelStyle,
              styleWrapper,
              colClassName,
              labelClassName,
              formClassName,
              md,
              hint,
              hintText,
              // disabledDate,
              dateFormat,
              onChange,
              checkFormItem,
              // disabledTime,
              ...itemSecProps
            } = itemSec
            const classesCol = classNames('antdpackaging_col', colClassName)
            const classesLabel = classNames('antdpackaging_label', labelClassName, {
              [`antdpackaging_size_${size}`]: size
            })
            const classesStatus = classNames('antdpackaging_status', labelClassName, {
              [`antdpackaging_status_${size}`]: size
            })
            const classesForm = classNames(formClassName)
            if (type === 'buttons') {
              return (
                <Col
                  md={md || 8}
                  sm={24}
                  key={indexSec}
                  className={classesCol}
                  style={{
                    ...colStyle
                  }}
                >
                  {key || name}
                </Col>
              );
            }
            if (type === 'status' || type === 'statusMultiple') {
              return (
                <Col
                  md={md || 24}
                  sm={24}
                  key={indexSec}
                  className={classNames('antdpackaging_status_col', classesCol)}
                  style={{
                    ...colStyle
                  }}
                >
                  <div
                    className='antdpackaging_status_wrapper'
                    style={{ ...styleWrapper }}
                  >
                    <div
                      className={classesStatus}
                      style={{
                        ...labelStyle,
                      }}
                    >
                      {
                        must ?
                          <span style={{ color: 'red' }}>*</span>
                          : null
                      }
                      {label}
                    </div>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      {options &&
                        options.map((itemOption: any, indexOption: number) => {
                          const keyres = optionsObj && optionsObj.value
                            ? itemOption[optionsObj.value]
                            : itemOption.value
                          const valres = optionsObj && optionsObj.label
                            ? itemOption[optionsObj.label]
                            : itemOption.label
                          const classesStatusItem = classNames('antdpackaging_status_item unSelButton', itemSec.formClassName, {
                            [`antdpackaging_status_item_${size}`]: size,
                            "selButton": checkTypeBackArray(currentObj[key || name]).indexOf(
                              (keyres).toString()
                            ) > -1 ||
                              (checkTypeBackArray(currentObj[key || name]).length === 0 && keyres === '')

                          })
                          return (
                            <div
                              onClick={() => {
                                styleStatus(keyres, itemSec);
                              }}
                              key={indexOption}
                              className={classesStatusItem}
                            >
                              {valres}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </Col>
              );
            }
            return (
              <Col
                md={md || 8}
                sm={24}
                key={indexSec}
                className={classesCol}
                style={{
                  ...colStyle
                }}
              >
                <div>
                  <div style={{ display: 'flex', }}>
                    <div
                      className={classesLabel}
                      style={{
                        ...labelStyle,
                      }}
                    >
                      {
                        must ?
                          <span style={{ color: 'red' }}>*</span>
                          : null
                      }
                      {label}
                      {hint ? (
                        <TooltipAnt placement="top" title={() => <div>{hintText}</div>}>
                          <QuestionCircleOutlined className='antdpackaging_hint' />
                        </TooltipAnt>
                      ) : null}
                      ：
                    </div>
                    <div className="antdpackaging_form_wrapper">
                      {type === 'text' ? (key || name) : null}
                      {type === 'input' ? (
                        <Input
                          className={classesForm}
                          size={size}
                          placeholder="请输入"
                          {...itemSecProps}
                          onChange={(e) => {
                            changeFun(e, itemSec);
                            if (onChange) {
                              onChange(e);
                            }
                          }}
                        />
                      ) : null}
                      {type === 'select' ? (
                        <Select
                          className={classesForm}
                          size={size}
                          getPopupContainer={triggerNode => triggerNode.parentNode}
                          style={{ width: '100%' }}
                          placeholder={'请选择'}
                          {...itemSecProps}
                          value={(value)}
                          onChange={(e, opt) => {
                            changeFun(e, itemSec, opt);
                            if (onChange) {
                              onChange(e, opt);
                            }
                          }}
                        >
                          {options &&
                            options.map((itemOption: any, indexOption: number) => {
                              return (
                                <Select.Option
                                  {...itemOption}
                                  items={itemOption}
                                  value={
                                    optionsObj && optionsObj.value
                                      ? `${itemOption[optionsObj.value]}`
                                      : `${itemOption.value}`
                                  }
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
                        </Select>
                      ) : null}
                      {type === 'time' ? (
                        <DatePicker
                          style={{ width: '100%' }}
                          className={classesForm}
                          size={size}
                          placeholder="请选择日期"
                          // disabledDate={(e) => { return disabledDate ? disabledDate(e) : null }}
                          {...itemSecProps}
                          value={value ? moment(value, dateFormat || dateFormatBase) : undefined}
                          onChange={e => {
                            changeFun(e, itemSec);
                            if (onChange) {
                              onChange(e);
                            }
                          }}
                        />
                      ) : null}
                      {type === 'timeRange' ? (
                        <RangePicker
                          style={{ width: '100%' }}
                          className={classesForm}
                          // disabledDate={(e) => { return disabledDate ? disabledDate(e) : null }}
                          // disabledTime={(_, type) => { return disabledTime ? disabledTime(_, type) : null }}
                          {...itemSecProps}
                          value={
                            value && value.length > 0
                              ? [
                                moment(value[0], dateFormat || dateFormatBase),
                                moment(value[1], dateFormat || dateFormatBase)
                              ]
                              : null
                          }
                          onChange={e => {
                            changeFun(e, itemSec);
                            if (onChange) {
                              onChange(e);
                            }
                          }}
                        // placeholder="请选择日期"
                        />
                      ) : null}
                      {type === 'checkbox' ? (
                        <Checkbox.Group
                          style={{ width: '100%', textAlign: "left" }}
                          className={classesForm}
                          {...itemSecProps}
                          value={checkTypeBackArray(value)}
                          onChange={e => {
                            changeFun(e, itemSec);
                            if (onChange) {
                              onChange(e);
                            }
                          }}
                        >
                          {options &&
                            options.map((itemOption: any, indexOption: number) => {
                              return (
                                <Checkbox
                                  {...itemOption}
                                  value={
                                    optionsObj && optionsObj.value
                                      ? `${itemOption[optionsObj.value]}`
                                      : `${itemOption.value}`
                                  }
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
                        </Checkbox.Group>
                      ) : null}
                      {type === 'radio' ? (
                        <Radio.Group
                          style={{ width: '100%', textAlign: "left" }}
                          className={classesForm}
                          {...itemSecProps}
                          onChange={e => {
                            changeFun(e, itemSec);
                            if (onChange) {
                              onChange(e);
                            }
                          }}
                          value={value}
                        >
                          {options &&
                            options.map((itemOption: any, indexOption: number) => {
                              return (
                                <Radio
                                  {...itemOption}
                                  value={
                                    optionsObj && optionsObj.value
                                      ? `${itemOption[optionsObj.value]}`
                                      : `${itemOption.value}`
                                  }
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
                        </Radio.Group>
                      ) : null}
                      {
                        (checkForm || checkFormItem) && currentObjTip[key || name] && currentObjTip[key || name].error ?
                          <div className="antdpackaging_tip">{currentObjTip[key || name].message}</div>
                          : null
                      }
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      );
    });
  }
  const classes = classNames('form_components', className)
  return (
    <ConfigProvider locale={zhCN}>
      <div className={classes}>
        {initHtml(sourceList)}
      </div>
    </ConfigProvider>
  )
}
FormComponent.defaultProps = {
  size: 'middle',
  checkForm: false
}

export default FormComponent;
