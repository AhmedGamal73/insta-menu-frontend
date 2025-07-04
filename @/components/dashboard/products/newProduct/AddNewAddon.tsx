import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddonForm from "./AddonForm";
import { DialogPortal } from "@radix-ui/react-dialog";

export default function AddNewAddon({ selectedCategory }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-auto" asChild>
          <Button variant="link">
            قم بإضافة عنصر جديد
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>أضف عنصر جديد</DialogTitle>
            </DialogHeader>
            <AddonForm
              selectedCategory={selectedCategory}
              onClose={() => setOpen(false)}
            />
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
