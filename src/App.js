import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import NotFound from './NotFound';
import {
  Dashboard,AdminDepartments,AdminRoles,AdminStaff,AdminServices,
  ActivityLogs,AuthGroups,AuthUsers,AuthUsersNew,
  FinanceInvoices,FinanceInvoicesIncomingList,
  FinanceInvoicesIncomingNew,FinanceInvoicesOutgoingList,
  FinanceInvoicesOutgoingNew,
  FinanceReceipts,FinanceReceiptsLogisticsList,
  FinanceReceiptsLogisticsNew,FinanceReceiptsProductsList,
  FinanceReceiptsProductsNew,FinanceReceiptsServicesList,
  FinanceReceiptsServicesNew,FinanceReceiptsStaffList,
  FinanceReceiptsStaffNew,FinancesReceiptsNotifications,
  FinancesReceiptsNotificaiionsInvoice,FinancesReceiptsNotificaiionsProcure,
  InventoryStock, InventoryStockIn,InventoryStockOut,InventoryProducts,
  InventoryNewProduct,InventoryCategory,InventoryNewCategory,
  InventoryStockRequestsAll ,InventoryStockRequestsIn,InventoryStockRequestsOut,
  InventoryStockRequestsAdd, InventoryRecords, Procurement,ProcurementNew,UserProfile
} from './pages'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/home' element={<Home/>} >
        <Route path="" element={<Dashboard/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="admin/departments/" element={<AdminDepartments/>} />
        <Route path="admin/roles/" element={<AdminRoles/>} />
        <Route path="admin/staff/" element={<AdminStaff/>} />
        <Route path="admin/services/" element={<AdminServices/>} />
        <Route path="inventory" element={<InventoryStock/>} />
        <Route path="inventory/new" element={<InventoryStockIn/>} />
        <Route path="inventory/out" element={<InventoryStockOut/>} />
        <Route path="inventory/records" element={<InventoryRecords/>} />
        <Route path="inventory/products" element={<InventoryProducts/>} /> 

        <Route path="inventory/category/" element={<InventoryCategory/>} />
        <Route path="inventory/category/new" element={<InventoryNewCategory/>} />
        <Route path="inventory/products/new" element={<InventoryNewProduct/>} />
        <Route path="inventory/requests" element={<InventoryStockRequestsAll/>} />
        <Route path="inventory/requests/in" element={<InventoryStockRequestsIn/>} />
        <Route path="inventory/requests/out" element={<InventoryStockRequestsOut/>} />
        <Route path="inventory/requests/add" element={<InventoryStockRequestsAdd/>} />

        <Route path="procurement" element={<Procurement/>} />
        <Route path="procurement/new" element={<ProcurementNew/>} />

        <Route path="finance/invoices" element={<FinanceInvoices/>} />
        <Route path="finance/invoices/incoming" element={<FinanceInvoicesIncomingList/>} />
        <Route path="finance/invoices/incoming/new" element={<FinanceInvoicesIncomingNew/>} />
        <Route path="finance/invoices/outgoing" element={<FinanceInvoicesOutgoingList/>} />
        <Route path="finance/invoices/outgoing/new" element={<FinanceInvoicesOutgoingNew/>} />

        <Route path="finance/receipts/" element={<FinanceReceipts/>} />
        <Route path="finance/receipts/logistics" element={<FinanceReceiptsLogisticsList/>} />
        <Route path="finance/receipts/logistics/new" element={<FinanceReceiptsLogisticsNew/>} />
        <Route path="finance/receipts/products" element={<FinanceReceiptsProductsList/>} />
        <Route path="finance/receipts/producsts/new" element={<FinanceReceiptsProductsNew/>} />
        <Route path="finance/receipts/services" element={<FinanceReceiptsServicesList/>} />
        <Route path="finance/receipts/services/new" element={<FinanceReceiptsServicesNew/>} />
        <Route path="finance/receipts/staff" element={<FinanceReceiptsStaffList/>} />
        <Route path="finance/receipts/staff/new" element={<FinanceReceiptsStaffNew/>} />
        <Route path="finance/receipts/notifications" element={<FinancesReceiptsNotifications/>} />
        <Route path="finance/receipts/notifications/invoice" element={<FinancesReceiptsNotificaiionsInvoice/>} />
        <Route path="finance/receipts/notifications/procure" element={<FinancesReceiptsNotificaiionsProcure/>} />

        <Route path="auth/users" element={<AuthUsers/>} />
        <Route path="auth/users/new" element={<AuthUsersNew/>} />
        <Route path="auth/groups" element={<AuthGroups/>} />
        <Route path="auth/groups/new" element={<AuthGroups/>} />
        <Route path="activity-logs" element={<ActivityLogs/>} />
        <Route path="user-profile" element={<UserProfile/>} />
      </Route>
      <Route path='*' element={<NotFound/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
