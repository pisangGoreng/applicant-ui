export type ApiResponseType<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
};

export type ApiResponsePaginationType = {
  success: boolean;
  message: string;
  data: {
    data?: ApplicantsType[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
  error?: any;
};

export type ApplicantsType = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  yoe: number;
  location: string;
  resumeLink: string;
  createdAt: Date;
  updatedAt: Date;
  applicantRoleId: number;
  applicantStatusId: number;
  applicantRole: ApplicantRoleAndStatusType;
  applicantStatus: ApplicantRoleAndStatusType;
};

export type ApplicantRoleAndStatusType = {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
