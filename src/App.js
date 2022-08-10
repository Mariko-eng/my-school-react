import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import NotFound from './NotFound';
import {
  Dashboard,SchoolClassesList,SchoolClassesNew,
  StaffRolesList,StaffRolesNew,SubjectUnitList,
  SubjectUnitNew,NonTeachingList,NonTeachingDetail,
  NonTeachingRegistration,TeachersClassesList,
  TeachersClassesNew,TeachersList,TeachersDetail,
  TeachersRegistration,ParentsList,ParentsNew,
  StudentsDetail,StudentsList,StudentsRegistration,

  FinanceInvoices, FinanceInvoicesNew ,FinanceReceipts,
  FinanceReceiptsNew,FinanceReceiptsProductsList,
  FinanceReceiptsProductsNew,FinanceReceiptsStaffList,
  FinanceReceiptsStaffNew,ViewPrintInvoice,ViewPrintReceipt,
  InventoryStock, InventoryStockIn,InventoryStockOut,InventoryProducts,
  InventoryNewProduct,InventoryCategory,InventoryNewCategory,
  InventoryStockRequestsAll ,InventoryStockRequestsIn,InventoryStockRequestsOut,
  InventoryStockRequestsAdd, InventoryRecords, Procurement,ProcurementNew,UserProfile,
  FeesNew, FeesList, TermsList, TermsNew, FeesTermPayment, FeesTermPaymentDetail,
  PermissionsAdd, Roles, RolesAdd, Users, Permissions, AllStaff, FeesClassDetail,
  FeesClassList, FeesClassNew,ActivityLogs, FeesTermPaymentList,
  AllowancesList, AllowancesDetail, AllowancesNew,
  AdvancesList, AdvancesDetail, AdvancesNew,
  SalaryList, SalaryDetail, SalaryNew,
  SalaryPaymentList, SalaryPaymentDetail, SalaryPaymentNew,
  AllowancesStaffList, AllowancesStaffDetail, AllowancesStaffNew
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

        <Route path="admin/school-classes/" element={<SchoolClassesList/>} />
        <Route path="admin/school-classes/new/" element={<SchoolClassesNew/>} />
        <Route path="admin/staff-roles/" element={<StaffRolesList/>} />
        <Route path="admin/staff-roles/new/" element={<StaffRolesNew/>} />
        <Route path="admin/subjects/" element={<SubjectUnitList/>} />
        <Route path="admin/subjects/new/" element={<SubjectUnitNew/>} />
        <Route path="admin/school-fees/" element={<FeesList/>} />
        <Route path="admin/school-fees/new/" element={<FeesNew/>} />
        <Route path="admin/class-fees/" element={<FeesClassList/>} />
        <Route path="admin/class-fees/new/" element={<FeesClassNew/>} />
        <Route path="admin/school-fees/detail/" element={<FeesClassDetail/>} />
        <Route path="admin/terms/" element={<TermsList/>} />
        <Route path="admin/terms/new/" element={<TermsNew/>} />

        <Route path="staff/" element={<AllStaff/>} />
        <Route path="staff/non-teaching-staff/" element={<NonTeachingList/>} />
        <Route path="staff/non-teaching-staff-detail/" element={<NonTeachingDetail/>} />
        <Route path="staff/non-teaching-staff/register/" element={<NonTeachingRegistration/>} />
        <Route path="staff/teacher-classes/" element={<TeachersClassesList/>} />
        <Route path="staff/teacher-classes/new/" element={<TeachersClassesNew/>} />
        <Route path="staff/teachers/" element={<TeachersList/>} />
        <Route path="staff/teachers-detail/" element={<TeachersDetail/>} />
        <Route path="staff/teachers/register/" element={<TeachersRegistration/>} />

        <Route path="students/parents/" element={<ParentsList/>} />
        <Route path="students/parents/new/" element={<ParentsNew/>} />
        <Route path="students/" element={<StudentsList/>} />
        <Route path="students-detail/" element={<StudentsDetail/>} />
        <Route path="students/register/" element={<StudentsRegistration/>} />

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

        <Route path="finance/fees-term-payment" element={<FeesTermPayment/>} />
        <Route path="finance/fees-term-payment-detail" element={<FeesTermPaymentDetail/>} />
        <Route path="finance/fees-term-payment-list" element={<FeesTermPaymentList/>} />
        <Route path="finance/allowances" element={<AllowancesList/>} />
        <Route path="finance/allowances/detail" element={<AllowancesDetail/>} />
        <Route path="finance/allowances/new" element={<AllowancesNew/>} />
        <Route path="finance/staff-allowances" element={<AllowancesStaffList/>} />
        <Route path="finance/staff-allowances/detail" element={<AllowancesStaffDetail/>} />
        <Route path="finance/staff-allowances/new" element={<AllowancesStaffNew/>} />
        <Route path="finance/staff-advances" element={<AdvancesList/>} />
        <Route path="finance/staff-advances/detail" element={<AdvancesDetail/>} />
        <Route path="finance/staff-advances/new" element={<AdvancesNew/>} />
        <Route path="finance/staff-salary" element={<SalaryList/>} />
        <Route path="finance/staff-salary/detail" element={<SalaryDetail/>} />
        <Route path="finance/staff-salary/new" element={<SalaryNew/>} />
        <Route path="finance/staff-salary-payment" element={<SalaryPaymentList/>} />
        <Route path="finance/staff-salary-payment/detail" element={<SalaryPaymentDetail/>} />
        <Route path="finance/staff-salary-payment/new" element={<SalaryPaymentNew/>} />
        <Route path="finance/invoices" element={<FinanceInvoices/>} />
        <Route path="finance/invoices/new" element={<FinanceInvoicesNew/>} />
        <Route path="finance/receipts/" element={<FinanceReceipts/>} />
        <Route path="finance/receipts/new" element={<FinanceReceiptsNew/>} />
        <Route path="finance/receipts/products" element={<FinanceReceiptsProductsList/>} />
        <Route path="finance/receipts/producsts/new" element={<FinanceReceiptsProductsNew/>} />
        <Route path="finance/receipts/staff" element={<FinanceReceiptsStaffList/>} />
        <Route path="finance/receipts/staff/new" element={<FinanceReceiptsStaffNew/>} />

        <Route path="system/permissions" element={<Permissions/>} />
        <Route path="system/permissions/new" element={<PermissionsAdd/>} />
        <Route path="system/roles" element={<Roles/>} />
        <Route path="system/roles/new" element={<RolesAdd/>} />
        <Route path="system/users" element={<Users/>} />

        <Route path="activity-logs" element={<ActivityLogs/>} />
        <Route path="user-profile" element={<UserProfile/>} />
      </Route>
      <Route path='/invoice-view' element={<ViewPrintInvoice/>} />
      <Route path='/receipt-view' element={<ViewPrintReceipt/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
