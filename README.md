## antd components library

## 使用 React+typescript 的组件库


```bash

对于antd表单的二次封装，便于项目中方便使用，减少代码书写，
支持多种input、select、time方法，请参考antd

```

```javascript
// class用法
  <FormComponent
    sourceList={sourceList}
    cRef={(childRef)=>this.childRef = childRef}
  />

```

```javascript
// HOOK用法
// const childRef = useRef(null);

  <FormComponent
    sourceList={sourceList}
    cRef={childRef}
  />

```

```javascript
npm install antdpackaging --save
```

### 使用

```javascript
// 加载样式
import "antdpackaging/dist/index.css";

// 引入组件
import { FormComponent } from "antdpackaging";

// 代码示例
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

```