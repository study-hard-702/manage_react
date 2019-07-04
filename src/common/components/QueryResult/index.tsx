import * as React from "react";
import {connect} from 'react-redux';
import {Table, Divider, Tag} from 'antd';
import BaseComponent from "../../BaseComponent";
import './style.less';

export interface QueryResultProps {
  dataSource?: any,
  columns?: any
}

@connect(mapStateToProps, mapDispatchToProps)
class QueryResult extends BaseComponent<QueryResultProps, {}> {
  doRender(): React.ReactElement<{}> {
    const {dataSource, columns} = this.props;
    return (
      <div className="QueryResult">
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}/>
      </div>
    );
  }
}

function mapStateToProps(state: any): QueryResultProps {
  return {
    dataSource: state.getIn(['home', 'dataSource']),
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
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any): QueryResultProps {
  return {}
}

export default QueryResult;