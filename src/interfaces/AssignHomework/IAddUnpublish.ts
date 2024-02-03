export interface IPublishUnPublishHomeworkBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asHomeworkId: number;
  asReason: string;
  asUpdatedById: string;
  asIsPublish: boolean;
  asIsSMSSent: boolean;
}
