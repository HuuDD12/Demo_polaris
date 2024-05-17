import React, { useCallback, useEffect, useState } from 'react';
import { Page, IndexTable, LegacyCard, useIndexResourceState, Text, Badge, useBreakpoints, Button, Card } from '@shopify/polaris';
import { Input, Pagination as PaginationAnt, message } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import {
  DeleteIcon, ViewIcon, EditIcon
} from '@shopify/polaris-icons';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { listUserSettingAction } from '@/redux/actions/userSetting';
import moment from "moment";

const TablePolaris: React.FC = () => {
  const dispatch = useAppDispatch();
  const data: any = useAppSelector((app) => app.UserSetting.pagi);

  const [page, setPage] = useState(1);
  const [q, setQ] = useState<any>('');
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState<any>();
  useEffect(() => {
    dispatch(listUserSettingAction({ q: q, page: page, pageSize: pageSize }))
  }, [dispatch, page, pageSize])
  useEffect(() => {
    setPagination({
      current: data.pagination?.current,
      defaultPageSize: data.pagination?.pageSize,
      pageSizeOptions: [5, 10, 15, 20],
      showSizeChanger: true,
      onShowSizeChange: (newSize: any) => {
        setPage(1);
        setPageSize(newSize)
      },
      onChange: (newPage: number) => setPage(newPage),
    });
  }, [dispatch, page, pageSize]);
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(data.items);

  const rowMarkup = data.items.map(({ id, store_name, installed_date, status, plan_name }: { id: any, store_name: any, installed_date: any, status: any, plan_name: any }, index: number) => (
    <IndexTable.Row
      id={id}
      key={id}
      selected={selectedResources.includes(id)}
      position={index}
    >
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">
          {id}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{store_name}</IndexTable.Cell>
      <IndexTable.Cell>{moment(installed_date).format('YYYY-MM-DD HH:mm:ss')}</IndexTable.Cell>
      <IndexTable.Cell>
        <Badge tone={
          status === "active" ? 'success' : 'info'
        }>{status}</Badge>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Badge tone={
          status === "active" ? 'success' : 'info'
        }>{plan_name}</Badge>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <div className="flex justify-evenly items-center">
          <Button icon={EditIcon} variant='tertiary' tone="success" />
          <Button icon={ViewIcon} variant="tertiary" tone="success" onClick={() => { message.info("view") }} />
          <Button icon={DeleteIcon} variant="tertiary" tone="critical" onClick={() => deleteFunction(id)} />
        </div>
      </IndexTable.Cell>
    </IndexTable.Row>
  ),
  );

  return (
    <Page fullWidth
      title=" Demo Table Polaris"
      backAction={{ content: '', url: '/' }}

      subtitle="Perfect for any pet"
      primaryAction={{ content: 'Create', url: '/create', }}

    >
      <LegacyCard>
        <div className=' p-5'>
          <div className='flex mb-5'>
            <Input prefix={<SearchOutlined />} className='mr-5'></Input>
            <Button >Search</Button>
          </div>
          <div className=' border-solid border-2 border-[#f1f1f1] rounded-lg w-full h-auto'>
            <IndexTable
              condensed={useBreakpoints().smDown}
              itemCount={data.pagination ? data.pagination?.totalItems : 0}

              headings={[
                { title: 'ID' },
                { title: 'Store Name' },
                { title: 'Installed Date' },
                { title: 'Status', alignment: 'center' },
                { title: 'Plan Name' },
                { title: 'Action', alignment: 'center' },

              ]}
            >
              {rowMarkup}
            </IndexTable>
            <hr className="w-full border-solid border border-[#f1f1f1] " />


            <div className="flex justify-center items-center mb-2">

              <PaginationAnt  {...pagination} />
            </div>
          </div>
        </div>
      </LegacyCard>
    </Page>
  );
}
export default TablePolaris;

function deleteFunction(id: any) {

  window.confirm(`id : ${id}`);
}
