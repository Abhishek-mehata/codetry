// import { useGetPayoutTransactionsQuery } from '../../../redux/features/payoutsApi';
// import { Table } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import { Loader } from '../../../components';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { DatePicker, Select } from 'antd';
// import dayjs, { Dayjs } from 'dayjs';
// import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
// import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
// dayjs.extend(isSameOrAfter);
// dayjs.extend(isSameOrBefore);
// const { RangePicker } = DatePicker;

// interface PayoutsTableRow {
//   id: string;
//   key: string;
//   context: string;
//   amount: number;
//   paidAt: string;
//   payerName?: string;
//   updatedAt?: string | null;
//   totalAmount?: number | null;
//   nextPaymentAmount?: number | null;
//   refId?: string | null;
//   platformCharge?: number | null;
//   adminCommission?: number | null;
// }

// function Payouts() {
//   const { data: payoutTransactions = [], isLoading, isError } = useGetPayoutTransactionsQuery();

//   // Filter and sort state
//   const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
//   const [context, setContext] = useState<string>('');
//   const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
//   console.log(setDateRange)
//   console.log(setContext)
//   console.log(setSortOrder)

//   const columns: ColumnsType<PayoutsTableRow> = [
//     {
//       title: 'Context',
//       dataIndex: 'context',
//       key: 'context',
//       render: (context: string, record: PayoutsTableRow) => (
//         <Link
//           className='capitalize border-b border-dark-blue'
//           to={{
//             pathname: `/app/transactions/${record.id}`,
//             search: `?context=${context.toLowerCase()}`,
//           }}
//           state={{ transactionPayment: record }}
//         >
//           {record.context}
//         </Link>
//       ),
//     },
//     {
//       title: 'Payout Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//     },
//     {
//       title: 'Payment Received At',
//       dataIndex: 'paidAt',
//       key: 'paidAt',
//     },
//   ];

//   // Prepare table data with filtering and sorting
//   let tableData: PayoutsTableRow[] = payoutTransactions?.map((transaction: PayoutWithPayment, idx: number) => ({
//     id: transaction.payment.id,
//     key: String(transaction.payoutTransaction.id ?? idx),
//     amount: transaction.payoutTransaction.amount,
//     context: transaction?.payment?.context,
//     paidAt: transaction?.payoutTransaction?.createdAt,
//     payerName: String(transaction.payment?.payerName ?? 'N/A'),
//     updatedAt: transaction.payment?.updatedAt ? String(transaction.payment?.updatedAt) : null,
//     totalAmount: typeof transaction.payment?.totalAmount === 'number' ? transaction.payment?.totalAmount : transaction.payment?.totalAmount ? Number(transaction.payment?.totalAmount) : null,
//     nextPaymentAmount: typeof transaction.payment?.nextPaymentAmount === 'number' ? transaction.payment?.nextPaymentAmount : transaction.payment?.nextPaymentAmount ? Number(transaction.payment?.nextPaymentAmount) : null,
//     refId: transaction.payment?.refId ? String(transaction.payment?.refId) : null,
//     platformCharge: typeof transaction.payment?.platformCharge === 'number' ? transaction.payment?.platformCharge : transaction.payment?.platformCharge ? Number(transaction.payment?.platformCharge) : 0,
//     adminCommission: typeof transaction.payment?.adminCommission === 'number' ? transaction.payment?.adminCommission : transaction.payment?.adminCommission ? Number(transaction.payment?.adminCommission) : 0,
//   }));

//   // Filter by context
//   if (context) {
//     tableData = tableData.filter(row => row.context === context);
//   }

//   // Filter by date range
//   if (dateRange && dateRange[0] && dateRange[1]) {
//     const [start, end] = dateRange;
//     tableData = tableData.filter(row => {
//       const dateStr = row.paidAt || row.updatedAt;
//       if (!dateStr) return false;
//       const date = dayjs(dateStr);
//       return date.isSameOrAfter(start, 'day') && date.isSameOrBefore(end, 'day');
//     });
//   }

//   // Sort by payout date
//   tableData = tableData.sort((a, b) => {
//     const dateA = dayjs(a.paidAt || a.updatedAt);
//     const dateB = dayjs(b.paidAt || b.updatedAt);
//     if (sortOrder === 'latest') {
//       return dateB.valueOf() - dateA.valueOf();
//     } else {
//       return dateA.valueOf() - dateB.valueOf();
//     }
//   });

//   // Unique context options for dropdown
//   // const contextOptions = Array.from(new Set(tableData.map(item => item.context).filter(Boolean)));

//   if (isLoading) {
//     return <Loader loading={isLoading} />;
//   }

//   if (isError) {
//     return <div>Error fetching payout transactions.</div>;
//   }

//   return (
//     // <div className="p-4 bg-red-400">
//     //   <h1 className="text-2xl font-semibold mb-4">Payouts</h1>
//     //   {/* Filter Section */}
//     //   <div className="flex flex-wrap gap-4 mb-4 items-end">
//     //     <div>
//     //       <label className="block mb-1 font-medium">Date Range</label>
//     //       <RangePicker
//     //         onChange={val => setDateRange(val as [Dayjs, Dayjs])}
//     //         allowClear
//     //       />
//     //     </div>
//     //     <div>
//     //       <label className="block mb-1 font-medium">Context</label>
//     //       <Select
//     //         showSearch
//     //         allowClear
//     //         placeholder="Select context"
//     //         style={{ minWidth: 180 }}
//     //         value={context || undefined}
//     //         onChange={val => setContext(val || '')}
//     //         options={contextOptions.map(opt => ({ label: opt?.split('_').join(' ').toLowerCase(), value: opt }))}
//     //       />
//     //     </div>
//     //     <div>
//     //       <label className="block mb-1 font-medium">Sort By</label>
//     //       <Select
//     //         value={sortOrder}
//     //         style={{ minWidth: 140 }}
//     //         onChange={val => setSortOrder(val)}
//     //         options={[
//     //           { label: 'Latest', value: 'latest' },
//     //           { label: 'Oldest', value: 'oldest' },
//     //         ]}
//     //       />
//     //     </div>
//     //   </div>
//     //   <div className='overflow-x-auto'>
//     //     <Table
//     //       columns={columns}
//     //       dataSource={tableData}
//     //       rowKey="key"
//     //       pagination={{ pageSize: 10 }}
//     //     />
//     //   </div>
//     // </div>
//     <div className='p-4'>
//       <h3>Under Maintainence</h3>
//     </div>
//   );
// }

// export default Payouts;

// src/pages/dashboard/Payouts/Payouts.tsx
// function Payouts() {
//   return (
//     <div className='p-4'>
//       <h3>Under Maintenance</h3>
//     </div>
//   );
// }

// export default Payouts;








// src/pages/dashboard/Payouts/Payouts.tsx
import { useGetPayoutTransactionsQuery } from '../../../redux/features/payoutsApi';
import { Table, DatePicker, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Loader } from '../../../components';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { RangePicker } = DatePicker;

interface Payment {
  id: string;
  context: string;
  payerName?: string;
  updatedAt?: string | null;
  totalAmount?: number | string | null;
  nextPaymentAmount?: number | string | null;
  refId?: string | null;
  platformCharge?: number | string | null;
  adminCommission?: number | string | null;
}

interface PayoutTransaction {
  id?: string | number | null;
  amount: number;
  createdAt: string;
}

interface PayoutWithPayment {
  payment: Payment;
  payoutTransaction: PayoutTransaction;
}

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

function coerceNumber(value: unknown, fallback = 0): number | null {
  if (value === null || value === undefined) return null;
  const num = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function Payouts() {
  const { data = [], isLoading, isError } = useGetPayoutTransactionsQuery();
  const payoutTransactions = (data ?? []) as PayoutWithPayment[];

  // Filter and sort state
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [context, setContext] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');

  // Build base rows from API data
  const allRows: PayoutsTableRow[] = useMemo(
    () =>
      payoutTransactions.map((transaction, idx) => ({
        id: String(transaction?.payment?.id ?? ''),
        key: String(transaction?.payoutTransaction?.id ?? idx),
        amount: transaction?.payoutTransaction?.amount ?? 0,
        context: String(transaction?.payment?.context ?? ''),
        paidAt: String(transaction?.payoutTransaction?.createdAt ?? ''),
        payerName: String(transaction?.payment?.payerName ?? 'N/A'),
        updatedAt: transaction?.payment?.updatedAt ? String(transaction.payment.updatedAt) : null,
        totalAmount: coerceNumber(transaction?.payment?.totalAmount),
        nextPaymentAmount: coerceNumber(transaction?.payment?.nextPaymentAmount),
        refId: transaction?.payment?.refId ? String(transaction.payment.refId) : null,
        platformCharge: coerceNumber(transaction?.payment?.platformCharge, 0) ?? 0,
        adminCommission: coerceNumber(transaction?.payment?.adminCommission, 0) ?? 0,
      })),
    [payoutTransactions]
  );

  // Unique context options for dropdown (from all data)
  const contextOptions = useMemo(
    () =>
      Array.from(new Set(allRows.map((r) => r.context).filter(Boolean))).map((x) => ({
        label: String(x).split('_').join(' ').toLowerCase(),
        value: x,
      })),
    [allRows]
  );

  // Apply filters and sorting
  const filteredSortedRows = useMemo(() => {
    let rows = [...allRows];

    if (context) {
      rows = rows.filter((r) => r.context === context);
    }

    if (dateRange && dateRange[0] && dateRange[1]) {
      const [start, end] = dateRange;
      rows = rows.filter((r) => {
        const dateStr = r.paidAt || r.updatedAt;
        if (!dateStr) return false;
        const d = dayjs(dateStr);
        return d.isSameOrAfter(start, 'day') && d.isSameOrBefore(end, 'day');
      });
    }

    rows.sort((a, b) => {
      const dateA = dayjs(a.paidAt || a.updatedAt);
      const dateB = dayjs(b.paidAt || b.updatedAt);
      return sortOrder === 'latest' ? dateB.valueOf() - dateA.valueOf() : dateA.valueOf() - dateB.valueOf();
    });

    return rows;
  }, [allRows, context, dateRange, sortOrder]);

  const columns: ColumnsType<PayoutsTableRow> = [
    {
      title: 'Context',
      dataIndex: 'context',
      key: 'context',
      render: (ctx: string, record) => (
        <Link
          className='capitalize border-b border-dark-blue'
          to={{
            pathname: `/app/transactions/${record.id}`,
            search: `?context=${String(ctx).toLowerCase()}`,
          }}
          state={{ transactionPayment: record }}
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
      render: (v: string) => (v ? dayjs(v).format('YYYY-MM-DD HH:mm') : '—'),
    },
  ];

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  if (isError) {
    return <div className='p-4'>Error fetching payout transactions.</div>;
  }

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Payouts</h1>

      {/* Filter Section */}
      <div className='flex flex-wrap gap-4 mb-4 items-end'>
        <div>
          <label className='block mb-1 font-medium'>Date Range</label>
          <RangePicker onChange={(val) => setDateRange(val)} allowClear />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Context</label>
          <Select
            showSearch
            allowClear
            placeholder='Select context'
            style={{ minWidth: 180 }}
            value={context || undefined}
            onChange={(val) => setContext(val || '')}
            options={contextOptions}
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Sort By</label>
          <Select
            value={sortOrder}
            style={{ minWidth: 140 }}
            onChange={(val) => setSortOrder(val)}
            options={[
              { label: 'Latest', value: 'latest' },
              { label: 'Oldest', value: 'oldest' },
            ]}
          />
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <Table
          columns={columns}
          dataSource={filteredSortedRows}
          rowKey='key'
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
}

export default Payouts;