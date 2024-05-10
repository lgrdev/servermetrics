const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalThis = typeof global !== 'undefined' ? global : {};
globalThis.prismaGlobal = prismaClientSingleton();

const prisma = globalThis.prismaGlobal || prismaClientSingleton();

module.exports = prisma;
