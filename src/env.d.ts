/// <reference types="astro/client" />

interface User {
    name: string;
    email: string;
    // avartar: string;
    // emailVerified: boolean;
}

declare namespace App {
    interface Locals {
        isLoggedIn: boolean;
        isAdmin: boolean;
        user: User | null;
    }
}