"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Settings, User, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  NotificationSettings,
  UserProfile,
  ProfileFormData,
  PasswordFormData,
} from "@/components/profile-settings/types";
import NotificationSection from "@/components/profile-settings/NotificationSection";
import ProfileForm from "@/components/profile-settings/ProfileForm";


const defaultNotifications: NotificationSettings = {
  contractRequests: true,
  contractsUpdates: true,
  contractsTerminations: true,
  timeOffRequests: true,
  timesheets: true,
  milestones: true,
  invoiceUpdates: "required",
  expenseSubmissions: "required",
  systemUpdates: true,
  securityAlerts: true,
  marketingEmails: false,
  weeklyReports: true,
  monthlyStatements: true,
  paymentReminders: true,
  taskDeadlines: true,
  teamAnnouncements: true,
};

const ProfileSettingsPage: React.FC = () => {
  const router = useRouter();

  // ⬇️ Start with null → load actual state from localStorage
  const [notifications, setNotifications] =
    useState<NotificationSettings | null>(null);
  const [activeTab, setActiveTab] = useState<
    "Settings" | "Preferences" | "Notifications"
  >("Settings");

  // Mock user profile data - in a real app, this would come from an API or context
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Peter",
    email: "dspoye8379@deesa7.com",
    avatar: "/api/placeholder/80/80", // This would be a real image URL
  });

  // ✅ Load from localStorage after mount
  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    setNotifications(saved ? JSON.parse(saved) : defaultNotifications);

    const savedTab = localStorage.getItem("activeTab");
    if (
      savedTab === "Settings" ||
      savedTab === "Preferences" ||
      savedTab === "Notifications"
    ) {
      setActiveTab(savedTab);
    }
  }, []);

  // ✅ Persist notifications whenever they change
  useEffect(() => {
    if (notifications) {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }
  }, [notifications]);

  // ✅ Persist tab whenever it changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleToggle = (key: keyof NotificationSettings) => {
    if (!notifications) return;
    if (notifications[key] === "required") return;

    setNotifications((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key],
      };
    });
  };

  // Handle profile form submission
  const handleProfileSave = async (data: ProfileFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state
      setUserProfile((prev) => ({
        ...prev,
        name: data.name,
        email: data.email,
      }));

      console.log("Profile saved:", data);
      // In a real app, you'd make an API call here
    } catch (error) {
      console.error("Failed to save profile:", error);
      throw error;
    }
  };

  // Handle image upload
  const handleImageSave = async (imageFile: File) => {
    try {
      // Simulate image upload
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create a temporary URL for the uploaded image
      const imageUrl = URL.createObjectURL(imageFile);

      // Update local state
      setUserProfile((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));

      console.log("Image saved:", imageFile.name);
      // In a real app, you'd upload to a cloud service and get back a URL
    } catch (error) {
      console.error("Failed to save image:", error);
      throw error;
    }
  };

  // Handle password change

  const tabs = [
    { id: "Settings", label: "Settings", icon: Settings },
    { id: "Preferences", label: "Preferences", icon: User },
    { id: "Notifications", label: "Notifications", icon: Bell },
  ] as const;

  const renderTabContent = () => {
    if (!notifications) return <p>Loading...</p>; // prevent flicker

    switch (activeTab) {
      case "Notifications":
        return (
          <div className="space-y-6">
            <NotificationSection
              title="Employment"
              values={notifications}
              onToggle={handleToggle}
              items={[
                {
                  id: 1,
                  title: "Contract requests",
                  description:
                    "Get notified when new contract requests are submitted",
                  key: "contractRequests",
                },
                {
                  id: 2,
                  title: "Contracts updates",
                  description:
                    "Receive updates about changes to existing contracts",
                  key: "contractsUpdates",
                },
                {
                  id: 3,
                  title: "Contracts terminations",
                  description: "Be informed when contracts are terminated",
                  key: "contractsTerminations",
                },
              ]}
            />

            <NotificationSection
              title="Team management"
              values={notifications}
              onToggle={handleToggle}
              items={[
                {
                  id: 1,
                  title: "Time off requests",
                  description:
                    "Get notified about time off requests from team members",
                  key: "timeOffRequests",
                },
                {
                  id: 2,
                  title: "Timesheets",
                  description:
                    "Notifications about timesheet submissions and approvals",
                  key: "timesheets",
                },
                {
                  id: 3,
                  title: "Milestones",
                  description: "Stay updated on project milestone completions",
                  key: "milestones",
                },
                {
                  id: 4,
                  title: "Invoice updates, approvals & reminders",
                  description:
                    "Important invoice-related notifications (cannot be disabled)",
                  key: "invoiceUpdates",
                  isRequired: true,
                },
                {
                  id: 5,
                  title: "Expense submissions",
                  description: "Critical expense submission notifications",
                  key: "expenseSubmissions",
                  isRequired: true,
                },
              ]}
            />
          </div>
        );

      case "Settings":
        return (
          <ProfileForm
            userProfile={userProfile}
            onSave={handleProfileSave}
            onImageSave={handleImageSave}
          />
        );

      case "Preferences":
       

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="p-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-2 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back to dashboard</span>
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">
            Profile settings
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 md:space-x-8 px-4 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3 px-1 md:px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-[#5E2A8C] text-[#5E2A8C]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon size={16} className="md:hidden" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-4xl">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
