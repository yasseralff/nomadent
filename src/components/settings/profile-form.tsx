import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProfileForm() {
  const [name, setName] = useState("Yasser Alff");
  const [email, setEmail] = useState("yasser@university.edu");
  const [homeCurrency, setHomeCurrency] = useState("USD");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("saved settings", { name, email, homeCurrency });
  };

  return (
    <div className="lg:col-span-2 bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-on-surface font-sora">Profile Information</h2>
      
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="profile-name"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            id="profile-email"
            label="Email Address"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sora">
            Home Currency
          </label>
          <select
            value={homeCurrency}
            onChange={(e) => setHomeCurrency(e.target.value)}
            className="w-full bg-transparent px-4 py-2.5 text-sm text-foreground border-b border-outline-variant outline-none rounded-full focus:border-transparent focus:ring-1 focus:ring-primary focus:bg-surface-container transition-all duration-200"
          >
            <option value="USD">USD ($) - US Dollar</option>
            <option value="GBP">GBP (£) - British Pound</option>
            <option value="EUR">EUR (€) - Euro</option>
            <option value="IDR">IDR (Rp) - Indonesian Rupiah</option>
          </select>
        </div>

        <div className="flex justify-end mt-4">
          <Button type="submit" size="md">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
