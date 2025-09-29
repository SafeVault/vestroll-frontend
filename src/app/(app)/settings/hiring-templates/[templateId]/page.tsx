'use client'
import { use } from "react";
import { HiringTemplateHeader, HiringTemplateCard, HiringTemplateFooter } from "@/components/hiring-template";

export default function HiringTemplatePage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = use(params);
  const handleDeleteTemplate = () => {
    // redirect and delete template
  }
  return (
    <div className="relative min-h-screen">
      <HiringTemplateHeader onDeleteTemplate={handleDeleteTemplate} className="hidden md:flex"/>
      <HiringTemplateCard />
      <HiringTemplateFooter onDeleteTemplate={handleDeleteTemplate} className="fixed bottom-0 left-0 flex justify-center py-4 w-full bg-white/20 backdrop-blur-md shadow-md md:hidden"/>
    </div>
  );
}
