import React, { useRef } from 'react'
import { Button } from 'antd'
import { storiesOf } from '@storybook/react'
import FormComponent from './FormComponent'
import moment from 'moment'
const defaultFormComponent = () => {
  const childRef = useRef();
  let QuickSearch = [
    {
      key: "beijing",
      disabled: true,
      value: "北京",
      label: "北京",
    },
    {
      key: "shanghai",
      value: "上海",
      label: "上海",
    },
  ];
  let sourceList = [
    {
      type: "input",
      addonBefore: "http://",
      pattern: /^[0-9]*$/,
      patternmsg: "请输入数字",
      formitemprops: {
        label: "Username",
        name: "Username",
      },
      onChange: (e: any) => {
        console.log("onChange", e);
      },
    },
    {
      type: "select",
      mode: "multiple",
      formitemprops: {
        label: "AreaLabel",
        name: "AreaLabel",
      },
      options: QuickSearch,
      optionsObj: { label: "key", value: "key" },
    },
    {
      type: "select",
      formitemprops: {
        label: "Area",
        name: "Area",
      },
      onSearch: (e: any) => {
        console.log(e);
      },
      options: QuickSearch,
    },
    {
      type: "time",
      formitemprops: {
        label: "time",
        name: "time",
        rules: [{ required: true }],
      },
    },
    {
      type: "timeRange",
      label: "timeRange",
      formitemprops: {
        label: "timeRange",
        name: "timeRange",
      }
    },
    {
      type: "checkbox",
      formitemprops: {
        label: "checkbox",
        name: "checkbox",
      },
      options: QuickSearch,
      optionsObj: { label: "value", value: "key" },
    },
    {
      type: "radio",
      label: "radio",
      formitemprops: {
        label: "radio",
        name: "radio",
      },
      options: QuickSearch,
    }
  ];

  const query = () => {
    console.log(childRef.current);
    if (childRef.current && childRef.current.form) {
      childRef.current.form.validateFields()
        .then((values: any) => {
          console.log(values);

        })
        .catch((errorInfo: any) => {
          console.log(errorInfo);
        })
    }
  };
  return <>
    <FormComponent
      sourceList={sourceList}
      ref={childRef}
      initialValues={{
        'time': moment('2020-09-09'),
      }}
    />
    <Button
      type="primary"
      onClick={() => {
        query();
      }}
    >
      获取数据
    </Button>
  </>
}
storiesOf('FormComponent Component', module)
  .add('FormComponent', defaultFormComponent)