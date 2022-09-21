import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import NotFound from "./NotFound";
import {
  Dashboard,
  TeachersList,
  TeachersDetail,
  Teachers,
  TeachersNew,
  TeachersRolesList,
  TeachersRolesNew,
  StudentRolesList,
  StudentRolesNew,
  StudentsDetail,
  StudentsList,
  ParentsList,
  ParentsNew,
  FinanceReceiptsNew,
  FinanceReceiptsProductsList,
  FinanceReceiptsProductsNew,
  FinanceReceiptsStaffList,
  FinanceReceiptsStaffNew,
  ViewPrintInvoice,
  ViewPrintReceipt,
  InventoryStock,
  InventoryStockIn,
  InventoryStockOut,
  UserProfile,
  PermissionsAdd,
  Roles,
  RolesAdd,
  Users,
  Permissions,
  ActivityLogs,
  ExpenditureList,
  ExpenditureNew,
  InventoryStockInRecords,
  InventoryStockOutRecords,
  Students,
  StudentsNew,
  Staff,
  StaffAdvances,
  StaffAdvancesList,
  StaffAdvancesNew,
  StaffAllowances,
  StaffAllowancesMonthlyList,
  StaffAllowancesMonthlyNew,
  StaffAllowancesInstantList,
  StaffAllowancesInstantNew,
  StaffAllowancesItemsList,
  StaffAllowancesItemsNew,
  StaffSalary,
  StaffSalaryList,
  StaffSalaryNew,
  StaffSalaryPaymentList,
  StaffSalaryPaymentNew,
  StaffSalaryPaymentReceipt,
  StaffSalaryRegisteredList,
  StaffSalaryRegisteredDetail,
  StaffSalaryRegisteredNew,
  StudentFees,
  StudentFeesClassList,
  StudentFeesClassDetail,
  StudentFeesClassNew,
  StudentFeesPaymentList,
  StudentFeesPaymentNew,
  StudentFeesPaymentReceipt,
  StudentFeesItemsList,
  StudentFeesItemsNew,
  Subjects,
  SubjectsList,
  SubjectsNew,
  SubjectsTeachers,
  Classes,
  ClassesList,
  ClassesSchoolFees,
  ClassesTeachers,
  ClassesStudents,
  StationeryProcurementList,
  StationeryProcurementNew,
  MiscellaneousProcurementNew,
  MiscellaneousProcuementList,
  CoCurricularProcurementNew,
  CoCurricularProcurementList,
  MedicineProcurementNew,
  MedicineProcurementList,
  KitchenProcurementNew,
  KitchenProcurementList,
  ConsumableProcurementList,
  ConsumableProcurementNew,
  MiscellaneousNonInventoryProcureList,
  MiscellaneousNonInventoryProcureNew,
  OtherExpenses,
  ChurchDonationsList,
  ChurchDonationsNew,
  ExternalServicesList,
  ExternalServicesNew,
  NonInventoryItems,
  ConsumableItemsList,
  ConsumableItemsNew,
  MiscellaneousItemsList,
  MiscellaneousItemsNew,
  Inventory,
  StationeryCurrentList,
  CoCurricularCurrentList,
  CoCurricularInwardList,
  CoCurricularInwardNew,
  CoCurricularOutwardList,
  CoCurricularOutwardNew,
  KitchenCurrentList,
  MedicineCurrentList,
  KitchenInwardList,
  KitchenInwardNew,
  KitchenOutwardList,
  KitchenOutwardNew,
  MedicineInwardList,
  MedicineInwardNew,
  MedicineOutwardList,
  MedicineOutwardNew,
  MiscellaneousCurrentList,
  MiscellaneousInwardList,
  MiscellaneousInwardNew,
  MiscellaneousOutwardList,
  MiscellaneousOutwardNew,
  SanitationCurrentList,
  SanitationInwardList,
  SanitationInwardNew,
  SanitationOutwardList,
  SanitationOutwardNew,
  StationeryInwardList,
  StationeryInwardNew,
  StationeryOutwardList,
  StationeryOutwardNew,
  ProcurementInventory,
  ProcurementNonInventory,
  TermSchedules,
  TermSchedulesList,
  TermschedulesNew,
  ClassTimeTables,
  ClassTimeTablesList,
  ClassTimeTablesNew,
  DailyAttendance,
  DailyAttendanceList,
  DailyAttendanceNew,
  TermEnrollment,
  TermEnrollmentList,
  TermEnrollmentNew,
  OtherStaffList,
  OtherStaffNew,
  AllStaffList,
  AllStaffDetail,
  OtherStaffRolesList,
  OtherStaffRolesNew,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="inventory" element={<InventoryStock />} />
          <Route path="inventory/new" element={<InventoryStockIn />} />
          <Route path="inventory/out" element={<InventoryStockOut />} />
          <Route
            path="inventory/in/records"
            element={<InventoryStockInRecords />}
          />
          <Route
            path="inventory/out/records"
            element={<InventoryStockOutRecords />}
          />

          <Route path="finance/expenditure" element={<ExpenditureList />} />
          <Route path="finance/expenditure/new" element={<ExpenditureNew />} />
          <Route path="finance/receipts/new" element={<FinanceReceiptsNew />} />
          <Route
            path="finance/receipts/products"
            element={<FinanceReceiptsProductsList />}
          />
          <Route
            path="finance/receipts/producsts/new"
            element={<FinanceReceiptsProductsNew />}
          />
          <Route
            path="finance/receipts/staff"
            element={<FinanceReceiptsStaffList />}
          />
          <Route
            path="finance/receipts/staff/new"
            element={<FinanceReceiptsStaffNew />}
          />

          <Route path="system/permissions" element={<Permissions />} />
          <Route path="system/permissions/new" element={<PermissionsAdd />} />
          <Route path="system/roles" element={<Roles />} />
          <Route path="system/roles/new" element={<RolesAdd />} />
          <Route path="system/users" element={<Users />} />

          <Route path="classes/" element={<Classes />}>
            <Route path="" element={<ClassesList />} />
            <Route path="list" element={<ClassesList />} />
            <Route path="fees" element={<ClassesSchoolFees />} />
            <Route path="students" element={<ClassesStudents />} />
            <Route path="teachers" element={<ClassesTeachers />} />
          </Route>

          <Route path="subjects/" element={<Subjects />}>
            <Route path="" element={<SubjectsList />} />
            <Route path="list" element={<SubjectsList />} />
            <Route path="new" element={<SubjectsNew />} />
            <Route path="teachers" element={<SubjectsTeachers />} />
          </Route>
          
          <Route path="class_timetables/" element={<ClassTimeTables />}>
            <Route path="" element={<ClassTimeTablesList />} />
            <Route path="list" element={<ClassTimeTablesList />} />
            <Route path="new" element={<ClassTimeTablesNew />} />
          </Route>

          <Route path="term_schedules/" element={<TermSchedules />}>
            <Route path="" element={<TermSchedulesList />} />
            <Route path="list" element={<TermSchedulesList />} />
            <Route path="new" element={<TermschedulesNew />} />
          </Route>

          <Route path="daily_attendances/" element={<DailyAttendance />}>
            <Route path="" element={<DailyAttendanceList />} />
            <Route path="list" element={<DailyAttendanceList />} />
            <Route path="new" element={<DailyAttendanceNew />} />
          </Route>

          <Route path="term_enrollment/" element={<TermEnrollment />}>
            <Route path="" element={<TermEnrollmentList />} />
            <Route path="list" element={<TermEnrollmentList />} />
            <Route path="new" element={<TermEnrollmentNew />} />
          </Route>

          <Route path="students/" element={<Students />}>
            <Route path="" element={<StudentsList />} />
            <Route path="list" element={<StudentsList />} />
            <Route path="detail" element={<StudentsDetail />} />
            <Route path="new" element={<StudentsNew />} />
            <Route path="parents" element={<ParentsList/>} />
            <Route path="parents/new/" element={<ParentsNew />} />
            <Route path="roles" element={<StudentRolesList/>} />
            <Route path="roles/new/" element={<StudentRolesNew />} />
          </Route>

          <Route path="students/fees/" element={<StudentFees />}>
            <Route path="" element={<StudentFeesPaymentList />} />
            <Route path="list" element={<StudentFeesPaymentList/>} />
            <Route path="new" element={<StudentFeesPaymentNew />} />
            <Route path="receipt" element={<StudentFeesPaymentReceipt/>} />
            <Route path="class" element={<StudentFeesClassList />} />
            <Route path="class/detail" element={<StudentFeesClassDetail />} />
            <Route path="class/new" element={<StudentFeesClassNew />} />
            <Route path="items" element={<StudentFeesItemsList />} />
            <Route path="items/new" element={<StudentFeesItemsNew/>} />
          </Route>

          <Route path="teachers/" element={<Teachers />}>
            <Route path="" element={<TeachersList />} />
            <Route path="list" element={<TeachersList />} />
            <Route path="detail" element={<TeachersDetail />} />
            <Route path="new" element={<TeachersNew />} />
            <Route path="roles" element={<TeachersRolesList/>} />
            <Route path="roles/new/" element={<TeachersRolesNew />} />
          </Route>

          <Route path="other_staff/" element={<Staff />}> 
            <Route path="" element={<OtherStaffList />} />
            <Route path="list" element={<OtherStaffList />} />
            <Route path="new" element={<OtherStaffNew />} />
            <Route path="roles" element={<OtherStaffRolesList/>} />
            <Route path="roles/new/" element={<OtherStaffRolesNew />} />
            <Route path="all_staff" element={<AllStaffList />} />
            <Route path="all_staff/detail" element={<AllStaffDetail />} />
          </Route>

          <Route path="staff/advances/" element={<StaffAdvances />}>
            <Route path="" element={<StaffAdvancesList />} />
            <Route path="list" element={<StaffAdvancesList />} />
            <Route path="new" element={<StaffAdvancesNew />} />
          </Route>

          <Route path="staff/allowances/" element={<StaffAllowances />}>
            <Route path="" element={<StaffAllowancesMonthlyList />} />
            <Route path="list" element={<StaffAllowancesMonthlyList />} />
            <Route path="new" element={<StaffAllowancesMonthlyNew />} />
            <Route path="instant" element={<StaffAllowancesInstantList />} />
            <Route path="instant/list" element={<StaffAllowancesInstantList />} />
            <Route path="instant/new" element={<StaffAllowancesInstantNew/>} />
            <Route path="items/" element={<StaffAllowancesItemsList />} />
            <Route path="items/new" element={<StaffAllowancesItemsNew />} />
          </Route>

          <Route path="staff/salaries/" element={<StaffSalary />}>
            <Route path="" element={<StaffSalaryList />} />
            <Route path="list" element={<StaffSalaryList />} />
            <Route path="new" element={<StaffSalaryNew />} />
            <Route path="payment" element={<StaffSalaryPaymentList />} />
            <Route path="payment/list" element={<StaffSalaryPaymentList />} />
            <Route path="payment/new" element={<StaffSalaryPaymentNew/>} />
            <Route path="payment/detail" element={<StaffSalaryPaymentReceipt />} />
            <Route path="registered" element={<StaffSalaryRegisteredList />} />
            <Route path="registered/list" element={<StaffSalaryRegisteredList />} />
            <Route path="registered/detail" element={<StaffSalaryRegisteredDetail />} />
            <Route path="registered/new" element={<StaffSalaryRegisteredNew />} />
          </Route>

          <Route path="store/inventory/" element={<Inventory />}>
            <Route path="" element={<StationeryCurrentList />} />
            <Route path="list" element={<StationeryCurrentList />} />
            <Route path="stationery" element={<StationeryCurrentList />} />
            <Route path="stationery/list" element={<StationeryCurrentList />} />
            <Route path="stationery/inward/list" element={<StationeryInwardList />} />
            <Route path="stationery/inward/new" element={<StationeryInwardNew/>} />
            <Route path="stationery/outward/list" element={<StationeryOutwardList />} />
            <Route path="stationery/outward/new" element={<StationeryOutwardNew />} />

            <Route path="kitchen" element={<KitchenCurrentList />} />
            <Route path="kitchen/list" element={<KitchenCurrentList />} />
            <Route path="kitchen/inward/list" element={<KitchenInwardList />} />
            <Route path="kitchen/inward/new" element={<KitchenInwardNew/>} />
            <Route path="kitchen/outward/list" element={<KitchenOutwardList />} />
            <Route path="kitchen/outward/new" element={<KitchenOutwardNew />} />

            <Route path="medicine" element={<MedicineCurrentList />} />
            <Route path="medicine/list" element={<MedicineCurrentList />} />
            <Route path="medicine/inward/list" element={<MedicineInwardList />} />
            <Route path="medicine/inward/new" element={<MedicineInwardNew/>} />
            <Route path="medicine/outward/list" element={<MedicineOutwardList />} />
            <Route path="medicine/outward/new" element={<MedicineOutwardNew />} />

            <Route path="sanitation" element={<SanitationCurrentList />} />
            <Route path="sanitation/list" element={<SanitationCurrentList />} />
            <Route path="sanitation/inward/list" element={<SanitationInwardList />} />
            <Route path="sanitation/inward/new" element={<SanitationInwardNew/>} />
            <Route path="sanitation/outward/list" element={<SanitationOutwardList />} />
            <Route path="sanitation/outward/new" element={<SanitationOutwardNew />} />

            <Route path="co_curricular" element={<CoCurricularCurrentList />} />
            <Route path="co_curricular/list" element={<CoCurricularCurrentList />} />
            <Route path="co_curricular/inward/list" element={<CoCurricularInwardList />} />
            <Route path="co_curricular/inward/new" element={<CoCurricularInwardNew/>} />
            <Route path="co_curricular/outward/list" element={<CoCurricularOutwardList />} />
            <Route path="co_curricular/outward/new" element={<CoCurricularOutwardNew />} />

            <Route path="miscellaneous" element={<MiscellaneousCurrentList />} />
            <Route path="miscellaneous/list" element={<MiscellaneousCurrentList />} />
            <Route path="miscellaneous/inward/list" element={<MiscellaneousInwardList />} />
            <Route path="miscellaneous/inward/new" element={<MiscellaneousInwardNew/>} />
            <Route path="miscellaneous/outward/list" element={<MiscellaneousOutwardList />} />
            <Route path="miscellaneous/outward/new" element={<MiscellaneousOutwardNew />} />
          </Route>

          <Route path="store/non_inventory/" element={<NonInventoryItems />}>
            <Route path="" element={<ConsumableItemsList />} />
            <Route path="list" element={<ConsumableItemsList />} />
            <Route path="consumables/list" element={<ConsumableItemsList />} />
            <Route path="consumables/new" element={<ConsumableItemsNew />} />
            <Route path="miscellaneous/list" element={<MiscellaneousItemsList />} />
            <Route path="miscellaneous/new" element={<MiscellaneousItemsNew />} />
          </Route>

          <Route path="procurement/inventory/" element={<ProcurementInventory />}>
            <Route path="" element={<StationeryProcurementList />} />
            <Route path="list" element={<StationeryProcurementList />} />
            <Route path="stationery/list" element={<StationeryProcurementList />} />
            <Route path="stationery/new" element={<StationeryProcurementNew />} />
            <Route path="kitchen/list" element={<KitchenProcurementList />} />
            <Route path="kitchen/new" element={<KitchenProcurementNew />} />
            <Route path="medicine/list" element={<MedicineProcurementList />} />
            <Route path="medicine/new" element={<MedicineProcurementNew />} />
            <Route path="co_curricular/list" element={<CoCurricularProcurementList />} />
            <Route path="co_curricular/new" element={<CoCurricularProcurementNew />} /> 
            <Route path="miscellaneous/list" element={<MiscellaneousProcuementList />} />
            <Route path="miscellaneous/new" element={<MiscellaneousProcurementNew />} />
          </Route>

          <Route path="procurement/non_inventory/" element={<ProcurementNonInventory />}>
            <Route path="" element={<ConsumableProcurementList />} />
            <Route path="list" element={<ConsumableProcurementList />} />
            <Route path="consumables/list" element={<ConsumableProcurementList />} />
            <Route path="consumables/new" element={<ConsumableProcurementNew />} />
            <Route path="miscellaneous/list" element={<MiscellaneousNonInventoryProcureList />} />
            <Route path="miscellaneous/new" element={<MiscellaneousNonInventoryProcureNew />} />
          </Route>

          <Route path="other_expenses/" element={<OtherExpenses />}>
            <Route path="" element={<ChurchDonationsList />} />
            <Route path="list" element={<ChurchDonationsList />} />
            <Route path="church_donations/list" element={<ChurchDonationsList />} />
            <Route path="church_donations/new" element={<ChurchDonationsNew />} />
            <Route path="external_services/list" element={<ExternalServicesList />} />
            <Route path="external_services/new" element={<ExternalServicesNew />} />
          </Route>

          <Route path="users/" element={<Users />}>
            <Route path="" element={<Permissions />} />
            <Route path="permissions" element={<Permissions />} />
            <Route path="roles" element={<Roles />} />
          </Route>

          <Route path="activity-logs" element={<ActivityLogs />} />
          <Route path="user-profile" element={<UserProfile />} />
        </Route>
        <Route path="/invoice-view" element={<ViewPrintInvoice />} />
        <Route path="/receipt-view" element={<ViewPrintReceipt />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
