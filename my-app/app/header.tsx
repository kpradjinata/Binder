"use client"

import { ModeToggle } from "@/components/ui/mode-toggle";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

export function Header() {
    return (
        <div className="bg-slate-900 py-3">
            <div className="container mx-auto flex justify-between items-center">
                <div><h1>Binder</h1></div>
                <div>
                    <Unauthenticated>
                        <SignInButton />
                    </Unauthenticated>
                    <Authenticated>
                        <div className="flex gap-6 items-center">
                            <UserButton />
                            <ModeToggle />
                        </div>
                    </Authenticated>
                </div>
            </div>
        </div>
    )
}