export class ResourcePath {
  // USER
  public static readonly USER = 'user';
  public static readonly AUTH = 'auth';
  public static readonly LOGIN = 'login';
  public static readonly AUTHENTICATE = 'authenticate';
  public static readonly FORGOT_PASSWORD = 'forgotPassword';
  public static readonly RESET_PASSWORD = 'resetPassword';
  public static readonly CHECK_RESET_PASSWORD_DATA = 'checkResetPassword';

  //COMPANY
  public static readonly COMPANY = 'companies';

  //FILE
  public static readonly FILE = 'file';
  public static readonly FILE_STATUS = 'files/status';

  //COURSE
  public static readonly COURSE = 'course';
  public static readonly COURSE_RESOURCE = 'resource';
  //Common
  public static readonly GET_BY_ID = 'get-by-id';
  public static readonly GET_ALL = 'get-all';
}
