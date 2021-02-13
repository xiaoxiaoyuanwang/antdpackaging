import React, { FC } from 'react';
import { FormComponentItemProps } from './FormComponentItem';
import 'moment/locale/zh-cn';
export declare type SizeType = 'small' | 'middle' | 'large' | undefined;
export declare type DataSourceType<T = {}> = T & FormComponentItemProps;
export interface BaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
    /**设置 数据源 */
    sourceList: object[];
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
export declare const FormComponent: FC<BaseProps>;
export default FormComponent;
