export type NotificationSettings = {
  // Employment
  contractRequests: boolean;
  contractsUpdates: boolean;
  contractsTerminations: boolean;

  // Team management
  timeOffRequests: boolean;
  timesheets: boolean;
  milestones: boolean;
  invoiceUpdates: "required";
  expenseSubmissions: "required";

  // Additional categories
  systemUpdates: boolean;
  securityAlerts: boolean;
  marketingEmails: boolean;
  weeklyReports: boolean;
  monthlyStatements: boolean;
  paymentReminders: boolean;
  taskDeadlines: boolean;
  teamAnnouncements: boolean;
};
