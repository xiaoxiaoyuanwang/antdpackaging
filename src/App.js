import React, { useState, useRef, useEffect } from "react";
import { Button } from "antd";
import FormComponent from "./components/FormComponent";

function App() {
  const childRef = useRef(null);
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
        label: "Username",
        pattern: /^[0-9]*$/,
        rules:[{ required: true }],
        name: "Username",
        onChange: (e) => {
          console.log("onChange", e);
        },
      },
      {
        type: "select",
        label: "AreaLabel",
        mode: "multiple",
        options: QuickSearch,
        rules:[{ required: true }],
        optionsObj: { label: "key", value: "key" },
        name: "AreaLabel",
      },
      {
        type: "select",
        label: "Area",
        showSearch: true,
        onSearch: (e) => {
          console.log(e);
        },
        rules:[{ required: true }],
        options: QuickSearch,
        name: "Area",
      },
    ],
    [
      {
        type: "time",
        label: "time",
        name: "time",
        rules:[{ required: true }],
      },
      {
        type: "timeRange",
        label: "timeRange",
        name: "timeRange",
        rules:[{ required: true }],
      },
    ],
    [
      {
        type: "checkbox",
        label: "checkbox",
        options: QuickSearch,
        optionsObj: { label: "value", value: "key" },
        name: "checkbox",
        rules:[{ required: true }],
      },
      {
        type: "radio",
        label: "radio",
        options: QuickSearch,
        name: "radio",
        rules:[{ required: true }],
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

    childRef.current.form.validateFields()
      .then(values => {
        console.log(values);
        
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      })
  };
  useEffect(() => {
    // 设置默认值
    setTimeout(()=>{
      if (childRef.current) {
        childRef.current.form.setFieldsValue({ 
          Username: currentObj.Username,
          AreaLabel: currentObj.AreaLabel,
          radio: currentObj.radio,
          checkbox: currentObj.checkbox,
         });
      }
    }, 100)
  }, []);
  return (
    <div className="App">
      <FormComponent
        sourceList={sourceList}
        cRef={childRef}
      />
    </div>
  );
}

export default App;
