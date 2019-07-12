import * as React from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Table} from 'antd';
import BaseComponent from "../../BaseComponent"
import {fetchGetProList} from "../../../api"
import './style.less';

export interface QueryResultProps {
  keyTyle?: string,
  columns?: any,
  pagination?: any,
}

@connect(mapStateToProps, mapDispatchToProps)
class QueryResult extends BaseComponent<QueryResultProps, {}> {
  state = {
    proList: []
  }

  componentWillMount() {
    this._getProList()
  }

  _getProList() {
    const {keyTyle} = this.props;
    fetchGetProList({}).then((res: any) => {
      const data = res.data;
      if (data.status === '200') {
        let productStatus = ["", "初始", "待审核", "审核未通过", "已发布", "审核通过"];
        let productTypes = ["", "旅游保险", "意外保险", "行李保险", "家庭保险", "健康保险", "责任险"];
        let myArray: any = []
        data.data.data.forEach((item: any, index: number) => {
          let obj: any = {};
          obj.num = index + 1;
          obj.product_code = item.product_code;
          obj.product_name = item.product_name;
          obj.productType = productTypes[item.type];
          obj.demand_number = item.demand_number;
          obj.url = item.url;
          obj.status = productStatus[item.status];
          if (keyTyle !== 'ProductCheck') {
            obj.update_time = item.update_time;
          }
          obj.handel = '修改 提交 审核';
          myArray.push(obj)
        })
        // 设置获取列表数据
        this.setState({
          proList: this._filterProList(myArray)
        })
      }
    })
  }

  _filterProList(proList: any) {
    const {keyTyle} = this.props;
    proList.forEach((item: any): any => {
      item.handel = (
        <span>
          {(keyTyle === 'ProductAll' || keyTyle === 'ProductMy') ?
            <Link to="/home/productAdd">修改 </Link> : null}
          {(keyTyle === 'ProductMy') ?
            <Link to="/home/productAdd">复制 </Link> : null}
          {(keyTyle === 'ProductCheck' || keyTyle === 'ProductMy') ?
            <Link to="/home/productCheck">审核</Link> : null}
        </span>
      )
    })
    return proList;
  }

  _filterColumns() {
    const {keyTyle, columns} = this.props;
    const newColumns = columns.filter((item: any) => {
      if (keyTyle === 'ProductCheck') {
        return item.key !== 'update_time'
      } else {
        return true
      }
    })
    return newColumns;
  }

  doRender(): React.ReactElement<{}> {
    const {proList} = this.state;
    const {pagination} = this.props;
    return (
      <div className="QueryResult">
        <Table
          bordered
          rowKey="num"
          columns={this._filterColumns()}
          dataSource={proList}
          pagination={pagination}/>
      </div>
    );
  }
}

function mapStateToProps(state: any, ownProps: any): QueryResultProps {
  return {
    keyTyle: ownProps.keyTyle,
    columns: [
      {
        title: '序号',
        dataIndex: 'num',
        key: 'num',
        width: '50px',
      },
      {
        title: '产品ID',
        dataIndex: 'product_code',
        key: 'product_code',
        width: '72px'
      },
      {
        title: '产品名称',
        dataIndex: 'product_name',
        key: 'product_name',
        width: '128px'
      },
      {
        title: '产品类型',
        dataIndex: 'productType',
        key: 'productType',
        width: '70px'
      },
      {
        title: '需求号',
        dataIndex: 'demand_number',
        key: 'demand_number',
        width: '111px'
      },
      {
        title: '产品链接',
        dataIndex: 'url',
        key: 'url',
        width: '321px'
      },
      {
        title: '发布状态',
        dataIndex: 'status',
        key: 'status',
        width: '74px'
      },
      {
        title: '更新时间',
        dataIndex: 'update_time',
        key: 'update_time',
        width: '119px'
      },
      {
        title: '操作',
        dataIndex: 'handel',
        key: 'handel',
        width: '131px'
      },
    ],
    pagination: {
      showQuickJumper: true,
      defaultCurrent: 2,
      total: 500,
      onChange: (pageNumber: number) => {
        console.log('Page: ', pageNumber);
      }
    }
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any): QueryResultProps {
  return {}
}

export default QueryResult;