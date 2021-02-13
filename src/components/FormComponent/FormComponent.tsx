import React, { FC, useState, useEffect } from 'react'
import {
  ConfigProvider,
  DatePicker,
  Input,
  Row,
  Col,
  Select,
  Tooltip as TooltipAnt,
} from 'antd';
import {
  QuestionCircleOutlined
} from '@ant-design/icons';
import moment from 'moment'
import zhCN from 'antd/lib/locale/zh_CN';
import { checkTypeBackArray, checkTypeBackString } from '../utils/commonUtils'
import { FormComponentItemProps } from './FormComponentItem'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import classNames from 'classnames'
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD'

export type SizeType = 'small' | 'middle' | 'large' | undefined;
export type DataSourceType<T = {}> = T & FormComponentItemProps
export interface BaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
  /**设置 数据源 */
  sourceList: object[],
  /**设置 每行的className */
  className?: string;
  /**设置 每行的style */
  style?: React.CSSProperties;
  /**设置 回调函数,参数一为当前表单的数据,参数二为当前行的传入数据 */
  callBcak?: (backData: any, item?: DataSourceType) => void;
  /**设置 每一行表单的大小 'small' | 'middle' | 'large' */
  size?: SizeType;
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
    callBcak,
    ...restProps
  } = props
  const [currentObj, setObj] = useState({});
  const [currentDt, setDt] = useState<DataSourceType>()
  useEffect(() => {
    init(sourceList);
  }, []);
  useEffect(() => {
    if (callBcak) {
      callBcak(currentObj, currentDt);
    }
  }, [currentObj]);
  function changeFun(e: any, obj: DataSourceType, opt?: any) {
    let val: any;
    if (obj.type == 'time') {
      val = moment(e).format(obj.dateFormat || dateFormat) == 'Invalid date' ? '' : moment(e).format(obj.dateFormat || dateFormat);
    } else if (obj.type == 'timeRange') {
      try {
        if (e && e.length > 0) {
          let arg0 = e[0];
          let arg1 = e[1];
          val = [
            moment(arg0).format(obj.dateFormat || dateFormat) == 'Invalid date' ? '' : moment(arg0).format(obj.dateFormat || dateFormat),
            moment(arg1).format(obj.dateFormat || dateFormat) == 'Invalid date' ? '' : moment(arg1).format(obj.dateFormat || dateFormat),
          ];
        } else {
          val = [];
        }
      } catch (error) {
        val = [];
      }
    } else {
      val = e && e.target ? e.target.value : e;
    }
    let obj2 = JSON.parse(JSON.stringify(currentObj))
    obj2[obj.key] = val
    setDt(obj);
    setObj(obj2);

  }
  // 单选或多选选中
  function styleStatus(value: string | number, obj: DataSourceType) {
    let obj2 = JSON.parse(JSON.stringify(currentObj))

    if (obj.type == 'statusMultiple') {
      let oldMultiple = JSON.parse(JSON.stringify(currentObj[obj.key]));
      if (!value) {
        oldMultiple = [];
      } else {
        oldMultiple = checkTypeBackArray(oldMultiple);
        oldMultiple = oldMultiple.filter((item: string | number) => item != -1);
      }
      if (oldMultiple.indexOf(value) > -1) {
        oldMultiple = oldMultiple.filter((item: string | number) => item != value);
      } else {
        oldMultiple.push(value);
      }
      obj2[obj.key] = checkTypeBackString(oldMultiple)
    } else {
      obj2[obj.key] = value
    }
    setDt(obj);
    setObj(obj2);
  }
  // 初始化渲染
  function init(data: object[]) {
    if (!data) {
      return;
    }
    let obj = JSON.parse(JSON.stringify(currentObj))
    data.map((itemOne: any) => {
      itemOne.map((itemSec: DataSourceType) => {
        if (itemSec.type != 'text' && itemSec.type != 'buttons') {
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
    const classesRow = classNames('antdpackaging_row', className)
    return data.map((itemOne: any, indexOne: number) => {
      return (
        <Row key={indexOne} className={classesRow}>
          {itemOne.map((itemSec: DataSourceType, indexSec: number) => {
            const classesCol = classNames('antdpackaging_col', itemSec.colClassName)
            const classesLabel = classNames('antdpackaging_label', itemSec.labelClassName)
            const classesStatus = classNames('antdpackaging_status', itemSec.labelClassName)
            if (itemSec.type == 'buttons') {
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
            if (itemSec.type == 'status' || itemSec.type == 'statusMultiple') {
              return (
                <Col
                  md={itemSec.md || 24}
                  sm={24}
                  key={indexSec}
                  className={classesCol}
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
                          const classesStatusItem = classNames('antdpackaging_status_item unSelButton', itemSec.statusItemClassName, {
                            "selButton": checkTypeBackArray(currentObj[itemSec.key]).indexOf(
                              (itemOption.key).toString()
                            ) > -1 ||
                              (checkTypeBackArray(currentObj[itemSec.key]).length == 0 && itemOption.key == '')

                          })
                          return (
                            <div
                              onClick={() => {
                                styleStatus(itemOption.key, itemSec);
                              }}
                              key={indexOption}
                              className={classesStatusItem}
                            >
                              {itemOption.value}
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
                    <div style={{ flex: 1 }}>
                      {itemSec.type == 'text' ? itemSec.key : null}
                      {itemSec.type == 'input' ? (
                        <Input
                          size={restProps.size}
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
                      {itemSec.type == 'select' && !itemSec.showSearch ? (
                        <Select
                          size={restProps.size}
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
                                    itemSec.optionsObj && itemSec.optionsObj.key
                                      ? `${itemOption[itemSec.optionsObj.key]},${itemOption[itemSec.optionsObj.value]}`
                                      : `${itemOption.key},${itemOption.value}`
                                  }
                                  key={
                                    itemSec.optionsObj && itemSec.optionsObj.key
                                      ? itemOption[itemSec.optionsObj.key]
                                      : itemOption.key
                                  }
                                >
                                  {itemSec.optionsObj && itemSec.optionsObj.value
                                    ? itemOption[itemSec.optionsObj.value]
                                    : itemOption.value}
                                </Select.Option>
                              );
                            })}
                        </Select>
                      ) : null}
                      {itemSec.type == 'select' && itemSec.showSearch ? (
                        <Select
                          size={restProps.size}
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
                                    itemSec.optionsObj && itemSec.optionsObj.key
                                      ? `${itemOption[itemSec.optionsObj.key]},${itemOption[itemSec.optionsObj.value]}`
                                      : `${itemOption.key},${itemOption.value}`
                                  }
                                  key={
                                    itemSec.optionsObj && itemSec.optionsObj.key
                                      ? itemOption[itemSec.optionsObj.key]
                                      : itemOption.key
                                  }
                                >
                                  {itemSec.optionsObj && itemSec.optionsObj.value
                                    ? itemOption[itemSec.optionsObj.value]
                                    : itemOption.value}
                                </Select.Option>
                              );
                            })}
                        </Select>
                      ) : null}
                      {itemSec.type == 'time' ? (
                        <DatePicker
                          size={restProps.size}
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
                      {itemSec.type == 'timeRange' ? (
                        <RangePicker
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
  return (
    <ConfigProvider locale={zhCN}>
      {initHtml(sourceList)}
    </ConfigProvider>
  )
}
FormComponent.defaultProps = {
  size: 'middle'
}

export default FormComponent;
