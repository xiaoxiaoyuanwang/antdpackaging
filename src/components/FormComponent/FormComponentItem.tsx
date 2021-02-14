import React from 'react'
export interface FormComponentItemProps extends Omit<React.AriaAttributes, ''> {
  /**设置 表单类型 status、statusMultiple、input、time、timeRange、text、select、buttons、checkbox、radio */
  type?: string;
  /**设置 label名称 */
  label?: string;
  /**设置 返回主键值， type为text、buttons时返回传入值*/
  key?: any;
  /**设置 是否必填*/
  must?: boolean;
  /**设置 默认回显值格式statusMultiple: 'value1,value2';timeRange: ['2021-02-12','2021-02-13']*/
  value?: string;
  /**设置 每行的col className */
  colClassName?: string;
  /**设置 form的className*/
  formClassName?: string;
  /**设置 labelClassName的className*/
  labelClassName?: string;
  /**设置 type为select、checkbox、radio、status、statusMultiple时的选项，
   * 格式[{key: '中国', value: '中国'}],选择返回key值
   * checkbox、radio格式[{key: '中国', value: '中国', disabled: true}]
   * 禁止某项
   */
  options?: object[];
  /**设置 Select 的模式为多选或标签 multiple | tags*/
  mode?: 'multiple' | 'tags';
  /**设置 type为select、checkbox、radio、status、statusMultiple时的选项显示和返回字段，如果options的格式不是[{key: '中国', value: '中国'}]，
   * 可以通过optionsObj实现，如[{label: '中国', value: '中国'}],设置optionsObj:{key:'label',value:'value'}
   * 选择返回label值
  */
  optionsObj?: { key: string, value: string };
  /**设置 type为time、timeRange的时间格式*/
  dateFormat?: string;
  /**设置 placeholder*/
  placeholder?: string;
  /**设置 值改变后是否立即查询，需在回调callBcak中判断*/
  query?: boolean;
  /**设置 是否有hint*/
  hint?: boolean;
  /**设置 是否有hint内容*/
  hintText?: React.ReactNode;
  /**设置 没一列占的宽度，参考antd的col*/
  md?: number;
  /**设置 每行的col 样式，如colStyle:{padding: 0}*/
  colStyle?: React.CSSProperties;
  /**设置 每行的label 样式，如labelStyle:{padding: 0}*/
  labelStyle?: React.CSSProperties;
  /**设置 type为status、statusMultiple的容器样式*/
  styleWrapper?: React.CSSProperties;
  showSearch?: boolean;
  disabled?: boolean;
  showTime?: boolean;
  maxLength?: number;
  allowClear?: boolean;
  disabledDate?: (e: any, opt?: any) => any;
  disabledTime?: (e: any, opt?: any) => any;
  onSearch?: (e: string) => void;
  onChange?: (e: any, opt?: any) => void;
}

const FormComponentItem: React.FC<FormComponentItemProps> = (props) => {
  return (<></>)
}

FormComponentItem.displayName = 'FormComponentItem'
export default FormComponentItem