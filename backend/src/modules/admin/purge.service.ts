import { JobTitleModel } from './jobTitle/jobTitle.model';
import { PayGradeModel } from './jobConfig/payGrade.model';
import { EmpStatusModel } from './jobConfig/empStatus.model';
import { JobCategoryModel } from './jobConfig/jobCategory.model';
import { WorkShiftModel } from './jobConfig/workShift.model';
import { LocationModel } from './jobConfig/location.model';
import { DepartmentModel } from './jobConfig/department.model';
import { QualificationModel } from './qualification/qualification.model';
import { NationalityModel } from './nationality/nationality.model';

export async function purgeAdminRecords(): Promise<{ message: string; clearedCount: number }> {
  const [
    jobTitles,
    payGrades,
    empStatuses,
    jobCategories,
    workShifts,
    locations,
    departments,
    qualifications,
    nationalities
  ] = await Promise.all([
    JobTitleModel.deleteMany({}),
    PayGradeModel.deleteMany({}),
    EmpStatusModel.deleteMany({}),
    JobCategoryModel.deleteMany({}),
    WorkShiftModel.deleteMany({}),
    LocationModel.deleteMany({}),
    DepartmentModel.deleteMany({}),
    QualificationModel.deleteMany({}),
    NationalityModel.deleteMany({})
  ]);

  const totalDeleted = 
    (jobTitles.deletedCount || 0) +
    (payGrades.deletedCount || 0) +
    (empStatuses.deletedCount || 0) +
    (jobCategories.deletedCount || 0) +
    (workShifts.deletedCount || 0) +
    (locations.deletedCount || 0) +
    (departments.deletedCount || 0) +
    (qualifications.deletedCount || 0) +
    (nationalities.deletedCount || 0);

  return {
    message: `Successfully purged all existing Admin section records from database.`,
    clearedCount: totalDeleted
  };
}
