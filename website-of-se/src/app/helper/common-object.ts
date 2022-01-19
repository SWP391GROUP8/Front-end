export class CommonObject {
  // Register Company
  static readonly registerCompany = 'company-information';
  static readonly companyRepresentative = 'company-representative';
  static readonly verifyAccount = 'verify-company-account';
  static readonly registerSuccess = 'confirm-register-company';

  // Regex
  static readonly regexPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  static readonly regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  static readonly pageSizes = [5, 10, 20, 50];
  static readonly gridPageSizes = [9, 15, 30];

  static readonly initCountDown = 30;
  static readonly bqErrorKey = 'bqFromServer';
  static readonly notFoundErrorKey = 'notFoundFromServer';

  static readonly fileStatus: any[] = [
    { id: 'Completed', name: 'Status.Completed', colorClass: 'bg-green-400' },
    {
      id: 'Processing',
      name: 'Status.Processing',
      colorClass: 'bg-yellow-400',
    },
    { id: 'Cancelled', name: 'Status.Deleted', colorClass: 'bg-red-400' },
    { id: 'Created', name: '', colorClass: '' },
  ];

  static readonly fileMaxLength: number = 5 * 1024 * 1024;

  static readonly fileType: string[] = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'text/html',
    'application/xml',
  ];
}
