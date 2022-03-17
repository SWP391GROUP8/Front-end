export class ResourcePath {
  // USER
  public static readonly USER = 'user';
  public static readonly CHANGE_PASSWORD = 'change-password';
  public static readonly USER_UPDATE = 'update-user';
  public static readonly AUTH = 'auth';
  public static readonly LOGIN = 'login';
  public static readonly AUTHENTICATE = 'authenticate';
  public static readonly FORGOT_PASSWORD = 'forgotPassword';
  public static readonly RESET_PASSWORD = 'resetPassword';
  public static readonly CHECK_RESET_PASSWORD_DATA = 'checkResetPassword';

  //COMPANY
  public static readonly COMPANY = 'companies';

  //COMPANY
  public static readonly COMMENT = 'comment';
  //FILE
  public static readonly FILE = 'file';
  public static readonly FILE_STATUS = 'files/status';

  //COURSE
  public static readonly COURSE = 'course';
  public static readonly COURSE_QA = 'course-q&a';
  public static readonly COURSE_QA_CREATE = 'create-course-q&a';
  
  //Common
  public static readonly GET_BY_ID = 'get-by-id';
  public static readonly GET_ALL = 'get-all';
  public static readonly GET_BY_COURSE_ID = 'get-by-course-id';

  //Blog
  public static readonly BLOG = 'blog';
  public static readonly COURSE_RESOURCE = 'resource';
  public static readonly COURSE_RESOURCE_CREATE = 'create-resourse';

  //Shcedules
  public static readonly SCHEDULE = 'schedule';
  public static readonly SCHEDULE_ADD_USER = 'add-user';

  //Job
  public static readonly JOB = 'job-posting';

}
