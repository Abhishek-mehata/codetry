/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetTransactionsQuery } from '../../../redux/features/transactionsApi';
import { Table, Input, DatePicker, Select, Space, Card, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import type { TransactionApiItem } from '../../../redux/features/transactionsApi';
import { useState, useMemo } from 'react';

// Extend dayjs with isBetween plugin
dayjs.extend(isBetween);

const { RangePicker } = DatePicker;
const { Search } = Input;

interface TransactionTableRow {
  key: string;
  payerName: string;
  paidAt: string | null;
  amount: number | null;
  totalAmount: number | null;
  nextPaymentAmount: number | null;
  refId: string | null;
}

function Transactions() {
  const { data = [], isLoading } = useGetTransactionsQuery();
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [contextFilter, setContextFilter] = useState<string>('all');
  const [refIdFilter, setRefIdFilter] = useState('');

  console.log('Transactions API data:', data);

  const normalizedData: TransactionApiItem[] = Array.isArray(data) ? data : data ? [data] : [];

  // Get unique contexts for filter dropdown
  const uniqueContexts = useMemo(() => {
    const contexts = new Set<string>();
    normalizedData.forEach(item => {
      if (item.context) {
        contexts.add(item.context);
      }
    });
    return Array.from(contexts).sort();
  }, [normalizedData]);

  // Filter and sort data based on search criteria
  const filteredAndSortedData = useMemo(() => {
    const filtered = normalizedData.filter(item => {
      const user = item.User || {};
      const payerName = (user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` : (item.payerName || '');
      
      // Filter by payer name
      if (searchText && !payerName.toLowerCase().includes(searchText.toLowerCase())) {
        return false;
      }

      // Filter by date range
      if (dateRange) {
        const transactionDate = item.paidAt || item.updatedAt;
        if (transactionDate) {
          const date = dayjs(transactionDate);
          if (!date.isBetween(dateRange[0], dateRange[1], 'day', '[]')) {
            return false;
          }
        }
      }

      // Filter by context
      if (contextFilter !== 'all' && item.context !== contextFilter) {
        return false;
      }

      // Filter by Ref ID
      if (refIdFilter && !item.refId?.toLowerCase().includes(refIdFilter.toLowerCase())) {
        return false;
      }

      return true;
    });

    // Sort by date: latest to oldest
    return filtered.sort((a, b) => {
      const dateA = a.paidAt || a.updatedAt;
      const dateB = b.paidAt || b.updatedAt;
      
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      
      return dayjs(dateB).valueOf() - dayjs(dateA).valueOf(); // Latest first
    });
  }, [normalizedData, searchText, dateRange, contextFilter, refIdFilter]);

  const columns: ColumnsType<TransactionTableRow & { context?: string | null }> = [
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
      render: (context: string | null | undefined) => context || 'N/A',
    },
    {
      title: 'Transaction Date',
      dataIndex: 'paidAt',
      key: 'paidAt',
      render: (date: string | null, record: TransactionTableRow & { updatedAt?: string | null }) => {
        const displayDate = date || record.updatedAt;
        return displayDate ? dayjs(displayDate).format('YYYY-MM-DD HH:mm') : 'N/A';
      },
    },
    {
      title: 'Paid Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number | null) => (amount != null ? `$${amount}` : 'N/A'),
    },
    {
      title: 'Pay Due',
      key: 'payDue',
      render: (_: unknown, record: TransactionTableRow) => {
        if (record.nextPaymentAmount) {
          return `$${record.nextPaymentAmount}`;
        }
        return '0';
      },
    },
    {
      title: 'Ref ID',
      dataIndex: 'refId',
      key: 'refId',
      render: (refId: string | null) => refId || 'N/A',
    },
  ];

  const tableData: (TransactionTableRow & { context?: string | null, updatedAt?: string | null })[] = filteredAndSortedData.map((item, idx) => {
    const user = item.User || {};
    return {
      key: item.id || idx.toString(),
      payerName: (user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` : (item.payerName || 'N/A'),
      context: item.context ?? null,
      paidAt: item.paidAt ?? null,
      updatedAt: item.updatedAt ?? null,
      amount: item.amount ?? null,
      totalAmount: item.totalAmount ?? null,
      nextPaymentAmount: item.nextPaymentAmount ?? null,
      refId: item.refId ?? null,
    };
  });

  const handleClearFilters = () => {
    setSearchText('');
    setDateRange(null);
    setContextFilter('all');
    setRefIdFilter('');
  };

  const handleDateRangeChange = (dates: any) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange([dates[0], dates[1]]);
    } else {
      setDateRange(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Transactions</h1>
      
      {/* Filters Section */}
      <Card className="mb-4">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Search
              placeholder="Search by payer name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <RangePicker
              placeholder={['Start Date', 'End Date']}
              value={dateRange}
              onChange={handleDateRangeChange as any}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              placeholder="Filter by context"
              value={contextFilter}
              onChange={setContextFilter}
              style={{ width: '100%' }}
              allowClear
            >
              <Select.Option value="all">All Contexts</Select.Option>
              {uniqueContexts.map(context => (
                <Select.Option key={context} value={context}>
                  {context}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Search
              placeholder="Search by Ref ID..."
              value={refIdFilter}
              onChange={(e) => setRefIdFilter(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Space>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-gray-500 border border-gray-500 rounded hover:bg-gray-600 transition-colors"
              >
                Clear Filters
              </button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Results Summary */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {tableData.length} of {normalizedData.length} transactions
        {(searchText || dateRange || contextFilter !== 'all' || refIdFilter) && (
          <span className="ml-2 text-blue-600">
            (filtered)
          </span>
        )}
        <span className="ml-2 text-green-600">
          • Sorted by date (latest first)
        </span>
      </div>

      <Table
        columns={columns}
        dataSource={tableData}
        loading={isLoading}
        rowKey="key"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default Transactions;