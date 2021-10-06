import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'antd'
import { storiesOf } from '@storybook/react'
import FormComponent from './FormComponent'
const defaultFormComponent = () => {
  const childRef = useRef();
  const [currentObj, setObj] = useState({
    Username: "uu",
    AreaLabel: ["shanghai"],
    Area: "",
    time: "",
    timeRange: [],
    checkbox: ["beijing", "shanghai"],
    radio: "",
  });
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
    [
      {
        type: "input",
        addonBefore: "http://",
        must: true,
        hint: true,
        hintText: "友情提示",
        label: "Username",
        pattern: /^[0-9]*$/,
        patternmsg: "请输入数字",
        name: "Username",
        onChange: (e: any) => {
          console.log("onChange", e);
        },
      },
      {
        type: "select",
        label: "AreaLabel",
        must: true,
        mode: "multiple",
        options: QuickSearch,
        optionsObj: { label: "key", value: "key" },
        name: "AreaLabel",
      },
      {
        type: "select",
        label: "Area",
        must: true,
        showSearch: true,
        onSearch: (e: any) => {
          console.log(e);
        },
        options: QuickSearch,
        name: "Area",
      },
    ],
    [
      {
        type: "time",
        label: "time",
        name: "time",
        rules: [{ required: true }],
        disabledDate: (e: any) => {
          // 自定义方法
          // return disabledStartDt(e, '', '',true)
        },
      },
      {
        type: "timeRange",
        label: "timeRange",
        name: "timeRange",
      },
    ],
    [
      {
        type: "checkbox",
        label: "checkbox",
        options: QuickSearch,
        optionsObj: { label: "value", value: "key" },
        name: "checkbox",
      },
      {
        type: "radio",
        label: "radio",
        options: QuickSearch,
        name: "radio",
      },
      {
        type: "buttons",
        name: (
          <div style={{ marginLeft: "10px", textAlign: "right" }}>
            <Button
              type="primary"
              onClick={() => {
                query();
              }}
            >
              获取数据
            </Button>
          </div>
        ),
      },
    ],
  ];

  const query = () => {
    console.log(childRef.current);
    if (childRef.current) {
      // childRef.current.form.validateFields()
      //   .then((values:any) => {
      //     console.log(values);

      //   })
      //   .catch((errorInfo:any) => {
      //     console.log(errorInfo);
      //   })
    }
  };
  useEffect(() => {
    console.log(childRef.current);

    setTimeout(() => {
      if (childRef.current) {
        // childRef.current.form.setFieldsValue({ 
        //   Username: currentObj.Username,
        //   AreaLabel: currentObj.AreaLabel,
        //   radio: currentObj.radio,
        //   checkbox: currentObj.checkbox,
        //  });
      }
    }, 100)
  }, []);
  return <>
    <FormComponent
      sourceList={sourceList}
      cRef={childRef}
    />
  </>
}
storiesOf('FormComponent Component', module)
  .add('FormComponent', defaultFormComponent)