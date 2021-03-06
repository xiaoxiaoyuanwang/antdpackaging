import React, { useState, useRef } from "react";
import { Button } from "antd";
import FormComponent from "./components/FormComponent";

function App() {
  const childRef = useRef(null);
  const [currentObj, setObj] = useState({
    name: "",
    names: ["Jack-value"],
    Username: "",
    AreaLabel: ["shanghai"],
    Area: "",
    time: "",
    timeRange: [],
    checkbox: ["beijing", "shanghai"],
    radio: "",
  });
  let QuickSearchTypeDic = [
    {
      value: "",
      label: "所有",
    },
    {
      value: "Jack-value",
      label: "Jack",
    },
    {
      value: "Lucy-value",
      label: "Lucy",
    },
    {
      value: "Tom-value",
      label: "Tom",
    },
  ];
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
      // 多选
      {
        type: "statusMultiple",
        md: 24,
        label: "多选",
        value: currentObj.names,
        name: "names",
        query: true,
        options: QuickSearchTypeDic,
      },
    ],
    [
      // 单选
      {
        type: "status",
        md: 24,
        label: "单选",
        value: currentObj.name,
        name: "name",
        query: true,
        options: QuickSearchTypeDic,
      },
    ],
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
        value: currentObj.Username,
        name: "Username",
        onChange: (e) => {
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
        value: currentObj.AreaLabel,
        name: "AreaLabel",
      },
      {
        type: "select",
        label: "Area",
        must: true,
        showSearch: true,
        onSearch: (e) => {
          console.log(e);
        },
        options: QuickSearch,
        value: currentObj.Area,
        name: "Area",
      },
    ],
    [
      {
        type: "time",
        label: "time",
        value: currentObj.time,
        name: "time",
        disabledDate: (e) => {
          // 自定义方法
          // return disabledStartDt(e, '', '',true)
        },
      },
      {
        type: "timeRange",
        md: 16,
        label: "timeRange",
        value: currentObj.timeRange,
        name: "timeRange",
        showTime: true,
        dateFormat: "YYYY-MM-DD HH:mm:ss",
      },
    ],
    [
      {
        type: "checkbox",
        label: "checkbox",
        options: QuickSearch,
        optionsObj: { label: "value", value: "key" },
        value: currentObj.checkbox,
        name: "checkbox",
      },
      {
        type: "radio",
        label: "radio",
        options: QuickSearch,
        value: currentObj.radio,
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

  const query = (dt) => {
    if (dt) {
      // 点击后立即获取数据
      if (dt.currentItem && dt.currentItem.query) {
        console.log("点击后立即获取数据", dt);
      }
    } else {
      let data = childRef.current.getInfo();
      if (data.error) {
        console.log("请填写完整的数据", data);
      }
      // 点击获取数据按钮后获取数据
      console.log("点击查询按钮后获取数据", currentObj);
    }
  };
  // useEffect(() => {
  //   if (currentItem && currentItem.query) {
  //     query()
  //   }
  // }, [currentObj]);
  const callBcak = (dt) => {
    // setItem(item)
    setObj(dt.data);
    query(dt);
  };
  return (
    <div className="App">
      <FormComponent
        checkForm
        callBcak={(dt) => {
          callBcak(dt);
        }}
        sourceList={sourceList}
        cRef={childRef}
      />
    </div>
  );
}

export default App;
