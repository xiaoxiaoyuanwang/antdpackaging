## antd components library

## 使用 React+typescript 的组件库


```bash
```javascript
<b>v0.2.1</b>
```
修复input无法设置默认值问题

```

```bash

对于antd表单的二次封装，便于项目中方便使用，减少代码书写，
支持多种input、select、time方法，请参考antd

```
```bash

新增表单验证以及正则表达，如果不需要表单验证，可以不用checkForm、cRef，示例：

```
```javascript
// 不需要表单验证
  <FormComponent
    callBcak={(dt, item) => {
      callBcak(dt, item);
    }}
    sourceList={sourceList}
  />

```

```javascript
// class用法
  <FormComponent
    checkForm
    callBcak={(dt, item) => {
      callBcak(dt, item);
    }}
    sourceList={sourceList}
    cRef={(childRef)=>this.childRef = childRef}
  />

```

```javascript
// HOOK用法
// const childRef = useRef(null);

  <FormComponent
    checkForm
    callBcak={(dt, item) => {
      callBcak(dt, item);
    }}
    sourceList={sourceList}
    cRef={childRef}
  />

```


<p align="center">
  <img width="900" src="./src/assets/example.png">
</p>

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
    // dt.data请写在state里面，不然页面不会重新渲染
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
```

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
      <tr>
        <td class="info-table-monospace">className</td>
        <td class="info-table-monospace"><span>string</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 容器的className</td>
      </tr>
      <tr>
        <td class="info-table-monospace">style</td>
        <td class="info-table-monospace"><span>CSSProperties</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 每行的style</td>
      </tr>
      <tr>
        <td class="info-table-monospace">callBcak</td>
        <td class="info-table-monospace"><span>((backData: any, item?: FormComponentItemProps) =&gt; void) |
            undefined</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 回调函数,参数一为当前表单的数据,参数二为当前行的传入数据</td>
      </tr>
      <tr>
        <td class="info-table-monospace">size</td>
        <td class="info-table-monospace"><span>"small" | "middle" | "large"</span></td>
        <td>-</td>
        <td><span>middle</span></td>
        <td>设置 每一行表单的大小</td>
      </tr>
      <tr>
        <td class="info-table-monospace">checkForm</td>
        <td class="info-table-monospace"><span>	boolean</span></td>
        <td>-</td>
        <td><span>false</span></td>
        <td>设置是否需要表单校验</td>
      </tr>
    </tbody>
  </table>
</div>
<div>
  <h3 style="margin: 20px 0px 0px;">SourceListItem</h3>
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
        <td class="info-table-monospace">type</td>
        <td class="info-table-monospace"><span>string</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 表单类型 status、statusMultiple、input、time、timeRange、text、select、buttons、checkbox、radio</td>
      </tr>
      <tr>
        <td class="info-table-monospace">label</td>
        <td class="info-table-monospace"><span>string</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 label名称</td>
      </tr>
      <tr>
        <td class="info-table-monospace">name</td>
        <td class="info-table-monospace"><span>any</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 返回主键值， 当type为text、buttons时返回传入值</td>
      </tr>
      <tr>
        <td class="info-table-monospace">value</td>
        <td class="info-table-monospace"><span>string</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 默认回显值格式statusMultiple: ['value1', 'value2'];timeRange: ['2021-02-12','2021-02-13']</td>
      </tr>
      <tr>
        <td class="info-table-monospace">must</td>
        <td class="info-table-monospace"><span>boolean</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 是否必填</td>
      </tr>
      <tr>
        <td class="info-table-monospace">checkFormItem</td>
        <td class="info-table-monospace"><span>boolean</span></td>
        <td>-</td>
        <td>false</td>
        <td>设置 表单校验</td>
      </tr>
      <tr>
        <td class="info-table-monospace">message</td>
        <td class="info-table-monospace"><span>string</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 表单校验提示信息</td>
      </tr>
      <tr>
        <td class="info-table-monospace">colClassName</td>
        <td class="info-table-monospace"><span>string</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 每行的col className</td>
      </tr>
      <tr>
        <td class="info-table-monospace">formClassName</td>
        <td class="info-table-monospace"><span>string</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 form的className</td>
      </tr>
      <tr>
        <td class="info-table-monospace">labelClassName</td>
        <td class="info-table-monospace"><span>string</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 labelClassName的className</td>
      </tr>
      <tr>
        <td class="info-table-monospace">options</td>
        <td class="info-table-monospace"><span>object[]</span></td>
        <td>-</td>
        <td>-</td>
        <td><span> 设置 type为select、checkbox、radio、status、statusMultiple时的选项，</span><span><br> 格式[{label: '中国', value:
            '中国'}],选择返回label值</span><span><br> checkbox、radio格式[{label: '中国', value: '中国', disabled: true}]</span><span><br>
            禁止某项</span></td>
      </tr>
      <tr>
        <td class="info-table-monospace">mode</td>
        <td class="info-table-monospace"><span>"multiple" | "tags"</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 Select 的模式为多选或标签 multiple | tags</td>
      </tr>
      <tr>
        <td class="info-table-monospace">optionsObj</td>
        <td class="info-table-monospace"><span>{ label: string; value: string; }</span></td>
        <td>-</td>
        <td>-</td>
        <td><span> 设置 type为select、checkbox、radio、status、statusMultiple时的选项显示和返回字段，如果options的格式不是[{label: '中国', value:
            '中国'}]，</span><span><br> 可以通过optionsObj实现，如[{label: '中国', value:
            '中国'}],设置optionsObj:{label:'label',value:'key'}</span><span><br> 选择返回key值</span></td>
      </tr>
      <tr>
        <td class="info-table-monospace">dateFormat</td>
        <td class="info-table-monospace"><span>string</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 type为time、timeRange的时间格式</td>
      </tr>
      <tr>
        <td class="info-table-monospace">placeholder</td>
        <td class="info-table-monospace"><span>string</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 placeholder</td>
      </tr>
      <tr>
        <td class="info-table-monospace">query</td>
        <td class="info-table-monospace"><span>boolean</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 值改变后是否立即查询，需在回调callBcak中判断</td>
      </tr>
      <tr>
        <td class="info-table-monospace">pattern</td>
        <td class="info-table-monospace"><span>string</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 正则表达式</td>
      </tr>
      <tr>
        <td class="info-table-monospace">patternmsg</td>
        <td class="info-table-monospace"><span>string</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 正则表达式提示信息</td>
      </tr>
      <tr>
        <td class="info-table-monospace">hint</td>
        <td class="info-table-monospace"><span>boolean</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 是否有hint</td>
      </tr>
      <tr>
        <td class="info-table-monospace">hintText</td>
        <td class="info-table-monospace"><span>ReactNode</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 是否有hint内容</td>
      </tr>
      <tr>
        <td class="info-table-monospace">md</td>
        <td class="info-table-monospace"><span>number</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 没一列占的宽度，参考antd的col</td>
      </tr>
      <tr>
        <td class="info-table-monospace">colStyle</td>
        <td class="info-table-monospace"><span>CSSProperties</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 每行的col 样式，如colStyle:{padding: 0}</td>
      </tr>
      <tr>
        <td class="info-table-monospace">labelStyle</td>
        <td class="info-table-monospace"><span>CSSProperties</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 每行的label 样式，如labelStyle:{padding: 0}</td>
      </tr>
      <tr>
        <td class="info-table-monospace">styleWrapper</td>
        <td class="info-table-monospace"><span>CSSProperties</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 type为status、statusMultiple的容器样式</td>
      </tr>
      <tr>
        <td class="info-table-monospace">onChange</td>
        <td class="info-table-monospace"><span>((e: any, opt?: any) =&gt; void)</span></td>
        <td>-</td>
        <td>-</td>
        <td></td>
      </tr>
    </tbody>
  </table>
