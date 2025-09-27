import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  
}

interface EmployeeProfileHeaderProps {
  employee?: Employee;
}

const EmployeeProfileHeader: React.FC<EmployeeProfileHeaderProps> = ({
  employee,
}) => {
  // Default employee data if none provided
  const defaultEmployee: Employee = {
    id: "1",
    name: "James Akinbiola",
    email: "mailjames@gmail.com",
    phone: "+234 904 364 2019",
    address:
      "No 5 James Robertson Stedu/Oguntana Drive, Surulere, Nigeria | 145241",
   
  };

  const employeeData = employee || defaultEmployee;

  return (
    <div className=" p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center font-bold text-xl sm:text-2xl">
          <Image src="/profileImage.png"   
        alt="Profile picture"
        width={100}          
        height={100}         
        className=""/>
        </div>

        {/* Employee Info */}
        <div className="flex-1 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            
              <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
                {employeeData.name}
              </h1>
             
            
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <div className="flex gap-3">
 <div className="flex items-center gap-2 text-text-secondary px-3 text-sm bg-background-b1 py-1 rounded-lg">
              <Mail className="w-4 h-4" />
              <span>{employeeData.email}</span>
            </div>
            <div className="flex items-center gap-2 px-3 text-text-secondary text-sm bg-background-b1 py-1 rounded-lg">
              <Phone className="w-4 h-4" />
              <span>{employeeData.phone}</span>
            </div>
            </div>
           
            <div className="flex items-start gap-2 text-text-secondary px-3 w-fit text-sm bg-background-b1  py-1 rounded-lg">
              <MapPin className="w-4 h-4 mt-0.5" />
              <span className="leading-relaxed">{employeeData.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileHeader;
