import React, {useState} from 'react'
import { Button } from 'antd'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import FormComponent from './FormComponent'
import FormComponentItem from './FormComponentItem'
let res:any;
export interface FormProps {
  Username:string;
  AreaLabel:any;
  Area:any;
  time:string;
  timeRange:string[];
}
export type DataSourceType<T = {}> = T & FormProps
const [ currentObj, setObj ] = useState({
  Username: '',
  AreaLabel: '',
  Area: '',
  time: '',
  timeRange: []
});
let QuickSearchProTypeDic = [
  {
      'key':'',
      'value':'所有'
  },
  {
      'key':'Jack',
      'value':'Jack'
  },
  {
      'key':'Lucy',
      'value':'Lucy'
  },
  {
      'key':'Tom',
      'value':'Tom'
  }
];
let sourceList=[
  [ // 多选
    { type: 'statusMultiple',md: 24, label: '多选', value: '', key: 'names',query: true,
      options: QuickSearchProTypeDic,
    },
  ],
  [ // 单选
    { type: 'status',md: 24, label: '单选', value: '', key: 'name',query: true,
      options: QuickSearchProTypeDic,
    },
  ],
  [
    { type: 'input',must:true,hint:true, hintText: '友情提示', label: 'Username', value: currentObj.Username, key: 'Username' },
    { 
      type: 'select', label: 'AreaLabel',
      mode: 'multiple',
      options:[
        {
          label: '北京'
        },
        {
          label: '上海'
        }
      ],
      optionsObj: {key: 'label', value: 'label'},
      value: currentObj.AreaLabel, key: 'AreaLabel'
    },
    { 
      type: 'select', label: 'Area',
      showSearch: true,
      onSearch:(e: string)=>{
        console.log(e)
      },
      options:[
        {
          key: 'beijing',
          value:'北京'
        },
        {
          key: 'shanghai',
          value:'上海'
        }
      ],
      value: currentObj.Area, key: 'Area'
    }
  ],
  [
    { type: 'time', label: 'time', value: currentObj.time, key: 'time' },
    { 
      type: 'timeRange', label: 'timeRange',value: currentObj.timeRange, key: 'timeRange',showTime: true,dateFormat: 'YYYY-MM-DD HH:mm:ss' 
    },
    { type: 'buttons',
      key: <div style={{ marginLeft: '10px', textAlign: 'right' }}>
        <Button type="primary" onClick={()=>{
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
const query = () => {
  console.log('backdt',res)
}
const callBcak = (dt:any, item:any) => {
  console.log(dt, item)
  res=dt
  if (item&&item.query) {
    query()
  }

}
const defaultFormComponent = () => (
  <>
    <FormComponent callBcak={(dt, item)=>{
        callBcak(dt, item)
        action('clicked')
      }
    } sourceList={sourceList} />
    <FormComponentItem />
  </>
)
storiesOf('FormComponent Component', module)
  .add('FormComponent', defaultFormComponent)