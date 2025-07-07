import {PrismaClient} from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();  // if global object has prisma, use it, otherwise create a new PrismaClient instance

if(process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;  // assign the PrismaClient instance to the global object for development mode
}

