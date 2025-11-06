"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";

export enum CONTACT_US_STEPS {
  FirstName,
  LastName,
  Email,
  Phone
}

interface ContactUsContextType {
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  step: CONTACT_US_STEPS;
  setStep: Dispatch<SetStateAction<CONTACT_US_STEPS>>;
  debounceAndValidateInput: (step: CONTACT_US_STEPS, value: string) => void;
  formValid: boolean;
  setFormValid: Dispatch<SetStateAction<boolean>>;
}

const ContactUsContext = createContext<ContactUsContextType | undefined>(
  undefined
);

export const ContactUsContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<CONTACT_US_STEPS>(
    CONTACT_US_STEPS.FirstName
  );
  const [formValid, setFormValid] = useState(false);
  const debounceAndValidateInput = (step: CONTACT_US_STEPS, value: string) => {
    setFormValid(false);

    switch (step) {
      case CONTACT_US_STEPS.FirstName:
        setFirstName(value);
        break;
      case CONTACT_US_STEPS.LastName:
        setLastName(value);
        break;
      case CONTACT_US_STEPS.Email:
        setEmail(value);
        break;
      case CONTACT_US_STEPS.Phone:
        setPhoneNumber(value);
        break;
      default:
        break;
    }
    setTimeout(() => {
      setFormValid(true);
    }, 5_000);
  };

  return (
    <ContactUsContext.Provider
      value={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        phoneNumber,
        setPhoneNumber,
        step,
        setStep,
        debounceAndValidateInput,
        formValid,
        setFormValid
      }}
    >
      {children}
    </ContactUsContext.Provider>
  );
};

export const useContactUs = () => {
  const context = useContext(ContactUsContext);
  if (!context) {
    throw new Error("ContactUs Provider is not initialized");
  }

  return context;
};
