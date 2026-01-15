import { UseFormRegister } from "react-hook-form";

export const TokenSelectSearch = ({
  register
}: {
  register: UseFormRegister<{ search: string }>;
}) => {
  return (
    <div className="pt-4 px-3 ">
      <form>
        <input
          {...register("search")}
          className="w-full px-4 py-2 rounded-md border border-primary-accent bg-secondary-accent text-primary-brand"
          placeholder="Search token..."
        />
      </form>
    </div>
  );
};
