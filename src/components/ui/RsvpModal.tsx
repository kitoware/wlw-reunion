import React from "react";
import { cn } from "@/lib/utils";

interface RsvpModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => void;
}

export default function RsvpModal({ open, onClose, onSubmit }: RsvpModalProps) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.({ firstName, lastName, email, phone });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-[101] w-[92%] max-w-md rounded-xl border border-white/10 bg-black text-white shadow-xl font-calligraphy",
          "p-6 md:p-8"
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl md:text-2xl font-semibold">RSVP</h3>
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded-md p-2 text-white/70 hover:text-white hover:bg-white/10"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-white/80">First name</span>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Jane"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-white/80">Last name</span>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Doe"
              />
            </label>
          </div>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-white/80">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="jane@example.com"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-white/80">Phone</span>
            <input
              type="tel"
              inputMode="tel"
              pattern="[0-9()+\-\s]*"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="(555) 123-4567"
            />
          </label>
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-white/80 hover:text-white hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-white text-black px-4 py-2 font-medium hover:bg-white/90"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


