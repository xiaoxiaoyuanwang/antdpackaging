import React, { useState } from 'react'
import { Button } from 'antd'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import FormComponent from './FormComponent'
import FormComponentItem, { FormComponentItemProps } from './FormComponentItem'
export interface FormProps {
  name: string;
  names: string;
  Username: string;
  AreaLabel: string[];
  Area: any;
  time: string;
  timeRange: string[];
  checkbox: string[];
  radio: string;
}
export type DataSourceType<T = {}> = T & FormProps
const defaultFormComponent = () => {
  const [ currentObj, setObj ] = useState<DataSourceType>({
    name: 'Jack',
    names: 'Jack,Lucy',
    Username: '',
    AreaLabel: [],
    Area: '',
    time: '',
    timeRange: [],
    checkbox: ['上海', '北京'],
    radio: '北京',
  });
  let QuickSearchProTypeDic = [
    {
      'key': '',
      'value': '所有'
    },
    {
      'key': 'Jack',
      'value': 'Jack'
    },
    {
      'key': 'Lucy',
      'value': 'Lucy'
    },
    {
      'key': 'Tom',
      'value': 'Tom'
    }
  ];
  let QuickSearch = [
    {
      key: 'beijing',
      label: 'beijing',
      disabled: true,
      value: '北京'
    },
    {
      key: 'shanghai',
      label: 'shanghai',
      value: '上海'
    }
  ];
  let sourceList = [
    [ // 多选
      {
        type: 'statusMultiple', md: 24, label: '多选', value: currentObj.names, key: 'names', query: true,
        options: QuickSearchProTypeDic
      },
    ],
    [ // 单选
      {
        type: 'status', md: 24, label: '单选', value: currentObj.name, key: 'name', query: true,
        options: QuickSearchProTypeDic
      },
    ],
    [
      { type: 'input', must: true, hint: true, hintText: '友情提示', label: 'Username', value: currentObj.Username, key: 'Username' },
      {
        type: 'select', label: 'AreaLabel',
        mode: 'multiple',
        options: QuickSearch,
        optionsObj: { key: 'label', value: 'label' },
        value: currentObj.AreaLabel, key: 'AreaLabel'
      },
      {
        type: 'select', label: 'Area',
        showSearch: true,
        onSearch: (e: string) => {
          console.log(e)
        },
        options: QuickSearch,
        value: currentObj.Area, key: 'Area'
      }
    ],
    [
      {
        type: 'checkbox', label: 'checkbox',
        options: QuickSearch,
        optionsObj: { key: 'value', value: 'value' },
        value: currentObj.checkbox, key: 'checkbox'
      },
      {
        type: 'radio', label: 'radio',
        options: QuickSearch,
        optionsObj: { key: 'value', value: 'value' },
        value: currentObj.radio, key: 'radio'
      },
    ],
    [
      { type: 'time', label: 'time', value: currentObj.time, key: 'time' },
      {
        type: 'timeRange', label: 'timeRange', value: currentObj.timeRange, key: 'timeRange', showTime: true, dateFormat: 'YYYY-MM-DD HH:mm:ss'
      },
      {
        type: 'buttons',
        key: <div style={{ marginLeft: '10px', textAlign: 'right' }}>
          <Button type="primary" onClick={() => {
            query()
            action('callBcak')
          }
          }>
            查询
          </Button>
        </div>
      }
    ]
  ]
  const query = (dt?:any, item?:FormComponentItemProps) => {
    if (dt) {
      // 点击后立即查询
      if (item&&item.query) {
        console.log('点击后立即查询',dt)
      }
    } else {
      // 点击查询按钮后查询
      console.log('点击查询按钮后查询',currentObj)
    }
  }
  const callBcak = (dt: any, item?: FormComponentItemProps) => {
    console.log('callBcak回调数据' , dt, item)
    setObj(dt)
    query(dt, item)
  
  }
  return <>
    <FormComponent
    callBcak={(dt, item) => {
        callBcak(dt, item)
        action('clicked')
      }
    }
    sourceList={sourceList}
    />
    <FormComponentItem />
  </>
}
storiesOf('FormComponent Component', module)
  .add('FormComponent', defaultFormComponent)