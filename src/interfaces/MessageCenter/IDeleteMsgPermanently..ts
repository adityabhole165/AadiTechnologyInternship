export interface IDeleteMessagePermanentlyBody {
  asSchoolId: string;
  asAcademicYearId: string;
  asUserId: string;
  asMessageIds: string;
}

export interface IDeleteMessagePermanentlyResult {
  DeletionMessage: string;
}
export interface IUnDeleteMessagesBody {
  asSchoolId: string;
  asMessageRecieverDetailsIds: string;
  asMessageDetailsIds: string;
}

export interface IUnDeleteMessagesResult {
  Message: string;
}
