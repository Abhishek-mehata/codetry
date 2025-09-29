import { useGetAllPayoutTransactionsQuery } from '../../../redux/features/payoutsApi';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Loader } from '../../../components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { DatePicker, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
const { RangePicker } = DatePicker;

interface PayoutsTableRow {
  id: string;
  key: string;
  context: string;
  amount: number;
  paidAt: string;
  payerName?: string;
  updatedAt?: string | null;
  totalAmount?: number | null;
  nextPaymentAmount?: number | null;
  refId?: string | null;
  platformCharge?: number | null;
  adminCommission?: number | null;
}

function PayoutsTransactions() {
  const { data: payoutTransactions = [], isLoading, isError } = useGetAllPayoutTransactionsQuery();

  // Filter and sort state
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [context, setContext] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');

  const columns: ColumnsType<PayoutsTableRow> = [
    {
      title: 'Context',
      dataIndex: 'context',
      key: 'context',
      render: (context: string, record: PayoutsTableRow) => (
        <Link
          className='capitalize border-b border-dark-blue'
          to={{
            pathname: `/admin/transactions/${record.id}`,
            search: `?context=${context.toLowerCase()}`,
          }}
          state={{ transaction: record }}
        >
          {record.context}
        </Link>
      ),
    },
    {
      title: 'Payout Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Payment Received At',
      dataIndex: 'paidAt',
      key: 'paidAt',
    },
  ];

  // Prepare table data with filtering and sorting
  let tableData: PayoutsTableRow[] = payoutTransactions?.map((transaction: PayoutWithPayment, idx: number) => ({
    id: transaction.payment?.id,
    key: String(transaction.payoutTransaction?.id ?? idx),
    amount: transaction.payoutTransaction?.amount,
    context: transaction?.payment?.context,
    paidAt: transaction?.payoutTransaction?.createdAt,
    payerName: String(transaction.payment?.payerName ?? 'N/A'),
    updatedAt: transaction.payment?.updatedAt ? String(transaction.payment?.updatedAt) : null,
    totalAmount: typeof transaction.payment?.totalAmount === 'number' ? transaction.payment?.totalAmount : transaction.payment?.totalAmount ? Number(transaction.payment?.totalAmount) : null,
    nextPaymentAmount: typeof transaction.payment?.nextPaymentAmount === 'number' ? transaction.payment?.nextPaymentAmount : transaction.payment?.nextPaymentAmount ? Number(transaction.payment?.nextPaymentAmount) : null,
    refId: transaction.payment?.refId ? String(transaction.payment?.refId) : null,
    platformCharge: typeof transaction.payment?.platformCharge === 'number' ? transaction.payment?.platformCharge : transaction.payment?.platformCharge ? Number(transaction.payment?.platformCharge) : 0,
    adminCommission: typeof transaction.payment?.adminCommission === 'number' ? transaction.payment?.adminCommission : transaction.payment?.adminCommission ? Number(transaction.payment?.adminCommission) : 0,
  }));

  // Filter by context
  if (context) {
    tableData = tableData.filter(row => row.context === context);
  }

  // Filter by date range
  if (dateRange && dateRange[0] && dateRange[1]) {
    const [start, end] = dateRange;
    tableData = tableData.filter(row => {
      const dateStr = row.paidAt || row.updatedAt;
      if (!dateStr) return false;
      const date = dayjs(dateStr);
      return date.isSameOrAfter(start, 'day') && date.isSameOrBefore(end, 'day');
    });
  }

  // Sort by payout date
  tableData = tableData.sort((a, b) => {
    const dateA = dayjs(a.paidAt || a.updatedAt);
    const dateB = dayjs(b.paidAt || b.updatedAt);
    if (sortOrder === 'latest') {
      return dateB.valueOf() - dateA.valueOf();
    } else {
      return dateA.valueOf() - dateB.valueOf();
    }
  });

  // Unique context options for dropdown
  const contextOptions = Array.from(new Set(tableData.map(item => item.context).filter(Boolean)));

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  if (isError) {
    return <div>Error fetching payout transactions.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Payouts</h1>
      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div>
          <label className="block mb-1 font-medium">Date Range</label>
          <RangePicker
            onChange={val => setDateRange(val as [Dayjs, Dayjs])}
            allowClear
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Context</label>
          <Select
            showSearch
            allowClear
            placeholder="Select context"
            style={{ minWidth: 180 }}
            value={context || undefined}
            onChange={val => setContext(val || '')}
            options={contextOptions.map(opt => ({ label: opt?.split('_').join(' ').toLowerCase(), value: opt }))}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Sort By</label>
          <Select
            value={sortOrder}
            style={{ minWidth: 140 }}
            onChange={val => setSortOrder(val)}
            options={[
              { label: 'Latest', value: 'latest' },
              { label: 'Oldest', value: 'oldest' },
            ]}
          />
        </div>
      </div>
      <div className='overflow-x-auto'>
        <Table
          columns={columns}
          dataSource={tableData}
          rowKey="key"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
}

export default PayoutsTransactions;