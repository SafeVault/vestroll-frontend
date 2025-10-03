import { useState } from 'react';
import { ChevronDown, Briefcase, Calendar, Clock, Notebook } from 'lucide-react';

export default function ContractReviewAccordion() {
    const [openSections, setOpenSections] = useState({
        details: true,
        employee: false,
        payment: false,
        compliance: false
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const projectData = {
        title: "Insyder Website & Webapp Design",
        type: "UI/UX Designer",
        workType: "Freelancer",
        rateType: "Fixed rate",
        notice: "14 days notice",
        duration: "25th Oct 22 - 25th Nov 22",
        scopeItems: [
            {
                title: "Infrastructure Management",
                description: "Manage and optimize cloud-based infrastructure, ensuring scalability and cost-effectiveness."
            },
            {
                title: "CI/CD Pipeline Optimization",
                description: "Improve and expand CI/CD pipelines to enable faster and more reliable code deployment."
            },
            {
                title: "Scripting and Automation",
                description: "Develop scripts and automation tools to streamline various DevOps processes."
            },
            {
                title: "Containerization",
                description: "Implement and manage containerization technologies like Docker and Kubernetes."
            },
            {
                title: "Performance Optimization",
                description: "Identify and resolve performance bottlenecks in applications and infrastructure."
            },
            {
                title: "Disaster Recovery",
                description: "Plan and implement disaster recovery and backup solutions for critical systems."
            },
            {
                title: "DevOps Tools",
                description: "Evaluate and integrate new DevOps tools to enhance efficiency and collaboration."
            }
        ]
    };

    return (
        <div className="max-w-full min-h-screen">
            {/* Project Details Section */}
            <div className="bg-white rounded-lg shadow-sm mb-3 overflow-hidden">
                <button
                    onClick={() => toggleSection('details')}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                    <span className="font-semibold text-gray-800">Project details</span>
                    <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform ${openSections.details ? 'rotate-180' : ''
                            }`}
                    />
                </button>

                {openSections.details && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                        <div className="flex items-start gap-3 mb-4 mt-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Notebook className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">{projectData.title}</h3>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Briefcase className="w-4 h-4" />
                                        {projectData.type}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Briefcase className="w-4 h-4" />
                                        {projectData.workType}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="text-gray-400">💰</span>
                                        {projectData.rateType}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {projectData.notice}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {projectData.duration}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-semibold text-gray-800 mb-3">Scope of work</h4>
                            <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                                {projectData.scopeItems.map((item, index) => (
                                    <div key={index} className="text-sm">
                                        <span className="font-medium text-gray-900">{item.title}:</span>{' '}
                                        <span className="text-gray-700">{item.description}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Employee Details Section */}
            <div className="bg-white rounded-lg shadow-sm mb-3 overflow-hidden">
                <button
                    onClick={() => toggleSection('employee')}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                    <span className="font-semibold text-gray-800">Employee details</span>
                    <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform ${openSections.employee ? 'rotate-180' : ''
                            }`}
                    />
                </button>

                {openSections.employee && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                        <div className="py-4 text-gray-600">
                            <p>Employee information will be displayed here.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-lg shadow-sm mb-3 overflow-hidden">
                <button
                    onClick={() => toggleSection('payment')}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                    <span className="font-semibold text-gray-800">Payment</span>
                    <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform ${openSections.payment ? 'rotate-180' : ''
                            }`}
                    />
                </button>

                {openSections.payment && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                        <div className="py-4 text-gray-600">
                            <p>Payment details will be displayed here.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Compliance Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                    onClick={() => toggleSection('compliance')}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                    <span className="font-semibold text-gray-800">Compliance</span>
                    <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform ${openSections.compliance ? 'rotate-180' : ''
                            }`}
                    />
                </button>

                {openSections.compliance && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                        <div className="py-4 text-gray-600">
                            <p>Compliance information will be displayed here.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}