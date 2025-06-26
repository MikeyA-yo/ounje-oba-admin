import AddNewCouponForm from "../forms/new-coupon-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const AddCouponDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Coupon</DialogTitle>
        </DialogHeader>

        <AddNewCouponForm />
      </DialogContent>
    </Dialog>
  );
};
