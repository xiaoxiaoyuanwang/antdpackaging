## antd components library
## 使用 React+typescript 的组件库

~~~javascript
npm install antdpackaging --save
~~~

### 使用
~~~javascript
// 加载样式
import 'antdpackaging/dist/index.css'
// 引入组件
import { FormComponent } from 'antdpackaging'
// 代码示例
function App() {
  const [currentObj, setObj] = useState({checkbox: "上海"});
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
        type: 'statusMultiple', md: 24, label: '多选', value: '', key: 'names', query: true,
        options: QuickSearchProTypeDic,
      },
    ],
    [ // 单选
      {
        type: 'status', md: 24, label: '单选', value: '', key: 'name', query: true,
        options: QuickSearchProTypeDic,
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
          }
          }>
            查询
        </Button>
        </div>
      }
    ]
  ]

  const query = () => (
    console.log(currentObj)
  )
  useEffect(() => {
  }, [currentObj]);
  const callBcak = (dt, item) => {
    setObj(dt)
    if (item && item.query) {
      query()
    }

  }
  return (
    <div className="App">
      <FormComponent callBcak={(dt, item) => {
        callBcak(dt, item)
      }
      } sourceList={sourceList} />
    </div>
  );
}

export default App;

~~~
<div>
  <h3 style="margin: 20px 0px 0px;">FormComponent Component</h3>
  <table class="info-table" style="width: 100%;">
    <thead>
      <tr>
        <th width="10%" style="max-width: 10%;min-width: 10%;">property</th>
        <th width="10%" style="max-width: 10%;min-width: 10%;">propType</th>
        <th width="5%" style="max-width: 5%;min-width: 5%;">required</th>
        <th width="5%" style="max-width: 5%;min-width: 5%;">default</th>
        <th width="70%" style="max-width: 70%;min-width: 70%;">description</th>
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
        <td>设置 每行的className</td>
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
        <td class="info-table-monospace"><span>SizeType</span></td>
        <td>-</td>
        <td><span>middle</span></td>
        <td>设置 每一行表单的大小 'small' | 'middle' | 'large'</td>
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
        <th width="10%" style="max-width: 10%;min-width: 10%;">propType</th>
        <th width="5%" style="max-width: 5%;min-width: 5%;">required</th>
        <th width="5%" style="max-width: 5%;min-width: 5%;">default</th>
        <th width="70%" style="max-width: 70%;min-width: 70%;">description</th>
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
        <td class="info-table-monospace">key</td>
        <td class="info-table-monospace"><span>any</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 返回主键值， type为text时返回传入值</td>
      </tr>
      <tr>
        <td class="info-table-monospace">must</td>
        <td class="info-table-monospace"><span>boolean</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 是否必填</td>
      </tr>
      <tr>
        <td class="info-table-monospace">value</td>
        <td class="info-table-monospace"><span>string</span></td>
        <td>-</td>
        <td>-</td>
        <td>设置 默认回显值格式statusMultiple: 'value1,value2';timeRange: ['2021-02-12','2021-02-13']</td>
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
        <td><span> 设置 type为select、checkbox、radio、status、statusMultiple时的选项，</span><span><br> 格式[{key: '中国', value:
            '中国'}],选择返回key值</span><span><br> checkbox、radio格式[{key: '中国', value: '中国', disabled: true}]</span><span><br>
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
        <td class="info-table-monospace"><span>{ key: string; value: string; }</span></td>
        <td>-</td>
        <td>-</td>
        <td><span> 设置 type为select、checkbox、radio、status、statusMultiple时的选项显示和返回字段，如果options的格式不是[{key: '中国', value:
            '中国'}]，</span><span><br> 可以通过optionsObj实现，如[{label: '中国', value:
            '中国'}],设置optionsObj:{key:'label',value:'value'}</span><span><br> 选择返回label值</span></td>
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
        <td class="info-table-monospace">showSearch</td>
        <td class="info-table-monospace"><span>boolean</span></td>
        <td>-</td>
        <td>-</td>
        <td></td>
      </tr>
      <tr>
        <td class="info-table-monospace">disabled</td>
        <td class="info-table-monospace"><span>boolean</span></td>
        <td>-</td>
        <td>-</td>
        <td></td>
      </tr>
      <tr>
        <td class="info-table-monospace">showTime</td>
        <td class="info-table-monospace"><span>boolean</span></td>
        <td>-</td>
        <td>-</td>
        <td></td>
      </tr>
      <tr>
        <td class="info-table-monospace">maxLength</td>
        <td class="info-table-monospace"><span>number</span></td>
        <td>-</td>
        <td>-</td>
        <td></td>
      </tr>
      <tr>
        <td class="info-table-monospace">allowClear</td>
        <td class="info-table-monospace"><span>boolean</span></td>
        <td>-</td>
        <td>-</td>
        <td></td>
      </tr>
      <tr>
        <td class="info-table-monospace">disabledDate</td>
        <td class="info-table-monospace"><span>((e: any, opt?: any) =&gt; any)</span></td>
        <td>-</td>
        <td>-</td>
        <td></td>
      </tr>
      <tr>
        <td class="info-table-monospace">disabledTime</td>
        <td class="info-table-monospace"><span>((e: any, opt?: any) =&gt; any)</span></td>
        <td>-</td>
        <td>-</td>
        <td></td>
      </tr>
      <tr>
        <td class="info-table-monospace">onSearch</td>
        <td class="info-table-monospace"><span>((e: string) =&gt; void)</span></td>
        <td>-</td>
        <td>-</td>
        <td></td>
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
~~~bash
//启动本地环境
npm run stroybook

// build可发布静态文件
npm run build
// 本地连调 antdpackaging项目
npm link

// 本地项目
npm link antdpackaging
// 相对路径
npm link ../antdpackaging/node_modules/react
~~~
