import * as React from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Table, Divider, Tag} from 'antd';
import BaseComponent from "../../BaseComponent"
import {actionCreators} from "./store"
import './style.less';

export interface QueryResultProps {
  proListDesc?: any,
  columns?: any,
  pagination?: any,
  proList?: () => any;
  getProList?: () => any;
}

@connect(mapStateToProps, mapDispatchToProps)
class QueryResult extends BaseComponent<QueryResultProps, {}> {
  componentWillMount() {
    const {getProList} = this.props;
    if (getProList) {
      getProList();
    }
  }

  doRender(): React.ReactElement<{}> {
    const {proList, columns, pagination} = this.props;
    return (
      <div className="QueryResult">
        <Table
          bordered
          dataSource={proList ? proList() : null}
          columns={columns}
          pagination={pagination}/>
      </div>
    );
  }
}

function mapStateToProps(state: any): QueryResultProps {
  return {
    proList: () => {
      const proList = state.getIn(['queryresult', 'proList']);
      console.log('proList', proList)
      proList.map((item: any) => {
        item.handel = (
          <span>
              <a href="javascript:;">修改 </a>
              <a href="javascript:;">提交 </a>
              <Link to="/home/productCheck">审核</Link>
            </span>
        )
      })
      return proList;
    },
    proListDesc: state.getIn(['queryresult', 'proListDesc']),
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
  return {
    getProList() {
      dispatch(actionCreators.getProList());
    }
  }
}

export default QueryResult;