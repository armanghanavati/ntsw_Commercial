// وضعیت اظهارنامه
export const declarationStatus = {
  // نامعلوم
  UnKnown: 0,
  //  پیش نویس
  Draft: 1,
  // منتظر استعلام ضابطه
  WaitingForCriteriuaInquiry: 2,
  // رد شده در استعلام ضابطه
  RejectedCriteriuaInquiry: 3,
  // آماده ارسال به گمرک
  ReadyForSendingToCustom: 4,
  // درحال پردازش اولیه
  UnderPrimaryProcessing: 5,
  // منتظر بررسی اولیه
  WaitingForInitialCkeck: 6,
  // درحال پردازش
  UnderProccess: 7,
  // منتظر بررسی مدیر
  WaitingForManagerCheck: 8,
  // اظهار
  Declare: 9,
  // ارزیابی
  Evaluation: 10,
  // کارشناسی
  UnderGraguate: 11,
  // منتظر تایید مالی
  WaitingForFinancialApproval: 12,
  // پروانه
  License: 13,
  // صدور مجوز بارگیری
  IssueLoadingPermit: 14,
  // ابطال
  Canceled: 15,
  // ثبت اولیه
  InitialRegistration: 16,
  // منتظر اعلام نظر گمرک
  WaitingForCustomsAnnounceOpinion: 17,
  // منتظر صدور مجوز بارگیری
  WaitingForIssueLoadingPermit: 18,
  // رد شده توسط گمرک
  RejectedByCustoms: 19,
}

//  انواع اقدام کننده روی اظهار
export const actionerStatus = {
  // نا معلوم
  UnKnown: 0,
  // سیستم
  System: 1,
  // اظهار کننده 
  CustomDeclarar: 2,
  // کارشناس مربوطه
  RelevantExpert: 3,
  // ارزیاب مربوطه 
  RelevantEvaluator: 4,
  // معاون فنی مربوطه 
  RelevantTechnicalAssistant: 5,
  // مدیر گمرک 
  CustomManager: 6,
  // کارشناس جدید 
  NewExpert: 7,

}

//   انواع وضعیت اقدام
export const actionerType = {
  // نا معلوم
  UnKnown: 0,
  // در صف
  InQueue: 1,
  // در حال بررسی
  Pending: 2,

}

