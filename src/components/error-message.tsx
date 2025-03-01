import Image from "next/image";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center text-white gap-2">
      <Image
        src="/error_api.png"
        alt="Error icon"
        width={36}
        height={36}
        className="w-9 h-9 object-cover transition-transform duration-300 hover:scale-110"
      />
      {message}
    </div>
  );
}
