"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, UserButton } from "@clerk/nextjs";

export function UserNav() {
  const { user: session } = useUser();
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <UserButton />
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    );
  }
}
