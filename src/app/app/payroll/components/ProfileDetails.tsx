import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";


interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  bio: string;
  employeeType: "Employee" | "Completed" | "Fixed rate";
}

const employeeData: Employee = {
  id: "1",
  name: "James Akinbiola",
  bio: "Frontend Developer",
  email: "mailjames@gmail.com",
  phone: "+234 904 364 2019",
  address:
    "No 5 James Robertson Stedu/Oguntana Drive, Surulere, Nigeria | 145241",
  image: "/profileImage.png",
  employeeType: "Employee",
};


  const getStatusStyles = (status: Employee["employeeType"]) => {
    switch (status) {
      case "Employee":
        return "text-[#5A42DE] border-[#5A42DE] bg-[#E8E5FA] ";
      case "Completed":
        return "bg-blue-fill text-blue-default border-blue-stroke";
      case "Fixed rate":
        return "bg-yellow-fill text-yellow-default border-yellow-stroke";
      default:
        return "bg-fill-secondary text-text-secondary border-stroke-secondary";
    }
  };

const ProfileDetails = () => {
  return (
    <div className="w-full lg:w-md bg-white p-4 rounded-sm shadow px-8 space-y-2">
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
          employeeData.employeeType
        )}`}
      >
        {employeeData.employeeType}
      </span>
      <div className="flex items-start gap-4">

        <Image
          src={employeeData.image}
          alt="Profile picture"
          width={48}
          height={48}
          className="rounded-sm"
        />

        {/* Employee Info */}
        <div className="flex-1 w-full sm:w-auto">
          <div className="">
            <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
              {employeeData.name}
            </h1>
            <p className="text-sm text-text-secondary">{employeeData.bio}</p>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-2">
        <div className="flex justify-between  bg-background-b2 p-1 rounded">
          <p className="text-xs text-text-secondary">Email address</p>
          <p className="text-xs text-text-secondary">Phone number</p>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2 text-text-secondary px-1 text-sm py-1   ">
            <Mail className="w-4 h-4" />
            <span>{employeeData.email}</span>
          </div>
          <div className="flex items-center gap-2 px-1 text-text-secondary text-sm py-1 ">
            <Phone className="w-4 h-4" />
            <span>{employeeData.phone}</span>
          </div>
        </div>
        <div className="flex justify-between  bg-background-b2 p-1 rounded">
          <p className="text-xs text-text-secondary">Address</p>
        </div>
        <div className="flex items-start gap-2 text-text-primary px-1  text-sm py-1 w-full">
          <MapPin className="w-4 h-4 mt-0.5" />
          <span className="leading-relaxed text-sm">
            {employeeData.address}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
