import { useSelector } from 'react-redux';
import { useGetSellerTransactionsQuery } from '../../../redux/features/transactionsApi';
import { Table, Alert } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Loader } from '../../../components';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/dateTimeHelpers';
import { useState } from 'react';
import { DatePicker, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
const { RangePicker } = DatePicker;

interface TransactionTableRow {
  id: string;
  key: string;
  payerName: string;
  paidAt: string | null;
  amount: number | null;
  totalAmount: number | null;
  nextPaymentAmount: number | null;
  refId: string | null;
  platformCharge?: number | null;
  adminCommission?: number | null;
  context?: string | null;
  updatedAt?: string | null;
}

// Add a type for the seller transactions API response
interface SellerTransactionsApiResponse {
  data: Record<string, unknown>[];
  [key: string]: unknown;
}

function Transactions() {
  const userId = useSelector((state: { auth: { user: { id: number } } }) => state.auth.user.id);
  const { data, isLoading, error } = useGetSellerTransactionsQuery(userId);

  // Type guard for API response
  function hasDataProp(obj: unknown): obj is SellerTransactionsApiResponse {
    return typeof obj === 'object' && obj !== null && 'data' in obj && Array.isArray((obj).data);
  }

  const transactions: Record<string, unknown>[] = hasDataProp(data) ? data.data : [];

  const columns: ColumnsType<TransactionTableRow> = [
    {
      title: 'Payer Name',
      dataIndex: 'payerName',
      key: 'payerName',
      render: (name: string) => name || 'N/A',
    },
    {
      title: 'Context',
      dataIndex: 'context',
      key: 'context',
      render: (context: string, record: TransactionTableRow) => (
        <Link
          className='capitalize border-b border-dark-blue'
          to={{
            pathname: `/app/transactions/${record.id}`,
            search: `?context=${context ? context.toLowerCase() : ''}`,
          }}
          state={{ transactionPayment: record }}
          onClick={e => {
            if (
              e.ctrlKey ||
              e.metaKey ||
              e.button === 1 // middle click
            ) {
              e.preventDefault();
            }
          }}
          onMouseDown={e => {
            if (e.button === 1) {
              e.preventDefault();
            }
          }}
          onContextMenu={e => {
            e.preventDefault();
          }}
        >
          {context ? context.split('_').join(' ').toLocaleLowerCase() : 'N/A'}
        </Link>
      ),
    },
    {
      title: 'Transaction Date',
      dataIndex: 'paidAt',
      key: 'paidAt',
      render: (date: string | null, record: TransactionTableRow) => {
        const displayDate = date || record.updatedAt;
        return displayDate ? formatDate(displayDate) : 'N/A';
      },
    },
    {
      title: 'Paid Amount',
      key: 'amount',
      render: (_: unknown, record: TransactionTableRow) => (
        record.amount != null
          ? `$${(record.amount).toFixed(2)} (${record.platformCharge ?? 0}%)`
          : 'N/A'
      ),
    },
    {
      title: 'Pay Due',
      key: 'payDue',
      render: (_: unknown, record: TransactionTableRow) => {
        const isBoost = record.context === 'SELLER_BOOST_EVENT' || record.context === 'SELLER_BOOST_PLACE';
        if (isBoost) return 'N/A';
        const duePercent = 100 - (record.platformCharge ?? 0);
        return record.nextPaymentAmount
          ? `$${(record.nextPaymentAmount).toFixed(2)} (${duePercent}%)`
          : `0.00 (${duePercent}%)`;
      },
    },
    {
      title: 'Platform Service Charge',
      key: 'platformServiceCharge',
      render: (_: unknown, record: TransactionTableRow) => {
        const isBoost = record.context === 'SELLER_BOOST_EVENT' || record.context === 'SELLER_BOOST_PLACE';
        if (isBoost) return 'N/A';
        const percent = record.adminCommission ?? 0;
        const total = (record.amount ?? 0) + (record.nextPaymentAmount ?? 0);
        const commissionAmount = (percent / 100) * total;
        return `$${commissionAmount.toFixed(2)} (${percent}%)`;
      },
    },
    {
      title: 'My Payout',
      key: 'sellerPayout',
      render: (_: unknown, record: TransactionTableRow) => {
        const isBoost = record.context === 'SELLER_BOOST_EVENT' || record.context === 'SELLER_BOOST_PLACE';
        if (isBoost) return 'N/A';
        const platformCharge = record.platformCharge ?? 0;
        const adminCommission = record.adminCommission ?? 0;
        const sellerPayoutPercentage = platformCharge - adminCommission;
        const total = (record.amount ?? 0) + (record.nextPaymentAmount ?? 0);
        const sellerPayoutCharge = (sellerPayoutPercentage / 100) * total;
        return `$${sellerPayoutCharge.toFixed(2)} (${sellerPayoutPercentage}%)`;
      },
    },
    {
      title: 'Payout Received',
      key: 'sellerReceived',
      render: () => 'false', // Placeholder, as in admin
    },
    {
      title: 'Total Amount',
      key: 'totalAmount',
      render: (_: unknown, record: TransactionTableRow) => {
        const paid = record.amount ?? 0;
        const due = record.nextPaymentAmount ?? 0;
        return `$${(paid + due).toFixed(2)}`;
      },
    },
  ];

  // Filter and sort state
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [context, setContext] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');

  // Prepare table data with filtering and sorting
  let tableData: TransactionTableRow[] = transactions.map((item: Record<string, unknown>, idx: number) => {
    const t = item;
    return {
      key: String(t.id ?? idx),
      id: String(t.id),
      payerName: String(t.payerName ?? 'N/A'),
      context: t.context ? String(t.context) : null,
      paidAt: t.paidAt ? String(t.paidAt) : null,
      updatedAt: t.updatedAt ? String(t.updatedAt) : null,
      amount: typeof t.amount === 'number' ? t.amount : t.amount ? Number(t.amount) : null,
      totalAmount: typeof t.totalAmount === 'number' ? t.totalAmount : t.totalAmount ? Number(t.totalAmount) : null,
      nextPaymentAmount: typeof t.nextPaymentAmount === 'number' ? t.nextPaymentAmount : t.nextPaymentAmount ? Number(t.nextPaymentAmount) : null,
      refId: t.refId ? String(t.refId) : null,
      platformCharge: typeof t.platformCharge === 'number' ? t.platformCharge : t.platformCharge ? Number(t.platformCharge) : 0,
      adminCommission: typeof t.adminCommission === 'number' ? t.adminCommission : t.adminCommission ? Number(t.adminCommission) : 0,
    };
  });

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

  // Sort by transaction date
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

  if (error) {
    return <Alert message="Failed to load transactions" type="error" showIcon />;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Transactions</h1>
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
      <div className='overflow-scroll'>
        <Table
          className='min-w-[1500px]'
          columns={columns}
          dataSource={tableData}
          rowKey="key"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </>
  );
}

export default Transactions;