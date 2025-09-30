// 'use client';

// import React, { useState, useRef, FormEvent } from 'react';
// import { ChevronLeft, Bold, Italic, Underline, List, AlignLeft, Search, Bell, ChevronDown } from 'lucide-react';

// interface FormData {
//   jobTitle: string;
//   description: string;
//   timeOffDays: number;
// }

// interface FormErrors {
//   jobTitle?: string;
//   description?: string;
//   timeOffDays?: string;
// }

// const CreateTemplatePage: React.FC = () => {
//   const [jobTitle, setJobTitle] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [timeOffDays, setTimeOffDays] = useState<string>('');
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const editorRef = useRef<HTMLDivElement>(null);

//   // Rich text editor functions
//   const execCommand = (command: string, value?: string): void => {
//     document.execCommand(command, false, value || null);
//     editorRef.current?.focus();
//   };

//   const handleEditorInput = (e: React.FormEvent<HTMLDivElement>): void => {
//     const target = e.target as HTMLDivElement;
//     setDescription(target.innerHTML);
//   };

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};
    
//     if (!jobTitle.trim()) {
//       newErrors.jobTitle = 'Job title is required';
//     }
    
//     if (!description.trim() || description === '<br>' || description === '<div><br></div>') {
//       newErrors.description = 'Description is required';
//     }
    
//     const timeOffValue = parseInt(timeOffDays);
//     if (!timeOffDays || isNaN(timeOffValue) || timeOffValue < 0) {
//       newErrors.timeOffDays = 'Time off days must be a positive number';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (): Promise<void> => {
//     if (!validateForm()) return;
    
//     setIsSubmitting(true);
    
//     try {
//       // Simulate API call
//       const formData: FormData = {
//         jobTitle,
//         description,
//         timeOffDays: parseInt(timeOffDays)
//       };
      
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       console.log('Form submitted:', formData);
//       alert('Template created successfully!');
      
//       // Reset form
//       setJobTitle('');
//       setDescription('');
//       setTimeOffDays('');
//       if (editorRef.current) {
//         editorRef.current.innerHTML = '';
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Error creating template. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleBack = (): void => {
//     // In a real Next.js app, you would use router.back() or router.push()
//     if (typeof window !== 'undefined') {
//       window.history.back();
//     }
//   };

//   const handleSearchSubmit = (e: FormEvent<HTMLFormElement>): void => {
//     e.preventDefault();
//     console.log('Search query:', searchQuery);
//     // Implement search functionality
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation Bar */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Search Bar */}
//             <div className="flex-1 max-w-lg">
//               <form onSubmit={handleSearchSubmit} className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all"
//                 />
//               </form>
//             </div>

//             {/* Right Side - Notifications and User */}
//             <div className="flex items-center space-x-4">
//               {/* Notification Bell */}
//               <button 
//                 type="button"
//                 className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
//                 aria-label="Notifications"
//               >
//                 <Bell className="w-6 h-6" />
//               </button>

//               {/* User Profile */}
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 rounded-full overflow-hidden">
//                   <img
//                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
//                     alt="Peter's Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="hidden md:flex items-center space-x-2">
//                   <div>
//                     <div className="text-sm font-medium text-gray-900">Peter</div>
//                     <div className="text-xs text-gray-500">Administrator</div>
//                   </div>
//                   <ChevronDown className="w-4 h-4 text-gray-400" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Page Header */}
//       <div className="bg-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center space-x-4">
//             <button
//               type="button"
//               onClick={handleBack}
//               className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
//               aria-label="Go back"
//             >
//               <ChevronLeft className="w-5 h-5" />
//               <span className="ml-1 text-sm">Back</span>
//             </button>
//             <h1 className="text-2xl font-semibold text-gray-900">Create template</h1>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
//           {/* Job Title */}
//           <div>
//             <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-3">
//               Job title
//             </label>
//             <input
//               type="text"
//               id="jobTitle"
//               value={jobTitle}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobTitle(e.target.value)}
//               className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all ${
//                 errors.jobTitle ? 'ring-2 ring-red-500' : ''
//               }`}
//               placeholder=""
//               aria-describedby={errors.jobTitle ? 'jobTitle-error' : undefined}
//             />
//             {errors.jobTitle && (
//               <p id="jobTitle-error" className="mt-1 text-sm text-red-600" role="alert">
//                 {errors.jobTitle}
//               </p>
//             )}
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-3">
//               Description
//             </label>
            
//             {/* Rich Text Editor Toolbar */}
//             <div className="flex items-center space-x-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
//               <button
//                 type="button"
//                 onClick={() => execCommand('bold')}
//                 className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
//                 title="Bold"
//                 aria-label="Bold"
//               >
//                 <Bold className="w-4 h-4" />
//               </button>
//               <button
//                 type="button"
//                 onClick={() => execCommand('italic')}
//                 className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
//                 title="Italic"
//                 aria-label="Italic"
//               >
//                 <Italic className="w-4 h-4" />
//               </button>
//               <button
//                 type="button"
//                 onClick={() => execCommand('underline')}
//                 className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
//                 title="Underline"
//                 aria-label="Underline"
//               >
//                 <Underline className="w-4 h-4" />
//               </button>
//               <div className="w-px h-6 bg-gray-300 mx-2"></div>
//               <button
//                 type="button"
//                 onClick={() => execCommand('insertUnorderedList')}
//                 className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
//                 title="Bullet List"
//                 aria-label="Bullet List"
//               >
//                 <List className="w-4 h-4" />
//               </button>
//               <button
//                 type="button"
//                 onClick={() => execCommand('insertOrderedList')}
//                 className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
//                 title="Numbered List"
//                 aria-label="Numbered List"
//               >
//                 <AlignLeft className="w-4 h-4" />
//               </button>
//             </div>
            
//             {/* Editor Area */}
//             <div
//               ref={editorRef}
//               contentEditable
//               onInput={handleEditorInput}
//               className={`w-full min-h-64 p-4 bg-gray-50 border-0 rounded-b-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
//                 errors.description ? 'ring-2 ring-red-500' : ''
//               }`}
//               style={{ maxHeight: '400px', overflowY: 'auto' }}
//               data-placeholder=""
//               role="textbox"
//               aria-multiline="true"
//               aria-label="Job description"
//               aria-describedby={errors.description ? 'description-error' : undefined}
//             />
            
//             {errors.description && (
//               <p id="description-error" className="mt-1 text-sm text-red-600" role="alert">
//                 {errors.description}
//               </p>
//             )}
//           </div>

//           {/* Time Off Days */}
//           <div>
//             <label htmlFor="timeOffDays" className="block text-sm font-medium text-gray-700 mb-3">
//               Time off (days)
//             </label>
//             <input
//               type="number"
//               id="timeOffDays"
//               value={timeOffDays}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimeOffDays(e.target.value)}
//               min="0"
//               className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all ${
//                 errors.timeOffDays ? 'ring-2 ring-red-500' : ''
//               }`}
//               placeholder=""
//               aria-describedby={errors.timeOffDays ? 'timeOffDays-error' : undefined}
//             />
//             {errors.timeOffDays && (
//               <p id="timeOffDays-error" className="mt-1 text-sm text-red-600" role="alert">
//                 {errors.timeOffDays}
//               </p>
//             )}
//           </div>

//           {/* Save Button */}
//           <div className="pt-6">
//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium py-4 px-6 rounded-lg transition-all disabled:cursor-not-allowed"
//               aria-describedby="save-button-status"
//             >
//               {isSubmitting ? (
//                 <div className="flex items-center justify-center space-x-2">
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   <span>Saving...</span>
//                 </div>
//               ) : (
//                 'Save changes'
//               )}
//             </button>
//             {isSubmitting && (
//               <p id="save-button-status" className="sr-only">
//                 Form is being submitted, please wait.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         [contentEditable=true]:empty:before {
//           content: attr(data-placeholder);
//           color: #9ca3af;
//           pointer-events: none;
//         }
        
//         [contentEditable=true]:focus {
//           outline: none;
//         }
        
//         @media (max-width: 640px) {
//           .min-h-64 {
//             min-height: 12rem;
//           }
//         }
        
//         .sr-only {
//           position: absolute;
//           width: 1px;
//           height: 1px;
//           padding: 0;
//           margin: -1px;
//           overflow: hidden;
//           clip: rect(0, 0, 0, 0);
//           white-space: nowrap;
//           border: 0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CreateTemplatePage;"use client";

// import React, { useState, useRef, FormEvent } from 'react';
// import Image from "next/image";
// import { ChevronLeft, Bold, Italic, Underline, List, AlignLeft, Search, Bell, ChevronDown } from 'lucide-react';

// interface FormData {
//   jobTitle: string;
//   description: string;
//   timeOffDays: number;
// }

// interface FormErrors {
//   jobTitle?: string;
//   description?: string;
//   timeOffDays?: string;
// }

// const CreateTemplateForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
//   const [jobTitle, setJobTitle] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [timeOffDays, setTimeOffDays] = useState<string>('');
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const editorRef = useRef<HTMLDivElement>(null);

//   // Rich text editor functions
//   const execCommand = (command: string, value?: string): void => {
//     document.execCommand(command, false, value || null);
//     editorRef.current?.focus();
//   };

//   const handleEditorInput = (e: React.FormEvent<HTMLDivElement>): void => {
//     const target = e.target as HTMLDivElement;
//     setDescription(target.innerHTML);
//   };

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};
    
//     if (!jobTitle.trim()) {
//       newErrors.jobTitle = 'Job title is required';
//     }
    
//     if (!description.trim() || description === '<br>' || description === '<div><br></div>') {
//       newErrors.description = 'Description is required';
//     }
    
//     const timeOffValue = parseInt(timeOffDays);
//     if (!timeOffDays || isNaN(timeOffValue) || timeOffValue < 0) {
//       newErrors.timeOffDays = 'Time off days must be a positive number';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (): Promise<void> => {
//     if (!validateForm()) return;
    
//     setIsSubmitting(true);
    
//     try {
//       // Simulate API call
//       const formData: FormData = {
//         jobTitle,
//         description,
//         timeOffDays: parseInt(timeOffDays)
//       };
      
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       console.log('Form submitted:', formData);
//       alert('Template created successfully!');
      
//       // Go back to templates list
//       onBack();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Error creating template. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//         {/* Job Title */}
//         <div>
//           <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-3">
//             Job title
//           </label>
//           <input
//             type="text"
//             id="jobTitle"
//             value={jobTitle}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobTitle(e.target.value)}
//             className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all ${
//               errors.jobTitle ? 'ring-2 ring-red-500' : ''
//             }`}
//             placeholder=""
//             aria-describedby={errors.jobTitle ? 'jobTitle-error' : undefined}
//           />
//           {errors.jobTitle && (
//             <p id="jobTitle-error" className="mt-1 text-sm text-red-600" role="alert">
//               {errors.jobTitle}
//             </p>
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-3">
//             Description
//           </label>
          
//           {/* Rich Text Editor Toolbar */}
//           <div className="flex items-center space-x-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
//             <button
//               type="button"
//               onClick={() => execCommand('bold')}
//               className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
//               title="Bold"
//               aria-label="Bold"
//             >
//               <Bold className="w-4 h-4" />
//             </button>
//             <button
//               type="button"
//               onClick={() => execCommand('italic')}
//               className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
//               title="Italic"
//               aria-label="Italic"
//             >
//               <Italic className="w-4 h-4" />
//             </button>
//             <button
//               type="button"
//               onClick={() => execCommand('underline')}
//               className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
//               title="Underline"
//               aria-label="Underline"
//             >
//               <Underline className="w-4 h-4" />
//             </button>
//             <div className="w-px h-6 bg-gray-300 mx-2"></div>
//             <button
//               type="button"
//               onClick={() => execCommand('insertUnorderedList')}
//               className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
//               title="Bullet List"
//               aria-label="Bullet List"
//             >
//               <List className="w-4 h-4" />
//             </button>
//             <button
//               type="button"
//               onClick={() => execCommand('insertOrderedList')}
//               className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
//               title="Numbered List"
//               aria-label="Numbered List"
//             >
//               <AlignLeft className="w-4 h-4" />
//             </button>
//           </div>
          
//           {/* Editor Area */}
//           <div
//             ref={editorRef}
//             contentEditable
//             onInput={handleEditorInput}
//             className={`w-full min-h-48 p-4 bg-gray-50 border-0 rounded-b-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
//               errors.description ? 'ring-2 ring-red-500' : ''
//             }`}
//             style={{ maxHeight: '300px', overflowY: 'auto' }}
//             data-placeholder=""
//             role="textbox"
//             aria-multiline="true"
//             aria-label="Job description"
//             aria-describedby={errors.description ? 'description-error' : undefined}
//           />
          
//           {errors.description && (
//             <p id="description-error" className="mt-1 text-sm text-red-600" role="alert">
//               {errors.description}
//             </p>
//           )}
//         </div>

//         {/* Time Off Days */}
//         <div>
//           <label htmlFor="timeOffDays" className="block text-sm font-medium text-gray-700 mb-3">
//             Time off (days)
//           </label>
//           <input
//             type="number"
//             id="timeOffDays"
//             value={timeOffDays}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimeOffDays(e.target.value)}
//             min="0"
//             className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all ${
//               errors.timeOffDays ? 'ring-2 ring-red-500' : ''
//             }`}
//             placeholder=""
//             aria-describedby={errors.timeOffDays ? 'timeOffDays-error' : undefined}
//           />
//           {errors.timeOffDays && (
//             <p id="timeOffDays-error" className="mt-1 text-sm text-red-600" role="alert">
//               {errors.timeOffDays}
//             </p>
//           )}
//         </div>

//         {/* Save Button */}
//         <div className="pt-6">
//           <button
//             type="button"
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium py-4 px-6 rounded-lg transition-all disabled:cursor-not-allowed"
//             aria-describedby="save-button-status"
//           >
//             {isSubmitting ? (
//               <div className="flex items-center justify-center space-x-2">
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 <span>Saving...</span>
//               </div>
//             ) : (
//               'Save changes'
//             )}
//           </button>
//           {isSubmitting && (
//             <p id="save-button-status" className="sr-only">
//               Form is being submitted, please wait.
//             </p>
//           )}
//         </div>
//           </div>
// };

// export default function SettingsHiringTemplatesPage() {
//   const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

//   const handleNewTemplateClick = (): void => {
//     setShowCreateForm(true);
//   };

//   const handleBackToTemplates = (): void => {
//     setShowCreateForm(false);
//   };

//   // Render the create template form if showCreateForm is true
//   if (showCreateForm) {
//     return (
//       <div className="h-screen w-[1220px] bg-gray-50 overflow-y-auto">
//         {/* Header */}
//         <div className="bg-white border-b border-gray-200">
//           <div className="flex items-center justify-between gap-4 px-6 py-4">
//             <div className="flex items-center space-x-4">
//               <button
//                 type="button"
//                 onClick={handleBackToTemplates}
//                 className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
//                 aria-label="Go back to templates"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//                 <span className="ml-1 text-sm">Back</span>
//               </button>
//               <h2 className="text-base sm:text-lg font-semibold text-[#1f2937]">
//                 Create template
//               </h2>
//             </div>
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="p-8">
//           <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
//             <CreateTemplateForm onBack={handleBackToTemplates} />
//           </div>
//         </div>
//         {/* Custom Styles */}
//         <style jsx>{`
//           [contentEditable=true]:empty:before {
//             content: attr(data-placeholder);
//             color: #9ca3af;
//             pointer-events: none;
//           }
          
//           [contentEditable=true]:focus {
//             outline: none;
//           }
          
//           @media (max-width: 640px) {
//             .min-h-48 {
//               min-height: 12rem;
//             }
//           }
          
//           .sr-only {
//             position: absolute;
//             width: 1px;
//             height: 1px;
//             padding: 0;
//             margin: -1px;
//             overflow: hidden;
//             clip: rect(0, 0, 0, 0);
//             white-space: nowrap;
//             border: 0;
//           }
//         `}</style>
//       </div>
//     );
//   }

//   // Render the original templates page
//   return (
//     <section className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
//       <div className="block md:flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-[#eef2f7]">
//         <div className="block items-center justify-between gap-4">
//           <div>
//             <h2 className="text-base sm:text-lg font-semibold text-[#1f2937]">
//               Templates
//             </h2>
//           </div>
//           <p className="mt-1 text-xs sm:text-sm text-[#6b7280] max-w-3xl">
//             Save your hiring preferences as a template to apply them instantly
//             to your next hire. Templates can help reduce your time to hire and
//             promote consistent, fair hiring policies around the world.
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={handleNewTemplateClick}
//           className="inline-flex items-center gap-2 rounded-full border mt-4 md:mt-0 px-4 py-2 text-sm font-medium text-[#5E2A8C] border-[#5E2A8C] hover:bg-[#5E2A8C] hover:text-white active:bg-[#4c1d95] transition-colors"
//           aria-label="Create new hiring template"
//         >
//           <svg
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             aria-hidden
//           >
//             <path
//               d="M12 5v14M5 12h14"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />
//           </svg>
//           New template
//         </button>
//       </div>

//       <div className="px-4 sm:px-6 py-10 sm:py-16">
//         <div className="mx-auto flex max-w-md flex-col items-center text-center">
//           <Image
//             src="/scope.png"
//             alt="Empty templates"
//             width={180}
//             height={150}
//             className="h-auto w-[126px] sm:w-[180px]"
//           />
//           <h3 className="mt-6 text-sm sm:text-base font-semibold text-[#111827]">
//             You haven't created any hiring templates
//           </h3>
//           <p className="mt-2 text-xs sm:text-sm text-[#6b7280]">
//             You can create and manage hiring templates here
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }