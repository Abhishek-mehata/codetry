// import { useEffect, useState } from 'react';
// import api from '../../../api';
// import axios from 'axios';

// const orderID = 'your-order-id-here'; // Replace this with dynamic ID if needed

// interface Transaction {
//   id: string;
//   amount: number;
//   status: string;
//   createdAt: string;
//   // Add more fields as per your API response
// }

// const PaymentSuccessHandler = () => {
//   const [status, setStatus] = useState('⏳ Capturing payment...');
//   const [transactions, setTransactions] = useState<Transaction[] | null>(null);

//   useEffect(() => {
//     const captureAndFetch = async () => {
//       try {
//         // Step 1: Capture the order
//         const captureRes = await api.post(`payment/capture-order/${orderID}`);
//         console.log('✅ Capture Response:', captureRes.data);
//         setStatus('✅ Payment captured successfully.');

//         // Step 2: Fetch latest transactions
//         const txRes = await api.get('payment/latest');
//         console.log('📦 Latest Transactions:', txRes.data);
//         setTransactions(txRes.data);
//       } catch (err) {
//         if (axios.isAxiosError(err)) {
//           console.error('❌ Axios Error:', err.response?.data || err.message);
//         } else {
//           console.error('❌ Unknown Error:', err);
//         }
//         setStatus('❌ Failed to capture payment.');
//       }
//     };

//     captureAndFetch();
//   }, []);

//   return (
//     <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
//       <h2>{status}</h2>
//       {transactions && (
//         <div>
//           <h3>Latest Transactions:</h3>
//           <ul>
//             {transactions.map((tx) => (
//               <li key={tx.id}>
//                 <strong>ID:</strong> {tx.id} | <strong>Amount:</strong> {tx.amount} | <strong>Status:</strong> {tx.status}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentSuccessHandler;
