import {Check, X} from "lucide-react";

const PasswordCriteria = ({ password }) => {
    const criteria = [
        {label: "At least 6 characters", met: password.length >= 6},
        {label: "contains Uppercase letter", met: /[A-Z]/.test(password)},
        {label: "contains Lowercase letter", met: /[a-z]/.test(password)},
        {label: "contains a number", met: /\d/.test(password)},
        {label: "contains special character", met: /[^A-Za-z0-9]/.test(password)},
    ]
    return (
        <div className="mt-2 space-y-1">
            {
                criteria.map((item) => (
                    <div key={item.label} className="flex items-center text-xs">
                        {
                            item.met? <Check className="size-4 text-green-500 mr-2"/> :
                                <X  className="size-4 text-gray-500 mr-2" />
                        }
                        <span className={item.met ? "text-green-500": "text-gray-500"}>{item.label}</span>
                    </div>
                ))
            }
        </div>
    )
};

export default PasswordCriteria;