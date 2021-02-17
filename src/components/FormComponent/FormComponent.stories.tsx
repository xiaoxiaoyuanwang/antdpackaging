import React, { useState } from 'react'
import { Button } from 'antd'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import FormComponent from './FormComponent'
import FormComponentItem from './FormComponentItem'
import { disabledStartDt } from '../../utils/utils'
export interface FormProps {
  name: string;
  names: string[];
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
    name: '',
    names: ['Jack-value', 'Lucy-value'],
    Username: '',
    AreaLabel: ['shanghai'],
    Area: '',
    time: '',
    timeRange: [],
    checkbox: ['beijing', 'shanghai'],
    radio: '北京',
  });
  let QuickSearchTypeDic = [
    {
      'value': '',
      'label': '所有'
    },
    {
      'value': 'Jack-value',
      'label': 'Jack'
    },
    {
      'value': 'Lucy-value',
      'label': 'Lucy'
    },
    {
      'value': 'Tom-value',
      'label': 'Tom'
    }
  ];
  let QuickSearch = [
    {
      key: 'beijing',
      disabled: true,
      value: '北京',
      label: '北京'
    },
    {
      key: 'shanghai',
      value: '上海',
      label: '上海'
    }
  ];
  let sourceList = [
    [ // 多选
      {
        type: 'statusMultiple', md: 24, label: '多选', value: currentObj.names, name: 'names', query: true,
        options: QuickSearchTypeDic,
      },
    ],
    [ // 单选
      {
        type: 'status', md: 24, label: '单选', value: currentObj.name, name: 'name', query: true,
        options: QuickSearchTypeDic
      },
    ],
    [
      { type: 'input', addonBefore:"http://", must: true, hint: true, hintText: '友情提示', label: 'Username', value: currentObj.Username, name: 'Username' },
      {
        type: 'select', label: 'AreaLabel',
        mode: 'multiple',
        options: QuickSearch,
        optionsObj: { label: 'key', value: 'key' },
        value: currentObj.AreaLabel, name: 'AreaLabel'
      },
      {
        type: 'select', label: 'Area',
        showSearch: true,
        onSearch: (e: string) => {
          console.log(e)
        },
        options: QuickSearch,
        value: currentObj.Area, name: 'Area'
      }
    ],
    [
      { type: 'time', label: 'time', value: currentObj.time, name: 'time',
      disabledDate: (e:any)=>{
        // 自定义方法
        return disabledStartDt(e, '', '',true)
      }
    },
      {
        type: 'timeRange', md: 16, label: 'timeRange', value: currentObj.timeRange, name: 'timeRange', showTime: true, dateFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    ],
    [
      {
        type: 'checkbox', label: 'checkbox',
        options: QuickSearch,
        optionsObj: { label: 'value', value: 'key' },
        value: currentObj.checkbox, name: 'checkbox'
      },
      {
        type: 'radio', label: 'radio',
        options: QuickSearch,
        value: currentObj.radio, name: 'radio'
      },
      {
        type: 'buttons',
        name: <div style={{ marginLeft: '10px', textAlign: 'right' }}>
          <Button type="primary" onClick={() => {
            query()
            action('callBcak')
          }
          }>
            获取数据
          </Button>
        </div>
      }
    ]
  ]
  const query = (dt?:any, item?:any) => {
    if (dt) {
      // 点击后立即获取数据
      if (item&&item.query) {
        console.log('点击后立即获取数据',dt)
      }
    } else {
      // 点击获取数据按钮后获取数据
      console.log('点击按钮后获取数据',currentObj)
    }
  }
  const callBcak = (dt: any, item?: any) => {
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