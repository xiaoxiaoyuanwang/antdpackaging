## antd components library

## 使用 React+typescript 的组件库

```bash

对于antd表单的二次封装，便于项目中方便使用，减少代码书写，
支持多种input、select、time方法，支持form的所有属性，请参考antd


示例：

```

```javascript
// class用法
<FormComponent
  sourceList={sourceList}
  ref={(childRef) => (this.childRef = childRef)}
/>
```

```javascript
// HOOK用法
// const childRef = useRef(null);

<FormComponent
  sourceList={sourceList}
  ref={childRef}
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

export default App;

<div>
  <h3 style="margin: 20px 0px 0px;">FormComponent Component</h3>
  <table class="info-table" style="width: 100%;">
    <thead>
      <tr>
        <th width="10%" style="max-width: 10%;min-width: 10%;">property</th>
        <th width="20%" style="max-width: 20%;min-width: 20%;">propType</th>
        <th width="5%" style="max-width: 5%;min-width: 5%;">required</th>
        <th width="5%" style="max-width: 5%;min-width: 5%;">default</th>
        <th width="60%" style="max-width: 60%;min-width: 60%;">description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="info-table-monospace">sourceList</td>
        <td class="info-table-monospace"><span>object[]</span></td>
        <td>yes</td>
        <td>-</td>
        <td>设置 数据源</td>
      </tr>
    </tbody>
  </table>
</div>
