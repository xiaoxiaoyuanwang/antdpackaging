import React, { FC, useState, useEffect } from 'react'
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
const dateFormat = 'YYYY-MM-DD'

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
  callBcak?: (backData: any, item?: DataSourceType) => void;
  /**设置 每一行表单的大小 */
  size?: 'small' | 'middle' | 'large' | undefined;
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
    callBcak,
    ...restProps
  } = props
  const [currentObj, setObj] = useState({});
  const [currentDt, setDt] = useState<DataSourceType>()
  useEffect(() => {
    init(sourceList);
  }, []);
  // useEffect(() => {
  //   if (callBcak) {
  //     callBcak(currentObj, currentDt);
  //   }
  // }, [currentObj]);
  // 回调函数
  function back(obj: object,item: DataSourceType) {
    if (callBcak) {
      callBcak(obj, item);
    }
  }
  function changeFun(e: any, obj: DataSourceType, opt?: any) {
    let val: any;
    if (obj.type === 'time') {
      val = moment(e).format(obj.dateFormat || dateFormat) === 'Invalid date' ? '' : moment(e).format(obj.dateFormat || dateFormat);
    } else if (obj.type === 'timeRange') {
      try {
        if (e && e.length > 0) {
          let arg0 = e[0];
          let arg1 = e[1];
          val = [
            moment(arg0).format(obj.dateFormat || dateFormat) === 'Invalid date' ? '' : moment(arg0).format(obj.dateFormat || dateFormat),
            moment(arg1).format(obj.dateFormat || dateFormat) === 'Invalid date' ? '' : moment(arg1).format(obj.dateFormat || dateFormat),
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
    currentObjNew[obj.key] = val
    back(currentObjNew, obj)
    setObj(currentObjNew)

  }
  // 单选或多选选中
  function styleStatus(value: string | number, obj: DataSourceType) {
    let currentObjNew = JSON.parse(JSON.stringify(currentObj))

    if (obj.type === 'statusMultiple') {
      let oldMultiple = currentObj[obj.key] ? JSON.parse(JSON.stringify(currentObj[obj.key])) : '';
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
      currentObjNew[obj.key] = checkTypeBackArray(oldMultiple)
    } else {
      currentObjNew[obj.key] = value
    }
    back(currentObjNew, obj)
    setObj(currentObjNew);
  }
  // 初始化渲染
  function init(data: object[]) {
    if (!data) {
      return;
    }
    let obj = JSON.parse(JSON.stringify(currentObj))
    data.forEach((itemOne: any) => {
      itemOne.forEach((itemSec: DataSourceType) => {
        if (itemSec.type !== 'text' && itemSec.type !== 'buttons') {
          obj[itemSec.key] = itemSec.value
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
          {itemOne.map((itemSec: DataSourceType, indexSec: number) => {
            const classesCol = classNames('antdpackaging_col', itemSec.colClassName)
            const classesLabel = classNames('antdpackaging_label', itemSec.labelClassName, {
              [`antdpackaging_size_${size}`]: size
            })
            const classesStatus = classNames('antdpackaging_status', itemSec.labelClassName, {
              [`antdpackaging_status_${size}`]: size
            })
            const classesForm = classNames(itemSec.formClassName)
            if (itemSec.type === 'buttons') {
              return (
                <Col
                  md={itemSec.md || 8}
                  sm={24}
                  key={indexSec}
                  className={classesCol}
                  style={{
                    ...itemSec.colStyle
                  }}
                >
                  {itemSec.key}
                </Col>
              );
            }
            if (itemSec.type === 'status' || itemSec.type === 'statusMultiple') {
              return (
                <Col
                  md={itemSec.md || 24}
                  sm={24}
                  key={indexSec}
                  className={classNames('antdpackaging_status_col',classesCol)}
                  style={{
                    ...itemSec.colStyle
                  }}
                >
                  <div
                    className='antdpackaging_status_wrapper'
                    style={{ ...itemSec.styleWrapper }}
                  >
                    <div
                      className={classesStatus}
                      style={{
                        ...itemSec.labelStyle,
                      }}
                    >
                      {
                        itemSec.must ?
                          <span style={{ color: 'red' }}>*</span>
                          : null
                      }
                      {itemSec.label}
                    </div>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      {itemSec.options &&
                        itemSec.options.map((itemOption: any, indexOption: number) => {
                          const keyres = itemSec.optionsObj && itemSec.optionsObj.value
                            ? itemOption[itemSec.optionsObj.value]
                            : itemOption.value
                          const valres = itemSec.optionsObj && itemSec.optionsObj.label
                            ? itemOption[itemSec.optionsObj.label]
                            : itemOption.label
                          const classesStatusItem = classNames('antdpackaging_status_item unSelButton', itemSec.formClassName, {
                            [`antdpackaging_status_item_${size}`]: size,
                            "selButton": checkTypeBackArray(currentObj[itemSec.key]).indexOf(
                              (keyres).toString()
                            ) > -1 ||
                              (checkTypeBackArray(currentObj[itemSec.key]).length === 0 && keyres === '')

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
                md={itemSec.md || 8}
                sm={24}
                key={indexSec}
                className={classesCol}
                style={{
                  ...itemSec.colStyle
                }}
              >
                <div>
                  <div style={{ display: 'flex', }}>
                    <div
                      className={classesLabel}
                      style={{
                        ...itemSec.labelStyle,
                      }}
                    >
                      {
                        itemSec.must ?
                          <span style={{ color: 'red' }}>*</span>
                          : null
                      }
                      {itemSec.label}
                      {itemSec.hint ? (
                        <TooltipAnt placement="top" title={() => <div>{itemSec.hintText}</div>}>
                          <QuestionCircleOutlined className='antdpackaging_hint' />
                        </TooltipAnt>
                      ) : null}
                      ：
                    </div>
                    <div className="antdpackaging_form_wrapper">
                      {itemSec.type === 'text' ? itemSec.key : null}
                      {itemSec.type === 'input' ? (
                        <Input
                          className={classesForm}
                          size={size}
                          allowClear={itemSec.allowClear}
                          maxLength={itemSec.maxLength}
                          disabled={itemSec.disabled}
                          placeholder="请输入"
                          value={itemSec.value}
                          onChange={e => {
                            changeFun(e, itemSec);
                          }}
                        />
                      ) : null}
                      {itemSec.type === 'select' && !itemSec.showSearch ? (
                        <Select
                          className={classesForm}
                          size={size}
                          mode={itemSec.mode}
                          allowClear={itemSec.allowClear}
                          getPopupContainer={triggerNode => triggerNode.parentNode}
                          style={{ width: '100%' }}
                          placeholder={itemSec.placeholder || '请选择'}
                          value={itemSec.value}
                          onChange={(e, opt) => {
                            changeFun(e, itemSec, opt);
                          }}
                        >
                          {itemSec.options &&
                            itemSec.options.map((itemOption: any, indexOption: number) => {
                              return (
                                <Select.Option
                                  items={itemOption}
                                  value={
                                    itemSec.optionsObj && itemSec.optionsObj.value
                                      ? `${itemOption[itemSec.optionsObj.value]}`
                                      : `${itemOption.value}`
                                  }
                                  key={
                                    itemSec.optionsObj && itemSec.optionsObj.value
                                      ? itemOption[itemSec.optionsObj.value]
                                      : itemOption.value
                                  }
                                >
                                  {itemSec.optionsObj && itemSec.optionsObj.label
                                    ? itemOption[itemSec.optionsObj.label]
                                    : itemOption.label}
                                </Select.Option>
                              );
                            })}
                        </Select>
                      ) : null}
                      {itemSec.type === 'select' && itemSec.showSearch ? (
                        <Select
                          className={classesForm}
                          size={size}
                          mode={itemSec.mode}
                          allowClear={itemSec.allowClear}
                          getPopupContainer={triggerNode => triggerNode.parentNode}
                          style={{ width: '100%' }}
                          placeholder={itemSec.placeholder || '请选择'}
                          showSearch={itemSec.showSearch ? itemSec.showSearch : undefined}
                          value={itemSec.value}
                          onSearch={(e: string) => (itemSec.showSearch && itemSec.onSearch ? itemSec.onSearch(e) : undefined)}
                          onChange={(e, opt) => {
                            changeFun(e, itemSec, opt);
                          }}
                        >
                          {itemSec.options &&
                            itemSec.options.map((itemOption: any, indexOption: number) => {
                              return (
                                <Select.Option
                                  items={itemOption}
                                  value={
                                    itemSec.optionsObj && itemSec.optionsObj.value
                                      ? `${itemOption[itemSec.optionsObj.value]}`
                                      : `${itemOption.value}`
                                  }
                                  key={
                                    itemSec.optionsObj && itemSec.optionsObj.value
                                      ? itemOption[itemSec.optionsObj.value]
                                      : itemOption.value
                                  }
                                >
                                  {itemSec.optionsObj && itemSec.optionsObj.label
                                    ? itemOption[itemSec.optionsObj.label]
                                    : itemOption.label}
                                </Select.Option>
                              );
                            })}
                        </Select>
                      ) : null}
                      {itemSec.type === 'time' ? (
                        <DatePicker
                          className={classesForm}
                          size={size}
                          disabledDate={(e) => { return itemSec.disabledDate ? itemSec.disabledDate(e) : null }}
                          value={itemSec.value ? moment(itemSec.value, itemSec.dateFormat || dateFormat) : undefined}
                          onChange={e => {
                            changeFun(e, itemSec);
                          }}
                          disabled={itemSec.disabled}
                          style={{ width: '100%' }}
                          placeholder="请选择日期"
                        />
                      ) : null}
                      {itemSec.type === 'timeRange' ? (
                        <RangePicker
                          className={classesForm}
                          disabledDate={(e) => { return itemSec.disabledDate ? itemSec.disabledDate(e) : null }}
                          disabledTime={(_, type) => { return itemSec.disabledTime ? itemSec.disabledTime(_, type) : null }}
                          value={
                            itemSec.value && itemSec.value.length > 0
                              ? [
                                moment(itemSec.value[0], itemSec.dateFormat || dateFormat),
                                moment(itemSec.value[1], itemSec.dateFormat || dateFormat)
                              ]
                              : null
                          }
                          onChange={e => {
                            changeFun(e, itemSec);
                          }}
                          disabled={itemSec.disabled}
                          showTime={itemSec.showTime}
                          style={{ width: '100%' }}
                        // placeholder="请选择日期"
                        />
                      ) : null}
                      {itemSec.type === 'checkbox' ? (
                        <Checkbox.Group
                          style={{ width: '100%', textAlign: "left" }}
                          className={classesForm}
                          value={checkTypeBackArray(itemSec.value)}
                          onChange={e => {
                            changeFun(e, itemSec);
                          }}
                        >
                          {itemSec.options &&
                            itemSec.options.map((itemOption: any, indexOption: number) => {
                              return (
                                <Checkbox
                                  disabled={itemOption.disabled}
                                  value={
                                    itemSec.optionsObj && itemSec.optionsObj.value
                                      ? `${itemOption[itemSec.optionsObj.value]}`
                                      : `${itemOption.value}`
                                  }
                                  key={
                                    itemSec.optionsObj && itemSec.optionsObj.value
                                      ? itemOption[itemSec.optionsObj.value]
                                      : itemOption.value
                                  }
                                >
                                  {itemSec.optionsObj && itemSec.optionsObj.label
                                    ? itemOption[itemSec.optionsObj.label]
                                    : itemOption.label}
                                </Checkbox>
                              );
                            })}
                        </Checkbox.Group>
                      ) : null}
                      {itemSec.type === 'radio' ? (
                        <Radio.Group
                          style={{ width: '100%', textAlign: "left" }}
                          className={classesForm}
                          onChange={e => {
                            changeFun(e, itemSec);
                          }}
                          value={itemSec.value}
                        >
                          {itemSec.options &&
                            itemSec.options.map((itemOption: any, indexOption: number) => {
                              return (
                                <Radio
                                  disabled={itemOption.disabled}
                                  value={
                                    itemSec.optionsObj && itemSec.optionsObj.value
                                      ? `${itemOption[itemSec.optionsObj.value]}`
                                      : `${itemOption.value}`
                                  }
                                  key={
                                    itemSec.optionsObj && itemSec.optionsObj.value
                                      ? itemOption[itemSec.optionsObj.value]
                                      : itemOption.value
                                  }
                                >
                                  {itemSec.optionsObj && itemSec.optionsObj.label
                                    ? itemOption[itemSec.optionsObj.label]
                                    : itemOption.label}
                                </Radio>
                              );
                            })}
                        </Radio.Group>
                      ) : null}
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
  size: 'middle'
}

export default FormComponent;
